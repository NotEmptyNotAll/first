export default {
    SET_ENGDATA: (state, engData) => {
        state.engData = engData;
    },
    SET_ENGDATA_TREE: (state, engData) => {
        state.engdataTree = engData;
    },
    SET_TREE_ELEMENTS: (state, treeElemets) => {
        state.treeElemets = treeElemets;
    },
    SET_ELEMENTS_UPDATE(state, engData) {
         state.elementsUpdate=engData;
    },
    SET_STARTPARAM: (state, startParam) => {
        state.startParam = startParam;
    },
    SET_SHOW_LOAD: (state, showLoad) => {
        state.showLoad = showLoad;
    },
    SET_LISTPARAM_ELEMENT: (state, listParam) => {
        state.listParam = listParam;
    },
    SET_PARAM_NAME_AND_UNITS: (state, paramNameAndUnits) => {
        state.paramNameAndUnits = paramNameAndUnits;
    },
    SET_ELEMENTS: (state, elements) => {
        state.elements = elements;
    },
    SET_TREE_ROOT_NAMES: (state, treeRootNames) => {
        state.treeRootNames = treeRootNames;
    },
    SET_LIST_NEW_PARAM: (state, listNewParam) => {
        state.listNewElem = listNewParam;
    },
    SET_ELEMENTS_AND_MAX_ID: (state, elementsAndMaxId) => {
        state.elementsAndMaxId = elementsAndMaxId;
    },
    SET_MAX_ID: (state, elementsAndMaxId) => {
        state.elementsUpdate.maxId = elementsAndMaxId;
    },
    SET_LOAD_TREE_UPDATE: (state, loadTreeUpdate) => {
        state.loadTreeUpdate = loadTreeUpdate;
    },
    SET_AUTO_ENGINE: (state, autoEngine) => {
        state.autoEngine = autoEngine;
    },
    SET_AUTO_ENGINE_LOAD: (state, autoEngineLoad) => {
        state.loadSave.automobileEngine = autoEngineLoad;
    },
    SET_SEARCH_DATA: (state, searchData) => {
        state.searchData = searchData;
    },
    SET_ENGINE: (state, engine) => {
        return  state.engine=engine;
    },
    SET_LOADPARAM: (state, loadParam) => {
        state.loadParam = loadParam;
    },
    SET_LOAD_PARAM_FOR_TREE(state, loadParame) {
        state.loadParamForTree = loadParame;
    },
    SET_PARAM_NAME: (state, paramName) => {
        state.paramName = paramName;
    },
    SET_ELEMENTS_LOAD: (state, elementsLoad) => {
        state.elementsLoad = elementsLoad;
    },
    SET_ELEMENTS_TREE: (state, elementsLoad) => {
        state.elemTree = elementsLoad;
    },
    SET_ELEMENTS_TREE_MAXID: (state, maxId) => {
        state.elemTree.maxId = maxId;
    },
    SET_ELEMENTS_TREE_LOAD: (state, elem_tree_load) => {
        state.elem_tree_load = elem_tree_load;
    },
    SET_LOAD_UPDATE_PARAMETERS: (state, loadSave) => {
        state.loadUpdate.parameters = loadSave;
    },
    SET_LOAD_UPDATE_MEASUREMENT_UNITS: (state, loadSave) => {
        state.loadUpdate.measurementUnits = loadSave;
    },
    SET_LOAD_UPDATE_AUTOMOBILE_ENGINE: (state, loadSave) => {
        state.loadUpdate.automobileEngine = loadSave;
    },
    SET_LOAD_UPDATE_ENGINE_MANUFACTURE: (state, loadSave) => {
        state.loadUpdate.engineManufacture = loadSave;
    },
    SET_LOAD_UPDATE_AUTO_MODEL: (state, loadSave) => {
        state.loadUpdate.autoModel = loadSave;
    },
    SET_LOAD_UPDATE_FUEL_TYPE: (state, loadSave) => {
        state.loadUpdate.fuelType = loadSave;
    },
    SET_LOAD_UPDATE_ENGINE: (state, loadSave) => {
        state.loadUpdate.engine = loadSave;
    },
    SET_LOAD_UPDATE_ENGINE_NUMBER: (state, loadSave) => {
        state.loadUpdate.engineNumber = loadSave;
    },
    SET_LOAD_UPDATE_ELEMENTS: (state, loadSave) => {
        state.loadUpdate.elements = loadSave;
    },
    SET_LOAD_UPDATE_AUTO_MANUFACTURE: (state, loadSave) => {
        state.loadUpdate.autoManufacturer = loadSave;
    },
    SET_LOAD_UPDATE_CYLINDERS: (state, loadSave) => {
        state.loadUpdate.cylinders = loadSave;
    },
    SET_LOAD_UPDATE_SUPERCHARGE_TYPE: (state, loadSave) => {
        state.loadUpdate.superchargedType = loadSave;
    },
    SET_LOAD_SAVE_PARAMETERS: (state, loadSave) => {
        state.loadSave.parameters = loadSave;
    },
    SET_LOAD_SAVE_MEASUREMENT_UNITS: (state, loadSave) => {
        state.loadSave.measurementUnits = loadSave;
    },
    SET_LOAD_SAVE_PARAM_NAME: (state, loadSave) => {
        state.loadSave.paramName = loadSave;
    },
    SET_LOAD_SAVE_AUTOMOBILE_ENGINE: (state, loadSave) => {
        state.loadSave.automobileEngine = loadSave;
    },
    SET_LOAD_SAVE_ENGINE_MANUFACTURE: (state, loadSave) => {
        state.loadSave.engineManufacture = loadSave;
    },
    SET_LOAD_SAVE_AUTO_MODEL: (state, loadSave) => {
        state.loadSave.autoModel = loadSave;
    },
    SET_LOAD_SAVE_FUEL_TYPE: (state, loadSave) => {
        state.loadSave.fuelType = loadSave;
    },
    SET_LOAD_SAVE_ENGINE: (state, loadSave) => {
        state.loadSave.engine = loadSave;
    },
    SET_LOAD_SAVE_ENGINE_NUMBER: (state, loadSave) => {
        state.loadSave.engineNumber = loadSave;
    },
    SET_LOAD_SAVE_ELEMENTS: (state, loadSave) => {
        state.loadSave.elements = loadSave;
    },
    SET_LOAD_SAVE_AUTO_MANUFACTURE: (state, loadSave) => {
        state.loadSave.autoManufacturer = loadSave;
    },
    SET_LOAD_SAVE_CYLINDERS: (state, loadSave) => {
        state.loadSave.cylinders = loadSave;
    },
    SET_LOAD_SAVE_SUPERCHARGE_TYPE: (state, loadSave) => {
        state.loadSave.superchargedType = loadSave;
    },
    SET_LOAD_ADDITIONAL_DATA: (state, loadSave) => {
        state.allAdditionalDataLoad = loadSave;
    },

    SET_ADDITIONAL_DATA: (state, data) => {
        state.allAdditionalData = data;
    },
    SET_SAVE_STATUS: (state, saveStatus) => {
        state.saveStatus = saveStatus;
    },
    //set update param
    SET_UPDATE_ENGINE_TYPE: (state, loadSave) => {
        state.updateDataObj.engineType = loadSave;
    },
    SET_UPDATE_MEASUREMENT_UNITS: (state, loadSave) => {
        state.updateDataObj.engineManufacturerFk = loadSave;
    },
    SET_UPDATE_AUTOMOBILE_ENGINE: (state, loadSave) => {
        state.updateDataObj.automobileEngine = loadSave;
    },
    SET_UPDATE_ENGINE_MANUFACTURE: (state, loadSave) => {
        state.updateDataObj.engineManufacturerFk = loadSave;
    },
    SET_UPDATE_AUTO_MODEL: (state, loadSave) => {
        state.updateDataObj.autoModel = loadSave;
    },
    SET_UPDATE_FUEL_TYPE: (state, loadSave) => {
        state.updateDataObj.fuelType = loadSave;
    },
    SET_UPDATE_ENGINE: (state, loadSave) => {
        state.updateDataObj.engine = loadSave;
    },
    SET_UPDATE_ENGINE_NUMBER: (state, loadSave) => {
        state.updateDataObj.engineNumber = loadSave;
    },
    SET_UPDATE_ELEMENTS: (state, loadSave) => {
        state.updateDataObj.elements = loadSave;
    },
    SET_UPDATE_AUTO_MANUFACTURE: (state, loadSave) => {
        state.updateDataObj.autoManufacturer = loadSave;
    },
    SET_UPDATE_CYLINDERS: (loadSave, state) => {
        state.updateDataObj.cylindersPlacementFk = loadSave;
    },
    SET_UPDATE_SUPERCHARGE_TYPE: (state, loadSave) => {
        state.updateDataObj.superchargedType = loadSave;
    },

}
