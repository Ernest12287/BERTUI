// src/main.jsx
import 'bertui/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// If you want to use file-based routing, uncomment this:
/*
import { Router } from 'bertui/router';
import { routes } from '../.bertui/compiled/router.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router routes={routes} />
  </React.StrictMode>
);
*/

// Simple single-page app (default)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);