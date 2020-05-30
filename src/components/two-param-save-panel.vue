<template>
    <div class="two-param-save-panel">
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
                            <div class="input-group panelRow ">
                                <input id="saveEngManufacture"
                                       v-model="saveDataObj.saveData_primary"
                                       type="text"
                                       class="form-control col-md-8"
                                       :placeholder="title_one"
                                       @click="showErr=false"
                                       aria-describedby="button-addon1">
                                <input id="saveE"
                                       v-model="saveDataObj.saveData_secondary"
                                       type="text"
                                       class="form-control col-md-4"
                                       :placeholder="title_two"
                                       aria-describedby="button-addon1">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-danger"
                                            v-on:click="saveDataObj.saveData_primary=null"
                                            @click="saveDataObj.saveData_secondary=null"
                                            type="button">
                                        <span>&#10008;</span>
                                    </button>
                                </div>
                            </div>
                            <div v-if="showErr" class="alert alert-danger" role="alert" style="margin-left: 4%">
                                {{$ml.get('msg.duplicateValue')}}
                            </div>

                            <div class="col input-group panelRow col-md-12">
                                <button type="submit" @click="saveEngManufacture(1)"
                                        class="btn btn-outline-dark btn-block ">
                                    <span>{{$ml.get('word.save')}}</span>
                                </button>
                            </div>
                        </div>
                        <div class=" tab-pane fade" :id="'nav-update'+namePanel" role="tabpanel"
                             :aria-labelledby="'nav-update-tab'+namePanel">
                            <vue-datalist
                                    class="panelRow"
                                    :title-input="$ml.get('word.data')"
                                    :items="dataList"
                                    :update-obj="updateDataObj"
                                    index="objToBeChanged"
                                    :hide-title="true"
                                    :holder-num=0

                            />
                            <div class="input-group panelRow">
                                <input
                                        v-model="updateDataObj.saveData_primary"
                                        type="text"
                                        class="form-control  col-md-8"
                                        :placeholder="title_one"
                                        aria-describedby="button-addon1">
                                <input
                                        v-model="updateDataObj.saveData_secondary"
                                        type="text"
                                        class="form-control  col-md-4"
                                        :placeholder="title_two"
                                        aria-describedby="button-addon1">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-danger"
                                            v-on:click="updateDataObj.saveData_primary=null"
                                            @click="updateDataObj.saveData_secondary=null"
                                            type="button">
                                        <span>&#10008;</span>
                                    </button>
                                </div>
                            </div>
                            <div class="col input-group panelRow col-md-12">

                                <button type="submit" @click="update(1)"
                                        class="btn  btn-block btn-outline-dark">
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
        name: "two-param-save-panel",
        components: {VueDatalist},
        data: () => ({
            showErr: null,
            saveDataObj: {
                saveData_primary: null,
                saveData_secondary: null
            },
            updateDataObj: {
                objToBeChanged: null,
                saveData_primary: null,
                saveData_secondary: null
            }
        }),
        props: {
            listParamTwo: null,
            listParamOnSave: Boolean,
            namePanel: String,
            dataList: null,
            loadStatus: null,
            title_one: String,
            title_two: String
        },
        computed: {},
        methods: {
            ...mapActions([
                'GET_ALL_ADDITIONAL_DATA'
            ]),
            async saveEngManufacture(number) {
                let temp = this.dataList.find(item =>
                    item.data === this.saveDataObj.saveData_primary
                );
                if (temp === undefined) {
                    if (this.saveDataObj.saveData_primary != null) {
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

<style scoped>

</style>