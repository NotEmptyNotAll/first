<template>
    <div class="add--auto-engine-data-panel">

        <div class="card  rad" id="mainBigContainer">

            <br/>
            <span v-if="LOAD_SAVE_AUTOMOBILE_ENGINE || AUTO_ENGINE_LOAD"><div
                    class="lds-dual-ring loadPos"></div></span>
            <h4 v-if="!LOAD_SAVE_AUTOMOBILE_ENGINE && !AUTO_ENGINE_LOAD" class="deepshd" style="text-align: center">
                {{namePanel}}</h4>
            <div class="panelBody">
                <navig>
                    <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" :id="'nav-add-tab'+namePanel" data-toggle="tab"
                           :href="'#nav-add'+namePanel"
                           role="tab" :aria-controls="'nav-add'+namePanel"
                           aria-selected="true">{{$ml.get('word.add')}}</a>
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
                        <div class="row rowCenter">
                            <div v-if="showErr" class="alert alert-danger" role="alert" style="text-align:center; width: 100%">
                                {{$ml.get('msg.duplicateValue')}}
                            </div>

                        </div>
                        <div class="row rowCenter">
                            <!-- <input-field
                                     class="col-md-3"
                                     :name-input="$ml.get('word.engineNumber')"
                                     :save-parameters="saveDataEngParam"
                                     index="saveData"

                             />-->
                            <vue-datalist
                                    class="col-md-3"
                                    :title-input="$ml.get('word.engine')"
                                    :items="ADDITIONAL_DATA.engine"
                                    :update-obj="saveDataObj"
                                    index="engineFk"
                                    :holder-num=0

                            />
                            <vue-datalist
                                    class="col-md-3"
                                    :title-input="$ml.get('word.autoModel')"
                                    :items="ADDITIONAL_DATA.autoModel"
                                    :update-obj="saveDataObj"
                                    index="autoModelFk"
                                    :holder-num=0

                            />
                            <vue-datalist
                                    class="col-md-3"
                                    :title-input="$ml.get('word.autoManufacturer')"
                                    :items="ADDITIONAL_DATA.autoManufacture"
                                    :update-obj="saveDataObj"
                                    index="autoManufactureFk"
                                    :holder-num=0

                            />
                            <div class="input-group col-md-3">
                                <div class="input-group-prepend">
                                    <label class="input-group-text  text-white bg-dark" for="releaseYear">
                                        {{$ml.get('word.releaseYear')}}
                                        <div v-if="LOADPARAM" class="lds-dual-ring"></div>
                                    </label>
                                </div>
                                <input id="releaseYear"
                                       min="1885" max="2020"
                                       v-model="saveDataObj.releaseYearFrom"
                                       autocomplete="on" type="number"
                                       step="1"
                                       class="form-control"
                                       :placeholder="$ml.get('word.from')"
                                       aria-describedby="button-addon1">
                                <input id="fuelTFk" type="number"
                                       min="1885" max="2020"
                                       v-model="saveDataObj.releaseYearBy"
                                       autocomplete="on"
                                       class="form-control"
                                       :placeholder="$ml.get('word.by')"
                                       step="1"
                                       aria-describedby="button-addon1">
                                <div class="input-group-append">

                                    <button class="btn btn-outline-danger"
                                            v-on:click="saveDataObj.releaseYearFrom=null"
                                            @click="saveDataObj.releaseYearBy=null"
                                            type="button">
                                        <span>&#10008;</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr style="position: center; width: 70%"/>
                        <div class="row rowCenter">
                            <div class="col-md-5"></div>
                            <div class="col-md-2">

                                <button type="submit" @click="saveEngManufacture(1)"
                                        class="btn btn-outline-dark btn-block">
                                    <span>{{$ml.get('word.save')}}</span>
                                </button>
                            </div>
                            <div class="col-md-2"></div>
                        </div>
                    </div>
                    <div class=" tab-pane fade" :id="'nav-update'+namePanel" role="tabpanel"
                         :aria-labelledby="'nav-update-tab'+namePanel">
                        <search-engine-panel
                                @submit-function="GET_AUTOENG_BY_PARAM_UPDATE" style="position: relative;right: 1vw"
                        />
                        <br/>
                        <table class="table" style="text-align: center; z-index: 0;">
                            <thead>
                            <tr>
                                <th scope="col" v-text="$ml.get('word.autoManufacturer')"></th>
                                <th scope="col" v-text="$ml.get('word.autoModel')"></th>
                                <th scope="col" v-text="$ml.get('word.engine')"></th>
                                <th scope="col" v-text="$ml.get('word.releaseYearFrom')"></th>
                                <th scope="col" v-text="$ml.get('word.releaseYearBy')"></th>
                                <th scope="col" v-text="$ml.get('word.action')"></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="current in AUTO_ENGINE" v-bind:key="current">
                                <th v-if="!current.editRow">{{ADDITIONAL_DATA.autoManufacture.find(elem=>
                                    elem.id===current.autoManufactureFk).data}}
                                </th>
                                <td v-if="current.editRow">
                                    <VueDatalist
                                            :items="ADDITIONAL_DATA.autoManufacture"
                                            :update-obj="current"
                                            index="autoManufactureFk"
                                            :hide-title="true"
                                            :holder-num=0
                                    />
                                </td>
                                <td v-if="!current.editRow">{{ADDITIONAL_DATA.autoModel.find(elem=>
                                    elem.id===current.autoModelFk).data}}
                                </td>
                                <td v-if="current.editRow">
                                    <VueDatalist
                                            :items="ADDITIONAL_DATA.autoModel"
                                            :update-obj="current"
                                            index="autoModelFk"
                                            :hide-title="true"
                                            :holder-num=0
                                    />
                                </td>
                                <td v-if="!current.editRow">{{ADDITIONAL_DATA.engine.find(elem=>
                                    elem.id===current.engineFk).data}}
                                </td>
                                <td v-if="current.editRow">
                                    <VueDatalist
                                            :items="ADDITIONAL_DATA.engine"
                                            :update-obj="current"
                                            index="engineFk"
                                            :hide-title="true"
                                            :holder-num=0

                                    />
                                </td>
                                <td v-if="!current.editRow">{{current.releaseYearFrom}}</td>
                                <td v-if="current.editRow">
                                    <input type="text" class="form-control" v-model="current.releaseYearFrom">
                                </td>
                                <td v-if="!current.editRow">{{current.releaseYearBy}}</td>
                                <td v-if="current.editRow">
                                    <input type="text" class="form-control" v-model="current.releaseYearBy">
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
                            <tr>
                                <td></td>
                                <td></td>
                                <td height="80">
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                        <div style="margin-left: 40%; width: 20%;margin-right: 40%;">
                            <button v-show="AUTO_ENGINE.length>0"
                                    type="submit"
                                    class="btn  btn-block btn-outline-dark"
                                    @click="update(1)"
                                    v-text="$ml.get('word.update')"
                            >
                                <span></span>
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
</template>

