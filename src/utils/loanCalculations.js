import { addMonths, format } from 'date-fns';

const formatNumber = (num) => new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'XOF',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(num).replace('XOF', 'FCFA');

export const calculateAmortizationSchedule = (loanAmount, interestRate, loanTerm, startDate, frequency, interestType, gracePeriod = 0, variableRates = []) => {
  if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
    throw new Error("Les valeurs du prêt doivent être positives.");
  }

  const schedule = [];
  let balance = loanAmount;
  const paymentFrequency = frequency === 'monthly' ? 12 : frequency === 'quarterly' ? 4 : 1;
  const totalPayments = loanTerm * paymentFrequency;
  let monthlyInterestRate = interestRate / 100 / 12;
  const monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

  let paymentDate = new Date(startDate);

  for (let i = 1; i <= totalPayments; i++) {
    if (interestType === 'variable' && variableRates.length > 0) {
      const yearIndex = Math.floor((i - 1) / paymentFrequency);
      if (variableRates[yearIndex] !== undefined) {
        monthlyInterestRate = variableRates[yearIndex] / 100 / 12;
      }
    }

    const interestPayment = balance * monthlyInterestRate;
    const principalPayment = i <= gracePeriod ? 0 : monthlyPayment - interestPayment;
    
    balance -= principalPayment;

    schedule.push({
      period: i,
      date: format(paymentDate, 'dd/MM/yyyy'),
      payment: formatNumber(i <= gracePeriod ? interestPayment : monthlyPayment),
      principal: formatNumber(principalPayment),
      interest: formatNumber(interestPayment),
      balance: formatNumber(balance)
    });

    paymentDate = addMonths(paymentDate, 12 / paymentFrequency);
  }

  return schedule;
};

export const calculateLoanTerm = (loanAmount, interestRate, monthlyPayment, frequency) => {
  if (loanAmount <= 0 || interestRate <= 0 || monthlyPayment <= 0) {
    throw new Error("Les valeurs du prêt doivent être positives.");
  }

  const paymentFrequency = frequency === 'monthly' ? 12 : frequency === 'quarterly' ? 4 : 1;
  const monthlyInterestRate = interestRate / 100 / 12;
  
  const totalPayments = Math.log(monthlyPayment / (monthlyPayment - loanAmount * monthlyInterestRate)) / Math.log(1 + monthlyInterestRate);
  
  return (totalPayments / paymentFrequency).toFixed(2);
};

export const calculateMaxLoanAmount = (interestRate, loanTerm, monthlyPayment, frequency) => {
  if (interestRate <= 0 || loanTerm <= 0 || monthlyPayment <= 0) {
    throw new Error("Les valeurs du prêt doivent être positives.");
  }

  const paymentFrequency = frequency === 'monthly' ? 12 : frequency === 'quarterly' ? 4 : 1;
  const totalPayments = loanTerm * paymentFrequency;
  const monthlyInterestRate = interestRate / 100 / 12;
  
  return (monthlyPayment * (Math.pow(1 + monthlyInterestRate, totalPayments) - 1)) / (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments));
};