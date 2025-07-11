'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Flame, Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { EndUser, useUsers } from "@/lib/hooks/use-users.hook";
import { useProjectStore } from "@/lib/stores/project-store";

function getInitials(name: string) {
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase();
}

function formatDuration(date: Date): string {
    const now = new Date();
    const diff = Math.abs(now.getTime() - date.getTime());
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
        return `${days}j`;
    } else if (hours > 0) {
        return `${hours}h`;
    } else {
        return "Maintenant";
    }
}

function ucFirst(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

interface UserListProps {
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    filters?: Record<string, unknown>;
}

function UserCard({ user }: { user: EndUser }) {
    const t = useTranslations('dashboard.users');
    const metadataEntries = Object.entries(user.metadata);
    const maxMeta = 2;
    const metaToShow = metadataEntries.slice(0, maxMeta);
    const metaRest = metadataEntries.slice(maxMeta);

    return (
        <Card className="border-secondary/20 bg-surface-2 backdrop-blur-sm">
            <div className="p-2.5 flex items-center gap-2.5 w-full">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                    <Avatar className="h-7 w-7">
                        <AvatarImage src={user.picture || ''} />
                        <AvatarFallback className="bg-secondary/10 text-secondary text-xs font-medium">
                            {getInitials(user.fullName)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">
                            {user.fullName}
                        </p>
                        <p className="text-xs text-foreground/50 truncate">
                            {user.email}
                        </p>
                    </div>
                </div>

                {/* Streaks compactes */}
                <div className="flex items-center gap-1.5 text-xs">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center gap-1 bg-orange-50 px-1.5 py-0.5 rounded-md cursor-help">
                                    <Flame className="h-3 w-3 text-orange-500" />
                                    <span className="font-medium text-orange-700">{user.currentStreak}</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-background border-primary/20 shadow-md">
                                <span className="text-xs text-foreground">{t('user_list.current_streak_tooltip')}</span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded-md cursor-help">
                                    <Trophy className="h-3 w-3 text-yellow-600" />
                                    <span className="font-medium text-yellow-700">{user.longestStreak}</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-background border-primary/20 shadow-md">
                                <span className="text-xs text-foreground">{t('user_list.longest_streak_tooltip')}</span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                {/* Badges de complétion des parcours - plus compacts */}
                <div className="flex items-center gap-1">
                    {user.circuitProgress.slice(0, 3).map((circuit) => (
                        <div
                            key={circuit.id}
                            className={cn(
                                "px-1.5 py-0.5 rounded-md flex items-center gap-1 text-xs font-medium border",
                                circuit.status === 'completed' && "bg-green-50 border-green-200 text-green-700",
                                circuit.status === 'in_progress' && "bg-blue-50 border-blue-200 text-blue-700",
                            )}
                        >
                            <span className="truncate max-w-[70px]">{circuit.circuitName}</span>
                            {circuit.status === 'completed' && <span className="text-green-600">✓</span>}
                            {circuit.status === 'in_progress' && <span className="text-blue-600">⏳</span>}
                        </div>
                    ))}
                    {user.circuitProgress.length > 3 && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="px-1.5 py-0.5 bg-secondary/30 rounded text-xs font-medium cursor-pointer">
                                        +{user.circuitProgress.length - 3}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-background border-primary/20 shadow-md">
                                    <div className="flex flex-col gap-1">
                                        {user.circuitProgress.slice(3).map((circuit) => (
                                            <div key={circuit.id} className="flex items-center gap-2">
                                                <span className="text-xs text-foreground font-medium">{circuit.circuitName}</span>
                                                {circuit.status === 'completed' && <span className="text-green-600">✓</span>}
                                                {circuit.status === 'in_progress' && <span className="text-blue-600">⏳</span>}
                                            </div>
                                        ))}
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>

                {/* Métadonnées compactes */}
                <div className="flex items-center gap-1">
                    {metaToShow.map(([key, value]) => (
                        <div
                            key={key}
                            className="px-1.5 py-0.5 bg-secondary/20 rounded text-xs text-foreground/70 font-medium"
                            title={`${ucFirst(key)}: ${typeof value === 'boolean' ? (value ? t('user_list.boolean.true') : t('user_list.boolean.false')) : ucFirst(String(value))}`}
                        >
                            {ucFirst(key)}: {typeof value === 'boolean' ? (value ? t('user_list.boolean.true') : t('user_list.boolean.false')) : ucFirst(String(value))}
                        </div>
                    ))}
                    {metaRest.length > 0 && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="px-1.5 py-0.5 bg-secondary/30 rounded text-xs font-medium cursor-pointer">
                                        +{metaRest.length}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-background border-primary/20 shadow-md">
                                    <div className="flex flex-col gap-1">
                                        {metaRest.map(([key, value]) => (
                                            <span key={key} className="text-xs text-foreground">
                                                {ucFirst(key)}: {typeof value === 'boolean' ? (value ? t('user_list.boolean.true') : t('user_list.boolean.false')) : ucFirst(String(value))}
                                            </span>
                                        ))}
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>

                {/* Last connect compact */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="text-xs text-foreground/50 font-medium min-w-[50px] text-right cursor-help">
                                {formatDuration(new Date(user.lastLoginAt))}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-background border-primary/20 shadow-md">
                            <span className="text-xs text-foreground">{t('user_list.last_connection_tooltip')}</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </Card>
    );
}

export function UserList({ 
    currentPage,
    itemsPerPage,
    onPageChange,
    filters = {}
}: UserListProps) {
    const t = useTranslations('dashboard.users');
    const { selectedProjectId } = useProjectStore()
    const { users, total, isLoading, error } = useUsers({ 
        projectId: selectedProjectId, 
        filters,
        limit: itemsPerPage, 
        offset: (currentPage - 1) * itemsPerPage 
    });

    const totalPages = Math.ceil(total || 0 / itemsPerPage);

    const handlePrevPage = useCallback(() => {
        onPageChange(Math.max(1, currentPage - 1));
    }, [currentPage, onPageChange]);

    const handleNextPage = useCallback(() => {
        onPageChange(Math.min(totalPages, currentPage + 1));
    }, [currentPage, totalPages, onPageChange]);

    const paginationInfo = useMemo(() => (
        <p className="text-sm text-foreground/60">
            {t('pagination.page_info', { 
                current: currentPage, 
                total: totalPages, 
                count: users?.length || 0 
            })}
        </p>
    ), [currentPage, totalPages, users?.length, t]);

    if (error) {
        return (
            <div className="flex items-center justify-center py-8">
                <p className="text-destructive text-sm">{t('user_list.error_loading')}</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="border border-secondary/20 bg-surface-2 backdrop-blur-sm rounded-lg p-2.5 animate-pulse">
                        <div className="flex items-center gap-2.5">
                            <div className="h-7 w-7 bg-secondary/20 rounded-full"></div>
                            <div className="flex-1">
                                <div className="h-4 bg-secondary/20 rounded mb-1"></div>
                                <div className="h-3 bg-secondary/20 rounded w-2/3"></div>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="h-5 w-12 bg-secondary/20 rounded"></div>
                                <div className="h-5 w-12 bg-secondary/20 rounded"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            <div className="space-y-4">
                {users?.length === 0 ? (
                    <div className="flex items-center justify-center py-8">
                        <p className="text-muted-foreground text-sm">{t('user_list.no_users_found')}</p>
                    </div>
                ) : (
                    users?.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))
                )}
            </div>
            
            {/* Pagination */}
            {users?.length > 0 && (
                <div className="flex justify-between items-center pt-6">
                    {paginationInfo}
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="border-secondary/20"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="border-secondary/20"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
} 