<template>
    <div>

        <div class="row" style="width: 100%;">
            <div class="col-md-2"></div>
            <VueDataList02
                    class="col-md-4"
                    :title-input="$ml.get('word.newBlockText')"
                    :items="PARAM_NAME_AND_UNITS.paramName"
                    :update-obj="newBlock"
                    index-item="name"
                    index="data"
                    :holder-num=0
            ></VueDataList02>
            <div class="col col-md-2">
                <button class="btn btn-block buttonanim btn-secondary" type="button" data-toggle="collapse"
                        v-on:click="addNewBlock(1)"
                        @click="advanceSearch=!advanceSearch">
                         <span>{{$ml.get('word.add')}}
                        </span>
                </button>
            </div>
            <div class="col-md-2">
                <button type="submit" @click="saveElemParam(1)"
                        class="btn  btn-block btn-outline-dark">
                    <span>{{$ml.get('word.update')}}</span>
                </button>
            </div>
            <div class="col-md-2"></div>

        </div>
        <hr/>
        <div style="display: flex;">
            <el-tabs tab-position="left" style="height: auto; width: 100%">
                <el-tab-pane v-for="elem in ELEMENTS_TREE.elementsCh" v-bind:key="elem" :label="elem.name"
                             style="width: 100%">
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-5">
                            <scroll-container>
                                <dev class="tree-st">
                                    <tree-item
                                            v-for="treeItem in elem.elementsCh"
                                            v-bind:key="treeItem"
                                            class="item"
                                            change-mod="tree"
                                            :item="treeItem"
                                            :nav="treeItem.name"
                                            :choice-param="choiceParam"
                                            :space="''"
                                            :nowPressed=nowPressed
                                            :id-parent-elem="elem.id"
                                            :show-edit-param="showEditParam"
                                            @set-color-elem="setColorElem"
                                            @parent-delete="deleteElem"
                                            @get-size-param="getParamSizeEelem"
                                    />

                                    <button type="button"
                                            @click="addElement(elem)"
                                            class="btn item btn-outline-dark"
                                            style="width: 40%; margin-left: 20%;"
                                    >{{$ml.get('word.add')}}
                                    </button>
                                    <div style="height: 5vh"></div>
                                </dev>
                            </scroll-container>
                        </div>
                        <div class="col-md-6 color-pick">
                            <h2 style="color: gray" v-show="!nowPressed.linkOnButt.isPressed">
                                {{$ml.get('msg.chooseColor')}}
                            </h2>
                            <h3 class="title-color"
                                v-show="nowPressed.linkOnButt.isPressed">{{nameElem}}</h3>
                            <div class="color-item" v-show="nowPressed.linkOnButt.isPressed">
                                <chrome-picker v-model="colors" style=" margin: 1vw;"/>
                                <swatches-picker v-model="colors" style=" margin: 1vw;"/>
                            </div>

                            <slider-picker class="color-footer" v-show="nowPressed.linkOnButt.isPressed"
                                           v-model="colors"/>
                            <div class="btn-color-panel" v-show="nowPressed.linkOnButt.isPressed">
                                <h4>color:</h4>
                                <div class="colorExmp" :style='{background:colors.hex}'></div>

                                <el-button type="danger" @click="nowPressed.linkOnButt.isPressed=false">
                                    {{$ml.get('word.cancel')}}
                                </el-button>
                                <el-button type="success" @click="addElemToUpdateList">
                                    {{$ml.get('word.confirm')}}
                                </el-button>
                            </div>
                        </div>


                    </div>
                </el-tab-pane>

            </el-tabs>

        </div>
    </div>
</template>

