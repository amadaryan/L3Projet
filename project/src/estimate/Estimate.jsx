// Importation des modules et des styles
import React from 'react';
import transition from '../transition';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Header,
  Segment,
  Statistic,
  Message,
  Grid,
  List,
} from 'semantic-ui-react';
import './Estimate.scss';
import data from '../data.json';

// Composant pour afficher les détails de la propriété
function PropertyDetails({ formData }) {
  const details = [
    { label: 'Surface', value: `${formData.m2} m²` },
    { label: 'Rue', value: formData.rue },
    { label: 'Code Postal', value: formData.codePostal },
    { label: 'État', value: formData.etatMaison },
    { label: 'Étage', value: formData.etage },
    { label: 'Jardin', value: formData.jardin },
    { label: 'Piscine', value: formData.piscine },
    { label: 'Balcon', value: formData.balcon },
    { label: 'Nombre de Pièces', value: formData.nbPiece },
    { label: 'Classe Énergétique', value: formData.consoEnergie },
  ].filter(item => item.value && item.value.trim() !== '');

  return (
    <Segment className="details-segment" inverted padded>
      <Header as="h3" className="section-header">Détails de la Propriété</Header>
      <List divided inverted relaxed>
        {details.map(({ label, value }, index) => (
          <List.Item key={index} style={{ paddingBottom: '8px' }}>
            <List.Content>
              <Grid columns={2}>
                <Grid.Row style={{ paddingTop: '18px', paddingBottom: '18px' }}>
                  <Grid.Column width={8}>
                    <List.Header>{label}</List.Header>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <List.Description>{value}</List.Description>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Segment>
  );
}



// Composant pour afficher les résultats de l'estimation
function EstimationResults({ adjustedPricePerM2, totalPrice }) {
  return (
    <Segment className="results-segment" inverted padded>
      <Header as="h3" className="section-header">Résultats de l'Estimation</Header>
      <Statistic.Group widths="two" inverted size="mini" className="montserrat-statistics">
        <Statistic>
          <Statistic.Value>
            {adjustedPricePerM2.toLocaleString('fr-FR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} €/m²
          </Statistic.Value>
          <Statistic.Label>Prix moyen ajusté par m²</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>
            {totalPrice.toLocaleString('fr-FR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} €
          </Statistic.Value>
          <Statistic.Label>Prix total estimé</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </Segment>
  );
}

// Composant pour afficher les résultats de la comparaison
function ComparisonResults({
  adjustedComparisonPricePerM2,
  comparisonTotalPrice,
  differencePercentage,
}) {
  return (
    <Segment className="comparison-segment" inverted padded>
      <Header as="h3" className="section-header">Comparaison avec un Code Postal Différent</Header>
      <p>Voici une comparaison avec une autre zone pour un bien de caractéristiques similaires :</p>
      <Statistic.Group widths="two" inverted size="mini" className="montserrat-statistics">
        <Statistic>
          <Statistic.Value>
            {adjustedComparisonPricePerM2.toLocaleString('fr-FR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} €/m²
          </Statistic.Value>
          <Statistic.Label>Prix moyen ajusté par m²</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>
            {comparisonTotalPrice.toLocaleString('fr-FR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} €
          </Statistic.Value>
          <Statistic.Label>Prix total estimé</Statistic.Label>
        </Statistic>
      </Statistic.Group>
      <Message warning inverted style={{ borderRadius: 0, border: '1px solid #444' }}>
        La différence de prix par m² par rapport à votre zone est de <strong>{differencePercentage.toFixed(2)}%</strong>.
      </Message>
    </Segment>
  );
}

// Composant principal pour l'estimation
function Estimate() {
  const location = useLocation();
  const { formData } = location.state || {};

  // Coefficients pour ajuster les prix
  const etatCoefficients = { neuf: 1.2, bon: 1.1, moyen: 1, 'à rénover': 0.8 };
  const consoEnergieCoefficients = { A: 1.1, B: 1.05, C: 1, D: 0.95, E: 0.9, F: 0.85, G: 0.8 };
  const balconCoefficient = formData.balcon === 'oui' ? 1.05 : 1;
  const jardinCoefficient = formData.jardin === 'oui' ? 1.1 : 1;
  const piscineCoefficient = formData.piscine === 'oui' ? 1.15 : 1;

  // Filtrer les données
  const filteredData = data.filter(
    item => item.cpostal === Number(formData.codePostal) &&
            item.mcarre >= Number(formData.m2) - 10 &&
            item.mcarre <= Number(formData.m2) + 10
  );
  const comparisonData = data.filter(
    item => item.cpostal !== Number(formData.codePostal) &&
            item.mcarre >= Number(formData.m2) - 10 &&
            item.mcarre <= Number(formData.m2) + 10
  );

  // Calculs des prix moyens ajustés
  const averagePrice = filteredData.reduce((sum, item) => sum + item.prixsurface, 0) / (filteredData.length || 1);
  const comparisonPrice = comparisonData.reduce((sum, item) => sum + item.prixsurface, 0) / (comparisonData.length || 1);

  const adjustedPricePerM2 = averagePrice * (etatCoefficients[formData.etatMaison] || 1) *
                             (consoEnergieCoefficients[formData.consoEnergie] || 1) *
                             balconCoefficient * jardinCoefficient * piscineCoefficient;
  const adjustedComparisonPricePerM2 = comparisonPrice *
                                       (etatCoefficients[formData.etatMaison] || 1) *
                                       (consoEnergieCoefficients[formData.consoEnergie] || 1) *
                                       balconCoefficient * jardinCoefficient * piscineCoefficient;
  const totalPrice = adjustedPricePerM2 * Number(formData.m2);
  const comparisonTotalPrice = adjustedComparisonPricePerM2 * Number(formData.m2);
  const differencePercentage = ((adjustedComparisonPricePerM2 - adjustedPricePerM2) / adjustedPricePerM2) * 100;

  return (
    <main className="Estimate">
      <Header as="h2" textAlign="center" className="main-header">
        Estimation de la Propriété
      </Header>
      {formData ? (
        <Container className="bordered-container">
          <Grid columns={2} stackable className="estimate-grid">
            <Grid.Column width={8}>
              <PropertyDetails formData={formData} />
            </Grid.Column>
            <Grid.Column width={8} className="right-content">
              <EstimationResults adjustedPricePerM2={adjustedPricePerM2} totalPrice={totalPrice} />
              {comparisonData.length > 0 ? (
                <ComparisonResults
                  adjustedComparisonPricePerM2={adjustedComparisonPricePerM2}
                  comparisonTotalPrice={comparisonTotalPrice}
                  differencePercentage={differencePercentage}
                />
              ) : (
                <Message warning inverted style={{ borderRadius: 0, border: '1px solid #444' }}>
                  <Message.Header>Aucune donnée comparable trouvée</Message.Header>
                  <p>Nous n'avons pas trouvé de données pour une autre zone. Essayez une autre recherche.</p>
                </Message>
              )}
            </Grid.Column>
          </Grid>
        </Container>
      ) : (
        <Message warning inverted style={{ borderRadius: 0, border: '1px solid #444' }}>
          <Message.Header>Pas de données disponibles</Message.Header>
          <p>Veuillez entrer les détails de votre propriété pour obtenir une estimation.</p>
        </Message>
      )}
      <svg className="lineFinal" viewBox="0 0 1924.23193 468.72688">
        <path
          d="M0,676c85.31194-2.004,213.161,2.17926,362,37,434.84753,101.73206,468.42682,329.18506,706,313,264.22375-18.00061,348.21155-307.898,787-362,27.63123-3.40692,50.39514-5.10516,65-6"
          transform="translate(1.17417 -608.09359)"
        />
      </svg>
    </main>
  );
}

export default transition(Estimate);
