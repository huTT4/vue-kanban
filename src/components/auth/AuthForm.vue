<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useErrorHandler } from '../../hooks/useErrorHandler'
import { useAuthForm } from '../../hooks/useAuthForm'
import ErrorNotification from '../Ui/ErrorNotification.vue'

// Focus logic
const inputRef = ref<HTMLInputElement | null>(null)
onMounted(() => inputRef.value?.focus())

// Error handling
const { errorText, isThereError, closeError, setError } = useErrorHandler()

// Auth logic
const { isLogin, data, handleSubmit } = useAuthForm()

const submit = async () => {
  try {
    await handleSubmit()
    if (!isLogin.value) {
      setError('Подтвердите ваш email')
    }
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message)
    }
  }
}
</script>

<template>
  <div class="auth">
    <ErrorNotification
      v-if="isThereError"
      @close="closeError"
      :errorText="errorText"
    />
    <h3 class="auth__title">{{ isLogin ? 'Авторизация' : 'Регистрация' }}</h3>
    <form class="auth__form" @submit.prevent="submit">
      <input
        ref="inputRef"
        class="auth__form-input"
        type="email"
        placeholder="Введите эл. почту"
        v-model="data.login"
      />
      <input
        class="auth__form-input"
        type="password"
        placeholder="Введите пароль"
        minlength="6"
        v-model="data.password"
      />
      <button type="submit" class="auth__form-btn">
        {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.auth {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 360px;
  width: 100%;
  margin: 0 auto;
  background-color: var(--bgCard);
  border-radius: var(--radius);
  padding: 20px;
  transition: var(--smooth);
}

.auth__title {
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 16px;
}

.auth__form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.auth__form-input,
.auth__form-btn {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  transition: var(--smooth);
}

.auth__form-input {
}

.auth__form-btn {
  position: relative;
  background-color: #b3b3b3;
}

.auth__form-btn::after,
.auth__form-btn::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, var(--text), var(--bg));
  bottom: -4px;
  left: 0;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform var(--smooth) ease-out;
}

.auth__form-btn::before {
  top: -4px;
  transform-origin: left;
  background: linear-gradient(to left, var(--text), var(--bg));
}

.auth__form-btn:hover::after,
.auth__form-btn:hover::before {
  transform: scaleX(1);
}
</style>
