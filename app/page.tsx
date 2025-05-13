'use client'

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  TrendingUp,
  HelpCircle,
  BarChart3,
  Users2,
  Trophy,
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

const completionData = [
  { name: 'Panier', completion: 100, users: 1250 },
  { name: 'Livraison', completion: 60, users: 750 },
  { name: 'Paiement', completion: 52, users: 650 },
  { name: 'Confirmation', completion: 50, users: 625 },
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

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist-section');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
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
      {/* Hero Section - Focus sur le pain point */}
      <div className="relative landing-hero">
        <div className="container mx-auto pt-24 pb-16 relative px-4 md:px-8">
          <div className="flex flex-col items-center text-center space-y-8">
            <Badge variant="outline" className="bg-yellow-300 text-black font-bold">
              🚧 Bêta en cours
            </Badge>

            <h1 className="text-4xl md:text-6xl font-black landing-title pb-2">
              Optimisez vos parcours clients, augmentez vos ventes
            </h1>

            <p className="text-lg md:text-xl text-foreground/90 max-w-2xl font-light">
              Découvrez pourquoi vos clients abandonnent et comment les faire revenir. 
              Visualisez chaque étape de leur parcours, identifiez les points de friction et augmentez vos ventes.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8 text-left max-w-3xl">
              <div className="flex items-center gap-3 bg-card/40 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
                <Eye className="text-secondary h-6 w-6" />
                <span className="font-medium text-foreground/90">Suivez chaque étape de votre parcours client</span>
              </div>
              <div className="flex items-center gap-3 bg-card/40 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
                <AlertTriangle className="text-secondary h-6 w-6" />
                <span className="font-medium text-foreground/90">Identifiez où vos clients abandonnent</span>
              </div>
              <div className="flex items-center gap-3 bg-card/40 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
                <TrendingUp className="text-secondary h-6 w-6" />
                <span className="font-medium text-foreground/90">Augmentez vos ventes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Soyez les premiers informés du lancement */}
      <div id="waitlist-section" className="gradient-section py-16 relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary/5 before:to-transparent px-4">
        <div className="w-full max-w-lg mx-auto relative z-10">
          <div className="relative bg-gradient-to-br from-yellow-200/80 to-secondary/20 border border-primary/20 rounded-2xl shadow-2xl px-6 py-8 flex flex-col items-center">
            <span className="absolute -top-4 left-6 bg-yellow-300 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
              Accès prioritaire
            </span>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 shadow-lg animate-pulse">
                <ArrowRight className="text-secondary w-6 h-6" />
              </span>
              <h2 className="text-xl font-extrabold text-black drop-shadow-lg">
                Soyez les premiers informés du lancement
              </h2>
            </div>
            <p className="text-black/80 text-sm mb-4 text-center">
              Accès VIP à la bêta, démo personnalisée, <span className="font-bold">3 mois gratuits</span>
            </p>
            <div className="overflow-hidden rounded-lg w-full">
              <iframe
                src="https://tally.so/embed/wQEqpg?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                loading="lazy"
                width="100%"
                height="120"
                className="border-none"
                style={{ minHeight: 120, background: 'transparent' }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Section Problématiques */}
      <div className="gradient-section py-16 relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary/5 before:to-transparent px-4">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Vous perdez des utilisateurs sans le savoir
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Sans visibilité sur vos taux de transformation, vous ne pouvez pas optimiser vos parcours utilisateurs
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4 items-start">
              <div className="bg-card p-3 rounded-lg border border-primary/20">
                <HelpCircle className="text-secondary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Des pertes de conversion non identifiées</h3>
                <p className="text-foreground/70">Vous ne savez pas où vos utilisateurs abandonnent vos tunnels d&apos;achat ou d&apos;onboarding</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-card p-3 rounded-lg border border-primary/20">
                <BarChart3 className="text-secondary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Pas de visibilité sur l&apos;engagement</h3>
                <p className="text-foreground/70">Impossible de mesurer l&apos;efficacité de vos parcours utilisateurs</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-card p-3 rounded-lg border border-primary/20">
                <Users2 className="text-secondary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Difficile d&apos;agir sur la rétention</h3>
                <p className="text-foreground/70">Pas de leviers simples pour engager et fidéliser vos utilisateurs</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-card p-3 rounded-lg border border-primary/20">
                <TrendingUp className="text-secondary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Coût de développement élevé</h3>
                <p className="text-foreground/70">Développer des solutions d&apos;engagement prend du temps et des ressources</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Solution */}
      <div className="relative gradient-section py-16 before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-primary/5 before:to-transparent">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Visualisez et optimisez vos parcours
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Suivez chaque étape de vos tunnels de conversion et identifiez les points de friction en temps réel
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
              <div className="p-4 md:p-8 space-y-8 bg-gradient-to-b from-background/50 to-background dark:from-gray-900/50 dark:to-gray-900/80">
                {/* Tunnel d'achat Demo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group p-4 md:p-6 bg-white dark:bg-gray-800/60 border border-primary/20 hover:border-primary rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-5 w-5 text-secondary" />
                          <h3 className="text-lg font-semibold text-foreground">Tunnel d&apos;achat</h3>
                        </div>
                        <p className="text-sm text-foreground/60">
                          Suivi des conversions et détection des abandons
                        </p>
                        <span className="inline-block px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded mt-2">
                          Conversion
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-red-500">-40%</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-2 px-2">
                      {["Panier","Livraison", "Paiement", "Confirmation"].map((step, i) => (
                        <div key={i} className="flex-shrink-0 flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
                          <Activity className="h-4 w-4 text-secondary" />
                          <span className="text-xs text-foreground/80 whitespace-nowrap">{step}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 md:gap-4">
                      <div className="flex flex-col items-center p-2 md:p-3 bg-muted/50 rounded-lg">
                        <Users2 className="h-5 w-5 text-secondary mb-2" />
                        <span className="text-sm font-semibold text-foreground">1,250</span>
                        <span className="text-xs text-foreground/60">Visiteurs</span>
                      </div>
                      <div className="flex flex-col items-center p-2 md:p-3 bg-muted/50 rounded-lg">
                        <Activity className="h-5 w-5 text-secondary mb-2" />
                        <span className="text-sm font-semibold text-foreground">50%</span>
                        <span className="text-xs text-foreground/60">Conversion</span>
                      </div>
                      <div className="flex flex-col items-center p-2 md:p-3 bg-muted/50 rounded-lg">
                        <Trophy className="h-5 w-5 text-secondary mb-2" />
                        <span className="text-sm font-semibold text-foreground">625</span>
                        <span className="text-xs text-foreground/60">Commandes</span>
                      </div>
                    </div>
                  </div>

                  {/* Second card with same responsive adjustments */}
                  <div className="group p-4 md:p-6 bg-white dark:bg-gray-800/60 border border-primary/20 hover:border-primary rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-5 w-5 text-secondary" />
                          <h3 className="text-lg font-semibold text-foreground">Onboarding</h3>
                        </div>
                        <p className="text-sm text-foreground/60">
                          Parcours d&apos;intégration des nouveaux utilisateurs
                        </p>
                        <span className="inline-block px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded mt-2">
                          Engagement
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-2 px-2">
                      {["Inscription","Profil", "Premier achat", "Fidélisation"].map((step, i) => (
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
                        <span className="text-xs text-foreground/60">Inscrits</span>
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
                <div className="p-4 md:p-8 bg-white dark:bg-gray-800/60 border border-primary/20 hover:border-primary rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-red-500/10">
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-red-500 mb-1">Point de friction détecté</h3>
                      <p className="text-sm text-foreground/60">
                        Chute importante du taux de conversion à l&apos;étape &quot;Livraison&quot;
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
                                      Taux de conversion: <span className="text-secondary">{payload[0].payload.completion}%</span>
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

                {/* Bloc comparatif explicatif moderne */}
                <div className="relative z-10 mt-8 flex flex-col items-center">
                  <span className="mb-3 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold tracking-wide shadow-sm">
                    Conseil Ludiks
                  </span>
                  <div className="w-full grid md:grid-cols-2 gap-4">
                    <div className="bg-white/90 dark:bg-black/60 rounded-xl shadow-lg border border-primary/10 p-6 flex flex-col items-center text-center">
                      <span className="text-2xl mb-2">❌</span>
                      <span className="text-secondary font-semibold mb-2">Sans Ludiks</span>
                      <p className="text-foreground/80 text-sm">
                        Face à une baisse des ventes, vous pourriez être tenté de baisser vos prix ou de lancer une promotion.
                      </p>
                    </div>
                    <div className="bg-secondary/10 rounded-xl shadow-lg border border-secondary/30 p-6 flex flex-col items-center text-center">
                      <span className="text-2xl mb-2">✅</span>
                      <span className="text-secondary font-semibold mb-2">Avec Ludiks</span>
                      <p className="text-foreground/90 text-sm">
                        Les données révèlent que le problème n&apos;est pas le prix, mais les options de livraison.<br />
                        Vous pouvez maintenant prendre des décisions éclairées et agir sur le vrai problème.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Valeur Ajoutée */}
      <div className="py-16 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Des leviers d&apos;engagement prêts à l&apos;emploi
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Augmentez l&apos;engagement de vos utilisateurs sans développement complexe
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-xl border border-primary/20 hover:border-primary transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Users2 className="text-secondary h-7 w-7" />
                <h3 className="text-xl font-bold text-foreground">Gamification clé en main</h3>
              </div>
              <ul className="space-y-2 text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Système de points et récompenses prêt à l&apos;emploi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Badges et niveaux personnalisables</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Intégration en quelques lignes de code</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-xl border border-primary/20 hover:border-primary transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="text-secondary h-7 w-7" />
                <h3 className="text-xl font-bold text-foreground">Export et automatisation</h3>
              </div>
              <ul className="space-y-2 text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Export des utilisateurs désengagés</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Webhooks pour automatiser vos actions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Intégration avec vos outils existants</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-xl border border-primary/20 hover:border-primary transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="text-secondary h-7 w-7" />
                <h3 className="text-xl font-bold text-foreground">Segmentation avancée</h3>
              </div>
              <ul className="space-y-2 text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Identification des utilisateurs à risque</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Parcours personnalisés par segment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>A/B testing des parcours</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-xl border border-primary/20 hover:border-primary transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-secondary h-7 w-7" />
                <h3 className="text-xl font-bold text-foreground">Analytics en temps réel</h3>
              </div>
              <ul className="space-y-2 text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Suivi des KPIs d&apos;engagement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Détection des points de friction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  <span>Rapports d&apos;optimisation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Section Bonus : Générateur de stratégie de gamification */}
      <div className="py-16 bg-gradient-to-b from-secondary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center p-8 rounded-2xl bg-card/40 backdrop-blur-sm border border-primary/20 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <span role="img" aria-label="cadeau">🎁</span> Bonus : Essayez notre générateur de stratégie de gamification
            </h2>
            <p className="text-lg text-foreground/80 mb-6">
              En quelques questions, obtenez des recommandations personnalisées pour booster l&apos;engagement, la conversion ou la rétention de vos utilisateurs grâce à la gamification.
            </p>
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground cursor-pointer w-full md:w-auto"
            >
              Démarrer le générateur
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Testez gratuitement et découvrez comment Ludiks peut transformer vos parcours utilisateurs.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative landing-footer py-16 before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary/5 before:to-transparent px-4">
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-card/40 backdrop-blur-sm border border-primary/20 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-black gradient-text mb-6">
              Prêt à optimiser vos taux de conversion ?
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto font-light">
              Rejoignez les premiers testeurs et bénéficiez de 
              <strong className="text-secondary"> 3 mois d&apos;accès illimité offert</strong>
            </p>
            <Button 
              onClick={scrollToWaitlist}
              size="lg"
              variant="secondary"
              className="px-10 py-6 text-lg font-bold shadow-xl hover:shadow-primary/20 transition-all duration-300 rounded-xl text-black group cursor-pointer"
            >
              Rejoindre la liste d&apos;attente
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
