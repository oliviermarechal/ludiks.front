'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CreditCard, Building2, User, Receipt } from "lucide-react";
import { config } from '@/lib/config';
import { useProjectStore } from '@/lib/stores/project-store';
import { useSubscription } from '@/lib/hooks/use-subscription.hook';
import { getApiBaseUrl } from '@/lib/api';

interface SubscriptionSetupData {
  customer_email: string;
  company_name: string;
  company_address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  contact_name: string;
  contact_phone: string;
  tax_id_value: string;
  organization_id: string;
}

const stripePromise = loadStripe(config.stripe.publishableKey);

interface SubscriptionFormData {
  customer_email: string;
  company_name: string;
  company_address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  contact_name: string;
  contact_phone: string;
  tax_id_value: string;
}

const COUNTRIES = [
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Allemagne' },
  { code: 'IT', name: 'Italie' },
  { code: 'ES', name: 'Espagne' },
  { code: 'NL', name: 'Pays-Bas' },
  { code: 'BE', name: 'Belgique' },
  { code: 'AT', name: 'Autriche' },
  { code: 'IE', name: 'Irlande' },
  { code: 'PT', name: 'Portugal' },
  { code: 'FI', name: 'Finlande' },
  { code: 'SE', name: 'Suède' },
  { code: 'DK', name: 'Danemark' },
  { code: 'PL', name: 'Pologne' },
  { code: 'CZ', name: 'République tchèque' },
  { code: 'HU', name: 'Hongrie' },
  { code: 'RO', name: 'Roumanie' },
  { code: 'BG', name: 'Bulgarie' },
  { code: 'HR', name: 'Croatie' },
  { code: 'SI', name: 'Slovénie' },
  { code: 'SK', name: 'Slovaquie' },
  { code: 'LT', name: 'Lituanie' },
  { code: 'LV', name: 'Lettonie' },
  { code: 'EE', name: 'Estonie' },
  { code: 'CY', name: 'Chypre' },
  { code: 'MT', name: 'Malte' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'GB', name: 'Royaume-Uni' },
  { code: 'US', name: 'États-Unis' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australie' },
  { code: 'BR', name: 'Brésil' },
  { code: 'MX', name: 'Mexique' },
  { code: 'IN', name: 'Inde' },
  { code: 'SG', name: 'Singapour' },
  { code: 'TH', name: 'Thaïlande' },
  { code: 'TW', name: 'Taïwan' },
  { code: 'ZA', name: 'Afrique du Sud' },
  { code: 'CH', name: 'Suisse' },
  { code: 'NO', name: 'Norvège' },
];

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

function SubscriptionFormContent({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const { selectedOrganization } = useProjectStore();
  const { setupSubscription, isSettingUp } = useSubscription();
  const [isStripeReady, setIsStripeReady] = useState(false);

  useEffect(() => {
    if (stripe && elements) {
      const timer = setTimeout(() => {
        setIsStripeReady(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [stripe, elements]);
  
  const [formData, setFormData] = useState<SubscriptionFormData>({
    customer_email: '',
    company_name: selectedOrganization?.name || '',
    company_address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'FR',
    },
    contact_name: '',
    contact_phone: '',
    tax_id_value: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => {
        const parentData = prev[parent as keyof SubscriptionFormData] as Record<string, string>;
        return {
          ...prev,
          [parent]: {
            ...parentData,
            [child]: value,
          },
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || !selectedOrganization) {
      setError('Stripe n&apos;est pas initialisé ou organisation non sélectionnée');
      return;
    }

    if (!isStripeReady) {
      setError('Le formulaire de paiement n\'est pas encore prêt. Veuillez patienter quelques secondes et réessayer.');
      return;
    }

    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setError('Le formulaire de carte bancaire n\'est pas encore prêt. Veuillez patienter quelques secondes et réessayer.');
        return;
      }

      const subscriptionData: SubscriptionSetupData = {
        customer_email: formData.customer_email,
        company_name: formData.company_name,
        company_address: formData.company_address,
        contact_name: formData.contact_name,
        contact_phone: formData.contact_phone,
        tax_id_value: formData.tax_id_value,
        organization_id: selectedOrganization.id,
      };
      
      const { clientSecret, subscriptionId } = await setupSubscription(subscriptionData);

      const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: formData.contact_name,
          email: formData.customer_email,
          address: {
            line1: formData.company_address.line1,
            line2: formData.company_address.line2,
            city: formData.company_address.city,
            state: formData.company_address.state,
            postal_code: formData.company_address.postal_code,
            country: formData.company_address.country,
          },
        },
      });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message || 'Erreur lors de la création du moyen de paiement');
      }

      if (!paymentMethod) {
        throw new Error('Impossible de créer le moyen de paiement');
      }

      const returnUrl = subscriptionId 
        ? `${getApiBaseUrl()}/api/subscriptions/setup-intent-success?subscription_id=${subscriptionId}`
        : `${getApiBaseUrl()}/api/subscriptions/setup-intent-success`;

      const result = await stripe.confirmSetup({
        clientSecret: clientSecret,
        confirmParams: {
          payment_method: paymentMethod.id,
          return_url: returnUrl,
        },
      });

      if (result.error) {
        throw new Error(result.error.message || 'Erreur lors de la confirmation');
      }

      console.log('Setup Intent confirmed successfully');
      onSuccess();

    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Informations de l'entreprise */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Informations de l&apos;entreprise
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer_email">Email *</Label>
              <Input
                id="customer_email"
                type="email"
                value={formData.customer_email}
                onChange={(e) => handleInputChange('customer_email', e.target.value)}
                required
                placeholder="contact@entreprise.fr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_name">Nom de l&apos;entreprise *</Label>
              <Input
                id="company_name"
                type="text"
                value={formData.company_name}
                onChange={(e) => handleInputChange('company_name', e.target.value)}
                required
                placeholder="Ma Société SARL"
              />
            </div>
          </div>

          {/* Adresse */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address_line1">Adresse *</Label>
              <Input
                id="address_line1"
                type="text"
                value={formData.company_address.line1}
                onChange={(e) => handleInputChange('company_address.line1', e.target.value)}
                required
                placeholder="123 Rue de la Paix"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address_line2">Complément d&apos;adresse</Label>
              <Input
                id="address_line2"
                type="text"
                value={formData.company_address.line2}
                onChange={(e) => handleInputChange('company_address.line2', e.target.value)}
                placeholder="Bâtiment A, Étage 2"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ville *</Label>
                <Input
                  id="city"
                  type="text"
                  value={formData.company_address.city}
                  onChange={(e) => handleInputChange('company_address.city', e.target.value)}
                  required
                  placeholder="Paris"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal_code">Code postal *</Label>
                <Input
                  id="postal_code"
                  type="text"
                  value={formData.company_address.postal_code}
                  onChange={(e) => handleInputChange('company_address.postal_code', e.target.value)}
                  required
                  placeholder="75001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Pays *</Label>
                <Select
                  value={formData.company_address.country}
                  onValueChange={(value) => handleInputChange('company_address.country', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un pays" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informations de contact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact_name">Nom du contact *</Label>
              <Input
                id="contact_name"
                type="text"
                value={formData.contact_name}
                onChange={(e) => handleInputChange('contact_name', e.target.value)}
                required
                placeholder="Jean Dupont"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_phone">Téléphone</Label>
              <Input
                id="contact_phone"
                type="tel"
                value={formData.contact_phone}
                onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                placeholder="+33123456789"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Numéro de TVA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Informations fiscales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="tax_id_value">Numéro de TVA (optionnel)</Label>
            <Input
              id="tax_id_value"
              type="text"
              value={formData.tax_id_value}
              onChange={(e) => handleInputChange('tax_id_value', e.target.value)}
              placeholder="FR12345678901"
            />
            <p className="text-sm text-muted-foreground">
              Le type sera automatiquement détecté selon le pays sélectionné
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Carte bancaire */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Moyen de paiement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Carte bancaire *</Label>
            <div className="border rounded-md p-3">
              <CardElement options={cardElementOptions} />
            </div>
            <p className="text-sm text-muted-foreground">
              Votre carte ne sera pas débitée immédiatement. Elle sera utilisée pour les prélèvements automatiques mensuels.
            </p>
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        disabled={isSettingUp || !isStripeReady}
        className="w-full"
        size="lg"
      >
        {isSettingUp ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enregistrement en cours...
          </>
        ) : !isStripeReady ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Chargement du formulaire de paiement...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Enregistrer le moyen de paiement
          </>
        )}
      </Button>
    </form>
  );
}

interface SubscriptionFormProps {
  onSuccess: () => void;
}

export default function SubscriptionForm({ onSuccess }: SubscriptionFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <SubscriptionFormContent onSuccess={onSuccess} />
    </Elements>
  );
} 