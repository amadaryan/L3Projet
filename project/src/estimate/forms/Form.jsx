import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MultiStepFormAppart from './MultiStepFormAppart';
import MultiStepFormMaison from './MultiStepFormMaison';
import './Form.scss';

function Form() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedProperty = location.state?.selectedProperty;

  console.log('Location State:', location.state);

  if (!selectedProperty) {
    return (
      <div>
        <p>Aucun type de bien sélectionné. Veuillez revenir à l'étape précédente.</p>
        <button onClick={() => navigate(-1)}>Retour</button>
      </div>
    );
  }

  return (
    <div className="Form">
      {selectedProperty === 'appartement' && <MultiStepFormAppart />}
      {selectedProperty === 'maison' && <MultiStepFormMaison />}
    </div>
  );
}

export default Form;
