<script setup lang="ts">
import { ref } from 'vue'
import { useKanbanStore } from '../../../stores/kanban.store'
import type { ICard, ViewAsideProps } from '../../../utils/types'
import EditForm from '../EditForm.vue'

const props = defineProps<ViewAsideProps>()

const store = useKanbanStore()

const editing = ref(false)
const edit = (newCard: ICard) => {
  store.edit(newCard)
  editing.value = false
}

const completeFn = () => store.complete(props.card.id)
const deleteFn = () => store.delete(props.card.id)
</script>

<template>
  <Teleport to="body">
    <EditForm
      v-if="editing"
      :card="card"
      @close="editing = false"
      @edit="edit"
    />
  </Teleport>
  <div class="aside__info">
    <div class="aside__item">
      <span>Заголовок</span>
      <h5 class="aside__item-text">{{ card.title }}</h5>
    </div>
    <div class="aside__item">
      <span>Описание</span>
      <p class="aside__item-text">{{ card.descr }}</p>
    </div>
    <button v-if="!complete" @click="editing = true" class="aside__btn">
      Редактировать
    </button>
    <button v-if="!complete" @click="completeFn" class="aside__btn end">
      Завершить
    </button>
    <button
      v-if="complete"
      @click="deleteFn"
      class="aside__btn end"
      style="margin: 0"
    >
      Удалить
    </button>
  </div>
</template>

<style scoped>
.aside__info {
  padding-bottom: 25px;
  margin-bottom: 10px;
  border-bottom: 1px solid #999;
}

.aside__item {
  margin-bottom: 20px;
}

.aside__item span {
  font-size: 14px;
  border-bottom: 1px solid #999;
}

.aside__item-text {
  font-size: 20px;
  word-wrap: break-word;
}

.aside__btn {
  padding: 5px 10px;
  font-size: inherit;
  background-color: var(--text);
  color: var(--bg);
  transition: var(--smooth);
}

.aside__btn:hover {
  background-color: var(--bg);
  color: var(--text);
}

.aside__btn:active {
  transform: scale(0.9);
  transition: 0.1;
}

.aside__btn.end {
  width: 100%;
  margin-top: 25px;
  padding: 10px 0;
}
</style>
