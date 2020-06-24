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
                <button  type="submit" @click="saveElemParam(1)"
                        class="btn  btn-block btn-outline-dark">
                    <span>{{$ml.get('word.update')}}</span>
                </button>
            </div>
            <div class="col-md-2"></div>

        </div>
        <hr/>
        <el-tabs tab-position="left" style="height: auto">
            <el-tab-pane v-for="elem in ELEMENTS_TREE.elementsCh" v-bind:key="elem" :label="elem.name">
                <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-4">
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
                                @get-paramtrs="getParamtrs"
                                @parent-delete="deleteElem"
                        />
                        <button type="button"
                                @click="addElement(elem)"
                                class="btn  btn-outline-dark"
                                style="width: 70%; margin-left: 10%;margin-right: 15%"
                        >{{$ml.get('word.add')}}
                        </button>
                    </div>

                </div>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>

    import {mapActions, mapGetters, mapMutations} from "vuex";
    import TreeItem from "../tree/tree";
    import VueDataList02 from "../input/vue-datalist";

    export default {
        name: "tree-struct",
        components: {VueDataList02, TreeItem},
        data: () => ({
            newBlock: {
                data: null
            },
            elemTree: null,
            updateObj: {
                units: null
            },
            saveListParam: [],
            listNewParam: [],
            listParam: [],
            choiceParam: [],
            saveElemParamV: null,
            updateDataObj: {
                id: null
            },
            errorMessage: '',
            nowPressed: {
                linkOnButt: {
                    isPressed: false
                }
            },
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
                'GET_TREE_ELEMENTS',
                'GET_AUTO_BY_ENG',
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
                setListParam: 'SET_LISTPARAM_ELEMENT',
                setListNewElem: 'SET_LIST_NEW_PARAM',
                setMaxId: 'SET_ELEMENTS_TREE_MAXID'

            })
            ,
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
            getParamtrs(nav, number, link) {
                this.nowPressed.linkOnButt.isPressed = false;
                this.nowPressed.linkOnButt = link;
                this.GET_PARAMTRS({id: number, auto_id: this.auto_id});
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
                    listElem: this.LISTNEWELEM
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

</style>