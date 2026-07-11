// context/LanguageContext.js
import React, { createContext, useState, useEffect } from 'react';
import { translations } from '.';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [direction, setDirection] = useState('ltr');

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 
                     (navigator.language.startsWith('ar') ? 'ar' : 'en');
    setLanguage(savedLang);
    updateDocumentSettings(savedLang);
  }, []);

  const updateDocumentSettings = (lang) => {
    const isRTL = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    setDirection(isRTL ? 'rtl' : 'ltr');
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    updateDocumentSettings(lang);
  };

  // Translation function
  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, direction }}>
      {children}
    </LanguageContext.Provider>
  );
};