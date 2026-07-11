import React, { useState, useEffect } from 'react';
import { Box, MenuItem, Select, FormControl, Typography } from '@mui/material';
import { Language } from '@mui/icons-material';

const LanguageSelector = ({ onLanguageChange }) => {
  const [language, setLanguage] = useState('en');


  export const LanguageContext = createContext();

  export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
  
    useEffect(() => {
      const savedLang = localStorage.getItem('language') || 'en';
      setLanguage(savedLang);
      document.documentElement.lang = savedLang;
      document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    }, []);
  
    const changeLanguage = (lang) => {
      setLanguage(lang);
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    };
  
    return (
      <LanguageContext.Provider value={{ language, changeLanguage }}>
        {children}
      </LanguageContext.Provider>
    );
  };



  useEffect(() => {
    // Get language from localStorage or default to English
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const handleChange = (event) => {
    const newLang = event.target.value;
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    onLanguageChange(newLang);
  };

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <Select
        value={language}
        onChange={handleChange}
        sx={{
          borderRadius: '8px',
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            py: 1
          }
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              mt: 1,
              '& .MuiMenuItem-root': {
                display: 'flex',
                alignItems: 'center'
              }
            }
          }
        }}
      >
        <MenuItem value="en">
          <Language sx={{ mr: 1, fontSize: '1rem' }} />
          <Typography variant="body1">English</Typography>
        </MenuItem>
        <MenuItem value="de">
          <Language sx={{ mr: 1, fontSize: '1rem' }} />
          <Typography variant="body1">Deutsch</Typography>
        </MenuItem>
        <MenuItem value="ar" sx={{ direction: 'rtl' }}>
          <Language sx={{ ml: 1, fontSize: '1rem' }} />
          <Typography variant="body1">العربية</Typography>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;