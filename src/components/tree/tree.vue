<template>

    <ul style="height: auto">
        <li class="border-white bold list-group-item   li-hov"
            style="position: relative; width: 24vw; display: flex;align-items: center; height: 3.5em "
            v-if="item.elementsCh.length>0"
        >
            <div class="row" style=" padding: 0px ;width:100%;">
                <div class="col-md-9" style="display: flex;align-items: center; ">
            <span v-show="item.name!=''" @click="toggle" style="padding-left: 0vw;">
                {{ space+item.name }}
                <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
            </span>
                </div>
                <inputList
                        class="col-md-8"
                        v-show="item.name===''"
                        title-input="дані для зміни"
                        :items="PARAM_NAME.filter(elem=>{return elem.tree_node})"
                        :show-title="true"
                        :update-obj="saveElemData"
                        index="paramNameFk"
                        :hide-title="true"
                        :holder-num=0
                        style="position: relative; top: 0.25em; width: 80%"
                />
                <div class="col-md-1" v-show="item.name===''"></div>

                <div class="col-md-3">
                    <div class=" btn-group  " style="display: flex;">
                        <button v-show="item.name===''"
                                type="button"
                                class="btn  btn-success "
                                @click="saveElem(1)"
                                style="position: relative; left: 5vw;top:0.5vh"
                        >
                        <span>
                             <p class="h5 md-2"><b-icon icon="check"></b-icon></p>
                        </span>
                        </button>
                        <button v-show="item.name===''"
                                type="button"
                                class="btn  btn-danger "
                                @click="deleteInPatent(item.id)"
                                style="position: relative; left: 5vw;top:0.5vh"
                        >
                        <span>
                                    <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                        </span>
                        </button>
                    </div>
                    <el-button circle v-show="changeMod==='off'"
                               v-if=" !linkOnThisButt.isPressed && item.parametersIsExistInChild"
                               v-on:click="pressed" type="info"
                               class="   btn-posit"
                               @click="getParamtrs(nav,item.id,linkOnThisButt)"
                               style="max-width: 3vw" icon="el-icon-d-arrow-right"
                               size="small">
                    </el-button>
                    <el-button disabled v-show="changeMod==='off'"
                               circle size="small"
                               v-if=" linkOnThisButt.isPressed && item.parametersIsExistInChild"
                               class="  btn-posit  " type="info"
                               style="max-width: 3vw" icon="el-icon-d-arrow-right">
                    </el-button>
                    <div class=" btn-group  " v-show="item.name!='' && changeMod==='tree'" role="group"
                         style=" position: relative; top: 0.5vh; left: 3vw;padding: 1vh; width: 5vw">
                        <button type="button"
                                class="btn btn-group   btn-info" @click="addElement(1)" style="z-index: 999">
                            <span>
                                <p class="h5 md-2"><b-icon icon="plus"></b-icon></p>
                            </span>
                        </button>

                        <button type="button "
                                class="btn btn-group   btn-info"
                                @click="getParamSizeEelem(item.id)"
                        >
                            <span>
                                <b-icon icon="list-ul" font-scale="1.5"></b-icon>
                            </span>
                        </button>
                        <button type="button"
                                v-if=" !linkOnThisButt.isPressed "
                                class="btn btn-group   btn-info"
                                @click="setColorElem(item,linkOnThisButt)"
                                style="z-index: 999">
                            <span>
                                    <i class="el-icon-brush"></i>
                            </span>
                        </button>
                        <button type="button"
                                v-if="linkOnThisButt.isPressed "
                                class="btn btn-group  disabled btn-info"
                                style="z-index: 999">
                            <span>
                                    <i class="el-icon-brush"></i>
                            </span>
                        </button>
                    </div>

                    <div class=" btn-group  " v-show="item.name!='' && changeMod==='on'"
                         role="group" style=" position: relative; top: 0.5vh; left: 3vw;padding: 1vh">
                        <button type="button " v-if=" !linkOnThisButt.isPressed "
                                v-on:click="pressed"
                                class="btn btn-group   btn-warning"
                                @click="getParamtrs(nav,item.id,linkOnThisButt)"
                        >
                            <span>
                                    <b-icon icon="pencil"></b-icon>
                            </span>
                        </button>
                        <button type="button" v-if=" linkOnThisButt.isPressed "
                                class="btn btn-group   btn-warning disabled">
                            <span>
                                <b-icon icon="pencil" animation="cylon"></b-icon>
                            </span>
                        </button>
                        <button type="button "
                                class="btn btn-group    btn-warning" @click="getPhoto(item.id)"
                        >
                            <span>
                                <b-icon icon="camera" font-scale="1.5"></b-icon>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </li>

        <ul class="list-group border-white left" v-show="isOpen" v-if="isFolder">
            <tree-item
                    class="item"
                    v-for="(child, index) in item.elementsCh"
                    :key="index"
                    :item="child"
                    :choice-param="choiceParam"
                    :nav="child.name"
                    :id-parent-elem="item.id"
                    :change-mod="changeMod"
                    :space="space.concat('')"
                    :auto_id="auto_id"
                    @get-paramtrs="getParamtrs"
                    :show-edit-param="showEditParam"
                    @parent-delete="deleteElem"
                    @set-color-elem="setColorElem"
                    @get-photo="getPhoto"
            ></tree-item>
        </ul>
        <el-dialog width="25%" :title="$ml.get('word.paramSizeName')" close-delay="dialog" :visible.sync="dialogTableVisible">
            <div v-if="LOAD_PARAM_SIZE_NAME" class="lds-dual-ring-black" style="margin-left:44.5% "></div>
            <el-card v-show="!LOAD_PARAM_SIZE_NAME" v-for="param in PARAM_SIZE_NAME" v-bind:key="param"
                     class="card-st" shadow="hover">
                <h5>{{param.name}}</h5>
            </el-card>
            <el-card v-for="param in paramSizeList" v-bind:key="param"
                     class="card-st" shadow="hover" v-show="param.name!==''">
                <h5>{{param.name}}</h5>
            </el-card>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addNewParamSize()">{{$ml.get('word.add')}}</el-button>
            </div>
            <el-card class="card-st" v-for="param in paramSizeList" v-bind:key="param"
                     v-show="param.name===''" shadow="hover">
                <div class="row">
                    <inputList
                            class="col-md-7"
                            title-input="дані для зміни"
                            :items="PARAM_NAME.filter(elem=>{return !elem.tree_node})"
                            :show-title="true"
                            :update-obj="param"
                            index="paramNameFk"
                            :hide-title="true"
                            :holder-num=0
                            style="position: relative; top: 0.25em; width: 80%"
                    />
                    <div class="col-md-1"></div>
                    <div class=" btn-group  btn-input col-md-3">
                        <button
                                type="button"
                                class="btn  btn-success "
                                @click="saveParamSize(param)"
                                style="position: relative; left: 4vw;top:0.5vh"
                        >
                        <span>
                             <p class="h5 md-2"><b-icon icon="check"></b-icon></p>
                        </span>
                        </button>
                        <button
                                type="button"
                                class="btn  btn-danger "
                                @click="deleteParamSize(param)"
                                style="position: relative; left: 4vw;top:0.5vh"
                        >
                        <span>
                                    <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                        </span>
                        </button>
                    </div>
                </div>
            </el-card>
        </el-dialog>
    </ul>

