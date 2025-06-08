import { defineStore } from 'pinia'
import type { Auth } from '../utils/types'
import { supabase } from '../utils/supabase'

const defaultValue = {
  auth: localStorage.getItem('sb-lncqycaiwbgqvhsmybfa-auth-token') ?? null,
  user_id: '',
}

export const useAuthStore = defineStore('auth', {
  state: () => defaultValue,
  getters: {
    isAuthenticated: (state) => !!state.auth,
  },
  actions: {
    async initialize() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user?.id) {
        this.user_id = user.id
      }
    },
    async login(myData: Auth) {
      const { error } = await supabase.auth.signInWithPassword({
        email: myData.login,
        password: myData.password,
      })
      if (error) throw error
      this.auth = localStorage.getItem('sb-lncqycaiwbgqvhsmybfa-auth-token')
    },
    async register(myData: Auth) {
      const { error } = await supabase.auth.signUp({
        email: myData.login,
        password: myData.password,
      })
      if (error) throw error
    },
    async logout() {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      this.auth = null
      this.user_id = ''
    },
  },
})
