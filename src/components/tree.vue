<template>

    <ul>
        <li class="border-white list-group-item   left"
            :class="{bold: isFolder}"
            v-if="isFolder"
            style="position: relative; width: 24vw;padding: 0px;"
        >
            <div class="row" style="min-width: 22vw;max-width: 22vw; padding: 15px">
                <div class="col-md-8">
            <span v-show="item.name!=''" @click="toggle">
                {{ space+item.name }}
                <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
            </span>
                </div>
                <inputList
                        class="col-md-8"
                        v-show="item.name===''"
                        title-input="дані для зміни"
                        :items="PARAM_NAME_AND_UNITS.paramName"
                        :show-title="true"
                        :update-obj="saveElemData"
                        index="paramNameFk"
                        :hide-title="true"
                />
                <div class="col-md-4">
                    <button v-show="item.name===''"
                            type="button"
                            class="btn  btn-success "
                            @click="saveElem(1)"
                    >
                        <span>&#10004;</span>
                    </button>
                    <div class=" btn-group pos-left">
                        <button v-show="changeMod==='off'" type="button"
                                v-if=" !linkOnThisButt.isPressed && item.parametersIsExistInChild"
                                v-on:click="pressed"
                                class="btn posLeft  btn-posit btn-success"
                                @click="getParamtrs(nav,item.id,linkOnThisButt)">
                            <span>&#x2b;</span>
                        </button>
                        <button v-show="changeMod==='off'" type="button"
                                v-if=" linkOnThisButt.isPressed && item.parametersIsExistInChild"
                                class="btn posLeft btn-posit btn-secondary disabled">
                            <span>&#x2b;</span>
                        </button>
                    </div>


                    <div class=" btn-group pos-left" v-show="item.name!=''" role="group">
                        <button v-show="changeMod==='on'" type="button " v-if=" !linkOnThisButt.isPressed "
                                v-on:click="pressed"
                                class="btn btn-group posLeft btn-warning"
                                @click="getParamtrs(nav,item.id,linkOnThisButt)">
                            <span>&#9998;</span>
                        </button>
                        <button v-show="changeMod==='on'" type="button" v-if=" linkOnThisButt.isPressed "
                                class="btn btn-group posLeft btn-warning disabled">
                            <span>&#9998;</span>
                        </button>
                        <button v-show="changeMod==='on'" type="button"
                                class="btn btn-group posLeft btn-info" @click="addElement(1)" style="z-index: 999">
                            <span>&#x2b;</span>
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
                    :id-parent-elem="child.id"
                    :change-mod="changeMod"
                    :space="space.concat('')"
                    @get-paramtrs="getParamtrs"
                    :show-edit-param="showEditParam"
            ></tree-item>
        </ul>
    </ul>

</template>

<script>

    import {mapMutations, mapGetters} from "vuex";
    import inputList from "./vue-datalist";

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
                'ELEMENTS_AND_MAX_ID'
            ]),
            isFolder: function () {
                return this.elementsCh && this.item.elementsCh.length;
            }
        },
        methods: {
            ...mapMutations({
                setElements: 'SET_ELEMENTS',
                setListNewElem: 'SET_LIST_NEW_PARAM',
                setMaxId: 'SET_MAX_ID'
            }),
            addElement: function (number) {
                this.isOpen = true;
                this.item.elementsCh.push({
                        id: this.ELEMENTS_AND_MAX_ID.maxId,
                        elementsCh: [{
                            id: 1,
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
                console.log(number);
            },
            saveElem(number) {
                this.item.name = this.PARAM_NAME_AND_UNITS.paramName.find(item => item.id === this.saveElemData.paramNameFk).data;
                this.saveElemData.parentId = this.idParentElem;
                this.saveElemData.elemId = this.ELEMENTS_AND_MAX_ID.maxId;
                this.listNewElem = this.LISTNEWELEM;
                this.listNewElem.push(this.saveElemData);
                this.setListNewElem(this.listNewElem);
                this.setMaxId(this.ELEMENTS_AND_MAX_ID.maxId + 1);
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
            this.maxId = this.ELEMENTS_AND_MAX_ID.maxId;
            this.elementsCh = this.item.elementsCh;
        }
    }
</script>


<style>

    .btn-posit {
        position: absolute;
        right: 1vw;
    }

    .pos-left {
        position: absolute;
        right: 0px;
        bottom: 0.3vh;
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

    .left {
        position: relative; /* Абсолютное позиционирование */
        left: -1px;
    }

    div {
        position: relative;;
    }

    .posLeft {
        position: absolute;
        right: 0px;
        bottom: 5px;
        top: 2.1vh;
    }



</style>