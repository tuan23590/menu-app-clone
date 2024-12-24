import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { followOA } from 'zmp-sdk'

import { request } from '@/utils/request'

export function useOA() {
  return useQuery({
    queryKey: ['oa'],
    queryFn: async () => request(`/oa`),
  })
}

export function useFollowOA() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id) => followOA({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['oa'],
      })
    },
  })
}
