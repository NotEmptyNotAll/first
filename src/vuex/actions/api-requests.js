import axios from "axios";
let urlApi = 'https://enginefinal.herokuapp.com/';
//let urlApi = 'http://localhost:5050/';

export default {
    async GET_FILE_LIST_BY_URL({commit},response) {
        commit('SET_LOAD_LIST_URL', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'getFileUrlById',
            data: response,
            responseType: 'json'
        })
            .then((resp) => {
                commit('SET_LOAD_LIST_URL', false);
                return resp.data;
            })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_LIST_URL', false);
                return error
            })
    },
    async GET_ALL_AUTO({commit},response) {
        commit('SET_LOAD_ALL_AUTO_ENG', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'getAllAutoEngAndParam',
            data: response,
            responseType: 'json'
        })
            .then((resp) => {
                commit('SET_ALL_AUTO_ENG', resp.data)
                commit('SET_LOAD_ALL_AUTO_ENG', false);
                return resp;
            })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_ALL_AUTO_ENG', false);
                return error
            })
    },
    async GET_PARAM_SIZE_NAME({commit},response) {
        commit('SET_LOAD_PARAM_SIZE_NAME', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'getParametersSizeName',
            data: response,
            responseType: 'json'
        })
            .then((resp) => {
                commit('SET_PARAM_SIZE_NAME', resp.data)
                commit('SET_LOAD_PARAM_SIZE_NAME', false);
                return resp;
            })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_PARAM_SIZE_NAME', false);
                return error
            })
    },
    GET_START_PARAM({commit}) {
        return axios(urlApi + 'start', {
            method: 'GET'
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
    GET_TREE_ELEMENTS({commit}) {
        return axios(urlApi + 'getTreeElements', {
            method: 'GET'
        })
            .then((startParam) => {
                commit('SET_TREE_ELEMENTS', startParam.data)
                return startParam;
            })
            .catch((error) => {
                console.log(error);
                return error
            })
    },
    GET_ALL_PARAM_NAME({commit}) {
        return axios(urlApi + 'getAllParamName', {
            method: 'GET'
        })
            .then((startParam) => {
                commit('SET_PARAM_NAME', startParam.data)
                return startParam;
            })
            .catch((error) => {
                console.log(error);
                return error
            })
    },

    async GET_AUTOENG_BY_PARAM({commit}, searchData) {
        commit('SET_SHOW_LOAD', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'getAutoEngine',
            data: searchData,
            responseType: 'json'
        }).then(engData => {
            commit('SET_ENGDATA_TREE', engData.data)
            commit('SET_SHOW_LOAD', false);
            return engData;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_SHOW_LOAD', false);
                return error
            })
    },
    async GET_AUTOENG({commit}, searchData) {
        commit('SET_SHOW_LOAD', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'getAutoEngine',
            data: searchData,
            responseType: 'json'
        }).then(engData => {
            commit('SET_ENGDATA', engData.data)
            commit('SET_SHOW_LOAD', false);
            return engData;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_SHOW_LOAD', false);
                return error
            })
    },


    async GET_AUTOENG_BY_ID({commit}, searchData) {
        commit('SET_SHOW_LOAD', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'getAutoEngineById',
            data: searchData,
            responseType: 'json'
        }).then(engData => {
            commit('SET_AUTO_ENGINE',  [engData.data])

            commit('SET_SHOW_LOAD', false);
            return engData;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_SHOW_LOAD', false);
                return error
            })
    },
    async GET_ENG({commit}, searchData) {
        commit('SET_LOAD_SAVE_ENGINE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'getEng',
            data: searchData,
            responseType: 'json'
        }).then(engData => {
            commit('SET_ENGINE', engData.data)
            commit('SET_LOAD_SAVE_ENGINE', false);
            return engData;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_SAVE_ENGINE', false);
                return error
            })
    },
    async GET_AUTOENG_BY_PARAM_UPDATE({commit}, searchData) {
        commit('SET_AUTO_ENGINE_LOAD', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'getAutoEngineForUpdate',
            data: searchData,
            responseType: 'json'
        }).then(engData => {
            commit('SET_AUTO_ENGINE', engData.data)
            commit('SET_AUTO_ENGINE_LOAD', false);
            return engData;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_AUTO_ENGINE_LOAD', false);
                return error
            })
    },
    async GET_PARAMTRS({commit}, number) {
        commit('SET_LOAD_PARAM_FOR_TREE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'getParameters',
            data: number,
            responseType: 'json'
        }).then(listParam => {
            commit('SET_LOAD_PARAM_FOR_TREE', false);
            commit('SET_LISTPARAM_ELEMENT', listParam.data)
            return listParam;
        })
            .catch((error) => {
                commit('SET_LOAD_PARAM_FOR_TREE', false);
                console.log(error);
                return error
            })
    },
    async GET_TREE_ROOT_NAMES({commit}) {
        return await axios({
            method: 'GET',
            url: urlApi + 'getTreeRootName',
            responseType: 'json'
        }).then(listParam => {
            commit('SET_TREE_ROOT_NAMES', listParam.data)
            return listParam;
        })
            .catch((error) => {
                console.log(error);
                return error
            })
    },
    async GET_PARAM_NAME({commit}) {
        return await axios({
            method: 'GET',
            url: urlApi + 'paramNameAndUnits',
            responseType: 'json'
        }).then(resp => {
            commit('SET_PARAM_NAME_AND_UNITS', resp.data)
            return resp;
        })
            .catch((error) => {
                console.log(error);
                return error
            })
    },
    async GET_ELEMENTS({commit}, number) {
        commit('SET_ELEMENTS_LOAD', true)
        return await axios({
            method: 'POST',
            url: urlApi + 'getElements',
            data: {id: number},
            responseType: 'json'
        }).then(resp => {
            commit('SET_ELEMENTS', resp.data)
            commit('SET_ELEMENTS_LOAD', false)
            return resp;
        })
            .catch((error) => {
                commit('SET_ELEMENTS_LOAD', false)
                console.log(error);
                return error
            })
    },
    async GET_ELEMENTS_UPDATE({commit}, number) {
        commit('SET_ELEMENTS_LOAD', true)
        return await axios({
            method: 'POST',
            url: urlApi + 'getElements',
            data: {id: number},
            responseType: 'json'
        }).then(resp => {
            commit('SET_ELEMENTS_UPDATE', resp.data)
            commit('SET_ELEMENTS_LOAD', false)
            return resp;
        })
            .catch((error) => {
                commit('SET_ELEMENTS_LOAD', false)
                console.log(error);
                return error
            })
    },
    async GET_ELEMENTS_TREE({commit}) {
        commit('SET_ELEMENTS_TREE_LOAD', true)

        return await axios({
            method: 'POST',
            url: urlApi + 'getElements',
            data: {id: 3},
            responseType: 'json'
        }).then(resp => {
            commit('SET_ELEMENTS_TREE', resp.data)
            commit('SET_ELEMENTS_TREE_LOAD', false)
            return resp;
        })
            .catch((error) => {
                commit('SET_ELEMENTS_TREE_LOAD', false)
                console.log(error);
                return error
            })
    },
    async GET_ELEMENTS_AND_MAX_ID({commit}, number) {
        commit('SET_LOAD_TREE_UPDATE', true);

        return await axios({
            method: 'POST',
            url: urlApi + 'getElementsAndMaxId',
            data: {id: number},
            responseType: 'json'
        }).then(resp => {
            commit('SET_ELEMENTS_AND_MAX_ID', resp.data)
            commit('SET_LOAD_TREE_UPDATE', false);
            return resp;
        })
            .catch((error) => {
                commit('SET_LOAD_TREE_UPDATE', false);
                console.log(error);
                return error
            })
    },
    async GET_AUTO_BY_ENG({commit}, searchData) {
        return await axios({
            method: 'POST',
            url: urlApi + 'getAutoEng',
            data: searchData,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SEARCH_DATA', resp.data)
            return resp;
        })
            .catch((error) => {
                console.log(error);
                return error
            })
    },
    async GET_ENGDATA_BY_PARAM({commit}, searchData) {
        commit('SET_LOADPARAM', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'getCroppedStartData',
            data: searchData,
            responseType: 'json'
        }).then(resp => {
            commit('SET_STARTPARAM', resp.data)
            commit('SET_LOADPARAM', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOADPARAM', false);
                return error
            })
    },
    async GET_ALL_ADDITIONAL_DATA({commit}) {
        commit('SET_LOAD_ADDITIONAL_DATA', true);
        return await axios({
            method: 'GET',
            url: urlApi + 'getAllAdditionalData',
            responseType: 'json'
        }).then(resp => {
            commit('SET_ADDITIONAL_DATA', resp.data)
            commit('SET_LOAD_ADDITIONAL_DATA', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_ADDITIONAL_DATA', false);
                return error
            })
    }

}
