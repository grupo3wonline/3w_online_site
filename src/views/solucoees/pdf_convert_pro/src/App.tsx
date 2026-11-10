import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { PdfToWord } from './pages/PdfToWord';
import { PdfToExcel } from './pages/PdfToExcel';
import { useDarkMode } from './hooks/useDarkMode';

type View = 'home' | 'word' | 'excel';

export default function App() {
  const { isDark, toggle } = useDarkMode();
  const [view, setView] = useState<View>('home');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Header
        isDark={isDark}
        onToggleTheme={toggle}
        currentView={view}
        onNavigate={v => setView(v)}
      />

      <main className="flex-grow flex flex-col items-center">
        {view === 'home' && (
          <div className="w-full">
            <Home onNavigate={v => setView(v)} />
          </div>
        )}
        {view === 'word' && (
          <PdfToWord onBack={() => setView('home')} />
        )}
        {view === 'excel' && (
          <PdfToExcel onBack={() => setView('home')} />
        )}
      </main>

      <Footer />
    </div>
  );
}
