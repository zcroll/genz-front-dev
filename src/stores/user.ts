import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as apiLogin, logout as apiLogout, register as apiRegister, getUser as apiGetUser } from '@/services/authService'

// Define types for the user
export interface User {
  id: number
  name: string
  email: string
  isAdmin?: boolean
}

// Define the user store
export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)

  // Getters
  const isLoggedIn = computed(() => user.value !== null)
  const isAdmin = computed(() => user.value?.isAdmin || false)
  const userName = computed(() => user.value?.name || '')

  // Actions
  function setUser(newUser: User | null) {
    user.value = newUser
  }

  async function login(email: string, password: string) {
    isLoading.value = true
    error.value = null

    try {
      const data = await apiLogin(email, password);

      // Save token to localStorage
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }

      // Fetch user data
      await fetchUser();
    } catch (err: any) {
      error.value = err.message || 'Login failed';
      user.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  async function register(name: string, email: string, password: string, password_confirmation: string) {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await apiRegister(name, email, password, password_confirmation);

      // Save token to localStorage
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }

      // Fetch user data
      await fetchUser();
    } catch (err: any) {
      error.value = err.message || 'Registration failed';
      user.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  async function logout() {
    isLoading.value = true;
    error.value = null;

    try {
      await apiLogout();
      localStorage.removeItem('auth_token');
      user.value = null;
    } catch (err: any) {
      error.value = err.message || 'Logout failed';
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchUser() {
    try {
      const userData = await apiGetUser();
      user.value = userData;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch user data';
      user.value = null;
      localStorage.removeItem('auth_token');
    }
  }

  // Initialize - check if user is already logged in
  async function init() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      await fetchUser();
    }
  }

  return {
    // State
    user,
    isLoading,
    error,
    initialized,

    // Getters
    isLoggedIn,
    isAdmin,
    userName,

    // Actions
    setUser,
    login,
    register,
    logout,
    fetchUser,
    init
  }
})
