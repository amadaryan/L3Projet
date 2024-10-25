import React, { useState, useEffect, useRef } from 'react';
import { Form, Header, Select, Input } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import './MultiStepForm.scss';

function MultiStepFormAppart() {
  const [step, setStep] = useState(1);
  const [animationClass, setAnimationClass] = useState('active');
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    m2: '',
    dateCreation: '',
    rue: '',
    codePostal: '',
    etatAppart: '',
    etage: '',
    balcon: '',
    nbPiece: '',
    consoEnergie: '',
  });

  const consoEnergieOptions = [
    { key: 'a', text: 'A', value: 'A' },
    { key: 'b', text: 'B', value: 'B' },
    { key: 'c', text: 'C', value: 'C' },
    { key: 'd', text: 'D', value: 'D' },
    { key: 'e', text: 'E', value: 'E' },
    { key: 'f', text: 'F', value: 'F' },
    { key: 'g', text: 'G', value: 'G' },
  ];

  const etatOptions = [
    { key: 'neuf', text: 'Neuf', value: 'neuf' },
    { key: 'bon', text: 'Bon', value: 'bon' },
    { key: 'moyen', text: 'Moyen', value: 'moyen' },
    { key: 'renover', text: 'À rénover', value: 'à rénover' },
  ];

  const balconOptions = [
    { key: 'oui', text: 'Oui', value: 'oui' },
    { key: 'non', text: 'Non', value: 'non' },
  ];

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
      pathRef.current.style.strokeDasharray = length;
      pathRef.current.style.strokeDashoffset = length;
    }
  }, []);

  const getStrokeDashOffset = () => {
    if (pathLength === 0) return 0;
    const totalSteps = 4;
    return pathLength - (step / totalSteps) * pathLength;
  };

  const handleChange = (e, { name, value }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStep = () => {
    if (step < 4) {
      setAnimationClass('exit-next');
      setTimeout(() => {
        setStep((prevStep) => prevStep + 1);
        setAnimationClass('active');
      }, 600);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setAnimationClass('exit-prev');
      setTimeout(() => {
        setStep((prevStep) => prevStep - 1);
        setAnimationClass('active');
      }, 600);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/estimation', { state: { formData } });
  };

  useEffect(() => {
    if (pathRef.current) {
      const offset = getStrokeDashOffset();
      pathRef.current.style.strokeDashoffset = offset;
    }
  }, [step, pathLength]);

  return (
    <div className="MultiStepForm" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', color: '#ffffff' }}>
      <Form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className={`formStep ${animationClass}`}>
            <Header as="h2" textAlign="center" className="header-step">
              <div className="step-highlight">Étape 1</div>
              <div className="step-description">Surface, Rue, et Date de Création</div>
            </Header>
            <Form.Field className="uniform-input">
              <label style={{ color: '#ffffff' }}>Surface (m²)</label>
              <Input
                type="number"
                name="m2"
                value={formData.m2}
                onChange={handleChange}
                placeholder="Surface en m²"
                className="uniform-input"
              />
            </Form.Field>
            <Form.Field className="uniform-input">
              <label style={{ color: '#ffffff' }}>Rue</label>
              <Input
                type="text"
                name="rue"
                value={formData.rue}
                onChange={handleChange}
                placeholder="Nom de la rue"
                className="uniform-input"
              />
            </Form.Field>
            <Form.Field className="uniform-input">
              <label style={{ color: '#ffffff' }}>Code Postal</label>
              <Input
                type="text"
                name="codePostal"
                value={formData.codePostal}
                onChange={handleChange}
                placeholder="Code postal"
                className="uniform-input"
              />
            </Form.Field>
            <Form.Field className="uniform-input">
              <label style={{ color: '#ffffff' }}>Date de création de l'immeuble</label>
              <Input
                type="date"
                name="dateCreation"
                value={formData.dateCreation}
                onChange={handleChange}
                className="uniform-input"
              />
            </Form.Field>
            <button type="button" onClick={nextStep} className="custom-button">
              Suivant
            </button>
          </div>
        )}
        {step === 2 && (
          <div className={`formStep ${animationClass}`}>
            <Header as="h2" textAlign="center" className="header-step">
              <div className="step-highlight">Étape 2</div>
              <div className="step-description">État et Étages</div>
            </Header>
            <Form.Field className="uniform-input">
              <label style={{ color: '#ffffff' }}>État de l'appartement</label>
              <Select
                name="etatAppart"
                value={formData.etatAppart}
                onChange={handleChange}
                options={etatOptions}
                placeholder="Sélectionnez l'état"
                className="uniform-input"
              />
            </Form.Field>
            <Form.Field className="uniform-input">
              <label style={{ color: '#ffffff' }}>Étage</label>
              <Input
                type="number"
                name="etage"
                value={formData.etage}
                onChange={handleChange}
                placeholder="Étage"
                className="uniform-input"
              />
            </Form.Field>
            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="custom-button">
                Précédent
              </button>
              <button type="button" onClick={nextStep} className="custom-button">
                Suivant
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className={`formStep ${animationClass}`}>
            <Header as="h2" textAlign="center" className="header-step">
              <div className="step-highlight">Étape 3</div>
              <div className="step-description">Balcon et Nombre de Pièces</div>
            </Header>
            <Form.Field className="uniform-input">
              <label style={{ color: '#ffffff' }}>Balcon</label>
              <Select
                name="balcon"
                value={formData.balcon}
                onChange={handleChange}
                options={balconOptions}
                placeholder="Avez-vous un balcon ?"
                className="uniform-input"
              />
            </Form.Field>
            <Form.Field className="uniform-input">
              <label style={{ color: '#ffffff' }}>Nombre de pièces</label>
              <Input
                type="number"
                name="nbPiece"
                value={formData.nbPiece}
                onChange={handleChange}
                placeholder="Nombre de pièces"
                className="uniform-input"
              />
            </Form.Field>
            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="custom-button">
                Précédent
              </button>
              <button type="button" onClick={nextStep} className="custom-button">
                Suivant
              </button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className={`formStep ${animationClass}`}>
            <Header as="h2" textAlign="center" className="header-step">
              <div className="step-highlight">Étape 4</div>
              <div className="step-description">Consommation d'Énergie</div>
            </Header>
            <Form.Field className="uniform-input">
              <label style={{ color: '#ffffff' }}>Consommation d'énergie (Classe)</label>
              <Select
                name="consoEnergie"
                value={formData.consoEnergie}
                onChange={handleChange}
                options={consoEnergieOptions}
                placeholder="Sélectionnez une classe énergétique"
                className="uniform-input"
              />
            </Form.Field>
            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="custom-button">
                Précédent
              </button>
              <button
                type="submit"
                className="custom-button"
                onMouseEnter={() => setIsSubmitHovered(true)}
                onMouseLeave={() => setIsSubmitHovered(false)}
              >
                Soumettre
              </button>
            </div>
          </div>
        )}
      </Form>
      <svg className="lineFinal" viewBox="0 0 1924.23193 468.72688">
        <path
          ref={pathRef}
          d="M0,676c85.31194-2.004,213.161,2.17926,362,37,434.84753,101.73206,468.42682,329.18506,706,313,264.22375-18.00061,348.21155-307.898,787-362,27.63123-3.40692,50.39514-5.10516,65-6"
          transform="translate(1.17417 -608.09359)"
          style={{ stroke: isSubmitHovered ? 'rgb(180, 120, 75)' : 'rgba(255, 255, 255, 0.1)', transition: '0.6s ease-in-out' }}
        />
      </svg>
    </div>
  );
}

export default MultiStepFormAppart;
