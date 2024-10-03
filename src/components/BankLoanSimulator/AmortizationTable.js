import React from 'react';
import styles from './AmortizationTable.module.css';

// Fonction pour formater les nombres avec des séparateurs de milliers
const formatNumber = (number) => {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number);
};

const AmortizationTable = ({ schedule }) => (
  <div className={styles.tableContainer}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Période</th>
          <th>Date</th>
          <th>Paiement</th>
          <th>Principal</th>
          <th>Intérêts</th>
          <th>Solde restant</th>
        </tr>
      </thead>
      <tbody>
        {schedule.map((row, index) => (
          <tr key={index}>
            <td>{row.period}</td>
            <td>{row.date}</td>
            <td>{formatNumber(row.payment)} F CFA</td>
            <td>{formatNumber(row.principal)} F CFA</td>
            <td>{formatNumber(row.interest)} F CFA</td>
            <td>{formatNumber(row.balance)} F CFA</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AmortizationTable;