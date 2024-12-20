import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import banksData from './banks.json';  // Données pour les particuliers
import entrepriseOngData from './entreprise_ong.json';  // Données pour entreprises/ONG
import styles from './BankComparator.module.css';

const ComparateurBanques = () => {
  const [selectedFields, setSelectedFields] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [clientType, setClientType] = useState('particuliers');  // Nouvel état pour le type de client

  // Sélection dynamique des catégories selon le type de client
  const data = clientType === 'particuliers' ? banksData.banks : entrepriseOngData;
  const categories = useMemo(() => {
    return clientType === 'particuliers'
      ? {
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
        }
      : {
          "Conditions Générales du Compte Entreprises": [
            "Ouverture de compte chèque",
            "Ouverture de compte épargne",
            "Frais de tenue de compte (mensuel)",
            "Frais de clôture de compte"
          ],
          "Attestations et frais administratifs": [
            "Attestation d'engagement",
            "Attestation d'ouverture/clôture de compte",
            "Frais pour procuration"
          ],
          "Moyens de Paiement": [
            "Carte GIM (compte courant)",
            "Carte Visa Gold"
          ],
          "Opérations de Virement": [
            "Virement dans la même banque",
            "Virement vers une autre banque (UEMOA)"
          ],
          "Services Bancaires à Distance": [
            "Banque en ligne"
          ],
          "Opérations avec l'Étranger": [
            "Transfert hors UEMOA"
          ]
        };
  }, [clientType]);

  const toggleBankSelection = (bankName) => {
    setSelectedBanks((prev) =>
      prev.includes(bankName) ? prev.filter((b) => b !== bankName) : [...prev, bankName]
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const banksToCompare = selectedBanks.length > 0 ? selectedBanks : data.map((bank) => bank.name);

  const handleFieldToggle = (category, field) => {
    setSelectedFields((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: !prev[category]?.[field]
      }
    }));
  };

  const handleCategoryToggle = (category) => {
    const allFieldsSelected = categories[category].every((field) => selectedFields[category]?.[field]);
    const newCategoryState = !allFieldsSelected;

    setSelectedFields((prev) => ({
      ...prev,
      [category]: categories[category].reduce((acc, field) => {
        acc[field] = newCategoryState;
        return acc;
      }, {})
    }));
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const isCategoryFullySelected = (category) => {
    return categories[category].every((field) => selectedFields[category]?.[field]);
  };

  const filteredFields = useMemo(() => {
    return Object.entries(categories).flatMap(([category, fields]) =>
      fields
        .filter((field) => {
          const isSelected = selectedFields[category]?.[field];
          const matchesSearch = field.toLowerCase().includes(searchTerm.toLowerCase());
          return isSelected && matchesSearch;
        })
        .map((field) => ({ category, field }))
    );
  }, [categories, selectedFields, searchTerm]);

  const sortedBanks = useMemo(() => {
    const sortableData = [...data];
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
  }, [sortConfig, data]);

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
      <img src={bank.logoUrl} alt={`${bank.name} logo`} className={styles.bankLogo} />
      <span>{bank.name}</span>
    </label>
  ))}
</div>

      </div>

      <motion.div layout className={styles.categoriesGrid}>
        {Object.entries(categories).map(([category, fields]) => (
          <motion.div layout key={category} className={styles.categoryCard}>
            <button onClick={() => toggleCategory(category)} className={styles.categoryButton}>
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
                  {fields.map((field) => (
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
                {banksToCompare.map((bankName) => (
                  <th key={bankName}>{bankName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
  {filteredFields.map(({ category, field }) => (
    <tr key={`${category}-${field}`}>
      <td>{field}</td>
      {banksToCompare.map((bankName) => {
        const bank = data.find((b) => b.name === bankName);
        const value = bank[category]?.[field];
        
        // Gérer le cas où la valeur est un tableau d'objets
        if (Array.isArray(value)) {
          return (
            <td key={`${bankName}-${category}-${field}`}>
              <ul>
                {value.map((item, index) => (
                  <li key={index}>
                    {item.type}: {item.amount}
                  </li>
                ))}
              </ul>
            </td>
          );
        }

        // Gérer le cas où la valeur est un objet unique
        if (typeof value === 'object' && value !== null) {
          return (
            <td key={`${bankName}-${category}-${field}`}>
              {Object.entries(value).map(([key, val]) => (
                <div key={key}>
                  {key}: {val}
                </div>
              ))}
            </td>
          );
        }

        // Gérer les autres types de valeurs
        return <td key={`${bankName}-${category}-${field}`}>{value || 'N/A'}</td>;
      })}
    </tr>
  ))}
</tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default ComparateurBanques;
