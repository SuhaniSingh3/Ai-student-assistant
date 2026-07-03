import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Coffee, Brain, BellRing, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const StudyTimer = () => {
  const { setStudyTimeToday } = useAppContext();
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const audioRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
          // Increment global study time every minute
          if (!isBreak) setStudyTimeToday(prev => prev + 1);
        } else {
          handleTimerEnd();
          clearInterval(interval);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isBreak]);

  const handleTimerEnd = () => {
    setIsActive(false);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.warn("Audio blocked by browser policy"));
    }
    
    if (!isBreak) {
      setModalMessage("Great Job! Take a 5 minute rest.");
      setShowModal(true);
      setIsBreak(true);
      setMinutes(5);
    } else {
      setModalMessage("Break's over! Ready to focus?");
      setShowModal(true);
      setIsBreak(false);
      setMinutes(25);
    }
    setSeconds(0);
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const totalSeconds = isBreak ? 5 * 60 : 25 * 60;
  const remainingSeconds = minutes * 60 + seconds;
  const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-10 relative">
      <header className="text-center space-y-2">
        <h2 className="text-4xl font-black tracking-tight">Focus <span className="gradient-text">Studio</span></h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Deep work made effortless with standardized pomodoro sessions.</p>
      </header>

      {/* Timer Display */}
      <div className="relative group">
        {/* Glow Effect */}
        <div className={`absolute inset-[-20px] rounded-full blur-3xl opacity-20 transition-colors duration-1000 ${isBreak ? 'bg-emerald-500' : 'bg-blue-600'}`} />
        
        <div className="relative glass-card rounded-full p-2 border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 shadow-2xl">
          <svg className="w-72 h-72 md:w-[450px] md:h-[450px] transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="46%"
              className="stroke-slate-100 dark:stroke-slate-800/50 fill-none"
              strokeWidth="12"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="46%"
              className={`fill-none ${isBreak ? 'stroke-emerald-500' : 'stroke-blue-600'}`}
              strokeWidth="12"
              strokeDasharray="100 100"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 100 - progress }}
              transition={{ duration: 1, ease: "linear" }}
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.div 
                key={isBreak ? 'break' : 'study'}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`p-4 rounded-3xl mb-6 ${isBreak ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}
              >
                {isBreak ? <Coffee size={32} /> : <Brain size={32} />}
              </motion.div>
            </AnimatePresence>
            
            <span className="text-7xl md:text-9xl font-black font-mono tracking-tighter tabular-nums leading-none">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            
            <span className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-slate-400 mt-6 md:mt-8">
              {isBreak ? 'Rest Mode' : 'Productivity Mode'}
            </span>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="flex items-center gap-10">
        <button 
          onClick={resetTimer}
          className="p-5 glass-card rounded-2xl hover:bg-red-500/10 hover:text-red-500 transition-all text-slate-400 group border-slate-200/50 dark:border-slate-800/50"
          aria-label="Reset Timer"
        >
          <RotateCcw size={28} className="group-hover:-rotate-180 transition-transform duration-500" />
        </button>
        
        <button 
          onClick={toggleTimer}
          className={`
            w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center shadow-2xl transition-all active:scale-95
            ${isActive 
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-none' 
              : 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-blue-500/40'}
          `}
          aria-label={isActive ? "Pause Session" : "Start Session"}
        >
          {isActive ? <Pause size={48} fill="currentColor" /> : <Play size={48} fill="currentColor" className="ml-2" />}
        </button>

        <div className="p-5 invisible">
          <RotateCcw size={28} />
        </div>
      </div>

      {/* Modal Notification */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md glass-card bg-white dark:bg-slate-900 p-8 text-center shadow-3xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-emerald-500" />
              <div className="mb-6 inline-flex p-4 bg-blue-500/10 text-blue-500 rounded-full animate-bounce">
                <BellRing size={32} />
              </div>
              <h3 className="text-2xl font-black mb-3">Session Update</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
                {modalMessage}
              </p>
              <button 
                onClick={() => setShowModal(false)}
                className="w-full btn-primary font-black tracking-widest py-4"
              >
                GOT IT
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" preload="auto" />
    </div>
  );
};
export default StudyTimer;
