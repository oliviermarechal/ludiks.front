'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, X, Search, SlidersHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Circuit } from "@/lib/types/circuit.types";
import { ProjectMetadata } from "@/lib/hooks/use-project-metadata.hook";
import { useTranslations } from "next-intl";

interface AdvancedUserFiltersProps {
  circuits: Circuit[];
  metadatas?: ProjectMetadata[];
  filters: Record<string, unknown>;
  onChange: (filters: Record<string, unknown>) => void;
  onExportCsv?: () => void;
}

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
  highlight?: boolean;
  className?: string;
  t?: (key: string) => string;
}

function ucFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Fonctions utilitaires pour gérer les préfixes des métadonnées
// Les métadonnées sont préfixées avec "meta_" pour être reconnues par l'API
function getMetadataKey(keyName: string): string {
  return `meta_${keyName}`;
}

function getOriginalKey(metadataKey: string): string {
  return metadataKey.replace(/^meta_/, '');
}

function isMetadataKey(key: string): boolean {
  return key.startsWith('meta_');
}

// Hook pour le debounce
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function FilterSelect({ label, value, onChange, options, disabled, highlight, className, t }: FilterSelectProps) {
  return (
    <div className={`flex flex-col min-w-[120px] ${className ?? ''}`}>
      <label className={`text-xs font-medium mb-0.5 ${highlight ? 'text-primary' : disabled ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>{ucFirst(t ? t(label) : label)}</label>
      <select
        className={`border rounded px-2 py-1 text-sm w-full h-8 transition-colors
          ${disabled ? 'border-muted-foreground/30 bg-muted/30 text-muted-foreground/70' : 'border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/30 bg-background'}`}
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{ucFirst(t ? t(opt.label) : opt.label)}</option>
        ))}
      </select>
    </div>
  );
}

interface ActiveChipsProps {
  chips: [string, unknown][];
  circuits: Circuit[];
  local: Record<string, unknown>;
  metadatas: ProjectMetadata[];
  onRemove: (key: string) => void;
}

function ActiveChips({ chips, circuits, local, metadatas, onRemove }: ActiveChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {chips.map(([key, value]) => {
        let label = key;
        let displayValue = String(value);
        
        if (key === 'circuitId') {
          const circuit = circuits.find(c => c.id === value);
          label = 'circuit';
          displayValue = circuit ? circuit.name : value as string;
        } else if (key === 'circuitStep') {
          if (!local.circuitId) {
            return null;
          }
          label = 'progression';
          const selectedCircuit = circuits.find(c => c.id === local.circuitId);
          if (value === '0') {
            displayValue = 'Pas commencé';
          } else if (value === 'end') {
            displayValue = 'Terminé';
          } else if (selectedCircuit && selectedCircuit.steps) {
            const step = selectedCircuit.steps.find(s => s.id === value);
            displayValue = step ? step.name : value as string;
          }
        } else {
          // Pour les métadonnées, afficher le label
          const meta = metadatas.find(m => m.keyName === getOriginalKey(key));
          if (meta) {
            const val = meta.values.find(v => v.value === value);
            displayValue = val ? ucFirst(String(val.value)) : ucFirst(String(value));
            label = ucFirst(meta.keyName);
          } else if (isMetadataKey(key)) {
            // Si c'est une clé de métadonnée mais qu'on ne trouve pas la meta, afficher quand même
            label = ucFirst(getOriginalKey(key));
            displayValue = ucFirst(String(value));
          }
        }
        
        return (
          <span key={key} className="flex items-center bg-primary/10 rounded-full px-3 py-1 text-xs text-primary border border-primary/30">
            {ucFirst(label)}: {displayValue}
            <button
              type="button"
              className="ml-1 text-primary hover:text-destructive transition-colors"
              onClick={() => onRemove(key)}
              aria-label="Remove filter"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        );
      }).filter(Boolean)}
    </div>
  );
}

function MetadataPopover({ metadatas, local, onChange, t }: { metadatas: ProjectMetadata[]; local: Record<string, unknown>; onChange: (key: string, value: string) => void; t: (key: string) => string }) {
  const [open, setOpen] = useState(false);
  if (!metadatas.length) return null;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" className="h-8 px-3 border-primary/40 hover:border-primary text-primary font-medium flex items-center gap-1" size="sm" aria-label={t('filters.metadata')}>
          <SlidersHorizontal className="h-4 w-4" />
          {t('filters.metadata')}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-4 min-w-[540px] max-w-[900px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metadatas.map(meta => (
            <FilterSelect
              key={meta.id}
              label={meta.keyName}
              value={typeof local[getMetadataKey(meta.keyName)] === 'string' ? local[getMetadataKey(meta.keyName)] as string : ''}
              onChange={v => onChange(getMetadataKey(meta.keyName), v)}
              options={[
                { value: '', label: t('filters.all') },
                ...meta.values.map(val => ({ value: val.value, label: val.value }))
              ]}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function AdvancedUserFilters({ circuits, metadatas = [], filters, onChange, onExportCsv }: AdvancedUserFiltersProps) {
  const t = useTranslations('dashboard.users');
  const [pending, setPending] = useState<Record<string, unknown>>(filters);
  const [searchQuery, setSearchQuery] = useState(typeof pending.query === 'string' ? pending.query : '');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    setSearchQuery(typeof pending.query === 'string' ? pending.query : '');
  }, [pending.query]);

  useEffect(() => {
    const newFilters = { ...pending };
    if (debouncedSearchQuery && debouncedSearchQuery.length >= 3) {
      newFilters.query = debouncedSearchQuery;
    } else if (debouncedSearchQuery.length === 0) {
      delete newFilters.query;
    }
    // Ne pas déclencher onChange si la recherche fait moins de 3 caractères
    if (debouncedSearchQuery.length >= 3 || debouncedSearchQuery.length === 0) {
      onChange(newFilters);
    }
  }, [debouncedSearchQuery, pending.query, onChange]);

  const handleChange = (key: string, value: string) => {
    const newPending = { ...pending, [key]: value };
    
    // Si on retire ou change le filtre de parcours, retirer automatiquement le filtre de progression
    if (key === 'circuitId' && (!value || value === '')) {
      delete newPending.circuitStep;
    }
    
    setPending(newPending);
    onChange(newPending);
  };
  
  const handleReset = () => {
    setPending({});
    setSearchQuery('');
    onChange({});
  };
  
  const handleRemoveChip = (key: string) => {
    const newFilters = { ...pending };
    delete newFilters[key];
    
    // Si on retire le filtre de parcours, retirer automatiquement le filtre de progression
    if (key === 'circuitId') {
      delete newFilters.circuitStep;
    }
    
    setPending(newFilters);
    onChange(newFilters);
  };

  const handleExportCsv = () => {
    if (onExportCsv) {
      onExportCsv();
    } else {
      // Export par défaut avec les filtres actuels
      const queryParams = new URLSearchParams();
      Object.entries(pending).forEach(([key, value]) => {
        if (value && value !== '') {
          queryParams.append(key, String(value));
        }
      });
      
      const queryString = queryParams.toString();
      const exportUrl = `/api/projects/export/users${queryString ? `?${queryString}` : ''}`;
      
      // Créer un lien temporaire pour le téléchargement
      const link = document.createElement('a');
      link.href = exportUrl;
      link.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const circuitOptions = [{ value: '', label: t('filters.all') }, ...circuits.map(c => ({ value: c.id, label: c.name }))];
  const progressionOptions = (() => {
    if (!pending.circuitId || typeof pending.circuitId !== 'string') return [{ value: '', label: t('filters.all') }];
    const selectedCircuit = circuits.find(c => c.id === pending.circuitId);
    if (!selectedCircuit) return [{ value: '', label: t('filters.all') }];
    return [
      { value: '', label: t('filters.all') },
      { value: '0', label: t('filters.not_started') },
      ...((selectedCircuit.steps || []).map(step => ({ value: String(step.id), label: step.name }))),
      { value: 'end', label: t('filters.ended') }
    ];
  })();

  return (
    <div className="w-full flex flex-col gap-1 px-4 py-3 md:py-4">
      <div className="w-full flex flex-wrap items-end gap-2 md:gap-3">
        {/* Filtres principaux */}
        <FilterSelect
          label={t('filters.circuit')}
          value={typeof pending.circuitId === 'string' ? pending.circuitId : ''}
          onChange={v => handleChange('circuitId', v)}
          options={circuitOptions}
        />
        <FilterSelect
          label={t('filters.progression')}
          value={typeof pending.circuitStep === 'string' ? pending.circuitStep : ''}
          onChange={v => handleChange('circuitStep', v)}
          options={progressionOptions}
          disabled={!pending.circuitId}
        />
        {/* Séparateur visuel */}
        <div className="hidden md:flex h-8 w-px bg-primary/20 mx-2 rounded-full" aria-hidden="true" />
        {/* Input recherche */}
        <div className="flex flex-col min-w-[100px] max-w-[140px]">
          <label className={`text-xs font-medium mb-0.5 ${searchQuery ? 'text-primary' : 'text-muted-foreground'}`}>{t('filters.search')}</label>
          <div className="relative w-full">
            <Input
              type="text"
              placeholder={t('filters.search_placeholder')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const newFilters = { ...pending };
                  if (searchQuery.trim()) {
                    newFilters.query = searchQuery.trim();
                  } else {
                    delete newFilters.query;
                  }
                  onChange(newFilters);
                }
              }}
              className="pl-7 h-8 text-xs border border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-colors max-w-[140px]"
              maxLength={40}
            />
            <Search className={`absolute left-1.5 top-2 h-3.5 w-3.5 transition-colors ${searchQuery ? 'text-primary' : 'text-muted-foreground'}`} />
            {searchQuery && searchQuery.length < 3 && (
              <div className="absolute right-1 top-1.5 text-xs text-muted-foreground">
                {3 - searchQuery.length}
              </div>
            )}
          </div>
        </div>
        {/* Séparateur visuel */}
        <div className="hidden md:flex h-8 w-px bg-primary/20 mx-2 rounded-full" aria-hidden="true" />
        {/* Bouton Métadonnées (popover) */}
        <MetadataPopover metadatas={metadatas} local={pending} onChange={handleChange} t={t} />
        {/* Actions groupées à droite */}
        <div className="flex flex-row gap-2 items-center pt-4 md:pt-0 w-full md:w-auto justify-end md:ml-auto">
          <Button
            type="button"
            variant="outline"
            className="border-muted-foreground/40 hover:border-muted-foreground h-8 px-3 transition-colors"
            onClick={handleReset}
            size="sm"
            aria-label={t('filters.reset')}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>

          {/* Délimiteur visuel entre actions et export */}
          <div className="hidden md:flex h-8 w-px bg-primary/20 mx-2 rounded-full" aria-hidden="true" />
          <Button type="button" variant="outline" className="border-primary/40 hover:border-primary h-8 px-4 transition-colors font-medium" size="sm" onClick={handleExportCsv}>
            <Download className="h-4 w-4 mr-2 text-muted-foreground hover:text-primary transition-colors" />
            {t('filters.export_csv')}
          </Button>
        </div>
      </div>
      {/* Preview des filtres sélectionnés (chips) */}
      <ActiveChips chips={Object.entries(pending).filter(([key, value]) => key !== 'query' && value && value !== '')} circuits={circuits} local={pending} metadatas={metadatas} onRemove={handleRemoveChip} />
    </div>
  );
} 