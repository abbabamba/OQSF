import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Moon, Sun, Info, X, CheckCircle, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import banksData from './banks.json';
import styles from './BankComparator.module.css';

// Déplacez la définition de categories en dehors du composant
const categoriesData = {
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

const ComparateurBanques = () => {
  const [selectedFields, setSelectedFields] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showTooltip, setShowTooltip] = useState('');
  const [clientType, setClientType] = useState('particuliers');

  // Utilisez useMemo pour mémoriser l'objet categories
  const categories = useMemo(() => categoriesData, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

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

      <div className={styles.clientTypeSelector}>
        <button
          className={`${styles.clientTypeButton} ${clientType === 'particuliers' ? styles.active : ''}`}
          onClick={() => setClientType('particuliers')}
        >
          Particuliers
        </button>
        <button
          className={`${styles.clientTypeButton} ${clientType === 'entreprises' ? styles.active : ''}`}
          onClick={() => setClientType('entreprises')}
        >
          Entreprises/ONG
        </button>
      </div>

      {clientType === 'entreprises' && (
        <div className={styles.noticeEntreprises}>
          Les données pour les entreprises/ONG ne sont pas encore disponibles. Elles seront ajoutées prochainement.
        </div>
      )}

      {clientType === 'particuliers' && (
        <>
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
                    {expandedCategories[category] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
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

          {filteredFields.length > 0 && (
            <div className={styles.comparisonTableContainer}>
              <table className={styles.comparisonTable}>
                <thead>
                  <tr>
                    <th>Critères</th>
                    {selectedBanks.map((bank) => (
                      <th key={bank}>
                        <button onClick={() => toggleBankSelection(bank)} className={styles.bankName}>
                          {bank} <X size={14} />
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredFields.map(({ category, field }) => (
                    <tr key={field}>
                      <td>{field}</td>
                      {selectedBanks.map((bank) => (
                        <td key={`${bank}-${field}`}>
                          <div className={styles.comparisonCell}>
                            {banksData.banks.find(b => b.name === bank)?.criteria[field] === 'oui' ? (
                              <CheckCircle size={16} color="green" />
                            ) : (
                              <Circle size={16} color="gray" />
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ComparateurBanques;
