// File: src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import './MonitorApp.css';
import App from './App.jsx';
import MonitorApp from './MonitorApp.jsx';

const showMonitor = window.location.pathname.includes("monitor");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {showMonitor ? <MonitorApp /> : <App />}
  </StrictMode>
);