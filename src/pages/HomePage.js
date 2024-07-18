import React from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <section className={styles.intro}>
        <h1>Bienvenue sur le Simulateur de Prêt Bancaire de l'OQSF</h1>
        <p>Apprenez les notions de base sur les prêts bancaires et utilisez notre simulateur pour planifier vos finances.</p>
        <Button onClick={() => window.location.href = '/simulator'}>Commencer la Simulation</Button>
      </section>

      <section className={styles.section}>
        <h2>Les notions de base des prêts bancaires</h2>
        <div className={styles.cardContainer}>
          <Card className={styles.card}>
            <h3>Durée du prêt</h3>
            <p>La durée du prêt est la période pendant laquelle vous devez rembourser le prêt. Elle est généralement exprimée en années.</p>
          </Card>
          <Card className={styles.card}>
            <h3>Taux d'intérêt</h3>
            <p>Le taux d'intérêt est le pourcentage que la banque facture pour vous prêter de l'argent. Il peut être fixe ou variable.</p>
          </Card>
          <Card className={styles.card}>
            <h3>Paiements mensuels</h3>
            <p>Les paiements mensuels sont les montants que vous devez payer chaque mois pour rembourser le prêt.</p>
          </Card>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Comment fonctionne un prêt bancaire ?</h2>
        <div className={styles.cardContainer}>
          <Card className={styles.card}>
            <h3>Demande de prêt</h3>
            <p>Pour obtenir un prêt, vous devez soumettre une demande à la banque, qui évaluera votre solvabilité.</p>
          </Card>
          <Card className={styles.card}>
            <h3>Approbation et décaissement</h3>
            <p>Si votre demande est approuvée, la banque vous remettra les fonds du prêt.</p>
          </Card>
          <Card className={styles.card}>
            <h3>Remboursement</h3>
            <p>Vous devrez rembourser le prêt selon les termes convenus, y compris les intérêts.</p>
          </Card>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Conseils pour gérer vos prêts</h2>
        <div className={styles.cardContainer}>
          <Card className={styles.card}>
            <h3>Planifiez vos paiements</h3>
            <p>Assurez-vous que vos paiements mensuels sont abordables et planifiez-les dans votre budget.</p>
          </Card>
          <Card className={styles.card}>
            <h3>Surveillez les taux d'intérêt</h3>
            <p>Restez informé des taux d'intérêt et envisagez de refinancer votre prêt si les taux baissent.</p>
          </Card>
          <Card className={styles.card}>
            <h3>Consultez un conseiller financier</h3>
            <p>Un conseiller financier peut vous aider à gérer vos prêts et à optimiser vos finances.</p>
          </Card>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Comparer les Prêts Bancaires</h2>
        <p>Utilisez notre comparateur pour évaluer différentes options de prêt et trouver celle qui vous convient le mieux.</p>
        <Button onClick={() => window.location.href = '/comparateur'}>Accéder au Comparateur</Button>
      </section>
    </div>
  );
};

export default HomePage;