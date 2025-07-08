'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useProjectStore } from '@/lib/stores/project-store';
import { PricingTiers } from '@/components/pricing/pricing-tiers';
import { UsageSummaryPage } from '@/components/dashboard/usage-summary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, CreditCard, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SubscriptionModal from '@/components/subscription/subscription-modal';
import { BILLING_CONFIG } from '@/lib/config';
import { useSubscription } from '@/lib/hooks/use-subscription.hook';


export default function BillingPage() {
  const t = useTranslations('dashboard.organizations.billing');
  const locale = useLocale();
  const { selectedOrganization } = useProjectStore();
  const { 
    cancelSubscription, 
    isCancelling, 
    organizationSubscription 
  } = useSubscription(selectedOrganization?.id);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const searchParams = useSearchParams();

  const plan = selectedOrganization?.plan ?? 'free';
  const eventsUsed = selectedOrganization?.eventsUsed ?? 0;

  const intentStatus = searchParams.get('intent_status');
  const intentPaymentError = searchParams.get('intent_payment_error');

  const invoices = [
    { id: 'inv_1', date: '2024-01-01', amount: '12.34$', status: 'paid', url: '#' },
    { id: 'inv_2', date: '2023-12-01', amount: '5.00$', status: 'paid', url: '#' },
  ];

  const handleSubscriptionSuccess = () => {
    setIsSubscriptionModalOpen(false);
  };

  const handleCancelSubscription = async () => {
    if (!selectedOrganization) {
      console.error('No organization selected');
      return;
    }

    if (!organizationSubscription) {
      console.error('No subscription found for organization');
      return;
    }

    try {
      await cancelSubscription({
        subscription_id: organizationSubscription.id,
        cancel_at_period_end: true,
      });
      
      setIsCancelDialogOpen(false);
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">
      {intentStatus === 'success' && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            {t('messages.success')}
          </AlertDescription>
        </Alert>
      )}

      {intentStatus === 'error' && intentPaymentError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {t('messages.error', { error: intentPaymentError })}
          </AlertDescription>
        </Alert>
        )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t('currentPlan.title')}
            <Badge variant={plan === 'pro' ? 'default' : 'secondary'}>{plan === 'pro' ? t('currentPlan.pro') : t('currentPlan.free')}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UsageSummaryPage eventsUsed={eventsUsed} plan={plan} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('tiers.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <PricingTiers />
        </CardContent>
      </Card>

      {plan === 'free' ? (
        <Card>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-muted-foreground">
                {t('freeThreshold')}
                <br />
                {t('freeMode.description')}
              </div>
              <Button 
                onClick={() => setIsSubscriptionModalOpen(true)}
                size="lg"
                className="flex items-center gap-2"
              >
                <CreditCard className="h-4 w-4" />
                {t('freeMode.upgradeButton')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>{t('proMode.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Message de résiliation en cours */}
                {organizationSubscription?.cancel_requested_at && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-1">
                        <p className="font-medium">{t('cancellation.title')}</p>
                        <p className="text-sm">
                          {t('cancellation.description', {
                            date: organizationSubscription.current_period_end 
                              ? new Date(organizationSubscription.current_period_end).toLocaleDateString(locale, {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                              : t('cancellation.fallbackDate')
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t('cancellation.note')}
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="text-muted-foreground mb-2">{t('proMode.description')}</div>
                  <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        disabled={!organizationSubscription || organizationSubscription.status !== 'active' || !!organizationSubscription?.cancel_requested_at}
                      >
                        {t('proMode.cancel')}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('cancelConfirmation.title')}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('cancelConfirmation.description', { freeLimit: BILLING_CONFIG.FREE_TIER_LIMIT })}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t('cancelConfirmation.cancel')}</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={handleCancelSubscription}
                          disabled={isCancelling}
                        >
                          {isCancelling ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Annulation en cours...
                            </>
                          ) : (
                            t('cancelConfirmation.confirm')
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Factures */}
          <Card>
            <CardHeader>
              <CardTitle>{t('billingHistory.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                          {invoice.status === 'paid' ? 'Payé' : 'En attente'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

      <SubscriptionModal 
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        onSuccess={handleSubscriptionSuccess}
      />
    </div>
  );
}
