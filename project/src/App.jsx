import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
// import Mouse from './Mouse';
import Navbar from './navbar/Navbar';
import Home from './home/Home';
import Form from './estimate/forms/Form';
import Estimate from "./estimate/Estimate";
import './App.scss';
import ChoiceType from './estimate/ChoiceType';

function App() {
  const location = useLocation();
  return (
    <>
      {/* <Mouse /> */}
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/choice-type" element={<ChoiceType />} />
          <Route path="/estimate/form" element={<Form />} />
          <Route path="/estimation" element={<Estimate />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
