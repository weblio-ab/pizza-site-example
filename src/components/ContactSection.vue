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
                  Västerlånggatan 15<br>
                  111 29 Stockholm<br>
                  <small class="text-warning">Mitt i Gamla Stan</small>
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
                  <a href="tel:08555123445" class="text-warning text-decoration-none fw-bold">
                    08-555 123 45
                  </a><br>
                  <small>För beställningar och bordsbokning</small>
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
                  <a href="mailto:info@gamlastanpizzeria.se" class="text-warning text-decoration-none">
                    info@gamlastanpizzeria.se
                  </a><br>
                  <small>Vi svarar inom 24 timmar</small>
                </p>
              </div>
            </div>

            <!-- Social Media -->
            <div class="social-media mt-4">
              <h5 class="mb-3">Följ oss</h5>
              <div class="social-links">
                <a href="#" class="social-link me-3">
                  <i class="bi bi-facebook"></i>
                  <span>Facebook</span>
                </a>
                <a href="#" class="social-link me-3">
                  <i class="bi bi-instagram"></i>
                  <span>Instagram</span>
                </a>
                <a href="#" class="social-link">
                  <i class="bi bi-google"></i>
                  <span>Google</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Opening Hours -->
        <div class="col-lg-6">
          <div class="opening-hours">
            <h3 class="h4 mb-4">
              <i class="bi bi-clock me-2"></i>
              Öppettider
            </h3>

            <div class="hours-table">
              <div class="hours-row" :class="{ active: isToday(1) }">
                <span class="day">Måndag</span>
                <span class="time">11:00 - 22:00</span>
                <span v-if="isToday(1)" class="today-badge">
                  <i class="bi bi-arrow-left"></i> Idag
                </span>
              </div>
              <div class="hours-row" :class="{ active: isToday(2) }">
                <span class="day">Tisdag</span>
                <span class="time">11:00 - 22:00</span>
                <span v-if="isToday(2)" class="today-badge">
                  <i class="bi bi-arrow-left"></i> Idag
                </span>
              </div>
              <div class="hours-row" :class="{ active: isToday(3) }">
                <span class="day">Onsdag</span>
                <span class="time">11:00 - 22:00</span>
                <span v-if="isToday(3)" class="today-badge">
                  <i class="bi bi-arrow-left"></i> Idag
                </span>
              </div>
              <div class="hours-row" :class="{ active: isToday(4) }">
                <span class="day">Torsdag</span>
                <span class="time">11:00 - 22:00</span>
                <span v-if="isToday(4)" class="today-badge">
                  <i class="bi bi-arrow-left"></i> Idag
                </span>
              </div>
              <div class="hours-row weekend" :class="{ active: isToday(5) }">
                <span class="day">Fredag</span>
                <span class="time">11:00 - 23:00</span>
                <span v-if="isToday(5)" class="today-badge">
                  <i class="bi bi-arrow-left"></i> Idag
                </span>
              </div>
              <div class="hours-row weekend" :class="{ active: isToday(6) }">
                <span class="day">Lördag</span>
                <span class="time">11:00 - 23:00</span>
                <span v-if="isToday(6)" class="today-badge">
                  <i class="bi bi-arrow-left"></i> Idag
                </span>
              </div>
              <div class="hours-row weekend" :class="{ active: isToday(0) }">
                <span class="day">Söndag</span>
                <span class="time">12:00 - 21:00</span>
                <span v-if="isToday(0)" class="today-badge">
                  <i class="bi bi-arrow-left"></i> Idag
                </span>
              </div>
            </div>

            <!-- Current Status -->
            <div class="current-status mt-4">
              <div class="status-indicator" :class="{ open: isCurrentlyOpen, closed: !isCurrentlyOpen }">
                <i class="bi" :class="isCurrentlyOpen ? 'bi-check-circle-fill' : 'bi-x-circle-fill'"></i>
                <span class="status-text">
                  {{ isCurrentlyOpen ? 'Öppet nu' : 'Stängt nu' }}
                </span>
                <span class="next-status">
                  {{ getNextStatusMessage() }}
                </span>
              </div>
            </div>
          </div>
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
              <a href="tel:08555123445" class="btn btn-warning btn-lg me-3 mb-3">
                <i class="bi bi-telephone-fill me-2"></i>
                Ring & Beställ
              </a>
              <a href="mailto:info@gamlastanpizzeria.se" class="btn btn-outline-light btn-lg me-3 mb-3">
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
import { ref, onMounted } from 'vue'

