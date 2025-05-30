import { defineStore } from 'pinia'

// Types for restaurant information
export interface ContactInfo {
  address: {
    street: string
    postalCode: string
    city: string
    district: string
  }
  phone: {
    number: string
    href: string
    description: string
  }
  email: {
    address: string
    description: string
  }
}

export interface SocialMediaLink {
  name: string
  icon: string
  url: string
}

export interface RestaurantInfo {
  name: string
  tagline: string
  description: string
  contact: ContactInfo
  socialMedia: SocialMediaLink[]
}

export const useRestaurantStore = defineStore('restaurant', () => {
  // Restaurant basic information
  const restaurantInfo: RestaurantInfo = {
    name: 'Gamla Stan Pizzeria',
    tagline: 'Äkta Pizza i Stockholms Hjärta',
    description: 'Upplev äkta svensk pizzatradition i hjärtat av Stockholm. En mysig pub-atmosfär där familjer samlas över utsökt pizza.',

    contact: {
      address: {
        street: 'Västerlånggatan 15',
        postalCode: '111 29',
        city: 'Stockholm',
        district: 'Gamla Stan'
      },
      phone: {
        number: '08-555 123 45',
        href: 'tel:08555123445',
        description: 'För beställningar och bordsbokning'
      },
      email: {
        address: 'info@gamlastanpizzeria.se',
        description: 'Vi svarar inom 24 timmar'
      }
    },

    socialMedia: [
      {
        name: 'Facebook',
        icon: 'bi-facebook',
        url: 'https://facebook.com/gamlastanpizzeria'
      },
      {
        name: 'Instagram',
        icon: 'bi-instagram',
        url: 'https://instagram.com/gamlastanpizzeria'
      },
      {
        name: 'Google',
        icon: 'bi-google',
        url: 'https://g.page/gamlastanpizzeria'
      }
    ]
  }

  // Helper functions
  const getFullAddress = (): string => {
    const { address } = restaurantInfo.contact
    return `${address.street}, ${address.postalCode} ${address.city}`
  }

  const getAddressWithDistrict = (): string => {
    const { address } = restaurantInfo.contact
    return `${address.street}, ${address.postalCode} ${address.city}, ${address.district}`
  }

  const getPhoneLink = (): string => {
    return restaurantInfo.contact.phone.href
  }

  const getEmailLink = (): string => {
    return `mailto:${restaurantInfo.contact.email.address}`
  }

  return {
    // Data
    restaurantInfo,

    // Helper methods
    getFullAddress,
    getAddressWithDistrict,
    getPhoneLink,
    getEmailLink
  }
})
