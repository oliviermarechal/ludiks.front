'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Flame, Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface UserMetadata {
    [key: string]: string | boolean | number;
}

interface CircuitProgress {
    id: string;
    name: string;
    status: 'completed' | 'in_progress' | 'not_started';
    points: number;
    completedAt?: Date;
}

interface User {
    id: string;
    externalId: string;
    fullName: string;
    email: string;
    picture?: string;
    createdAt: Date;
    lastLoginAt: Date;
    currentStreak: number;
    longestStreak: number;
    metadata: UserMetadata;
    circuitProgress: CircuitProgress[];
}

// Mock data generator
function generateMockUsers(count: number): User[] {
    const firstNames = ['John', 'Jane', 'Alex', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'James', 'Maria', 'Robert', 'Anna', 'William', 'Sophie', 'Thomas', 'Claire', 'Daniel', 'Julie', 'Christopher', 'Marie'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
    const circuitNames = ['Onboarding', 'Advanced Features', 'Expert Level', 'Master Class', 'Pro Certification', 'Specialist Track', 'Leadership Path', 'Innovation Lab', 'Strategy Workshop', 'Performance Boost'];
    const metadataKeys = ['age', 'isActive', 'subscriptionType', 'lastPurchase', 'referralSource', 'deviceType', 'timezone', 'language', 'department', 'role', 'experience', 'preferences', 'notifications', 'theme', 'accessibility'];
    const metadataValues = {
        age: [22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50, 52, 55, 58],
        isActive: [true, false],
        subscriptionType: ['monthly', 'annual', 'lifetime'],
        lastPurchase: ['2024-01-15', '2024-01-10', '2024-01-05', '2023-12-20', '2023-12-15', '2023-12-10'],
        referralSource: ['google', 'facebook', 'twitter', 'linkedin', 'email', 'direct', 'partner'],
        deviceType: ['desktop', 'mobile', 'tablet'],
        timezone: ['Europe/Paris', 'America/New_York', 'America/Toronto', 'Europe/London', 'Europe/Berlin'],
        language: ['fr', 'en', 'es', 'de', 'it'],
        department: ['sales', 'marketing', 'engineering', 'design', 'product', 'support'],
        role: ['manager', 'developer', 'designer', 'analyst', 'consultant', 'specialist'],
        experience: ['beginner', 'intermediate', 'advanced', 'expert'],
        preferences: ['dark', 'light', 'auto'],
        notifications: [true, false],
        theme: ['default', 'minimal', 'professional'],
        accessibility: [true, false]
    };

    return Array.from({ length: count }, (_, index) => {
        const firstName = firstNames[index % firstNames.length];
        const lastName = lastNames[index % lastNames.length];
        const fullName = `${firstName} ${lastName}`;
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
        
        // Generate random metadata (2-8 keys)
        const metadataCount = Math.floor(Math.random() * 7) + 2;
        const selectedKeys = metadataKeys.sort(() => 0.5 - Math.random()).slice(0, metadataCount);
        const metadata: UserMetadata = {};
        
        selectedKeys.forEach(key => {
            const values = metadataValues[key as keyof typeof metadataValues];
            if (Array.isArray(values)) {
                metadata[key] = values[Math.floor(Math.random() * values.length)];
            }
        });

        // Generate random circuit progress (3-8 circuits)
        const circuitCount = Math.floor(Math.random() * 6) + 3;
        const selectedCircuits = circuitNames.sort(() => 0.5 - Math.random()).slice(0, circuitCount);
        const circuitProgress: CircuitProgress[] = selectedCircuits.map((name, i) => {
            const statuses: ('completed' | 'in_progress' | 'not_started')[] = ['completed', 'in_progress', 'not_started'];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const points = status === 'completed' ? 100 : Math.floor(Math.random() * 80) + 20;
            
            return {
                id: (i + 1).toString(),
                name,
                status,
                points,
                completedAt: status === 'completed' ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) : undefined
            };
        });

        // Generate random dates
        const createdAt = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
        const lastLoginAt = new Date(createdAt.getTime() + Math.random() * (Date.now() - createdAt.getTime()));

        // Generate random streaks
        const currentStreak = Math.floor(Math.random() * 15) + 1;
        const longestStreak = Math.max(currentStreak, Math.floor(Math.random() * 30) + 1);

        return {
            id: (index + 1).toString(),
            externalId: `user_${1000 + index}`,
            fullName,
            email,
            createdAt,
            lastLoginAt,
            currentStreak,
            longestStreak,
            metadata,
            circuitProgress
        };
    });
}

// Mock data - replace with real API call
const mockUsers: User[] = generateMockUsers(20);

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
}

function UserCard({ user }: { user: User }) {
    const t = useTranslations('dashboard.users');
    const metadataEntries = Object.entries(user.metadata);
    const maxMeta = 2;
    const metaToShow = metadataEntries.slice(0, maxMeta);
    const metaRest = metadataEntries.slice(maxMeta);

    return (
        <Card className="border-secondary/20 bg-surface-2 backdrop-blur-sm">
            <div className="p-2.5 flex items-center gap-2.5 w-full">
                {/* Photo/Initiales + Infos */}
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
                                circuit.status === 'not_started' && "bg-gray-50 border-gray-200 text-gray-600"
                            )}
                        >
                            <span className="truncate max-w-[70px]">{circuit.name}</span>
                            {circuit.status === 'completed' && <span className="text-green-600">✓</span>}
                            {circuit.status === 'in_progress' && <span className="text-blue-600">⏳</span>}
                            {circuit.status === 'not_started' && <span className="text-gray-500">○</span>}
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
                                                <span className="text-xs text-foreground font-medium">{circuit.name}</span>
                                                {circuit.status === 'completed' && <span className="text-green-600">✓</span>}
                                                {circuit.status === 'in_progress' && <span className="text-blue-600">⏳</span>}
                                                {circuit.status === 'not_started' && <span className="text-gray-500">○</span>}
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
                                {formatDuration(user.lastLoginAt)}
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
    onPageChange 
}: UserListProps) {
    const t = useTranslations('dashboard.users');
    
    // Mock pagination - replace with real API call
    const filteredUsers = mockUsers

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

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
                count: filteredUsers.length 
            })}
        </p>
    ), [currentPage, totalPages, filteredUsers.length, t]);

    return (
        <>
            <div className="space-y-4">
                {currentUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
            
            {/* Pagination */}
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
        </>
    );
} 