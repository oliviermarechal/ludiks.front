import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Check, HelpCircle } from "lucide-react";

export type MainGoal = "retention" | "engagement" | "conversion" | "onboarding";

export interface StrategyFormData {
  projectType: string;
  targetAudience: string;
  mainGoal: MainGoal;
  userExpertise?: string;
  actionFrequency?: string;
  desiredActions: string[];
}

interface Question {
  id: string;
  type: "select" | "number" | "text" | "multi-select";
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  hint?: string;
  required?: boolean;
  dependsOn?: {
    field: string;
    value: string;
  };
}

// Actions dynamiques selon l'objectif principal
const ACTIONS_BY_GOAL: Record<MainGoal, { value: string; label: string }[]> = {
  retention: [
    { value: "feature_usage", label: "Utilisation régulière des fonctionnalités" },
    { value: "login", label: "Connexion récurrente" },
    { value: "content_consumption", label: "Consommation de contenu" },
  ],
  engagement: [
    { value: "content_creation", label: "Création de contenu" },
    { value: "social_interaction", label: "Interaction sociale" },
    { value: "feature_discovery", label: "Découverte de nouvelles fonctionnalités" },
  ],
  conversion: [
    { value: "first_purchase", label: "Premier achat" },
    { value: "add_to_cart", label: "Ajout au panier" },
    { value: "request_demo", label: "Demande de démo" },
    { value: "subscription", label: "Souscription à une offre" },
    { value: "lead_capture", label: "Soumission d'un lead" },
  ],
  onboarding: [
    { value: "profile_completion", label: "Complétion du profil" },
    { value: "first_action", label: "Première action clé" },
    { value: "tutorial_completion", label: "Finir le tutoriel" },
  ],
};

const questions: Question[] = [
  {
    id: "projectType",
    type: "select",
    label: "Type de projet",
    placeholder: "Sélectionnez le type de votre projet",
    options: [
      { value: "saas", label: "SaaS" },
      { value: "marketplace", label: "Marketplace" },
      { value: "mobile", label: "Application mobile" },
      { value: "web", label: "Application web" },
      { value: "other", label: "Autre" },
    ],
    required: true,
  },
  {
    id: "targetAudience",
    type: "select",
    label: "Audience cible",
    placeholder: "Sélectionnez votre audience",
    options: [
      { value: "b2b", label: "B2B" },
      { value: "b2c", label: "B2C" },
      { value: "b2b2c", label: "B2B2C" },
    ],
    required: true,
  },
  {
    id: "mainGoal",
    type: "select",
    label: "Objectif principal",
    placeholder: "Quel est votre objectif principal ?",
    options: [
      { value: "retention", label: "Améliorer la rétention" },
      { value: "engagement", label: "Augmenter l'engagement" },
      { value: "conversion", label: "Améliorer la conversion" },
      { value: "onboarding", label: "Optimiser l'onboarding" },
    ],
    required: true,
  },
  {
    id: "userExpertise",
    type: "select",
    label: "Niveau d'expertise",
    placeholder: "Niveau d'expertise de vos utilisateurs",
    options: [
      { value: "beginner", label: "Débutant" },
      { value: "intermediate", label: "Intermédiaire" },
      { value: "expert", label: "Expert" },
    ],
    required: false,
    hint: "Optionnel - Aide à adapter la complexité des parcours",
    dependsOn: {
      field: "mainGoal",
      value: "onboarding",
    },
  },
  {
    id: "actionFrequency",
    type: "select",
    label: "Fréquence souhaitée",
    placeholder: "À quelle fréquence ?",
    options: [
      { value: "daily", label: "Quotidienne" },
      { value: "weekly", label: "Hebdomadaire" },
      { value: "monthly", label: "Mensuelle" },
      { value: "onboarding", label: "Pendant l'onboarding" },
    ],
    required: false,
    hint: "Optionnel - Aide à définir le rythme des parcours",
    dependsOn: {
      field: "mainGoal",
      value: "retention",
    },
  },
];

interface StrategyGeneratorProps {
  mode?: "dashboard" | "landing";
  onComplete?: (strategy: StrategyFormData) => void;
}

