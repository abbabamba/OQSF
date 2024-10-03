import React from 'react';
import styles from './AmortizationTable.module.css';

// Fonction utilitaire pour formater les nombres
const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
            <td>{formatNumber(parseFloat(row.payment).toFixed(2))} F CFA</td>
            <td>{formatNumber(parseFloat(row.principal).toFixed(2))} F CFA</td>
            <td>{formatNumber(parseFloat(row.interest).toFixed(2))} F CFA</td>
            <td>{formatNumber(parseFloat(row.balance).toFixed(2))} F CFA</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AmortizationTable;