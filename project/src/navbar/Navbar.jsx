import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
  return (
    <div className="Navbar">
      <Link className="iconH" to="/">h</Link>
      <hr />  
      <div className="nav-elements">
        <Link className="element" to="/">Accueil</Link>
        <span className="delimitor">|</span>
        <span className="element">EN</span>
      </div>
    </div>
  );
}

export default Navbar;
