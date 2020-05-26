<template>
    <div class="card  rad" id="auto-engine-full-tree" style="width: 98vw">

        <br/>
        <h4 class="deepshd" style="text-align: center">{{ELEMENTS.name}}</h4>
        <div class="panelBody">
            <navig>
                <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                    <a v-for="current in ELEMENTS.elementsCh" v-bind:key="current" class="nav-item nav-link "
                       :id="'nav-add-tab'+current.name" data-toggle="tab"
                       :href="'#nav-add'+namePanel"
                       role="tab" :aria-controls="'nav-add'+current.name" aria-selected="true" style="max-width: 30vw">{{current.name}}</a>
                </div>
            </navig>
            <div class="tab-content  bg-white" id="nav-tabContent">
                <div v-for="current in ELEMENTS.elementsCh" v-bind:key="current"
                     class=" tab-pane fade " :id="'nav-add'+current.name"
                     :aria-labelledby="'nav-add-tab'+current.name">
                    <div class="row rowCenter">
                        <div class="col-md-3">
                            <div class="list-group">
                                <tree-item
                                        v-for="treeItem in current.elementsCh"
                                        v-bind:key="treeItem"
                                        class="item"
                                        :item="treeItem"
                                        change-mod="off"
                                        :nav="treeItem.name"
                                        :choice-param="choiceParam"
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
                                <thead class="thead-light-dark">
                                <tr>
                                    <th>{{$ml.get('word.name')}}</th>
                                    <th>{{$ml.get('word.units')}}</th>
                                    <th>{{$ml.get('word.min')}}</th>
                                    <th>{{$ml.get('word.max')}}</th>
                                    <th>{{$ml.get('word.value')}}</th>
                                    <th>{{$ml.get('word.author')}}</th>
                                    <th>{{$ml.get('word.source')}}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="current in LISTPARAM" v-bind:key="current">
                                    <td>{{current.name}}</td>
                                    <td>{{current.units}}</td>
                                    <td>{{Number(current.doubleMin).toFixed(4)}}</td>
                                    <td>{{Number(current.doubleMax).toFixed(4)}}</td>
                                    <td>{{Number(current.doubleNum).toFixed(4)}}</td>
                                    <td>{{current.author}}</td>
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
        <br/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import TreeItem from "./tree";

    export default {
        name: "auto-engine-full-tree",
        components: {TreeItem},
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
                'LOAD_PARAM_FOR_TREE'
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
                this.GET_PARAMTRS(number);
                console.log(number);
            }

        }

    }
</script>

<style>
    #auto-engine-full-tree {
        align-items: center;
        max-width: 97vw;
        min-width: 97vw;
        margin-left: 1vw;
        margin-right: 1vw;
        border: white;
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