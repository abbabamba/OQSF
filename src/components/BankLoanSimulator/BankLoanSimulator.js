import React, { useState, useEffect, useMemo } from 'react';
import LoanForm from './LoanForm';
import AmortizationTable from './AmortizationTable';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import useLoanCalculator from '../../hooks/useLoanCalculator';
import { motion, AnimatePresence, color } from 'framer-motion';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { DollarSign, RefreshCw, BarChart2, Table, PieChart, Moon, Sun } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Label } from 'recharts';
import styles from './BankLoanSimulator.module.css';
import { red } from '@mui/material/colors';

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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(value);
  };

  const monthlyPaymentsData = useMemo(() => {
    return amortizationSchedule.map((row) => ({
      period: row.period,
      date: row.date,
      payment: parseFloat(row.payment.replace(/[^\d.-]/g, '')),
      principal: parseFloat(row.principal.replace(/[^\d.-]/g, '')),
      interest: parseFloat(row.interest.replace(/[^\d.-]/g, '')),
      balance: parseFloat(row.balance.replace(/[^\d.-]/g, ''))
    }));
  }, [amortizationSchedule]);

  const { totalInterest, totalPrincipal } = useMemo(() => {
    return monthlyPaymentsData.reduce((acc, row) => ({
      totalInterest: acc.totalInterest + row.interest,
      totalPrincipal: acc.totalPrincipal + row.principal
    }), { totalInterest: 0, totalPrincipal: 0 });
  }, [monthlyPaymentsData]);

  const pieChartData = useMemo(() => [
    { name: 'Principal', value: totalPrincipal },
    { name: 'Intérêts', value: totalInterest },
  ], [totalPrincipal, totalInterest]);

  const COLORS = ['#0088FE', '#FF8042'];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.darkMode : ''}`}>
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
            <p className={styles.nb}>Les résultats de ce simulateur sont fournis à titre indicatif.<br/> Pour avoir les termes exacts de votre crédit, veuillez contacter votre banque ou votre institution financière. </p>

          </form>
        </motion.div>

        <AnimatePresence>
          {result !== null && (
            <motion.div className={styles.resultContainer} {...fadeInUp}>
              <h2>Résultat du calcul</h2>
              {loanData.calculationType === 'loanTerm' && (
                <p>Durée du prêt : <strong>{formatCurrency(result)} ans</strong></p>
              )}
              {loanData.calculationType === 'maxLoanAmount' && (
                <p>Montant maximal du prêt : <strong>{formatCurrency(result)} FCFA</strong></p>
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
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={monthlyPaymentsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="period" 
                          label={{ value: 'Période', position: 'insideBottom', offset: -5 }} 
                        />
                        <YAxis 
                          label={{ value: 'Montant (FCFA)', angle: -90, position: 'insideLeft' }} 
                          tickFormatter={(value) => formatCurrency(value)}
                        />
                        <Tooltip 
                          formatter={(value, name) => [formatCurrency(value), name]}
                          labelFormatter={(value) => `Période ${value}`}
                        />
                        <Legend />
                        <Bar dataKey="principal" stackId="a" fill="#0088FE" name="Principal" />
                        <Bar dataKey="interest" stackId="a" fill="#FF8042" name="Intérêts" />
                      </BarChart>
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
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                        <Label
                          position="center"
                          content={({ viewBox: { cx, cy } }) => (
                            <text x={cx} y={cy} fill="#333" textAnchor="middle" dominantBaseline="central">
                              <tspan x={cx} dy="-1em" fontSize="16">{`Total: ${formatCurrency(totalPrincipal + totalInterest)}`}</tspan>
                              <tspan x={cx} dy="1.5em" fontSize="14">{`Durée: ${amortizationSchedule.length} périodes`}</tspan>
                            </text>
                          )}
                        />
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
          <button 
            onClick={toggleDarkMode} 
            className={styles.darkModeToggle}
            aria-label={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default BankLoanSimulator;
