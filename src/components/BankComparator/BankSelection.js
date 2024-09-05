import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import styles from './BankComparator.module.css';

const BankSelection = ({ sortedBanks, selectedBanks, toggleBankSelection }) => {
  return (
    <div className={`${styles.bankSelectionContainer} bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300`}>
      <h3 className={`${styles.bankSelectionTitle} text-2xl font-bold mb-4 text-gray-800 dark:text-white`}>
        Sélectionnez les banques à comparer :
      </h3>
      <div className={`${styles.bankGrid} grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto pr-2`}>
        {sortedBanks.map((bank) => (
          <button
            key={bank.name}
            onClick={() => toggleBankSelection(bank.name)}
            className={`${styles.bankButton} flex items-center p-3 rounded-lg transition-all duration-300 ${
              selectedBanks.includes(bank.name)
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            } hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <div className={`${styles.bankIconWrapper} flex-shrink-0 mr-3`}>
              {selectedBanks.includes(bank.name) ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </div>
            <span className={`${styles.bankName} font-medium`}>{bank.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BankSelection;