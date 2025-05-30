<template>
  <div class="quick-actions text-center">
    <h4 class="mb-4">Snabba åtgärder</h4>
    <div class="action-buttons">
      <a :href="getPhoneLink()" class="btn btn-warning btn-lg me-3 mb-3">
        <i class="bi bi-telephone-fill me-2"></i>
        Ring & Beställ
      </a>
      <a :href="getEmailLink()" class="btn btn-outline-light btn-lg me-3 mb-3">
        <i class="bi bi-envelope me-2"></i>
        Skicka E-post
      </a>
      <a href="#meny" class="btn btn-outline-light btn-lg mb-3">
        <i class="bi bi-menu-button-wide me-2"></i>
        Se Meny
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRestaurantStore } from '../stores/restaurantStore'

const restaurantStore = useRestaurantStore()
const { getPhoneLink, getEmailLink } = restaurantStore

</script>

<style scoped>
.quick-actions {
  background: rgba(255,255,255,0.1);
  padding: 2rem;
  border-radius: 20px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

@media (max-width: 768px) {
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .action-buttons .btn {
    width: 100%;
    max-width: 300px;
  }
}

/* Desktop Enhancements */
@media (min-width: 992px) {
  .quick-actions {
    padding: 3rem;
  }

  .action-buttons {
    gap: 1.5rem;
  }

  .action-buttons .btn {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
}
</style>
