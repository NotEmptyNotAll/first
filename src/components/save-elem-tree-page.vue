<template>
    <div class="save-elem-tree-page">
        <div class="search-border container rad">
            <div class="search-logo">
                <div class="deepshd " style="text-align: center"><h2>{{$ml.get('word.tree')}}</h2></div>
            </div>
            <br/>
            <br/>
            <div class="row ">
                <div class="col-md-2"/>
                <vue-datalist
                        class="col-md-4 "
                        :title-input="$ml.get('word.changeRoot')"
                        :items="TREE_ROOT_NAMES"
                        :update-obj="updateDataObj"
                        index="id"
                />

                <div class="col-md-2">

                    <button type="submit"
                            class="btn buttonanim btn-block btn-primary"
                            @click="getElements(1)"
                    >
                        <span>{{$ml.get('word.choose')}}</span>
                    </button>
                </div>
                <div class="col-md-2">
                    <button type="submit"
                            class="btn buttonanim btn-block btn-success"
                            @click="saveElemParam(1)"
                    >
                        <span>{{$ml.get('word.update')}}</span>
                    </button>
                </div>

                <div class="col-md-2"/>
            </div>
            <hr style="color: lightgray; position: center; width: 90%"/>
            <br/>
            <div v-if="LOAD_TREE_UPDATE" class="lds-dual-ring" style="margin-left: 50%; margin-right: 50% "></div>
            <div v-show="ELEMENTS_AND_MAX_ID!=null" class="row rowCenter">
                <div class="col-md-3">
                    <div class="list-group" v-if="ELEMENTS_AND_MAX_ID!=null">
                        <tree-item

                                v-for="treeItem in ELEMENTS_AND_MAX_ID.elements.elementsCh"
                                v-bind:key="treeItem"
                                class="item"
                                change-mod="on"
                                :item="treeItem"
                                :nav="treeItem.name"
                                :choice-param="choiceParam"
                                :space="''"
                                :nowPressed=nowPressed
                                @get-paramtrs="getParamtrs"
                        />
                    </div>
                </div>
                <div class="col-md-1">
                    <div class="vl"></div>
                </div>
                <div class="col-md-8">
                    <table class="table table-hover" style="min-height: 10vh">
                        <thead class="thead-light-dark">
                        <tr>
                            <th>{{$ml.get('word.name')}}</th>
                            <th>{{$ml.get('word.units')}}</th>
                            <th>{{$ml.get('word.min')}}</th>
                            <th>{{$ml.get('word.max')}}</th>
                            <th>{{$ml.get('word.value')}}</th>
                            <th>{{$ml.get('word.author')}}</th>
                            <th>{{$ml.get('word.source')}}</th>
                            <th>{{$ml.get('word.action')}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="current in LISTPARAM" v-bind:key="current">
                            <td v-if="!current.editRow">{{current.name}}</td>
                            <td v-if="current.editRow">
                                <input type="text" class="form-control" :value="current.name">
                            </td>
                            <td v-if="!current.editRow">{{current.measurementUnits}}</td>
                            <td v-if="current.editRow">
                                <VueDatalist
                                        :items="PARAM_NAME_AND_UNITS.units"
                                        :update-obj="updateObj"
                                        index="units"
                                        :hide-title="true"
                                />
                            </td>
                            <td v-if="!current.editRow">{{Number(current.doubleMin).toFixed(4)}}</td>
                            <td v-if="current.editRow">
                                <input type="text" class="form-control" v-model="current.doubleMin">
                            </td>
                            <td v-if="!current.editRow">{{Number(current.doubleMax).toFixed(4)}}</td>
                            <td v-if="current.editRow">
                                <input type="text" class="form-control" v-model="current.doubleMax">
                            </td>
                            <td v-if="!current.editRow">{{Number(current.doubleNum).toFixed(4)}}</td>
                            <td v-if="current.editRow">
                                <input type="text" class="form-control" v-model="current.doubleNum">
                            </td>
                            <td v-if="!current.editRow">{{current.author}}</td>
                            <td v-if="current.editRow">
                                <input type="text" class="form-control" v-model="current.author">
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
                                    <span>&#9998;</span>
                                </button>
                                <button v-if="current.editRow"
                                        type="button"
                                        class="btn  btn-success "
                                        @click="current.editRow=!current.editRow"
                                >
                                    <span>&#10004;</span>
                                </button>
                            </td>
                        </tr>
                        <tr v-show="current.elemId===elemId" v-for="current in listNewParam" v-bind:key="current">
                            <td v-if="!current.editRow ">{{current.name}}</td>
                            <td v-if="current.editRow">
                                <input type="text" class="form-control" v-model="current.name">
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
                                />
                            </td>
                            <td v-if="!current.editRow">{{Number(current.doubleMin).toFixed(4)}}</td>
                            <td v-if="current.editRow">
                                <input type="text" class="form-control" v-model="current.doubleMin">
                            </td>
                            <td v-if="!current.editRow">{{Number(current.doubleMin).toFixed(4)}}</td>
                            <td v-if="current.editRow">
                                <input type="text" class="form-control" v-model="current.doubleMax">

                            </td>
                            <td v-if="!current.editRow">{{Number(current.doubleNum).toFixed(4)}}</td>
                            <td v-if="current.editRow">
                                <input type="text" class="form-control" v-model="current.doubleNum">

                            </td>
                            <td v-if="!current.editRow">{{current.author}}</td>
                            <td v-if="current.editRow">
                                <input type="text" class="form-control" v-model="current.author">

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
                                    <span>&#9998;</span>
                                </button>
                                <button v-if="current.editRow"
                                        type="button"
                                        class="btn  btn-success "
                                        @click="current.editRow=!current.editRow"
                                        v-on:click="updateOldParam(current)"
                                >
                                    <span>&#10004;</span>
                                </button>
                            </td>
                        </tr>
                        <tr v-if="LISTPARAM.length>0">
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
</template>

<script>
    import VueDatalist from "./vue-datalist";

    import {mapActions, mapGetters} from "vuex";
    import TreeItem from "./tree";


    export default {
        name: "save-elem-tree-page",
        components: {
            TreeItem,
            VueDatalist
        },
        data: () => ({
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
            elemId: null
        }),
        mounted() {
            this.GET_TREE_ROOT_NAMES();
            this.GET_PARAM_NAME();
        },
        computed: {
            ...mapGetters([
                'STARTPARAM',
                'ENGDATA',
                'LISTPARAM',
                'PARAM_NAME_AND_UNITS',
                'SEARCHDATA',
                'TREE_ROOT_NAMES',
                'ELEMENTS',
                'ELEMENTS_AND_MAX_ID',
                'LISTNEWELEM',
                'LOAD_TREE_UPDATE'

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
                'SAVE_DATA_ELEMENTS'

            ])
            ,
            updateOldParam(current) {
                this.saveListParam.push({
                    id: current.id,
                    elemId: current.elemId,
                    name: current.name,
                    units: current.units,
                    doubleMin: current.doubleMin,
                    doubleMax: current.doubleMax,
                    doubleNum: current.doubleNum,
                    author: current.author,
                    source: current.source,
                    editRow: current.editRow,
                });
                console.log(1)
            },
            addNewParam(number) {
                this.listNewParam.push({
                    id: 0,
                    elemId: this.elemId,
                    name: null,
                    units: null,
                    doubleMin: null,
                    doubleMax: null,
                    doubleNum: null,
                    author: null,
                    source: null,
                    editRow: true
                });
                console.log(number)
            },
            getParamtrs(nav, number, link) {
                this.elemId = number;
                this.nowPressed.linkOnButt.isPressed = false;
                this.nowPressed.linkOnButt = link;
                this.GET_PARAMTRS(number);
                console.log(number);
            },
            async saveElemParam(number) {
                this.saveElemParamV = {
                    listElem: this.LISTNEWELEM,
                    listSaveParam: this.listNewParam.filter(param => (!param.editRow && param.id === 0)),
                    listUpdateParam: this.listNewParam.filter(param => (!param.editRow && param.id !== 0))
                };

                this.SAVE_DATA_ELEMENTS({
                    listElem: this.LISTNEWELEM,
                    listSaveParam: this.listNewParam.filter(param => (!param.editRow && param.id === 0)),
                    listUpdateParam: this.listNewParam.filter(param => (!param.editRow && param.id !== 0))
                })
                console.log(number)
            }
            ,
            //query to get a list of parameter names
            async getElements(number) {
                this.GET_ELEMENTS_AND_MAX_ID(this.updateDataObj.id);
                console.log(number)
            }
        }
    }
</script>

<style>

</style>