import Vue from 'vue'
import Router from 'vue-router'

import searchEng from '../components/SearchPage/searchEng'
import login from '../components/login'
import registration from '../components/Register'
import testSave from '../components/AddDadaPage/vue-save-update-page'
import treeEdit from '../components/tree-page'


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
            path: '/edittree',
            component: treeEdit
        }
    ]
})


export default router;