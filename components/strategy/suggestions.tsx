import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Check, Target, Activity } from "lucide-react";
import { StrategyFormData, MainGoal } from "./generator";

interface StrategySuggestion {
  id: string;
  name: string;
  description: string;
  circuits: CircuitSuggestion[];
  explanation: string;
  whenToUse: string[];
}

interface CircuitSuggestion {
  id: string;
  name: string;
  description: string;
  steps: string[];
  explanation: string;
  benefits: string[];
  type: "objectives" | "actions";
  typeExplanation: string;
  relevance: string;
}

// Suggestions de circuits par objectif et action
const CIRCUIT_LIBRARY: Record<MainGoal, Record<string, CircuitSuggestion>> = {
  retention: {
    feature_usage: {
      id: "feature_usage_retention",
      name: "Utilisation régulière des fonctionnalités",
      description: "Encouragez l'utilisation fréquente des fonctionnalités clés.",
      steps: [
        "Points pour chaque utilisation de fonctionnalité",
        "Badges de fidélité pour la régularité",
        "Récompenses pour l'utilisation sur plusieurs semaines"
      ],
      explanation: "Ce parcours vise à créer une habitude d'utilisation autour de vos fonctionnalités principales.",
      benefits: [
        "Renforce la fidélité",
        "Augmente la valeur perçue",
        "Réduit le churn"
      ],
      type: "actions",
      typeExplanation: "Suit l'utilisation répétée d'une action clé.",
      relevance: "Idéal pour fidéliser les utilisateurs sur le long terme."
    },
    login: {
      id: "login_retention",
      name: "Connexion récurrente",
      description: "Incitez les utilisateurs à se connecter régulièrement.",
      steps: [
        "Récompenses pour connexions consécutives",
        "Badges de série",
        "Bonus mensuel pour assiduité"
      ],
      explanation: "Favorise la création d'une routine d'utilisation.",
      benefits: [
        "Crée une habitude",
        "Augmente la fréquence d'usage"
      ],
      type: "actions",
      typeExplanation: "Suit la récurrence de connexion.",
      relevance: "Parfait pour les apps nécessitant une présence régulière."
    },
    content_consumption: {
      id: "content_consumption_retention",
      name: "Consommation de contenu",
      description: "Encouragez la lecture ou le visionnage régulier de contenu.",
      steps: [
        "Points pour chaque contenu consommé",
        "Défis de consommation hebdomadaire",
        "Récompenses pour la découverte de nouveaux contenus"
      ],
      explanation: "Idéal pour les plateformes de contenu.",
      benefits: [
        "Augmente le temps passé",
        "Favorise la découverte",
        "Renforce l'engagement"
      ],
      type: "actions",
      typeExplanation: "Suit la consommation répétée de contenu.",
      relevance: "Pour plateformes média, e-learning, etc."
    }
  },
  engagement: {
    content_creation: {
      id: "content_creation_engagement",
      name: "Création de contenu",
      description: "Encouragez la contribution active.",
      steps: [
        "Points pour chaque contribution",
        "Badges de créateur",
        "Niveaux de contribution avec récompenses"
      ],
      explanation: "Valorise les utilisateurs actifs.",
      benefits: [
        "Crée une communauté",
        "Augmente la quantité de contenu"
      ],
      type: "actions",
      typeExplanation: "Suit la création répétée de contenu.",
      relevance: "Essentiel pour plateformes communautaires."
    },
    social_interaction: {
      id: "social_interaction_engagement",
      name: "Interaction sociale",
      description: "Favorisez les échanges entre utilisateurs.",
      steps: [
        "Points pour chaque interaction",
        "Badges d'entraide",
        "Défis communautaires"
      ],
      explanation: "Renforce le sentiment d'appartenance.",
      benefits: [
        "Crée du lien social",
        "Augmente la rétention"
      ],
      type: "actions",
      typeExplanation: "Suit les interactions entre membres.",
      relevance: "Pour apps sociales, forums, etc."
    },
    feature_discovery: {
      id: "feature_discovery_engagement",
      name: "Découverte de fonctionnalités",
      description: "Incitez à explorer toutes les possibilités.",
      steps: [
        "Points pour chaque fonctionnalité découverte",
        "Badges d'explorateur",
        "Récompenses pour l'utilisation avancée"
      ],
      explanation: "Favorise l'adoption complète du produit.",
      benefits: [
        "Réduit la sous-utilisation",
        "Augmente la satisfaction"
      ],
      type: "objectives",
      typeExplanation: "Suit la progression dans la découverte.",
      relevance: "Pour produits riches en fonctionnalités."
    }
  },
  conversion: {
    first_purchase: {
      id: "first_purchase_conversion",
      name: "Premier achat",
      description: "Accompagnez l'utilisateur jusqu'à son premier achat.",
      steps: [
        "Guidage étape par étape jusqu'à l'achat",
        "Récompense à la première commande",
        "Badge de nouveau client"
      ],
      explanation: "Optimise le funnel de conversion.",
      benefits: [
        "Augmente le taux de conversion",
        "Réduit l'abandon panier"
      ],
      type: "objectives",
      typeExplanation: "Suit un funnel d'achat logique.",
      relevance: "Idéal pour marketplace, e-commerce, SaaS."
    },
    add_to_cart: {
      id: "add_to_cart_conversion",
      name: "Ajout au panier",
      description: "Encouragez l'ajout d'articles au panier.",
      steps: [
        "Points pour chaque ajout au panier",
        "Défis d'ajout multiple",
        "Récompense à la validation du panier"
      ],
      explanation: "Favorise l'engagement dans le processus d'achat.",
      benefits: [
        "Augmente la valeur du panier",
        "Prépare à la conversion finale"
      ],
      type: "actions",
      typeExplanation: "Suit l'action d'ajout au panier.",
      relevance: "Pour e-commerce, marketplace."
    },
    request_demo: {
      id: "request_demo_conversion",
      name: "Demande de démo",
      description: "Incitez à demander une démo ou un contact commercial.",
      steps: [
        "Points pour chaque demande",
        "Récompense à la prise de rendez-vous",
        "Badge d'utilisateur engagé"
      ],
      explanation: "Optimise la génération de leads.",
      benefits: [
        "Augmente le nombre de leads",
        "Accélère le cycle de vente"
      ],
      type: "objectives",
      typeExplanation: "Suit le parcours de prise de contact.",
      relevance: "Pour SaaS, B2B, services."
    },
    subscription: {
      id: "subscription_conversion",
      name: "Souscription à une offre",
      description: "Accompagnez l'utilisateur jusqu'à la souscription.",
      steps: [
        "Guidage dans le choix de l'offre",
        "Récompense à la souscription",
        "Badge de nouvel abonné"
      ],
      explanation: "Optimise le tunnel de souscription.",
      benefits: [
        "Augmente le taux de souscription",
        "Réduit l'abandon du tunnel"
      ],
      type: "objectives",
      typeExplanation: "Suit le funnel de souscription.",
      relevance: "Pour SaaS, abonnements, services."
    },
    lead_capture: {
      id: "lead_capture_conversion",
      name: "Soumission d'un lead",
      description: "Encouragez la soumission de formulaires de contact ou d'intérêt.",
      steps: [
        "Points pour chaque lead soumis",
        "Récompense à la qualification du lead",
        "Badge de prospect actif"
      ],
      explanation: "Optimise la collecte de leads.",
      benefits: [
        "Augmente le volume de leads",
        "Améliore la qualité des prospects"
      ],
      type: "actions",
      typeExplanation: "Suit la soumission de leads.",
      relevance: "Pour B2B, SaaS, services."
    },
    default: {
      id: "default_conversion",
      name: "Parcours de conversion",
      description: "Optimisez le passage à l'action clé.",
      steps: [
        "Guidage étape par étape",
        "Récompense à la conversion",
        "Badge d'utilisateur converti"
      ],
      explanation: "Parcours générique pour la conversion.",
      benefits: [
        "Augmente la conversion",
        "Réduit l'abandon"
      ],
      type: "objectives",
      typeExplanation: "Suit un funnel logique.",
      relevance: "Pour tout produit nécessitant une conversion."
    }
  },
  onboarding: {
    profile_completion: {
      id: "profile_completion_onboarding",
      name: "Complétion du profil",
      description: "Guidez l'utilisateur à compléter son profil.",
      steps: [
        "Points pour chaque champ complété",
        "Badge de profil complet",
        "Récompense à la complétion"
      ],
      explanation: "Facilite la prise en main du produit.",
      benefits: [
        "Améliore la personnalisation",
        "Accélère l'adoption"
      ],
      type: "objectives",
      typeExplanation: "Suit la progression dans l'onboarding.",
      relevance: "Pour tout produit nécessitant un onboarding."
    },
    first_action: {
      id: "first_action_onboarding",
      name: "Première action clé",
      description: "Accompagnez l'utilisateur dans sa première action importante.",
      steps: [
        "Guidage vers l'action clé",
        "Récompense immédiate",
        "Badge de bienvenue"
      ],
      explanation: "Réduit la friction à l'entrée.",
      benefits: [
        "Augmente l'activation",
        "Réduit l'abandon initial"
      ],
      type: "objectives",
      typeExplanation: "Suit la progression dans l'onboarding.",
      relevance: "Pour tout produit avec une étape clé d'activation."
    },
    tutorial_completion: {
      id: "tutorial_completion_onboarding",
      name: "Finir le tutoriel",
      description: "Encouragez à terminer le tutoriel.",
      steps: [
        "Points pour chaque étape du tutoriel",
        "Badge de fin de tutoriel",
        "Récompense à la complétion"
      ],
      explanation: "Facilite la découverte du produit.",
      benefits: [
        "Réduit la courbe d'apprentissage",
        "Augmente la satisfaction initiale"
      ],
      type: "objectives",
      typeExplanation: "Suit la progression dans l'onboarding.",
      relevance: "Pour tout produit nécessitant une prise en main."
    },
    default: {
      id: "default_onboarding",
      name: "Parcours d'onboarding",
      description: "Guidez l'utilisateur à travers les étapes essentielles.",
      steps: [
        "Étapes progressives avec récompenses",
        "Badges de progression",
        "Récompense finale à la complétion"
      ],
      explanation: "Parcours générique d'onboarding.",
      benefits: [
        "Facilite la prise en main",
        "Augmente la rétention initiale"
      ],
      type: "objectives",
      typeExplanation: "Suit la progression dans l'onboarding.",
      relevance: "Pour tout produit nécessitant un onboarding."
    }
  }
};

