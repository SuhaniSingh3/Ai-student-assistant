import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Timer, GraduationCap, Quote, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { quotes } from '../data/quotes';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const { tasks, cgpaData, studyTimeToday } = useAppContext();
  const [time, setTime] = useState(new Date());
  
  const randomQuote = useMemo(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, []);

  const completedTasks = tasks.filter(t => t.completed).length;
  const formattedStudyTime = `${Math.floor(studyTimeToday / 60)}h ${studyTimeToday % 60}m`;

  const stats = [
    { label: 'Tasks Completed', value: completedTasks, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Study Time Today', value: formattedStudyTime, icon: Timer, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Current CGPA', value: cgpaData.cgpa, icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: "Today's Quote", value: 'Motivation', icon: Quote, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-12 pb-10"
    >
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div variants={itemVariants} className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Hello, <span className="gradient-text">Achiever!</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
            You've completed <span className="text-blue-600 dark:text-blue-400 font-bold">{completedTasks} tasks</span> today. Keep the momentum!
          </p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="glass-card p-6 flex items-center gap-6 border-slate-200/50 dark:border-slate-800/50 min-w-[280px]"
        >
          <div className="bg-blue-600/10 p-4 rounded-2xl">
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p className="text-3xl font-black font-mono tracking-wider tabular-nums">{formatTime(time)}</p>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{formatDate(time)}</p>
          </div>
        </motion.div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card flex flex-col gap-5 border-slate-200/50 dark:border-slate-800/50 group"
            >
              <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:rotate-12`}>
                <Icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Quote Card */}
        <motion.section 
          variants={itemVariants}
          className="lg:col-span-2 glass-card relative overflow-hidden group border-slate-200/50 dark:border-slate-800/50 p-10 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-all duration-700 -rotate-12 group-hover:rotate-0">
            <Quote size={180} />
          </div>
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-500 rounded-lg text-xs font-black uppercase tracking-wider">
              <Zap size={14} /> Daily Spark
            </div>
            <p className="text-3xl md:text-4xl font-bold italic leading-snug tracking-tight text-slate-800 dark:text-white">
              "{randomQuote.split(' – ')[0]}"
            </p>
            <div className="flex items-center gap-4">
              <span className="w-10 h-1 bg-orange-500 rounded-full"></span>
              <p className="text-xl font-black gradient-text uppercase tracking-wide">
                {randomQuote.split(' – ')[1]}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section variants={itemVariants} className="space-y-6">
          <h3 className="text-xl font-black uppercase tracking-widest text-slate-400">Quick Actions</h3>
          <div className="space-y-4">
            {[
              { label: 'Pomodoro Session', path: '/timer', color: 'from-blue-600 to-indigo-600' },
              { label: 'Calculate Term GPA', path: '/cgpa', color: 'from-purple-600 to-pink-600' },
              { label: 'Add New Task', path: '/todo', color: 'from-emerald-600 to-teal-600' }
            ].map((action) => (
              <Link 
                key={action.label} 
                to={action.path}
                className="group flex items-center justify-between p-5 glass-card hover:bg-white dark:hover:bg-slate-800 transition-all border-slate-200/50 dark:border-slate-800/50"
              >
                <span className="font-bold">{action.label}</span>
                <div className={`p-2 bg-gradient-to-r ${action.color} rounded-lg text-white opacity-80 group-hover:opacity-100 transition-all group-hover:translate-x-1`}>
                  <ArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};
export default Dashboard;
