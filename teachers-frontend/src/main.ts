import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'
import 'primeicons/primeicons.css'

const app = createApp(App)

const myPreset = definePreset(Aura, {
  components: {
    popover: {
      background: 'rgb(64, 64, 64)',
    },
  },
})

app.use(PrimeVue, {
  theme: {
    preset: myPreset,
  },
})
app.mount('#app')
