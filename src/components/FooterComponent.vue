<template>
  <footer class="bg-primary text-white">
    <div class="container">
      <!-- Main Footer Content -->
      <div class="row py-5">
        <div class="col-lg-4 mb-4">
          <div class="footer-section">
            <h5 class="fw-bold mb-3">
              <i class="bi bi-shop me-2"></i>
              Gamla Stan Pizzeria
            </h5>
            <p class="mb-3">
              Sedan 1985 har vi serverat äkta pizza med svensk touch i hjärtat av Stockholm.
              Välkommen till vår mysiga pub-miljö där alla känner sig hemma.
            </p>
            <div class="social-links">
              <a href="#" class="social-icon me-3" title="Facebook">
                <i class="bi bi-facebook"></i>
              </a>
              <a href="#" class="social-icon me-3" title="Instagram">
                <i class="bi bi-instagram"></i>
              </a>
              <a href="#" class="social-icon me-3" title="Google">
                <i class="bi bi-google"></i>
              </a>
              <a href="#" class="social-icon" title="TripAdvisor">
                <i class="bi bi-geo-alt"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="col-lg-2 col-md-6 mb-4">
          <div class="footer-section">
            <h6 class="fw-bold mb-3">Navigation</h6>
            <ul class="list-unstyled footer-links">
              <li><a href="#hem">Hem</a></li>
              <li><a href="#meny">Meny</a></li>
              <li><a href="#kontakt">Kontakt</a></li>
            </ul>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-4">
          <div class="footer-section">
            <h6 class="fw-bold mb-3">Kontaktinfo</h6>
            <div class="contact-info">
              <p class="mb-2">
                <i class="bi bi-geo-alt me-2"></i>
                Västerlånggatan 15<br>
                111 29 Stockholm
              </p>
              <p class="mb-2">
                <i class="bi bi-telephone me-2"></i>
                <a href="tel:08555123445" class="text-white text-decoration-none">
                  08-555 123 45
                </a>
              </p>
              <p class="mb-2">
                <i class="bi bi-envelope me-2"></i>
                <a href="mailto:info@gamlastanpizzeria.se" class="text-white text-decoration-none">
                  info@gamlastanpizzeria.se
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="col-lg-3 mb-4">
          <div class="footer-section">
            <h6 class="fw-bold mb-3">Öppettider</h6>
            <div class="opening-hours-summary">
              <div v-for="dayGroup in groupedHours" :key="dayGroup.label">
                <p class="mb-1">
                  <strong>{{ dayGroup.label }}:</strong> {{ dayGroup.hours }}
                </p>
              </div>
              <div class="status-badge mt-3" :class="openingStatus.isOpen ? 'open' : 'closed'">
                <i class="bi" :class="openingStatus.isOpen ? 'bi-check-circle' : 'bi-x-circle'"></i>
                {{ openingStatus.statusText }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="row py-3 border-top border-secondary">
        <div class="col-md-6 text-center text-md-start">
          <p class="mb-0 small">
            &copy; {{ currentYear }} Gamla Stan Pizzeria. Alla rättigheter förbehållna.
          </p>
        </div>
        <div class="col-md-6 text-center text-md-end">
          <div class="footer-links-inline">
            <a href="#" class="small me-3">Integritetspolicy</a>
            <a href="#" class="small me-3">Användarvillkor</a>
            <a href="#" class="small">Cookies</a>
          </div>
        </div>
      </div>

      <!-- Back to Top Button -->
      <div class="back-to-top">
        <button
          @click="scrollToTop"
          class="btn btn-warning btn-floating"
          :class="{ 'visible': showBackToTop }"
        >
          <i class="bi bi-arrow-up"></i>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useOpeningHoursStore } from '../stores/openingHoursStore'

const openingHoursStore = useOpeningHoursStore()

// Use storeToRefs to maintain reactivity for state and getters
const { weeklyHours, openingStatus } = storeToRefs(openingHoursStore)

