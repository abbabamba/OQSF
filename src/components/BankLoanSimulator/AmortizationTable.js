import React from 'react';
import styles from './AmortizationTable.module.css';

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
            <td>{row.payment}</td>
            <td>{row.principal}</td>
            <td>{row.interest}</td>
            <td>{row.balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AmortizationTable;
