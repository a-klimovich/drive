import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import ErrorBoundary from 'components/Error/ErrorBoundary';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <ConfigProvider locale={ruRU}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </ErrorBoundary>,
);
