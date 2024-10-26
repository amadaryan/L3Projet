import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar({ language, toggleLanguage, translations }) {
  return (
    <div className="Navbar">
      <Link className="iconH" to="/">h</Link>
      <hr />
      <div className="nav-elements">
        <Link className="element" to="/">
          {translations[language].navbar.home}
        </Link>
        <span className="delimitor">|</span>
        <span
          className="element"
          onClick={toggleLanguage}
          style={{ cursor: 'pointer' }}
        >
          {translations[language].navbar.languageToggle}
        </span>
      </div>
    </div>
  );
}

export default Navbar;
