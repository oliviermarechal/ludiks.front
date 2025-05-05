'use client'

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Lightbulb, 
  TrendingUp,
  HelpCircle,
  BarChart3,
  Users2,
  Map,
  Trophy,
  Presentation,
  ArrowRight,
  Star,
  Target,
  AlertTriangle,
  Activity,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useEffect, useState } from 'react';
import { StrategyFormData, StrategyGenerator } from "@/components/strategy/generator";
import { StrategySuggestions } from "@/components/strategy/suggestions";
import { Modal } from "@/components/ui/modal";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

const completionData = [
  { name: 'Inscription', completion: 100, users: 450 },
  { name: 'Complétion profil', completion: 45, users: 203 },
  { name: '1er achat', completion: 40, users: 180 },
];

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default function Home() {
  const { width } = useWindowSize();
  const isMobile = width < 640;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [strategyData, setStrategyData] = useState<StrategyFormData | null>(null);
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplete = (data: StrategyFormData) => {
    setStrategyData(data);
    setShowSuggestions(true);
  };

  const handleGenerate = () => {
    router.push('/signup');
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setShowSuggestions(false);
    setStrategyData(null);
  };

  return (
    <main className="min-h-screen">
      <div className="relative landing-hero">
        <div className="container mx-auto pt-24 pb-16 relative px-4 md:px-8">
          <div className="flex flex-col items-center text-center space-y-8">
            <Badge variant="outline" className="bg-yellow-300 text-black font-bold">
              🚧 Bêta en cours
            </Badge>

            <h1 className="text-4xl md:text-6xl font-black landing-title pb-2">
              Transformez chaque parcours utilisateur en levier d&apos;engagement
            </h1>

            <p className="text-lg md:text-xl text-foreground/90 max-w-2xl font-light">
              Structurez, suivez et optimisez l&apos;expérience utilisateur à travers des parcours interactifs, 
              mesurables et activables. Sans recoder votre produit.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8 text-left max-w-3xl">
              <div className="flex items-center gap-3 bg-card/40 backdrop-blur-sm p-4 rounded-lg border border-primary/20 hover:border-primary transition-colors">
                <Eye className="text-secondary h-6 w-6" />
                <span className="font-medium text-foreground/90">Suivez chaque étape</span>
              </div>
              <div className="flex items-center gap-3 bg-card/40 backdrop-blur-sm p-4 rounded-lg border border-primary/20 hover:border-primary transition-colors">
                <Lightbulb className="text-secondary h-6 w-6" />
                <span className="font-medium text-foreground/90">Déclenchez des actions</span>
              </div>
              <div className="flex items-center gap-3 bg-card/40 backdrop-blur-sm p-4 rounded-lg border border-primary/20 hover:border-primary transition-colors">
                <TrendingUp className="text-secondary h-6 w-6" />
                <span className="font-medium text-foreground/90">Motivez vos users</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                Démarrer le générateur
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Soyez les premiers informés du lancement */}
      <div className="gradient-section py-16 relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary/5 before:to-transparent px-4">
        <div className="w-full max-w-md mt-8 mx-auto relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Soyez les premiers informés du lancement
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            Rejoignez la liste d&apos;attente pour être informé du lancement, recevoir une démo personnalisée et profiter de 3 mois gratuits.
          </p>
          <Card className="dark:bg-black bg-white shadow-sm border !border-primary/20 hover:!border-primary">
            <div className="p-6 relative">
              <div className="bg-white rounded-lg p-4 mx-auto relative">
                <iframe 
                  src="https://tally.so/embed/wQEqpg?alignLeft=1&hideTitle=1&transparentBackground=0&dynamicHeight=1" 
                  loading="lazy" 
                  width="100%" 
                  height="120" 
                  className="relative z-10"
                ></iframe>
              </div>
              <p className="dark:text-white/80 text-black/80 text-sm mt-4 font-mono text-center">
                🔓 Accès prioritaire à la bêta, démo personnalisée &nbsp;
                <strong className="text-secondary">3 mois gratuits</strong>
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Section Problématiques */}
      <div className="gradient-section py-16 relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary/5 before:to-transparent px-4">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Arrêtez de deviner pourquoi vos utilisateurs churn
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Identifiez et résolvez les points de friction qui freinent l&apos;adoption de votre produit
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4 items-start">
              <div className="bg-card p-3 rounded-lg border border-primary/20">
                <HelpCircle className="text-secondary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Votre onboarding est là... mais fonctionne-t-il ?</h3>
                <p className="text-foreground/70">Mesurez et optimisez chaque étape du parcours utilisateur</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-card p-3 rounded-lg border border-primary/20">
                <BarChart3 className="text-secondary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Une feature super... mais personne ne s&apos;en sert ?</h3>
                <p className="text-foreground/70">Créez des parcours guidés pour maximiser l&apos;adoption</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-card p-3 rounded-lg border border-primary/20">
                <Users2 className="text-secondary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Envie de gamifier sans tout recoder ?</h3>
                <p className="text-foreground/70">Ajoutez points et récompenses via notre API simple</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-card p-3 rounded-lg border border-primary/20">
                <TrendingUp className="text-secondary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Besoin de KPIs d&apos;engagement fiables ?</h3>
                <p className="text-foreground/70">Suivez la progression réelle de vos utilisateurs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Comment ça marche */}
      <div className="relative gradient-section py-16 before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-primary/5 before:to-transparent">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comment ça marche&nbsp;?
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Ludiks vous permet de créer des parcours d&apos;engagement sur-mesure, adaptés à vos objectifs business, et de les intégrer à votre produit en quelques minutes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group">
              <div className="bg-card p-6 rounded-xl border border-primary/20 transition-colors duration-300 hover:border-primary relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <Map className="text-secondary h-7 w-7" />
                  <h3 className="text-xl font-bold font-mono text-foreground/90">
                    1. Choisissez votre type de parcours
                  </h3>
                </div>
                <p className="text-foreground/70 mb-2">
                  Sélectionnez le parcours adapté à votre objectif&nbsp;:
                </p>
                <ul className="text-foreground/80 text-sm list-disc list-inside space-y-1">
                  <li>
                    <strong>Parcours d&apos;objectifs</strong> (ex&nbsp;: onboarding, funnel d&apos;achat, découverte de fonctionnalités)
                  </li>
                  <li>
                    <strong>Parcours récurrents</strong> (ex&nbsp;: utilisation répétée d&apos;une fonctionnalité, création de contenu, parrainage)
                  </li>
                  <li>
                    <strong>Parcours à points</strong> (ex&nbsp;: programme de fidélité, progression, &quot;pexing&quot; façon jeu vidéo)
                  </li>
                </ul>
              </div>
            </div>
            <div className="group">
              <div className="bg-card p-6 rounded-xl border border-primary/20 transition-colors duration-300 hover:border-primary relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="text-secondary h-7 w-7" />
                  <h3 className="text-xl font-bold font-mono text-foreground/90">
                    2. Intégrez Ludiks en quelques minutes
                  </h3>
                </div>
                <p className="text-foreground/70">
                  Copiez quelques lignes de code ou connectez notre API. Aucun développement complexe requis&nbsp;: vous pouvez suivre et récompenser vos utilisateurs instantanément.
                </p>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <pre className="text-sm text-foreground/70 font-mono">
                    <code>
                      {`// Installation du SDK
npm install @ludiks/sdk

// Initialisation
const ludiks = new Ludiks({
  apiKey: 'votre-clé-api',
  projectId: 'votre-projet'
});

// Suivi d'une action
ludiks.track('event_name', {
  userId: 'user_123',
  metadata: { /* ... */ }
});`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
            <div className="group">
              <div className="bg-card p-6 rounded-xl border border-primary/20 transition-colors duration-300 hover:border-primary relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <Presentation className="text-secondary h-7 w-7" />
                  <h3 className="text-xl font-bold font-mono text-foreground/90">
                    3. Analysez et optimisez
                  </h3>
                </div>
                <p className="text-foreground/70">
                  Visualisez la progression de vos utilisateurs, identifiez les points de friction et ajustez vos parcours pour maximiser l&apos;engagement, la conversion ou la rétention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nouvelle section Fonctionnalités avancées */}
      <div className="py-16 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Une solution complète pour vos besoins d&apos;engagement
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Des fonctionnalités avancées pour personnaliser, mesurer et optimiser vos parcours utilisateurs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-xl border border-primary/20 hover:border-primary transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Users2 className="text-secondary h-7 w-7" />
                <h3 className="text-xl font-bold text-foreground">Segmentation avancée</h3>
              </div>
              <ul className="space-y-2 text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Segmentation par comportement, profil ou historique</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Parcours personnalisés selon les segments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>A/B testing des parcours et des récompenses</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-xl border border-primary/20 hover:border-primary transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="text-secondary h-7 w-7" />
                <h3 className="text-xl font-bold text-foreground">Analytics en temps réel</h3>
              </div>
              <ul className="space-y-2 text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Suivi des KPIs d&apos;engagement en direct</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Détection automatique des points de friction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Export des données vers vos outils d&apos;analytics</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-xl border border-primary/20 hover:border-primary transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="text-secondary h-7 w-7" />
                <h3 className="text-xl font-bold text-foreground">Intégrations natives</h3>
              </div>
              <ul className="space-y-2 text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>API REST complète et documentation détaillée</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>SDK JavaScript et React pour une intégration rapide</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Webhooks pour synchroniser avec votre stack</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Section du générateur de stratégie */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Essayez notre générateur de stratégie de gamification
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            En quelques questions, obtenez des recommandations personnalisées pour booster l&apos;engagement, la conversion ou la rétention de vos utilisateurs. 
            <br />
            <span className="font-semibold text-secondary">C&apos;est l&apos;une des fonctionnalités phares de Ludiks.</span>
          </p>
          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground mb-4"
          >
            Démarrer le générateur
          </Button>
          <p className="text-sm text-muted-foreground">
            Testez gratuitement et découvrez comment Ludiks peut transformer vos parcours utilisateurs.
          </p>
        </div>
      </section>

      {/* Demo Section */}
      <div className="gradient-section py-16 relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-primary/5 before:to-transparent">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Une vue d&apos;ensemble claire de vos parcours
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Visualisez et optimisez l&apos;engagement de vos utilisateurs en temps réel
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Browser-like container */}
            <div className="rounded-xl overflow-hidden border border-primary/20 shadow-2xl bg-card/40 backdrop-blur-sm dark:bg-black/40">
              {/* Browser header */}
              <div className="bg-background border-b border-primary/10 flex items-center gap-2 px-4 py-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 backdrop-blur-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 backdrop-blur-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 backdrop-blur-sm"></div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-4 md:p-8 space-y-8 bg-gradient-to-b from-background/50 to-background dark:from-black/50 dark:to-black/80">
                {/* Circuits Overview Demo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group p-4 md:p-6 bg-card dark:bg-black/60 border border-primary/20 hover:border-primary rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-5 w-5 text-secondary" />
                          <h3 className="text-lg font-semibold text-foreground">Onboarding Produit</h3>
                        </div>
                        <p className="text-sm text-foreground/60">
                          Guide d&apos;intégration des nouveaux utilisateurs
                        </p>
                        <span className="inline-block px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded mt-2">
                          Objectifs
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      </div>
                    </div>

                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-2 px-2">
                      {["Inscription","Complétion profil", "1er achat"].map((step, i) => (
                        <div key={i} className="flex-shrink-0 flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                          <Activity className="h-4 w-4 text-secondary" />
                          <span className="text-xs text-foreground/80 whitespace-nowrap">{step}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 md:gap-4">
                      <div className="flex flex-col items-center p-2 md:p-3 bg-muted/50 rounded-lg">
                        <Users2 className="h-5 w-5 text-secondary mb-2" />
                        <span className="text-sm font-semibold text-foreground">450</span>
                        <span className="text-xs text-foreground/60">Utilisateurs</span>
                      </div>
                      <div className="flex flex-col items-center p-2 md:p-3 bg-muted/50 rounded-lg">
                        <Activity className="h-5 w-5 text-secondary mb-2" />
                        <span className="text-sm font-semibold text-foreground">72%</span>
                        <span className="text-xs text-foreground/60">Complétion</span>
                      </div>
                      <div className="flex flex-col items-center p-2 md:p-3 bg-muted/50 rounded-lg">
                        <Trophy className="h-5 w-5 text-secondary mb-2" />
                        <span className="text-sm font-semibold text-foreground">5</span>
                        <span className="text-xs text-foreground/60">Étapes</span>
                      </div>
                    </div>
                  </div>

                  {/* Second card with same responsive adjustments */}
                  <div className="group p-4 md:p-6 bg-card dark:bg-black/60 border border-primary/20 hover:border-primary rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-5 w-5 text-secondary" />
                          <h3 className="text-lg font-semibold text-foreground">Programme Fidélité</h3>
                        </div>
                        <p className="text-sm text-foreground/60">
                          Système de points et récompenses
                        </p>
                        <span className="inline-block px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded mt-2">
                          Points
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-2 px-2">
                      {["Premier achat", "Parrainage", "Avis client", "VIP Status"].map((step, i) => (
                        <div key={i} className="flex-shrink-0 flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                          <Activity className="h-4 w-4 text-secondary" />
                          <span className="text-xs text-foreground/80 whitespace-nowrap">{step}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 md:gap-4">
                      <div className="flex flex-col items-center p-2 md:p-3 bg-muted/50 rounded-lg">
                        <Users2 className="h-5 w-5 text-secondary mb-2" />
                        <span className="text-sm font-semibold text-foreground">890</span>
                        <span className="text-xs text-foreground/60">Utilisateurs</span>
                      </div>
                      <div className="flex flex-col items-center p-2 md:p-3 bg-muted/50 rounded-lg">
                        <Activity className="h-5 w-5 text-secondary mb-2" />
                        <span className="text-sm font-semibold text-foreground">45%</span>
                        <span className="text-xs text-foreground/60">Complétion</span>
                      </div>
                      <div className="flex flex-col items-center p-2 md:p-3 bg-muted/50 rounded-lg">
                        <Trophy className="h-5 w-5 text-secondary mb-2" />
                        <span className="text-sm font-semibold text-foreground">8</span>
                        <span className="text-xs text-foreground/60">Étapes</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Friction Point Analysis with Recharts */}
                <div className="p-4 md:p-8 bg-card dark:bg-black/60 border border-primary/20 hover:border-primary rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-red-500/10">
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-red-500 mb-1">Point de friction détecté</h3>
                      <p className="text-sm text-foreground/60">
                        Chute importante du taux de complétion à l&apos;étape &quot;Complétion profil&quot;
                      </p>
                    </div>
                    <div className="sm:ml-auto text-left sm:text-right mt-2 sm:mt-0">
                      <span className="text-2xl font-bold text-red-500">-40%</span>
                      <p className="text-sm text-foreground/60">de conversion</p>
                    </div>
                  </div>

                  <div className="h-64 w-full min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={completionData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--primary)" strokeOpacity={0.1} />
                        <XAxis 
                          dataKey="name" 
                          stroke="var(--primary)"
                          strokeOpacity={0.5}
                          tick={{ fill: 'var(--foreground)', opacity: 0.5, fontSize: isMobile ? 8 : 12 }}
                        />
                        <YAxis 
                          stroke="var(--primary)"
                          strokeOpacity={0.5}
                          tick={{ 
                            fill: 'var(--foreground)', 
                            opacity: 0.5, 
                            fontSize: isMobile ? 8 : 12 
                          }}
                          tickFormatter={(value) => `${value}%`}
                          width={isMobile ? 8 : 45}
                          tickMargin={isMobile ? 0 : 4}
                        />
                        <Tooltip 
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-popover border border-primary/20 p-3 rounded-lg shadow-xl">
                                  <p className="text-foreground font-medium mb-1">{label}</p>
                                  <div className="space-y-1 text-sm">
                                    <p className="text-foreground/70">
                                      <span className="text-secondary">{payload[0].payload.users}</span> utilisateurs
                                    </p>
                                    <p className="text-foreground/70">
                                      Taux de complétion: <span className="text-secondary">{payload[0].payload.completion}%</span>
                                    </p>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="completion"
                          stroke="var(--secondary)"
                          fill="url(#colorProgress)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative landing-footer py-16 before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary/5 before:to-transparent px-4">
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-card/40 backdrop-blur-sm border border-primary/20 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-black gradient-text mb-6">
              Créez des parcours d&apos;objectifs en quelques minutes
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto font-light">
              Rejoignez les premiers testeurs et bénéficiez de 
              <strong className="text-secondary"> 3 mois d&apos;accès illimité offert</strong>
            </p>
            <Button 
              onClick={scrollToTop}
              size="lg"
              variant="secondary"
              className="px-10 py-6 text-lg font-bold shadow-xl hover:shadow-primary/20 transition-all duration-300 rounded-xl text-black group"
            >
              Je crée mon premier parcours
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Générez votre stratégie de gamification"
        className="max-h-[90vh] overflow-y-auto"
      >
        {!showSuggestions ? (
          <StrategyGenerator mode="landing" onComplete={handleComplete} />
        ) : (
          <StrategySuggestions
            formData={strategyData as StrategyFormData}
            onGenerate={handleGenerate}
            onClose={handleClose}
            mode="landing"
          />
        )}
      </Modal>
    </main>
  );
}
