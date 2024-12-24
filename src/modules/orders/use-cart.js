import { produce } from 'immer'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { storage } from '@/utils/storage'

function buildCartItemId(product, toppings= []) {
  const ids = toppings.map((t) => t.id).toSorted()
  return `${product.id}:${ids.join()}`
}

function calcTotal(items) {
  return items.reduce((acc, item) => acc + item.total, 0)
}

export const useCart = create(
  persist(
    (set) => ({
      items: {},
      total: 0,
      actions: {
        add: ({ product, toppings }) =>
          set(
            produce((state) => {
              const id = buildCartItemId(product, toppings)
              const item = state.items[id]
              const quantity = (item?.quantity || 0) + 1
              const toppingsTotal = toppings?.reduce((acc, t) => acc + t.price, 0) || 0
              const price = product.price + toppingsTotal
              const total = price * quantity
              state.items[id] = {
                id,
                product,
                toppings,
                quantity,
                price,
                total,
                createdAt: Date.now(),
              }
              state.total = calcTotal(Object.values(state.items))
            }),
          ),
        remove: (id) =>
          set(
            produce((state) => {
              if (!state.items[id]) return
              delete state.items[id]
              state.total = calcTotal(Object.values(state.items))
            }),
          ),
        increase: (id) =>
          set(
            produce((state) => {
              if (!state.items[id]) return
              state.items[id].quantity += 1
              state.items[id].total = state.items[id].price * state.items[id].quantity
              state.total = calcTotal(Object.values(state.items))
            }),
          ),
        decrease: (id) =>
          set(
            produce((state) => {
              if (!state.items[id]) return
              if (state.items[id].quantity === 1) {
                delete state.items[id]
                state.total = calcTotal(Object.values(state.items))
                return
              }
              state.items[id].quantity -= 1
              state.items[id].total = state.items[id].price * state.items[id].quantity
              state.total = calcTotal(Object.values(state.items))
            }),
          ),
        updateNote: (id, note) =>
          set(
            produce((state) => {
              if (!state.items[id]) return
              state.items[id].note = note
            }),
          ),
        clear: () => set({ items: {}, total: 0 }),
        productsUpdated: (products) => {
          // Tính toán lại giá trị của các item trong giỏ hàng khi Menu được cập nhật
          set(
            produce((state) => {
              const newItems = {}
              const productsMap = products.reduce((acc, p) => ({ ...acc, [p.id]: p }), {})
              Object.values(state.items).forEach((item) => {
                const product = productsMap[item.product.id]
                if (!product) return
                const toppingsTotal = item.toppings?.reduce((acc, t) => acc + t.price, 0) || 0
                const price = product.price + toppingsTotal
                const total = price * item.quantity
                newItems[item.id] = {
                  ...item,
                  product,
                  price,
                  total,
                }
              })
              state.items = newItems
              state.total = calcTotal(Object.values(state.items))
            }),
          )
        },
      },
    }),
    {
      name: 'cart',
      storage: storage,
      partialize: (state) => {
        const now = Date.now()
        const createdAt = new Date(state.createdAt || now)
        // Tự động reset cart sau mỗi 12h
        if (now - createdAt.getTime() > 12 * 60 * 60 * 1000) {
          return { items: {}, total: 0, createdAt: now }
        }
        return {
          items: state.items,
          total: state.total,
          createdAt: createdAt.getTime(),
        }
      },
    }
  ),
)

export const useTotalCartItems = () =>
  useCart((state) => Object.values(state.items).reduce((acc, item) => acc + item.quantity, 0))
