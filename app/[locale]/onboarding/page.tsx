'use client';

import { useState, useEffect } from "react";
import { Stepper } from "@/components/onboarding/stepper";
import { ProjectCreation } from "@/components/onboarding/steps/project-form";
import { CircuitCreation } from "@/components/onboarding/steps/circuit-creation";
import { StepsSetup } from "@/components/onboarding/steps/steps-setup";
import { ObjectivesSetup } from "@/components/onboarding/steps/objectives-setup";
import { useRouter } from'@/lib/navigation';
import { Project, useProjectStore } from "@/lib/stores/project-store";
import { useOrganizations } from "@/lib/hooks/use-organizations.hook";
import { useCircuits } from "@/lib/hooks/use-circuits.hook";
import { CircuitType, Step, Circuit } from "@/lib/types/circuit.types";
import setCircuitSteps from "@/lib/actions/circuit/set-circuit-steps.action";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/hooks/use-auth.hook";
import { useLudiks } from "@/lib/hooks/use-ludiks.hook";

export default function OnboardingPage() {
  const t = useTranslations('onboarding.project');
  const [currentStep, setCurrentStep] = useState(0);
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [circuitData, setCircuitData] = useState<(Circuit & { projectId: string }) | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingSetup, setIsCheckingSetup] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addProject, setSelectedProject, setSelectedOrganization, selectedOrganization } = useProjectStore();
  const { organizations, isLoading: organizationsLoading, createOrganization } = useOrganizations();
  const { circuits, isLoading: circuitsLoading, createCircuit } = useCircuits(projectData?.id);
  const { user } = useAuth();
  const { trackEvent, initUser } = useLudiks({
    apiKey: process.env.NEXT_PUBLIC_LUDIKS_API_KEY || '',
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  })

  const steps = [
    {
      title: t('steps.project.title'),
      description: t('steps.project.description'),
    },
    {
      title: t('steps.circuit.title'),
      description: t('steps.circuit.description'),
    },
    {
      title: t('steps.configuration.title'),
      description: t('steps.configuration.description'),
    },
  ];

  useEffect(() => {
    if (!organizationsLoading && !circuitsLoading && circuits.length > 0) {
      const hasCompleteSetup = circuits.some((circuit: Circuit) => 
        circuit.steps && circuit.steps.length > 0
      );

      if (hasCompleteSetup) {
        router.push('/dashboard');
        return;
      }
      
      setIsCheckingSetup(false);
    } else if (!organizationsLoading && !circuitsLoading) {
      setIsCheckingSetup(false);
    }
  }, [organizationsLoading, circuitsLoading, circuits, router]);
  
  useEffect(() => {
    if (!organizationsLoading && organizations.length > 0 && !projectData) {
      const firstProject = organizations[0]?.projects[0];
      if (firstProject) {
        setProjectData(firstProject);
        setSelectedProject(firstProject);
      }
    }
  }, [organizationsLoading, organizations, projectData, setSelectedProject]);

  useEffect(() => {
    if (currentStep === 0 && !circuitsLoading && projectData) {
      if (circuits.length > 0) {
        const firstCircuit = circuits[0];
        setCircuitData({
          ...firstCircuit,
          projectId: projectData.id,
        });
        setCurrentStep(2);
      } else {
        setCurrentStep(1);
      }
    }
  }, [currentStep, circuitsLoading, circuits, projectData]);

  const handleProjectCreation = async (data: { name: string }) => {
    setError(null);
    
    try {
      const organization = await createOrganization(data.name);
      const project = organization.projects[0];
      
      await initUser({
        id: organization.id,
        fullName: organization.name,
        email: user?.email,
        metadata: {
          pro: organization.plan === 'pro',
        }
      })
      await trackEvent(organization.id, 'create_organization') // Onboarding circuit
      trackEvent(organization.id, 'organization_created') // conversion circuit

      addProject(project);
      setProjectData(project);
      setSelectedOrganization(organization);
      setSelectedProject(project);
      setCurrentStep(1);
      toast.success(t('toast.success.projectCreated'));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('toast.error.projectCreationFailed');
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleCircuitCreation = async (data: {name: string, type: CircuitType, projectId: string, description?: string}) => {
    setError(null);
    
    try {
      if (circuitData?.id) {
        setCurrentStep(2);
        setCircuitData({
          ...circuitData,
          name: data.name,
          type: data.type,
          projectId: data.projectId,
        });
        return;
      }

      const circuit = await createCircuit({ name: data.name, type: data.type });
      setCircuitData({ ...circuit, projectId: data.projectId });
      if (selectedOrganization) {
        trackEvent(selectedOrganization.id, 'create_circuit') // Onboarding circuit
      }
      setCurrentStep(2);
      toast.success(t('toast.success.circuitCreated'));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('toast.error.circuitCreationFailed');
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleStepsSetup = async (data: Step[]) => {
    if (!circuitData?.id) return;
    
    setError(null);
    
    try {
      await setCircuitSteps(circuitData.id, data);
      if (selectedOrganization) {
        trackEvent(selectedOrganization.id, 'generate_steps') // Onboarding circuit
      }
      
      await queryClient.refetchQueries({ queryKey: ['circuits', circuitData.projectId] });
      
      router.push(`/dashboard/circuits/${circuitData.id}`);
      toast.success(t('toast.success.configurationCompleted'));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('toast.error.stepsConfigurationFailed');
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleObjectivesSetup = async (data: {objectives: Step[]}) => {
    if (!circuitData?.id) return;
    
    setError(null);
    
    try {
      const objectives = data.objectives.map((obj: Step) => ({
        id: obj.id || `obj_${Date.now()}_${Math.random()}`,
        name: obj.name,
        eventName: obj.eventName,
        completionThreshold: obj.completionThreshold,
        description: obj.description,
      }));
      await setCircuitSteps(circuitData.id, objectives);
      
      await queryClient.refetchQueries({ queryKey: ['circuits', circuitData.projectId] });
      
      router.push(`/dashboard/circuits/${circuitData.id}`);
      toast.success(t('toast.success.configurationCompleted'));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('toast.error.objectivesConfigurationFailed');
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Afficher un loading pendant la vérification
  if (isCheckingSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-foreground/70">Vérification de votre configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-15 mix-blend-overlay pointer-events-none"></div>
      <div className="container mx-auto py-12 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary via-secondary to-secondary text-transparent bg-clip-text mb-4">
              {t('welcome.title')}
            </h1>
            <p className="text-lg text-foreground/70">
              {t('welcome.subtitle')}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <Stepper currentStep={currentStep} steps={steps} />

          <div className="mt-8">
            <div className="bg-white/80 backdrop-blur-sm border border-primary/20 rounded-xl p-8 shadow-xl">
              {currentStep === 0 && (
                <ProjectCreation onNext={handleProjectCreation} />
              )}
              {currentStep === 1 && projectData && (
                <CircuitCreation 
                  onNext={handleCircuitCreation} 
                  projectId={projectData.id}
                  initialData={circuitData}
                />
              )}
              {currentStep === 2 && circuitData && (
                circuitData.type === "objective" ? (
                  <ObjectivesSetup onNext={handleObjectivesSetup} onBack={handleBack} />
                ) : (
                  <StepsSetup 
                    onNext={handleStepsSetup} 
                    onBack={handleBack}
                    circuitName={circuitData.name}
                    circuitType={circuitData.type}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}