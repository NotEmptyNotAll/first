import Vue from 'vue'
import Router from 'vue-router'

import searchEng from '../components/searchEng'
import saveDataPage from '../components/save-data-page'
import login from '../components/login'
import registration from '../components/Register'

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            component: searchEng
        },
        {
            path: '/addData',
            component: saveDataPage
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/registration',
            component: registration
        }
    ]
})


export default router;