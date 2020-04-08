import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        engData:[],
        startParam:[]
    },
    mutations: {
        SET_ENGDATA:(state,engData)=>{
            state.engData=engData;
        },
        SET_STARTPARAM:(state,startParam)=>{
            state.startParam=startParam;
        }
    },
    actions: {
         GET_PRODUCTS_FROM_API({commit}) {
            return axios('http://localhost:5050/start', {
            method:'GET'
            })
                .then((startParam) => {
                    commit('SET_STARTPARAM', startParam.data)
                    return startParam;
                })
                .catch((error) => {
                    console.log(error);
                    return error
                })
        },
        GET_AUTOENG({commit},dat) {
            return axios.post('http://localhost:5050/show', {
               body:dat.data
            })
                .then((engData) => {
                    commit('SET_ENGDATA', engData.data)
                    return engData
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        }
    },
    getters: {
        ENGDATA(state) {
            return state.engData;
        },
        STARTPARAM(state) {
            return state.startParam;
        }
    }

});

export default store;