import React from 'react';
import ReactDOM from 'react-dom/client';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import ErrorBoundary from 'components/Error/ErrorBoundary';
import App from './App';

dayjs.locale('ru');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <ConfigProvider locale={ruRU}>
        <App />
      </ConfigProvider>
    </ErrorBoundary>
  </BrowserRouter>,
);
