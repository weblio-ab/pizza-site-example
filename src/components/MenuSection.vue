<template>
  <section id="meny" class="section bg-warm">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5">
          <h2 class="display-4 fw-bold text-primary mb-4">Vår Meny</h2>
          <p class="lead">
            Upptäck våra traditionella pizzor med svensk touch.
            Alla pizzor bakas i vedeldad ugn med färska ingredienser.
          </p>
        </div>
      </div>

      <!-- Filter Buttons -->
      <PizzaFilterButtons />

      <!-- Pizza Grid -->
      <div class="row g-4">
        <div
          v-for="pizza in filteredPizzas"
          :key="pizza.id"
          class="col-md-6 col-lg-4 mb-4"
        >
          <div class="pizza-card h-100">
            <div class="pizza-image">
              <img :src="pizza.image" :alt="pizza.name" class="img-fluid">
              <div class="pizza-overlay">
                <span class="price-badge">{{ pizza.price }} kr</span>
              </div>
            </div>
            <div class="pizza-content">
              <h5 class="pizza-name">{{ pizza.name }}</h5>
              <p class="pizza-ingredients">{{ pizza.ingredients }}</p>
              <div class="pizza-footer">
                <span class="price fw-bold text-primary">{{ pizza.price }} kr</span>
                <div class="pizza-tags">
                  <span v-if="pizza.popular" class="badge bg-warning text-dark">
                    <i class="bi bi-star-fill"></i> Populär
                  </span>
                  <span v-if="pizza.spicy" class="badge bg-danger">
                    <i class="bi bi-fire"></i> Stark
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="row mt-5">
        <div class="col-12 text-center">
          <div class="menu-cta">
            <h4 class="mb-3">Redo att beställa?</h4>
            <p class="mb-4">Ring oss eller kom förbi för att njuta av våra pizzor!</p>
            <a href="tel:08555123445" class="btn btn-primary btn-lg me-3">
              <i class="bi bi-telephone-fill me-2"></i>
              Beställ: 08-555 123 45
            </a>
            <a href="#kontakt" class="btn btn-outline-primary btn-lg">
              <i class="bi bi-geo-alt me-2"></i>
              Hitta hit
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePizzaStore } from '../stores/pizzaStore'
import PizzaFilterButtons from './PizzaFilterButtons.vue'

const pizzaStore = usePizzaStore()

// Use storeToRefs to maintain reactivity for state and getters
const { filteredPizzas } = storeToRefs(pizzaStore)
</script>

<style scoped>
.pizza-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pizza-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.pizza-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.pizza-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.pizza-card:hover .pizza-image img {
  transform: scale(1.05);
}

.pizza-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.price-badge {
  background: var(--warm-red);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.1rem;
}

.pizza-content {
  padding: 1.5rem;
}

.pizza-name {
  color: var(--primary-brown);
  font-weight: bold;
  margin-bottom: 0.75rem;
}

.pizza-ingredients {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.pizza-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.25rem;
}

.pizza-tags {
  display: flex;
  gap: 0.5rem;
}

.pizza-tags .badge {
  font-size: 0.75rem;
}

.menu-cta {
  background: linear-gradient(135deg, var(--primary-brown), var(--dark-brown));
  color: white;
  padding: 3rem;
  border-radius: 20px;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .pizza-content {
    padding: 1rem;
  }

  .menu-cta {
    padding: 2rem 1rem;
  }

  .menu-cta .btn {
    margin: 0.5rem;
    width: 100%;
  }
}

/* Desktop Enhancements */
@media (min-width: 992px) {
  .pizza-card {
    height: 100%;
    min-height: 450px;
  }

  .pizza-image {
    height: 280px;
  }

  .pizza-content {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    height: calc(100% - 280px);
  }

  .pizza-ingredients {
    flex-grow: 1;
    margin-bottom: 1.5rem;
  }

  .menu-cta {
    padding: 4rem;
    margin-top: 4rem;
  }

  .menu-cta h4 {
    font-size: 2rem;
  }

  .menu-cta p {
    font-size: 1.2rem;
  }
}
</style>
