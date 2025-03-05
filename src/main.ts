import { createApp } from 'vue'
import router from '@/router/router'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import '@/assets/style.css'

createApp(App).use(router).use(createPinia()).mount('#app')
