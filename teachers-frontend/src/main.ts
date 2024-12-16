import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes';
import 'primeicons/primeicons.css';

const app = createApp(App);

const myPreset = definePreset(Aura, {
    components: {
        datatable: {
            row: {
                background: 'rgb(0, 150, 130)',
                color: 'rgb(64, 64, 64)',
        
            },
            header: {
                cell: {
                    color: 'rgb(64, 64, 64)',
                },
                background: 'rgb(0, 150, 130)',
            },
            body: {
                cell: {
                    border: {
                        color: 'rgb(0, 150, 130)',
                    }
                }
            }
        },
    }
});

app.use(PrimeVue, {
    theme: {
        preset: myPreset,
    }
});
app.mount('#app')
