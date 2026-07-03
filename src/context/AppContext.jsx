import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme State
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  // Tasks State
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('student_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // CGPA State (Latest result)
  const [cgpaData, setCgpaData] = useState(() => {
    const saved = localStorage.getItem('cgpa_data');
    return saved ? JSON.parse(saved) : { gpa: '0.00', cgpa: '0.00', percentage: '0.00' };
  });

  // Total Study Time (Mock session tracking)
  const [studyTimeToday, setStudyTimeToday] = useState(() => {
    const saved = localStorage.getItem('study_time_today');
    return saved ? parseInt(saved) : 0; // in minutes
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('student_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('cgpa_data', JSON.stringify(cgpaData));
  }, [cgpaData]);

  useEffect(() => {
    localStorage.setItem('study_time_today', studyTimeToday.toString());
  }, [studyTimeToday]);

  const value = {
    darkMode,
    setDarkMode,
    tasks,
    setTasks,
    cgpaData,
    setCgpaData,
    studyTimeToday,
    setStudyTimeToday
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
