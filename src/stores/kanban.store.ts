import { defineStore } from 'pinia'
import { type CardCategory, type ICard, type IComment } from '../utils/types'
import type { UUIDTypes } from 'uuid'
import { supabase } from '../utils/supabase'
import { useAuthStore } from './auth.store'

interface ICards {
  cards: ICard[]
  completeCards: ICard[]
}

const defaultValue: ICards = {
  cards: [],
  completeCards: [],
}

export const useKanbanStore = defineStore('kanban', {
  state: () => defaultValue,
  getters: {
    getQueue: (state) =>
      state.cards.filter((card) => card.category === 'queue'),
    getWork: (state) => state.cards.filter((card) => card.category === 'work'),
    getReview: (state) =>
      state.cards.filter((card) => card.category === 'review'),
    getDone: (state) => state.cards.filter((card) => card.category === 'done'),
  },
  actions: {
    async loadCards() {
      try {
        await useAuthStore().initialize()
        const { data, error } = await supabase
          .from('cards')
          .select()
          .eq('user_id', useAuthStore().user_id)
        if (error) throw error
        this.cards = data
      } catch (error) {
        console.error('Ошибка при загрузке карточек:', error)
      }
    },
    async loadCompleteCards() {
      try {
        await useAuthStore().initialize()
        const { data, error } = await supabase
          .from('completeCards')
          .select()
          .eq('user_id', useAuthStore().user_id)
        if (error) throw error
        this.completeCards = data
      } catch (error) {
        console.error('Ошибка при загрузке завершенных карточек:', error)
      }
    },
    async add(card: ICard) {
      try {
        const { error } = await supabase.from('cards').insert(card)
        if (error) throw error
        this.cards.push(card)
      } catch (error) {
        console.error('Ошибка при добавлении карточки:', error)
      }
    },
    async edit(card: ICard) {
      try {
        const { error } = await supabase
          .from('cards')
          .update({ title: card.title, descr: card.descr })
          .eq('id', card.id)
        if (error) throw error
        this.cards = this.cards.map((c) =>
          c.id === card.id ? { ...c, ...card } : c
        )
      } catch (error) {
        console.error('Ошибка при редактировании карточки:', error)
      }
    },
    async addComment(id: UUIDTypes, comment: IComment) {
      try {
        const card = this.cards.find((c) => c.id === id)
        if (!card) throw new Error(`Карточка с id-"${id}" не найдена`)
        const newComments = [...card.comments, comment]
        const { error } = await supabase
          .from('cards')
          .update({ comments: newComments })
          .eq('id', id)
        if (error) throw error
        card?.comments.push(comment)
      } catch (error) {
        console.error('Ошибка при добавлении комментария:', error)
      }
    },
    async changeCategory(id: UUIDTypes, newCategory: CardCategory) {
      try {
        const { error } = await supabase
          .from('cards')
          .update({ category: newCategory })
          .eq('id', id)
        if (error) throw error
        this.cards = this.cards.map((c) =>
          c.id === id ? { ...c, category: newCategory } : c
        )
      } catch (error) {
        console.error('Ошибка при изменении категории:', error)
      }
    },
    async complete(id: UUIDTypes) {
      try {
        const { error } = await supabase.from('cards').delete().eq('id', id)
        if (error) throw error
        try {
          const card = this.cards.find((c) => c.id === id)
          const { error } = await supabase.from('completeCards').insert(card)
          if (error) throw error
          if (card) {
            this.completeCards.push(card)
          }
          this.cards = this.cards.filter((c) => c.id !== id)
        } catch (error) {
          console.error(
            'Ошибка при завершении карточки (добавление в completeCards):',
            error
          )
        }
      } catch (error) {
        console.error(
          'Ошибка при завершении карточки (удаление из cards):',
          error
        )
      }
    },
    async delete(id: UUIDTypes) {
      try {
        const { error } = await supabase
          .from('completeCards')
          .delete()
          .eq('id', id)
        if (error) throw error
        this.completeCards = this.completeCards.filter((c) => c.id !== id)
      } catch (error) {
        console.error('Ошибка при удалении карточки:', error)
      }
    },
  },
})
