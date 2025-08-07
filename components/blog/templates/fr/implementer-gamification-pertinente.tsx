import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Target, Users, TrendingUp, Lightbulb, ArrowRight, AlertTriangle, ExternalLink, Zap, Rocket, Shield } from 'lucide-react';
import { Link } from '@/lib/navigation';

export default function ImplementerGamificationPertinente() {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Introduction */}
      <section className="mb-12" aria-labelledby="introduction">
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg border border-primary/20 mb-8">
          <p className="text-lg text-foreground/80 leading-relaxed">
            La gamification est devenue un terme à la mode dans le monde numérique, mais l&apos;implémenter efficacement 
            nécessite bien plus que d&apos;ajouter des points et des badges. La clé du succès réside dans la création 
            d&apos;expériences significatives qui s&apos;alignent avec les objectifs de vos utilisateurs et vos objectifs commerciaux.
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="mb-12" aria-labelledby="principes-fondamentaux">
        <h2 id="principes-fondamentaux">Principes Fondamentaux d&apos;une Gamification Efficace</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mt-8" role="list" aria-label="Principes fondamentaux de gamification">
          <Card className="p-6 border-primary/20 hover:shadow-md transition-shadow" role="listitem">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="text-xl font-semibold">Objectifs Clairs</h3>
            </div>
            <p className="text-foreground/70">
              Chaque élément de gamification doit servir un objectif spécifique. Qu&apos;il s&apos;agisse d&apos;augmenter 
              l&apos;engagement utilisateur, de stimuler des comportements spécifiques ou d&apos;améliorer la rétention, 
              vos objectifs doivent être parfaitement définis.
            </p>
          </Card>

          <Card className="p-6 border-primary/20 hover:shadow-md transition-shadow" role="listitem">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="text-xl font-semibold">Design Centré Utilisateur</h3>
            </div>
            <p className="text-foreground/70">
              Comprenez les motivations de vos utilisateurs et concevez des expériences qui résonnent avec leurs besoins. 
              Qu&apos;est-ce qui les motive ? Quels sont leurs points de friction ? Construisez autour de ces insights.
            </p>
          </Card>

          <Card className="p-6 border-primary/20 hover:shadow-md transition-shadow" role="listitem">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="text-xl font-semibold">Complexité Progressive</h3>
            </div>
            <p className="text-foreground/70">
              Commencez simple et introduisez progressivement des éléments plus complexes. Cela évite de submerger 
              les utilisateurs et maintient l&apos;engagement dans le temps.
            </p>
          </Card>

          <Card className="p-6 border-primary/20 hover:shadow-md transition-shadow" role="listitem">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="text-xl font-semibold">Récompenses Significatives</h3>
            </div>
            <p className="text-foreground/70">
              Les récompenses doivent sembler précieuses et pertinentes. Les récompenses intrinsèques comme 
              le développement de compétences surpassent souvent les récompenses extrinsèques comme les points.
            </p>
          </Card>
        </div>
      </section>

      {/* Implementation Strategy */}
      <section className="mb-12" aria-labelledby="strategie-implementation">
        <h2 id="strategie-implementation">Stratégie d&apos;Implémentation</h2>
        
        <div className="bg-muted/50 p-6 rounded-lg my-8">
          <h3 className="text-xl font-semibold mb-6">Approche Étape par Étape</h3>
          
          <div className="space-y-6" role="list" aria-label="Étapes d'implémentation">
            <div className="flex items-start gap-4" role="listitem">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold" aria-label="Étape 1">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-2">Auditez Votre État Actuel</h4>
                <p className="text-foreground/70">
                  Analysez votre parcours utilisateur existant et identifiez les opportunités de gamification. 
                  Recherchez les moments où les utilisateurs pourraient avoir besoin de motivation ou de guidance.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4" role="listitem">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold" aria-label="Étape 2">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-2">Définissez les Métriques de Succès</h4>
                <p className="text-foreground/70">
                  Établissez des KPIs clairs avant l&apos;implémentation. Cela pourrait être les taux d&apos;engagement, 
                  les taux de completion, ou des comportements utilisateur spécifiques que vous voulez encourager.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4" role="listitem">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold" aria-label="Étape 3">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-2">Concevez l&apos;Expérience</h4>
                <p className="text-foreground/70">
                  Créez un système de gamification cohérent qui se sent naturel dans votre application. 
                  Évitez de forcer des éléments de jeu là où ils n&apos;ont pas leur place.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4" role="listitem">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold" aria-label="Étape 4">
                4
              </div>
              <div>
                <h4 className="font-semibold mb-2">Testez et Itérez</h4>
                <p className="text-foreground/70">
                  Lancez d&apos;abord avec un petit groupe d&apos;utilisateurs. Collectez des retours et des données 
                  pour affiner votre approche avant de passer à l&apos;échelle de votre base utilisateur entière.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section className="mb-12" aria-labelledby="pieges-courants">
        <h2 id="pieges-courants">Pièges Courants à Éviter</h2>
        
        <div className="bg-muted/30 p-6 rounded-lg my-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-destructive">Attention à Ces Erreurs Courantes</h3>
          </div>
          
          <div className="space-y-4" role="list" aria-label="Pièges courants à éviter">
            <div className="flex items-start gap-3" role="listitem">
              <div className="flex-shrink-0 w-2 h-2 bg-destructive rounded-full mt-2" aria-hidden="true"></div>
              <div>
                <h4 className="font-semibold text-destructive mb-1">Sur-Gamification</h4>
                <p className="text-foreground/70 mb-2">
                  Trop d&apos;éléments de jeu peuvent submerger les utilisateurs et diluer votre proposition de valeur principale. 
                  Gardez-le simple et focalisé sur ce qui compte vraiment pour vos utilisateurs.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Solution :</strong> Commencez avec 2-3 éléments clés et développez selon les retours utilisateurs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3" role="listitem">
              <div className="flex-shrink-0 w-2 h-2 bg-destructive rounded-full mt-2" aria-hidden="true"></div>
              <div>
                <h4 className="font-semibold text-destructive mb-1">Ignorer les Retours Utilisateurs</h4>
                <p className="text-foreground/70 mb-2">
                  Collectez et agissez régulièrement sur les retours utilisateurs concernant vos éléments de gamification. 
                  Ce qui fonctionne pour une audience pourrait ne pas fonctionner pour une autre.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Solution :</strong> Implémentez des boucles de feedback et des tests A/B pour valider les hypothèses.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3" role="listitem">
              <div className="flex-shrink-0 w-2 h-2 bg-destructive rounded-full mt-2" aria-hidden="true"></div>
              <div>
                <h4 className="font-semibold text-destructive mb-1">Systèmes Statiques</h4>
                <p className="text-foreground/70 mb-2">
                  La gamification doit évoluer avec votre base utilisateurs et vos objectifs commerciaux. 
                  Ne la mettez pas en place et oubliez-la.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Solution :</strong> Prévoyez des mises à jour régulières et du contenu saisonnier pour maintenir l&apos;engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="mb-12" aria-labelledby="histoires-succes">
        <h2 id="histoires-succes">Histoires de Succès Réelles</h2>
        
        <div className="grid md:grid-cols-2 gap-6 my-8" role="list" aria-label="Histoires de succès">
          <Card className="p-6 hover:shadow-md transition-shadow" role="listitem">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold">Duolingo Apprentissage</h3>
              <Badge variant="outline" className="text-xs">Étude de Cas</Badge>
            </div>
            <p className="text-foreground/70 mb-4">
              Duolingo a augmenté la rétention utilisateur de 40% grâce à leur système de séries, objectifs quotidiens, 
              et fonctionnalités sociales qui encourageaient l&apos;engagement communautaire et la responsabilisation.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <CheckCircle className="h-4 w-4" aria-hidden="true" />
              <span>40% d&apos;augmentation de rétention</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
              <span>Source : Rapport Annuel Duolingo 2023</span>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow" role="listitem">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold">Nike Run Club</h3>
              <Badge variant="outline" className="text-xs">Étude de Cas</Badge>
            </div>
            <p className="text-foreground/70 mb-4">
              Nike Run Club a constaté une augmentation de 60% des utilisateurs actifs mensuels après avoir implémenté 
              des badges de réussite, des classements et des défis personnalisés.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <CheckCircle className="h-4 w-4" aria-hidden="true" />
              <span>60% d&apos;augmentation des UAM</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
              <span>Source : Rapport Digital Nike 2023</span>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow" role="listitem">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold">LinkedIn Learning</h3>
              <Badge variant="outline" className="text-xs">Étude de Cas</Badge>
            </div>
            <p className="text-foreground/70 mb-4">
              LinkedIn Learning a atteint 75% de taux de completion des cours grâce aux évaluations de compétences, 
              au suivi de progression et aux badges de certification que les utilisateurs pouvaient partager sur leurs profils.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <CheckCircle className="h-4 w-4" aria-hidden="true" />
              <span>75% de taux de completion</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
              <span>Source : Rapport d&apos;Impact LinkedIn Learning</span>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow" role="listitem">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold">Starbucks Rewards</h3>
              <Badge variant="outline" className="text-xs">Étude de Cas</Badge>
            </div>
            <p className="text-foreground/70 mb-4">
              Le programme Starbucks Rewards a augmenté la valeur vie client de 25% grâce aux niveaux d&apos;adhésion échelonnés, 
              aux offres personnalisées et aux avantages exclusifs pour les membres.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <CheckCircle className="h-4 w-4" aria-hidden="true" />
              <span>25% d&apos;augmentation de la VVC</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
              <span>Source : Rapport Annuel Starbucks 2023</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Conclusion */}
      <section className="mb-12" aria-labelledby="conclusion">
        <h2 id="conclusion">Conclusion</h2>
        
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg border border-primary/20">
          <p className="text-lg text-foreground/80 leading-relaxed mb-4">
            Une gamification efficace ne consiste pas à transformer votre application en jeu—il s&apos;agit de 
            créer des expériences significatives qui motivent et engagent vos utilisateurs tout en stimulant 
            vos objectifs commerciaux.
          </p>
          
          <p className="text-foreground/80 leading-relaxed">
            La clé est de commencer avec une compréhension claire des besoins de vos utilisateurs et de vos objectifs commerciaux. 
            Concevez des expériences qui se sentent naturelles et précieuses, puis itérez basé sur de vrais retours utilisateurs et données.
          </p>
        </div>
      </section>

      {/* Ludiks Solution */}
      <section className="mb-12" aria-labelledby="solution-ludiks">
        <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 p-8 rounded-xl border border-primary/20">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Rocket className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4" id="solution-ludiks">
              Évitez la Complexité avec Ludiks
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              Pourquoi passer des mois à construire la gamification de zéro quand vous pouvez l&apos;implémenter en quelques jours ? 
              Ludiks fournit tout ce dont vous avez besoin pour ajouter une gamification engageante à votre produit numérique.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8" role="list" aria-label="Fonctionnalités Ludiks">
            <div className="text-center" role="listitem">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-semibold mb-2">Composants Prêts à l&apos;Emploi</h3>
              <p className="text-foreground/70 text-sm">
                Circuits, récompenses et mécaniques d&apos;engagement pré-construits que vous pouvez personnaliser et déployer instantanément.
              </p>
            </div>

            <div className="text-center" role="listitem">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-semibold mb-2">Analytics de Niveau Entreprise</h3>
              <p className="text-foreground/70 text-sm">
                Suivez l&apos;engagement utilisateur, mesurez l&apos;impact et optimisez votre stratégie de gamification avec des insights détaillés.
              </p>
            </div>

            <div className="text-center" role="listitem">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-semibold mb-2">Évolutif & Flexible</h3>
              <p className="text-foreground/70 text-sm">
                Commencez simple et développez. Notre plateforme évolue avec vos besoins, du MVP aux solutions d&apos;entreprise.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-background p-6 rounded-lg border max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-3">Commencez à Implémenter la Gamification Aujourd&apos;hui</h3>
              <p className="text-foreground/70 mb-6">
                Rejoignez des centaines d&apos;entreprises qui ont transformé l&apos;engagement de leurs utilisateurs avec Ludiks. 
                Commencez en quelques minutes, pas en quelques mois.
              </p>
              <Button asChild size="lg" className="group">
                <Link href="/auth/login">
                  Commencer Gratuitement
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-3">
                5 000 événements gratuits chaque mois • Aucune carte de crédit requise • Payez seulement ce que vous utilisez
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 