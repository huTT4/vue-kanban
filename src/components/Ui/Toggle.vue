<script setup lang="ts">
import { ref } from 'vue'

const theme = document.documentElement.classList.value
const isDark = ref(theme === 'dark')

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}
</script>

<template>
  <label class="wrapper">
    <p>{{ isDark ? 'Темная тема' : 'Светлая тема' }}</p>
    <span class="switch">
      <input type="checkbox" @click="toggleTheme" :checked="isDark" />
      <span class="slider"></span>
    </span>
  </label>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
}

.wrapper p {
  color: var(--text);
}

.switch {
  position: relative;
  display: inline-block;
  width: 54px;
  height: 18px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border: 1px solid #1d1d1d;
  transition: 0.4s;
  border-radius: 34px;
  font-family: serif;
}

.slider:before {
  position: absolute;
  content: url('../../assets/sun.svg');
  height: 16px;
  width: 16px;
  background-color: yellow;
  transition: 0.4s;
  border-radius: 50%;
  padding: 1px;
}

input:checked + .slider {
  background-color: #1d1d1d;
  border: 1px solid #555;
}

input:focus + .slider {
  box-shadow: 0 0 1px #1d1d1d;
}

input:checked + .slider:before {
  transform: translateX(36px);
  content: url('../../assets/moon.svg');
  background-color: rgb(255, 145, 0);
}
</style>
