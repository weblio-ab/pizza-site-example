import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Types for opening hours
export interface DayHours {
  day: string
  dayOfWeek: number
  openTime: Date
  closeTime: Date
  isWeekend: boolean
}

export interface OpeningStatus {
  isOpen: boolean
  statusText: string
  nextStatusMessage: string
}

export const useOpeningHoursStore = defineStore('openingHours', () => {
  // Helper function to create a date with specific time for today
  const createTimeForToday = (hours: number, minutes: number): Date => {
    const date = new Date()
    date.setHours(hours, minutes, 0, 0)
    return date
  }

  // State
  const currentTime = ref(new Date())

  // Opening hours data
  const weeklyHours = ref<DayHours[]>([
    { day: 'Måndag', dayOfWeek: 1, openTime: createTimeForToday(11, 0), closeTime: createTimeForToday(22, 0), isWeekend: false },
    { day: 'Tisdag', dayOfWeek: 2, openTime: createTimeForToday(11, 0), closeTime: createTimeForToday(22, 0), isWeekend: false },
    { day: 'Onsdag', dayOfWeek: 3, openTime: createTimeForToday(11, 0), closeTime: createTimeForToday(22, 0), isWeekend: false },
    { day: 'Torsdag', dayOfWeek: 4, openTime: createTimeForToday(11, 0), closeTime: createTimeForToday(22, 0), isWeekend: false },
    { day: 'Fredag', dayOfWeek: 5, openTime: createTimeForToday(11, 0), closeTime: createTimeForToday(23, 0), isWeekend: true },
    { day: 'Lördag', dayOfWeek: 6, openTime: createTimeForToday(11, 0), closeTime: createTimeForToday(23, 0), isWeekend: true },
    { day: 'Söndag', dayOfWeek: 0, openTime: createTimeForToday(12, 0), closeTime: createTimeForToday(21, 0), isWeekend: true }
  ])

  // Getters (computed)
  const todayHours = computed(() => {
    const today = currentTime.value.getDay()
    return weeklyHours.value.find(day => day.dayOfWeek === today)
  })

  const isCurrentlyOpen = computed(() => {
    const now = currentTime.value
    const today = todayHours.value

    if (!today) return false

    // Compare current time with opening hours using time values
    const currentTimeMs = now.getHours() * 60 + now.getMinutes()
    const openTimeMs = today.openTime.getHours() * 60 + today.openTime.getMinutes()
    const closeTimeMs = today.closeTime.getHours() * 60 + today.closeTime.getMinutes()

    return currentTimeMs >= openTimeMs && currentTimeMs <= closeTimeMs
  })

  const openingStatus = computed((): OpeningStatus => {
    const now = currentTime.value
    const currentDay = now.getDay()
    const isOpen = isCurrentlyOpen.value
    const today = todayHours.value

    const statusText = isOpen ? 'Öppet nu' : 'Stängt nu'
    let nextStatusMessage = ''

    if (isOpen && today) {
      // Restaurant is open, show when it closes
      const closeTime = formatTime(today.closeTime)
      nextStatusMessage = `Stänger ${closeTime}`
    } else {
      // Restaurant is closed, show when it opens next
      if (today) {
        // Check if restaurant will open later today
        const currentTimeMs = now.getHours() * 60 + now.getMinutes()
        const openTimeMs = today.openTime.getHours() * 60 + today.openTime.getMinutes()

        if (currentTimeMs < openTimeMs) {
          // Restaurant will open later today
          const openTime = formatTime(today.openTime)
          nextStatusMessage = `Öppnar idag ${openTime}`
        } else {
          // Restaurant has closed for the day, show tomorrow
          if (currentDay === 0) { // Sunday
            const mondayHours = weeklyHours.value.find(day => day.dayOfWeek === 1)
            if (mondayHours) {
              const openTime = formatTime(mondayHours.openTime)
              nextStatusMessage = `Öppnar måndag ${openTime}`
            }
          } else {
            // Find tomorrow's hours or next day
            const tomorrow = currentDay === 6 ? 0 : currentDay + 1
            const tomorrowHours = weeklyHours.value.find(day => day.dayOfWeek === tomorrow)
            if (tomorrowHours) {
              const openTime = formatTime(tomorrowHours.openTime)
              const dayName = tomorrow === 0 ? 'söndag' : 'imorgon'
              nextStatusMessage = `Öppnar ${dayName} ${openTime}`
            }
          }
        }
      }
    }

    return {
      isOpen,
      statusText,
      nextStatusMessage
    }
  })

  // Helper function to check if a specific day is today
  const isToday = (dayOfWeek: number): boolean => {
    return currentTime.value.getDay() === dayOfWeek
  }

  // Format time from Date object to HH:MM string
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  // Actions
  const updateCurrentTime = () => {
    currentTime.value = new Date()
  }

  const startTimeUpdater = (): ReturnType<typeof setInterval> => {
    // Update every minute
    const interval = setInterval(updateCurrentTime, 60000)
    return interval
  }

  // Format time range for display
  const formatTimeRange = (openTime: Date, closeTime: Date): string => {
    return `${formatTime(openTime)} - ${formatTime(closeTime)}`
  }

  return {
    // State
    currentTime,
    weeklyHours,

    // Getters
    todayHours,
    isCurrentlyOpen,
    openingStatus,

    // Actions
    updateCurrentTime,
    startTimeUpdater,
    isToday,
    formatTime,
    formatTimeRange
  }
})
