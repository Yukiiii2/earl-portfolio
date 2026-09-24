import './index.css' // Your updated CSS import
import 'aos/dist/aos.css'
import AOS from 'aos'

import { createApp } from 'vue'
import Tres from '@tresjs/core'
import router from './router' // Import the router configuration
import App from './App.vue'

const app = createApp(App)

app.use(Tres)
app.use(router) // Tell the Vue app to use routing
app.mount('#app')

AOS.init({
  once: true,
  offset: 100,
  duration: 800,
})