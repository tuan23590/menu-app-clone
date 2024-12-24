import { create } from 'zustand'


export const useOaState = create((set) => ({
  showCount: 0,
  requestFollowDialog: false,
  actions: {
    openRequestFollowDialog: () =>
      set(() => {
        return { requestFollowDialog: true }
      }),
    closeRequestFollowDialog: () => set((state) => ({ requestFollowDialog: false, showCount: state.showCount + 1 })),
  },
}))
