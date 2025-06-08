<script setup lang="ts">
import Toggle from './Ui/Toggle.vue'
import Logout from './Ui/Logout.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

const auth = useAuthStore()
const router = useRouter()

const logout = async () => {
  await auth.logout()
  await router.push('/auth?action=login')
}
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <router-link to="/" class="header__title">VEEBAN</router-link>
      <nav class="header__nav">
        <router-link class="pages" to="/">Home</router-link>
        <router-link class="pages" to="/complete-tasks"
          >Complete Tasks</router-link
        >
      </nav>
      <div class="header__right">
        <Toggle />
        <nav class="header__nav auth">
          <template v-if="!auth.isAuthenticated">
            <router-link to="/auth?action=login">Логин</router-link>
            <span>/</span>
            <router-link to="/auth?action=register">Регистрация</router-link>
          </template>
          <template v-else>
            <Logout @click.prevent="logout" />
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: var(--bgHeader);
  border-radius: var(--radius);
  box-shadow: 0 0 16px 1.5px var(--shadowHeader);
  padding: 16px;
  border-bottom: 1px solid var(--borderHeader);
  margin-bottom: 48px;
  transition: 0.4s;
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__title {
  font-size: 24px;
  font-weight: bold;
  color: var(--text);
}

.header__right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header__nav.auth {
  gap: 2.5px;
}

.header__nav a {
  color: var(--text);
  position: relative;
}

.header__nav a::before {
  content: '';
  position: absolute;
  bottom: -5px;
  width: 0%;
  height: 2px;
  background-color: var(--text);
  transition: 0.8s;
}

.header__nav a:hover::before {
  width: 100%;
  transition: var(--smooth);
}

.header__nav a.pages.active::before {
  content: '';
  position: absolute;
  bottom: -5px;
  width: 100%;
  height: 2px;
  background-color: var(--text);
  transition: 0.8s;
}

.header__nav span {
  color: var(--text);
}
</style>
