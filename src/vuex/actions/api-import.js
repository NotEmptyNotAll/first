import axios from "axios";

let urlApi = 'https://newenginedb.herokuapp.com/import/';
//let urlApi = 'http://localhost:5050/import/';

export default {
    async IMPORT_DATA_SUPERCHARGE_TYPE({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_SUPERCHARGE_TYPE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'SuperchargedType',
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
    },
    async IMPORT_DATA_ENGINE({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_ENGINE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'Engine',
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
    async IMPORT_DATA_AUTOMOBILE_ENGINE({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_AUTOMOBILE_ENGINE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'AutoEngine',
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
    async IMPORT_DATA_MEASUREMENT_UNITS({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_MEASUREMENT_UNITS', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'MeasurementUnitsService',
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
    async IMPORT_PARAM_NAME({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_PARAM_NAME', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'ParameterName',
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
    async IMPORT_DATA_CYLINDERS({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_CYLINDERS', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'Cylinders',
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
    },
    async IMPORT_ENGINE_MANUFACTURE({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_ENGINE_MANUFACTURE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'EngManufacture',
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
    async IMPORT_DATA_FUEL_TYPE({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_FUEL_TYPE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'FuelType',
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
    async IMPORT_DATA_AUTO_MODEL({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_AUTO_MODEL', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'AutoModel',
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
    async IMPORT_DATA_AUTO_MANUFACTURE({commit}, saveDataObj) {
        commit('SET_LOAD_SAVE_AUTO_MANUFACTURE', true);
        return await axios({
            method: 'POST',
            url: urlApi + 'AutoManufacture',
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
    }
}