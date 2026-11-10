import './index.css'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { createRevealDirective } from './motion/reveal.js'

const app = createApp(App)

app.use(router)
app.directive('reveal', createRevealDirective())
app.mount('#app')
