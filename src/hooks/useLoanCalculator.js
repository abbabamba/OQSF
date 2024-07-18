import { useState, useCallback } from 'react';
import { calculateAmortizationSchedule, calculateLoanTerm, calculateMaxLoanAmount } from '../utils/loanCalculations';

const validateInput = (value, fieldName) => {
  const num = parseFloat(value);
  if (isNaN(num) || num <= 0) {
    throw new Error(`${fieldName} doit être un nombre positif valide.`);
  }
  return num;
};

const useLoanCalculator = () => {
  const [loanData, setLoanData] = useState({
    loanAmount: '',
    interestRate: '',
    loanTerm: '',
    startDate: '',
    monthlyPayment: '',
    calculationType: 'amortization'
  });
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [frequency, setFrequency] = useState('monthly');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setLoanData(prev => ({ ...prev, [name]: value }));
    setError('');
  }, []);

  const handleCalculate = useCallback(() => {
    try {
      switch(loanData.calculationType) {
        case 'amortization':
          const validatedLoanAmount = validateInput(loanData.loanAmount, "Montant du prêt");
          const validatedInterestRate = validateInput(loanData.interestRate, "Taux d'intérêt");
          const validatedLoanTerm = validateInput(loanData.loanTerm, "Durée du prêt");
          if (!loanData.startDate) {
            throw new Error("Veuillez entrer une date de début valide.");
          }
          const schedule = calculateAmortizationSchedule(
            validatedLoanAmount,
            validatedInterestRate,
            validatedLoanTerm,
            loanData.startDate,
            frequency
          );
          setAmortizationSchedule(schedule);
          setResult(null);
          break;
        case 'loanTerm':
          const validatedLoanAmountTerm = validateInput(loanData.loanAmount, "Montant du prêt");
          const validatedInterestRateTerm = validateInput(loanData.interestRate, "Taux d'intérêt");
          const validatedMonthlyPaymentTerm = validateInput(loanData.monthlyPayment, "Paiement mensuel");
          const term = calculateLoanTerm(
            validatedLoanAmountTerm,
            validatedInterestRateTerm,
            validatedMonthlyPaymentTerm,
            frequency
          );
          setResult(term);
          setAmortizationSchedule([]);
          break;
        case 'maxLoanAmount':
          const validatedInterestRateMax = validateInput(loanData.interestRate, "Taux d'intérêt");
          const validatedLoanTermMax = validateInput(loanData.loanTerm, "Durée du prêt");
          const validatedMonthlyPaymentMax = validateInput(loanData.monthlyPayment, "Paiement mensuel");
          const maxAmount = calculateMaxLoanAmount(
            validatedInterestRateMax,
            validatedLoanTermMax,
            validatedMonthlyPaymentMax,
            frequency
          );
          setResult(maxAmount);
          setAmortizationSchedule([]);
          break;
        default:
          throw new Error("Type de calcul non reconnu");
      }
      setError('');
    } catch (err) {
      console.error('Erreur lors du calcul:', err);
      setError(`Une erreur s'est produite: ${err.message}`);
    }
  }, [loanData, frequency]);

  const resetCalculator = useCallback(() => {
    setLoanData({
      loanAmount: '',
      interestRate: '',
      loanTerm: '',
      startDate: '',
      monthlyPayment: '',
      calculationType: 'amortization'
    });
    setAmortizationSchedule([]);
    setFrequency('monthly');
    setError('');
    setResult(null);
  }, []);

  return {
    loanData,
    handleChange,
    handleCalculate,
    amortizationSchedule,
    frequency,
    setFrequency,
    error,
    resetCalculator,
    result
  };
};

export default useLoanCalculator;