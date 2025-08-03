'use client';

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ProjectMetadata, MetadataValue } from "@/lib/hooks/use-project-metadata.hook";
import { useTranslations } from "next-intl";

interface UserStepListHeaderProps {
    projectMetadatas?: ProjectMetadata[];
    filters: Record<string, string>;
    onFilterChange: (key: string, value: string) => void;
    onExportCsv: () => void;
}

export function UserStepListHeader({ projectMetadatas, filters, onFilterChange, onExportCsv }: UserStepListHeaderProps) {
    const t = useTranslations('dashboard.circuits.steps');

    return (
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-foreground">
                {t('detail.header.title')}
            </h2>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    {projectMetadatas?.map((metadata: ProjectMetadata) => (
                        <select
                            key={metadata.id}
                            className="border border-secondary/20 rounded px-2 py-1 text-sm bg-background"
                            value={filters[metadata.keyName] || "all"}
                            onChange={e => onFilterChange(metadata.keyName, e.target.value)}
                        >
                            <option value="all">{t('detail.filters.all', { key: metadata.keyName })}</option>
                            {metadata.values && metadata.values.map((value: MetadataValue) => (
                                <option key={value.id} value={value.value}>
                                    {value.value}
                                </option>
                            ))}
                        </select>
                    ))}
                </div>
                <Button variant="outline" className="border-secondary/20" onClick={onExportCsv}>
                    <Download className="h-4 w-4 mr-2" />
                    {t('detail.export')}
                </Button>
            </div>
        </div>
    );
} 