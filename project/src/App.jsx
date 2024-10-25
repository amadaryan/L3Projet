import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Home from './home/Home';
import Estimate from './estimate/Estimate';
import Form from './estimate/forms/Form';
import './App.scss';

function App() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/estimate" element={<Estimate />} />
          <Route path="/estimate/form" element={<Form />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
