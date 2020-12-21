import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {
    theme: {
        themes: {
            light: {
                primary: '#607d8b',
                secondary: '#03a9f4',
                accent: '#00bcd4',
                error: '#f44336',
                warning: '#ffc107',
                info: '#2196f3',
                success: '#4caf50'
            }
        }
    }
}

export default new Vuetify(opts)