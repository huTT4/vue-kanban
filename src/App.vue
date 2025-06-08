<script setup lang="ts">
import { useRouter } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import { useAuthStore } from './stores/auth.store'

window.matchMedia('(prefers-color-scheme: dark)').matches
  ? document.documentElement.classList.add('dark')
  : ''

const router = useRouter()
const auth = useAuthStore()

// @ts-ignore
router.beforeEach((to, _, next) => {
  const requiredAuth = to.meta.auth

  if (to.name === 'auth' && auth.isAuthenticated) {
    next('/')
  } else if (requiredAuth && auth.isAuthenticated) {
    next()
  } else if (requiredAuth && !auth.isAuthenticated) {
    next('/auth?action=login&message=requiredAuth')
  } else {
    next()
  }
})
</script>

<template>
  <TheHeader />
  <router-view></router-view>
</template>
