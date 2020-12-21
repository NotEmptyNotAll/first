import axios from "axios";
//import fa from "element-ui/src/locale/lang/fa";

//let urlApi = 'https://enginefinal.herokuapp.com/save/';
//let urlApi = 'http://10.102.200.11:5050/save/';
//let urlApi = 'http://eng-test.24x7tools.com:5050/save/';
let urlApi = 'http://10.102.200.11:5050/save/';
//let urlApi = 'http://localhost:5050/save/';

export default {
    SAVE_FAST_PARAM_DATA({commit}, saveDataObj) {
        commit('SET_SAVE_FAST_PARAM_STATUS', true)
        return axios({
            method: 'POST',
            url: urlApi + 'fastSaveParam',
            data: saveDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_FAST_PARAM_STATUS', false)
            return resp;
        })
            .catch((error) => {
                commit('SET_SAVE_FAST_PARAM_STATUS', error.data)
                console.log(error);
                commit('SET_SAVE_FAST_PARAM_STATUS', false)
                return error
            })
    },
    SAVE_FAST_AUTO_ENGINE_DATA({commit}, saveDataObj) {
        commit('SET_SAVE_FAST_PARAM_STATUS', true)
        return axios({
            method: 'POST',
            url: urlApi + 'fastSaveAutoData',
            data: saveDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_FAST_PARAM_STATUS', false)
            return resp;
        })
            .catch((error) => {
                commit('SET_SAVE_FAST_PARAM_STATUS', false)
                console.log(error);
                return error
            })
    },
    SAVE_FILE_DATA({commit}, saveDataObj) {
        return axios({
            method: 'POST',
            url: urlApi + 'saveFileData',
            data: saveDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            return resp;
        })
            .catch((error) => {
                commit('SET_SAVE_STATUS', error.data)
                console.log(error);
                return error
            })
    },
    async SAVE_ENGINE_MANUFACTURE({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_ENGINE_MANUFACTURE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'saveEngManufacture',
            data: saveDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_SAVE_ENGINE_MANUFACTURE', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_SAVE_ENGINE_MANUFACTURE', false);
                return error
            })
    },
    async SAVE_PARAM_NAME({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_PARAM_NAME', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'saveParameterName',
            data: saveDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_SAVE_PARAM_NAME', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_SAVE_PARAM_NAME', false);
                return error
            })
    },
    async SAVE_DATA_AUTO_MODEL({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_AUTO_MODEL', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'saveAutoModel',
            data: saveDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_SAVE_AUTO_MODEL', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_SAVE_AUTO_MODEL', false);
                return error
            })
    },
    async SAVE_DATA_FUEL_TYPE({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_FUEL_TYPE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'saveFuelType',
            data: saveDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_SAVE_FUEL_TYPE', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_SAVE_FUEL_TYPE', false);
                return error
            })
    },
    async SAVE_DATA_ENGINE_NUMBER({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_ENGINE_NUMBER', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'saveEngNumber',
            data: saveDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_SAVE_ENGINE_NUMBER', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_SAVE_ENGINE_NUMBER', false);
                return error
            })
    },
    async SAVE_ELEM({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_ELEMENTS', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'saveElements',
            data: saveDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_SAVE_ELEMENTS', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_SAVE_ELEMENTS', false);
                return error
            })
    },
    async SAVE_DATA_ELEMENTS({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_ELEMENTS', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'saveParamElements',
            data: saveDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_SAVE_ELEMENTS', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_SAVE_ELEMENTS', false);
                return error
            })
    },
    async SAVE_DATA_PARAMETERS({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_PARAMETERS', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'saveParameters',
            data: saveDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_SAVE_PARAMETERS', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_SAVE_PARAMETERS', false);
                return error
            })
    },
    async SAVE_DATA_MEASUREMENT_UNITS({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_MEASUREMENT_UNITS', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'saveMeasurementUnitsService',
            data: saveDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_SAVE_MEASUREMENT_UNITS', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_SAVE_MEASUREMENT_UNITS', false);
                return error
            })
    },
    async SAVE_DATA_AUTOMOBILE_ENGINE({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_AUTOMOBILE_ENGINE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'saveAutoEngine',
            data: saveDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_SAVE_AUTOMOBILE_ENGINE', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_SAVE_AUTOMOBILE_ENGINE', false);
                return error
            })
    },
    async SAVE_DATA_ENGINE({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_ENGINE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'saveEngine',
            data: saveDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_SAVE_ENGINE', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_SAVE_ENGINE', false);
                return error
            })
    },
    async SAVE_DATA_AUTO_MANUFACTURE({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_AUTO_MANUFACTURE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'saveAutoManufacture',
            data: saveDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_SAVE_AUTO_MANUFACTURE', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_SAVE_AUTO_MANUFACTURE', false);
                return error
            })
    },
    async SAVE_DATA_CYLINDERS({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_CYLINDERS', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'saveCylinders',
            data: saveDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_SAVE_CYLINDERS', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_SAVE_CYLINDERS', false);
                return error
            })
    }, async SAVE_DATA_SUPERCHARGE_TYPE({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_SUPERCHARGE_TYPE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'saveSuperchargedType',
            data: saveDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_SAVE_SUPERCHARGE_TYPE', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_SAVE_SUPERCHARGE_TYPE', false);
                return error
            })
    }
}
