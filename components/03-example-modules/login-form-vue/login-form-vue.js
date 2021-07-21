import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)

import LoginForm from '@components/03-example-modules/login-form-vue/login-form-vue.vue'
new Vue({
  components: {
    LoginForm,
  },
}).$mount('#loginForm')
