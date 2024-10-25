import React from 'react';
import transition from '../transition';
import { useLocation } from 'react-router-dom';
import './Estimate.scss';

function Estimate() {
  const location = useLocation();
  const { formData } = location.state || {};

  return (
    <div className="Estimate">
      {formData ? (
        <div>
          <p>Surface: {formData.m2} m²</p>
          <p>Rue: {formData.rue}</p>
          <p>Code Postal: {formData.codePostal}</p>
          <p>Date de Création: {formData.dateCreation}</p>
          <p>État de la Maison: {formData.etatMaison}</p>
          <p>Étage: {formData.etage}</p>
          <p>Jardin: {formData.jardin}</p>
          <p>Piscine: {formData.piscine}</p>
          <p>Balcon: {formData.balcon}</p>
          <p>Nombre de Pièces: {formData.nbPiece}</p>
          <p>Consommation d'Énergie: {formData.consoEnergie}</p>
        </div>
      ) : (
        <p>Pas de données disponibles.</p>
      )}
    </div>
  );
}

export default transition(Estimate);
