import axios from "axios";

//let urlApi = 'https://newenginedb.herokuapp.com/update/';
let urlApi = 'http://localhost:5050/update/';

export default {
    async UPDATE_ENGINE_MANUFACTURE({commit}, updateDataObj) {
        commit('SET_LOAD_UPDATE_ENGINE_MANUFACTURE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'updateEngManufacture',
            data: updateDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit(' SET_LOAD_UPDATE_ENGINE_MANUFACTURE', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit(' SET_LOAD_UPDATE_ENGINE_MANUFACTURE', false);
                return error
            })
    },
    async UPDATE_DATA_AUTO_MODEL({commit}, updateDataObj) {
        commit('SET_LOAD_UPDATE_AUTO_MODEL', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'updateAutoModel',
            data: updateDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_UPDATE_AUTO_MODEL', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_UPDATE_AUTO_MODEL', false);
                return error
            })
    },
    async UPDATE_PARAM_NAME({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_PARAM_NAME', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'updateParameterName',
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
    async UPDATE_DATA_FUEL_TYPE({commit}, updateDataObj) {
        commit('SET_LOAD_UPDATE_FUEL_TYPE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'updateFuelType',
            data: updateDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_UPDATE_FUEL_TYPE', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_UPDATE_FUEL_TYPE', false);
                return error
            })
    },
    async UPDATE_DATA_ENGINE_NUMBER({commit}, updateDataObj) {
        commit('SET_LOAD_UPDATE_ENGINE_NUMBER', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'updateEngNumber',
            data: updateDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_UPDATE_ENGINE_NUMBER', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_UPDATE_ENGINE_NUMBER', false);
                return error
            })
    },
    async UPDATE_DATA_ELEMENTS({commit}, updateDataObj) {
        commit('SET_LOAD_UPDATE_ELEMENTS', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'updateElements',
            data: updateDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_UPDATE_ELEMENTS', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_UPDATE_ELEMENTS', false);
                return error
            })
    },
    async UPDATE_DATA_PARAMETERS({commit}, updateDataObj) {
        commit('SET_LOAD_UPDATE_PARAMETERS', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'updateParameters',
            data: updateDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_UPDATE_PARAMETERS', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_UPDATE_PARAMETERS', false);
                return error
            })
    },
    async UPDATE_DATA_MEASUREMENT_UNITS({commit}, updateDataObj) {
        commit('SET_LOAD_UPDATE_MEASUREMENT_UNITS', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'updateMeasurementUnitsService',
            data: updateDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_UPDATE_MEASUREMENT_UNITS', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_UPDATE_MEASUREMENT_UNITS', false);
                return error
            })
    },
    async UPDATE_DATA_ENGINE({commit}, updateDataObj) {
        commit('SET_LOAD_UPDATE_ENGINE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'updateEngine',
            data: updateDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_UPDATE_ENGINE', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_UPDATE_ENGINE', false);
                return error
            })
    },
    async UPDATE_DATA_AUTO_MANUFACTURE({commit}, updateDataObj) {
        commit('SET_LOAD_UPDATE_AUTO_MANUFACTURE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'updateAutoManufacture',
            data: updateDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_UPDATE_AUTO_MANUFACTURE', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_UPDATE_AUTO_MANUFACTURE', false);
                return error
            })
    },
    async UPDATE_DATA_CYLINDERS({commit}, updateDataObj) {
        commit('SET_LOAD_UPDATE_CYLINDERS', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'updateCylinders',
            data: updateDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_UPDATE_CYLINDERS', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_UPDATE_CYLINDERS', false);
                return error
            })
    }, async UPDATE_DATA_SUPERCHARGE_TYPE({commit}, updateDataObj) {
        commit('SET_LOAD_UPDATE_SUPERCHARGE_TYPE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'updateSuperchargedType',
            data: updateDataObj,
            responseType: 'json'
        }).then(resp => {
            commit('SET_SAVE_STATUS', resp.data)
            commit('SET_LOAD_UPDATE_SUPERCHARGE_TYPE', false);
            return resp;
        })
            .catch((error) => {
                console.log(error);
                commit('SET_LOAD_UPDATE_SUPERCHARGE_TYPE', false);
                return error
            })
    }
}