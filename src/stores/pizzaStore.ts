import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Pizza, CategoryFilter, PizzaCategory } from '../types/pizza'

export const usePizzaStore = defineStore('pizza', () => {
  // State
  const activeFilter = ref<string>('alla')

  // Categories for filtering
  const categories = ref<CategoryFilter[]>([
    { id: 'alla', name: 'Alla Pizzor', icon: 'bi bi-grid' },
    { id: 'klassiker', name: 'Klassiker', icon: 'bi bi-heart' },
    { id: 'svenska', name: 'Svenska Favoriter', icon: 'bi bi-flag' },
    { id: 'kebab', name: 'Kebabpizzor', icon: 'bi bi-fire' },
    { id: 'vegetarisk', name: 'Vegetarisk', icon: 'bi bi-flower1' }
  ])

  // Pizza data
  const pizzas = ref<Pizza[]>([
    {
      id: 1,
      name: 'Margherita',
      ingredients: 'Tomatsås, mozzarella, färsk basilika, olivolja',
      price: 145,
      category: 'klassiker',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop',
      popular: true
    },
    {
      id: 2,
      name: 'Kebabpizza',
      ingredients: 'Tomatsås, mozzarella, kebabkött, lök, tomat, isbergssallad, stark sås',
      price: 165,
      category: 'kebab',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      popular: true,
      spicy: true
    },
    {
      id: 3,
      name: 'Västkustpizza',
      ingredients: 'Tomatsås, mozzarella, räkor, kaviar, dill, rödlök',
      price: 185,
      category: 'svenska',
      image: 'https://images.unsplash.com/photo-1571407982866-54c1bee18ce5?w=400&h=300&fit=crop',
      popular: true
    },
    {
      id: 4,
      name: 'Köttbullspizza',
      ingredients: 'Tomatsås, mozzarella, köttbullar, gräddfil, lingonsylt, gurka',
      price: 175,
      category: 'svenska',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Hawaii',
      ingredients: 'Tomatsås, mozzarella, skinka, ananas',
      price: 155,
      category: 'klassiker',
      image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Vegetarisk Delight',
      ingredients: 'Tomatsås, mozzarella, paprika, champinjoner, lök, zucchini, oliver',
      price: 150,
      category: 'vegetarisk',
      image: 'https://images.unsplash.com/photo-1551182652-0d40cbddd8b9?w=400&h=300&fit=crop'
    },
    {
      id: 7,
      name: 'Calzone',
      ingredients: 'Tomatsås, mozzarella, skinka, champinjoner (inbakad)',
      price: 160,
      category: 'klassiker',
      image: 'https://images.unsplash.com/photo-1573821663912-6df460f9c684?w=400&h=300&fit=crop'
    },
    {
      id: 8,
      name: 'Janssons Pizza',
      ingredients: 'Crème fraiche, mozzarella, ansjovis, potatis, lök, dill',
      price: 170,
      category: 'svenska',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop'
    },
    {
      id: 9,
      name: 'Kebab Special',
      ingredients: 'Tomatsås, mozzarella, kebabkött, fefferoni, vitlök, extra stark sås',
      price: 175,
      category: 'kebab',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      spicy: true
    }
  ])

  // Getters
  const filteredPizzas = computed(() => {
    if (activeFilter.value === 'alla') {
      return pizzas.value
    }
    return pizzas.value.filter(pizza => pizza.category === activeFilter.value)
  })

  const popularPizzas = computed(() => {
    return pizzas.value.filter(pizza => pizza.popular)
  })

  const pizzasByCategory = computed(() => {
    return (category: PizzaCategory) => pizzas.value.filter(pizza => pizza.category === category)
  })

  const getPizzaById = computed(() => {
    return (id: number) => pizzas.value.find(pizza => pizza.id === id)
  })

  const totalPizzas = computed(() => {
    return pizzas.value.length
  })

  // Actions
  function setActiveFilter(filter: string) {
    activeFilter.value = filter
  }

  function resetFilter() {
    activeFilter.value = 'alla'
  }

  return {
    // State
    activeFilter,
    categories,
    pizzas,

    // Getters
    filteredPizzas,
    popularPizzas,
    pizzasByCategory,
    getPizzaById,
    totalPizzas,

    // Actions
    setActiveFilter,
    resetFilter
  }
})
