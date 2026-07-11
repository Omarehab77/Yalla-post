// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Future flags to address deprecation warnings
const future = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter future={future}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);