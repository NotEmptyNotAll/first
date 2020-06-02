import Vue from 'vue'
import App from './App.vue'
import store from "@/vuex/store"
import router from "./router/router"
import VeeValidate from 'vee-validate'
import './language/ml'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// Install BootstrapVue

Vue.config.productionTip = false
Vue.use(VeeValidate)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
