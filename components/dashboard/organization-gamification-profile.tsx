'use client'

import { useEffect, useState } from 'react';
import { useProjectStore } from '@/lib/stores/project-store';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useLudiks } from '@/lib/hooks/use-ludiks.hook';
import { CircuitProgression, LudiksProfile, StepProgression } from '@ludiks/sdk';
import { Trophy, Sparkles, Check, XCircle, Gift } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function OrganizationProfileInfoCard() {
  const t = useTranslations('ludiksProfile');
  const selectedOrganization = useProjectStore((s) => s.selectedOrganization);
  const { getProfile } = useLudiks({
    apiKey: process.env.NEXT_PUBLIC_LUDIKS_API_KEY!,
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  });
  const [profile, setProfile] = useState<LudiksProfile | null>(null);
  useEffect(() => {
    if (!selectedOrganization) return;
    getProfile(selectedOrganization.id).then(setProfile);
  }, [selectedOrganization, getProfile]);
  if (!profile) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }) + ' à ' + date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-1 rounded-xl px-8 py-5 shadow items-center justify-center">
          <div className="flex items-center gap-2 justify-center">
            <span className="text-lg">📅</span>
            <span className="text-xs text-muted-foreground">{t('accountCreatedLabel')}</span>
            <span className="font-semibold">{formatDate(profile.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <span className="text-lg">🟢</span>
            <span className="text-xs text-muted-foreground">{t('lastLoginLabel')}</span>
            <span className="font-semibold">{formatDateTime(profile.lastLogin)}</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <span className="text-lg">🔥</span>
            <span className="text-xs text-muted-foreground">{t('currentStreakLabel')}</span>
            <span className="font-semibold text-orange-600 dark:text-orange-300">{profile.currentStreak}</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <span className="text-lg">🏆</span>
            <span className="text-xs text-muted-foreground">{t('bestStreakLabel')}</span>
            <span className="font-semibold text-yellow-600 dark:text-yellow-300">{profile.longestStreak}</span>
          </div>
      </div>
    </div>
  );
}

