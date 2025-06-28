'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Building2, UserCheck } from 'lucide-react';
import GoogleAuth from '@/components/auth/google-auth';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/use-auth.hook';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import api from '@/lib/api';

export default function RegistrationPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inviteId, setInviteId] = useState<string | null>(null);
    const [inviteData, setInviteData] = useState<{id: string, role: string, organization: {name: string}} | null>(null);
    const [isLoadingInvite, setIsLoadingInvite] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { registrationAsync, isRegistrationLoading } = useAuth({ redirectToLogin: false });
    const t = useTranslations('auth.registration');

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            setInviteId(token);
            setIsLoadingInvite(true);
            api.get(`/api/accounts/invite/${token}`).then((res) => {
                setInviteData(res.data);
                setEmail(res.data.toEmail);
            }).catch((error) => {
                console.error('Failed to load invitation:', error);
                toast.error('Invalid or expired invitation link');
            }).finally(() => {
                setIsLoadingInvite(false);
            });
        }
    }, [searchParams]);

    const handleRegistration = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const registrationData: { email: string; password: string; inviteId?: string } = {
                email,
                password
            };

            if (inviteId && inviteId.trim()) {
                registrationData.inviteId = inviteId;
            }

            await registrationAsync(registrationData);
            toast.success(t('success.registration'));
            if (inviteId) {
                router.push('/dashboard');
            } else {
                router.push('/onboarding');
            }
        } catch (error) {
            console.error('Failed to registration:', error);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(t('errors.general'));
            }
        }
    };

    const handleGoogleAuth = () => {
        router.push('/onboarding');
    }

    return (
        <div className="container relative flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary via-secondary to-primary bg-clip-text text-transparent tracking-tight">
                        Ludiks
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        {t('title')}
                    </p>
                </div>

                {/* Invitation Card */}
                {inviteData && (
                    <Card className="dark:bg-black/40 bg-white/80 backdrop-blur-sm border-primary/20 dark:border-primary/20 border shadow-lg">
                        <CardContent className="pt-6">
                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center mx-auto">
                                    <UserCheck className="h-6 w-6 text-primary" />
                                </div>
                                
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-foreground">{t('invitation.title')}</h3>
                                    <p className="text-sm text-muted-foreground">{t('invitation.description')}</p>
                                </div>
                                
                                <div className="space-y-3 pt-2">
                                    <div className="flex items-center justify-center gap-2 text-sm">
                                        <Building2 className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium text-foreground">
                                            {inviteData.organization.name}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-center gap-2">
                                        <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
                                            {inviteData.role}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Loading state for invitation */}
                {isLoadingInvite && (
                    <Card className="dark:bg-black/40 bg-white/80 backdrop-blur-sm border-primary/20 dark:border-primary/20 border shadow-lg">
                        <CardContent className="pt-6">
                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center mx-auto">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                                </div>
                                
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-foreground">{t('invitation.loading.title')}</h3>
                                    <p className="text-sm text-muted-foreground">{t('invitation.loading.description')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card className="dark:bg-black/40 bg-white/80 backdrop-blur-sm border-primary/20 dark:border-primary/20 border shadow-lg">
                    <CardContent className="pt-6">
                        <form onSubmit={handleRegistration} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-foreground/90">{t('form.email')}</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="dark:bg-black/50 bg-white border-primary/20 focus:border-primary/40 text-foreground"
                                    placeholder={t('form.placeholders.email')}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-foreground/90">{t('form.password')}</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="dark:bg-black/50 bg-white border-primary/20 focus:border-primary/40 text-foreground"
                                    placeholder={t('form.placeholders.password')}
                                />
                            </div>
                            <Button 
                                type="submit" 
                                className="w-full bg-secondary text-black hover:bg-secondary/90" 
                                disabled={isRegistrationLoading || isLoadingInvite}
                            >
                                {isRegistrationLoading ? t('actions.registerLoading') : t('actions.register')}
                            </Button>
                        </form>

                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full border-primary/20"/>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="dark:bg-black bg-white px-2 text-muted-foreground">
                                    {t('social.continueWith')}
                                </span>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <GoogleAuth onSuccess={handleGoogleAuth} inviteId={inviteId || undefined} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 pt-4">
                        <Separator className="border-primary/20"/>
                        <div className="text-center text-sm text-muted-foreground">
                            <span>{t('actions.loginQuestion')} </span>
                            <Button variant="link" className="px-1 font-normal text-primary hover:text-primary/90" asChild>
                                <Link href="/auth/login">
                                    {t('actions.loginAction')}
                                </Link>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}