<script setup lang="ts">
import Column from '../components/kanban/Column.vue'
import { useKanbanStore } from '../stores/kanban.store'

useKanbanStore().loadCards()

const categories = ['queue', 'work', 'review', 'done'] as const
</script>

<template>
  <div class="board">
    <Column
      v-for="category in categories"
      :key="category"
      :category="category"
    />
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(4, 300px);
  gap: 50px;
  justify-content: center;
  height: calc(100vh - 69px - 48px - 13px);
}
</style>
