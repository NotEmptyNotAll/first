import Vue from 'vue'
import App from './App.vue'
import store from "@/vuex/store";
import router from "./router/router";
import VeeValidate from 'vee-validate';
import './language/ml';

// Install BootstrapVue


Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
