import React from 'react';
import ReactDOM from 'react-dom/client';
// FIX: Removed .tsx extension
import App from './App';
// FIX: Removed .tsx extension
import { AuthProvider } from './contexts/AuthContext';
// FIX: Removed .tsx extension
import { LanguageProvider } from './contexts/LanguageContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </AuthProvider>
  </React.StrictMode>
);