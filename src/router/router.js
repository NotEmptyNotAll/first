import Vue from 'vue'
import Router from 'vue-router'

import searchEng from '../components/searchEng'
import login from '../components/login'
import registration from '../components/Register'
import testSave from '../components/vue-save-update-page'

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            component: searchEng
        },
        {
            path: '/addData',
            component: testSave
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/registration',
            component: registration
        },
        {
            path: '/test',
            component: testSave
        }
    ]
})


export default router;