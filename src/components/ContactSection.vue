<template>
  <section id="kontakt" class="section bg-dark-brown text-white">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5">
          <h2 class="display-4 fw-bold mb-4">Kontakta Oss</h2>
          <p class="lead">
            Besök oss i hjärtat av Gamla Stan eller ring för beställning och information.
          </p>
        </div>
      </div>

      <div class="row">
        <!-- Contact Information -->
        <div class="col-lg-6 mb-5">
          <div class="contact-info">
            <h3 class="h4 mb-4">
              <i class="bi bi-info-circle me-2"></i>
              Kontaktinformation
            </h3>

            <div class="contact-item mb-4">
              <div class="contact-icon">
                <i class="bi bi-geo-alt-fill"></i>
              </div>
              <div class="contact-details">
                <h5>Adress</h5>
                <p>
                  {{ restaurantInfo.contact.address.street }}<br>
                  {{ restaurantInfo.contact.address.postalCode }} {{ restaurantInfo.contact.address.city }}<br>
                  <small class="text-warning">Mitt i {{ restaurantInfo.contact.address.district }}</small>
                </p>
              </div>
            </div>

            <div class="contact-item mb-4">
              <div class="contact-icon">
                <i class="bi bi-telephone-fill"></i>
              </div>
              <div class="contact-details">
                <h5>Telefon</h5>
                <p>
                  <a :href="restaurantInfo.contact.phone.href" class="text-warning text-decoration-none fw-bold">
                    {{ restaurantInfo.contact.phone.number }}
                  </a><br>
                  <small>{{ restaurantInfo.contact.phone.description }}</small>
                </p>
              </div>
            </div>

            <div class="contact-item mb-4">
              <div class="contact-icon">
                <i class="bi bi-envelope-fill"></i>
              </div>
              <div class="contact-details">
                <h5>E-post</h5>
                <p>
                  <a :href="`mailto:${restaurantInfo.contact.email.address}`" class="text-warning text-decoration-none">
                    {{ restaurantInfo.contact.email.address }}
                  </a><br>
                  <small>{{ restaurantInfo.contact.email.description }}</small>
                </p>
              </div>
            </div>

            <!-- Social Media -->
            <div class="social-media mt-4">
              <h5 class="mb-3">Följ oss</h5>
              <div class="social-links">
                <a
                  v-for="social in restaurantInfo.socialMedia"
                  :key="social.name"
                  :href="social.url"
                  class="social-link me-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i :class="['bi', social.icon]"></i>
                  <span>{{ social.name }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Opening Hours -->
        <div class="col-lg-6">
          <OpeningHours />
        </div>
      </div>

      <!-- Map Section -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="map-section">
            <h3 class="h4 mb-4 text-center">
              <i class="bi bi-map me-2"></i>
              Hitta till oss
            </h3>
            <div class="map-placeholder">
              <div class="map-overlay">
                <div class="map-content">
                  <i class="bi bi-geo-alt-fill text-warning fs-1 mb-3"></i>
                  <h5>Västerlånggatan 15, Gamla Stan</h5>
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
                    href="https://maps.google.com/?q=Västerlånggatan+15,+Stockholm"
                    target="_blank"
                    class="btn btn-warning btn-lg mt-3"
                  >
                    <i class="bi bi-map me-2"></i>
                    Öppna i Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="quick-actions text-center">
            <h4 class="mb-4">Snabba åtgärder</h4>
            <div class="action-buttons">
              <a :href="restaurantInfo.contact.phone.href" class="btn btn-warning btn-lg me-3 mb-3">
                <i class="bi bi-telephone-fill me-2"></i>
                Ring & Beställ
              </a>
              <a :href="`mailto:${restaurantInfo.contact.email.address}`" class="btn btn-outline-light btn-lg me-3 mb-3">
                <i class="bi bi-envelope me-2"></i>
                Skicka E-post
              </a>
              <a href="#meny" class="btn btn-outline-light btn-lg mb-3">
                <i class="bi bi-menu-button-wide me-2"></i>
                Se Meny
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import OpeningHours from './OpeningHours.vue'
import { useRestaurantStore } from '../stores/restaurantStore'

const restaurantStore = useRestaurantStore()
const { restaurantInfo } = restaurantStore
</script>

<style scoped>
.contact-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  transition: background 0.3s ease;
}

.contact-item:hover {
  background: rgba(255,255,255,0.15);
}

.contact-icon {
  background: var(--warm-red);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
}

.contact-icon i {
  font-size: 1.25rem;
}

.contact-details h5 {
  color: var(--beige);
  margin-bottom: 0.5rem;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  color: var(--beige);
  text-decoration: none;
  padding: 0.5rem 1rem;
  background: rgba(255,255,255,0.1);
  border-radius: 50px;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--warm-red);
  color: white;
  transform: translateY(-2px);
}

.social-link i {
  margin-right: 0.5rem;
  font-size: 1.25rem;
}

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
  .contact-item {
    flex-direction: column;
    text-align: center;
  }

  .contact-icon {
    margin: 0 auto 1rem auto;
  }

  .social-links {
    justify-content: center;
  }

  .map-content {
    padding: 1rem;
  }

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
  .contact-info {
    padding: 2rem;
    background: rgba(0,0,0,0.1);
    border-radius: 20px;
    height: 100%;
  }

  .contact-item {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .contact-icon {
    width: 60px;
    height: 60px;
  }

  .contact-icon i {
    font-size: 1.5rem;
  }

  .map-section {
    padding: 3rem;
  }

  .map-placeholder {
    height: 400px;
  }

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
