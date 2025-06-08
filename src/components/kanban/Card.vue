<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ViewAside from './ViewAside/ViewAside.vue'
import { type CardProps } from '../../utils/types'

interface Props extends CardProps {
  complete?: boolean
}

const emit = defineEmits(['dragstart'])
withDefaults(defineProps<Props>(), {
  complete: false,
})

const viewing = ref(false)

// Smooth mounting
const isActive = ref(false)
onMounted(() => {
  setTimeout(() => (isActive.value = true), 10)
})
</script>

<template>
  <Teleport to="body">
    <ViewAside
      v-if="viewing"
      @close="viewing = false"
      :card="card"
      :complete="complete"
    />
  </Teleport>

  <div
    @click="viewing = true"
    class="card"
    :class="{ active: isActive }"
    draggable="true"
    @dragstart="emit('dragstart', card)"
  >
    <h3 class="card__title">{{ card.title }}</h3>
    <p class="card__descr">{{ card.descr }}</p>
    <button class="card__btn">Подробнее . . .</button>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  background-color: var(--bgCard);
  border-radius: var(--radius);
  transition: var(--smooth);
  padding: 10px 15px;
  cursor: grab;
  transform: scale(0.5);
}

.card.active {
  transform: scale(1);
}

.card__title {
  border-bottom: 1px solid var(--border);
  width: 100%;
  text-align: center;
  padding-bottom: 5px;
  max-width: 100%;
  word-wrap: break-word;
  font-weight: 400;
  font-size: 18px;
}

.card__descr {
  padding: 10px 0;
  max-width: 100%;
  word-wrap: break-word;
  font-size: 14px;
}

.card__btn {
  width: 100%;
  background-color: transparent;
  color: var(--text);
  border-top: 1px solid var(--border);
  padding: 5px 10px 0;
  font-size: inherit;
  transition: var(--smooth);
  font-weight: inherit;
  opacity: 0.85;
}
</style>
