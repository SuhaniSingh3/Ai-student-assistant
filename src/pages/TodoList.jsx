import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Plus, Trash2, Search, Check, Filter, Tag, Calendar, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const TodoList = () => {
  const { tasks, setTasks } = useAppContext();
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('Personal');

  const categories = ['All', 'Personal', 'Academic', 'Work', 'Urgent'];

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTask = { 
      id: Date.now(), 
      text: input, 
      completed: false, 
      category: selectedCategory,
      createdAt: new Date().toISOString()
    };
    setTasks([newTask, ...tasks]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchesSearch = t.text.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [tasks, search, activeCategory]);

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tight">Mission <span className="gradient-text">Control</span></h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Streamline your academic workflow and never miss a deadline.</p>
        </div>
      </header>

      {/* Input & Search Section */}
      <section className="space-y-6">
        <form onSubmit={addTask} className="glass-card p-2 md:p-3 flex flex-col md:flex-row gap-3 border-slate-200/50 dark:border-slate-800/50 shadow-2xl shadow-blue-500/5">
          <div className="flex-1 relative group">
            <input 
              type="text" 
              placeholder="Deploy a new task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full pl-6 pr-4 py-4 bg-transparent font-bold text-lg outline-none placeholder:text-slate-400"
            />
          </div>
          
          <div className="flex items-center gap-2 px-4 border-l border-slate-200 dark:border-slate-800">
            <Tag size={18} className="text-blue-500" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent font-bold outline-none cursor-pointer text-sm uppercase tracking-widest"
            >
              {categories.filter(c => c !== 'All').map(c => (
                <option key={c} value={c} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">{c}</option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            className="btn-primary rounded-xl flex items-center justify-center py-4 px-8 font-black tracking-widest"
          >
            <Plus className="mr-2" /> ADD
          </button>
        </form>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all
                  ${activeCategory === cat 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search missions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-transparent focus:border-blue-500/30 outline-none transition-all font-medium text-sm"
            />
          </div>
        </div>
      </section>

      {/* Tasks List */}
      <div className="space-y-4 min-h-[300px]">
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredTasks.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card py-20 text-center flex flex-col items-center justify-center text-slate-400 border-dashed border-2"
            >
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <AlertCircle size={32} />
              </div>
              <p className="text-xl font-black text-slate-600 dark:text-slate-300">Quiet on the front...</p>
              <p className="text-sm font-medium">No tasks found matching your filters.</p>
            </motion.div>
          ) : (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`
                  flex items-center gap-5 p-5 glass-card group border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden
                  ${task.completed ? 'opacity-50' : ''}
                `}
              >
                {task.completed && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                )}
                
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={`
                    w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all shrink-0
                    ${task.completed 
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-blue-500'}
                  `}
                  aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
                >
                  {task.completed && <Check size={18} strokeWidth={4} />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <span className={`block text-lg font-bold truncate transition-all ${task.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white'}`}>
                    {task.text}
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      {task.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <Calendar size={10} /> {new Date(task.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => deleteTask(task.id)}
                  className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                  aria-label="Delete task"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {tasks.length > 0 && (
        <div className="flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              {tasks.filter(t => !t.completed).length} Tasks Operational
            </span>
          </div>
          <button 
            onClick={() => setTasks(tasks.filter(t => !t.completed))}
            className="text-xs font-black uppercase tracking-widest text-red-500/70 hover:text-red-500 transition-colors"
          >
            Purge Completed
          </button>
        </div>
      )}
    </div>
  );
};
export default TodoList;