const isCurrentlyOpen = ref(false)

const isToday = (dayOfWeek: number) => {
  return new Date().getDay() === dayOfWeek
}

const checkIfOpen = () => {
  const now = new Date()
  const currentDay = now.getDay()
  const currentTime = now.getHours() * 100 + now.getMinutes()

  let openTime, closeTime

  if (currentDay >= 1 && currentDay <= 4) { // Monday-Thursday
    openTime = 1100
    closeTime = 2200
  } else if (currentDay === 5 || currentDay === 6) { // Friday-Saturday
    openTime = 1100
    closeTime = 2300
  } else { // Sunday
    openTime = 1200
    closeTime = 2100
  }

  isCurrentlyOpen.value = currentTime >= openTime && currentTime <= closeTime
}

const getNextStatusMessage = () => {
  const now = new Date()
  const currentDay = now.getDay()
  const currentTime = now.getHours() * 100 + now.getMinutes()

  if (isCurrentlyOpen.value) {
    // Restaurant is open, show when it closes
    let closeTime
    if (currentDay >= 1 && currentDay <= 4) {
      closeTime = "22:00"
    } else if (currentDay === 5 || currentDay === 6) {
      closeTime = "23:00"
    } else {
      closeTime = "21:00"
    }
    return `Stänger ${closeTime}`
  } else {
    // Restaurant is closed, show when it opens next
    if (currentDay === 0) { // Sunday
      return "Öppnar måndag 11:00"
    } else if (currentDay === 6 && currentTime > 2300) { // Late Saturday
      return "Öppnar söndag 12:00"
    } else {
      return "Öppnar imorgon 11:00"
    }
  }
}

onMounted(() => {
  checkIfOpen()
  // Update every minute
  setInterval(checkIfOpen, 60000)
})
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

.hours-table {
  background: rgba(0,0,0,0.3);
  border-radius: 15px;
  padding: 1.5rem;
}

.hours-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  transition: all 0.3s ease;
}

.hours-row:last-child {
  border-bottom: none;
}

.hours-row.active {
  background: rgba(255,193,7,0.2);
  margin: 0 -1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 8px;
}

.hours-row.weekend {
  color: var(--beige);
}

.day {
  font-weight: 600;
  min-width: 80px;
}

.time {
  font-family: 'Courier New', monospace;
  font-weight: bold;
}

.today-badge {
  color: var(--beige);
  font-size: 0.9rem;
  font-weight: bold;
}

.current-status {
  text-align: center;
}

.status-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem 2rem;
  border-radius: 15px;
  transition: all 0.3s ease;
}

.status-indicator.open {
  background: rgba(40, 167, 69, 0.2);
  border: 2px solid #28a745;
}

.status-indicator.closed {
  background: rgba(220, 53, 69, 0.2);
  border: 2px solid #dc3545;
}

.status-indicator i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.status-text {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.next-status {
  font-size: 0.9rem;
  opacity: 0.8;
}

.map-section {
  background: rgba(0,0,0,0.2);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
}

.map-placeholder {
  height: 400px;
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

  .hours-row {
    flex-direction: column;
    text-align: center;
  }

  .day, .time {
    margin-bottom: 0.25rem;
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
  .contact-info, .opening-hours {
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

  .hours-table {
    padding: 2rem;
  }

  .hours-row {
    padding: 1rem 0;
    font-size: 1.1rem;
  }

  .map-section {
    padding: 3rem;
  }

  .map-placeholder {
    height: 500px;
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
