import '@/assets/style.css'
import App from '@/App.vue'
import { createApp } from 'vue'
import router from '@/router/router'
import { createPinia } from 'pinia'
import usePopUps, { type PopUpType } from '@/store/popup.ts'

const app = createApp(App)

app.config.errorHandler = (err, _, info) => {
  console.error('[Global Error Handler]', err, info)

  const popUpStore = usePopUps()

  const errorMessage = err instanceof Error ? err.message : String(err)

  const popUpData: PopUpType = {
    message: errorMessage,
    severity: 'error',
    origin: info,
  }

  popUpStore.addPopUp(popUpData)
}

window.addEventListener('error', (event) => {
  console.error('[Window Error]', event.error)
  const popUpStore = usePopUps()
  popUpStore.addPopUp({
    message: event.error?.message || 'Неизвестная ошибка',
    severity: 'error',
    origin: 'window.error',
  })
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('[Unhandled Rejection]', event.reason)
  const popUpStore = usePopUps()
  popUpStore.addPopUp({
    message: event.reason?.message || String(event.reason),
    severity: 'error',
    origin: 'window.unhandledrejection',
  })
})

app.use(router).use(createPinia()).mount('#app')
