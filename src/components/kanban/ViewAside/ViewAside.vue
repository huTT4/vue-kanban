<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ViewAsideProps } from '../../../utils/types'
import ViewAsideComments from './AsideComments.vue'
import AsideInfo from './AsideInfo.vue'

const emits = defineEmits(['close'])
withDefaults(defineProps<ViewAsideProps>(), {
  complete: false,
})

const close = async () => {
  isActive.value = false
  await new Promise((resolve) => setTimeout(resolve, 350))
  emits('close')
}

// Smooth
const isActive = ref(false)
onMounted(() => (isActive.value = true))
</script>

<template>
  <div @click="close" class="overlay" :class="{ active: isActive }"></div>
  <div class="aside" :class="{ active: isActive }">
    <h4 class="aside__title">Подробнее...</h4>
    <AsideInfo :card="card" />
    <ViewAsideComments :card="card" :complete="complete" />
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background-color: var(--overlay);
  opacity: 0;
  transition: var(--smooth);
}

.overlay.active {
  opacity: 1;
}

.aside {
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
  background-color: var(--bgForm);
  width: 350px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  opacity: 0.5;
  transition: var(--smooth) ease-out;
}

.aside.active {
  opacity: 1;
  transform: translateX(0);
}

.aside__title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 24px;
}
</style>