export function StrategyGenerator({ mode = "dashboard", onComplete }: StrategyGeneratorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<StrategyFormData>>({});
  const [steps, setSteps] = useState<Question[][]>([]);
  const [dynamicActions, setDynamicActions] = useState<{ value: string; label: string }[]>([]);

  // Met à jour dynamiquement les actions selon le mainGoal
  useEffect(() => {
    if (formData.mainGoal) {
      setDynamicActions(ACTIONS_BY_GOAL[formData.mainGoal]);
    } else {
      setDynamicActions([]);
    }
  }, [formData.mainGoal]);

  useEffect(() => {
    // Grouper les questions en étapes
    const groupedQuestions: Question[][] = [];
    let currentGroup: Question[] = [];

    // Première étape : questions de base
    currentGroup = questions.filter(q => 
      !q.dependsOn && 
      q.id !== "desiredActions"
    );
    groupedQuestions.push(currentGroup);

    // Deuxième étape : questions conditionnelles
    currentGroup = questions.filter(q => 
      q.dependsOn && 
      formData[q.dependsOn.field as keyof StrategyFormData] === q.dependsOn.value
    );
    if (currentGroup.length > 0) {
      groupedQuestions.push(currentGroup);
    }

    // Dernière étape : actions souhaitées (toujours présent)
    groupedQuestions.push([
      {
        id: "desiredActions",
        type: "multi-select",
        label: "Actions à encourager",
        placeholder: "Sélectionnez les actions à encourager",
        options: dynamicActions.length > 0 ? dynamicActions : [{ value: "default", label: "Action principale" }],
        required: true,
      }
    ]);

    setSteps(groupedQuestions);
  }, [formData, dynamicActions]);

  const handleValueChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      // Vérifier que toutes les propriétés requises sont présentes
      const requiredFields = ["projectType", "targetAudience", "mainGoal", "desiredActions"];
      const isComplete = requiredFields.every(field => formData[field as keyof StrategyFormData] !== undefined);
      if (isComplete) {
        onComplete?.(formData as StrategyFormData);
      }
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const isStepComplete = () => {
    const currentStepQuestions = steps[currentStep];
    if (!currentStepQuestions) return false;
    return currentStepQuestions.every(question => {
      if (!question.required) return true;
      return formData[question.id as keyof StrategyFormData] !== undefined &&
        // Pour multi-select, il faut au moins une action cochée
        (question.type !== "multi-select" || ((formData[question.id as keyof StrategyFormData] as string[] | undefined)?.length ?? 0) > 0);
    });
  };

  const currentQuestions = steps[currentStep] || [];

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Générez votre stratégie de gamification
          </h2>
          <p className="text-lg text-muted-foreground">
            Répondez aux questions pour obtenir des suggestions personnalisées
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {currentQuestions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2">
                  <Label className="text-base">{question.label}</Label>
                  {question.hint && (
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                {question.type === "select" && (
                  <Select
                    value={formData[question.id as keyof StrategyFormData] as string}
                    onValueChange={(value) => handleValueChange(question.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={question.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {question.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {question.type === "multi-select" && (
                  <div className="grid grid-cols-2 gap-2">
                    {question.options?.map((option) => (
                      <Button
                        key={option.value}
                        variant={
                          (formData[question.id as keyof StrategyFormData] as string[] || []).includes(option.value)
                            ? "default"
                            : "outline"
                        }
                        onClick={() => {
                          const currentValues = (formData[question.id as keyof StrategyFormData] as string[] || []);
                          const newValues = currentValues.includes(option.value)
                            ? currentValues.filter(v => v !== option.value)
                            : [...currentValues, option.value];
                          handleValueChange(question.id, newValues);
                        }}
                        className="justify-start"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                )}
                {question.hint && (
                  <p className="text-sm text-muted-foreground">
                    {question.hint}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between pt-8">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="px-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isStepComplete()}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium px-8"
          >
            {currentStep === steps.length - 1 ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                {mode === "dashboard" ? "Générer la stratégie" : "Voir les suggestions"}
              </>
            ) : (
              <>
                <ArrowRight className="w-4 h-4 mr-2" />
                Suivant
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 