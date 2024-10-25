import React, { useState } from 'react';
import { Form, Header, Select, Input } from 'semantic-ui-react';
import './MultiStepForm.scss';

function MultiStepFormMaison() {
  const [step, setStep] = useState(1);
  const [animationClass, setAnimationClass] = useState('active');

  const [formData, setFormData] = useState({
    m2: '',
    dateCreation: '',
    etatMaison: '',
    etage: '',
    jardin: '',
    piscine: '',
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

  const handleChange = (e, { name, value }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStep = () => {
    setAnimationClass('exit-next');
    setTimeout(() => {
      setStep((prevStep) => prevStep + 1);
      setAnimationClass('active');
    }, 600);
  };

  const prevStep = () => {
    setAnimationClass('exit-prev');
    setTimeout(() => {
      setStep((prevStep) => prevStep - 1);
      setAnimationClass('active');
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

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

  const jardinOptions = [
    { key: 'oui', text: 'Oui', value: 'oui' },
    { key: 'non', text: 'Non', value: 'non' },
  ];

  const piscineOptions = [
    { key: 'oui', text: 'Oui', value: 'oui' },
    { key: 'non', text: 'Non', value: 'non' },
  ];

  return (
    <div className="MultiStepForm" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', color: '#ffffff' }}>
      <Form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className={`formStep ${animationClass}`}>
            <Header as="h2" textAlign="center" className="header-step">
              <div className="step-highlight">Étape 1</div>
              <div className="step-description">Surface et Date de Création</div>
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
              <label style={{ color: '#ffffff' }}>Date de création de la maison</label>
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
              <label style={{ color: '#ffffff' }}>État de la maison</label>
              <Select
                name="etatMaison"
                value={formData.etatMaison}
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
              <div className="step-description">Jardin, Piscine et Balcon</div>
            </Header>
            <Form.Field className="uniform-input">
              <label style={{ color: '#ffffff' }}>Jardin</label>
              <Select
                name="jardin"
                value={formData.jardin}
                onChange={handleChange}
                options={jardinOptions}
                placeholder="Avez-vous un jardin ?"
                className="uniform-input"
              />
            </Form.Field>
            <Form.Field className="uniform-input">
              <label style={{ color: '#ffffff' }}>Piscine</label>
              <Select
                name="piscine"
                value={formData.piscine}
                onChange={handleChange}
                options={piscineOptions}
                placeholder="Avez-vous une piscine ?"
                className="uniform-input"
              />
            </Form.Field>
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
              <div className="step-description">Nombre de Pièces et Consommation d'Énergie</div>
            </Header>
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
              <button type="submit" className="custom-button">
                Soumettre
              </button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}

export default MultiStepFormMaison;
