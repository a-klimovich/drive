import React from 'react';
import ReactDOM from 'react-dom/client';
// ROUTER
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// PAGES
import Authorization from './Pages/Auth';
import ResetPassword from './Pages/ResetPassword';
// COMPONENTS
import App from './App';
// UTILS
import ErrorBoundary from './utils/error/ErrorBoundary';
// STYLES
import './assets/scss/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Authorization />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/store' element={<App />} />
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
);