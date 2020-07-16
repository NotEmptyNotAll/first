<template>

    <ul style="height: auto">
        <li class="border-white bold list-group-item   li-hov"
            style="position: relative; width: 24vw; display: flex;align-items: center; height: 3.5em "

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
                <div  class="col-md-1" v-show="item.name===''"></div>
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
                         style=" position: relative; top: 0.5vh; left: 6vw;padding: 1vh">
                        <button  type="button"
                                class="btn btn-group   btn-info" @click="addElement(1)" style="z-index: 999">
                            <span>
                                <p class="h5 md-2"><b-icon icon="plus"></b-icon></p>
                            </span>
                        </button>
                    </div>

                    <div class=" btn-group  " v-show="item.name!='' && changeMod==='on'" role="group"
                         style=" position: relative; top: 0.5vh; left: 6vw;padding: 1vh">
                        <button type="button " v-if=" !linkOnThisButt.isPressed "
                                v-on:click="pressed"
                                class="btn btn-group   btn-warning"
                                @click="getParamtrs(nav,item.id,linkOnThisButt)"
                        >
                            <span>
                                    <b-icon icon="pencil"></b-icon>

                            </span>
                        </button>
                        <button  type="button" v-if=" linkOnThisButt.isPressed "
                                class="btn btn-group   btn-warning disabled">
                            <span>
                                <b-icon icon="pencil" animation="cylon"></b-icon>
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
                        @get-paramtrs="getParamtrs"
                        :show-edit-param="showEditParam"
                        @parent-delete="deleteElem"
                ></tree-item>
            </ul>
    </ul>

</template>

<script>

    import {mapMutations, mapGetters} from "vuex";
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
            item: Object,
            nav: String,
            choiceParam: Object
        },
        data: function () {
            return {
                saveElemData: {
                    elemId: null,
                    paramNameFk: null,
                    parentId: null
                },
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
                'PARAM_NAME'
            ]),
            isFolder: function () {
                return this.elementsCh && this.item.elementsCh.length;
            }
        },
        methods: {
            ...mapMutations({
                setElements: 'SET_ELEMENTS',
                setListNewElem: 'SET_LIST_NEW_PARAM',
                setMaxId: 'SET_ELEMENTS_TREE_MAXID'
            }),
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
            getParamtrs(nav, number, link) {
                if (this.showEditParam.show) {
                    this.$emit("get-paramtrs", nav, number, link)
                } else {
                    this.$emit("get-paramtrs", nav, number, link)
                    this.showEditParam.show = true;
                }
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


    .posLeft {
        position: relative;
        left: 8em;
        top: 1.4em;
    }

    .btn-posit{
        position: relative;
        left: .5em;
        top: .5em;
    }
</style>