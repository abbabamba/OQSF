import React from 'react';
import LoanForm from './LoanForm';
import AmortizationTable from './AmortizationTable';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import useLoanCalculator from '../../hooks/useLoanCalculator';
import MonthlyPaymentsChart from '../MonthlyPaymentsChart';
import styles from './BankLoanSimulator.module.css';

const BankLoanSimulator = () => {
  const {
    loanData,
    handleChange,
    handleCalculate,
    amortizationSchedule,
    frequency,
    setFrequency,
    error,
    resetCalculator,
    result
  } = useLoanCalculator();

  const formatResult = (value) => {
    return typeof value === 'number' ? value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : value;
  };

  const monthlyPaymentsData = amortizationSchedule.map((entry, index) => ({
  month: index + 1,
  paiement: entry.payment || 0  // Utilise 0 si payment n'est pas défini
}));

  return (
    <Card className={styles.container}>
      <h1 className={styles.title}>Simulateur de Prêt Bancaire OQSF</h1>
      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
        <LoanForm
          loanData={loanData}
          handleChange={handleChange}
          frequency={frequency}
          setFrequency={setFrequency}
        />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttonContainer}>
          <Button type="submit" className={styles.button}>Calculer</Button>
        </div>
      </form>
      
      {result !== null && (
        <div className={styles.resultContainer}>
          <h2>Résultat du calcul</h2>
          {loanData.calculationType === 'loanTerm' && (
            <p>Durée du prêt : <strong>{formatResult(result)} ans</strong></p>
          )}
          {loanData.calculationType === 'maxLoanAmount' && (
            <p>Montant maximal du prêt : <strong>{formatResult(result)} FCFA</strong></p>
          )}
        </div>
      )}

      {amortizationSchedule.length > 0 && (
        <div className={styles.resultContainer}>
          <h2>Tableau d'amortissement</h2>
          <AmortizationTable schedule={amortizationSchedule} />
          <div className={styles.chartContainer}>
            <h2>Graphique des paiements mensuels</h2>
            <MonthlyPaymentsChart data={monthlyPaymentsData} />
          </div>
        </div>
      )}
      
      {(amortizationSchedule.length > 0 || result !== null) && (
        <div className={styles.buttonContainer}>
          <Button onClick={resetCalculator} className={`${styles.button} ${styles.resetButton}`}>Réinitialiser</Button>
        </div>
      )}
    </Card>
  );
};

export default BankLoanSimulator;