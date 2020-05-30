`
<template>
    <div class="save-panel">
        <div id="addData">
            <div class="card  rad" id="mainContainer">
                <br/>
                <span v-if="loadStatus"><div class="lds-dual-ring loadPos"></div></span>

                <h4 v-if="!loadStatus" class="deepshd" style="text-align: center">{{namePanel}}</h4>
                <div class="panelBody">
                    <navig>
                        <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link active" :id="'nav-add-tab'+namePanel" data-toggle="tab"
                               :href="'#nav-add'+namePanel"
                               role="tab" :aria-controls="'nav-add'+namePanel" aria-selected="true">{{$ml.get('word.add')}}</a>
                            <a class="nav-item nav-link" :id="'nav-update-tab'+namePanel" data-toggle="tab"
                               :href="'#nav-update'+namePanel"
                               role="tab" :aria-controls="'nav-update'+namePanel" aria-selected="false">{{$ml.get('word.update')}}</a>
                            <a class="nav-item nav-link" :id="'nav-file-tab'+namePanel" data-toggle="tab"
                               :href="'#nav-file'+namePanel"
                               role="tab"
                               :aria-controls="'nav-file'+namePanel" aria-selected="false">{{$ml.get('word.file')}}</a>
                        </div>
                    </navig>
                    <div class="tab-content" id="nav-tabContent">
                        <div class=" tab-pane fade show active" :id="'nav-add'+namePanel" role="tabpanel"
                             :aria-labelledby="'nav-add-tab'+namePanel">
                            <div class="input-group panelRow col-md-12">
                                <input id="saveEngManufacture"
                                       v-model="saveDataObj.saveData"
                                       type="text"
                                       class="form-control"
                                       @click="showErr=false"
                                       :placeholder="$ml.get('word.data')"
                                       aria-describedby="button-addon1">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-danger"
                                            v-on:click="saveDataObj.saveData=null"
                                            type="button" id="button-addon1">
                                        <span>&#10008;</span>
                                    </button>
                                </div>
                            </div>
                            <div v-if="showErr" class="alert alert-danger" role="alert" style="margin-left: 4%">
                                {{$ml.get('msg.duplicateValue')}}
                            </div>
                            <div class="col input-group panelRow col-md-12">

                                <button type="submit" @click="save(1)"
                                        class="btn  btn-outline-dark btn-block ">
                                    <span>{{$ml.get('word.save')}}</span>
                                </button>
                            </div>
                        </div>
                        <div class=" tab-pane fade" :id="'nav-update'+namePanel" role="tabpanel"
                             :aria-labelledby="'nav-update-tab'+namePanel">
                            <vue-datalist
                                    class=" panelRow"
                                    :title-input="$ml.get('word.dataChange')"
                                    :items="dataList"
                                    :update-obj="updateDataObj"
                                    :hide-title="true"
                                    index="objToBeChanged"
                                    :holder-num=0
                            />
                            <div class="input-group panelRow col-md-12">
                                <input
                                        v-model="updateDataObj.updateData"
                                        type="text"
                                        class="form-control"
                                        :placeholder="$ml.get('word.newData')"
                                        aria-describedby="button-addon1">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-danger"
                                            v-on:click="updateDataObj.saveData=null"
                                            type="button">
                                        <span>&#10008;</span>
                                    </button>
                                </div>
                            </div>
                            <div class="col input-group panelRow col-md-12">

                                <button type="submit" @click="update(1)"
                                        class="btn  btn-outline-dark btn-block">
                                    <span>{{$ml.get('word.update')}}</span>
                                </button>
                            </div>
                        </div>
                        <div class="tab-pane fade" :id="'nav-file'+namePanel" role="tabpanel"
                             :aria-labelledby="'nav-file-tab'+namePanel">
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        </div>
    </div>
</template>

<script>
    import VueDatalist from "./input/vue-datalist";
    import {mapActions} from "vuex";

    export default {
        name: "addData",
        components: {VueDatalist},
        data: () => ({
            showErr:false,
            saveDataObj: {
                saveData: null
            },
            updateDataObj: {
                objToBeChanged: null,
                updateData: null
            }
        }),
        props: {
            namePanel: String,
            dataList: null,
            loadStatus: null
        },
        computed: {},
        methods: {
            ...mapActions([
                'GET_ALL_ADDITIONAL_DATA'
            ]),
            async save(number) {
                let temp = this.dataList.find(item =>
                    item.data === this.saveDataObj.saveData
                );
                if (temp === undefined) {
                    if (this.saveDataObj.saveData != null) {
                        this.$emit("save-data-api", this.saveDataObj);
                        this.GET_ALL_ADDITIONAL_DATA();
                    }
                }else {
                    this.showErr=true;
                }
                console.log(number)
            },
            async update(number) {
                if (this.updateDataObj.objToBeChanged != null) {
                    this.$emit("update-data-api", this.updateDataObj);
                    this.GET_ALL_ADDITIONAL_DATA();
                }
                console.log(number)
            }

        },
        watch: {},
        mounted() {
        }
    }
</script>


<style>
    .sa
    navig {
        position: relative;
        left: 0px;
    }

    navig > .nav.nav-tabs {
        border: none;
        color: #fff;
        background: #272e38;
        border-radius: 0;
        width: 100%;
    }

    navig > div a.nav-item.nav-link,
    navig > div a.nav-item.nav-link.active {
        border: none;
        padding: 18px 25px;
        color: #fff;
        background: #272e38;
        border-radius: 0;
    }


    .tab-content {
        background: #fdfdfd;
        line-height: 25px;
        border: 1px solid #ddd;
        border-top: 5px solid #e74c3c;
        border-bottom: 5px solid #e74c3c;
        padding: 30px 25px;
    }

    navig > div a.nav-item.nav-link:hover,
    navig > div a.nav-item.nav-link:focus {
        border: none;
        background: #e74c3c;
        color: #fff;
        border-radius: 0;
        transition: background 0.20s linear;
    }

    .buttonanim {
        text-align: center;
        transition: all 0.5s;
    }

    .buttonanim span {
        cursor: pointer;
        position: relative;
        transition: 0.5s;
    }

    .buttonanim:hover span {
        padding-right: 25px;
    }

    .buttonanim:hover span:after {
        opacity: 1;
        right: 0;
    }

    .btn-success span:after {
        content: "\27A4";
        position: absolute;
        opacity: 0;
        right: -20px;
        transition: 0.5s;
    }


    .buttonanim:hover {
        box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
    }

    #mainContainer {
        align-items: center;
        max-width: 27vw;
        min-width: 22vw;
        margin-left: 1.5vw;
        margin-right: 1.5vw;
        border: white;
    }

    .panelRow {
        max-width: 20vw;
        min-width: 20vw;
        padding: 15px;
        animation: moveInBottom 0.5s ease-out;
        animation-fill-mode: backwards;
    }

    .loadPos {
        position: relative;
        bottom: 11px;
    }

    h4 {
        font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;
        font-size: 20px;
        padding: 10px 10px;
        text-align: center;
        text-transform: uppercase;
        text-rendering: optimizeLegibility;
    }

    .panelBody {
        max-width: 100%;
        min-width: 100%;
    }



</style>
`