// Actions can be destructured normally since they don't need reactivity
const { startTimeUpdater, formatTimeRange } = openingHoursStore

const email = ref('')
const currentYear = new Date().getFullYear()
const showBackToTop = ref(false)

// Group hours for display
const groupedHours = computed(() => {
  const hours = weeklyHours.value
  const mondayThursday = hours.slice(0, 4) // Monday-Thursday
  const fridaySaturday = hours.slice(4, 6) // Friday-Saturday
  const sunday = hours[6] // Sunday

  return [
    {
      label: 'Mån-Tors',
      hours: formatTimeRange(mondayThursday[0].openTime, mondayThursday[0].closeTime)
    },
    {
      label: 'Fre-Lör',
      hours: formatTimeRange(fridaySaturday[0].openTime, fridaySaturday[0].closeTime)
    },
    {
      label: 'Söndag',
      hours: formatTimeRange(sunday.openTime, sunday.closeTime)
    }
  ]
})

const subscribeNewsletter = () => {
  if (email.value) {
    alert(`Tack för din prenumeration, ${email.value}! Vi skickar vårt nästa nyhetsbrev inom kort.`)
    email.value = ''
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

let timeUpdateInterval: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  // Start the time updater when component mounts
  timeUpdateInterval = startTimeUpdater()

  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  // Clean up the interval when component unmounts
  if (timeUpdateInterval) {
    clearInterval(timeUpdateInterval)
  }

  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.footer-section h5,
.footer-section h6 {
  color: var(--beige);
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--beige);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.1);
  color: white;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: var(--warm-red);
  color: white;
  transform: translateY(-2px);
}

.contact-info p {
  margin-bottom: 0.75rem;
  color: rgba(255,255,255,0.9);
}

.contact-info i {
  color: var(--beige);
  width: 20px;
}

.opening-hours-summary p {
  color: rgba(255,255,255,0.9);
  font-size: 0.9rem;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge.open {
  background: rgba(40, 167, 69, 0.2);
  color: #28a745;
  border: 1px solid #28a745;
}

.status-badge.closed {
  background: rgba(220, 53, 69, 0.2);
  color: #dc3545;
  border: 1px solid #dc3545;
}

.status-badge i {
  margin-right: 0.5rem;
}

.newsletter-form .form-control {
  border: none;
  border-radius: 50px 0 0 50px;
}

.newsletter-form .btn {
  border-radius: 0 50px 50px 0;
  border: none;
  color: var(--text-dark);
  font-weight: 600;
}

.footer-links-inline a {
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links-inline a:hover {
  color: var(--beige);
}

.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

.btn-floating {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.btn-floating.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.btn-floating:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.4);
}

@media (max-width: 768px) {
  .footer-section {
    text-align: center;
    margin-bottom: 2rem;
  }

  .social-links {
    justify-content: center;
  }

  .newsletter-form {
    flex-direction: column;
    gap: 1rem;
  }

  .newsletter-form .form-control,
  .newsletter-form .btn {
    border-radius: 50px;
    width: 100%;
  }

  .footer-links-inline {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .back-to-top {
    bottom: 1rem;
    right: 1rem;
  }

  .btn-floating {
    width: 45px;
    height: 45px;
  }
}

/* Desktop Enhancements */
@media (min-width: 992px) {
  .footer-section {
    padding: 1.5rem;
  }

  .footer-section h5 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .footer-section h6 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  .footer-section p {
    font-size: 1rem;
    line-height: 1.6;
  }

  .social-links {
    margin-top: 2rem;
  }

  .social-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }

  .contact-info {
    font-size: 1rem;
  }

  .opening-hours-summary {
    font-size: 1rem;
  }

  .status-badge {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }

  .newsletter-form {
    max-width: 500px;
  }

  .newsletter-form .form-control {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }

  .newsletter-form .btn {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
}
</style>
