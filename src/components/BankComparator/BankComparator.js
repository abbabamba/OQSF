import React, { useState, useEffect } from 'react';
import styles from './BankComparator.module.css';
import banksData from './banks.json';

const BankComparator = () => {
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCriteria, setSelectedCriteria] = useState([]);

  const criteriaOptions = [
    { id: 'conditions_opening', label: "Conditions d'ouverture" },
    { id: 'conditions_closing', label: 'Conditions de fermeture' },
    { id: 'account_management', label: 'Gestion de compte' },
    { id: 'payment_methods', label: 'Moyens de paiement' },
    { id: 'online_management', label: 'Gestion en ligne' },
    { id: 'credit_card', label: 'Carte de crédit' },
    { id: 'mobile_app', label: 'Application mobile' },
  ];

  useEffect(() => {
    setBanks(banksData.banks);
    setFilteredBanks(banksData.banks);
  }, []);

  useEffect(() => {
    const filtered = banks.filter(bank => 
      bank.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBanks(filtered);
  }, [searchTerm, banks]);

  const handleCriteriaSelection = (criteriaId) => {
    setSelectedCriteria(prev => 
      prev.includes(criteriaId)
        ? prev.filter(id => id !== criteriaId)
        : [...prev, criteriaId]
    );
  };

  const renderCellContent = (bank, criteria) => {
    const content = bank[criteria];
    if (typeof content === 'string') {
      return content;
    } else if (Array.isArray(content)) {
      return content.join(', ');
    } else if (typeof content === 'object' && content !== null) {
      if (criteria === 'conditions_opening') {
        return (
          <div>
            <strong>Conditions :</strong> {Array.isArray(content.requirements) ? content.requirements.join(', ') : content.requirements}
            <br />
            <strong>Procédure :</strong> {content.procedure}
          </div>
        );
      } else if (criteria === 'account_management') {
        return (
          <div>
            <strong>Services :</strong> {Array.isArray(content.services) ? content.services.join(', ') : content.services}
            <br />
            <strong>Frais :</strong> {content.fees}
          </div>
        );
      } else if (criteria === 'online_management') {
        return (
          <div>
            <strong>Plateforme :</strong> {content.platform}
            <br />
            <strong>Accès :</strong> {content.access}
          </div>
        );
      }
    }
    return content === undefined ? 'Non spécifié' : JSON.stringify(content);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comparateur de Banques</h1>
      <div className={styles.filters}>
        <h2>Sélectionnez les critères à comparer</h2>
        <div className={styles.filterOptions}>
          {criteriaOptions.map(criteria => (
            <label key={criteria.id} className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={selectedCriteria.includes(criteria.id)}
                onChange={() => handleCriteriaSelection(criteria.id)}
                className={styles.checkbox}
              />
              <span className={styles.checkboxCustom}></span>
              {criteria.label}
            </label>
          ))}
        </div>
      </div>
      <input
        type="text"
        placeholder="Rechercher une banque..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.tableContainer}>
        <table className={styles.bankTable}>
          <thead>
            <tr>
              <th>Banque</th>
              {selectedCriteria.map(criteria => (
                <th key={criteria}>{criteriaOptions.find(option => option.id === criteria).label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredBanks.map((bank, index) => (
              <tr key={index} className={styles.bankRow}>
                <td className={styles.bankName}>{bank.name}</td>
                {selectedCriteria.map(criteria => (
                  <td key={criteria} className={styles.bankInfo}>{renderCellContent(bank, criteria)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankComparator;