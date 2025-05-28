// Types for pizza data
export interface Pizza {
  id: number
  name: string
  ingredients: string
  price: number
  category: PizzaCategory
  image: string
  popular?: boolean
  spicy?: boolean
}

export type PizzaCategory = 'klassiker' | 'svenska' | 'kebab' | 'vegetarisk'

export interface CategoryFilter {
  id: string
  name: string
  icon: string
}