<script>

    import {mapActions, mapGetters, mapMutations} from "vuex";
    import TreeItem from "../tree/tree";
    import VueDataList02 from "../input/vue-datalist";
    import {Swatches, Chrome, Slider} from 'vue-color'

    export default {
        name: "tree-struct",
        components: {
            //'photoshop-picker': Photoshop,
            //'material-picker': Material,
            // 'compact-picker': compact,
            'swatches-picker': Swatches,
            'slider-picker': Slider,
            // 'sketch-picker': sketch,
            'chrome-picker': Chrome,
            VueDataList02, TreeItem
        },
        data: () => ({
            colors: {hex: '#194d33'},
            newBlock: {
                data: null
            },
            elemTree: null,
            updateObj: {
                units: null
            },
            dialogTableVisible: false,
            saveListParam: [],
            listNewParam: [],
            listParam: [],
            choiceParam: [],
            saveElemParamV: null,
            updateDataObj: {
                id: null
            },
            listElemUpdate: [],
            errorMessage: '',
            nowPressed: {
                linkOnButt: {
                    isPressed: false
                }
            },
            tempItem: {},
            nameElem: '',
            saveElemData: {
                elemId: null,
                paramNameFk: null,
                parentId: null
            },
            showEditParam: {
                show: false
            },
            listNewElem: [],
            test: null,
            elemId: null
        }),
        mounted() {
            this.GET_ELEMENTS_TREE();
            this.GET_ALL_PARAM_NAME();
            this.GET_PARAM_NAME();

        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
            ...mapGetters([
                'STARTPARAM',
                'ENGDATA',
                'LISTPARAM',
                'LISTPARAMUP',
                'PARAM_NAME_AND_UNITS',
                'ELEMENTS_TREE_LOAD',
                'SEARCHDATA',
                'PARAM_SIZE_NAME',
                'LOAD_PARAM_SIZE_NAME',
                'ELEMENTS_TREE',
                'TREE_ROOT_NAMES',
                'ELEMENTS_LOAD',
                'ELEMENTS_UPDATE',
                'ELEMENTS_AND_MAX_ID',
                'LISTNEWELEM',
                'LOAD_TREE_UPDATE',
                'LOAD_SAVE_ELEMENTS',
                'PARAM_NAME',
                'TREE_ELEMENTS',

            ])
        },
        methods: {
            ...mapActions([
                'GET_PARAMTRS',
                'SAVE_ELEM',
                'GET_AUTOENG_BY_PARAM',
                'GET_PARAM_NAME',
                'GET_ELEMENTS_AND_MAX_ID',
                'GET_PARAM_SIZE_NAME',
                'GET_TREE_ELEMENTS',
                'GET_AUTO_BY_ENG',
                'UPDATE_All_ELEM',
                'GET_TREE_ROOT_NAMES',
                'SAVE_DATA_ELEMENTS',
                'GET_ELEMENTS_TREE',
                'GET_ELEMENTS_UPDATE',
                'GET_PARAM_NAME',
                'UPDATE_DATA_ELEMENTS',
                'GET_ALL_PARAM_NAME'

            ])
            ,
            ...mapMutations({
                setElemTree: 'SET_ELEMENTS_TREE',
                setParamSizeName: 'SET_PARAM_SIZE_NAME',
                setListParam: 'SET_LISTPARAM_ELEMENT',
                setListNewElem: 'SET_LIST_NEW_PARAM',
                setMaxId: 'SET_ELEMENTS_TREE_MAXID'

            })
            ,
            async getParamSizeEelem(elemId) {
                this.GET_PARAM_SIZE_NAME({
                    id: elemId
                });
                this.dialogTableVisible = true
            },

            saveParam(current) {
                let ind = null;
                this.saveListParam.forEach(
                    (param, index) => {
                        if (param.id === current.id) {
                            ind = index;
                        }
                    }
                )
                if (ind !== null) {


                    this.saveListParam[ind] = {
                        id: current.id,
                        elemId: current.elemId,
                        name: current.name,
                        units: current.units,
                        doubleMin: current.doubleMin,
                        doubleMax: current.doubleMax,
                        doubleNum: current.doubleNum,
                        source: current.source
                    }
                } else {
                    this.saveListParam.push({
                        id: current.id,
                        elemId: current.elemId,
                        name: current.name,
                        units: current.units,
                        doubleMin: current.doubleMin,
                        doubleMax: current.doubleMax,
                        doubleNum: current.doubleNum,
                        source: current.source
                    });
                }
                console.log(1)
            },
            updateOldParam(current) {
                let ind = null;
                this.saveListParam.forEach(
                    (param, index) => {
                        if (param.id === current.id) {
                            ind = index;
                        }
                    }
                )


                if (ind !== null) {
                    this.listNewParam[ind] = {
                        id: current.id,
                        elemId: current.elemId,
                        name: current.name,
                        units: current.units,
                        doubleMin: current.doubleMin,
                        doubleMax: current.doubleMax,
                        doubleNum: current.doubleNum,
                        author: current.author,
                        source: current.source,
                        status: current.status,
                        editRow: current.editRow,
                    }

                } else {
                    this.listNewParam.push({
                        id: current.id,
                        elemId: current.elemId,
                        name: current.name,
                        units: current.units,
                        doubleMin: current.doubleMin,
                        doubleMax: current.doubleMax,
                        doubleNum: current.doubleNum,
                        author: current.author,
                        source: current.source,
                        status: current.status,
                        editRow: current.editRow
                    });
                }
                console.log(1)
            },
            deleteElem(id) {
                this.ELEMENTS_TREE.elementsCh.map(items => {
                        items.elementsCh = items.elementsCh.filter(elem => elem.id !== id)
                    }
                )
                console.log(id)
            },
            addElement(current) {
                let elmTreeTemp = current;
                elmTreeTemp.elementsCh.push({
                        id: this.ELEMENTS_TREE.maxId,
                        elementsCh: [{
                            id: 0,
                            elementsCh: [],
                            name: '',
                            paramIsNotEmpty: true,
                            parametersIsExistInChilda: true,

                        }],
                        name: '',
                        paramIsNotEmpty: true,
                        parametersIsExistInChilda: true
                    }
                );

                //this.setElemTree(elmTreeTemp);
                this.setMaxId(this.ELEMENTS_TREE.maxId + 1)
                //   this.setMaxId(this.ELEMENTS.maxId + 1);
                console.log(1);
            },
            saveElem(number) {
                this.saveElemData.parentId = this.ELEMENTS_TREE.id;
                this.listNewElem = this.LISTNEWELEM;
                this.listNewElem.push(this.saveElemData);
                this.setListNewElem(this.listNewElem);
                console.log(number)
            },
            addElemToUpdateList() {
                this.listElemUpdate.push({
                    elemId: this.elemId,
                    parentId: null,
                    paramNameFk: null,
                    color: this.colors.hex
                })
                this.tempItem.color = this.colors.hex
                this.$message({
                    showClose: true,
                    message: this.$ml.get('msg.colorAdd'),
                    type: 'success'
                });
                console.log(1)
            },
            addNewParam(number) {

                this.listNewParam.push({
                    id: 0,
                    elemId: this.elemId,
                    auto_id: this.auto_id,
                    name: null,
                    nameElemId: this.ELEMENTS_TREE.maxId + 1,
                    units: null,
                    doubleMin: null,
                    doubleMax: null,
                    doubleNum: null,
                    author: null,
                    source: null,
                    status: null,
                    editRow: true
                });
                this.setMaxId(this.ELEMENTS_TREE.maxId + 1);
                console.log(number)
            },

            async addNewBlock(number) {
                let elmTreeTemp = this.ELEMENTS_TREE;
                elmTreeTemp.elementsCh.push({
                        id: this.ELEMENTS_TREE.maxId,
                        elementsCh: [{
                            id: 0,
                            elementsCh: [],
                            name: '',
                            paramIsNotEmpty: true,
                            parametersIsExistInChilda: true,

                        }],
                        name: this.PARAM_NAME_AND_UNITS.paramName.find(param =>
                            param.id === this.newBlock.data).name,
                        paramIsNotEmpty: true,
                        parametersIsExistInChilda: true
                    }
                );
                this.listNewElem = this.LISTNEWELEM;
                this.listNewElem.push({
                    parentId: 0,
                    elemId: this.ELEMENTS_TREE.maxId,
                    paramNameFk: this.newBlock.data
                });
                this.setElemTree(elmTreeTemp);
                this.setListNewElem(this.listNewElem);
                this.setMaxId(this.ELEMENTS_TREE.maxId + 1);
                console.log(number)
            },
            setColorElem(item, color, name, number, link) {
                this.tempItem = item
                link.isPressed = !link.isPressed
                this.colors.hex = color
                this.nameElem = name
                this.nowPressed.linkOnButt.isPressed = false;
                this.nowPressed.linkOnButt = link;
                this.elemId = number;
                console.log(number);
            },
            async saveElemParam(number) {
                // this.saveElemParamV = {
                //    listElem: this.LISTNEWELEM,
                //     listSaveParam: this.listNewParam.filter(param => (!param.editRow && param.id === 0)),
                //     listUpdateParam: this.listNewParam.filter(param => (!param.editRow && param.id !== 0))
                //  };
                this.SAVE_ELEM({
                    listElem: this.LISTNEWELEM,
                    listUpdateElem: this.listElemUpdate
                });
                this.$message({
                    showClose: true,
                    message: this.$ml.get('word.dataAddSuccess'),
                    type: 'success'
                });
                console.log(number)
            }
            ,
            //query to get a list of parameter names
            async getElements(number) {
                this.listNewParam = [];
                this.showEditParam.show = false;
                this.GET_ELEMENTS_AND_MAX_ID(this.updateDataObj.id);
                //this.GET_ELEMENTS_AND_MAX_ID(1);
                this.elemTree = this.ELEMENTS_AND_MAX_ID.elements.elementsCh;
                console.log(number)
            }
        }
    }
