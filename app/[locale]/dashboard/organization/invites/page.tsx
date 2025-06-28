'use client';

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, Building2, User } from "lucide-react";
import { useTeam } from "@/lib/hooks/use-team.hook";
import { Skeleton } from "@/components/ui/skeleton";

export default function InvitesPage() {
    const t = useTranslations('dashboard.common.invites');
    const { userInvites, isLoadingUserInvites, acceptInvitation, isAcceptingInvitation, rejectInvitation, isRejectingInvitation } = useTeam();

    const handleAcceptInvite = async (inviteId: string) => {
        await acceptInvitation(inviteId);
    };

    const handleRejectInvite = async (inviteId: string) => {
        await rejectInvitation(inviteId);
    };

    if (isLoadingUserInvites) {
        return (
            <div className="container mx-auto py-12">
                <div className="max-w-6xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-6 w-72" />
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-56" />
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b-primary/10">
                                        <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                                        <TableHead><Skeleton className="h-5 w-16" /></TableHead>
                                        <TableHead><Skeleton className="h-5 w-20" /></TableHead>
                                        <TableHead><Skeleton className="h-5 w-16" /></TableHead>
                                        <TableHead className="text-right"><Skeleton className="h-5 w-24 ml-auto" /></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[...Array(3)].map((_, i) => (
                                        <TableRow key={i} className="border-b-primary/10 last:border-b-0">
                                            <TableCell>
                                                <div className="flex items-center gap-4">
                                                    <Skeleton className="h-10 w-10 rounded-full" />
                                                    <div className="space-y-2">
                                                        <Skeleton className="h-4 w-32" />
                                                        <Skeleton className="h-3 w-40" />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-6 w-16" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-4 w-24" />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton className="h-4 w-20" />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex gap-2 justify-end">
                                                    <Skeleton className="h-8 w-20" />
                                                    <Skeleton className="h-8 w-20" />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
                        <p className="text-lg text-muted-foreground">
                            {t('description')}
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('pendingInvitations')}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {userInvites.length === 0 ? (
                            <div className="p-8 text-center">
                                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">{t('noInvitations')}</h3>
                                <p className="text-muted-foreground">
                                    {t('noInvitationsDescription')}
                                </p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b-primary/10">
                                        <TableHead>{t('table.organization')}</TableHead>
                                        <TableHead>{t('table.role')}</TableHead>
                                        <TableHead>{t('table.invitedBy')}</TableHead>
                                        <TableHead>{t('table.date')}</TableHead>
                                        <TableHead className="text-right">{t('table.actions')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {userInvites.map(invite => (
                                        <TableRow key={invite.id} className="border-b-primary/10 last:border-b-0">
                                            <TableCell>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                                        <Building2 className="h-5 w-5 text-muted-foreground" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">{invite.organization.name}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={invite.role === 'Admin' ? "default" : "outline"}>
                                                    {invite.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm">{invite.fromUser.email}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {new Date(invite.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex gap-2 justify-end">
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => handleAcceptInvite(invite.id)}
                                                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                                        disabled={isAcceptingInvitation || isRejectingInvitation}
                                                    >
                                                        <Check className="h-4 w-4 mr-1" />
                                                        {t('actions.accept')}
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => handleRejectInvite(invite.id)}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        disabled={isRejectingInvitation || isAcceptingInvitation}
                                                    >
                                                        <X className="h-4 w-4 mr-1" />
                                                        {t('actions.reject')}
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}