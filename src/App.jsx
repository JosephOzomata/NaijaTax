// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import TaxApplication from './pages/TaxApplication';
import Dashboard from './pages/Dashboard';
// import Dashboard from './pages/Dashboard';
import ToTop from './components/ToTop';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/application' element={<TaxApplication />} />
      </Routes>
      <ToTop />
    </Router>
  );
}

export default App;