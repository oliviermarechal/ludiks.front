'use client';

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Download, CreditCard, Calendar, Star, Zap, Crown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function BillingPage() {
    const t = useTranslations('dashboard.organizations.billing');
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    
    const plans = [
        {
            id: 'free',
            name: t('plans.free.name'),
            price: billingCycle === 'monthly' ? t('plans.free.price') : t('plans.free.yearlyPrice'),
            period: billingCycle === 'monthly' ? t('plans.free.period') : t('plans.free.yearlyPeriod'),
            features: t.raw('plans.free.features'),
            description: t('plans.free.description'),
            icon: Star,
            popular: false,
            current: false
        },
        {
            id: 'pro',
            name: t('plans.pro.name'),
            price: billingCycle === 'monthly' ? t('plans.pro.price') : t('plans.pro.yearlyPrice'),
            period: billingCycle === 'monthly' ? t('plans.pro.period') : t('plans.pro.yearlyPeriod'),
            features: t.raw('plans.pro.features'),
            description: t('plans.pro.description'),
            icon: Zap,
            popular: true,
            current: true
        },
        {
            id: 'scale',
            name: t('plans.scale.name'),
            price: billingCycle === 'monthly' ? t('plans.scale.price') : t('plans.scale.yearlyPrice'),
            period: billingCycle === 'monthly' ? t('plans.scale.period') : t('plans.scale.yearlyPeriod'),
            features: t.raw('plans.scale.features'),
            description: t('plans.scale.description'),
            icon: Crown,
            popular: false,
            current: false
        }
    ];

    const invoices = [
        { id: 'inv_1', date: '2024-01-01', amount: '$49.00', status: 'paid' },
        { id: 'inv_2', date: '2023-12-01', amount: '$49.00', status: 'paid' },
        { id: 'inv_3', date: '2023-11-01', amount: '$49.00', status: 'paid' },
    ];

    return (
        <div className="container mx-auto py-12">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-foreground">{t('title')}</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('description')}</p>
                </div>

                {/* Billing Cycle Toggle */}
                <div className="flex justify-center">
                    <div className="bg-muted rounded-lg p-1 flex items-center gap-1">
                        <Button
                            variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setBillingCycle('monthly')}
                            className="rounded-md"
                        >
                            {t('monthly')}
                        </Button>
                        <Button
                            variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setBillingCycle('yearly')}
                            className="rounded-md"
                        >
                            {t('yearly')}
                        </Button>
                    </div>
                </div>

                {billingCycle === 'yearly' && (
                    <div className="text-center">
                        <Badge variant="secondary" className="text-sm">
                            {t('saveWithYearly')}
                        </Badge>
                    </div>
                )}

                {/* Pricing Plans */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => {
                        const IconComponent = plan.icon;
                        return (
                            <Card 
                                key={plan.id} 
                                className={cn(
                                    "relative flex flex-col transition-all duration-200 hover:shadow-lg",
                                    plan.popular && "border-primary shadow-lg scale-105",
                                    plan.current && "border-secondary"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <Badge className="bg-primary text-primary-foreground">
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}
                                
                                <CardHeader className="text-center pb-6">
                                    <div className="flex justify-center mb-4">
                                        <div className={cn(
                                            "p-3 rounded-full",
                                            plan.id === 'free' && "bg-muted",
                                            plan.id === 'pro' && "bg-primary/10",
                                            plan.id === 'scale' && "bg-secondary/10"
                                        )}>
                                            <IconComponent className={cn(
                                                "h-6 w-6",
                                                plan.id === 'free' && "text-muted-foreground",
                                                plan.id === 'pro' && "text-primary",
                                                plan.id === 'scale' && "text-secondary"
                                            )} />
                                        </div>
                                    </div>
                                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className="text-4xl font-extrabold">{plan.price}</span>
                                        <span className="text-muted-foreground">{plan.period}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                                </CardHeader>
                                
                                <CardContent className="flex-1 flex flex-col justify-between space-y-6">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature: string, index: number) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    
                                    <Button 
                                        className={cn(
                                            "w-full",
                                            plan.current && "bg-secondary hover:bg-secondary/90",
                                            plan.id === 'free' && "bg-muted text-muted-foreground hover:bg-muted"
                                        )}
                                        disabled={plan.current}
                                    >
                                        {plan.current ? t('plans.pro.current') : plan.id === 'free' ? 'Current Plan' : t('upgrade')}
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Billing Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Payment Method */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                <CardTitle>{t('paymentMethod')}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">VS</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Visa ending in 4242</p>
                                        <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">{t('manage')}</Button>
                            </div>
                            <Button variant="link" className="p-0 h-auto">
                                {t('addPaymentMethod')}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Billing History */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                <CardTitle>{t('billingHistory')}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('date')}</TableHead>
                                        <TableHead>{t('amount')}</TableHead>
                                        <TableHead className="text-right">{t('invoice')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {invoices.map(invoice => (
                                        <TableRow key={invoice.id}>
                                            <TableCell className="font-medium">
                                                {new Date(invoice.date).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                    {invoice.amount}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* FAQ Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">{t('faq.title')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold mb-2">{t('faq.changePlans.question')}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {t('faq.changePlans.answer')}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">{t('faq.eventLimit.question')}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {t('faq.eventLimit.answer')}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">{t('faq.freeTrial.question')}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {t('faq.freeTrial.answer')}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">{t('faq.cancelAnytime.question')}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {t('faq.cancelAnytime.answer')}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
