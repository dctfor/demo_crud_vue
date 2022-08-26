// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

Vue.use(VueToast)

Vue.config.productionTip = false
Vue.prototype.$apiUrl = 'https://api.christianlopez.mx'
Vue.prototype.$apiRoute = '/api/v1/vue/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
