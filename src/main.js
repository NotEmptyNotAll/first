import Vue from 'vue'
import App from './App.vue'
import store from "@/vuex/store"
import router from "./router/router"
import XLSX from 'xlsx'
import JsonExcel from 'vue-json-excel'

import VeeValidate from 'vee-validate'
import './language/ml'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(XLSX)
Vue.component('downloadExcel', JsonExcel)

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
