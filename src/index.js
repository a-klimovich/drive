import React from 'react';
import ReactDOM from 'react-dom/client';
// UTILS
import ErrorBoundary from './utils/errors/ErrorBoundary';
// COMPONENTS
import App from './App';
// STYLES
import './scss/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);