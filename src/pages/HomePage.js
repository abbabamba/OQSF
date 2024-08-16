import React, { useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ArrowRight, BarChart2, Calculator, Award, Users, TrendingUp } from 'lucide-react';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
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

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            L'OBSERVATOIRE DE LA QUALITÉ DES SERVICES FINANCIERS /SÉNÉGAL
          </h1>
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
