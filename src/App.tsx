import { useEffect } from 'react'
import TalkForm from './components/TalkForm'
import { TalkList } from './components/TalkList'
import { ThemeToggle } from './components/ThemeToggle'
import { useStore } from './store/useStore'

function App() {
  const theme = useStore((state) => state.theme)
  const fetchTalks = useStore((state) => state.fetchTalks)

  useEffect(() => {
    fetchTalks()
  }, [fetchTalks])

  return (
    <div className={`min-h-screen transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="min-h-screen">
        <header className={`sticky top-0 z-10 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <img 
                  src="/images/logo.png" 
                  alt="Talks Manager Logo" 
                  className="h-8 w-8 object-contain"
                />
                <div className="flex items-center space-x-2">
                  <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Talks Manager
                  </h1>
                  <span className={`px-2 py-1 text-xs rounded-full ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'}`}>
                    Beta
                  </span>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center space-x-2 mb-6">
                <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  Nouveau Talk
                </h2>
                <span className={`px-2 py-1 text-xs rounded-full ${theme === 'dark' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800'}`}>
                  Nouveau
                </span>
              </div>
              <TalkForm />
            </div>

            <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  Liste des Talks
                </h2>   
                <span className={`px-2 py-1 text-xs rounded-full ${theme === 'dark' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-800'}`}>
                  {useStore((state) => state.talks.length)} talks
                </span>
              </div>
              <TalkList />
            </div>
          </div>
        </main>

        <footer className={`mt-8 py-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="container mx-auto px-4">
            <p className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2024 Talks Manager - Tous droits réservés - Téo ARTMEIER
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
