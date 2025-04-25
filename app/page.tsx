'use client'

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
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
  ArrowRight 
} from "lucide-react";

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen">
      <div className="relative landing-hero">
        <div className="container mx-auto pt-24 pb-16 relative">
          <div className="absolute top-8 right-8">
            <ThemeToggle />
          </div>
          <div className="flex flex-col items-center text-center space-y-8">
            <Badge variant="outline" className="bg-yellow-300 text-black font-bold">
              🚧 Bêta en cours
            </Badge>

            <h1 className="text-4xl md:text-6xl font-black landing-title pb-2">
              Transformez chaque parcours utilisateur en levier d&apos;engagement
            </h1>

            <p className="text-lg md:text-xl text-foreground/90 max-w-2xl font-light">
              Structurez, suivez et optimisez l&apos;expérience utilisateur à travers des circuits interactifs, 
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
          </div>
        </div>
      </div>

      <div className="gradient-section py-16">
        <div className="w-full max-w-md mt-8 mx-auto">
            <Card className="dark:bg-black bg-white shadow-sm border !border-primary/20 hover:!border-primary">
              <div className="p-6 relative">
                <p className="dark:text-white text-black text-lg mb-4 font-medium">
                  Soyez les premiers informés du lancement
                </p>
                
                <div className="bg-white rounded-lg p-4 mx-auto relative">
                  <iframe 
                    src="https://tally.so/embed/wQEqpg?alignLeft=1&hideTitle=1&transparentBackground=0&dynamicHeight=1" 
                    loading="lazy" 
                    width="100%" 
                    height="120" 
                    className="relative z-10"
                  ></iframe>
                </div>

                <p className="dark:text-white/80 text-black/80 text-sm mt-4 font-mono">
                  🔓 Accès prioritaire à la bêta, démo personnalisée & 
                  <strong className="text-secondary"> 3 mois gratuits</strong>
                </p>
              </div>
            </Card>
          </div>
      </div>
      <div className="gradient-section py-16">
        <div className="container mx-auto">
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

      {/* How it works Section */}
      <div className="relative gradient-section py-16">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Une intégration simple pour des résultats immédiats
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group">
              <div className="bg-card p-6 rounded-xl border border-primary/20 transition-colors duration-300 hover:border-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-card rounded-lg p-2 border border-primary/20">
                      <Map className="text-secondary h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold font-mono text-foreground/90">
                      1. Créez vos circuits
                    </h3>
                  </div>
                  <p className="text-foreground/70">Définissez vos objectifs et structurez vos parcours sans code</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-card p-6 rounded-xl border border-primary/20 transition-colors duration-300 hover:border-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-card rounded-lg p-2 border border-primary/20">
                      <Trophy className="text-secondary h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold font-mono text-foreground/90">
                      2. Intégrez l&apos;API
                    </h3>
                  </div>
                  <p className="text-foreground/70">Quelques lignes de code pour tracker et récompenser vos users</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-card p-6 rounded-xl border border-primary/20 transition-colors duration-300 hover:border-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-card rounded-lg p-2 border border-primary/20">
                      <Presentation className="text-secondary h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold font-mono text-foreground/90">
                      3. Optimisez
                    </h3>
                  </div>
                  <p className="text-foreground/70">Analysez les données et améliorez vos parcours en continu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative landing-footer py-16">
        <div className="container mx-auto text-center relative">
          <h2 className="text-2xl md:text-3xl font-black gradient-text mb-6">
            Créez des parcours d&apos;objectifs sans code backend
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto font-light">
            Rejoignez les premiers testeurs et bénéficiez de 
            <strong className="text-secondary"> 3 mois d&apos;accès illimité offert</strong>
          </p>
          <Button 
            onClick={scrollToTop}
            size="lg"
            variant="secondary"
            className="px-10 py-6 text-lg font-bold shadow-xl hover:shadow-primary/20 transition-all duration-300 rounded-xl text-black"
          >
            Je crée mon premier parcours
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </main>
  );
}
