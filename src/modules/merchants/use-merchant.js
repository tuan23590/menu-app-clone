import { useQuery } from '@tanstack/react-query'

import { request } from '@/utils/request'

import { useCart } from '../orders/use-cart'

export function useMerchant() {
  const cartActions = useCart((state) => state.actions)
  return useQuery({
    queryKey: ['merchants'],
    queryFn: async () => {
      const res = await request(`/`)
      if (res.merchant.status === 'INACTIVE' || res.merchant.visibleOrder === 'DISABLE') {
        cartActions.clear()
      }
      return res.merchant
    },
  })
}

export function useMerchantEnableOrder() {
  const { data } = useMerchant()
  return data?.visibleOrder === 'ENABLE'
}
