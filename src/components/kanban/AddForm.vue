<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { v4 as uuid } from 'uuid'
import type { CardCategory, ICard } from '../../utils/types'
import { useAuthStore } from '../../stores/auth.store'

const emits = defineEmits(['close', 'add'])
const props = defineProps<{ category: CardCategory }>()

// Focus logic
const titleInput = ref<HTMLInputElement | null>(null)
onMounted(() => titleInput.value?.focus())

// Adding logic
const auth = useAuthStore()

const newCard: ICard = reactive({
  title: '',
  descr: '',
  id: '',
  comments: [],
  category: props.category,
  user_id: auth.user_id,
})

const add = () => {
  if (newCard.title.length && newCard.descr.length) {
    newCard.id = uuid()
    emits('add', newCard)
  }
}

const close = async () => {
  isActive.value = false
  await new Promise((resolve) => setTimeout(resolve, 250))
  emits('close')
}

// Smooth
const isActive = ref(false)
onMounted(() => (isActive.value = true))
</script>

<template>
  <div @click="close" class="overlay" :class="{ active: isActive }"></div>
  <form class="form" :class="{ active: isActive }" @submit.prevent="add">
    <h4 class="form__title">Создание новой карточки</h4>
    <input
      class="form__input"
      type="text"
      placeholder="Введите заголовок"
      v-model="newCard.title"
      ref="titleInput"
    />
    <textarea
      class="form__input textarea"
      type="text"
      placeholder="Введите описание"
      v-model="newCard.descr"
    />
    <button class="form__btn">Добавить</button>
  </form>
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

.form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  background-color: var(--bgForm);
  border-radius: var(--radius);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 450px;
  transition: var(--smooth) ease-out;
  opacity: 0.5;
}

.form.active {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

.form__title {
  font-size: 32px;
}

.form__input,
.form__btn {
  border-radius: var(--radius);
  padding: 10px 15px;
  font-size: inherit;
  font-weight: inherit;
  background-color: var(--bgInputForm);
  color: var(--text);
}

.form__input:focus {
  border: 3px solid var(--bgInputForm);
}

.form__input.textarea {
  min-width: 100%;
  max-width: 100%;
  min-height: 200px;
  max-height: 200px;
}

.form__btn {
  font-size: 18px;
  transition: var(--smooth);
}

.form__btn:hover {
  background-color: var(--bgInputFormHover);
}

.form__btn:active {
  transform: scale(0.95);
  transition: 0.2s;
}
</style>
