<template>
  <div class="opening-hours">
    <h3 class="h4 mb-4">
      <i class="bi bi-clock me-2"></i>
      Öppettider
    </h3>

    <div class="hours-table">
      <div
        v-for="dayHours in weeklyHours"
        :key="dayHours.dayOfWeek"
        class="hours-row"
        :class="{ active: isToday(dayHours.dayOfWeek), weekend: dayHours.isWeekend }"
      >
        <span class="day">{{ dayHours.day }}</span>
        <span class="time">{{ formatTimeRange(dayHours.openTime, dayHours.closeTime) }}</span>
        <span v-if="isToday(dayHours.dayOfWeek)" class="today-badge">
          <i class="bi bi-arrow-left"></i> Idag
        </span>
      </div>
    </div>

    <!-- Current Status -->
    <div class="current-status mt-4">
      <div class="status-indicator" :class="{ open: openingStatus.isOpen, closed: !openingStatus.isOpen }">
        <i class="bi" :class="openingStatus.isOpen ? 'bi-check-circle-fill' : 'bi-x-circle-fill'"></i>
        <span class="status-text">
          {{ openingStatus.statusText }}
        </span>
        <span class="next-status">
          {{ openingStatus.nextStatusMessage }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOpeningHoursStore } from '../stores/openingHoursStore'

const openingHoursStore = useOpeningHoursStore()

// Use storeToRefs only for reactive computed properties
const { openingStatus } = storeToRefs(openingHoursStore)

// Static data and methods can be destructured normally
const { weeklyHours, isToday, formatTimeRange } = openingHoursStore
</script>

<style scoped>
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

@media (max-width: 768px) {
  .hours-row {
    flex-direction: column;
    text-align: center;
  }

  .day, .time {
    margin-bottom: 0.25rem;
  }
}

/* Desktop Enhancements */
@media (min-width: 992px) {
  .opening-hours {
    padding: 2rem;
    background: rgba(0,0,0,0.1);
    border-radius: 20px;
    height: 100%;
  }

  .hours-table {
    padding: 2rem;
  }

  .hours-row {
    padding: 1rem 0;
    font-size: 1.1rem;
  }
}
</style>
