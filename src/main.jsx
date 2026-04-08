import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import GalleryPage from './components/GalleryPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import './index.css';

const path = window.location.pathname;

function Route() {
  if (path === '/' || path === '/index.html') return <App />;
  if (path === '/gallery') return <GalleryPage />;
  return <NotFoundPage />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Route />
  </React.StrictMode>
);
