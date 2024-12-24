import { useQuery } from '@tanstack/react-query'

import { request } from '@/utils/request'

import { useCart } from '../orders/use-cart'

export function useMenu() {
  const actions = useCart((state) => state.actions)
  return useQuery({
    queryKey: ['menu'],
    queryFn: async () => {
      const res = await request(`/menu-items`)
      const menuItems = res?.filter((item) => item.products.length > 0)
      const products = menuItems?.flatMap((item) => item.products)
      actions.productsUpdated(products)
      return menuItems
    },
  })
}
