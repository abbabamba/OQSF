import React, { useState, useEffect } from 'react';
import LoanForm from './LoanForm';
import AmortizationTable from './AmortizationTable';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import useLoanCalculator from '../../hooks/useLoanCalculator';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { DollarSign, RefreshCw, BarChart2, Table, PieChart, Moon, Sun } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const formatResult = (value) => {
    return typeof value === 'number' ? value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : value;
  };

  const monthlyPaymentsData = amortizationSchedule.map((entry, index) => ({
    month: index + 1,
    paiement: entry.payment || 0,
    principal: entry.principal || 0,
    interest: entry.interest || 0
  }));

  const totalInterest = amortizationSchedule.reduce((sum, entry) => sum + entry.interest, 0);
  const totalPrincipal = amortizationSchedule.reduce((sum, entry) => sum + entry.principal, 0);

  const pieChartData = [
    { name: 'Principal', value: totalPrincipal },
    { name: 'Intérêts', value: totalInterest },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  };

  return (
    <div className={`${styles.backgroundContainer} ${isDarkMode ? styles.darkMode : ''}`}>
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
                  <Tab className={styles.tab}>
                    <PieChart className={styles.tabIcon} />
                    Répartition du prêt
                  </Tab>
                </TabList>

                <TabPanel>
                  <AmortizationTable schedule={amortizationSchedule} />
                </TabPanel>
                <TabPanel>
                  <div className={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={monthlyPaymentsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="paiement" stroke="#8884d8" name="Paiement total" />
                        <Line type="monotone" dataKey="principal" stroke="#82ca9d" name="Principal" />
                        <Line type="monotone" dataKey="interest" stroke="#ffc658" name="Intérêts" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={400}>
                      <RechartsPieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
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

        <div className={styles.toggleContainer}>
          <button onClick={toggleDarkMode} className={styles.darkModeToggle}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default BankLoanSimulator;
