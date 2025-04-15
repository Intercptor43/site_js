import { useState } from 'react'
import { useStore } from '../store/useStore'

export default function TalkForm() {
  const [title, setTitle] = useState('')
  const [speaker, setSpeaker] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'planned' | 'in-progress' | 'completed'>('planned')
  const theme = useStore((state) => state.theme)
  const addTalk = useStore((state) => state.addTalk)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title || !speaker || !date) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    await addTalk({
      title,
      speaker,
      date,
      description,
      status
    })

    // Réinitialiser le formulaire
    setTitle('')
    setSpeaker('')
    setDate('')
    setDescription('')
    setStatus('planned')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label 
          htmlFor="title" 
          className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
        >
          Titre *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-3 py-2 rounded-md border ${
            theme === 'dark' 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          required
        />
      </div>

      <div>
        <label 
          htmlFor="speaker" 
          className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
        >
          Présentateur *
        </label>
        <input
          type="text"
          id="speaker"
          value={speaker}
          onChange={(e) => setSpeaker(e.target.value)}
          className={`w-full px-3 py-2 rounded-md border ${
            theme === 'dark' 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          required
        />
      </div>

      <div>
        <label 
          htmlFor="date" 
          className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
        >
          Date *
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`w-full px-3 py-2 rounded-md border ${
            theme === 'dark' 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          required
        />
      </div>

      <div>
        <label 
          htmlFor="description" 
          className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className={`w-full px-3 py-2 rounded-md border ${
            theme === 'dark' 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        />
      </div>

      <div>
        <label 
          htmlFor="status" 
          className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
        >
          Statut
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'planned' | 'in-progress' | 'completed')}
          className={`w-full px-3 py-2 rounded-md border ${
            theme === 'dark' 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="planned">Planifié</option>
          <option value="in-progress">En cours</option>
          <option value="completed">Terminé</option>
        </select>
      </div>

      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-md font-medium ${
          theme === 'dark'
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        Ajouter le Talk
      </button>
    </form>
  )
} 