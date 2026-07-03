import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Plus, Trash2, RotateCcw, Award, Percent, Hash } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CGPACalculator = () => {
  const { cgpaData, setCgpaData } = useAppContext();
  const [subjects, setSubjects] = useState([{ id: 1, grade: '', credits: '' }]);
  const [isCalculating, setIsCalculating] = useState(false);

  // Sync with context on load if context has data
  useEffect(() => {
    // Only set if subjects are still at default
    if (subjects.length === 1 && subjects[0].grade === '') {
      // Logic could be added here to restore subjects if saved,
      // but Requirement only asked for result storage.
    }
  }, []);

  const addSubject = () => {
    setSubjects([...subjects, { id: Date.now(), grade: '', credits: '' }]);
  };

  const removeSubject = (id) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((s) => s.id !== id));
    }
  };

  const handleInputChange = (id, field, value) => {
    // Basic sanitization
    if (field === 'grade' && (parseFloat(value) > 10 || parseFloat(value) < 0)) return;
    setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const calculateResults = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    
    // Simulate a brief calculation loading state for UX
    setTimeout(() => {
      let totalGradePoints = 0;
      let totalCredits = 0;
      let isValid = true;

      subjects.forEach((s) => {
        const grade = parseFloat(s.grade);
        const credits = parseFloat(s.credits);
        if (isNaN(grade) || isNaN(credits)) {
          isValid = false;
        } else {
          totalGradePoints += grade * credits;
          totalCredits += credits;
        }
      });

      if (!isValid || totalCredits === 0) {
        alert("Please fill in all fields with valid numbers.");
        setIsCalculating(false);
        return;
      }

      const gpa = totalGradePoints / totalCredits;
      const cgpa = gpa; 
      const percentage = cgpa * 9.5;

      setCgpaData({
        gpa: gpa.toFixed(2),
        cgpa: cgpa.toFixed(2),
        percentage: percentage.toFixed(2)
      });
      setIsCalculating(false);
    }, 600);
  };

  const reset = () => {
    setSubjects([{ id: 1, grade: '', credits: '' }]);
    setCgpaData({ gpa: '0.00', cgpa: '0.00', percentage: '0.00' });
  };

  return (
    <div className="space-y-10 pb-10">
      <header className="space-y-2">
        <h2 className="text-4xl font-black tracking-tight tracking-tight">Academic <span className="gradient-text">Insights</span></h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Precision calculation for your university grades and percentage.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Input Form */}
        <div className="xl:col-span-8 space-y-6">
          <form onSubmit={calculateResults} className="glass-card shadow-2xl shadow-blue-500/5 border-slate-200/50 dark:border-slate-800/50 p-8">
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {subjects.map((subject, index) => (
                  <motion.div 
                    key={subject.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col md:flex-row items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600/10 text-blue-600 font-bold text-sm shrink-0">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 w-full">
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                          type="number" 
                          step="0.01"
                          placeholder="Grade Points (e.g. 9.0)"
                          value={subject.grade}
                          onChange={(e) => handleInputChange(subject.id, 'grade', e.target.value)}
                          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex-1 w-full">
                      <div className="relative">
                        <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                          type="number" 
                          step="0.5"
                          placeholder="Credits (e.g. 4.0)"
                          value={subject.credits}
                          onChange={(e) => handleInputChange(subject.id, 'credits', e.target.value)}
                          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                          required
                        />
                      </div>
                    </div>

                    <button 
                      type="button" 
                      onClick={() => removeSubject(subject.id)}
                      className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                      aria-label="Remove subject"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-10 flex flex-wrap gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              <button 
                type="button" 
                onClick={addSubject}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 transition-all font-bold text-slate-500"
              >
                <Plus size={20} /> Add Subject
              </button>
              <button 
                type="submit" 
                disabled={isCalculating}
                className={`btn-primary flex items-center gap-2 py-3.5 ${isCalculating ? 'opacity-70 cursor-wait' : ''}`}
              >
                {isCalculating ? <RotateCcw className="animate-spin" size={20} /> : <Calculator size={20} />}
                {isCalculating ? 'Calculating...' : 'Run Analysis'}
              </button>
              <button 
                type="button" 
                onClick={reset}
                className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-400"
                title="Reset Calculator"
              >
                <RotateCcw size={22} />
              </button>
            </div>
          </form>
        </div>

        {/* Results Sidebar */}
        <div className="xl:col-span-4 space-y-6 sticky top-8">
          <h3 className="text-xl font-black uppercase tracking-widest text-slate-400">Scorecard</h3>
          
          <div className="space-y-6">
            <motion.div 
              initial={false}
              animate={{ scale: cgpaData.gpa > 0 ? 1 : 0.98 }}
              className="glass-card bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl shadow-blue-500/20 p-8 text-center"
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-100/70 mb-2">Term GPA</p>
              <p className="text-6xl font-black tabular-nums">{cgpaData.gpa}</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="w-8 h-0.5 bg-white/30 rounded-full"></span>
                <p className="text-xs font-bold text-white/80">OUT OF 10.0</p>
                <span className="w-8 h-0.5 bg-white/30 rounded-full"></span>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card text-center p-6 border-slate-200/50 dark:border-slate-800/50">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Cumulative</p>
                <p className="text-2xl font-black tabular-nums">{cgpaData.cgpa}</p>
              </div>
              <div className="glass-card text-center p-6 border-slate-200/50 dark:border-slate-800/50">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Percentage</p>
                <p className="text-2xl font-black tabular-nums">{cgpaData.percentage}%</p>
              </div>
            </div>

            <div className="glass-card p-6 border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                  <Percent size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Grading Policy</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Percentage is calculated as <span className="font-bold text-blue-600">CGPA × 9.5</span> as per standard university guidelines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CGPACalculator;
