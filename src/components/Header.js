import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { Menu, X } from 'lucide-react';
import oqsfLogo from './images/oqsf.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <img src={oqsfLogo} alt="OQSF Logo" />
        </div>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.menuOpen : ''}`}>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <Link to="/" className={styles.menuLink} onClick={toggleMenu}>Accueil</Link>
            </li>
            <li className={styles.menuItem}>
              <Link to="/comparateur" className={styles.menuLink} onClick={toggleMenu}>Comparateur</Link>
            </li>
            <li className={styles.menuItem}>
              <Link to="/simulator" className={styles.menuLink} onClick={toggleMenu}>Simulateur</Link>
            </li>
            <li className={styles.menuItem}>
              <Link to="/contact" className={styles.menuLink} onClick={toggleMenu}>Contact</Link>
            </li>
          </ul>
        </nav>
        <button className={styles.menuButton} onClick={toggleMenu} aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}>
  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
</button>
      </div>
    </header>
  );
};

export default Header;
