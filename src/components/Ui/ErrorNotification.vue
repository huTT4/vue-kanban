<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Props {
  errorText: string
}

const emits = defineEmits(['close'])
defineProps<Props>()

const isActive = ref(false)

onMounted(() => {
  setTimeout(() => (isActive.value = true), 10)
})

const closeError = async () => {
  isActive.value = false
  await new Promise((resolve) => setTimeout(resolve, 300))
  emits('close')
}
</script>

<template>
  <div class="error" :class="{ active: isActive }">
    <p>{{ errorText }}</p>
    <span @click="closeError">&#x2715;</span>
  </div>
</template>

<style scoped>
.error {
  display: flex;
  border: 1px solid var(--bg);
  border-radius: 5px;
  padding: 5px 10px;
  gap: 15px;
  transform: scale(0.65);
  opacity: 0.5;
  transition: var(--smooth);
}

.error.active {
  transform: scale(1);
  opacity: 1;
}

.error span {
  cursor: pointer;
}
</style>
