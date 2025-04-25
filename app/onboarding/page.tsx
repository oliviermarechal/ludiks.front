'use client';

import { useState, useEffect } from "react";
import { Stepper } from "@/components/onboarding/stepper";
import { ProjectCreation } from "@/components/onboarding/steps/project-form";
import { CircuitCreation } from "@/components/onboarding/steps/circuit-creation";
import { StepsSetup } from "@/components/onboarding/steps/steps-setup";
import { ObjectivesSetup } from "@/components/onboarding/steps/objectives-setup";
import { ApiSetup } from "@/components/onboarding/steps/api-setup";
import { useRouter } from "next/navigation";
import createProject from "@/lib/actions/project/create-project.action";
import { Project, useProjectStore } from "@/lib/stores/project-store";
import { useProjects } from "@/lib/hooks/use-projects.hook";
import { useCircuits } from "@/lib/hooks/use-circuits.hook";
import { CircuitStep, CircuitType } from "@/lib/types/circuit";
import createCircuit from "@/lib/actions/circuit/create-circuit.action";
import { useCircuitStore } from "@/lib/stores/circuit-store";

const steps = [
  {
    title: "Projet",
    description: "Créez votre projet",
  },
  {
    title: "Circuit",
    description: "Configurez votre premier circuit",
  },
  {
    title: "Configuration",
    description: "Définissez les étapes",
  },
  {
    title: "API",
    description: "Récupérez votre clé API",
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [circuitData, setCircuitData] = useState<{ 
    name: string; 
    type: CircuitType; 
    projectId: string;
  } | null>(null);
  const [stepsData, setStepsData] = useState<CircuitStep[] | null>(null);
  const router = useRouter();
  const { addProject } = useProjectStore();
  const { projects, isLoading: projectsLoading } = useProjects();
  const { setProjectId, addCircuit } = useCircuitStore();
  const { circuits, isLoading: circuitsLoading } = useCircuits(projectData?.id);
  
  // Dans un vrai projet, cette clé serait générée par le backend
  const dummyApiKey = "sk_test_ludiks_123456789";

  useEffect(() => {
    if (!projectsLoading && projects.length > 0 && !projectData) {
      const firstProject = projects[0];
      setProjectData(firstProject);
      setProjectId(firstProject.id);
    }
  }, [projectsLoading, projects, projectData, setProjectId]);

  useEffect(() => {
    if (currentStep === 0 && !circuitsLoading && projectData) {
      if (circuits.length > 0) {
        setCircuitData({
          name: circuits[0].name,
          type: circuits[0].type,
          projectId: projectData.id
        });
        setCurrentStep(2);
      } else {
        setCurrentStep(1);
      }
    }
  }, [currentStep, circuitsLoading, circuits, projectData]);

  const handleProjectCreation = async (data: { name: string }) => {
    const project = await createProject(data.name);
    addProject(project);
    setProjectData(project);
    setProjectId(project.id);
    setCurrentStep(1);
  };

  const handleCircuitCreation = async (data: {name: string, type: CircuitType, projectId: string, description?: string}) => {
    const circuit = await createCircuit(data.name, data.type, data.projectId, data.description);
    addCircuit(circuit);
    setCircuitData(circuit);
    setCurrentStep(2);
  };

  const handleStepsSetup = (data: CircuitStep[]) => {
    setStepsData(data);
    setCurrentStep(3);
  };

  const handleObjectivesSetup = (data: { objectives: CircuitStep[] }) => {
    setStepsData(data.objectives);
    setCurrentStep(3);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleFinish = async () => {
    if (!circuitData || !stepsData || !projectData) {
      console.error("Missing data for circuit creation");
      return;
    }

    try {
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating circuit:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-15 mix-blend-overlay pointer-events-none"></div>
      <div className="container mx-auto py-12 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary via-secondary to-secondary text-transparent bg-clip-text mb-4">
              Bienvenue sur Ludiks
            </h1>
            <p className="text-lg text-foreground/70">
              Configurons ensemble votre premier projet
            </p>
          </div>

          <Stepper currentStep={currentStep} steps={steps} />

          <div className="mt-8">
            <div className="bg-black/40 backdrop-blur-sm border border-primary/20 rounded-xl p-8 shadow-xl">
              {currentStep === 0 && (
                <ProjectCreation onNext={handleProjectCreation} />
              )}
              {currentStep === 1 && projectData && (
                <CircuitCreation onNext={handleCircuitCreation} projectId={projectData.id} />
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
              {currentStep === 3 && (
                <ApiSetup onNext={handleFinish} apiKey={dummyApiKey} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}