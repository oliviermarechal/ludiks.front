'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCallback, useMemo } from "react";
import { useStepUsers, StepUser } from "@/lib/hooks/use-step-users.hook";
import { useTranslations } from "next-intl";

function getInitials(name: string) {
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase();
}

function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    };

    return date.toLocaleDateString('fr-FR', options);
}

function formatDuration(date: Date): string {
    const now = new Date();
    const diff = Math.abs(now.getTime() - date.getTime());
    
    if (diff < 60000) {
        return "Now";
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
        return `${days}j`;
    } else if (hours > 0) {
        return `${hours}h`;
    } else {
        return `${minutes}m`;
    }
}

interface UserStepListContentProps {
    circuitId: string;
    stepId: string;
    currentPage: number;
    itemsPerPage: number;
    filters: Record<string, string>;
    onPageChange: (page: number) => void;
}

function UserList({ users }: { users: StepUser[] }) {
    const t = useTranslations('dashboard.circuits.steps');

    return (
        <Card className="border-secondary/20 bg-surface-2 backdrop-blur-sm divide-y divide-secondary/10">
            {users.map((user) => (
                <div key={user.id} className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 p-4">
                    <div className="flex items-center gap-4 min-w-0 w-full md:w-1/3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar || ''} />
                            <AvatarFallback className="bg-secondary/10 text-secondary">
                                {getInitials(user.fullName)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                                {user.fullName}
                            </p>
                            <p className="text-sm text-foreground/60 truncate">
                                {user.email}
                            </p>
                        </div>
                    </div>
                    {user.metadata && Object.keys(user.metadata).length > 0 && (
                        <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4 w-full md:w-1/3 bg-secondary/10 rounded-lg py-2 px-3">
                            {Object.entries(user.metadata).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-1">
                                    <span className="text-xs text-foreground/60">{key}:</span>
                                    <span className="text-xs font-semibold text-secondary">
                                        {typeof value === 'boolean' ? (value ? t('detail.user_list.boolean.true') : t('detail.user_list.boolean.false')) : value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex flex-col items-end w-full md:w-1/3">
                        <div>
                            <span className="text-xs text-foreground/60">{t('detail.user_list.registered_on')}</span>
                            <span className="text-sm font-semibold text-secondary ml-1">{formatDate(user.createdAt)}</span>
                        </div>
                        <div>
                            <span className="text-xs text-foreground/60">{t('detail.user_list.on_step_since')}</span>
                            <span className="text-sm font-semibold text-secondary ml-1">{formatDuration(user.startSince)}</span>
                        </div>
                        <div>
                            <span className="text-xs text-foreground/60">{t('detail.user_list.last_connection')}</span>
                            <span className="text-sm font-semibold text-secondary ml-1">{formatDate(user.lastLoginAt)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </Card>
    );
}

export function UserStepListContent({ 
    circuitId,
    stepId,
    currentPage,
    itemsPerPage,
    filters,
    onPageChange 
}: UserStepListContentProps) {
    const t = useTranslations('dashboard.circuits.steps');
    const offset = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage, itemsPerPage]);
    const { data: paginatedUsers, isLoading: isLoadingUsers } = useStepUsers(circuitId, stepId, itemsPerPage, offset, filters);

    const totalPages = useMemo(() => 
        paginatedUsers ? Math.ceil(paginatedUsers.total / itemsPerPage) : 0,
        [paginatedUsers, itemsPerPage]
    );

    const handlePrevPage = useCallback(() => {
        onPageChange(Math.max(1, currentPage - 1));
    }, [currentPage, onPageChange]);

    const handleNextPage = useCallback(() => {
        onPageChange(Math.min(totalPages, currentPage + 1));
    }, [currentPage, totalPages, onPageChange]);

    const paginationInfo = useMemo(() => (
        <p className="text-sm text-foreground/60">
            {t('detail.pagination.page_info', { 
                current: currentPage, 
                total: totalPages, 
                count: paginatedUsers?.total || 0 
            })}
        </p>
    ), [currentPage, totalPages, paginatedUsers?.total, t]);

    const userList = useMemo(() => {
        if (!paginatedUsers?.data) return null;
        return <UserList users={paginatedUsers.data} />;
    }, [paginatedUsers?.data]);

    if (isLoadingUsers) {
        return <div>{t('detail.loading')}</div>;
    }

    if (!paginatedUsers) {
        return null;
    }

    return (
        <>
            {userList}
            {/* Pagination */}
            <div className="flex justify-between items-center pt-4">
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
        </>
    );
} 