import React from 'react';
import ReactDOM from 'react-dom/client';
// ROUTER
import { BrowserRouter } from "react-router-dom";
// UTILS
import ErrorBoundary from './utils/error/ErrorBoundary';
// COMPONENTS
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>
);