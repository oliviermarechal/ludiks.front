'use client';

import { useState, useCallback, useMemo } from "react";
import { ProjectMetadata } from "@/lib/hooks/use-project-metadata.hook";
import { UserStepListHeader } from "./user-step-list-header";
import { UserStepListContent } from "./user-step-list-content";

interface UserStepListProps {
    circuitId: string;
    stepId: string;
    projectMetadatas?: ProjectMetadata[];
}

export function UserStepList({ circuitId, stepId, projectMetadatas }: UserStepListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [filters, setFilters] = useState<Record<string, string>>({});

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

    const header = useMemo(() => (
        <UserStepListHeader 
            projectMetadatas={projectMetadatas}
            filters={filters}
            onFilterChange={handleFilterChange}
        />
    ), [projectMetadatas, filters, handleFilterChange]);

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