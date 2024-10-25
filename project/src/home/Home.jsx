import React, { useState } from 'react';
import transition from '../transition';
import { Link } from 'react-router-dom';
import './Home.scss';
import Footer from '../footer/Footer';

function Home() {
  const [svgColor, setSvgColor] = useState('rgba(255, 255, 255, 0.1)');

  const handleMouseEnter = () => {
    setSvgColor('rgb(180, 120, 80)');
  };

  const handleMouseLeave = () => {
    setSvgColor('rgba(255, 255, 255, 0.1)');
  };

  const svgStyle = {
    stroke: svgColor,
    transition: 'stroke 0.3s ease-in-out',
  };

  return (
    <div className="Home">
      <div className="title">
        <h1>hESTia</h1>
        <h2>Quand la déesse du logis vous accompagne.</h2>
      </div>
      <div className="img"></div>
      <Link 
        className="estimateAnchor"
        to="/choice-type"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Estimez votre bien
      </Link>
      <div className="svgContainer">
        <svg className="line" viewBox="0 0 1318.7922 570.77934">
          <path
            style={svgStyle} 
            d="M-15,750c33.30828-32.80945,87.02121-77.80042,162.5-108.5,248.37207-101.02069,392.622,90.91864,587,11,191.35107-78.67413,170.58044-317.88083,419-405A468.37215,468.37215,0,0,1,1285,222" 
            transform="translate(32.5438 -197.03119)"
          />
        </svg>
      </div>
      <Footer />
    </div>
  );
}

export default transition(Home);
