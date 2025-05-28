<template>
  <section id="om-oss" class="section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 mb-5 mb-lg-0">
          <div class="about-image">
            <img
              src="https://images.unsplash.com/photo-1552566618-dde2a28dc136?w=600&h=400&fit=crop"
              alt="Gamla Stan Pizzeria interiör"
              class="img-fluid rounded-3"
            >
            <div class="image-overlay">
              <div class="overlay-content">
                <i class="bi bi-heart-fill text-warning fs-1"></i>
                <h5 class="text-white mt-2">Sedan 1985</h5>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="about-content">
            <h2 class="display-5 fw-bold text-primary mb-4">
              Vår Historia
            </h2>
            <p class="lead mb-4">
              Gamla Stan Pizzeria har varit en del av Stockholms hjärta sedan 1985.
              Vi startade som en liten familjepizzeria med drömmen att kombinera
              italiensk pizzatradition med svenska smaker.
            </p>

            <div class="row mb-4">
              <div class="col-md-6">
                <div class="feature-item">
                  <i class="bi bi-fire text-warning fs-2"></i>
                  <h5 class="mt-2">Vedeldad Ugn</h5>
                  <p>Alla pizzor bakas i vår traditionella vedeldade ugn för perfekt smak.</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="feature-item">
                  <i class="bi bi-leaf text-success fs-2"></i>
                  <h5 class="mt-2">Färska Ingredienser</h5>
                  <p>Vi använder endast de bästa lokala och importerade ingredienserna.</p>
                </div>
              </div>
            </div>

            <div class="pub-atmosphere mb-4">
              <h4 class="text-primary mb-3">
                <i class="bi bi-house-heart me-2"></i>
                Pub-Atmosfär
              </h4>
              <p>
                Vår mysiga pub-miljö skapar den perfekta platsen för familjer och vänner
                att samlas. Med varma träytor, tegelväggar och dämpad belysning känner
                du dig hemma från första ögonblicket.
              </p>
              <p>
                Vi tror på att pizza är mer än bara mat - det är en upplevelse som
                förenar människor. Därför har vi skapat en plats där alla känner sig välkomna.
              </p>
            </div>

            <div class="values">
              <h4 class="text-primary mb-3">Våra Värderingar</h4>
              <ul class="list-unstyled">
                <li class="mb-2">
                  <i class="bi bi-check-circle-fill text-success me-2"></i>
                  Familjevänlig miljö för alla åldrar
                </li>
                <li class="mb-2">
                  <i class="bi bi-check-circle-fill text-success me-2"></i>
                  Hållbara och lokalproducerade råvaror när det är möjligt
                </li>
                <li class="mb-2">
                  <i class="bi bi-check-circle-fill text-success me-2"></i>
                  Traditionella recept med modern touch
                </li>
                <li class="mb-2">
                  <i class="bi bi-check-circle-fill text-success me-2"></i>
                  Personlig service och omtanke för varje gäst
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="row mt-5 pt-5">
        <div class="col-12">
          <div class="stats-section">
            <div class="row text-center">
              <div class="col-6 col-md-3 mb-4">
                <div class="stat-item">
                  <i class="bi bi-calendar-check text-primary fs-1"></i>
                  <h3 class="fw-bold text-primary mt-2">40+</h3>
                  <p class="text-muted">År i verksamhet</p>
                </div>
              </div>
              <div class="col-6 col-md-3 mb-4">
                <div class="stat-item">
                  <i class="bi bi-people text-primary fs-1"></i>
                  <h3 class="fw-bold text-primary mt-2">1000+</h3>
                  <p class="text-muted">Nöjda kunder varje månad</p>
                </div>
              </div>
              <div class="col-6 col-md-3 mb-4">
                <div class="stat-item">
                  <i class="bi bi-fork-knife text-primary fs-1"></i>
                  <h3 class="fw-bold text-primary mt-2">{{ totalPizzas }}</h3>
                  <p class="text-muted">Olika pizzor på menyn</p>
                </div>
              </div>
              <div class="col-6 col-md-3 mb-4">
                <div class="stat-item">
                  <i class="bi bi-star text-primary fs-1"></i>
                  <h3 class="fw-bold text-primary mt-2">4.8</h3>
                  <p class="text-muted">Genomsnittligt betyg</p>
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
import { storeToRefs } from 'pinia'
import { usePizzaStore } from '../stores/pizzaStore'

const pizzaStore = usePizzaStore()
const { totalPizzas } = storeToRefs(pizzaStore)
</script>

<style scoped>
.about-image {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
}

.about-image img {
  transition: transform 0.3s ease;
}

.about-image:hover img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(139, 69, 19, 0.8), rgba(178, 34, 34, 0.6));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.about-image:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
}

.feature-item {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.pub-atmosphere {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 2rem;
  border-radius: 15px;
  border-left: 4px solid var(--primary-brown);
}

.values ul li {
  font-size: 1.1rem;
  padding: 0.5rem 0;
}

.stats-section {
  background: var(--primary-brown);
  color: white;
  padding: 3rem;
  border-radius: 20px;
}

.stats-section .text-primary {
  color: var(--beige) !important;
}

.stats-section .text-muted {
  color: rgba(255,255,255,0.8) !important;
}

.stat-item {
  padding: 1rem;
}

.team-member img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 4px solid var(--cream);
  transition: transform 0.3s ease;
}

.team-member:hover img {
  transform: scale(1.1);
  border-color: var(--primary-brown);
}

.team-member {
  padding: 1.5rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.team-member:hover {
  transform: translateY(-5px);
}

@media (max-width: 768px) {
  .feature-item {
    margin-bottom: 1rem;
    padding: 1rem;
  }

  .pub-atmosphere {
    padding: 1.5rem;
  }

  .stats-section {
    padding: 2rem 1rem;
  }

  .team-member {
    padding: 1rem;
  }

  .team-member img {
    width: 120px;
    height: 120px;
  }
}

/* Desktop Enhancements */
@media (min-width: 992px) {
  .about-content {
    padding-left: 3rem;
  }

  .about-image {
    position: relative;
  }

  .about-image img {
    height: 500px;
    object-fit: cover;
  }

  .feature-item {
    padding: 2rem;
    background: rgba(255,255,255,0.8);
    border-radius: 15px;
    margin-bottom: 2rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .feature-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }

  .feature-item i {
    font-size: 3rem !important;
  }

  .pub-atmosphere {
    padding: 2.5rem;
    background: rgba(255,255,255,0.1);
    border-radius: 20px;
  }

  .values {
    background: rgba(255,255,255,0.1);
    padding: 2rem;
    border-radius: 15px;
  }

  .values li {
    padding: 0.75rem 0;
    font-size: 1.1rem;
  }

  .stats-section {
    padding: 4rem;
  }

  .stat-item {
    padding: 2rem;
  }

  .stat-item i {
    font-size: 4rem !important;
  }

  .stat-item h3 {
    font-size: 3rem;
  }

  .team-member {
    padding: 2.5rem;
  }

  .team-member img {
    width: 180px;
    height: 180px;
  }
}
</style>
