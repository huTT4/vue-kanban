import { defineStore } from 'pinia'
import type { CardCategory, ICard } from '../utils/types'

const defaultValue = {
  dragState: {
    card: null as ICard | null,
    sourceCategory: null as CardCategory | null,
  },
}

export const useDragStore = defineStore('drag', {
  state: () => defaultValue,
  actions: {
    startDrag(card: ICard, category: CardCategory) {
      this.dragState.card = card
      this.dragState.sourceCategory = category
    },
    endDrag() {
      this.dragState.card = null
      this.dragState.sourceCategory = null
    },
  },
})
