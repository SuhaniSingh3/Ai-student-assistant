import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calculator, 
  Timer, 
  ListTodo, 
  Quote, 
  Info, 
  Moon, 
  Sun, 
  Menu, 
  X,
  GraduationCap
} from 'lucide-react';
import { useAppContext } from './context/AppContext';

// Pages
import Dashboard from './pages/Dashboard';
import CGPACalculator from './pages/CGPACalculator';
import StudyTimer from './pages/StudyTimer';
import TodoList from './pages/TodoList';
import Quotes from './pages/Quotes';
import About from './pages/About';

function App() {
  const { darkMode, setDarkMode } = useAppContext();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Simulate page load for smoother UX
    setIsPageLoading(true);
    const timer = setTimeout(() => setIsPageLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'GPA Calculator', path: '/cgpa', icon: Calculator },
    { name: 'Study Timer', path: '/timer', icon: Timer },
    { name: 'To-Do List', path: '/todo', icon: ListTodo },
    { name: 'Quotes', path: '/quotes', icon: Quote },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-500 overflow-x-hidden">
      {/* Scroll-to-top on route change */}
      <ScrollToTop />

      {/* Modern Page Loader */}
      {isPageLoading && (
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-[100] shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        />
      )}

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-72 glass-card rounded-none border-r border-slate-200/50 dark:border-slate-800/50 transform transition-all duration-300 ease-out lg:relative lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:shadow-none'}
        `}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20">
                <GraduationCap className="text-white w-7 h-7" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight gradient-text">Student AI</h1>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400"
              aria-label="Close sidebar"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300
                    ${isActive 
                      ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-500/10' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400'}
                  `}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                  <span className="font-semibold">{item.name}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="w-full flex items-center justify-between gap-3 px-5 py-3.5 glass-card hover:bg-white dark:hover:bg-slate-800/80 rounded-xl transition-all border border-slate-200/50 dark:border-slate-800/50"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div className="flex items-center gap-3">
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400 animate-pulse-slow" /> : <Moon className="w-5 h-5 text-indigo-600" />}
                <span className="font-bold text-sm tracking-wide">{darkMode ? 'LIGHT MODE' : 'DARK MODE'}</span>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${darkMode ? 'bg-blue-600' : 'bg-slate-300'}`}>
                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 ${darkMode ? 'left-6' : 'left-1'}`} />
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Sticky Mobile Header */}
        <header className="lg:hidden p-4 glass sticky top-0 z-30 flex justify-between items-center border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-blue-600 w-6 h-6" />
            <span className="font-bold text-xl gradient-text">Student AI</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="p-2 glass-card rounded-xl shadow-md active:scale-95 transition-all"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-6xl mx-auto"
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/cgpa" element={<CGPACalculator />} />
                <Route path="/timer" element={<StudyTimer />} />
                <Route path="/todo" element={<TodoList />} />
                <Route path="/quotes" element={<Quotes />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// Helper to scroll to top on nav
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
export default App;
