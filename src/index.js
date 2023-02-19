import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ConfirmProvider } from 'material-ui-confirm';
import { I18nextProvider } from 'react-i18next';

import App from './App';
import { AsterControllerProvider } from './context';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-phone-number-input/style.css'
import './index.scss';

import reportWebVitals from './reportWebVitals';
import AuthProtector from './AuthProtector';
import i18n from './i18n';

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={process.env.REACT_APP_ADMIN_BASE_PATH}>
        <AsterControllerProvider>
          <AuthProtector>
            <ConfirmProvider>
              <App />
            </ConfirmProvider>
          </AuthProtector>
        </AsterControllerProvider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
