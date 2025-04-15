import { useStore } from '../store/useStore'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export const ThemeToggle = () => {
  const theme = useStore((state) => state.theme)
  const toggleTheme = useStore((state) => state.toggleTheme)

  return (
    <button
      onClick={toggleTheme}
      className={`rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-6 w-6" />
      ) : (
        <SunIcon className="h-6 w-6" />
      )}
    </button>
  )
} 