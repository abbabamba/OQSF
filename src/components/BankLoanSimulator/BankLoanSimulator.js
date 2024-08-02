import React, { useState } from 'react';
import LoanForm from './LoanForm';
import AmortizationTable from './AmortizationTable';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import useLoanCalculator from '../../hooks/useLoanCalculator';
import MonthlyPaymentsChart from '../MonthlyPaymentsChart';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { DollarSign, RefreshCw, BarChart2, Table } from 'lucide-react';
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

  const [activeTab, setActiveTab] = useState(0);

  const formatResult = (value) => {
    return typeof value === 'number' ? value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : value;
  };

  const monthlyPaymentsData = amortizationSchedule.map((entry, index) => ({
    month: index + 1,
    paiement: entry.payment || 0
  }));

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  };

  return (
    <Card className={styles.container}>
      <motion.h1 className={styles.title} {...fadeInUp}>
        Simulateur de Prêt Bancaire OQSF
      </motion.h1>
      <motion.div {...fadeInUp}>
        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
          <LoanForm
            loanData={loanData}
            handleChange={handleChange}
            frequency={frequency}
            setFrequency={setFrequency}
          />
          <AnimatePresence>
            {error && (
              <motion.p className={styles.error} {...fadeInUp}>
                {error}
              </motion.p>
            )}
          </AnimatePresence>
          <div className={styles.buttonContainer}>
            <Button type="submit" className={styles.button}>
              <DollarSign className={styles.buttonIcon} />
              Calculer
            </Button>
          </div>
        </form>
      </motion.div>

      <AnimatePresence>
        {result !== null && (
          <motion.div className={styles.resultContainer} {...fadeInUp}>
            <h2>Résultat du calcul</h2>
            {loanData.calculationType === 'loanTerm' && (
              <p>Durée du prêt : <strong>{formatResult(result)} ans</strong></p>
            )}
            {loanData.calculationType === 'maxLoanAmount' && (
              <p>Montant maximal du prêt : <strong>{formatResult(result)} FCFA</strong></p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {amortizationSchedule.length > 0 && (
          <motion.div className={styles.resultContainer} {...fadeInUp}>
            <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
              <TabList className={styles.tabList}>
                <Tab className={styles.tab}>
                  <Table className={styles.tabIcon} />
                  Tableau d'amortissement
                </Tab>
                <Tab className={styles.tab}>
                  <BarChart2 className={styles.tabIcon} />
                  Graphique des paiements
                </Tab>
              </TabList>

              <TabPanel>
                <AmortizationTable schedule={amortizationSchedule} />
              </TabPanel>
              <TabPanel>
                <div className={styles.chartContainer}>
                  <MonthlyPaymentsChart data={monthlyPaymentsData} />
                </div>
              </TabPanel>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(amortizationSchedule.length > 0 || result !== null) && (
          <motion.div className={styles.buttonContainer} {...fadeInUp}>
            <Button onClick={resetCalculator} className={`${styles.button} ${styles.resetButton}`}>
              <RefreshCw className={styles.buttonIcon} />
              Réinitialiser
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default BankLoanSimulator;