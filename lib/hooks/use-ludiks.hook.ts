import { useCallback } from 'react';
import { Ludiks, User, TrackEventResponse } from '@ludiks/sdk';

interface UseLudiksOptions {
  apiKey: string;
  baseUrl?: string;
}

export function useLudiks({ apiKey, baseUrl }: UseLudiksOptions) {
  const getProfile = useCallback(async (userId: string) => {
    try {
      return await Ludiks.getProfile({
        apiKey,
        userId,
        baseUrl
      });
    } catch (error) { 
      console.error('Failed to get profile:', error);
      throw error;
    }
  }, [apiKey, baseUrl]);

  const initUser = useCallback(async (user: User) => {
    try {
      await Ludiks.initUser({
        apiKey,
        user,
        baseUrl
      });
    } catch (error) {
      console.error('Failed to initialize user:', error);
      throw error;
    }
  }, [apiKey, baseUrl]);

  const trackEvent = useCallback(async (
    userId: string,
    eventName: string,
    value?: number,
    timestamp?: Date
  ): Promise<TrackEventResponse> => {
    try {
      return await Ludiks.trackEvent({
        apiKey,
        userId,
        eventName,
        value,
        timestamp,
        baseUrl
      });
    } catch (error) {
      console.error('Failed to track event:', error);
      throw error;
    }
  }, [apiKey, baseUrl]);

  return {
    initUser,
    trackEvent,
    getProfile,
  };
}