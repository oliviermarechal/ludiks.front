'use client';

import { useTranslations } from "next-intl";
import { useProjectStore } from "@/lib/stores/project-store";
import { useProjectMetadatas } from "@/lib/hooks/use-project-metadata.hook";
import { useState, useCallback } from "react";
import { UserList } from "./user-list";
import { AdvancedUserFilters } from "./user-filters";
import { useCircuits } from "@/lib/hooks/use-circuits.hook";

export default function UsersPage() {
    const t = useTranslations('dashboard.users');
    const { selectedProject } = useProjectStore();
    const { data: projectMetadatas } = useProjectMetadatas(selectedProject?.id || '');
    
    const [filters, setFilters] = useState<Record<string, unknown>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleFilterChange = useCallback((newFilters: Record<string, unknown>) => {
        setFilters(newFilters);
        setCurrentPage(1);
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const handleExportCsv = useCallback(() => {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== '') {
                queryParams.append(key, String(value));
            }
        });
        
        const queryString = queryParams.toString();
        const exportUrl = `/api/projects/${selectedProject?.id}/end-users/export${queryString ? `?${queryString}` : ''}`;
        
        // Créer un lien temporaire pour le téléchargement
        const link = document.createElement('a');
        link.href = exportUrl;
        link.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [filters, selectedProject?.id]);

    const {circuits} = useCircuits(selectedProject?.id || '');

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Titre de la page */}
                <div className="mb-2">
                    <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
                    <p className="text-lg text-muted-foreground">{t('description')}</p>
                </div>
                {/* Bloc Filtres avancés sticky */}
                <div className="sticky top-4 z-10 border border-primary/10 bg-background shadow-sm rounded-xl mb-4">
                    <AdvancedUserFilters
                        circuits={circuits}
                        metadatas={projectMetadatas}
                        filters={filters}
                        onChange={handleFilterChange}
                        onExportCsv={handleExportCsv}
                    />
                </div>
                {/* Liste utilisateurs compacte */}
                <UserList
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    filters={filters}
                />
            </div>
        </div>
    );
}
