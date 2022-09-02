import type { UseQueryResult } from "@tanstack/react-query";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { api } from "#preload";
import type {
  QueryType,
  MutationType,
  QueryParams,
  MutationParams,
  Queries,
} from "../../../preload/src/api";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Number.MAX_VALUE,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
    mutations: {
      cacheTime: Number.MAX_VALUE,
    },
  },
});

type UseQueryOptions = Parameters<typeof useQuery>[2];

export const useMainQuery = <Type extends QueryType>(
  type: Type,
  params: QueryParams<Type>,
  options?: UseQueryOptions,
) => {
  return useQuery(
    [type],
    () => api.query(type, params),
    options,
  ) as UseQueryResult<Awaited<ReturnType<Queries[Type]>>>;
};

type OnMutationSuccess = (queryClient: QueryClient) => void;

export const useMainMutation = <Type extends MutationType>(
  type: Type,
  onSuccess?: OnMutationSuccess,
) => {
  return useMutation(
    (params: MutationParams<Type>) => api.mutate(type, params),
    {
      onSuccess: onSuccess ? () => onSuccess(queryClient) : undefined,
    },
  );
};
