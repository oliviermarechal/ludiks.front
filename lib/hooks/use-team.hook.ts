import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../api';

export interface Member {
  id: string;
  userId: string;
  email: string;
  role: 'Admin' | 'Member';
  joinedAt: string;
}

export interface PendingInvite {
  id: string;
  toEmail: string;
  role: 'Admin' | 'Member';
  createdAt: string;
}

export interface UserInvite {
  id: string;
  organization: {
    id: string;
    name: string;
  };
  role: 'Admin' | 'Member';
  createdAt: string;
  fromUser: {
    email: string;
  }
}

export function useTeam(organizationId?: string) {
  const queryClient = useQueryClient();

  const membersQuery = useQuery({
    queryKey: ['team-members', organizationId],
    queryFn: async (): Promise<Member[]> => {
      if (!organizationId) return [];
      const { data } = await api.get(`/api/organizations/${organizationId}/memberships`);
      return data;
    },
    enabled: !!organizationId,
    staleTime: 5 * 60 * 1000,
  });

  const invitesQuery = useQuery({
    queryKey: ['pending-invites', organizationId],
    queryFn: async (): Promise<PendingInvite[]> => {
      if (!organizationId) return [];
      const { data } = await api.get(`/api/organizations/${organizationId}/invites`);
      return data;
    },
    enabled: !!organizationId,
    staleTime: 1 * 60 * 1000,
  });

  const userInvitesQuery = useQuery({
    queryKey: ['user-invites'],
    queryFn: async (): Promise<UserInvite[]> => {
      const { data } = await api.get(`/api/organizations/user/invites`);
      return data;
    },
    staleTime: 1 * 60 * 1000,
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ memberId, role }: { memberId: string, role: 'Admin' | 'Member' }) => {
      // await api.patch(`/api/organizations/${organizationId}/members/${memberId}`, { role });
      console.log(`Updating role for member ${memberId} to ${role}`);
      await new Promise(resolve => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members', organizationId] });
    },
  });

  const removeMemberMutation = useMutation({
    mutationFn: async (memberId: string) => {
      // await api.delete(`/api/organizations/${organizationId}/members/${memberId}`);
      console.log(`Removing member ${memberId}`);
      await new Promise(resolve => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members', organizationId] });
    },
  });

  const inviteMemberMutation = useMutation({
    mutationFn: async ({ email, role }: { email: string, role: 'Admin' | 'Member' }) => {
      const { data } = await api.post(`/api/organizations/${organizationId}/memberships`, { email, role });
      return data;
    },
    onSuccess: (newInvite) => {
      queryClient.setQueryData(['pending-invites', organizationId], (oldData: PendingInvite[] | undefined) => {
        if (!oldData) return [newInvite];
        return [...oldData, newInvite];
      });
    },
  });

  const revokeInviteMutation = useMutation({
    mutationFn: async (inviteId: string) => {
      await api.delete(`/api/organizations/${organizationId}/invites/${inviteId}`);
    },
    onSuccess: (_, inviteId) => {
      queryClient.setQueryData(['pending-invites', organizationId], (oldData: PendingInvite[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter(invite => invite.id !== inviteId);
      });
    },
  });

  const acceptInvitationMutation = useMutation({
    mutationFn: async (inviteId: string) => {
      await api.post(`/api/organizations/${organizationId}/invites/${inviteId}/accept`);
    },
    onSuccess: (_, inviteId) => {
      queryClient.setQueryData(['user-invites'], (oldData: UserInvite[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter(invite => invite.id !== inviteId);
      });
    },
  });

  const rejectInvitationMutation = useMutation({
    mutationFn: async (inviteId: string) => {
      await api.post(`/api/organizations/${organizationId}/invites/${inviteId}/reject`);
    },
    onSuccess: (_, inviteId) => {
      queryClient.setQueryData(['user-invites'], (oldData: UserInvite[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter(invite => invite.id !== inviteId);
      });
    },
  });

  return {
    members: membersQuery.data ?? [],
    isLoadingMembers: membersQuery.isLoading,
    pendingInvites: invitesQuery.data ?? [],
    isLoadingInvites: invitesQuery.isLoading,
    userInvites: userInvitesQuery.data ?? [],
    isLoadingUserInvites: userInvitesQuery.isLoading,
    error: invitesQuery.error,
    
    updateRole: updateRoleMutation.mutateAsync,
    isUpdatingRole: updateRoleMutation.isPending,

    removeMember: removeMemberMutation.mutateAsync,
    isRemovingMember: removeMemberMutation.isPending,

    inviteMember: inviteMemberMutation.mutateAsync,
    isInvitingMember: inviteMemberMutation.isPending,
    
    revokeInvite: revokeInviteMutation.mutateAsync,
    isRevokingInvite: revokeInviteMutation.isPending,

    acceptInvitation: acceptInvitationMutation.mutateAsync,
    isAcceptingInvitation: acceptInvitationMutation.isPending,

    rejectInvitation: rejectInvitationMutation.mutateAsync,
    isRejectingInvitation: rejectInvitationMutation.isPending,
  };
}