function generateSuggestions(formData: StrategyFormData): {
  strategies: StrategySuggestion[];
  circuits: CircuitSuggestion[];
} {
  const strategies: StrategySuggestion[] = [];
  const circuits: CircuitSuggestion[] = [];

  // Stratégie principale
  strategies.push({
    id: formData.mainGoal,
    name:
      formData.mainGoal === "retention"
        ? "Stratégie de Rétention"
        : formData.mainGoal === "engagement"
        ? "Stratégie d'Engagement"
        : formData.mainGoal === "conversion"
        ? "Stratégie de Conversion"
        : "Stratégie d'Onboarding",
    description:
      formData.mainGoal === "retention"
        ? "Encouragez les utilisateurs à revenir régulièrement."
        : formData.mainGoal === "engagement"
        ? "Augmentez l'interaction et la participation."
        : formData.mainGoal === "conversion"
        ? "Optimisez le passage à l'action clé."
        : "Guidez les nouveaux utilisateurs vers la valeur de votre produit.",
    explanation:
      formData.mainGoal === "retention"
        ? "Cette stratégie vise à créer des habitudes et fidéliser les utilisateurs."
        : formData.mainGoal === "engagement"
        ? "Cette stratégie maximise l'interaction et la participation."
        : formData.mainGoal === "conversion"
        ? "Cette stratégie optimise chaque étape du funnel pour augmenter la conversion."
        : "Cette stratégie facilite la prise en main et l'adoption du produit.",
    whenToUse:
      formData.mainGoal === "retention"
        ? ["Pour les apps nécessitant une utilisation régulière.", "Pour fidéliser une audience existante."]
        : formData.mainGoal === "engagement"
        ? ["Pour les plateformes communautaires ou sociales.", "Pour augmenter le temps passé sur l'app."]
        : formData.mainGoal === "conversion"
        ? ["Pour les marketplaces, SaaS, e-commerce.", "Quand l'objectif est d'augmenter le taux de conversion."]
        : ["Pour tout produit nécessitant un onboarding.", "Pour réduire l'abandon initial."],
    circuits: []
  });

  // Circuits pertinents pour chaque action sélectionnée
  const mainGoal = formData.mainGoal as MainGoal;
  const actions = formData.desiredActions && formData.desiredActions.length > 0 ? formData.desiredActions : ["default"];
  actions.forEach(action => {
    const circuit = CIRCUIT_LIBRARY[mainGoal][action] || CIRCUIT_LIBRARY[mainGoal]["default"];
    if (circuit) {
      circuits.push(circuit);
    }
  });

  // S'il n'y a aucune action valide, on propose un circuit générique
  if (circuits.length === 0) {
    const fallback = CIRCUIT_LIBRARY[mainGoal]["default"];
    if (fallback) circuits.push(fallback);
  }

  return { strategies, circuits };
}

