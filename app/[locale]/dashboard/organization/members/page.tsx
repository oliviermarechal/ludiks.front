'use client';

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Mail, UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTeam } from "@/lib/hooks/use-team.hook";
import { useProjectStore } from "@/lib/stores/project-store";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/hooks/use-auth.hook";
import { useState } from "react";
import { toast } from "sonner";

export default function MembersPage() {
    const t = useTranslations('dashboard.organizations.team');
    const { selectedOrganization } = useProjectStore();
    const { user } = useAuth();
    const { 
        members, 
        isLoadingMembers, 
        pendingInvites, 
        isLoadingInvites, 
        inviteMember, 
        isInvitingMember ,
        revokeInvite,
        isRevokingInvite,
    } = useTeam(selectedOrganization?.id);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<'Admin' | 'Member'>('Member');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInviteSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email.trim() || !selectedOrganization?.id) return;

        setIsSubmitting(true);
        try {
            await inviteMember({ email: email.trim(), role });
            
            setEmail('');
            setRole('Member');
            setIsDialogOpen(false);
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error) {
                const apiError = error as { response?: { data?: { error?: string } } };
                if (apiError.response?.data?.error) {
                    toast.error(apiError.response.data.error);
                } else {
                    toast.error('Failed to invite member. Please try again.');
                }
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Failed to invite member. Please try again.');
            }
            console.error('Failed to invite member:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRevokeInvite = async (inviteId: string) => {
        try {
            await revokeInvite(inviteId);
        } catch (error) {
            console.error('Failed to revoke invite:', error);
        }
    };

    const handleCancel = () => {
        setEmail('');
        setRole('Member');
        setIsDialogOpen(false);
    };

    if (isLoadingMembers || isLoadingInvites) {
        return (
            <div className="container mx-auto py-12">
                <div className="max-w-6xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-6 w-72" />
                        </div>
                        <Skeleton className="h-10 w-28" />
                    </div>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-6 w-56" />
                                <Skeleton className="h-10 w-48" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b-primary/10">
                                        <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                                        <TableHead><Skeleton className="h-5 w-16" /></TableHead>
                                        <TableHead><Skeleton className="h-5 w-20" /></TableHead>
                                        <TableHead className="text-right"><Skeleton className="h-5 w-16 ml-auto" /></TableHead>
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
                                            <TableCell className="text-right">
                                                <Skeleton className="h-8 w-8 ml-auto" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <div>
                        <Skeleton className="h-6 w-48 mb-4" />
                        <Card>
                            <CardContent className="p-0">
                                <Table>
                                    <TableBody>
                                        {[...Array(1)].map((_, i) => (
                                            <TableRow key={i} className="border-b-primary/10 last:border-b-0">
                                                <TableCell>
                                                    <div className="flex items-center gap-4">
                                                        <Skeleton className="h-10 w-10 rounded-full" />
                                                        <div className="space-y-2">
                                                            <Skeleton className="h-4 w-40" />
                                                            <Skeleton className="h-3 w-28" />
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton className="h-6 w-16" />
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex gap-2 justify-end">
                                                        <Skeleton className="h-8 w-32" />
                                                        <Skeleton className="h-8 w-8" />
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
            </div>
        );
    }
    
    return (
        <div className="container mx-auto py-12">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
                        <p className="text-lg text-muted-foreground">{t('description')}</p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button><UserPlus className="mr-2 h-4 w-4" />{t('invite')}</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{t('dialog.title')}</DialogTitle>
                                <DialogDescription>{t('dialog.description')}</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleInviteSubmit} className="space-y-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">{t('dialog.email')}</Label>
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        placeholder={t('dialog.emailPlaceholder')} 
                                        className="col-span-3"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isSubmitting || isInvitingMember}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">{t('dialog.role')}</Label>
                                    <div className="col-span-3 flex gap-2">
                                        <Button 
                                            type="button"
                                            variant={role === 'Member' ? "default" : "outline"}
                                            onClick={() => setRole('Member')}
                                            disabled={isSubmitting || isInvitingMember}
                                            className="flex-1"
                                        >
                                            {t('dialog.member')}
                                        </Button>
                                        <Button 
                                            type="button"
                                            variant={role === 'Admin' ? "default" : "outline"}
                                            onClick={() => setRole('Admin')}
                                            disabled={isSubmitting || isInvitingMember}
                                            className="flex-1"
                                        >
                                            {t('dialog.admin')}
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-4">
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={handleCancel}
                                        disabled={isSubmitting || isInvitingMember}
                                        className="flex-1"
                                    >
                                        {t('dialog.cancel')}
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        className="flex-1"
                                        disabled={isSubmitting || isInvitingMember || !email.trim()}
                                    >
                                        {isSubmitting || isInvitingMember ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                                {t('dialog.sending')}
                                            </>
                                        ) : (
                                            t('dialog.sendInvitation')
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>{t('cardTitle')}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b-primary/10">
                                    <TableHead>{t('table.member')}</TableHead>
                                    <TableHead>{t('table.role')}</TableHead>
                                    <TableHead>{t('table.joined')}</TableHead>
                                    <TableHead className="text-right">{t('table.actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {members.map(member => (
                                    <TableRow key={member.id} className="border-b-primary/10 last:border-b-0">
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                                    <span className="text-sm font-medium text-muted-foreground">
                                                        {member.email.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{member.email} {member.userId === user?.id && <Badge variant="secondary" className="ml-1">{t('you')}</Badge>}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={member.role === 'Admin' ? "default" : "outline"}>
                                                {member.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{new Date(member.joinedAt).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant="secondary" className="text-xs">
                                                {t('comingSoon')}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Pending Invitations */}
                {pendingInvites.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">{t('pendingInvitations.title')}</h2>
                        <Card>
                            <CardContent className="p-0">
                                <Table>
                                    <TableBody>
                                        {pendingInvites.map(invite => (
                                            <TableRow key={invite.id} className="border-b-primary/10 last:border-b-0">
                                                <TableCell>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                                            <Mail className="h-5 w-5 text-muted-foreground" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{invite.toEmail}</p>
                                                            <p className="text-sm text-muted-foreground">{t('pendingInvitations.invited')} {new Date(invite.createdAt).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{invite.role}</Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button 
                                                        variant="ghost" 
                                                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" 
                                                        onClick={() => handleRevokeInvite(invite.id)}
                                                        disabled={isRevokingInvite}
                                                    >
                                                        {t('pendingInvitations.cancel')}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
