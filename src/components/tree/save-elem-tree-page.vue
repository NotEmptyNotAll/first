<template>
    <div class="container  card bg-white  rounded" id="save-elem-tree-page"
         style="width: 98vw;   border-style: solid;border-top-color: lightslategrey;border-width: 15px 0px 0px 0px;">
        <br/>
        <div class="search-logo" id="treelogo">
            <div class="head-text deepshd ">
                 <span v-if="LOAD_SAVE_ELEMENTS"><div
                         class="lds-dual-ring " style="margin-left: 47%"></div></span>
                <h4 v-if="!LOAD_SAVE_ELEMENTS"
                    style="width: 60%; margin-left: 20%; margin-right: 20%;text-align: center">{{ELEMENTS_UPDATE.name}}</h4>
            </div>
        </div>
        <br/>
        <br/>
        <div class="treeRow row " style="width: 100vw">
            <div class="col-md-1"></div>
            <vue-datalist
                    class="col-md-5"
                    :title-input="$ml.get('word.newBlockText')"
                    :items="PARAM_NAME_AND_UNITS.paramName"
                    :update-obj="newBlock"
                    index-item="name"
                    index="data"
                    :holder-num=0
            />
            <div class="col col-md-2">
                <button class="btn btn-block buttonanim btn-secondary" type="button" data-toggle="collapse"
                        v-on:click="addNewBlock(1)"
                        @click="advanceSearch=!advanceSearch">
                         <span>{{$ml.get('word.add')}}
                        </span>
                </button>
            </div>
            <div class="col-md-2">
                <button v- type="submit" @click="saveElemParam(1)"
                        class="btn  btn-block btn-outline-dark">
                    <span>{{$ml.get('word.update')}}</span>
                </button>
            </div>
            <div class="col-md-1"></div>

        </div>
        <hr style="position: center; width: 100%;"/>
        <br/>
        <div class="panelBody" style="width: 100%">
            <navig>
                <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                    <a v-for="current in ELEMENTS_UPDATE.elementsCh" v-bind:key="current"
                       class="nav-item nav-link "
                       :id="'nav-add-tab'+current.name" data-toggle="tab"
                       :href="'#nav-add'+current.name"
                       role="tab" :aria-controls="'nav-add'+current.name" aria-selected="true"
                       style="max-width: 30vw; color: black"
                       v-on:click="setListParam(null)"
                    >{{current.name}}</a>

                </div>
            </navig>
            <div class="tab-content rad-bottom bg-white" id="nav-tabContent" style="">
                <div v-for="current in ELEMENTS_UPDATE.elementsCh" v-bind:key="current"
                     class="  tab-pane fade " :id="'nav-add'+current.name"
                     :aria-labelledby="'nav-add-tab'+current.name">
                    <br/>
                    <br/>
                    <div class="row rowCenter">
                        <div class="col-md-3">
                            <div class="list-group">
                                <tree-item

                                        v-for="treeItem in current.elementsCh"
                                        v-bind:key="treeItem"
                                        class="item"
                                        change-mod="on"
                                        :item="treeItem"
                                        :nav="treeItem.name"
                                        :choice-param="choiceParam"
                                        :space="''"
                                        :nowPressed=nowPressed
                                        :id-parent-elem="current.id"
                                        :show-edit-param="showEditParam"
                                        @get-paramtrs="getParamtrs"

                                />
                                <button type="button"
                                        @click="addElement(current)"
                                        class="btn btn-block btn-outline-dark"
                                        style="width: 70%; margin-left: 15%;margin-right: 15%"
                                >{{$ml.get('word.add')}}
                                </button>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="vl"></div>
                        </div>
                        <div class="col-md-8">
                            <table class="table table-hover" style="min-height: 10vh">
                                <thead >
                                <tr>
                                    <th>{{$ml.get('word.name')}}</th>
                                    <th>{{$ml.get('word.units')}}</th>
                                    <th>{{$ml.get('word.from')}}</th>
                                    <th>{{$ml.get('word.by')}}</th>
                                    <th>{{$ml.get('word.value')}}</th>
                                    <th>{{$ml.get('word.status')}}</th>
                                    <th>{{$ml.get('word.source')}}</th>
                                    <th>{{$ml.get('word.action')}}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="current in LISTPARAM" v-bind:key="current">

                                    <td v-if="!current.editRow">
                                        {{PARAM_NAME.find(unit=>
                                        unit.id===current.name).data}}
                                    </td>
                                    <td v-if="current.editRow">
                                        <VueDatalist
                                                :items="PARAM_NAME.filter(elem=>{return !elem.tree_node})"
                                                :update-obj="current"
                                                index="name"
                                                :hide-title="true"
                                                :holder-num=0

                                        />
                                    </td>
                                    <td v-if="!current.editRow">{{PARAM_NAME_AND_UNITS.units.find(unit=>
                                        unit.id===current.units).data}}
                                    </td>

                                    <td v-if="current.editRow">
                                        <VueDatalist
                                                :items="PARAM_NAME_AND_UNITS.units"
                                                :update-obj="current"
                                                index="units"
                                                :hide-title="true"
                                                :holder-num=0

                                        />
                                    </td>
                                    <td v-if="!current.editRow">
                                        <span v-if="current.doubleMin!==null">{{Number(current.doubleMin).toFixed(4)}}</span>
                                        <span v-else></span>
                                    </td>
                                    <td v-if="current.editRow">
                                        <input type="number" class="form-control" v-model="current.doubleMin">
                                    </td>
                                    <td v-if="!current.editRow">
                                        <span v-if="current.doubleMax!==null">{{Number(current.doubleMax).toFixed(4)}}</span>
                                        <span v-else></span>
                                    </td>
                                    <td v-if="current.editRow">
                                        <input type="number" class="form-control" v-model="current.doubleMax">
                                    </td>
                                    <td v-if="!current.editRow">
                                        <span v-if="current.doubleNum!==null">{{Number(current.doubleNum).toFixed(4)}}</span>
                                        <span v-else></span>
                                    </td>
                                    <td v-if="current.editRow">
                                        <input type="number" class="form-control" v-model="current.doubleNum">
                                    </td>
                                    <td v-if="!current.editRow">{{PARAM_NAME_AND_UNITS.status.find(unit=>
                                        unit.id===current.status).data}}</td>
                                    <td v-if="current.editRow">
                                        <input type="text" class="form-control" v-model="current.status">
                                    </td>
                                    <td v-if="!current.editRow">{{current.source}}</td>
                                    <td v-if="current.editRow">
                                        <input type="text" class="form-control" v-model="current.source">
                                    </td>
                                    <td>
                                        <button type="button " v-if="!current.editRow"
                                                class="btn btn-group  btn-warning"
                                                @click="current.editRow=!current.editRow"
                                        >
                                                <span>
                                                  <b-icon icon="pencil" ></b-icon>
                                            </span>
                                        </button>
                                        <button v-if="current.editRow"
                                                type="button"
                                                class="btn  btn-success "
                                                @click="current.editRow=!current.editRow"
                                                v-on:click="updateOldParam(current)"
                                        >
                                            <span>
                                                <p class="h5 mb-2" ><b-icon icon="check" ></b-icon></p>
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                                <tr v-show="current.elemId===elemId " v-for="current in listNewParam"
                                    v-bind:key="current ">
                                    <td v-if="!current.editRow">
                                        {{PARAM_NAME.find(unit=>
                                        unit.id===current.name).data}}
                                    </td>
                                    <td v-if="current.editRow">
                                        <VueDatalist
                                                :items="PARAM_NAME.filter(elem=>{return !elem.tree_node})"
                                                :update-obj="current"
                                                index="name"
                                                :hide-title="true"
                                                :holder-num=0

                                        />
                                    </td>
                                    <td v-if="!current.editRow">{{PARAM_NAME_AND_UNITS.units.find(unit=>
                                        unit.id===current.units).data}}
                                    </td>
                                    <td v-if="current.editRow">
                                        <VueDatalist
                                                :items="PARAM_NAME_AND_UNITS.units"
                                                :update-obj="current"
                                                index="units"
                                                :hide-title="true"
                                                :holder-num=0

                                        />
                                    </td>
                                    <td v-if="!current.editRow">
                                        <span v-if="current.doubleMin!==null">{{Number(current.doubleMin).toFixed(4)}}</span>
                                        <span v-else></span></td>
                                    <td v-if="current.editRow">
                                        <input type="number" class="form-control" v-model="current.doubleMin">
                                    </td>
                                    <td v-if="!current.editRow">
                                        <span v-if="current.doubleMax!==null">{{Number(current.doubleMax).toFixed(4)}}</span>
                                        <span v-else></span></td>
                                    <td v-if="current.editRow">
                                        <input type="number" class="form-control" v-model="current.doubleMax">

                                    </td>
                                    <td v-if="!current.editRow">
                                        <span v-if="current.doubleNum!==null">{{Number(current.doubleNum).toFixed(4)}}</span>
                                        <span v-else></span>
                                    </td>
                                    <td v-if="current.editRow">
                                        <input type="number" class="form-control" v-model="current.doubleNum">

                                    </td>
                                    <td v-if="!current.editRow">{{PARAM_NAME_AND_UNITS.status.find(unit=>
                                        unit.id===current.status).data}}
                                    </td>
                                    <td v-if="current.editRow">
                                        <VueDatalist
                                                :items="PARAM_NAME_AND_UNITS.status"
                                                :update-obj="current"
                                                index="status"
                                                :hide-title="true"
                                                :holder-num=0

                                        />
                                    </td>
                                    <td v-if="!current.editRow">{{current.source}}</td>
                                    <td v-if="current.editRow">
                                        <input type="text" class="form-control" v-model="current.source">
                                    </td>
                                    <td>
                                        <button type="button" v-if="!current.editRow"
                                                class="btn btn-group  btn-warning"
                                                @click="current.editRow=!current.editRow"
                                        >
                                            <span>
                                                  <b-icon icon="pencil" ></b-icon>
                                            </span>
                                        </button>
                                        <button v-if="current.editRow"
                                                type="button"
                                                class="btn  btn-success "
                                                @click="current.editRow=!current.editRow"
                                                v-on:click="saveParam(current)"
                                        >
                                            <span>
                                                <p class="h5 md-2" ><b-icon icon="check" ></b-icon></p>
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="showEditParam.show">
                                    <td colspan="8">
                                        <button type="button"
                                                @click="addNewParam(1)"
                                                class="btn btn-block btn-outline-dark"
                                        >{{$ml.get('word.add')}}
                                        </button>
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <br/>
        <br/>
    </div>
