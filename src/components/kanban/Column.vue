<script setup lang="ts">
import { computed, ref } from 'vue'
import { useKanbanStore } from '../../stores/kanban.store'
import { type CardCategory, type ICard } from '../../utils/types'
import Card from '../../components/kanban/Card.vue'
import AddForm from './AddForm.vue'
import { useDragDrop } from '../../hooks/useDragDrop'

const TITLES = {
  queue: 'В очереди',
  work: 'В работе',
  review: 'На проверке',
  done: 'Готово',
} as const

const props = defineProps<{ category: CardCategory }>()
const store = useKanbanStore()

const cards = computed(() => {
  switch (props.category) {
    case 'queue':
      return store.getQueue
    case 'work':
      return store.getWork
    case 'review':
      return store.getReview
    case 'done':
      return store.getDone
  }
})

// Adding new card
const adding = ref(false)
const addCard = (newCard: ICard) => {
  store.add(newCard)
  adding.value = false
}

// Drag-n-drop
const { handleDragStart, handleDragOver, handleDragLeave, handleDrop } =
  useDragDrop(props)
</script>

<template>
  <Teleport to="body">
    <AddForm
      v-if="adding"
      @close="adding = false"
      @add="addCard"
      :category="category"
    />
  </Teleport>
  <div
    class="board__col"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <h4 class="board__title">{{ TITLES[category] }}</h4>
    <span @click="adding = true" class="board__col-add">+</span>
    <div class="board__cards" v-if="cards.length">
      <Card
        v-for="card in cards"
        :key="card.id"
        :card="card"
        @dragstart="handleDragStart"
      />
    </div>
    <p v-else class="board__col-else">Пусто</p>
  </div>
</template>

<style scoped>
.board__col.drag-over {
  background-color: var(--dragOverBg);
  border-top-left-radius: var(--radius);
  border-top-right-radius: var(--radius);
  outline: 2px dashed var(--boardCol);
}

.board__col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.board__col-else {
  opacity: 0.2;
}

.board__col-add {
  margin: 5px 0 15px;
  opacity: 0.2;
  position: relative;
  width: 100%;
  text-align: center;
  cursor: pointer;
  user-select: none;
  transition: var(--smooth);
  color: var(--text);
  font-size: 24px;
  line-height: 1;
}

.board__col-add:hover {
  opacity: 0.5;
}

.board__col-add::before,
.board__col-add::after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 45%;
  height: 1px;
  background-color: var(--text);
  transition: var(--smooth);
}

.board__col-add::before {
  left: 0;
}

.board__col-add::after {
  right: 0;
}

.board__title {
  background-color: var(--boardCol);
  border-radius: var(--radius);
  padding: 7.5px;
  width: 100%;
  text-align: center;
  font-size: 20px;
  transition: var(--smooth);
}

.board__cards {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
