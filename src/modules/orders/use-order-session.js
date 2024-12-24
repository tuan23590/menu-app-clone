import { create, useStore } from 'zustand'

import { DEFAULT_ORDER_SESSION_ID } from '@/constants/common'

const orderSessionStore = create((set) => ({
  id: DEFAULT_ORDER_SESSION_ID,
  owner: undefined,
  actions: {
    setId: (id) => set({ id }),
    setOwner: (owner) => set({ owner }),
  },
}))

export function useOrderSessionActions() {
  return useStore(orderSessionStore, (state) => state.actions)
}

export function useOrderSessionId() {
  return useStore(orderSessionStore, (state) => state.id || undefined)
}

export function useOrderSessionOwner() {
  return useStore(orderSessionStore, (state) => state.owner)
}
