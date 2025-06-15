import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Check, HelpCircle } from "lucide-react";
import { useTranslations } from 'next-intl';

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
  label?: string;
  placeholder?: string;
  options?: { value: string; label?: string }[];
  hint?: string;
  required?: boolean;
  dependsOn?: {
    field: string;
    value: string;
  };
}

// Actions dynamiques selon l'objectif principal
const ACTIONS_BY_GOAL: Record<MainGoal, { value: string }[]> = {
  retention: [
    { value: "feature_usage" },
    { value: "login" },
    { value: "content_consumption" },
  ],
  engagement: [
    { value: "content_creation" },
    { value: "social_interaction" },
    { value: "feature_discovery" },
  ],
  conversion: [
    { value: "first_purchase" },
    { value: "add_to_cart" },
    { value: "request_demo" },
    { value: "subscription" },
    { value: "lead_capture" },
  ],
  onboarding: [
    { value: "profile_completion" },
    { value: "first_action" },
    { value: "tutorial_completion" },
  ],
};

const questions: Question[] = [
  {
    id: "projectType",
    type: "select",
    required: true,
    options: [
      { value: "saas" },
      { value: "marketplace" },
      { value: "mobile" },
      { value: "web" },
      { value: "other" }
    ]
  },
  {
    id: "targetAudience",
    type: "select",
    required: true,
    options: [
      { value: "b2b" },
      { value: "b2c" },
      { value: "b2b2c" }
    ]
  },
  {
    id: "mainGoal",
    type: "select",
    required: true,
    options: [
      { value: "retention" },
      { value: "engagement" },
      { value: "conversion" },
      { value: "onboarding" }
    ]
  },
  {
    id: "userExpertise",
    type: "select",
    required: false,
    dependsOn: {
      field: "mainGoal",
      value: "onboarding"
    },
    options: [
      { value: "beginner" },
      { value: "intermediate" },
      { value: "expert" }
    ]
  },
  {
    id: "actionFrequency",
    type: "select",
    required: false,
    dependsOn: {
      field: "mainGoal",
      value: "retention"
    },
    options: [
      { value: "daily" },
      { value: "weekly" },
      { value: "monthly" },
      { value: "onboarding" }
    ]
  }
];

interface StrategyGeneratorProps {
  mode?: "dashboard" | "landing";
  onComplete?: (strategy: StrategyFormData) => void;
}

export function StrategyGenerator({ mode = "dashboard", onComplete }: StrategyGeneratorProps) {
  const t = useTranslations('strategy');
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<StrategyFormData>>({});
  const [steps, setSteps] = useState<Question[][]>([]);
  const [dynamicActions, setDynamicActions] = useState<{ value: string; label: string }[]>([]);

  // Met à jour dynamiquement les actions selon le mainGoal
  useEffect(() => {
    if (formData.mainGoal) {
      setDynamicActions(ACTIONS_BY_GOAL[formData.mainGoal].map(action => ({
        ...action,
        label: t(`generator.actions.${formData.mainGoal}.${action.value}`)
      })));
    } else {
      setDynamicActions([]);
    }
  }, [formData.mainGoal, t]);

  useEffect(() => {
    const groupedQuestions: Question[][] = [];
    let currentGroup: Question[] = [];

    currentGroup = questions.filter(q => 
      !q.dependsOn && 
      q.id !== "desiredActions"
    ).map(q => ({
      ...q,
      label: t(`generator.questions.${q.id}.label`),
      placeholder: t(`generator.questions.${q.id}.placeholder`),
      options: q.options?.map(opt => ({
        ...opt,
        label: t(`generator.questions.${q.id}.options.${opt.value}`)
      })),
      hint: q.hint ? t(`generator.questions.${q.id}.hint`) : undefined
    }));
    groupedQuestions.push(currentGroup);

    currentGroup = questions.filter(q => 
      q.dependsOn && 
      formData[q.dependsOn.field as keyof StrategyFormData] === q.dependsOn.value
    ).map(q => ({
      ...q,
      label: t(`generator.questions.${q.id}.label`),
      placeholder: t(`generator.questions.${q.id}.placeholder`),
      options: q.options?.map(opt => ({
        ...opt,
        label: t(`generator.questions.${q.id}.options.${opt.value}`)
      })),
      hint: q.hint ? t(`generator.questions.${q.id}.hint`) : undefined
    }));
    if (currentGroup.length > 0) {
      groupedQuestions.push(currentGroup);
    }

    groupedQuestions.push([
      {
        id: "desiredActions",
        type: "multi-select",
        label: t('generator.questions.desiredActions.label'),
        placeholder: t('generator.questions.desiredActions.placeholder'),
        options: dynamicActions.length > 0 ? dynamicActions : [{ value: "default", label: t('generator.questions.desiredActions.default') }],
        required: true,
      }
    ]);

    setSteps(groupedQuestions);
  }, [formData, dynamicActions, t]);

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
            {t('generator.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('generator.subtitle')}
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
            {t('generator.buttons.back')}
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isStepComplete()}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium px-8"
          >
            {currentStep === steps.length - 1 ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                {mode === "dashboard" ? t('generator.buttons.generate') : t('generator.buttons.viewSuggestions')}
              </>
            ) : (
              <>
                <ArrowRight className="w-4 h-4 mr-2" />
                {t('generator.buttons.next')}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 