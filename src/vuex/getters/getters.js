export default {
    ENGDATA(state) {
        return state.engData;
    },
    ENGDATA_TREE(state) {
        return state.engdataTree;
    },
    STARTPARAM(state) {
        return state.startParam;
    },
    SHOW_LOAD(state) {
        return state.showLoad;
    },
    LISTPARAM(state) {
        return state.listParam;
    },
    LISTPARAMUP(state) {
        return state.listParamUp;
    },
    PARAM_NAME_AND_UNITS(state) {
        return state.paramNameAndUnits;
    },
    ELEMENTS(state) {
        return state.elements;
    },
    ELEMENTS_UPDATE(state) {
        return state.elementsUpdate;
    },
    TREE_ROOT_NAMES(state) {
        return state.treeRootNames;
    },
    SEARCHDATA(state) {
        return state.searchData;
    },
    LOADPARAM(state) {
        return state.loadParam;
    },
    LOAD_PARAM_FOR_TREE(state) {
        return state.loadParamForTree;
    },
    LOAD_SAVE_AUTOMOBILE_ENGINE(state) {
        return state.loadSave.automobileEngine;
    },
    LISTNEWELEM(state) {
        return state.listNewElem;
    },
    LOAD_TREE_UPDATE(state) {
        return state.loadTreeUpdate;
    },
    AUTO_ENGINE(state) {
        return state.autoEngine;
    },
    AUTO_ENGINE_LOAD(state) {
        return state.autoEngineLoad;
    },
    ELEMENTS_AND_MAX_ID(state) {
        return state.elementsAndMaxId;
    },
    LOAD_SAVE: (state) => {
        return state.loadSave;
    },
    LOAD_SAVE_PARAM_NAME: (state,) => {
        return state.loadSave.paramName;
    },
    ENGINE: (state,) => {
        return state.engine;
    },
    LOAD_SAVE_ELEMENTS: (state) => {
        return state.loadSave.elements;
    },
    LOAD_UPLOAD: (state) => {
        return state.loadUpdate;
    },
    LOAD_ADDITIONAL_DATA: (state) => {
        return state.allAdditionalDataLoad;
    },
    ADDITIONAL_DATA: (state) => {
        return state.allAdditionalData;
    },
    PARAM_NAME: (state) => {
        return state.paramName;
    },
    SAVE_STATUS: (state) => {
        return state.saveStatus;
    },
    UPDATE_ENGINE: (state) => {
        return state.updateDataObj;
    },
    ELEMENTS_LOAD: (state) => {
        return state.elementsLoad;
    }

}