interface StrategySuggestionsProps {
  formData: StrategyFormData;
  onGenerate: () => void;
  mode?: "dashboard" | "landing";
  onClose?: () => void;
}

export function StrategySuggestions({ formData, onGenerate, mode = "dashboard", onClose }: StrategySuggestionsProps) {
  const { strategies, circuits } = generateSuggestions(formData);

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            {mode === "dashboard" ? "Votre stratégie de gamification" : "Votre stratégie personnalisée"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {mode === "dashboard" 
              ? "Voici les suggestions adaptées à votre contexte"
              : "Voici comment Ludiks peut vous aider à transformer votre parcours utilisateur"}
          </p>
        </div>

        {strategies.map((strategy, index) => (
          <motion.div
            key={strategy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold">{strategy.name}</h3>
                <p className="text-lg text-muted-foreground">{strategy.description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium mb-2">Explication</h4>
                  <p className="text-muted-foreground">{strategy.explanation}</p>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-2">Quand utiliser cette stratégie ?</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {strategy.whenToUse.map((useCase, i) => (
                      <li key={i}>{useCase}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {circuits.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Parcours suggérés</h3>
            <div className="grid gap-6">
              {circuits.map((circuit, index) => (
                <motion.div
                  key={circuit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (strategies.length + index) * 0.1 }}
                >
                  <Card className="p-6 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {circuit.type === "objectives" ? (
                          <Target className="w-5 h-5 text-primary" />
                        ) : (
                          <Activity className="w-5 h-5 text-primary" />
                        )}
                        <h4 className="text-xl font-semibold">{circuit.name}</h4>
                      </div>
                      <p className="text-muted-foreground">{circuit.description}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2">Type de parcours</h5>
                        <p className="text-muted-foreground">{circuit.typeExplanation}</p>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Pertinence pour votre contexte</h5>
                        <p className="text-muted-foreground">{circuit.relevance}</p>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Étapes du parcours</h5>
                        <ul className="space-y-2">
                          {circuit.steps.map((step, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Avantages</h5>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {circuit.benefits.map((benefit, i) => (
                            <li key={i}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end pt-8">
          {mode === "dashboard" ? (
            <Button
              onClick={onGenerate}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium px-8"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Générer les parcours
            </Button>
          ) : (
            <div className="w-full max-w-md mx-auto flex flex-col items-center">
              <div className="mb-4 text-center">
                <p className="text-base font-semibold text-foreground mb-1">
                  Inscription à la liste d&apos;attente
                </p>
                <p className="text-sm text-muted-foreground">
                  Recevez un accès prioritaire à la bêta et une démo personnalisée
                </p>
              </div>
              <div className="bg-white/90 dark:bg-black/80 rounded-2xl shadow-lg border border-primary/20 p-6 w-full flex flex-col items-center transition-all duration-200">
                <iframe 
                  src="https://tally.so/embed/wQEqpg?alignLeft=1&hideTitle=1&transparentBackground=0&dynamicHeight=1" 
                  loading="lazy" 
                  width="100%" 
                  height="120" 
                  className="rounded-lg border border-primary/10 min-w-[220px] max-w-full"
                  style={{ minWidth: 220, maxWidth: '100%' }}
                  title="Inscription Ludiks"
                ></iframe>
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                <span role="img" aria-label="lock">🔓</span> Accès prioritaire à la bêta, démo personnalisée &nbsp;
                <strong className="text-secondary">3 mois gratuits</strong>
              </p>
              <Button
                variant="outline"
                className="mt-6 px-8"
                onClick={onClose}
              >
                Fermer
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 