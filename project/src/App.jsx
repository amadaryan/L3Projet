import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Home from './home/Home';
import Form from './estimate/forms/Form';
import Estimate from "./estimate/Estimate";
import ChoiceType from './estimate/ChoiceType';
import { translations } from './lang';
import './App.scss';

function App() {
  const location = useLocation();
  const [language, setLanguage] = useState('fr');

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'fr' ? 'en' : 'fr'));
  };

  return (
    <>
      <Navbar language={language} toggleLanguage={toggleLanguage} translations={translations} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              <Home language={language} translations={translations} />
            } 
          />
          <Route path="/choice-type" element={<ChoiceType language={language} />} />
          <Route path="/estimate/form" element={<Form language={language} />} />
          <Route path="/estimation" element={<Estimate language={language} />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
