'use client'

import { useState } from "react";
import { StrategyFormData, StrategyGenerator } from "@/components/strategy/generator";
import { StrategySuggestions } from "@/components/strategy/suggestions";
import { useRouter } from "next/navigation";

export default function StrategyPage() {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [strategyData, setStrategyData] = useState<StrategyFormData | null>(null);
  const router = useRouter();

  const handleComplete = (data: StrategyFormData) => {
    setStrategyData(data);
    setShowSuggestions(true);
  };

  const handleGenerate = () => {
    // TODO: Implémenter la génération des parcours
    router.push('/dashboard/circuits');
  };

  return (
    <div className="container mx-auto py-12">
      {!showSuggestions ? (
        <StrategyGenerator mode="dashboard" onComplete={handleComplete} />
      ) : (
        <StrategySuggestions
          formData={strategyData as StrategyFormData}
          onGenerate={handleGenerate}
        />
      )}
    </div>
  );
} 