export function OrganizationGamificationProfile() {
  const t = useTranslations('ludiksProfile');
  const selectedOrganization = useProjectStore((s) => s.selectedOrganization);
  const { getProfile } = useLudiks({
    apiKey: process.env.NEXT_PUBLIC_LUDIKS_API_KEY!,
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  });
  const [profile, setProfile] = useState<LudiksProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedOrganization) return;
    setLoading(true);
    setError(null);
    getProfile(selectedOrganization.id)
      .then(setProfile)
      .catch((e) => setError(e.message || 'Erreur lors du chargement du profil'))
      .finally(() => setLoading(false));
  }, [selectedOrganization, getProfile]);

  if (!selectedOrganization) return <div className="p-4 text-muted-foreground">{t('selectOrganization')}</div>;
  if (loading) return <div className="p-4">{t('loading')}</div>;
  if (error) return <div className="p-4 text-destructive">{error}</div>;
  if (!profile) return <div className="p-4">{t('profileUnavailable')}</div>;

  const getCircuitTypeBadge = (type: string) => {
    switch (type) {
      case 'actions':
        return <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">🎯 {t('type.actions')}</Badge>;
      case 'objective':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">🎯 {t('type.objective')}</Badge>;
      case 'points':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">⭐ {t('type.points')}</Badge>;
      default:
        return <Badge variant="outline">📊 {type}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="p-4">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{t('section.circuits')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.progressions.map((circuit: CircuitProgression) => {
              let progressValue = 0;
              if (circuit.type === 'objective') {
                const completed = circuit.stepProgressions.filter(s => s.status === 'completed').length;
                const total = circuit.stepProgressions.length;
                progressValue = total > 0 ? Math.round((completed / total) * 100) : 0;
              } else {
                const maxThreshold = Math.max(...circuit.stepProgressions.map(s => s.completionThreshold));
                progressValue = maxThreshold > 0 ? Math.round((circuit.points / maxThreshold) * 100) : 0;
              }
              return (
                <div key={circuit.id} className="bg-surface-1 rounded-lg p-4 shadow-sm flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-base">{circuit.name}</span>
                    {getCircuitTypeBadge(circuit.type)}
                    {circuit.status === 'completed' && <Badge variant="default">{t('status.completed')}</Badge>}
                    {circuit.status === 'in_progress' && <Badge variant="secondary">{t('status.in_progress')}</Badge>}
                    {circuit.status === 'not_started' && <Badge variant="outline">{t('status.not_started')}</Badge>}
                  </div>
                  <Progress value={progressValue} max={100} className="h-2 mb-2" />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {circuit.stepProgressions.map((step: StepProgression) => {
                      if ((circuit.type === 'actions' || circuit.type === 'points') && step.status === 'not_started') {
                        return (
                          <Badge key={step.id} variant="outline">
                            {circuit.type === 'actions'
                              ? `${circuit.points}/${step.completionThreshold} actions`
                              : `${circuit.points}/${step.completionThreshold} pts`}
                          </Badge>
                        );
                      }
                      return (
                        <Badge key={step.id} variant={step.status === 'completed' ? 'default' : step.status === 'in_progress' ? 'secondary' : 'outline'}>
                          {circuit.type === 'objective' ? (
                            <>
                              {step.status === 'completed' ? (
                                <Check className="inline-block mr-1 h-4 w-4 text-green-500 align-text-bottom" />
                              ) : (
                                <XCircle className="inline-block mr-1 h-4 w-4 text-red-400 align-text-bottom" />
                              )}
                              {step.name}
                            </>
                          ) : circuit.type === 'actions' ? (
                            t('step.actions', { points: step.points, target: step.completionThreshold })
                          ) : circuit.type === 'points' ? (
                            t('step.points', { points: step.points, target: step.completionThreshold })
                          ) : (
                            step.completionThreshold
                          )}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Récompenses obtenues */}
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
            <Trophy className="h-6 w-6 text-yellow-400" />
            {t('section.rewards')}
          </h3>
          {profile.rewards && profile.rewards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.rewards.map((reward) => {
                return (
                  <div
                    key={reward.id}
                    className={
                      `relative rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center animate-ludiks-pop ` +
                      `bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 border-2 border-yellow-300 dark:from-yellow-900 dark:via-yellow-800 dark:to-yellow-700 dark:border-yellow-700`
                    }
                    style={{ minHeight: 180 }}
                  >
                    <h4 className="font-bold text-lg mb-1 text-center">{reward.name}</h4>
                    {reward.description && (
                      <p className="text-xs text-muted-foreground mb-2 text-center">{reward.description}</p>
                    )}
                    {/* Affichage du nom de l'étape ou du circuit */}
                    <div className="text-xs text-yellow-700 dark:text-yellow-200 mb-2 text-center">
                      {reward.stepName ? (
                        <span>🎯 {reward.stepName}</span>
                      ) : reward.unlockOnCircuitCompletion ? (
                        <span>🏆 {reward.circuitName}</span>
                      ) : null}
                    </div>
                    <span className="obtained-date text-xs text-yellow-700 dark:text-yellow-200 mt-2">
                      {t('reward.obtained', { date: formatDate(reward.obtainedAt) })}
                    </span>
                    <span className="absolute top-2 right-2">
                      <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-surface-1 rounded-lg p-8 text-center flex flex-col items-center shadow-inner border border-dashed border-yellow-200 dark:border-yellow-700">
              <Gift className="h-10 w-10 text-yellow-400 mb-4" />
              <h4 className="font-bold text-lg mb-2">{t('rewards.empty.title')}</h4>
              <p className="text-base text-muted-foreground">
                {t('rewards.empty.desc')}
              </p>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes ludiks-pop {
          0% { transform: scale(0.7); opacity: 0; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-ludiks-pop {
          animation: ludiks-pop 0.7s cubic-bezier(.22,1.61,.36,1) both;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
} 