<script setup lang="ts">
import { useComments } from '../../../hooks/useComments'
import Comment from './Comment.vue'
import type { ViewAsideProps } from '../../../utils/types'

const props = defineProps<ViewAsideProps>()

const { commentsContainer, commentText, addComment } = useComments(props)
</script>

<template>
  <div class="aside__comments">
    <h4 class="aside__comments-title">Комментарии:</h4>
    <ul ref="commentsContainer" class="aside__comments-content">
      <Comment v-for="comment in card.comments" :comment="comment" />
    </ul>
    <form
      v-if="!complete"
      class="aside__comments-control"
      @submit.prevent="addComment"
    >
      <input
        v-model="commentText"
        type="text"
        placeholder="Введите комментарий . . ."
      />
      <button type="submit" class="aside__btn">Добавить</button>
    </form>
  </div>
</template>

<style scoped>
.aside__comments {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.aside__comments h4 {
  font-size: 24px;
  margin-bottom: 16px;
}

.aside__comments-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
}

.aside__comments-content::-webkit-scrollbar {
  width: 8px;
}

.aside__comments-content::-webkit-scrollbar-track {
  background: var(--bgScroll);
  border-radius: var(--radius);
}

.aside__comments-content::-webkit-scrollbar-thumb {
  background-color: var(--bgScrollThumb);
  border-radius: var(--radius);
}

.aside__comments-control {
  position: static;
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: var(--bgForm);
  margin-top: 15px;
}

.aside__comments-control input {
  font-size: inherit;
  padding: 10px;
  width: 100%;
  margin-right: 15px;
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