</script>

<style scoped>
    .color-pick {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .color-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 25vh;
    }

    scroll-container {
        display: block;
        width: 650px;
        height: 500px;
        overflow-y: scroll;
        scroll-behavior: smooth;
    }

    .color-footer {
        padding-top: 2vh;
        width: 75%;
        margin: 1vw;
    }

    .color-footer {
        animation: moveInBottom 0.5s ease-out;
        animation-fill-mode: backwards;
    }

    .color-item {
        animation: moveInTop 0.5s ease-out;
        animation-fill-mode: backwards;
    }

    .tree-st {
        position: relative;
        top: 5vh;
    }

    .title-color {
        color: gray;
        padding-bottom: 3vh;
        animation: arise 0.5s ease-out;
        animation-fill-mode: backwards;
    }

    .colorExmp {
        margin-left: 1vw;
        margin-right: 3vw;
        width: 65px;
        height: 100%;
    }

    .btn-color-panel {
        display: flex;
        flex-direction: row;
        align-items: center;
        align-self: center;
        padding-top: 2vh;
        animation: arise 0.5s ease-out;
        animation-fill-mode: backwards;
    }

    @keyframes arise {
        0% {
            opacity: 0;
            transform: scale(0.9);
        }

        100% {
            opacity: 1;
            transform: scale(1);;
        }
    }


    @keyframes moveInBottom {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }

        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }


    @keyframes moveInTop {
        0% {
            opacity: 0;
            transform: translateY(-30px);
        }

        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }
</style>