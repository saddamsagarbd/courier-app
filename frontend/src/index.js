import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { ParcelProvider } from './context/ParcelContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ParcelProvider>
        <App />
      </ParcelProvider>
    </AuthProvider>
  </React.StrictMode>
);
reportWebVitals();
