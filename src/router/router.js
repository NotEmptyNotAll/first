import Vue from 'vue'
import Router from 'vue-router'

import searchEng from '../components/SearchPage/searchEng'
import login from '../components/login/login'
import registration from '../components/registration/Register'
import testSave from '../components/AddDadaPage/vue-save-update-page'
import treeEdit from '../components/TreeEditPage/tree-page'
import treeStruct from '../components/tree-struct/tree-struct-page'
import newSearch from '../components/NewSearchPage/new-search-page'


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
            path: '/newsearch',
            component: newSearch
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
        },
        {
            path: '/treeStruct',
            component: treeStruct
        }
    ]
})


export default router;