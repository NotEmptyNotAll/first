import Vue from 'vue'
import App from './App.vue'
import store from "@/vuex/store"
import router from "./router/router"
import XLSX from 'xlsx'
import * as Excel from "exceljs";
import JsonExcel from 'vue-json-excel'
// ESM default export
import VueTransmit from "vue-transmit";
import VeeValidate from 'vee-validate'
import './language/ml'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {Photoshop} from 'vue-color'
import Cloudinary from "cloudinary-vue";
Vue.use(Cloudinary, {
    configuration: { cloudName: "notempty" }
});
Vue.use(VueTransmit);
Vue.use(ElementUI)
Vue.use(XLSX)
Vue.use(Excel)
Vue.component('downloadExcel', JsonExcel)
Vue.component('photoshop-picker', Photoshop)
// eslint-disable-next-line no-unused-vars
//let xl = require('excel4node');

// Install BootstrapVue
Vue.config.productionTip = false
Vue.use(VeeValidate)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.prototype.$xl = require('excel4node');
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
