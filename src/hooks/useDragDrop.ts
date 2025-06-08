import { useDragStore } from '../stores/drag.store'
import { useKanbanStore } from '../stores/kanban.store'
import type { CardCategory, ICard } from '../utils/types'

export function useDragDrop(props: { category: CardCategory }) {
  const store = useKanbanStore()

  const drag = useDragStore()

  const handleDragStart = (card: ICard) => drag.startDrag(card, props.category)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    const { currentTarget } = e
    if (currentTarget instanceof HTMLElement) {
      currentTarget?.classList.add('drag-over')
    }
  }

  const handleDragLeave = (e: DragEvent) => {
    const { currentTarget } = e
    if (currentTarget instanceof HTMLElement) {
      currentTarget?.classList.remove('drag-over')
    }
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    const { currentTarget } = e
    if (currentTarget instanceof HTMLElement) {
      currentTarget?.classList.remove('drag-over')
    }

    const { card, sourceCategory } = drag.dragState
    if (card && sourceCategory !== props.category) {
      store.changeCategory(card.id, props.category)
    }
    drag.endDrag()
  }

  return {
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  }
}
