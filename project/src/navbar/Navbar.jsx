import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
  return (
    <div className="Navbar">
      <Link to="/">Home</Link>
      <Link to="/estimate">Estimate</Link>
    </div>
  );
}

export default Navbar;
