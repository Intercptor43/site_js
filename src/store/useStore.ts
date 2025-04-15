import { create } from 'zustand'
import { default as axios } from 'axios'

const API_URL = 'http://localhost:5000/api'

export interface Talk {
  _id?: string
  title: string
  speaker: string
  date: string
  description: string
  status: 'planned' | 'in-progress' | 'completed'
  createdAt?: string
  updatedAt?: string
}

interface Store {
  theme: 'light' | 'dark'
  talks: Talk[]
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
  addTalk: (talk: Talk) => Promise<void>
  updateTalk: (id: string, talk: Talk) => Promise<void>
  deleteTalk: (id: string) => Promise<void>
  fetchTalks: () => Promise<void>
}

export const useStore = create<Store>((set) => ({
  theme: 'light',
  talks: [],
  
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  
  fetchTalks: async () => {
    try {
      const response = await axios.get(`${API_URL}/talks`)
      set({ talks: response.data })
    } catch (error) {
      console.error('Erreur lors de la récupération des talks:', error)
    }
  },
  
  addTalk: async (talk) => {
    try {
      const response = await axios.post(`${API_URL}/talks`, talk)
      set((state) => ({ talks: [...state.talks, response.data] }))
    } catch (error) {
      console.error('Erreur lors de l\'ajout du talk:', error)
    }
  },
  
  updateTalk: async (id, talk) => {
    try {
      const response = await axios.put(`${API_URL}/talks/${id}`, talk)
      set((state) => ({
        talks: state.talks.map((t) => (t._id === id ? response.data : t))
      }))
    } catch (error) {
      console.error('Erreur lors de la mise à jour du talk:', error)
    }
  },
  
  deleteTalk: async (id) => {
    try {
      set((state) => ({
        talks: state.talks.filter((talk) => talk._id !== id)
      }))
      
      await axios.delete(`${API_URL}/talks/${id}`)
      
      const response = await axios.get(`${API_URL}/talks`)
      set({ talks: response.data })
    } catch (error) {
      console.error('Erreur lors de la suppression du talk:', error)
      const response = await axios.get(`${API_URL}/talks`)
      set({ talks: response.data })
    }
  }
})) 