import React, { useState, useMemo } from 'react'
import { useStore, Talk } from '../store/useStore'
import { TrashIcon, PencilIcon, XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline'

export const TalkList = () => {
  const talks = useStore((state) => state.talks)
  const deleteTalk = useStore((state) => state.deleteTalk)
  const updateTalk = useStore((state) => state.updateTalk)
  const theme = useStore((state) => state.theme)
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'speaker'>('date')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [editForm, setEditForm] = useState<Partial<Talk>>({})
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleEdit = (talk: Talk) => {
    setEditingId(talk._id!)
    setEditForm(talk)
  }

  const handleUpdate = async () => {
    if (editingId && editForm) {
      await updateTalk(editingId, editForm as Talk)
      setEditingId(null)
      setEditForm({})
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce talk ?')) {
      try {
        setIsDeleting(id)
        await deleteTalk(id)
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
        alert('Une erreur est survenue lors de la suppression du talk.')
      } finally {
        setIsDeleting(null)
      }
    }
  }

  const filteredTalks = talks
    .filter(talk => filterStatus === 'all' || talk.status === filterStatus)
    .filter(talk => 
      talk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talk.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talk.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return a[sortBy].localeCompare(b[sortBy])
    })

  return (
    <div className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-3 py-2 rounded-md border ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'speaker')}
            className={`px-3 py-2 rounded-md border ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="date">Trier par date</option>
            <option value="title">Trier par titre</option>
            <option value="speaker">Trier par présentateur</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-3 py-2 rounded-md border ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">Tous les statuts</option>
            <option value="planned">Planifié</option>
            <option value="in-progress">En cours</option>
            <option value="completed">Terminé</option>
          </select>
        </div>
      </div>

      <div className="max-h-[calc(100vh-250px)] overflow-y-auto space-y-4 pr-2">
        {filteredTalks.map((talk) => (
          <div
            key={talk._id}
            className={`p-4 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600' 
                : 'bg-white border-gray-200'
            }`}
          >
            {editingId === talk._id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className={`w-full px-2 py-1 rounded border ${
                    theme === 'dark' 
                      ? 'bg-gray-600 border-gray-500 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                />
                <input
                  type="text"
                  value={editForm.speaker}
                  onChange={(e) => setEditForm({ ...editForm, speaker: e.target.value })}
                  className={`w-full px-2 py-1 rounded border ${
                    theme === 'dark' 
                      ? 'bg-gray-600 border-gray-500 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                />
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className={`w-full px-2 py-1 rounded border ${
                    theme === 'dark' 
                      ? 'bg-gray-600 border-gray-500 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className={`w-full px-2 py-1 rounded border ${
                    theme === 'dark' 
                      ? 'bg-gray-600 border-gray-500 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                />
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value as Talk['status'] })}
                  className={`w-full px-2 py-1 rounded border ${
                    theme === 'dark' 
                      ? 'bg-gray-600 border-gray-500 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="planned">Planifié</option>
                  <option value="in-progress">En cours</option>
                  <option value="completed">Terminé</option>
                </select>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleUpdate}
                    className={`px-3 py-1 rounded ${
                      theme === 'dark' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null)
                      setEditForm({})
                    }}
                    className={`px-3 py-1 rounded ${
                      theme === 'dark' 
                        ? 'bg-gray-600 text-white' 
                        : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {talk.title}
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Par {talk.speaker}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    talk.status === 'completed' 
                      ? theme === 'dark' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800'
                      : talk.status === 'in-progress'
                      ? theme === 'dark' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-800'
                      : theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {talk.status === 'completed' ? 'Terminé' : talk.status === 'in-progress' ? 'En cours' : 'Planifié'}
                  </span>
                </div>
                <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {new Date(talk.date).toLocaleDateString('fr-FR')}
                </p>
                {talk.description && (
                  <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {talk.description}
                  </p>
                )}
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => handleEdit(talk)}
                    className={`px-3 py-1 rounded ${
                      theme === 'dark' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-500 text-white'
                    }`}
                    disabled={isDeleting === talk._id}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(talk._id!)}
                    className={`px-3 py-1 rounded ${
                      theme === 'dark' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-red-500 text-white'
                    } ${isDeleting === talk._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isDeleting === talk._id}
                  >
                    {isDeleting === talk._id ? 'Suppression...' : 'Supprimer'}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 