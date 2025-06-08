import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import type { Auth } from '../utils/types'

export function useAuthForm() {
  const auth = useAuthStore()
  const route = useRoute()
  const router = useRouter()
  const isLogin = computed(() => route.query.action === 'login')

  const data = reactive<Auth>({
    login: '',
    password: '',
  })

  const handleSubmit = async () => {
    if (data.login.length && data.password.length) {
      try {
        if (isLogin.value) await auth.login(data)
        else await auth.register(data)
        data.login = ''
        data.password = ''
        if (isLogin.value) {
          router.push('/')
        }
      } catch (error) {
        throw error
      }
    }
  }

  return {
    isLogin,
    data,
    handleSubmit,
  }
}
