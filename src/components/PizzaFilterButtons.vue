<template>
  <div class="row mb-5">
    <div class="col-12 text-center">
      <div class="filter-buttons">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="setActiveFilter(category.id)"
          :class="['btn', 'filter-btn', activeFilter === category.id ? 'active' : '']"
        >
          <i :class="category.icon"></i>
          {{ category.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePizzaStore } from '../stores/pizzaStore'

const pizzaStore = usePizzaStore()

// Use storeToRefs to maintain reactivity for state and getters
const { activeFilter, categories } = storeToRefs(pizzaStore)

// Actions can be destructured normally since they don't need reactivity
const { setActiveFilter } = pizzaStore
</script>

<style scoped>
.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.filter-btn {
  background: white;
  border: 2px solid var(--primary-brown);
  color: var(--primary-brown);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.filter-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s ease;
}

.filter-btn:hover::before {
  left: 100%;
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--primary-brown);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(139, 69, 19, 0.3);
}

@media (max-width: 768px) {
  .filter-buttons {
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

/* Desktop Enhancements */
@media (min-width: 992px) {
  .filter-buttons {
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .filter-btn {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
}
</style>
