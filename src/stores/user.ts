import { defineStore } from 'pinia'

type User = {
  username: string
  email: string
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null as User | null
  }),
  actions: {
    setUser(user: User) {
      this.user = user
    },
    clearUser() {
      this.user = null
    }
  }
})
