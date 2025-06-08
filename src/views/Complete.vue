<script setup lang="ts">
import Card from '../components/kanban/Card.vue'
import { useKanbanStore } from '../stores/kanban.store'

const store = useKanbanStore()

store.loadCompleteCards()
</script>

<template>
  <div class="board">
    <template v-if="store.completeCards.length">
      <Card
        v-for="card in store.completeCards"
        :key="card.id"
        :card="card"
        :complete="true"
      />
    </template>
    <p v-else class="board__else">Завершенных карточек пока нет...</p>
  </div>
</template>

<style scoped>
.board {
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: center;
}

.board__else {
  font-size: 32px;
}
</style>
