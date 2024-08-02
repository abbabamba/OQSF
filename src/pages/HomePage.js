import React, { useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import habibImage from './habib.png';
import { ArrowRight, BarChart2, Calculator } from 'lucide-react';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  useEffect(() => {
    // Ajouter le script du bot
    const script = document.createElement('script');
    script.src = "https://bots.easy-peasy.ai/chat.min.js";
    script.setAttribute('data-chat-url', 'https://bots.easy-peasy.ai/bot/f2265627-a6fe-4f29-a858-0c9ef300b603');
    script.setAttribute('data-btn-position', 'bottom-right');
    script.setAttribute('data-widget-btn-color', '#114929');
    script.defer = true;
    document.body.appendChild(script);

    // Nettoyage
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className="container mx-auto px-4">
          <h1 className={styles.title}>
            L'OBSERVATOIRE DE LA QUALITÉ DES SERVICES FINANCIERS /SÉNÉGAL
          </h1>
        </div>
      </header>
  
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <Card className={styles.card}>
            <div className="p-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                L'Observatoire de la Qualité des Services Financiers (OQSF/Sénégal) est un organisme consultatif créé par décret n° 2009-95 du 06 février 2009, placé sous l'autorité du Ministère des Finances et du Budget
              </p>
            </div>
          </Card>
        </section>
  
        <section className="mb-12">
          <h2 className={`${styles.sectionTitle} text-3xl font-semibold mb-6 text-center`}>MINISTRE DES FINANCES ET DU BUDGET</h2>
          <Card className={styles.card}>
            <div className="p-6 flex flex-col items-center">
              <p className="text-2xl font-medium text-green-600 mb-4">L'OQSF, ÉPICENTRE DE L'INCLUSION FINANCIÈRE</p>
              <img src={habibImage} alt="Ministre des Finances" className={`${styles.ministerImage} w-48 h-48 rounded-full shadow-md mb-4`} />
              <p className="text-xl font-medium">Habib NDAO</p>
            </div>
          </Card>
        </section>
  
        <section className="mb-12">
          <h2 className={`${styles.sectionTitle} text-3xl font-semibold mb-6 text-center`}>Le mot du Secrétaire Exécutif</h2>
          <Card className={styles.card}>
            <div className="p-6">
              <p className="text-gray-700 mb-4 leading-relaxed">
                La mise en place de l'Observatoire de la Qualité des Services Financiers (OQSF) qui constitue la première expérience du genre dans l'espace de l'Union Économique et Monétaire Ouest Africaine (UEMOA), répond à la volonté des pouvoirs publics de promouvoir l'inclusion financière, de réduire l'incompréhension et la méfiance dans la relation entre les prestataires de ces services financiers et leurs clients ou usagers, y compris à travers la mission de médiation financière.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Dans un contexte marqué par la mise en œuvre du Plan Sénégal Emergent (PSE) où la promotion du Low Income Banking (LIB) et du Low Income Insurance (LII) y occupent une place centrale, l'Observatoire de la Qualité des Services Financiers (OQSF) entend jouer pleinement le rôle d'épicentre en vue de renforcer son cadre stratégique d'intervention dans l'écosystème pour une grande inclusion financière à travers l'amélioration continue de la qualité des services financiers, la mission de veille, la vulgarisation des meilleures pratiques par le biais d'un programme d'éducation financière de masse et une protection efficiente des clients grâce au dispositif gratuit de médiation.
              </p>
            </div>
          </Card>
        </section>
  
        <section className="mb-12">
          <h2 className={`${styles.sectionTitle} text-3xl font-semibold mb-6 text-center`}>COMPARATEUR ET SIMULATEUR DE CRÉDIT</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className={`${styles.toolCard} ${styles.card}`}>
              <div className="p-6 flex flex-col items-center">
                <Calculator className={`${styles.toolIcon} mb-4`} />
                <h3 className="text-2xl font-semibold mb-4 text-green-700">Simulateur</h3>
                <p className="text-gray-700 mb-6 text-center">
                  Estimez vos mensualités et le coût total de votre crédit en quelques clics.
                </p>
                <Link to="/simulator">
                <Button className={styles.button}>
                  Lancer le simulateur
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button></Link>
              </div>
            </Card>
            <Card className={`${styles.toolCard} ${styles.card}`}>
              <div className="p-6 flex flex-col items-center">
                <BarChart2 className={`${styles.toolIcon} mb-4`} />
                <h3 className="text-2xl font-semibold mb-4 text-green-700">Comparateur</h3>
                <p className="text-gray-700 mb-6 text-center">
                  Comparez les offres des différentes banques pour trouver le meilleur crédit.
                </p>
                <Link to="/comparateur">
                <Button className={styles.button} >
                  Comparer les offres
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button></Link>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;



