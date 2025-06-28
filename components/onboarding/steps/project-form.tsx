'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

interface ProjectCreationProps {
  onNext: (data: { name: string }) => Promise<void>;
}

export function ProjectCreation({ onNext }: ProjectCreationProps) {
  const t = useTranslations('onboarding.project');
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectName.trim()) {
      setError(t('form.validation.name.required'));
      return;
    }
    
    if (projectName.trim().length < 3) {
      setError(t('form.validation.name.minLength'));
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await onNext({ name: projectName.trim() });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {t('form.title')}
        </h2>
        <p className="text-foreground/70">
          {t('form.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="projectName" className="block text-sm font-medium text-foreground">
            {t('form.name.label')}
          </label>
          <Input
            id="projectName"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder={t('form.name.placeholder')}
            className="bg-card border-primary/20 focus:border-primary/40 placeholder:text-foreground/50"
            disabled={isLoading}
          />
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || !projectName.trim()}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('form.submit.loading')}
            </>
          ) : (
            t('form.submit.default')
          )}
        </Button>
      </form>
    </div>
  );
} 