'use client';

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ProjectMetadata } from "@/lib/hooks/use-project-metadata.hook";
import { useTranslations } from "next-intl";

interface UserListHeaderProps {
    projectMetadatas?: ProjectMetadata[];
    filters: Record<string, string>;
    onFilterChange: (key: string, value: string) => void;
}

export function UserListHeader({ projectMetadatas, filters, onFilterChange }: UserListHeaderProps) {
    const t = useTranslations('dashboard.users');

    return (
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-foreground">
                {t('title')}
            </h2>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    {/* Streak Filter */}
                    <select
                        className="border border-secondary/20 rounded px-2 py-1 text-sm bg-background"
                        value={filters.streak || "all"}
                        onChange={e => onFilterChange('streak', e.target.value)}
                    >
                        <option value="all">{t('filters.all', { key: t('filters.streak') })}</option>
                        <option value="1-7">1-7 {t('streak.days')}</option>
                        <option value="8-30">8-30 {t('streak.days')}</option>
                        <option value="31+">31+ {t('streak.days')}</option>
                    </select>

                    {/* Metadata Filters */}
                    {projectMetadatas?.map((metadata) => (
                        <select
                            key={metadata.id}
                            className="border border-secondary/20 rounded px-2 py-1 text-sm bg-background"
                            value={filters[metadata.keyName] || "all"}
                            onChange={e => onFilterChange(metadata.keyName, e.target.value)}
                        >
                            <option value="all">{t('filters.all', { key: metadata.keyName })}</option>
                            {metadata.values && metadata.values.map((value) => (
                                <option key={value.id} value={value.value}>
                                    {value.value}
                                </option>
                            ))}
                        </select>
                    ))}
                </div>
                <Button variant="outline" className="border-secondary/20">
                    <Download className="h-4 w-4 mr-2" />
                    {t('export')}
                </Button>
            </div>
        </div>
    );
} 