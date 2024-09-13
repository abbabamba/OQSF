import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AlertCircle, LogIn, Eye, EyeOff, Lock } from 'lucide-react';
import styles from './AdminLogin.module.css';

const Input = ({ icon: Icon, ...props }) => (
  <div className={styles.inputGroup}>
    {Icon && <Icon className={styles.inputIcon} size={18} />}
    <input {...props} className={styles.input} />
  </div>
);

const Button = ({ children, ...props }) => (
  <button {...props} className={styles.button}>
    {children}
  </button>
);

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://backend-oqsf.onrender.com/api/admin/login', {
        username,
        password
      });

      localStorage.setItem('adminToken', response.data.token);
      navigate('/admin/dashboard');
    } catch (error) {
      setError('Identifiants invalides. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.cardContent}>
          <div className={styles.iconContainer}>
            <div className={styles.icon}>
              <Lock className="text-blue-600" size={32} />
            </div>
          </div>
          <h2 className={styles.title}>Bienvenue, Admin !</h2>
          <form onSubmit={handleLogin} className={styles.form}>
            {error && (
              <div className={styles.errorMessage} role="alert">
                <AlertCircle className={styles.errorIcon} />
                <span>{error}</span>
              </div>
            )}
            <div>
              <label htmlFor="username" className={styles.label}>Nom d'utilisateur</label>
              <Input
                id="username"
                icon={LogIn}
                type="text"
                placeholder="Entrez votre nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className={styles.label}>Mot de passe</label>
              <div className={styles.inputGroup}>
                <Input
                  id="password"
                  icon={showPassword ? EyeOff : Eye}
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <span className={styles.buttonContent}>
                    <svg className={styles.spinner} viewBox="0 0 24 24">
                      <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className={styles.spinnerPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Connexion en cours...
                  </span>
                ) : (
                  <span className={styles.buttonContent}>
                    <LogIn className={styles.buttonIcon} /> Se connecter
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;