<template>
    <div class="add-engine-data-panel">

        <div class="card   rad" id="mainBigContainer">
            <br/>
            <h4 v-if="!loadStatus" class="deepshd" style="text-align: center">{{namePanel}}</h4>
            <span v-if="loadStatus"><div class="lds-dual-ring loadPos"></div></span>
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
                            <input-field class="col-md-3"
                                         :name-input="$ml.get('word.engine')"
                                         :save-parameters="saveDataObj"
                                         index="engineType"
                            />
                            <vue-datalist
                                    class="col-md-3"
                                    :title-input="$ml.get('word.fuelType')"
                                    :items="ADDITIONAL_DATA.fuelType"
                                    :update-obj="saveDataObj"
                                    index="fuelTypeFk"
                                    :holder-num=0
                            />
                            <vue-datalist
                                    class="col-md-3"
                                    :title-input="$ml.get('word.engineManufacture')"
                                    :items="ADDITIONAL_DATA.engineManufacture"
                                    :update-obj="saveDataObj"
                                    index="engineManufacturerFk"
                                    :holder-num=0

                            />
                            <vue-datalist
                                    class="col-md-3"
                                    :title-input="$ml.get('word.superchargedType')"
                                    :items="ADDITIONAL_DATA.superchargeType"
                                    :update-obj="saveDataObj"
                                    index="superchargedTypeFk"
                                    :holder-num=0
                            />
                        </div>
                        <div class="row rowCenter">
                            <vue-datalist
                                    class="col-md-4"
                                    :title-input="$ml.get('word.cylinders')"
                                    :items="ADDITIONAL_DATA.cylinders"
                                    :update-obj="saveDataObj"
                                    :holder-num=0
                                    index="cylindersPlacementFk"
                            />

                            <input-field class="col-md-2"
                                         :name-input="$ml.get('word.pistonStroke')"
                                         :save-parameters="saveDataObj"
                                         index="pistonStroke"
                            />
                            <input-field class="col-md-2"
                                         :name-input="$ml.get('word.engineCapacity')"
                                         :save-parameters="saveDataObj"
                                         index="engineCapacity"

                            />
                            <input-field class="col-md-2"
                                         :name-input="$ml.get('word.powerKwt')"
                                         :save-parameters="saveDataObj"
                                         index="powerKwt"

                            />
                            <input-field class="col-md-2"
                                         :name-input="$ml.get('word.horsepower')"
                                         :save-parameters="saveDataObj"
                                         index="horsepower"
                            />
                        </div>
                        <div class="row rowCenter">
                            <input-field class="col-md-2"
                                         :name-input="$ml.get('word.cylindersNumber')"
                                         :save-parameters="saveDataObj"
                                         index="cylindersNumber"
                            />
                            <input-field class="col-md-2"
                                         :name-input="$ml.get('word.flapNumber')"
                                         :save-parameters="saveDataObj"
                                         index="flapNumber"
                            />
                            <input-field class="col-md-2"
                                         :name-input="$ml.get('word.degreeCompression')"
                                         :save-parameters="saveDataObj"
                                         index="degreeCompression"

                            />
                            <input-field class="col-md-2"
                                         :name-input="$ml.get('word.pistonDiameter')"
                                         :save-parameters="saveDataObj"
                                         index="pistonDiameter"
                            />
                            <div class="input-group col-md-4">
                                <div class="input-group-prepend">
                                    <label class="input-group-text  text-white bg-dark" for="relYear">
                                        {{$ml.get('word.releaseYear')}}
                                        <div v-if="LOADPARAM" class="lds-dual-ring"></div>
                                    </label>
                                </div>
                                <input id="relYear" min="1885" max="2020"
                                       v-model="saveDataObj.releaseYearFrom"
                                       autocomplete="on" type="number"
                                       class="form-control"
                                       :placeholder="$ml.get('word.from')"
                                       step="1"
                                       aria-describedby="button-addon1">
                                <input min="1885" max="2020"
                                       v-model="saveDataObj.releaseYearBy"
                                       autocomplete="on"
                                       class="form-control"
                                       type="number"
                                       step="1"
                                       :placeholder="$ml.get('word.by')"
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
                            <div class="col-md-5">
                            </div>
                            <div class="col-md-2">
                                <button type="submit" @click="saveEngManufacture(1)"
                                        class="btn btn-outline-dark btn-block ">
                                    <span>{{$ml.get('word.save')}}</span>
                                </button>
                            </div>
                            <div class="col-md-5"></div>
                        </div>
                    </div>
                    <div class=" tab-pane fade" :id="'nav-update'+namePanel" role="tabpanel"
                         :aria-labelledby="'nav-update-tab'+namePanel">
                        <div class="row rowCenter">
                            <div class="col-md-1"/>
                            <vue-datalist
                                    class="col-md-5"
                                    :title-input="$ml.get('word.changeTypeOfEngine')"
                                    :items="ADDITIONAL_DATA.engine"
                                    :update-obj="updateDataObj"
                                    index="objToBeChanged"
                                    :holder-num=0
                                    :show-title="false"

                            />
                            <div class="col-md-2">
                                <button type="submit"
                                        class="btn btn-outline-dark btn-block "
                                        @click="getEng(1)"
                                >
                                    <span>{{$ml.get('word.choose')}}</span>
                                </button>
                            </div>
                            <div class="col-md-2">

                                <button v- type="submit" @click="update(1)"
                                        class="btn  btn-block btn-outline-dark">
                                    <span>{{$ml.get('word.update')}}</span>
                                </button>
                            </div>
                            <div class="col-md-1"/>
                        </div>
                        <hr style="color: lightgray"/>
                        <div class="row rowCenter">
                            <input-field
                                    class="col-md-3"
                                    :name-input="$ml.get('word.engine')"
                                    :save-parameters="updateDataObj"
                                    index="engineType"
                            />
                            <vue-datalist
                                    class="col-md-3"
                                    :title-input="$ml.get('word.cylinders')"
                                    :items="ADDITIONAL_DATA.cylinders"
                                    :update-obj="updateDataObj"
                                    :holderNum="tempData.cylindersPlacementFk"
                                    index="cylindersPlacementFk"
                            />
                            <vue-datalist
                                    class="col-md-3"
                                    :title-input="$ml.get('word.engineManufacture')"
                                    :items="ADDITIONAL_DATA.engineManufacture"
                                    :update-obj="updateDataObj"
                                    :holderNum="tempData.engineManufacturerFk"
                                    index="engineManufacturerFk"
                            />
                            <vue-datalist
                                    class="col-md-3"
                                    :title-input="$ml.get('word.superchargedType')"
                                    :items="ADDITIONAL_DATA.superchargeType"
                                    :update-obj="updateDataObj"
                                    :holderNum="tempData.superchargedTypeFk"
                                    index="superchargedTypeFk"
                            />
                        </div>
                        <div class="row rowCenter">
                            <vue-datalist
                                    class="col-md-4"
                                    :title-input="$ml.get('word.fuelType')"
                                    :items="ADDITIONAL_DATA.fuelType"
                                    :update-obj="updateDataObj"
                                    :holderNum="tempData.fuelTypeFk"
                                    index="fuelTypeFk"
                            />
                            <input-field class="col-md-2"
                                         :name-input="$ml.get('word.pistonStroke')"
                                         :save-parameters="updateDataObj"
                                         index="pistonStroke"
                            />
                            <input-field class="col-md-2"
                                         :name-input="$ml.get('word.engineCapacity')"
                                         :save-parameters="updateDataObj"
                                         index="engineCapacity"
                            />

                            <input-field class="col-md-2"
                                         :name-input="$ml.get('word.powerKwt')"
                                         :save-parameters="updateDataObj"
                                         index="powerKwt"
                            />
                            <input-field class="col-md-2"
                                         :name-input="$ml.get('word.horsepower')"
                                         :save-parameters="updateDataObj"
                                         index="horsepower"
                            />
                        </div>
                        <div class="row rowCenter">
                            <input-field class="col-md-2"
                                         :name-input="$ml.get('word.cylindersNumber')"
                                         :save-parameters="updateDataObj"
                                         index="cylindersNumber"
                            />
                            <input-field class="col-md-2"
                                         :name-input="$ml.get('word.flapNumber')"
                                         :save-parameters="updateDataObj"
                                         index="flapNumber"
                            />
                            <input-field class="col-md-2"
                                         :name-input="$ml.get('word.degreeCompression')"
                                         :save-parameters="updateDataObj"
                                         index="degreeCompression"
                            />
                            <input-field class="col-md-2"
                                         :name-input="$ml.get('word.pistonDiameter')"
                                         :save-parameters="updateDataObj"
                                         index="pistonDiameter"
                            />
                            <div class="input-group col-md-4">
                                <div class="input-group-prepend">
                                    <label class="input-group-text  text-white bg-dark" for="releaseYear">
                                        {{$ml.get('word.releaseYear')}}
                                        <div v-if="LOADPARAM" class="lds-dual-ring"></div>
                                    </label>
                                </div>
                                <input id="releaseYear" min="1885" max="2020"
                                       v-model="updateDataObj.releaseYearFrom"
                                       autocomplete="on" type="number"
                                       class="form-control"
                                       :placeholder="$ml.get('word.from')"
                                       step="1"
                                       aria-describedby="button-addon1">
                                <input id="fuelTFk" min="1885" max="2020"
                                       v-model="updateDataObj.releaseYearBy"
                                       autocomplete="on"
                                       class="form-control"
                                       type="number"
                                       step="1"
                                       :placeholder="$ml.get('word.by')"
                                       aria-describedby="button-addon1">
                                <div class="input-group-append">

                                    <button class="btn btn-outline-danger"
                                            v-on:click="updateDataObj.releaseYearFrom=null"
                                            @click="updateDataObj.releaseYearBy=null"
                                            type="button">
                                        <span>&#10008;</span>
                                    </button>
                                </div>
                            </div>

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
    import InputField from "./input/input-field";
    import {mapGetters, mapMutations, mapActions} from "vuex";
    import VueDatalist from "./input/vue-datalist";

    export default {
        name: "add-engine-data-panel",
        components: {VueDatalist, InputField},
        data: () => ({
            showErr: false,
            saveDataObj: {
                engineType: null,
                engineManufacturerFk: null,
                cylindersPlacementFk: null,
                fuelTypeFk: null,
                superchargedTypeFk: null,
                cylindersNumber: null,
                flapNumber: null,
                pistonDiameter: null,
                pistonStroke: null,
                engineCapacity: null,
                powerKwt: null,
                degreeCompression: null,
                releaseYearFrom: null,
                releaseYearBy: null,
                horsepower: null
            },
            tempData: {
                engineType: null,
                engineManufacturerFk: null,
                cylindersPlacementFk: null,
                fuelTypeFk: null,
                superchargedTypeFk: null,
                cylindersNumber: null,
                flapNumber: null,
                pistonDiameter: null,
                pistonStroke: null,
                engineCapacity: null,
                powerKwt: null,
                degreeCompression: null,
                releaseYearFrom: null,
                releaseYearBy: null,
                horsepower: null
            },
            updateDataObj: {
                objToBeChanged: null,
                engineType: null,
                engineManufacturerFk: null,
                cylindersPlacementFk: null,
                fuelTypeFk: null,
                superchargedTypeFk: null,
                cylindersNumber: null,
                flapNumber: null,
                pistonDiameter: null,
                pistonStroke: null,
                engineCapacity: null,
                powerKwt: null,
                degreeCompression: null,
                releaseYearFrom: null,
                releaseYearBy: null,
                horsepower: null
            },
            test: null
        }),
        props: {
            namePanel: String,
            dataList: [],
            loadStatus: null
        },
        computed: {
            ...mapGetters([
                'ADDITIONAL_DATA',
                'UPDATE_ENGINE',
                'ENGINE'
            ])
        },
        methods: {
            ...mapActions([
                'GET_ENG'
            ]),
            ...mapMutations({
                cylindersPlacementFk: 'SET_UPDATE_CYLINDERS'
            }),
            autocompliteResult() {
                alert(this.$refs.autocomplete.data.value);
            },
            test(id) {
                alert(id)
            },
            async getEng(number) {
                await this.GET_ENG({id: this.updateDataObj.objToBeChanged});
                this.tempData = this.ENGINE;
                this.updateDataObj.objToBeChanged = this.ENGINE.id
                this.updateDataObj.engineType = this.ENGINE.engineType
                this.updateDataObj.engineManufacturerFk = this.ENGINE.engineManufacturerFk
                this.updateDataObj.cylindersPlacementFk = this.ENGINE.cylindersPlacementFk
                this.updateDataObj.fuelTypeFk = this.ENGINE.fuelTypeFk
                this.updateDataObj.superchargedTypeFk = this.ENGINE.superchargedTypeFk
                this.updateDataObj.cylindersNumber = this.ENGINE.cylindersNumber
                this.updateDataObj.flapNumber = this.ENGINE.flapNumber
                this.updateDataObj.pistonDiameter = this.ENGINE.pistonDiameter
                this.updateDataObj.pistonStroke = this.ENGINE.pistonStroke
                this.updateDataObj.engineCapacity = this.ENGINE.engineCapacity
                this.updateDataObj.powerKwt = this.ENGINE.powerKwt
                this.updateDataObj.degreeCompression = this.ENGINE.degreeCompression
                this.updateDataObj.releaseYearFrom = this.ENGINE.releaseYearFrom
                this.updateDataObj.releaseYearBy = this.ENGINE.releaseYearBy
                this.updateDataObj.horsepower = this.ENGINE.horsepower
                console.log(number)
            },
            async saveEngManufacture(number) {
                let temp = this.ADDITIONAL_DATA.engine.find(item =>
                    item.data === this.saveDataObj.engineType
                );
                if (temp === undefined) {
                    this.showErr = false
                    this.$emit("save-data-api", this.saveDataObj)
                } else {
                    this.showErr = true;

                }
                console.log(number)
            },
            async update(number) {
                this.$emit("update-data-api", this.updateDataObj)
                console.log(number)
            }
        },
        watch: {},
        mounted() {
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