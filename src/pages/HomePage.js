import React, { useEffect, useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ArrowRight, BarChart2, Calculator, Award, Users, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';

const bannerImages = [
  require('./images/banner12.png'),
  require('./images/banner3.png'),
  require('./images/banner13.png'),
  require('./images/banner6.png'),
  require('./images/banner7.png'),
  require('./images/banner8.png'),
  require('./images/banner9.png'),
  require('./images/banner10.png'),
  require('./images/banner11.png'),



];

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://bots.easy-peasy.ai/chat.min.js";
    script.setAttribute('data-chat-url', 'https://bots.easy-peasy.ai/bot/f2265627-a6fe-4f29-a858-0c9ef300b603');
    script.setAttribute('data-btn-position', 'bottom-right');
    script.setAttribute('data-widget-btn-color', '#114929');
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + bannerImages.length) % bannerImages.length);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.carouselContainer}>
          <img src={bannerImages[currentImageIndex]} alt={`Banner ${currentImageIndex + 1}`} className={styles.bannerImage} />
          <button onClick={prevImage} className={`${styles.carouselButton} ${styles.left}`}>
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextImage} className={`${styles.carouselButton} ${styles.right}`}>
            <ChevronRight size={24} />
          </button>
          <div className={styles.carouselDots}>
            {bannerImages.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${index === currentImageIndex ? styles.activeDot : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className={styles.headerContent}>
  <div className={styles.marqueeContainer}>
    <h1 className={styles.title}>
      L'OBSERVATOIRE DE LA QUALITÉ DES SERVICES FINANCIERS / SÉNÉGAL
    </h1>
  </div>
  <p className={styles.subtitle}>Votre partenaire pour une meilleure inclusion financière</p>
</div>

      </header>

      <main className={styles.mainContent}>
        <section className={styles.introSection}>
          <Card className={`${styles.introCard} ${styles.fadeIn}`}>
            <p className={styles.introText}>
              L'Observatoire de la Qualité des Services Financiers (OQSF/Sénégal) est un organisme consultatif créé par décret n° 2009-95 du 06 février 2009, placé sous l'autorité du Ministère des Finances et du Budget.
            </p>
          </Card>
        </section>

        <section className={styles.comparatorSection}>
          <h2 className={styles.sectionTitle}>L'importance d'un comparateur financier</h2>
          <Card className={`${styles.comparatorCard} ${styles.fadeIn}`}>
            <p className={styles.comparatorIntro}>
              Un comparateur financier est un outil essentiel pour prendre des décisions éclairées en matière de finances personnelles et d'investissements...
            </p>
            <ul className={styles.comparatorList}>
              <li><Award className={styles.icon} /> <strong>Économie de Temps :</strong> Regroupe des informations sur différents produits financiers en un seul endroit.</li>
              <li><Users className={styles.icon} /> <strong>Comparaison Facile :</strong> Offre une interface pour comparer facilement les taux d'intérêt, frais et caractéristiques des produits financiers.</li>
              <li><TrendingUp className={styles.icon} /> <strong>Économie d'Argent :</strong> Aide à identifier les meilleures offres et les produits les plus avantageux.</li>
            </ul>
          </Card>
        </section>

        <section className={styles.toolsSection}>
          <h2 className={styles.sectionTitle}>COMPARATEUR ET SIMULATEUR DE CRÉDIT</h2>
          <div className={styles.toolsGrid}>
            <Card className={`${styles.toolCard} ${styles.fadeIn}`}>
              <Calculator className={styles.toolIcon} />
              <h3 className={styles.toolTitle}>Simulateur</h3>
              <p className={styles.toolDescription}>
                Estimez vos mensualités et le coût total de votre crédit en quelques clics.
              </p>
              <Link to="/simulateur" className={styles.toolLink}>
                <Button className={styles.button}>
                  Lancer le simulateur
                  <ArrowRight className={styles.buttonIcon} />
                </Button>
              </Link>
            </Card>
            <Card className={`${styles.toolCard} ${styles.fadeIn}`}>
              <BarChart2 className={styles.toolIcon} />
              <h3 className={styles.toolTitle}>Comparateur</h3>
              <p className={styles.toolDescription}>
                Comparez les offres des différentes banques pour trouver le meilleur crédit.
              </p>
              <Link to="/comparateur" className={styles.toolLink}>
                <Button className={styles.button}>
                  Comparer les offres
                  <ArrowRight className={styles.buttonIcon} />
                </Button>
              </Link>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