</template>

<script>

    import {mapMutations, mapGetters, mapActions} from "vuex";
    import inputList from "../input/vue-datalist";

    export default {

        name: "tree-item",
        components: {
            inputList
        },
        props: {
            showEditParam: Boolean,
            idParentElem: null,
            changeMod: String,
            nowPressed: Object,
            space: String,
            auto_id: Number,
            item: Object,
            nav: String,
            choiceParam: Object
        },
        data: function () {
            return {
                paramSizeList: [],
                dialogTableVisible: false,
                saveElemData: {
                    elemId: null,
                    paramNameFk: null,
                    parentId: null
                },
                color1: null,
                elementsCh: [],
                listNewElem: [],
                isOpen: false,
                linkOnThisButt: {
                    isPressed: false
                },
                maxId: 5000
            };
        },
        computed: {
            ...mapGetters([
                'PARAM_NAME_AND_UNITS',
                'LISTNEWELEM',
                'ELEMENTS_AND_MAX_ID',
                'ELEMENTS',
                'ELEMENTS_TREE',
                'PARAM_SIZE_NAME',
                'LOAD_PARAM_SIZE_NAME',
                'PARAM_NAME'
            ]),
            isFolder: function () {
                return this.elementsCh && this.item.elementsCh.length
                    && this.elementsCh.find(item=>item.elementsCh.length>0)!== undefined ;
            }
        },
        methods: {
            ...mapMutations({
                setElements: 'SET_ELEMENTS',
                setListNewElem: 'SET_LIST_NEW_PARAM',
                setParamSizeName: 'SET_PARAM_SIZE_NAME',
                setMaxId: 'SET_ELEMENTS_TREE_MAXID'
            }),
            ...mapActions([
                'GET_PARAM_SIZE_NAME'
            ]),
            deleteInPatent(id) {
                this.saveElemData = {
                    elemId: null,
                    paramNameFk: null,
                    parentId: null
                },
                    this.$emit("parent-delete", id)
            },
            deleteElem(id) {
                this.item.elementsCh = this.item.elementsCh.filter(elem => elem.id !== id)
                console.log(id)
            },
            async getParamSizeEelem(elemId) {
                this.GET_PARAM_SIZE_NAME({
                    id: elemId
                });
                this.dialogTableVisible = true
            },
            getPhoto(id){
                this.$emit("get-photo",id)
            },
            addElement: function (number) {
                this.isOpen = true;
                this.item.elementsCh.push({
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
                this.setMaxId(this.ELEMENTS_TREE.maxId + 1);
                console.log(number);
            },
            saveElem(number) {

                this.item.name = this.PARAM_NAME.find(item => item.id === this.saveElemData.paramNameFk).data;
                this.saveElemData.parentId = this.idParentElem;

                this.saveElemData.elemId = this.ELEMENTS_TREE.maxId + 1;

                this.item.id = this.ELEMENTS_TREE.maxId + 1;

                this.listNewElem = this.LISTNEWELEM;
                this.listNewElem.push(this.saveElemData);
                this.setListNewElem(this.listNewElem);
                this.setMaxId(this.ELEMENTS_TREE.maxId + 1);
                this.listElem.push(this.saveElemData)
                console.log(number);
            },
            addNewParamName() {
                console.log(1)
            },
            getParamtrs(nav, number, link) {
                if (this.showEditParam.show) {
                    this.$emit("get-paramtrs", nav, number, link)
                } else {
                    this.$emit("get-paramtrs", nav, number, link)
                    this.showEditParam.show = true;
                }
            },
            setColorElem(item, link) {
                if (!link.isPressed) {
                    this.$emit("set-color-elem", item,  link)
                }
            },
            addNewParamSize() {
                this.paramSizeList.push({
                        elementsCh: [],
                        paramNameFk: 0,
                        parentId: 0,
                        name: '',
                    }
                )
            },
            deleteParamSize(param) {
                this.paramSizeList.splice(this.paramSizeList.indexOf(param), 1)
            },
            saveParamSize(param) {
                param.name = this.PARAM_NAME.find(item => item.id === param.paramNameFk).data;
                this.listNewElem = this.LISTNEWELEM;
                this.listNewElem.push({
                    elemId: this.ELEMENTS_TREE.maxId + 1,
                    paramNameFk: param.paramNameFk,
                    parentId: this.item.id,
                });
                this.setListNewElem(this.listNewElem);
                this.setMaxId(this.ELEMENTS_TREE.maxId + 1);
            },
            pressed() {
                if (!this.linkOnThisButt.isPressed) {
                    this.linkOnThisButt.isPressed = true;
                }

            },
            toggle: function () {
                if (this.isFolder) {
                    this.isOpen = !this.isOpen;
                }
            }
        },
        mounted() {
            this.maxId = this.ELEMENTS_TREE.maxId;
            this.elementsCh = this.item.elementsCh;
        }
    }
</script>


<style>


    .btn-group {
        position: relative;
        right: 7em;
    }

    .item {
        cursor: pointer;
    }

    .bold {
        font-weight: bold;
    }

    ul {
        padding-left: 1em;
        line-height: 1.5em;
        list-style-type: none;
    }

    .li-hov:hover {

        background: #edf5ff;
    }

    div {
        position: relative;;
    }

    .dialog-footer {
        margin-top: 3%;
        display: flex;
        justify-content: center;
        align-content: flex-end;
        width: 100%;
    }

    .posLeft {
        position: relative;
        left: 8em;
        top: 1.4em;
    }

    .btn-input {
        justify-self: center;
        align-self: self-end;
    }

    .card-st {

        margin: 20px;
        display: flex;
        justify-content: flex-start;
        align-content: center;
    }

    .btn-posit {
        position: relative;
        left: .5em;
        top: .5em;
    }
</style>