import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Moon, Sun, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import banksData from './banks.json';
import styles from './BankComparator.module.css';

const ComparateurBanques = () => {
  const [selectedFields, setSelectedFields] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showTooltip, setShowTooltip] = useState('');

  const categories = {
    "Conditions Générales du Compte": [
      "Ouverture de compte chèque",
      "Ouverture de compte d'épargne",
      "Frais de tenue de compte (mensuel)",
      "Frais de clôture de compte",
      "Taux créditeur compte épargne"
    ],
    "Services Rattachés au Fonctionnement du Compte": [
      "Édition de RIB",
      "Consultation du solde",
      "Attestation de solde",
      "Attestation de non engagement",
      "Frais de recherche de documents"
    ],
    "Moyens de Paiement": [
      "Carte GIM (compte courant)",
      "Carte Visa Gold"
    ],
    "Services Bancaires à Distance": [
      "Banque en ligne"
    ],
    "Opérations de Virement": [
      "Virement dans la même banque",
      "Virement vers une autre banque (UEMOA)"
    ],
    "Opérations avec l'Étranger": [
      "Transfert hors UEMOA"
    ]
  };

  const toggleBankSelection = (bankName) => {
    setSelectedBanks(prev => 
      prev.includes(bankName) 
        ? prev.filter(b => b !== bankName)
        : [...prev, bankName]
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const banksToCompare = selectedBanks.length > 0 ? selectedBanks : banksData.banks.map(bank => bank.name);

  const handleFieldToggle = (category, field) => {
    setSelectedFields(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: !prev[category]?.[field]
      }
    }));
  };

  const handleCategoryToggle = (category) => {
    const allFieldsSelected = categories[category].every(field => selectedFields[category]?.[field]);
    const newCategoryState = !allFieldsSelected;

    setSelectedFields(prev => ({
      ...prev,
      [category]: categories[category].reduce((acc, field) => {
        acc[field] = newCategoryState;
        return acc;
      }, {})
    }));
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const isCategoryFullySelected = (category) => {
    return categories[category].every(field => selectedFields[category]?.[field]);
  };

  const filteredFields = useMemo(() => {
    return Object.entries(categories).flatMap(([category, fields]) =>
      fields.filter(field => {
        const isSelected = selectedFields[category]?.[field];
        const matchesSearch = field.toLowerCase().includes(searchTerm.toLowerCase());
        return isSelected && matchesSearch;
      }).map(field => ({ category, field }))
    );
  }, [categories, selectedFields, searchTerm]);

  const sortedBanks = useMemo(() => {
    const sortableData = [...banksData.banks];
    if (sortConfig.key !== '') {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.darkMode : ''}`}>
      <h1 className={styles.title}>Comparateur de banques au Sénégal</h1>
      
      <div className={styles.topControls}>
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Rechercher un critère..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <Search className={styles.searchIcon} size={20} />
          </div>
        </div>
        <button onClick={toggleDarkMode} className={styles.darkModeToggle}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      
      <div className={styles.bankSelection}>
        <h3>Sélectionnez les banques à comparer :</h3>
        <div className={styles.bankCheckboxes}>
          {sortedBanks.map((bank) => (
            <label key={bank.name} className={styles.bankCheckbox}>
              <input
                type="checkbox"
                checked={selectedBanks.includes(bank.name)}
                onChange={() => toggleBankSelection(bank.name)}
              />
              {bank.name}
            </label>
          ))}
        </div>
      </div>
      
      <motion.div layout className={styles.categoriesGrid}>
        {Object.entries(categories).map(([category, fields]) => (
          <motion.div layout key={category} className={styles.categoryCard}>
            <button 
              onClick={() => toggleCategory(category)}
              className={styles.categoryButton}
            >
              <span>{category}</span>
              <motion.span
                animate={{ rotate: expandedCategories[category] ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} />
              </motion.span>
            </button>
            <AnimatePresence>
              {expandedCategories[category] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={styles.categoryContent}
                >
                  <div className={styles.selectAllWrapper}>
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={isCategoryFullySelected(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className={styles.checkbox}
                    />
                    <label htmlFor={`category-${category}`} className={styles.selectAllLabel}>
                      Tout sélectionner
                    </label>
                  </div>
                  {fields.map(field => (
                    <div key={field} className={styles.fieldWrapper}>
                      <input
                        type="checkbox"
                        id={`${category}-${field}`}
                        checked={selectedFields[category]?.[field] || false}
                        onChange={() => handleFieldToggle(category, field)}
                        className={styles.checkbox}
                      />
                      <label htmlFor={`${category}-${field}`} className={styles.fieldLabel}>
                        {field}
                        <button
                          className={styles.infoButton}
                          onMouseEnter={() => setShowTooltip(field)}
                          onMouseLeave={() => setShowTooltip('')}
                        >
                          <Info size={16} />
                        </button>
                        {showTooltip === field && (
                          <div className={styles.tooltip}>
                            Explication pour {field}
                            <button onClick={() => setShowTooltip('')} className={styles.closeTooltip}>
                              <X size={12} />
                            </button>
                          </div>
                        )}
                      </label>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
      
      <div className={styles.tableWrapper}>
  <table>
    <thead>
      <tr>
        <th className={`${styles.tableHeaderCell} ${styles.criteriaColumn}`}>
          Critères de comparaison
        </th>
        {banksToCompare.map((bankName) => (
          <th
            key={bankName}
            className={`${styles.tableHeaderCell} ${styles.bankColumn}`}
            onClick={() => requestSort(bankName)}
          >
            <div className={styles.bankHeaderContent}>
              {bankName}
              {sortConfig.key === bankName && (
                <span className={styles.sortIcon}>
                  {sortConfig.direction === 'ascending' ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </span>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {filteredFields.map(({ category, field }) => (
        <tr key={`${category}-${field}`} className={styles.tableRow}>
          <td className={`${styles.tableCell} ${styles.criteriaColumn}`}>
            {field}
          </td>
          {banksToCompare.map((bankName) => {
            const bank = sortedBanks.find((b) => b.name === bankName);
            return (
              <td
                key={bankName}
                className={`${styles.tableCell} ${styles.bankColumn}`}
              >
                {bank[category]?.[field] || 'Non disponible'}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
</div>

    
    </div>
  );
};

export default ComparateurBanques;



