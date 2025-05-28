<template>
  <div id="app">
    <HeaderComponent />
    <HeroSection />
    <MenuSection />
    <AboutSection />
    <ContactSection />
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
import HeroSection from './components/HeroSection.vue'
import MenuSection from './components/MenuSection.vue'
import AboutSection from './components/AboutSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<style>
:root {
  --primary-brown: #8B4513;
  --dark-brown: #654321;
  --warm-red: #B22222;
  --cream: #F5F5DC;
  --beige: #F0E68C;
  --text-dark: #2F1B14;
}

body {
  font-family: 'Arial', sans-serif;
  color: var(--text-dark);
  background-color: var(--cream);
  line-height: 1.6;
  scroll-behavior: smooth;
}

html {
  scroll-behavior: smooth;
}

.section {
  padding: 80px 0;
}

/* Desktop-first responsive sections */
@media (min-width: 1200px) {
  .section {
    padding: 120px 0;
  }
}

/* Desktop typography and spacing improvements */
@media (min-width: 992px) {
  .section {
    padding: 100px 0;
  }

  .display-4 {
    font-size: 3.5rem;
    line-height: 1.2;
  }

  .display-5 {
    font-size: 3rem;
    line-height: 1.2;
  }

  .lead {
    font-size: 1.4rem;
    line-height: 1.6;
  }

  h2 {
    margin-bottom: 2rem;
  }

  h3, h4 {
    margin-bottom: 1.5rem;
  }

  .container {
    max-width: 1200px;
  }
}

/* Ultra-wide desktop optimization */
@media (min-width: 1400px) {
  .section {
    padding: 120px 0;
  }

  .display-4 {
    font-size: 4rem;
  }

  .display-5 {
    font-size: 3.5rem;
  }

  .lead {
    font-size: 1.6rem;
  }

  .container {
    max-width: 1320px;
  }
}

@media (max-width: 768px) {
  .section {
    padding: 60px 0;
  }
}

.btn-primary {
  background-color: var(--warm-red);
  border-color: var(--warm-red);
  color: white;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s ease;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  background-color: var(--dark-brown);
  border-color: var(--dark-brown);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 69, 19, 0.3);
}

.text-primary {
  color: var(--primary-brown) !important;
}

.bg-primary {
  background-color: var(--primary-brown) !important;
}

.bg-warm {
  background-color: var(--cream);
}

.bg-dark-brown {
  background-color: var(--dark-brown);
}

/* Additional desktop improvements */
@media (min-width: 1200px) {
  /* Enhanced focus styles for accessibility */
  .btn:focus-visible {
    outline: 3px solid var(--beige);
    outline-offset: 2px;
  }

  /* Improved hover states for interactive elements */
  a:not(.btn):hover {
    color: var(--warm-red);
    transition: color 0.2s ease;
  }

  /* Enhanced card hover effects */
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  }
}

/* Smooth animations for all interactive elements */
* {
  transition: color 0.2s ease, background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
</style>
