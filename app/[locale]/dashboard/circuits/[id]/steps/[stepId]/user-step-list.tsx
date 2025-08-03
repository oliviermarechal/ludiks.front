'use client';

import { useState, useCallback, useMemo } from "react";
import { ProjectMetadata } from "@/lib/hooks/use-project-metadata.hook";
import { UserStepListHeader } from "./user-step-list-header";
import { UserStepListContent } from "./user-step-list-content";
import { useProjectStore } from "@/lib/stores/project-store";
import { useExportUsers } from "@/lib/hooks/use-export-users.hook";

interface UserStepListProps {
    circuitId: string;
    stepId: string;
    projectMetadatas?: ProjectMetadata[];
}

export function UserStepList({ circuitId, stepId, projectMetadatas }: UserStepListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [filters, setFilters] = useState<Record<string, string>>({});
    const { selectedProject } = useProjectStore();
    const { exportCsv } = useExportUsers();

    const handleFilterChange = useCallback((key: string, value: string) => {
        setFilters(prev => {
            if (value === "all") {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { [key]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [key]: value };
        });
        setCurrentPage(1);
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const handleExportCsv = useCallback(async () => {
        const exportFilters: Record<string, string> = {};
        Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== '') {
                exportFilters[key] = String(value);
            }
        });
        exportFilters.circuitId = circuitId;
        exportFilters.circuitStep = stepId;

        await exportCsv(selectedProject?.id || '', exportFilters);
    }, [filters, selectedProject?.id, exportCsv, circuitId, stepId]);

    const header = useMemo(() => (
        <UserStepListHeader 
            projectMetadatas={projectMetadatas}
            filters={filters}
            onFilterChange={handleFilterChange}
            onExportCsv={handleExportCsv}
        />
    ), [projectMetadatas, filters, handleFilterChange, handleExportCsv]);

    return (
        <div className="space-y-4">
            {header}
            <UserStepListContent
                circuitId={circuitId}
                stepId={stepId}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                filters={filters}
                onPageChange={handlePageChange}
            />
        </div>
    );
} 