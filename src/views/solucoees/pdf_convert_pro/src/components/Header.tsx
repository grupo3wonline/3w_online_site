import { FileText, Moon, Sun, ArrowLeftRight } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  currentView: 'home' | 'word' | 'excel';
  onNavigate: (view: 'home' | 'word' | 'excel') => void;
}

export function Header({ isDark, onToggleTheme, currentView, onNavigate }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 group"
        >
          <div className="flex items-center gap-1.5">
            <FileText className="w-7 h-7 text-red-500" />
            <ArrowLeftRight className="w-4 h-4 text-gray-400" />
            <div className="flex gap-1">
              <div className="w-6 h-7 bg-blue-700 rounded-sm flex items-center justify-center">
                <span className="text-white text-[9px] font-bold">W</span>
              </div>
              <div className="w-6 h-7 bg-green-600 rounded-sm flex items-center justify-center">
                <span className="text-white text-[9px] font-bold">X</span>
              </div>
            </div>
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white hidden sm:block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            PDF<span className="text-red-500">Convert</span> Pro
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => onNavigate('word')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'word'
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            PDF → Word
          </button>
          <button
            onClick={() => onNavigate('excel')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'excel'
                ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            PDF → Excel
          </button>
        </nav>

        <button
          onClick={onToggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Alternar tema"
        >
          {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}
