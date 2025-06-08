export type CardCategory = 'queue' | 'work' | 'review' | 'done'

export interface IComment {
  text: string
  id: string
  time: number
}

export interface ICard {
  title: string
  descr: string
  category: CardCategory
  id: string
  comments: IComment[]
  user_id: string
}

export interface CardProps {
  card: {
    title: string
    descr: string
    id: string
    comments: IComment[]
  }
}

export interface Auth {
  login: string
  password: string
}

export interface ViewAsideProps extends CardProps {
  complete?: boolean
}
