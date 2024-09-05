import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { Menu, X } from 'lucide-react';
import oqsfLogo from './images/oqsf.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img src={oqsfLogo} alt="OQSF Logo" className={styles.logoImage} />
          </Link>
        </div>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.menuOpen : ''}`}>
          <ul className={styles.menu}>
            {['Accueil', 'Comparateur', 'Simulateur', 'Contact'].map((item) => (
              <li key={item} className={styles.menuItem}>
                {item === 'Contact' ? (
                  <a 
                    href="https://oqsf.sn/?page_id=659" 
                    className={styles.menuLink} 
                    onClick={toggleMenu}
                    target="_blank" // Utilisez cet attribut pour ouvrir dans un nouvel onglet
                    rel="noopener noreferrer" // Utilisez cet attribut pour des raisons de sécurité
                  >
                    {item}
                  </a>
                ) : (
                  <Link 
                    to={item === 'Accueil' ? '/' : `/${item.toLowerCase()}`} 
                    className={styles.menuLink} 
                    onClick={toggleMenu}
                  >
                    {item}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <button 
          className={styles.menuButton} 
          onClick={toggleMenu} 
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
