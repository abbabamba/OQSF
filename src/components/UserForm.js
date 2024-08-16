import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, Mail, AlertCircle, Loader } from 'lucide-react';
import styles from './UserForm.module.css';

function UserForm({ onSubmit, redirectTo }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        firstName,
        lastName,
        email
      });
      onSubmit(response.data);
      setIsSubmitted(true);
      setTimeout(() => navigate(redirectTo), 2000);
    } catch (error) {
      console.error('Error saving user data:', error);
      setError('Une erreur est survenue lors de l\'enregistrement de vos données. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>S'il vous plaît, avant de continuer...</h2>
        {error && (
          <div className={styles.errorMessage}>
            <AlertCircle className={styles.icon} />
            {error}
          </div>
        )}
        {isSubmitted ? (
          <div className={styles.successMessage}>
            <p>Merci ! Vos informations ont été enregistrées avec succès.</p>
            <p>Vous allez être redirigé dans quelques secondes...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName" className={styles.label}>Prénom</label>
              <div className={styles.inputWrapper}>
                <UserPlus className={styles.inputIcon} />
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Votre prénom"
                  required
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName" className={styles.label}>Nom</label>
              <div className={styles.inputWrapper}>
                <UserPlus className={styles.inputIcon} />
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Votre nom"
                  required
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  required
                  className={styles.input}
                />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className={styles.button}>
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