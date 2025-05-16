// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import NovaHospedagem from './pages/Add.jsx';
import EditarHospedagem from './pages/Edicao.jsx';
import Caracteristicas from './pages/Caracteristicas.jsx';
import NovaCaracteristica from './pages/NovaCaracteristica.jsx';
import EditarCaracteristica from './pages/EditarCaracteristica.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nova" element={<NovaHospedagem />} />
      <Route path="/editar/:id" element={<EditarHospedagem />} />
      <Route path="/caracteristicas" element={<Caracteristicas />} />
      <Route path="/caracteristicas/nova" element={<NovaCaracteristica />} />
      <Route path="/caracteristicas/editar/:id" element={<EditarCaracteristica />} />
    </Routes>
  );
}

export default App;
