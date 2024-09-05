import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, Mail, Phone, AlertCircle, Loader, CheckCircle } from 'lucide-react';
import styles from './UserForm.module.css';

function UserForm({ onSubmit, redirectTo }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [shakeField, setShakeField] = useState('');
  const navigate = useNavigate();

  const encouragements = [
    "Excellent début ! Votre prénom est la première étape vers une expérience personnalisée.",
    "Parfait ! Votre nom complet nous aide à mieux vous connaître.",
    "Superbe ! Votre email nous permettra de vous tenir informé des meilleures offres.",
    "Bravo ! Votre numéro nous permettra de vous contacter si nécessaire."
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (value.trim() !== '') {
      setStep(prevStep => Math.max(prevStep, Object.keys(formData).indexOf(field) + 2));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await axios.post('https://backend-oqsf.onrender.com/api/users', formData);
      onSubmit(response.data);
      setIsSubmitted(true);
      setTimeout(() => navigate(redirectTo), 2000);
    } catch (error) {
      console.error('Error saving user data:', error);
      setError("Une erreur est survenue lors de l'enregistrement de vos données. Veuillez réessayer.");
      setShakeField('button');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (shakeField) {
      const timer = setTimeout(() => setShakeField(''), 500);
      return () => clearTimeout(timer);
    }
  }, [shakeField]);

  const renderInput = (field, icon, placeholder, type = 'text') => (
    <div className={styles.formGroup}>
      <label htmlFor={field} className={styles.label}>{placeholder}</label>
      <div className={styles.inputWrapper}>
        {icon}
        <input
          type={type}
          id={field}
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          required
          className={`${styles.input} ${step > Object.keys(formData).indexOf(field) + 1 ? styles.valid : ''} ${shakeField === field ? styles.shake : ''}`}
        />
        {step > Object.keys(formData).indexOf(field) + 1 && <CheckCircle className={styles.checkIcon} />}
      </div>
      {step === Object.keys(formData).indexOf(field) + 2 && (
        <p className={styles.encouragement}>{encouragements[Object.keys(formData).indexOf(field)]}</p>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>Bienvenue ! Commençons par faire connaissance</h2>
        {error && (
          <div className={styles.errorMessage}>
            <AlertCircle className={styles.icon} />
            {error}
          </div>
        )}
        {isSubmitted ? (
          <div className={styles.successMessage}>
            <CheckCircle className={styles.icon} />
            <p>Merci ! Vos informations ont été enregistrées avec succès.</p>
            <p>Vous allez être redirigé dans quelques secondes...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            {renderInput('firstName', <UserPlus className={styles.inputIcon} />, 'Votre prénom')}
            {renderInput('lastName', <UserPlus className={styles.inputIcon} />, 'Votre nom')}
            {renderInput('email', <Mail className={styles.inputIcon} />, 'Votre adresse email', 'email')}
            {renderInput('phoneNumber', <Phone className={styles.inputIcon} />, 'Votre numéro de téléphone', 'tel')}
            <button type="submit" disabled={isLoading} className={`${styles.button} ${shakeField === 'button' ? styles.shake : ''}`}>
              {isLoading ? (
                <>
                  <Loader className={styles.loadingIcon} />
                  Chargement...
                </>
              ) : (
                'Continuer'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserForm;