import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Target, Activity } from "lucide-react";
import { StrategyFormData, MainGoal } from "./generator";
import { useTranslations } from 'next-intl';
import { useRouter } from "@/lib/navigation";

interface StrategySuggestion {
  id: string;
  name?: string;
  description?: string;
  circuits: CircuitSuggestion[];
  explanation?: string;
  whenToUse?: string[];
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
const CIRCUIT_LIBRARY: Record<MainGoal, Record<string, Omit<CircuitSuggestion, 'name' | 'description' | 'steps' | 'explanation' | 'benefits' | 'typeExplanation' | 'relevance'>>> = {
  retention: {
    feature_usage: {
      id: "feature_usage_retention",
      type: "actions"
    },
    login: {
      id: "login_retention",
      type: "actions"
    },
    content_consumption: {
      id: "content_consumption_retention",
      type: "actions"
    }
  },
  engagement: {
    content_creation: {
      id: "content_creation_engagement",
      type: "actions"
    },
    social_interaction: {
      id: "social_interaction_engagement",
      type: "actions"
    },
    feature_discovery: {
      id: "feature_discovery_engagement",
      type: "objectives"
    }
  },
  conversion: {
    first_purchase: {
      id: "first_purchase_conversion",
      type: "objectives"
    },
    add_to_cart: {
      id: "add_to_cart_conversion",
      type: "actions"
    },
    request_demo: {
      id: "request_demo_conversion",
      type: "objectives"
    },
    subscription: {
      id: "subscription_conversion",
      type: "objectives"
    },
    lead_capture: {
      id: "lead_capture_conversion",
      type: "actions"
    },
    default: {
      id: "default_conversion",
      type: "objectives"
    }
  },
  onboarding: {
    profile_completion: {
      id: "profile_completion_onboarding",
      type: "objectives"
    },
    first_action: {
      id: "first_action_onboarding",
      type: "objectives"
    },
    tutorial_completion: {
      id: "tutorial_completion_onboarding",
      type: "objectives"
    },
    default: {
      id: "default_onboarding",
      type: "objectives"
    }
  }
};

function generateSuggestions(formData: StrategyFormData): {
  strategies: StrategySuggestion[];
  circuits: CircuitSuggestion[];
} {
  const strategies: StrategySuggestion[] = [];
  const circuits: CircuitSuggestion[] = [];

  // Stratégie principale (juste l'id)
  strategies.push({
    id: formData.mainGoal,
    circuits: []
  });

  // Circuits pertinents pour chaque action sélectionnée
  const mainGoal = formData.mainGoal as MainGoal;
  const actions = formData.desiredActions && formData.desiredActions.length > 0 ? formData.desiredActions : ["default"];
  actions.forEach(action => {
    const circuit = CIRCUIT_LIBRARY[mainGoal][action] || CIRCUIT_LIBRARY[mainGoal]["default"];
    if (circuit) {
      circuits.push(circuit as CircuitSuggestion);
    }
  });

  // S'il n'y a aucune action valide, on propose un circuit générique
  if (circuits.length === 0) {
    const fallback = CIRCUIT_LIBRARY[mainGoal]["default"];
    if (fallback) circuits.push(fallback as CircuitSuggestion);
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
  const t = useTranslations('strategy');
  const router = useRouter();
  const { strategies, circuits } = generateSuggestions(formData);

  const handleGetStarted = () => {
    router.push('/auth/registration');
  };

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Introduction pédagogique */}
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2 text-primary">{t('suggestions.introduction.title')}</h2>
          <p className="text-base text-foreground mb-2">
            {t('suggestions.introduction.description')}
          </p>
          <p className="text-base text-foreground mb-2">
            <strong>{t('suggestions.introduction.why.title')}</strong> {t('suggestions.introduction.why.description')}
          </p>
          <ul className="list-disc list-inside text-base text-foreground mb-2 ml-4">
            {t.raw('suggestions.introduction.why.bullets').map((bullet: string, i: number) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
          <p className="text-base text-foreground">
            {t('suggestions.introduction.conclusion')}
          </p>
        </div>

        {strategies.map((strategy, index) => (
          <motion.div
            key={strategy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 space-y-6 bg-white/90 dark:bg-gray-800/90">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-foreground/70">{t(`suggestions.strategies.${strategy.id}.name`)}</h3>
                <p className="text-lg text-foreground">{t(`suggestions.strategies.${strategy.id}.description`)}</p>
              </div>

              {/* Encart explicatif */}
              <div className="bg-primary/10 rounded-lg p-4 mb-2">
                <h4 className="text-lg font-bold text-primary mb-1">{t('suggestions.howItWorks.title')}</h4>
                <p className="text-base text-foreground">
                  {t('suggestions.howItWorks.description')}
                </p>
              </div>

              {/* Exemple d'expérience utilisateur */}
              <div className="bg-secondary/10 rounded-lg p-4 mb-2">
                <h4 className="text-base font-semibold text-secondary mb-1">{t('suggestions.userExperience.title')}</h4>
                <p className="text-base text-foreground">
                  {t('suggestions.userExperience.description')}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium mb-2 text-foreground/70">{t('suggestions.whenToUse.title')}</h4>
                  <ul className="list-disc list-inside space-y-1 text-foreground">
                    {t.raw(`suggestions.strategies.${strategy.id}.whenToUse`).map((useCase: string, i: number) => (
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
            <h3 className="text-2xl font-semibold text-foreground/70">{t('suggestions.circuits.title')}</h3>
            <div className="grid gap-6">
              {circuits.map((circuit, index) => (
                <motion.div
                  key={circuit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (strategies.length + index) * 0.1 }}
                >
                  <Card className="p-6 space-y-6 bg-white/90 dark:bg-gray-800/90">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {circuit.type === "objectives" ? (
                          <Target className="w-5 h-5 text-primary" />
                        ) : (
                          <Activity className="w-5 h-5 text-primary" />
                        )}
                        <h4 className="text-xl font-semibold text-foreground/70">{t(`suggestions.circuits.${circuit.id}.name`)}</h4>
                      </div>
                      <p className="text-foreground">{t(`suggestions.circuits.${circuit.id}.description`)}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2 text-foreground/70">{t('suggestions.circuits.type.title')}</h5>
                        <p className="text-foreground">{t(`suggestions.circuits.${circuit.id}.typeExplanation`)}</p>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2 text-foreground/70">{t('suggestions.circuits.relevance.title')}</h5>
                        <p className="text-foreground">{t(`suggestions.circuits.${circuit.id}.relevance`)}</p>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2 text-foreground/70">{t('suggestions.circuits.steps.title')}</h5>
                        {/* Timeline visuelle avec flèches */}
                        <div className="w-full">
                          <div className="flex flex-col sm:flex-row sm:flex-wrap items-center sm:justify-start gap-y-4 gap-x-0">
                            {(() => {
                              const steps = t.raw(`suggestions.circuits.${circuit.id}.steps`);
                              return steps.map((step: string, i: number) => (
                                <div key={i} className="flex flex-col sm:flex-row items-center mb-2 sm:mb-0">
                                  {/* Bulle + texte */}
                                  <div className="flex flex-row items-center gap-x-2 sm:gap-x-2">
                                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary font-bold text-primary text-base">
                                      {i + 1}
                                    </div>
                                    <span className="text-foreground text-base font-medium whitespace-nowrap">
                                      {step}
                                    </span>
                                  </div>
                                  {/* Flèche sauf pour la dernière étape */}
                                  {i < steps.length - 1 && (
                                    <>
                                      <div className="mx-2 sm:mx-3 my-1">
                                        <svg className="hidden sm:block" width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M2 10h22m0 0l-5-5m5 5l-5 5" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <svg className="block sm:hidden mx-auto" width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M10 2v22m0 0l5-5m-5 5l-5-5" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                      </div>
                                    </>
                                  )}
                                </div>
                              ));
                            })()}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2 text-foreground/70">{t('suggestions.circuits.benefits.title')}</h5>
                        <ul className="list-disc list-inside space-y-1 text-foreground">
                          {t.raw(`suggestions.circuits.${circuit.id}.benefits`).map((benefit: string, i: number) => (
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
              {t('suggestions.buttons.generate')}
            </Button>
          ) : (
            <div className="w-full max-w-md mx-auto flex flex-col items-center">
              <div className="mb-4 text-center">
                <p className="text-base font-semibold text-foreground/70 mb-1">
                  {t('suggestions.cta.title')}
                </p>
                <p className="text-sm text-foreground">
                  {t('suggestions.cta.description')}
                </p>
              </div>
              <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-primary/20 p-6 w-full flex flex-col items-center transition-all duration-200">
                <Button
                  onClick={handleGetStarted}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg font-bold shadow-xl hover:shadow-primary/20 transition-all duration-300 rounded-xl group w-full"
                >
                  {t('suggestions.cta.button')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <p className="text-sm text-foreground mt-4 text-center">
                <span role="img" aria-label="lock">🔓</span> {t('suggestions.cta.benefits')}
              </p>
              <Button
                variant="outline"
                className="mt-6 px-8"
                onClick={onClose}
              >
                {t('suggestions.buttons.close')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}