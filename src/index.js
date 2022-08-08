import React from 'react';
import ReactDOM from 'react-dom/client';
// ROUTER
import { BrowserRouter } from "react-router-dom";
// UTILS
import ErrorBoundary from './utils/error/ErrorBoundary';
// COMPONENTS
import App from './App';

import {
  ConfigProvider
} from 'antd';

import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <ConfigProvider locale={locale}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </ErrorBoundary>
);