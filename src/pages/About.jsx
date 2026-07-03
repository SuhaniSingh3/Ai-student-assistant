import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calculator, 
  Timer, 
  ListTodo, 
  Quote, 
  CheckCircle2,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Zap,
  Smartphone
} from 'lucide-react';

const About = () => {
  const features = [
    { 
      title: 'Dashboard', 
      desc: 'Centralized command center offering real-time progress analytics and daily academic insights.',
      icon: LayoutDashboard,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    { 
      title: 'GPA Engine', 
      desc: 'High-precision algorithm for GPA, CGPA and Percentage conversion with standardized university logic.',
      icon: Calculator,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    { 
      title: 'Focus Studio', 
      desc: 'Deep work environment leveraging the Pomodoro technique with interactive session tracking.',
      icon: Timer,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    { 
      title: 'Mission Control', 
      desc: 'Advanced task management with categorization and automated deadline prioritization.',
      icon: ListTodo,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10'
    },
    { 
      title: 'Wisdom Vault', 
      desc: 'A curated repository of 50+ motivational breakthroughs to maintain peak mental momentum.',
      icon: Quote,
      color: 'text-pink-500',
      bg: 'bg-pink-500/10'
    },
    { 
      title: 'Adaptive UX', 
      desc: 'Fully responsive glassmorphism interface with intelligent dark-mode synchronization.',
      icon: Sparkles,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10'
    }
  ];

  const coreValues = [
    { title: 'Privacy First', icon: ShieldCheck, desc: 'Zero cloud tracking. Your data stays in your local browser storage.' },
    { title: 'Peak Velocity', icon: Zap, desc: 'Blazing fast interactions powered by Vite and optimized React hooks.' },
    { title: 'Mobile Native', icon: Smartphone, desc: 'Built with a mobile-first philosophy for seamless academic management.' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-24 pb-24">
      {/* Hero Section */}
      <section className="text-center space-y-8 pt-10">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="inline-block p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] shadow-2xl shadow-blue-500/30 mb-4"
        >
          <GraduationCap size={80} className="text-white" />
        </motion.div>
        
        <div className="space-y-4">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            The Future of <br />
            <span className="gradient-text">Student Success.</span>
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Student AI is a premium, localized productivity suite engineered for the modern academic elite.
          </p>
        </div>
      </section>

      {/* Philosophy Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {coreValues.map((value, idx) => (
          <div key={value.title} className="glass-card p-8 border-slate-200/50 dark:border-slate-800/50 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
              <value.icon size={24} />
            </div>
            <h4 className="text-lg font-black uppercase tracking-widest">{value.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{value.desc}</p>
          </div>
        ))}
      </section>

      {/* Grid Features */}
      <section className="space-y-12">
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-black uppercase tracking-widest">Capabilities</h3>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.3em]">Full Feature Breakdown</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card group p-8 border-slate-200/50 dark:border-slate-800/50 hover:border-blue-500/30 transition-all"
            >
              <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-black mb-3">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Manifest Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glass-card p-12 md:p-20 rounded-[3.5rem] text-center border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-br from-white/50 to-slate-50 dark:from-slate-900/40 dark:to-slate-950 shadow-3xl"
      >
        <div className="mb-10 inline-flex p-5 bg-yellow-500/10 text-yellow-500 rounded-full">
          <Sparkles size={40} />
        </div>
        <h3 className="text-3xl md:text-4xl font-black mb-8">Our Manifesto</h3>
        <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 max-w-4xl mx-auto leading-relaxed italic font-medium">
          "We believe that great software shouldn't just be functional—it should be an experience. Our mission is to bridge the gap between complex academic management and effortless, high-performance design."
        </p>
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {['Privacy Centric', 'Zero Latency', 'Local First', 'Open Access'].map(tag => (
            <div key={tag} className="flex items-center gap-2 px-6 py-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              <CheckCircle2 size={14} /> {tag}
            </div>
          ))}
        </div>
      </motion.section>

      <footer className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <GraduationCap className="text-blue-500 w-5 h-5" />
          <span className="font-black text-xs uppercase tracking-[0.4em] opacity-30">Student AI Architecture v1.1.0</span>
        </div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">© 2026 Crafted with Excellence</p>
      </footer>
    </div>
  );
};
export default About;
