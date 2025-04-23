# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

# GenZ Frontend

A modern Vue 3 application with TypeScript, Vue Router, and Pinia state management.

## Features

- Vue 3 with Composition API
- TypeScript integration
- Vue Router with lazy loading
- Pinia state management
- Theme customization with dark mode support
- Tailwind CSS for styling

## Project Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── assets/         # Static assets like images, fonts
├── components/     # Reusable Vue components
├── lib/            # Utility functions and helpers
├── router/         # Vue Router configuration
├── stores/         # Pinia store modules
├── views/          # Page components for routes
├── App.vue         # Root component
└── main.ts         # Application entry point
```

## Vue Router

The router is configured in `src/router/index.ts` with the following features:

- Route-based code splitting for better performance
- Navigation guards for page titles
- Scroll behavior management
- 404 page handling

### Available Routes

- `/` - Home page
- `/about` - About page
- `/*` - 404 Not Found page

## Pinia Store

The application uses Pinia for state management with the following stores:

### User Store (`src/stores/user.ts`)

Manages user authentication and profile data:

- Login/logout functionality
- User profile information
- Authentication state

### Theme Store (`src/stores/theme.ts`)

Manages application theme settings:

- Color theme selection
- Dark mode toggle
- Theme persistence in localStorage

## Usage Examples

### Using the Router

```vue
<template>
  <router-link to="/">Home</router-link>
  <router-link to="/about">About</router-link>
  
  <!-- Programmatic navigation -->
  <button @click="$router.push('/about')">Go to About</button>
</template>
```

### Using Pinia Stores

```vue
<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useThemeStore } from '@/stores/theme'

const userStore = useUserStore()
const themeStore = useThemeStore()

// User store example
function login() {
  userStore.login('username', 'password')
}

// Theme store example
function toggleDarkMode() {
  themeStore.toggleDarkMode()
}
</script>
```

## Adding New Routes

To add a new route:

1. Create a new component in the `views` directory
2. Add the route to `src/router/index.ts`:

```typescript
{
  path: '/new-route',
  name: 'new-route',
  component: () => import('../views/NewRoute.vue'),
  meta: {
    title: 'New Route'
  }
}
```

## Adding New Stores

To add a new Pinia store:

1. Create a new file in the `stores` directory
2. Define your store using the Pinia `defineStore` function
3. Export the store and use it in your components
