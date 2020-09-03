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
    mode: 'history',
    routes: [
        {
           path: '/newsearch',
            name: 'searchEng',
            component: searchEng
        },
        {
            path: '/addData',
            name: 'testSave',
            component: testSave
        },
        {
            path: '/',
            name: 'newSearch',
            component: newSearch
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/registration',
            name: 'registration',
            component: registration
        },
        {
            path: '/edittree',
            name: 'treeEdit',
            component: treeEdit
        },
        {
            path: '/treeStruct',
            name: 'treeStruct',
            component: treeStruct
        }
    ]
})


export default router;