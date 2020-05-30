<template>
    <div class="search-engine-panel">
        <!--fields for entering search data.
         Fill with the initial parameters that you get from the backend
          Use a v-model to populate data.-->
        <div class="savePageRow row  ">
            <vue-datalist
                    class="col-md-3"
                    :title-input="$ml.get('word.autoManufacturer')"
                    :items="STARTPARAM.engineManufacture"
                    :update-obj="searchData"
                    :holderNum="0"
                    index="autoManufacturer"
                    @change-meth="getEngDataByParam"

            />
            <vue-datalist
                    class="col-md-3"
                    :title-input="$ml.get('word.autoModel')"
                    :items="STARTPARAM.autoModel"
                    :update-obj="searchData"
                    :holderNum="0"
                    index="autoModel"
                    @change-meth="getEngDataByParam"

            />
            <vue-datalist
                    class="col-md-3"
                    :title-input="$ml.get('word.engine')"
                    :items="STARTPARAM.engineType"
                    :update-obj="searchData"
                    :holderNum="0"
                    @change-meth="getEngDataByParam"
                    index="engineType"
            />
            <input-field class="col-md-3"
                         :name-input="$ml.get('word.releaseYear')"
                         :save-parameters="searchData"
                         index="produceYear"
            />
        </div>
        <hr style="position: center; width: 70%"/>
        <div class="row ">
            <div class="col-md-3"></div>
            <div class="col col-md-2">
                <button class="btn btn-block buttonanim btn-secondary" type="button" data-toggle="collapse"
                        v-on:click="getParamName(1)"
                        @click="advanceSearch=!advanceSearch">
                         <span>{{$ml.get('word.advancedSearch')}}
                        </span>
                </button>
            </div>
            <div class="col input-group col-md-2">
                <button class="btn btn-block btn-danger buttonanim" v-on:click="clear(1)"
                        type="button" id="button-addon10">
                    <span>{{$ml.get('word.clearAllField')}}</span>
                </button>
            </div>
            <div class="col input-group col-md-2">
                <button type="submit" @click="submitChanges('submit')"
                        class="btn buttonanim btn-block btn-primary">
                    <span>{{$ml.get('word.search')}}</span>
                </button>
            </div>
            <div class="col-md-3"></div>

        </div>
        <transition name="slide-fade">
            <!--here we enter data for an improved search, which the user measures-->
            <div v-if="advanceSearch">
                <div class="savePageRow row  ">
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.engineNumber')"
                            :items="STARTPARAM.engineNumber"
                            :update-obj="searchData"
                            :holderNum="0"
                            index="numberEng"
                            @change-meth="getAutoEnByNum"

                    />
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.fuelType')"
                            :items="STARTPARAM.fuelType"
                            :update-obj="searchData"
                            :holderNum="0"
                            index="fuelType"
                            @change-meth="getEngDataByParam"

                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.engineCapacity')"
                                 :save-parameters="searchData"
                                 index="engineCapacity"
                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.powerKwt')"
                                 :save-parameters="searchData"
                                 index="powerKWt"
                    />
                </div>
                <hr/>
                <div v-for="(param,index) in searchData.paramList" v-bind:key="param" class="savePageRow row ">
                    <div class="input-group col-md-5">
                        <div class="input-group-prepend">
                            <label class="input-group-text" :for="'param'+index">{{$ml.get('word.parameter')}}</label>
                        </div>

                        <input list="listParam"
                               v-model="param.parameterName"
                               class="form-control"
                               :id="'param'+index"
                        >
                        <datalist id="listParam">
                            <option v-for="current in PARAM_NAME_AND_UNITS.paramName" v-bind:key="current"
                                    :value="current.data"
                                    :label="current.data"/>
                        </datalist>
                        <div class="input-group-append">
                            <button class="btn btn-outline-danger" v-on:click="param.parameterName=null"
                                    type="button" id="button-addon11">
                                <span>&#10008;</span>
                            </button>
                        </div>
                    </div>
                    <div class="input-group col-md-4">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect3">{{$ml.get('word.units')}}
                            </label>
                        </div>
                        <select v-model="param.unitsFullName" aria-describedby="button-addon5"
                                id="inputGroupSelect3"
                                class="custom-select form-control">
                            <option v-for="current in PARAM_NAME_AND_UNITS.units" v-bind:key="current">
                                {{current.data}}
                            </option>
                        </select>
                        <div class="input-group-append">
                            <button class="btn btn-outline-danger"
                                    v-on:click="param.unitsFullName=null" type="button"
                                    id="button-addon5">
                                <span>&#10008;</span>
                            </button>
                        </div>
                    </div>
                    <div v-if="searchData.paramList.length>1" class="col col-md-2">
                        <input v-model="param.parameterNumber" class="form-control" type="number"
                               value="" :placeholder="$ml.get('word.data')"
                        >
                    </div>
                    <div v-if="searchData.paramList.length>1" class="col col-md-1">
                        <button class="btn btn-block btn-outline-danger"
                                v-on:click="searchData.paramList.splice(index,1)" type="button">
                            <span>{{$ml.get('word.deleteR')}}</span>
                        </button>
                    </div>
                    <div v-if="searchData.paramList.length===1" class="col col-md-3">
                        <input v-model="param.parameterNumber" class="form-control" type="number"
                               value="" :placeholder="$ml.get('word.data')"
                        >
                    </div>
                </div>
                <div class="savePageRow row ">
                    <div class="col col-md-4"></div>
                    <div class="col col-md-4">
                        <button class="btn form-control btn-block btn-outline-secondary" type="button"
                                v-on:click="addParam(1)">
                            {{$ml.get('word.add')}}
                        </button>
                    </div>
                    <div class="col col-md-4"></div>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import InputField from "../input/input-field";
    import VueDatalist from "../input/vue-datalist";


    export default {
        name: "search-engine-panel",
        components: {VueDatalist, InputField},
        data: () => ({
            paramtrs: [],
            choiceParam: [],
            paramIndex: 1,
            elemParameters: [],
            errorMessage: '',
            searchData: {
                paramList: [{
                    parameterName: '',
                    unitsFullName: '',
                    parameterNumber: ''
                }],
                engineType: null,
                autoManufacturer: null,
                autoModel: null,
                produceYear: null,
                numberEng: null,
                fuelType: null,
                powerKWt: null,
                engineCapacity: null
            },
            choiceData: [],
            test: null,
            advanceSearch: false
        }),
        mounted() {
            this.GET_START_PARAM()
        },
        computed: {
            ...mapGetters([
                'STARTPARAM',
                'ENGDATA',
                'SHOW_LOAD',
                'LISTPARAM',
                'PARAM_NAME_AND_UNITS',
                'ELEMENTS',
                'SEARCHDATA',
                'LOADPARAM'
            ])
        },
        methods: {
            ...mapActions([
                'GET_START_PARAM',
                'GET_AUTOENG_BY_PARAM',
                'GET_PARAMTRS',
                'GET_PARAM_NAME',
                'GET_ELEMENTS',
                'GET_AUTO_BY_ENG',
                'GET_ENGDATA_BY_PARAM'
            ]),
            ...mapMutations({
                setEngData: 'SET_ENGDATA',
                setElements: 'SET_ELEMENTS',

            }),
            clear(number) {
                this.searchData = {
                    paramList: [{
                        parameterName: '',
                        unitsFullName: '',
                        parameterNumber: ''
                    }],
                    engineType: null,
                    autoManufacturer: null,
                    autoModel: null,
                    produceYear: null,
                    numberEng: null,
                    fuelType: null,
                    powerKWt: null,
                    engineCapacity: null
                };
                document.getElementById('engineType').value = ''
                document.getElementById('engNum').value = ''
                console.log(number)
            }
            ,
            addParam(number) {
                this.searchData.paramList.push({
                    parameterName: '',
                    unitsFullName: '',
                    parameterNumber: ''
                });
                console.log(number)
            },
            async getAutoEnByNum(number) {
                this.GET_AUTO_BY_ENG(this.searchData);
                if (this.SEARCHDATA.powerKwt != undefined) {
                    this.searchData.autoModel = this.SEARCHDATA.autoModel;
                    this.searchData.autoManufacturer = this.SEARCHDATA.autoManufacture;
                    this.searchData.produceYear = this.SEARCHDATA.produceYear;
                    this.searchData.powerKWt = this.SEARCHDATA.powerKwt;
                    this.searchData.engineType = this.SEARCHDATA.engineType;
                    this.searchData.fuelType = this.SEARCHDATA.fuelType;
                    this.searchData.engineCapacity = this.SEARCHDATA.engineCapacity;
                } else {
                    this.errorMessage = 'відсутній номер двигуна';
                    document.getElementById('openModal').click();
                }
                console.log(number)
            }
            ,
            async getEngDataByParam(number) {
                this.GET_ENGDATA_BY_PARAM(this.searchData);
                console.log(number);
            },
            async clrFuelAndGetEngDataByParam(obj) {
                this.searchData.fuelType = null
                this.GET_ENGDATA_BY_PARAM(this.searchData);
                console.log(obj);
            },
            async clrEngTypeAndGetEngDataByParam(obj) {
                this.searchData.engineType = null
                this.GET_ENGDATA_BY_PARAM(this.searchData);
                console.log(obj);
            },
            async clrAutoModelAndGetEngDataByParam(obj) {
                this.searchData.autoModel = null
                this.GET_ENGDATA_BY_PARAM(this.searchData);
                console.log(obj);
            },
            async clrAutoManufAndGetEngDataByParam(obj) {
                this.searchData.autoManufacturer = null
                this.GET_ENGDATA_BY_PARAM(this.searchData);
                console.log(obj);
            }

            ,
            //request for parameters
            async getParamName(number) {
                if (this.PARAM_NAME_AND_UNITS != null) {
                    this.GET_PARAM_NAME();
                }
                console.log(number);
            }
            ,
            //request for data about the auto engine
            async submitChanges(dat) {
                // this.dataEng = [];
                // this.listParam = [];
                //   this.elements = [];
                this.setElements(null);
                if ((!Number.isInteger(Number(this.searchData.produceYear)) || (this.searchData.produceYear < 1885 || this.searchData.produceYear > 2020)) && !this.searchData.produceYear == 0) {
                    this.errorMessage = "Ви некоректно ввели рік";
                    document.getElementById('openModal').click();
                } else {
                    this.$emit('submit-function', this.searchData);
                    // this.GET_AUTOENG_BY_PARAM(this.searchData);

                    if (this.ENGDATA.status == null) {
                        if (this.ENGDATA.dataEng[0] == null) {
                            this.errorMessage = "в базі немає записів";
                            document.getElementById('openModal').click();
                        }
                    } else {
                        this.errorMessage = this.ENGDATA.status;
                        document.getElementById('openModal').click();
                    }
                    console.log(dat)
                }
            }
        }
    }
</script>

<style>
     .savePageRow {
        max-width: 74vw;
        min-width: 74vw;
    }
    .input-group-text {
        background: white;
        color: #272e38;
        font-weight: bold;
    }
</style>