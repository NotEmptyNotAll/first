export default {
    ENGDATA(state) {
        return state.engData;
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
    PARAM_NAME_AND_UNITS(state) {
        return state.paramNameAndUnits;
    },
    ELEMENTS(state) {
        return state.elements;
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
    LOAD_UPLOAD: (state) => {
        return state.loadUpdate;
    },
    LOAD_ADDITIONAL_DATA: (state) => {
        return state.allAdditionalDataLoad;
    },
    ADDITIONAL_DATA: (state) => {
        return state.allAdditionalData;
    },
    SAVE_STATUS: (state) => {
        return state.saveStatus;
    },
    UPDATE_ENGINE: (state) => {
        return state.updateDataObj;
    }
}