<script>
    import {mapGetters, mapActions} from "vuex";
    import SearchEnginePanel from "../SearchPage/search-engine-panel";
    import VueDatalist from "../input/vue-datalist";
    //import InputField from "./input-field";


    export default {
        components: {SearchEnginePanel, VueDatalist},
        data: () => ({
            showErr: false,
            saveDataEngParam: {
                saveData: null
            },
            updateListParam: [],
            saveDataObj: {
                engineFk: null,
                autoModelFk: null,
                autoManufactureFk: null,
                releaseYearFrom: null,
                releaseYearBy: null,
            },
            updateDataObj: {
                engineFk: null,
                autoManufactureFk: null,
                autoModelFk: null,
                releaseYearFrom: null,
                releaseYearBy: null,
            },
            lol: {
                id: 1,
                autoManufactureFk: null,
                autoModelFk: null,
                engineFk: null,
                releaseYearFrom: null,
                releaseYearBy: null,
                elemId: null,
                editRow: null,
            },
            tempObj: null
        }),
        props: {
            namePanel: String,
            dataList: [],
            loadStatus: null
        },
        computed: {
            ...mapGetters([
                'ADDITIONAL_DATA',
                'AUTO_ENGINE_LOAD',
                'AUTO_ENGINE',
                'LOAD_SAVE_AUTOMOBILE_ENGINE',

            ])
        },
        methods: {
            ...mapActions([
                'SAVE_DATA_AUTOMOBILE_ENGINE',
                'GET_AUTOENG_BY_PARAM_UPDATE',
                'SAVE_DATA_ENGINE_NUMBER',
                'UPDATE_AUTO_ENGINE'

            ]),
            async saveEngManufacture(number) {
                let dupAutoM = this.ADDITIONAL_DATA.autoManufacture.find(item =>
                    item.id === this.saveDataObj.engineType
                );
                let dupAutoModel = this.ADDITIONAL_DATA.autoModel.find(item =>
                    item.id === this.saveDataObj.engineType
                );
                let dupEngine = this.ADDITIONAL_DATA.engine.find(item =>
                    item.id === this.saveDataObj.engineType
                );

                if (dupAutoM === undefined && dupAutoModel === undefined && dupEngine === undefined) {
                    this.showErr = false
                    this.SAVE_DATA_AUTOMOBILE_ENGINE(this.saveDataObj);
                } else {
                    this.showErr = true;
                }
                //  this.SAVE_DATA_ENGINE_NUMBER(this.saveDataEngParam);
                console.log(number)
            },
            async update(number) {

                this.UPDATE_AUTO_ENGINE(this.updateListParam);
                this.updateListParam = [];
                //  this.SAVE_DATA_ENGINE_NUMBER(this.saveDataEngParam);
                console.log(number)
            },
            updateOldParam(current) {
                let tempObj = this.updateListParam.find(param => param.id === current.id);
                if (tempObj !== undefined) {
                    tempObj.id = current.id;
                    tempObj.elemId = current.elemId;
                    tempObj.autoManufactureFk = current.autoManufactureFk;
                    tempObj.engineFk = current.engineFk;
                    tempObj.autoModelFk = current.autoModelFk;
                    tempObj.releaseYearFrom = current.releaseYearBy;
                    tempObj.releaseYearBy = current.releaseYearFrom;
                } else {
                    this.updateListParam.push({
                        id: current.id,
                        elemId: current.elemId,
                        autoManufactureFk: current.autoManufactureFk,
                        engineFk: current.engineFk,
                        autoModelFk: current.autoModelFk,
                        releaseYearFrom: current.releaseYearFrom,
                        releaseYearBy: current.releaseYearBy,
                        editRow: current.editRow

                    });
                }
                console.log(1)
            }
        },
        watch: {},
        mounted() {
            this.test()
        }
    }
</script>

<style>
    .add--auto-engine-data-panel {
        color: #e0dfdc;
    }

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
        position: relative;
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

    #mainBigContainer {
        align-items: center;
        max-width: 100%;
        min-width: 100%;
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

    .rowCenter {
        position: relative;
        right: 1vw;
        padding-top: 20px;
        padding-bottom: 10px;
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

    .bg-dark {
        background: #272e38;
    }

    .deepshd {
        color: #272e38;
        letter-spacing: .1em;
    }

</style>