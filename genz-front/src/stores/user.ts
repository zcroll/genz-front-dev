import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Define types for the user
export interface User {
  id: number
  username: string
  email: string
  isAdmin: boolean
}

// Define the user store
export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isLoggedIn = computed(() => user.value !== null)
  const isAdmin = computed(() => user.value?.isAdmin || false)
  const username = computed(() => user.value?.username || '')

  // Actions
  function setUser(newUser: User | null) {
    user.value = newUser
  }

  async function login(username: string, password: string) {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful login
      if (username === 'admin' && password === 'admin') {
        user.value = {
          id: 1,
          username: 'admin',
          email: 'admin@example.com',
          isAdmin: true
        }
      } else if (username === 'user' && password === 'user') {
        user.value = {
          id: 2,
          username: 'user',
          email: 'user@example.com',
          isAdmin: false
        }
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      user.value = null
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
  }

  return {
    // State
    user,
    isLoading,
    error,
    
    // Getters
    isLoggedIn,
    isAdmin,
    username,
    
    // Actions
    setUser,
    login,
    logout
  }
})