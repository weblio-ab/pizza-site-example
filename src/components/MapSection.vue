<template>
  <div class="map-section">
    <h3 class="h4 mb-4 text-center">
      <i class="bi bi-map me-2"></i>
      Hitta till oss
    </h3>
    <div class="map-placeholder">
      <div class="map-overlay">
        <div class="map-content">
          <i class="bi bi-geo-alt-fill text-warning fs-1 mb-3"></i>
          <h5>{{ getFullAddress() }}</h5>
          <p class="mb-3">
            Vi ligger mitt i hjärtat av Gamla Stan, bara några steg från
            Stortorget och nära Kungliga Slottet.
          </p>
          <div class="transport-info">
            <div class="transport-item">
              <i class="bi bi-train-front"></i>
              <span>T-bana: Gamla Stan (blå linjen)</span>
            </div>
            <div class="transport-item">
              <i class="bi bi-bus-front"></i>
              <span>Buss: Hållplats Slottsbacken</span>
            </div>
            <div class="transport-item">
              <i class="bi bi-p-square"></i>
              <span>Parkering: Parkeringshus Q-Park Slussen</span>
            </div>
          </div>
          <a
            :href="googleMapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-warning btn-lg mt-3"
          >
            <i class="bi bi-map me-2"></i>
            Öppna i Google Maps
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRestaurantStore } from '../stores/restaurantStore'

const restaurantStore = useRestaurantStore()
const { getFullAddress } = restaurantStore

// Generate Google Maps URL dynamically from store data
const googleMapsUrl = computed(() => {
  const address = getFullAddress()
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`
})
</script>

<style scoped>
.map-section {
  background: rgba(0,0,0,0.2);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
}

.map-placeholder {
  height: 600px;
  background: linear-gradient(135deg, var(--primary-brown), var(--warm-red));
  border-radius: 15px;
  position: relative;
  overflow: hidden;
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-content {
  text-align: center;
  color: white;
  padding: 2rem;
}

.transport-info {
  text-align: left;
  max-width: 300px;
  margin: 0 auto;
}

.transport-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.transport-item i {
  margin-right: 0.75rem;
  width: 20px;
  color: var(--beige);
}

@media (max-width: 768px) {
  .map-content {
    padding: 1rem;
  }
}

/* Desktop Enhancements */
@media (min-width: 992px) {
  .map-section {
    padding: 3rem;
  }

  .map-placeholder {
    height: 400px;
  }
}
</style>
