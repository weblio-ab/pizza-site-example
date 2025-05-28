<template>
  <div class="popular-pizzas-widget p-4 bg-light rounded">
    <h5 class="mb-3">
      <i class="bi bi-star-fill text-warning me-2"></i>
      Populära Pizzor
    </h5>
    <div class="row g-2">
      <div
        v-for="pizza in popularPizzas"
        :key="pizza.id"
        class="col-12"
      >
        <div class="d-flex align-items-center p-2 bg-white rounded border">
          <img
            :src="pizza.image"
            :alt="pizza.name"
            class="rounded me-3"
            style="width: 60px; height: 60px; object-fit: cover;"
          >
          <div class="flex-grow-1">
            <h6 class="mb-1">{{ pizza.name }}</h6>
            <small class="text-muted">{{ pizza.category }}</small>
          </div>
          <span class="fw-bold text-primary">{{ pizza.price }} kr</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePizzaStore } from '../stores/pizzaStore'

const pizzaStore = usePizzaStore()
const { popularPizzas } = storeToRefs(pizzaStore)
</script>

<style scoped>
.popular-pizzas-widget {
  max-width: 400px;
}
</style>
