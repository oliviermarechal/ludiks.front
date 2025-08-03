'use client';

import { useTranslations } from "next-intl";
import { useProjectStore } from "@/lib/stores/project-store";
import { useProjectMetadatas } from "@/lib/hooks/use-project-metadata.hook";
import { useState, useCallback } from "react";
import { UserList } from "./user-list";
import { AdvancedUserFilters } from "./user-filters";
import { useCircuits } from "@/lib/hooks/use-circuits.hook";
import { useExportUsers } from "@/lib/hooks/use-export-users.hook";

export default function UsersPage() {
    const t = useTranslations('dashboard.users');
    const { selectedProject } = useProjectStore();
    const { data: projectMetadatas } = useProjectMetadatas(selectedProject?.id || '');
    const { exportCsv, isExporting, error, clearError } = useExportUsers();
    
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

    const handleExportCsv = useCallback(async () => {
        if (!selectedProject?.id) {
            console.error('Aucun projet sélectionné');
            return;
        }

        const exportFilters: Record<string, string> = {};
        Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== '') {
                exportFilters[key] = String(value);
            }
        });

        await exportCsv(selectedProject.id, exportFilters);
    }, [filters, selectedProject?.id, exportCsv]);

    const {circuits} = useCircuits(selectedProject?.id || '');

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="mb-2">
                    <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
                    <p className="text-lg text-muted-foreground">{t('description')}</p>
                </div>
                <div className="sticky top-4 z-10 border border-primary/10 bg-background shadow-sm rounded-xl mb-4">
                    <AdvancedUserFilters
                        circuits={circuits}
                        metadatas={projectMetadatas}
                        filters={filters}
                        onChange={handleFilterChange}
                        onExportCsv={handleExportCsv}
                        isExporting={isExporting}
                    />
                </div>
                
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                        <span className="block sm:inline">{error}</span>
                        <button
                            onClick={clearError}
                            className="absolute top-0 bottom-0 right-0 px-4 py-3"
                        >
                            <span className="sr-only">Fermer</span>
                            <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <title>Fermer</title>
                                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                            </svg>
                        </button>
                    </div>
                )}
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
