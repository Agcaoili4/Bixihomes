import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import './index.css';

const path = window.location.pathname;
const isHomeRoute = path === '/' || path === '/index.html';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isHomeRoute ? <App /> : <NotFoundPage />}
  </React.StrictMode>
);
