import { useState, useEffect } from 'react';
import { useCircuitStore } from '@/lib/stores/circuit-store';
import { Circuit } from '@/lib/types/circuit';
interface UseCircuitReturn {
    circuit: Circuit | null;
    isLoading: boolean;
    error: Error | null;
}

export function useCircuit(circuitId: string): UseCircuitReturn {
    const [circuit, setCircuit] = useState<Circuit | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { circuits } = useCircuitStore();

    useEffect(() => {
        const fetchCircuit = async () => {
            try {
                setIsLoading(true);
                // Pour l'instant, on récupère le circuit depuis le store
                const foundCircuit = circuits.find(c => c.id === circuitId);
                
                if (!foundCircuit) {
                    throw new Error('Circuit non trouvé');
                }

                setCircuit(foundCircuit as Circuit);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
                setCircuit(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCircuit();
    }, [circuitId, circuits]);

    return { circuit, isLoading, error };
} 