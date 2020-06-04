<template>
    <div class="bord container bg-white  rounded " id="auto-engine-full-tree"  style="   border-style: solid;border-top-color: lightslategrey; border-width: 15px 0px 0px 0px;">
        <div class="search-logo" id="treelogo">
            <div class="head-text deepshd ">
                <h4
                    style="width: 60%; margin-left: 20%; margin-right: 20%;text-align: center">{{ELEMENTS.name}}</h4>
            </div>
        </div>
        <br/>
        <br/>
        <h4 class="deepshd" style="text-align: center">{{ELEMENTS.name}}</h4>
        <div class="panelBody" style="width: 100%">
            <navig>
                <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                    <a v-for="current in ELEMENTS.elementsCh" v-bind:key="current"
                       class="nav-item nav-link "
                       :id="'nav-add-tab'+current.name" data-toggle="tab"
                       :href="'#nav-add'+current.name"
                       role="tab" :aria-controls="'nav-add'+current.name" aria-selected="true"
                       style="max-width: 30vw; color: black"
                       v-on:click="setListParam(null)"
                    >{{current.name}}</a>

                </div>
            </navig>
            <div class="tab-content rad-bottom  bg-white" id="nav-tabContent">
                <div v-for="current in ELEMENTS.elementsCh" v-bind:key="current"
                     class="  tab-pane fade " :id="'nav-add'+current.name"
                     :aria-labelledby="'nav-add-tab'+current.name">
                    <div class="row rowCenter">
                        <div class="col-md-3">
                            <div class="list-group" >
                                <tree-item
                                        v-for="treeItem in current.elementsCh"
                                        v-bind:key="treeItem"
                                        class="item"
                                        :item="treeItem"
                                        change-mod="off"
                                        :nav="treeItem.name"
                                        :choice-param="choiceParam"
                                        :id-parent-elem="current.id"
                                        :space="''"
                                        :nowPressed=nowPressed
                                        :show-edit-param="{show:true}"
                                        @get-paramtrs="getParamtrs"
                                />
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="vl"></div>
                        </div>
                        <div class="col-md-8">
                            <table class="table table-hover">
                                <thead >
                                <tr>
                                    <th>{{$ml.get('word.name')}}</th>
                                    <th>{{$ml.get('word.units')}}</th>
                                    <th>{{$ml.get('word.from')}}</th>
                                    <th>{{$ml.get('word.by')}}</th>
                                    <th>{{$ml.get('word.value')}}</th>
                                    <th>{{$ml.get('word.status')}}</th>
                                    <th>{{$ml.get('word.source')}}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr  v-for="current in LISTPARAM" v-bind:key="current">
                                    <td> {{PARAM_NAME.find(unit=>
                                        unit.id===current.name).data}}</td>
                                    <td>{{PARAM_NAME_AND_UNITS.units.find(unit=>
                                        unit.id===current.units).data}}</td>
                                    <td>
                                        <span v-if="current.doubleMin!==null">{{Number(current.doubleMin).toFixed(4)}}</span>
                                        <span v-else></span>
                                    </td>
                                    <td>
                                        <span v-if="current.doubleMax!==null">{{Number(current.doubleMax).toFixed(4)}}</span>
                                        <span v-else></span>
                                    </td>
                                    <td>
                                        <span v-if="current.doubleNum!==null">{{Number(current.doubleNum).toFixed(4)}}</span>
                                        <span v-else></span>
                                    </td>
                                    <td>{{PARAM_NAME_AND_UNITS.status.find(unit=>
                                        unit.id===current.status).data}}</td>
                                    <td>{{current.source}}</td>
                                </tr>
                                </tbody>
                            </table>
                            <div v-if="LOAD_PARAM_FOR_TREE" class="lds-dual-ring-black" style="margin-left: 50%; margin-right: 50% "></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br/><br/>
        <br/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import TreeItem from "./tree";

    export default {
        name: "auto-engine-full-tree",
        components: {TreeItem},
        props:{
            auto_id:Number
        },
        data: () => ({
            choiceData: [],
            nowPressed: {
                linkOnButt: {
                    isPressed: false
                }
            },
            namePanel: '111',
            choiceParam: []
        }),
        computed: {
            ...mapGetters([
                'LISTPARAM',
                'ELEMENTS',
                'LOAD_PARAM_FOR_TREE',
                'PARAM_NAME_AND_UNITS',
                'GET_ALL_PARAM_NAME',
                'PARAM_NAME'
            ])
        },
        methods: {
            ...mapActions([
                'GET_PARAMTRS'
            ]),
            //request for initial data
            async getParamtrs(nav, number, link) {
                this.nowPressed.linkOnButt.isPressed = false;
                this.nowPressed.linkOnButt = link;
                this.GET_PARAMTRS({id: number, auto_id: this.auto_id});
                console.log(number);
            }

        },
        mounted() {
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
        height: 50px;
        background: lightslategrey;
        border-bottom-right-radius: 90px;
        border-bottom-left-radius: 90px;

    }

    #auto-engine-full-tree {
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
    .vl {
        border-left: 2px solid lightgray;
        height: 90%;
        position: absolute;
        left: 50%;
        margin-left: -3px;
        top: 0;
    }

</style>