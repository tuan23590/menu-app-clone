import { getStorage, removeStorage, setStorage } from 'zmp-sdk'

export const storage = {
  getItem: async (key) => {
    const items = await getStorage({ keys: [key] })
    return items[key]
  },
  setItem: async(key, value) => {
    await setStorage({ data: { [key]: value } })
  },
  removeItem: async (key) => {
    await removeStorage({ keys: [key] })
  },
}
