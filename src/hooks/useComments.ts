import { onMounted, ref } from 'vue'
import type { CardProps, IComment } from '../utils/types'
import { v4 as uuid } from 'uuid'
import { useKanbanStore } from '../stores/kanban.store'

interface Props extends CardProps {
  complete?: boolean
}

export function useComments(props: Props) {
  const store = useKanbanStore()
  const commentText = ref('')
  const commentsContainer = ref<HTMLUListElement | null>(null)

  const scrollToBottom = () => {
    if (commentsContainer.value) {
      commentsContainer.value.scrollTo({
        top: commentsContainer.value.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  onMounted(scrollToBottom)

  const addComment = async () => {
    if (commentText.value.trim().length) {
      const comment: IComment = {
        text: commentText.value,
        id: uuid(),
        time: Date.now(),
      }
      await store.addComment(props.card.id, comment)
      commentText.value = ''

      scrollToBottom()
    }
  }

  return {
    commentsContainer,
    commentText,
    addComment,
  }
}