</template>

<script>
    import VueDatalist from "../input/vue-datalist";

    import {mapActions, mapGetters, mapMutations} from "vuex";
    import TreeItem from "./tree";


    export default {
        name: "save-elem-tree-page",
        components: {
            TreeItem,
            VueDatalist
        },
        props: {
            auto_id: Number
        },
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
            this.GET_TREE_ROOT_NAMES();

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
                'SEARCHDATA',
                'TREE_ROOT_NAMES',
                'ELEMENTS_UPDATE',
                'ELEMENTS_AND_MAX_ID',
                'LISTNEWELEM',
                'LOAD_TREE_UPDATE',
                'LOAD_SAVE_ELEMENTS',
                'PARAM_NAME',

            ])
        },
        methods: {
            ...mapActions([
                'GET_PARAMTRS',
                'GET_AUTOENG_BY_PARAM',
                'GET_PARAM_NAME',
                'GET_ELEMENTS',
                'GET_AUTO_BY_ENG',
                'GET_TREE_ROOT_NAMES',
                'GET_ELEMENTS_AND_MAX_ID',
                'SAVE_DATA_ELEMENTS',
                'UPDATE_DATA_ELEMENTS',
                'GET_ALL_PARAM_NAME'

            ])
            ,
            ...mapMutations({
                setElemTree: 'SET_ELEMENTS_UPDATE',
                setListParam: 'SET_LISTPARAM_ELEMENT',
                setListNewElem: 'SET_LIST_NEW_PARAM',
                setMaxId: 'SET_MAX_ID'

            })
            ,
            saveParam(current) {
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
            addElement(current) {
                let elmTreeTemp = current;
                elmTreeTemp.elementsCh.push({
                        id: 0,
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

                //   this.setMaxId(this.ELEMENTS.maxId + 1);
                console.log(1);
            },
            saveElem(number) {
                this.saveElemData.parentId = this.ELEMENTS_UPDATE.id;
                this.saveElemData.elemId = this.ELEMENTS_UPDATE.maxId;
                this.listNewElem = this.LISTNEWELEM;
                this.listNewElem.push(this.saveElemData);
                this.setListNewElem(this.listNewElem);
                this.setMaxId(this.ELEMENTS_UPDATE.maxId + 1);

                console.log(number)
            },
            addNewParam(number) {

                this.listNewParam.push({
                    id: 0,
                    elemId: this.elemId,
                    auto_id: this.auto_id,
                    name: null,
                    nameElemId: this.ELEMENTS_UPDATE.maxId + 1,
                    units: null,
                    doubleMin: null,
                    doubleMax: null,
                    doubleNum: null,
                    author: null,
                    source: null,
                    status: null,
                    editRow: true
                });
                this.setMaxId(this.ELEMENTS_UPDATE.maxId + 1);
                console.log(number)
            },

            async addNewBlock(number) {
                let elmTreeTemp = this.ELEMENTS_UPDATE;
                elmTreeTemp.elementsCh.push({
                        id: this.ELEMENTS_UPDATE.maxId,
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
                    elemId: this.ELEMENTS_UPDATE.maxId,
                    paramNameFk: this.newBlock.data
                });
                this.setElemTree(elmTreeTemp);
                this.setListNewElem(this.listNewElem);
                this.setMaxId(this.ELEMENTS_UPDATE.maxId + 1);
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
                let tempListElem = this.LISTNEWELEM;
                this.listNewParam.forEach(param => {
                    tempListElem.push({
                        elemId: param.nameElemId,
                        paramNameFk: param.name,
                        parentId: param.elemId
                    })
                })
                this.SAVE_DATA_ELEMENTS({
                    listElem: this.LISTNEWELEM,
                    listSaveParam: this.listNewParam.filter(param => (!param.editRow && param.id === 0)),
                    listUpdateParam: this.listNewParam.filter(param => (!param.editRow && param.id !== 0))
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

<style>
    .treeRow {
        width: 90%;
    }

    a {
        padding-left: 3vw;
        padding-right: 3vw;
        color: #272e38;
        font-weight: bold;
    }

    a:hover{
        background:lightgray;
    }

    #treelogo {
        position: absolute;
        left: 25%;
        right: 25%;
        width: 50%;
        top: 0px;
        height: 40px;
        background: lightslategrey;
        border-bottom-right-radius: 90px;
        border-bottom-left-radius: 90px;

    }

    #save-elem-tree-page {
        align-items: center;

    }

    #borderSide {
        border-left: 5px solid #272e38;
        position: absolute;
        bottom: 50%;
        top: 0;
    }

    .rad-bottom {
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
    }

    .bord {
        border-style: solid;
        border-top-color: lightslategrey;
        border-width: 15px 0px 0px 0px;

    }

    #borderSide:after {
        background-color: #272e38;
        bottom: 0;
        content: '';
        display: block;
        height: 1px;
        left: 50%;
        position: absolute;
        transform: translate(-50%, 0);
        width: 50px;
    }
</style>