import api from '@/lib/api';

export interface ExportUsersFilters {
  meta_key?: string;
  meta_value?: string;
  circuitId?: string;
  circuitStep?: string;
  query?: string;
}

export async function exportUsersCsv(projectId: string, filters: ExportUsersFilters = {}): Promise<Blob> {
  try {
    const requestData = {
      metadataFilters: {} as Record<string, string>,
      circuitId: '',
      circuitStep: '',
      searchTerm: '',
    };

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        if (key.startsWith('meta_')) {
          const metadataKey = key.replace('meta_', '');
          requestData.metadataFilters[metadataKey] = String(value);
        } else if (key === 'circuitId') {
          requestData.circuitId = String(value);
        } else if (key === 'circuitStep') {
          requestData.circuitStep = String(value);
        } else if (key === 'query') {
          requestData.searchTerm = String(value);
        }
      }
    });

    const url = `/api/projects/${projectId}/end-users/export`;
    
    const response = await api.post(url, requestData, {
      responseType: 'blob',
      headers: {
        'Accept': 'text/csv',
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'export CSV:', error);
    throw new Error('Échec de l\'export CSV des utilisateurs');
  }
}

export function downloadCsvBlob(blob: Blob, filename: string = 'users-export.csv'): void {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
} 