<template>
  <section id="hem" class="hero-section">
    <div class="hero-overlay"></div>
    <div class="container">
      <div class="row align-items-center min-vh-100">
        <div class="col-lg-8 mx-auto text-center text-white">
          <h1 class="display-2 fw-bold mb-4">
            Välkommen till<br>
            <span class="text-warning">{{ restaurantInfo.name }}</span>
          </h1>
          <p class="lead mb-4 fs-4">
            {{ restaurantInfo.description }}
          </p>
          <div class="hero-buttons mb-5">
            <a href="#meny" class="btn btn-primary btn-lg me-3 mb-3">
              <i class="bi bi-menu-button-wide me-2"></i>
              Se vår meny
            </a>
            <a :href="restaurantInfo.contact.phone.href" class="btn btn-outline-light btn-lg mb-3">
              <i class="bi bi-telephone-fill me-2"></i>
              Beställ nu
            </a>
          </div>

          <div class="opening-hours-card">
            <h5 class="mb-3">
              <i class="bi bi-clock me-2"></i>
              Öppettider
            </h5>
            <div class="row text-start">
              <div class="col-md-6">
                <div v-for="dayGroup in groupedHours" :key="dayGroup.label">
                  <p class="mb-1"><strong>{{ dayGroup.label }}:</strong></p>
                  <p class="mb-3">{{ dayGroup.hours }}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="current-status mt-3">
                  <span class="badge" :class="openingStatus.isOpen ? 'bg-success' : 'bg-danger'">
                    <i class="bi" :class="openingStatus.isOpen ? 'bi-check-circle' : 'bi-x-circle'"></i>
                    {{ openingStatus.statusText }}
                  </span>
                  <p class="small mt-2 mb-0">{{ openingStatus.nextStatusMessage }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useOpeningHoursStore } from '../stores/openingHoursStore'
import { useRestaurantStore } from '../stores/restaurantStore'

const openingHoursStore = useOpeningHoursStore()
const restaurantStore = useRestaurantStore()

// Use storeToRefs only for reactive computed properties
const { openingStatus } = storeToRefs(openingHoursStore)

// Static data and methods can be destructured normally
const { weeklyHours, formatTimeRange } = openingHoursStore
const { restaurantInfo } = restaurantStore

// Group hours for display
const groupedHours = computed(() => {
  const hours = weeklyHours
  const mondayThursday = hours.slice(0, 4) // Monday-Thursday
  const fridaySaturday = hours.slice(4, 6) // Friday-Saturday
  const sunday = hours[6] // Sunday

  return [
    {
      label: 'Måndag-Torsdag',
      hours: formatTimeRange(mondayThursday[0].openTime, mondayThursday[0].closeTime)
    },
    {
      label: 'Fredag-Lördag',
      hours: formatTimeRange(fridaySaturday[0].openTime, fridaySaturday[0].closeTime)
    },
    {
      label: 'Söndag',
      hours: formatTimeRange(sunday.openTime, sunday.closeTime)
    }
  ]
})
</script>

<style scoped>
.hero-section {
  background-color: #8B4513;
  padding-top: 100px;
  min-height: 100vh;
}

.container {
  position: relative;
  z-index: 2;
}

/* Desktop enhancements */
@media (min-width: 1400px) {
  .hero-section {
    padding-top: 140px;
    min-height: 100vh;
  }

  .display-2 {
    font-size: 5.5rem;
    line-height: 1.1;
    margin-bottom: 2rem;
  }

  .lead {
    font-size: 1.8rem;
    max-width: 900px;
    margin: 0 auto 4rem auto;
  }

  .opening-hours-card {
    padding: 3.5rem;
    max-width: 700px;
  }

  .hero-buttons .btn {
    min-width: 250px;
    padding: 1.25rem 2.5rem;
    font-size: 1.2rem;
  }
}

@media (min-width: 1200px) {
  .hero-section {
    padding-top: 120px;
  }

  .display-2 {
    font-size: 4.5rem;
    line-height: 1.1;
  }

  .lead {
    font-size: 1.5rem;
    max-width: 800px;
    margin: 0 auto 3rem auto;
  }
}

@media (min-width: 992px) {
  .hero-buttons {
    margin-bottom: 4rem;
  }

  .hero-buttons .btn {
    margin: 0 1rem;
    min-width: 220px;
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
}

.opening-hours-card {
  background: rgba(0,0,0,0.8);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255,193,7,0.3);
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}

.hero-buttons .btn {
  min-width: 200px;
  border-radius: 50px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.hero-buttons .btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
}

.current-status .badge {
  font-size: 1.1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
}

@media (max-width: 768px) {
  .hero-section {
    background-attachment: scroll;
    padding-top: 80px;
    min-height: 90vh;
  }

  .display-2 {
    font-size: 2.5rem;
  }

  .lead {
    font-size: 1.2rem;
  }

  .opening-hours-card {
    padding: 1.5rem;
  }

  .hero-buttons .btn {
    min-width: 180px;
    margin: 0.5rem;
    display: block;
    width: 100%;
    max-width: 300px;
  }
}
</style>
