<template>
    <div>
        <ul class="nav nav-tabs" id="myTabengine" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="home-tabengine" data-toggle="tab" :href="'#h'+nameTitle"
                   role="tab" aria-controls="home" aria-selected="true">{{$ml.get('word.table')}}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="profile-tabengine" data-toggle="tab" :href="'#p'+nameTitle"
                   role="tab" aria-controls="profile" aria-selected="false">{{$ml.get('word.save')}}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="contact-tabengine" data-toggle="tab" :href="'#c'+nameTitle"
                   role="tab" aria-controls="contact" aria-selected="false">{{$ml.get('word.update')}}</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContentengine" style="border: white">
            <div class="tab-pane fade show active" :id="'h'+nameTitle" role="tabpanel"
                 aria-labelledby="home-tab">
                <br/>
                <br/>
                <table class="table table-hover  " style="text-align: center; z-index: 0; border-radius: 0px; ">
                    <thead>
                    <tr >
                        <th scope="col">id</th>
                        <th scope="col">{{$ml.get('word.engine')}}</th>
                        <th scope="col">{{$ml.get('word.cylinders')}}</th>
                        <th scope="col">{{$ml.get('word.fuelType')}}</th>
                        <th scope="col" v-text="$ml.get('word.engineManufacture')"></th>
                        <th scope="col" v-text="$ml.get('word.superchargedType')"></th>
                        <th scope="col" v-text="$ml.get('word.pistonStroke')"></th>
                        <th scope="col" v-text="$ml.get('word.engineCapacity')"></th>
                        <th scope="col" v-text="$ml.get('word.powerKwt')"></th>
                        <th scope="col" v-text="$ml.get('word.horsepower')"></th>
                        <th scope="col" v-text="$ml.get('word.cylindersNumber')"></th>
                        <th scope="col" v-text="$ml.get('word.flapNumber')"></th>
                        <th scope="col" v-text="$ml.get('word.degreeCompression')"></th>
                        <th scope="col" v-text="$ml.get('word.releaseYear')"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="current in ADDITIONAL_DATA.engine" v-bind:key="current">
                        <td>{{current.id}}</td>
                        <td>{{current.data}}</td>
                        <td>{{current.cylindersPlacement}}</td>
                        <td>{{current.fuelType}}</td>
                        <td>{{current.engineManufacture}}</td>
                        <td>{{current.superchargedType}}</td>
                        <td>{{current.pistonStroke}}</td>
                        <td>{{current.engineCapacity}}</td>
                        <td>{{current.powerKwt}}</td>
                        <td>{{current.horsepower}}</td>
                        <td>{{current.cylindersNumber}}</td>
                        <td>{{current.flapNumber}}</td>
                        <td>{{current.degreeCompression}}</td>
                        <td v-if="current.releaseYearFrom!=null && current.releaseYearBy!=null">
                            {{current.releaseYearFrom+'-'+current.releaseYearBy}}
                        </td>
                        <td v-if="current.releaseYearFrom!=null ">{{current.releaseYearFrom}}</td>
                        <td v-if="current.releaseYearBy!=null">{{current.releaseYearFrom}}</td>
                        <td v-if="current.releaseYearFrom==null && current.releaseYearBy==null"></td>                    </tr>
                    </tbody>
                </table>

            </div>
            <div class="tab-pane fade" :id="'p'+nameTitle" role="tabpanel"
                 aria-labelledby="profile-tab">
                <br/>
                <br/>
                <div class="savePageRow  row ">
                    <div v-if="showErr" class="alert alert-danger" role="alert" style="text-align:center; width: 100%">
                        {{$ml.get('msg.duplicateValue')}}
                    </div>

                </div>
                <div class="savePageRow row ">
                    <input-field class="col-md-4"
                                 :name-input="$ml.get('word.engine')"
                                 :save-parameters="saveDataObj"
                                 index="engineType"
                    />
                    <vue-datalist
                            class="col-md-4"
                            :title-input="$ml.get('word.fuelType')"
                            :items="ADDITIONAL_DATA.fuelType"
                            :update-obj="saveDataObj"
                            index="fuelTypeFk"
                            :holder-num=0
                    />
                    <vue-datalist
                            class="col-md-4"
                            :title-input="$ml.get('word.engineManufacture')"
                            :items="ADDITIONAL_DATA.engineManufacture"
                            :update-obj="saveDataObj"
                            index="engineManufacturerFk"
                            :holder-num=0

                    />

                </div>
                <div class="savePageRow row ">
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.cylinders')"
                            :items="ADDITIONAL_DATA.cylinders"
                            :update-obj="saveDataObj"
                            :holder-num=0
                            index="cylindersPlacementFk"
                    />
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.superchargedType')"
                            :items="ADDITIONAL_DATA.superchargeType"
                            :update-obj="saveDataObj"
                            index="superchargedTypeFk"
                            :holder-num=0
                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.pistonStroke')"
                                 :save-parameters="saveDataObj"
                                 index="pistonStroke"
                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.engineCapacity')"
                                 :save-parameters="saveDataObj"
                                 index="engineCapacity"

                    />
                </div>
                <div class=" savePageRow row ">
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.powerKwt')"
                                 :save-parameters="saveDataObj"
                                 index="powerKwt"

                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.horsepower')"
                                 :save-parameters="saveDataObj"
                                 index="horsepower"
                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.cylindersNumber')"
                                 :save-parameters="saveDataObj"
                                 index="cylindersNumber"
                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.flapNumber')"
                                 :save-parameters="saveDataObj"
                                 index="flapNumber"
                    />
                </div>
                <div class="savePageRow row">
                    <input-field class="col-md-4"
                                 :name-input="$ml.get('word.degreeCompression')"
                                 :save-parameters="saveDataObj"
                                 index="degreeCompression"

                    />
                    <input-field class="col-md-4"
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
                <div class="savePageRow row ">
                    <div class="col-md-5">
                    </div>
                    <div class="col-md-2">
                        <button type="submit" @click="saveEngManufacture(1)"
                                class="btn btn-outline-dark btn-block ">
                            <span>{{$ml.get('word.save')}}</span>
                        </button>
                    </div>
                    <div class="col-md-5"></div>
                </div>                <hr/>
                <span v-if="loadStatus"><div class="lds-dual-ring-black posCenter"></div></span>
                <div class="savePageRow row ">
                    <div v-if="showErr" class="alert alert-danger col-md-12" role="alert" style="margin-left: 4%">
                        {{$ml.get('msg.duplicateValue')}}
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" :id="'c'+nameTitle" role="tabpanel"
                 aria-labelledby="contact-tab">
                <br/>
                <br/>
                <div class="savePageRow row">
                    <vue-datalist
                            class="col-md-8"
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
                </div>
                <hr style="color: lightgray"/>
                <div class="savePageRow row">
                    <input-field
                            class="col-md-4"
                            :name-input="$ml.get('word.engine')"
                            :save-parameters="updateDataObj"
                            index="engineType"
                    />
                    <vue-datalist
                            class="col-md-4"
                            :title-input="$ml.get('word.cylinders')"
                            :items="ADDITIONAL_DATA.cylinders"
                            :update-obj="updateDataObj"
                            :holderNum="0"
                            index="cylindersPlacementFk"
                    />
                    <vue-datalist
                            class="col-md-4"
                            :title-input="$ml.get('word.engineManufacture')"
                            :items="ADDITIONAL_DATA.engineManufacture"
                            :update-obj="updateDataObj"
                            :holderNum="0"
                            index="engineManufacturerFk"
                    />

                </div>
                <div class="savePageRow row">
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.fuelType')"
                            :items="ADDITIONAL_DATA.fuelType"
                            :update-obj="updateDataObj"
                            :holderNum="0"
                            index="fuelTypeFk"
                    />
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.superchargedType')"
                            :items="ADDITIONAL_DATA.superchargeType"
                            :update-obj="updateDataObj"
                            :holderNum="0"
                            index="superchargedTypeFk"
                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.pistonStroke')"
                                 :save-parameters="updateDataObj"
                                 index="pistonStroke"
                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.engineCapacity')"
                                 :save-parameters="updateDataObj"
                                 index="engineCapacity"
                    />

                </div>
                <div class="savePageRow row">
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.powerKwt')"
                                 :save-parameters="updateDataObj"
                                 index="powerKwt"
                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.horsepower')"
                                 :save-parameters="updateDataObj"
                                 index="horsepower"
                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.cylindersNumber')"
                                 :save-parameters="updateDataObj"
                                 index="cylindersNumber"
                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.flapNumber')"
                                 :save-parameters="updateDataObj"
                                 index="flapNumber"
                    />
                </div>
                <div class="savePageRow row">
                    <input-field class="col-md-4"
                                 :name-input="$ml.get('word.degreeCompression')"
                                 :save-parameters="updateDataObj"
                                 index="degreeCompression"
                    />
                    <input-field class="col-md-4"
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
                <hr/>
                <span v-if="loadStatus"><div class="lds-dual-ring-black posCenter"></div></span>

            </div>
        </div>
    </div>
</template>

<script>
    import VueDatalist from "../vue-datalist";
    import InputField from "../input-field";
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "save-engine-panel",
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
            nameTitle: String,
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

<style scoped>
    a{
        padding-left: 3vw;
        padding-right: 3vw;
        color: #272e38;
        font-weight: bold;
    }
    .savePageRow {
        max-width: 75vw;
        min-width: 75vw;
    }
</style>