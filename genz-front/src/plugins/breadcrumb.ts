import type { App } from 'vue'
import AppBreadcrumb from '@/components/ui/breadcrumb/AppBreadcrumb.vue'

export default {
  install: (app: App) => {
    app.component('AppBreadcrumb', AppBreadcrumb)
  }
}
