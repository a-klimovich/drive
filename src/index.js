import React from 'react';
import ReactDOM from 'react-dom/client';
// UTILS
import ErrorBoundary from './utils/Error/ErrorBoundary';
// COMPONENTS
import App from './App';
// STYLES
import './assets/scss/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);