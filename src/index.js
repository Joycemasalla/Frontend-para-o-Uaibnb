import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './pages/Navbar.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
