import {QueryClient, useMutation, useQuery} from '@tanstack/react-query';
import {api} from '#preload';
import type {QueryType, MutationType, QueryParams, MutationParams} from '../../../preload/src/api';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Number.MAX_VALUE,
    },
    mutations: {
      cacheTime: Number.MAX_VALUE,
    },
  },
});

export const useMainQuery = <Type extends QueryType>(type: Type, params: QueryParams<Type>) => {
  return useQuery([type], () => api.query(type, params));
};

export const useMainMutation = <Type extends MutationType>(type: Type) => {
  return useMutation((params: MutationParams<Type>) => api.mutate(type, params));
};
