import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import transition from '../transition';
import './ChoiceType.scss';

function ChoiceType() {
  const [leftSvgColor, setLeftSvgColor] = useState('rgba(255, 255, 255, 0.1)');
  const [rightSvgColor, setRightSvgColor] = useState('rgba(255, 255, 255, 0.1)');
  const navigate = useNavigate();

  const handleAppartMouseEnter = () => {
    setLeftSvgColor('rgb(180, 120, 80)');
  };

  const handleAppartMouseLeave = () => {
    setLeftSvgColor('rgba(255, 255, 255, 0.1)');
  };

  const handleMaisonMouseEnter = () => {
    setRightSvgColor('rgb(180, 120, 80)');
  };

  const handleMaisonMouseLeave = () => {
    setRightSvgColor('rgba(255, 255, 255, 0.1)');
  };

  const handleAppartClick = () => {
    navigate('/estimate/form', { state: { selectedProperty: 'appartement' } });
  };

  const handleMaisonClick = () => {
    navigate('/estimate/form', { state: { selectedProperty: 'maison' } });
  };

  const leftSvgStyle = {
    stroke: leftSvgColor,
    transition: 'stroke 0.3s ease-in-out',
  };

  const rightSvgStyle = {
    stroke: rightSvgColor,
    transition: 'stroke 0.3s ease-in-out',
  };

  return (
    <div className="ChoiceType">
      <h2>Quel type de bien souhaitez-vous estimer ?</h2>

      <div className="buttonContainer">
        <button
          className="estimateType appart"
          onClick={handleAppartClick}
          onMouseEnter={handleAppartMouseEnter}
          onMouseLeave={handleAppartMouseLeave}
        >
          Un appartement
        </button>

        <button
          className="estimateType maison"
          onClick={handleMaisonClick}
          onMouseEnter={handleMaisonMouseEnter}
          onMouseLeave={handleMaisonMouseLeave}
        >
          Une maison
        </button>
      </div>
      <div className="lineContainer lineContainerLeft">
        <svg className="leftLine" viewBox="0 0 557.73627 554.38366">
          <path
            style={leftSvgStyle}
            d="M0,567a457.07237,457.07237,0,0,1,64,2c142.19365,14.47943,303.44183,98.97772,390,253,57.30225,101.96405,63.46338,201.64227,62,258"
            transform="translate(1.55365 -526.65463)"
          />
        </svg>
      </div>
      <div className="lineContainer lineContainerRight">
        <svg className="rightLine" viewBox="0 0 557.73627 554.38366">
          <path
            style={rightSvgStyle}
            d="M1920.36523,567a457.0725,457.0725,0,0,0-64,2c-142.19366,14.47943-303.44183,98.97772-390,253-57.30224,101.96405-63.46337,201.64227-62,258"
            transform="translate(-1364.18261 -526.65463)"
          />
        </svg>
      </div>
    </div>
  );
}

export default transition(ChoiceType);
