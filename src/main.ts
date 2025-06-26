import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import App from './App.vue'

// Import plugins
import breadcrumbPlugin from './plugins/breadcrumb'

// Create the app instance
const app = createApp(App)

// Use plugins
app.use(createPinia())
app.use(router)
app.use(breadcrumbPlugin)

// Mount the app
app.mount('#app')
