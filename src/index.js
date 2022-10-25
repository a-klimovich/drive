import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
// COMPONENTS
import ErrorBoundary from 'components/error/ErrorBoundary';
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