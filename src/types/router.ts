import 'vue-router'
import { Component } from 'vue'

// Extend the RouteMeta interface from vue-router
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requiresAuth?: boolean
    guest?: boolean
    allowAll?: boolean
    layout?: string
    section?: string
    breadcrumb?: {
      label: string
      icon?: string
    }
  }
}

// Define a type for breadcrumb items
export interface BreadcrumbItem {
  name: string
  path?: string
  icon?: Component
}
