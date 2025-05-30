import { computed } from 'vue'
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

  // Opening hours data (static)
  const weeklyHours: DayHours[] = [
    { day: 'Måndag', dayOfWeek: 1, openTime: createTimeForToday(11, 0), closeTime: createTimeForToday(22, 0), isWeekend: false },
    { day: 'Tisdag', dayOfWeek: 2, openTime: createTimeForToday(11, 0), closeTime: createTimeForToday(22, 0), isWeekend: false },
    { day: 'Onsdag', dayOfWeek: 3, openTime: createTimeForToday(11, 0), closeTime: createTimeForToday(22, 0), isWeekend: false },
    { day: 'Torsdag', dayOfWeek: 4, openTime: createTimeForToday(11, 0), closeTime: createTimeForToday(22, 0), isWeekend: false },
    { day: 'Fredag', dayOfWeek: 5, openTime: createTimeForToday(11, 0), closeTime: createTimeForToday(23, 0), isWeekend: true },
    { day: 'Lördag', dayOfWeek: 6, openTime: createTimeForToday(11, 0), closeTime: createTimeForToday(23, 0), isWeekend: true },
    { day: 'Söndag', dayOfWeek: 0, openTime: createTimeForToday(12, 0), closeTime: createTimeForToday(21, 0), isWeekend: true }
  ]

  // Get current time (fresh on each access)
  const getCurrentTime = () => new Date()

  // Get today's hours
  const getTodayHours = () => {
    const today = getCurrentTime().getDay()
    return weeklyHours.find(day => day.dayOfWeek === today)
  }

  // Check if currently open
  const isCurrentlyOpen = computed(() => {
    const now = getCurrentTime()
    const today = getTodayHours()

    if (!today) return false

    const currentTimeMs = now.getHours() * 60 + now.getMinutes()
    const openTimeMs = today.openTime.getHours() * 60 + today.openTime.getMinutes()
    const closeTimeMs = today.closeTime.getHours() * 60 + today.closeTime.getMinutes()

    return currentTimeMs >= openTimeMs && currentTimeMs <= closeTimeMs
  })

  // Get opening status with messages
  const openingStatus = computed((): OpeningStatus => {
    const now = getCurrentTime()
    const currentDay = now.getDay()
    const isOpen = isCurrentlyOpen.value
    const today = getTodayHours()

    const statusText = isOpen ? 'Öppet nu' : 'Stängt nu'
    let nextStatusMessage = ''

    if (isOpen && today) {
      const closeTime = formatTime(today.closeTime)
      nextStatusMessage = `Stänger ${closeTime}`
    } else if (today) {
      const currentTimeMs = now.getHours() * 60 + now.getMinutes()
      const openTimeMs = today.openTime.getHours() * 60 + today.openTime.getMinutes()

      if (currentTimeMs < openTimeMs) {
        const openTime = formatTime(today.openTime)
        nextStatusMessage = `Öppnar idag ${openTime}`
      } else {
        // Restaurant has closed for the day
        if (currentDay === 0) { // Sunday
          const mondayHours = weeklyHours.find(day => day.dayOfWeek === 1)
          if (mondayHours) {
            const openTime = formatTime(mondayHours.openTime)
            nextStatusMessage = `Öppnar måndag ${openTime}`
          }
        } else {
          const tomorrow = currentDay === 6 ? 0 : currentDay + 1
          const tomorrowHours = weeklyHours.find(day => day.dayOfWeek === tomorrow)
          if (tomorrowHours) {
            const openTime = formatTime(tomorrowHours.openTime)
            const dayName = tomorrow === 0 ? 'söndag' : 'imorgon'
            nextStatusMessage = `Öppnar ${dayName} ${openTime}`
          }
        }
      }
    }

    return { isOpen, statusText, nextStatusMessage }
  })

  // Format time from Date object to HH:MM string
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  // Format time range for display
  const formatTimeRange = (openTime: Date, closeTime: Date): string => {
    return `${formatTime(openTime)} - ${formatTime(closeTime)}`
  }

  // Helper function to check if a specific day is today
  const isToday = (dayOfWeek: number): boolean => {
    return getCurrentTime().getDay() === dayOfWeek
  }

  return {
    // Data
    weeklyHours,

    // Computed
    isCurrentlyOpen,
    openingStatus,

    // Methods
    isToday,
    formatTimeRange
  }
})
