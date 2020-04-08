import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vue.Store({
    state: {
        products: [],
    },
    mutations: {
        SET_PRODUCT_TO_STATE: (state, products) => {
            state.products = products;
        }
    },
    actions: {
        GET_PRODUCTS_FTOM_API({commit}) {
            return axios('http://localhost:5050/show', {
                method: "GET"
            })
                .then((products) => {
                    commit('SET_PRODUCT_TO_STATE', products.data)
                    return products;
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        }
    },
    getters: {
        PRODUCTS(state) {
            return state.products;
        }
    }

});

export default store;