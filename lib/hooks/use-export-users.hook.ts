import { useState, useCallback } from 'react';
import { exportUsersCsv, downloadCsvBlob, ExportUsersFilters } from '@/lib/actions/users/export-users.action';

export function useExportUsers() {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportCsv = useCallback(async (projectId: string, filters: ExportUsersFilters = {}) => {
    if (!projectId) {
      setError('Aucun projet sélectionné');
      return;
    }

    setIsExporting(true);
    setError(null);

    try {
      // Exporter le CSV
      const blob = await exportUsersCsv(projectId, filters);
      
      // Télécharger le fichier
      const filename = `users-export-${projectId}-${new Date().toISOString().split('T')[0]}.csv`;
      downloadCsvBlob(blob, filename);
      
      // Succès - pas d'erreur à afficher
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'export CSV';
      setError(errorMessage);
      console.error('Erreur lors de l\'export CSV:', err);
    } finally {
      setIsExporting(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    exportCsv,
    isExporting,
    error,
    clearError,
  };
} 