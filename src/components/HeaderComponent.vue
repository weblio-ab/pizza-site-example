<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark-brown fixed-top" id="mainNav">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#hem">
        <i class="bi bi-shop me-2"></i>
        {{ restaurantInfo.name }}
      </a>

      <div class="navbar-phone d-none d-lg-block">
        <i class="bi bi-telephone-fill me-2"></i>
        <span class="fw-bold">{{ restaurantInfo.contact.phone.number }}</span>
      </div>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="#hem">Hem</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#meny">Meny</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#kontakt">Kontakt</a>
          </li>
          <li class="nav-item d-lg-none">
            <a class="nav-link" :href="restaurantInfo.contact.phone.href">
              <i class="bi bi-telephone-fill me-1"></i>
              {{ restaurantInfo.contact.phone.number }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRestaurantStore } from '../stores/restaurantStore'

const restaurantStore = useRestaurantStore()
const { restaurantInfo } = restaurantStore

onMounted(() => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault()
      const target = document.querySelector(anchor.getAttribute('href')!)
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })

  // Navbar background on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('mainNav')
    if (window.scrollY > 100) {
      navbar?.classList.add('navbar-scrolled')
    } else {
      navbar?.classList.remove('navbar-scrolled')
    }
  })
})
</script>

<style scoped>
.navbar {
  transition: all 0.3s ease;
  padding: 1.5rem 0;
  min-height: 80px;
}

.navbar-scrolled {
  padding: 0.75rem 0;
  min-height: 60px;
  box-shadow: 0 2px 20px rgba(0,0,0,0.15);
  background-color: var(--dark-brown) !important;
}

.navbar-brand {
  font-size: 1.75rem;
  color: var(--cream) !important;
  font-weight: 700;
}

.navbar-phone {
  color: var(--beige);
  font-size: 1.2rem;
  font-weight: 600;
}

.nav-link {
  font-weight: 600;
  margin: 0 0.75rem;
  color: var(--cream) !important;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
}

.nav-link:hover {
  color: var(--beige) !important;
  transform: translateY(-2px);
}

/* Desktop hover effects */
@media (min-width: 992px) {
  .nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 50%;
    background-color: var(--beige);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .navbar-brand:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
}

@media (max-width: 991px) {
  .navbar-nav {
    text-align: center;
    padding: 1.5rem 0;
    background: rgba(0,0,0,0.1);
    border-radius: 10px;
    margin-top: 1rem;
  }

  .nav-item {
    margin: 0.75rem 0;
  }

  .nav-link {
    font-size: 1.05rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
  }

  .nav-link:hover {
    background: rgba(255,255,255,0.1);
    transform: none;
  }
}
</style>
