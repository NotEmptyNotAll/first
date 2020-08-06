import Vue from 'vue'
import Vuex from 'vuex'

import apiRequset from './actions/api-requests'
import apiRequsetSave from './actions/api-save-requests'
import apiImport from './actions/api-import'
import apiRequsetUpdate from './actions/api-update-request'
import getters from "./getters/getters";
import mutations from "./mutations/mutations"
import {auth} from './auth.module';
const actions = {...apiRequset, ...apiImport,...apiRequsetSave, ...apiRequsetUpdate}

Vue.use(Vuex);
let store = new Vuex.Store({
    modules: {
        auth
    },
    state: {
        allAutoEng:[],
        paramSizeName:[],
        loadListUrl:false,
        loadParamSizeName:false,
        loadAllAutoEng:false,
        treeElemets:[],
        engdataTree:[],
        elementsLoad:false,
        paramName:[],
        showEditParam:false,
        engine:null,
        loadParamForTree:false,
        showLoad: false,
        autoEngine: null,
        autoEngineLoad: false,
        loadTreeUpdate: false,
        engData: [],
        startParam: [],
        listParam: [],
        listParamUp: [],
        listNewElem: [],
        elemTree: [],
        elem_tree_load: false,
        elementsAndMaxId: null,
        paramNameAndUnits: [],
        elements: null,
        elementsUpdate: null,
        treeRootNames: [],
        loadParam: false,
        allAdditionalData: [],
        allAdditionalDataLoad: false,
        loadSave: {
            paramName:false,
            parameters: false,
            measurementUnits: false,
            cylinders: false,
            parameterName: false,
            engineManufacture: false,
            autoManufacturer: false,
            autoModel: false,
            fuelType: false,
            engine: false,
            engineNumber: false,
            automobileEngine: false,
            elements: false,
            superchargedType: false
        },
        updateDataObj: {
            engineType: null,
            engineManufacturerFk: null,
            cylindersPlacementFk: null,
            fuelTypeFk: null,
            superchargedTypeFk: null,
            cylindersNumber: null,
            flapNumber: null,
            pistonDiameter: null,
            pistonStroke: null,
            engineCapacity: null,
            powerKwt: null,
            degreeCompression: null,
            releaseYearFrom: null,
            releaseYearBy: null,
            horsepower: null
        },
        loadUpdate: {
            parameters: false,
            measurementUnits: false,
            cylinders: false,
            parameterName: false,
            engineManufacture: false,
            autoManufacturer: false,
            autoModel: false,
            fuelType: false,
            engine: false,
            engineNumber: false,
            automobileEngine: false,
            elements: false,
            superchargedType: false
        },
        saveStatus: null,
        searchData: []
    },
    mutations,
    actions,
    getters
});

export default store;