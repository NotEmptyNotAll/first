import axios from "axios";

//let urlApi = 'https://enginefinal.herokuapp.com/delete/';
let urlApi = 'http://localhost:5050/delete/';


export default {
    // eslint-disable-next-line no-unused-vars
    async DELETE_ELEMENTS({commit}, number) {
        return await axios({
            method: 'POST',
            url: urlApi + 'elements',
            data: {id: number},
            responseType: 'json'
        }).then(listParam => {
            if (listParam.data.listDependencyElements!==null) {
                commit('SET_DELETE_RESPONSE', {resp:false, id:number})//Exception from backend
            } else {
                commit('SET_DELETE_RESPONSE', {resp:true, id:number})//All data successfully deleted
            }

        })
            .catch((error) => {
                console.log(error);
                return error
            })
    },
    // eslint-disable-next-line no-unused-vars
    async DELETE_PARAM_NAME({commit}, number) {
        return await axios({
            method: 'POST',
            url: urlApi + 'paramName',
            data: {id: number},
            responseType: 'json'
        }).then(listParam => {
            if (listParam.data.listDependencyElements!==null) {
                commit('SET_DELETE_RESPONSE', {resp:false, id:number})//Exception from backend
            } else {
                commit('SET_DELETE_RESPONSE', {resp:true, id:number})//All data successfully deleted
            }

        })
            .catch((error) => {
                console.log(error);
                return error
            })
    },
    // eslint-disable-next-line no-unused-vars
    async DELETE_PARAMETERS({commit}, number) {
        return await axios({
            method: 'POST',
            url: urlApi + 'parameters',
            data: {id: number},
            responseType: 'json'
        }).then(listParam => {
            if (listParam.data.listDependencyElements !== null) {
                return false; //Exception from backend
            } else {
                return true; //All data successfully deleted
            }

        })
            .catch((error) => {
                console.log(error);
                return error
            })
    },
    // eslint-disable-next-line no-unused-vars
    async DELETE_AUTO_MODEL({commit}, number) {
        return await axios({
            method: 'POST',
            url: urlApi + 'autoModel',
            data: {id: number},
            responseType: 'json'
        }).then(listParam => {
             if (listParam.data.listDependencyElements!==null) {
                commit('SET_DELETE_RESPONSE', {resp:false, id:number})//Exception from backend
            } else {
                commit('SET_DELETE_RESPONSE', {resp:true, id:number})//All data successfully deleted
            }})
            .catch((error) => {
                console.log(error);
                return error
            })
    },
    // eslint-disable-next-line no-unused-vars
    async DELETE_ENGINE({commit}, number) {
         axios({
            method: 'POST',
            url: urlApi + 'engine',
            data: {id: number},
            responseType: 'json'
        }).then(listParam => {
            if (listParam.data.listDependencyElements!==null) {
                commit('SET_DELETE_RESPONSE', {resp:false, id:number})//Exception from backend
            } else {
                commit('SET_DELETE_RESPONSE', {resp:true, id:number})//All data successfully deleted
            }

        })
            .catch((error) => {
                console.log(error);
                return error
            })
    },
    // eslint-disable-next-line no-unused-vars
    async DELETE_AUTO_ENGINE({commit}, number) {
        return await axios({
            method: 'POST',
            url: urlApi + 'autoEngine',
            data: {id: number},
            responseType: 'json'
        }).then(listParam => {
             if (listParam.data.listDependencyElements!==null) {
                commit('SET_DELETE_RESPONSE', {resp:false, id:number})//Exception from backend
            } else {
                commit('SET_DELETE_RESPONSE', {resp:true, id:number})//All data successfully deleted
            }})
            .catch((error) => {
                console.log(error);
                return error
            })
    },
    // eslint-disable-next-line no-unused-vars
    async DELETE_MEASUREMENT_UNITS({commit}, number) {
        return await axios({
            method: 'POST',
            url: urlApi + 'measurementUnits',
            data: {id: number},
            responseType: 'json'
        }).then(listParam => {
             if (listParam.data.listDependencyElements!==null) {
                commit('SET_DELETE_RESPONSE', {resp:false, id:number})//Exception from backend
            } else {
                commit('SET_DELETE_RESPONSE', {resp:true, id:number})//All data successfully deleted
            }})
            .catch((error) => {
                console.log(error);
                return error
            })
    },
    // eslint-disable-next-line no-unused-vars
    async DELETE_CYLINDERS({commit}, number) {
        return await axios({
            method: 'POST',
            url: urlApi + 'cylinders',
            data: {id: number},
            responseType: 'json'
        }).then(listParam => {
             if (listParam.data.listDependencyElements!==null) {
                commit('SET_DELETE_RESPONSE', {resp:false, id:number})//Exception from backend
            } else {
                commit('SET_DELETE_RESPONSE', {resp:true, id:number})//All data successfully deleted
            }})
            .catch((error) => {
                console.log(error);
                return error
            })
    },
    // eslint-disable-next-line no-unused-vars
    async DELETE_FUEL_TYPE({commit}, number) {
        return await axios({
            method: 'POST',
            url: urlApi + 'fuelType',
            data: {id: number},
            responseType: 'json'
        }).then(listParam => {
             if (listParam.data.listDependencyElements!==null) {
                commit('SET_DELETE_RESPONSE', {resp:false, id:number})//Exception from backend
            } else {
                commit('SET_DELETE_RESPONSE', {resp:true, id:number})//All data successfully deleted
            }})
            .catch((error) => {
                console.log(error);
                return error
            })
    },
    // eslint-disable-next-line no-unused-vars
    async DELETE_ENGINE_MANUFACTURE({commit}, number) {
        return await axios({
            method: 'POST',
            url: urlApi + 'engineManufacture',
            data: {id: number},
            responseType: 'json'
        }).then(listParam => {
             if (listParam.data.listDependencyElements!==null) {
                commit('SET_DELETE_RESPONSE', {resp:false, id:number})//Exception from backend
            } else {
                commit('SET_DELETE_RESPONSE', {resp:true, id:number})//All data successfully deleted
            }})
            .catch((error) => {
                console.log(error);
                return error
            })
    },
    // eslint-disable-next-line no-unused-vars
    async DELETE_AUTO_MANUFACTURE({commit}, number) {
        return await axios({
            method: 'POST',
            url: urlApi + 'autoManufacture',
            data: {id: number},
            responseType: 'json'
        }).then(listParam => {
             if (listParam.data.listDependencyElements!==null) {
                commit('SET_DELETE_RESPONSE', {resp:false, id:number})//Exception from backend
            } else {
                commit('SET_DELETE_RESPONSE', {resp:true, id:number})//All data successfully deleted
            }})
            .catch((error) => {
                console.log(error);
                return error
            })
    },
    // eslint-disable-next-line no-unused-vars
    async DELETE_FILE_STORAGE({commit}, number) {
        return await axios({
            method: 'POST',
            url: urlApi + 'fileStorage',
            data: {id: number},
            responseType: 'json'
        }).then(listParam => {
             if (listParam.data.listDependencyElements!==null) {
                commit('SET_DELETE_RESPONSE', {resp:false, id:number})//Exception from backend
            } else {
                commit('SET_DELETE_RESPONSE', {resp:true, id:number})//All data successfully deleted
            }})
            .catch((error) => {
                console.log(error);
                return error
            })
    },
    // eslint-disable-next-line no-unused-vars
    async DELETE_SUPERCHARGED({commit}, number) {
        return await axios({
            method: 'POST',
            url: urlApi + 'supercharged',
            data: {id: number},
            responseType: 'json'
        }).then(listParam => {
             if (listParam.data.listDependencyElements!==null) {
                commit('SET_DELETE_RESPONSE', {resp:false, id:number})//Exception from backend
            } else {
                commit('SET_DELETE_RESPONSE', {resp:true, id:number})//All data successfully deleted
            }})
            .catch((error) => {
                console.log(error);
                return error
            })
    },
}