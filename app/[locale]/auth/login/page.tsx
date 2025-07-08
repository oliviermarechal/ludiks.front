'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import GoogleAuth from '@/components/auth/google-auth';
import { Link, useRouter } from '@/lib/navigation';
import { useAuth } from '@/lib/hooks/use-auth.hook';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { loginAsync, isLoginLoading } = useAuth({ redirectToLogin: false });
    const t = useTranslations('auth.login');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await loginAsync({ email, password });
            toast.success(t('success.login'));
            router.push('/dashboard');
        } catch (error) {
            console.error('Failed to login:', error);
            toast.error(t('errors.invalidCredentials'));
        }
    };

    const handleGoogleAuth = () => {
        router.push('/dashboard');
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

                <Card className="dark:bg-black/40 bg-white/80 backdrop-blur-sm border-primary/20 dark:border-primary/20 border shadow-lg">
                    <CardContent className="pt-6">
                        <form onSubmit={handleLogin} className="space-y-4">
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
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-foreground/90">{t('form.password')}</Label>
                                    <Button variant="link" className="px-0 font-normal text-xs text-primary hover:text-primary/90" asChild>
                                        <Link href="/auth/forgot-password">
                                            {t('form.forgotPassword')}
                                        </Link>
                                    </Button>
                                </div>
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
                                disabled={isLoginLoading}
                            >
                                {isLoginLoading ? t('actions.loginLoading') : t('actions.login')}
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
                            <GoogleAuth onSuccess={handleGoogleAuth}/>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 pt-4">
                        <Separator className="border-primary/20"/>
                        <div className="text-center text-sm text-muted-foreground">
                            <span>{t('actions.registerQuestion')}</span>
                            <Button variant="link" className="px-1 font-normal text-primary hover:text-primary/90" asChild>
                                <Link href="/auth/registration">
                                    {t('actions.registerAction')}
                                </Link>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}