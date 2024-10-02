import React from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import styles from './LoanForm.module.css';

const LoanForm = ({ loanData, handleChange, frequency, setFrequency }) => {
  return (
    <div className={styles.form}>
      <div className={styles.formGroup}>
        <h3>Type de calcul</h3>
        <div className={styles.inputWrapper}>
          <Select
            name="calculationType"
            value={loanData.calculationType}
            onChange={handleChange}
            options={[
              { value: 'amortization', label: 'Échéancier de remboursement' },
              { value: 'loanTerm', label: 'Durée du prêt' },
              { value: 'maxLoanAmount', label: 'Montant maximal du prêt' }
            ]}
            className={styles.select}
          />
        </div>
      </div>
      <div className={styles.formGroup}>
        <h3>Détails du prêt</h3>
        {loanData.calculationType !== 'maxLoanAmount' && (
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="loanAmount">Montant du prêt</label>
            <Input
              id="loanAmount"
              type="number"
              name="loanAmount"
              value={loanData.loanAmount}
              onChange={handleChange}
              placeholder="Ex: 1000000"
              required
              className={styles.input}
            />
          </div>
        )}
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="interestRate">Taux d'intérêt annuel (%)</label>
          <Input
            id="interestRate"
            type="number"
            name="interestRate"
            value={loanData.interestRate}
            onChange={handleChange}
            placeholder="Ex: 5.5"
            required
            className={styles.input}
          />
        </div>
        {loanData.calculationType !== 'loanTerm' && (
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="loanTerm">Durée du prêt (années)</label>
            <Input
              id="loanTerm"
              type="number"
              name="loanTerm"
              value={loanData.loanTerm}
              onChange={handleChange}
              placeholder="Ex: 20"
              required
              className={styles.input}
            />
          </div>
        )}
        {loanData.calculationType === 'amortization' && (
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="startDate">Date de début</label>
            <Input
              id="startDate"
              type="date"
              name="startDate"
              value={loanData.startDate}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
        )}
      </div>
      <div className={styles.formGroup}>
        <h3>Options de paiement</h3>
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="frequency">Fréquence de paiement</label>
          <Select
            id="frequency"
            name="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            options={[
              { value: 'monthly', label: 'Mensuel' },
              { value: 'quarterly', label: 'Trimestriel' },
              { value: 'annually', label: 'Annuel' }
            ]}
            className={styles.select}
          />
        </div>
        {(loanData.calculationType === 'loanTerm' || loanData.calculationType === 'maxLoanAmount') && (
          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="monthlyPayment">Paiement mensuel</label>
            <Input
              id="monthlyPayment"
              type="number"
              name="monthlyPayment"
              value={loanData.monthlyPayment}
              onChange={handleChange}
              placeholder="Ex: 10000"
              required
              className={styles.input}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanForm;