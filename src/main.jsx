import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Methodology from './pages/Methodology';
import Sources from './pages/Sources';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="methodology" element={<Methodology />} />
          <Route path="sources" element={<Sources />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
