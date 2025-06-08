<script setup lang="ts">
import dayjs from 'dayjs'

interface Props {
  comment: {
    time: number
    text: string
  }
}

defineProps<Props>()
</script>

<template>
  <li class="aside__comments-item">
    <span>
      {{ dayjs(comment.time).format('DD MMMM YYYY HH:mm') }}
    </span>
    <p>{{ comment.text }}</p>
  </li>
</template>

<style scoped>
.aside__comments-item {
  background-color: var(--bgComment);
  border-radius: var(--radius);
  padding: 5px 10px;
}

.aside__comments-item span {
  font-size: 10px;
  opacity: 0.8;
}
</style>
