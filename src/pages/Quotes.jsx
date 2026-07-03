import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote as QuoteIcon, RefreshCw, Copy, Check, Sparkles } from 'lucide-react';
import { quotes } from '../data/quotes';

const Quotes = () => {
  const [currentQuote, setCurrentQuote] = useState(() => 
    quotes[Math.floor(Math.random() * quotes.length)]
  );
  const [copied, setCopied] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const getNewQuote = () => {
    setIsRotating(true);
    // Add artificial delay for "thoughtful" animation
    setTimeout(() => {
      let newQuote = currentQuote;
      while (newQuote === currentQuote) {
        newQuote = quotes[Math.floor(Math.random() * quotes.length)];
      }
      setCurrentQuote(newQuote);
      setIsRotating(false);
      setCopied(false);
    }, 600);
  };

  const copyQuote = () => {
    navigator.clipboard.writeText(currentQuote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [text, author] = useMemo(() => currentQuote.split(' – '), [currentQuote]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] space-y-12 pb-10">
      <header className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest border border-blue-500/10">
          <Sparkles size={14} /> Wisdom Repository
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight tracking-tight">Daily <span className="gradient-text">Motivation</span></h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto">Fuel your academic journey with curated pearls of wisdom from history's brightest minds.</p>
      </header>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQuote}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card max-w-4xl w-full p-8 md:p-20 relative overflow-hidden group border-slate-200/50 dark:border-slate-800/50 shadow-3xl"
        >
          {/* Elegant Quotation Marks Decoration */}
          <div className="absolute top-10 left-10 text-blue-500/5 group-hover:text-blue-500/10 transition-colors duration-1000">
            <QuoteIcon size={240} strokeWidth={1} />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-10">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl shadow-blue-500/20 mb-4">
              <QuoteIcon className="text-white w-8 h-8" fill="currentColor" />
            </div>
            
            <p className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-slate-800 dark:text-white max-w-3xl">
              "{text}"
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
              <p className="text-xl md:text-2xl font-black uppercase tracking-wider gradient-text">
                — {author}
              </p>
            </div>

            <div className="flex items-center gap-4 w-full max-w-md pt-5">
              <button 
                onClick={getNewQuote}
                disabled={isRotating}
                className="flex-1 btn-primary flex items-center justify-center gap-3 py-4 text-sm font-black tracking-widest shadow-xl"
                aria-label="Refresh quote"
              >
                <RefreshCw className={`${isRotating ? 'animate-spin' : ''}`} size={20} />
                {isRotating ? 'THINKING...' : 'NEW SPARK'}
              </button>
              
              <button 
                onClick={copyQuote}
                className={`
                  p-4 glass-card rounded-2xl transition-all border border-slate-200 dark:border-slate-800 flex items-center gap-2 group/copy
                  ${copied ? 'bg-emerald-500 border-emerald-500 text-white' : 'hover:border-blue-500'}
                `}
                title="Copy to clipboard"
                aria-label="Copy quote to clipboard"
              >
                {copied ? <Check size={24} strokeWidth={3} /> : <Copy size={24} className="group-hover/copy:scale-110 transition-transform" />}
                <span className="hidden md:inline font-black text-xs uppercase tracking-widest">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        {[
          { label: 'Wisdom Count', value: '50+ Global' },
          { label: 'Current Category', value: 'Perseverance' },
          { label: 'Source Analysis', value: 'Verified' }
        ].map((item) => (
          <div key={item.label} className="glass-card p-5 text-center border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{item.label}</p>
            <p className="font-black text-slate-700 dark:text-slate-300">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Quotes;
