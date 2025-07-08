export const config = {
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  },
} as const;

// Validation des variables d'environnement requises
if (!config.stripe.publishableKey) {
  console.warn('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set. Stripe functionality will not work.');
}

// Configuration des limites et tarifs de facturation
export const BILLING_CONFIG = {
  // Limite d'événements gratuits par mois
  FREE_TIER_LIMIT: 5000,
  
  // Facturation minimum en dollars
  MIN_BILLING_AMOUNT: 5,
  
  // Paliers de tarification (événements par mois)
  PRICING_TIERS: [
    { from: 1, to: 5000, price: 0 },
    { from: 5001, to: 100000, price: 0.001 },
    { from: 100001, to: 500000, price: 0.0008 },
    { from: 500001, to: Infinity, price: 0.0006 },
  ],
} as const;

// Fonction utilitaire pour formater le nombre d'événements
export const formatEventCount = (count: number): string => {
  return count.toLocaleString();
};

// Fonction utilitaire pour calculer le coût estimé
export const estimateCost = (events: number): number => {
  if (events <= BILLING_CONFIG.FREE_TIER_LIMIT) {
    return 0;
  }
  
  const billableEvents = events - BILLING_CONFIG.FREE_TIER_LIMIT;
  let cost = 0;
  let remaining = billableEvents;
  
  for (const tier of BILLING_CONFIG.PRICING_TIERS) {
    if (remaining <= 0) break;
    const tierFrom = tier.from;
    const tierTo = tier.to === Infinity ? billableEvents + BILLING_CONFIG.FREE_TIER_LIMIT : Math.min(tier.to, billableEvents + BILLING_CONFIG.FREE_TIER_LIMIT);
    if (billableEvents + BILLING_CONFIG.FREE_TIER_LIMIT >= tierFrom) {
      const count = tierTo - tierFrom + 1;
      cost += Math.max(0, Math.min(remaining, count)) * tier.price;
      remaining -= count;
    }
  }
  return cost;
};

// Fonction utilitaire pour calculer le pourcentage d'utilisation
export const calculateUsagePercentage = (eventsUsed: number): number => {
  return Math.min((eventsUsed / BILLING_CONFIG.FREE_TIER_LIMIT) * 100, 100);
}; 