import axios from 'axios'
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './assets/css/main.scss'

Vue.http = Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  render: h => h(App)
})
