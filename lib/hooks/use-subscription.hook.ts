import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './use-auth.hook';
import api from '../api';

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

interface SubscriptionSetupResponse {
  clientSecret: string;
  customerId: string;
  subscriptionId?: string;
}

interface CancelSubscriptionData {
  subscription_id: string;
  cancel_at_period_end: boolean;
}

interface CancelSubscriptionResponse {
  endDate: string;
  message: string;
}

interface OrganizationSubscription {
  id: string;
  organization_id: string;
  stripe_subscription_id?: string;
  status: string;
  current_period_end?: string;
  cancel_requested_at?: string;
  created_at: string;
  updated_at: string;
}

export function useSubscription(organizationId?: string) {
  const { token } = useAuth();
  const queryClient = useQueryClient()

  const setupSubscriptionMutation = useMutation({
    mutationFn: async (data: SubscriptionSetupData): Promise<SubscriptionSetupResponse> => {
      if (!token) {
        throw new Error('Non authentifié');
      }

      const response = await api.post('/api/subscriptions', data);
      return response.data;
    },
  });

  const cancelSubscriptionMutation = useMutation({
    mutationFn: async (data: CancelSubscriptionData): Promise<CancelSubscriptionResponse> => {
      if (!token) {
        throw new Error('Non authentifié');
      }

      const response = await api.post(`/api/subscriptions/${data.subscription_id}/cancel`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] })
      queryClient.invalidateQueries({ queryKey: ['organization-subscription', organizationId] })
    }
  });

  const organizationSubscriptionQuery = useQuery({
    queryKey: ['organization-subscription', organizationId],
    queryFn: async (): Promise<OrganizationSubscription> => {
      if (!token) {
        throw new Error('Non authentifié');
      }

      const response = await api.get(`/api/subscriptions/organizations/${organizationId}`);
      return response.data;
    },
    enabled: !!token && !!organizationId,
  });

  return {
    setupSubscription: setupSubscriptionMutation.mutateAsync,
    isSettingUp: setupSubscriptionMutation.isPending,
    setupError: setupSubscriptionMutation.error,
    cancelSubscription: cancelSubscriptionMutation.mutateAsync,
    isCancelling: cancelSubscriptionMutation.isPending,
    cancelError: cancelSubscriptionMutation.error,
    organizationSubscription: organizationSubscriptionQuery.data,
    isOrganizationSubscriptionLoading: organizationSubscriptionQuery.isLoading,
    organizationSubscriptionError: organizationSubscriptionQuery.error,
  };
} 