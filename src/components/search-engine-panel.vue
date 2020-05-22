<template>
    <div class="search-engine-panel">
        <!--fields for entering search data.
         Fill with the initial parameters that you get from the backend
          Use a v-model to populate data.-->
        <div class="row  ">
            <div class="input-group col-md-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="engineType">
                        {{$ml.get('word.engine')}}
                        <div v-if="LOADPARAM" class="lds-dual-ring"></div>
                    </label>
                </div>
                <input id="engineType"
                       v-model="searchData.engineType"
                       v-on:change="getEngDataByParam(1)"
                       autocomplete="on" type="text"
                       class="form-control"
                       :placeholder="$ml.get('word.data')"
                       aria-describedby="button-addon1" list="listEn">
                <datalist id="listEn">
                    <option v-for="current in STARTPARAM.engineType" v-bind:key="current"
                            :value="current"
                            :label="current"/>
                </datalist>
                <div class="input-group-append">
                    <button class="btn btn-outline-danger"
                            v-on:click="clrEngTypeAndGetEngDataByParam(1)"
                            type="button" id="button-addon4">
                        <span>&#10008;</span>
                    </button>
                </div>
            </div>
            <div class="input-group col-md-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="engNum">{{$ml.get('word.engineNumber')}}</label>
                </div>
                <input v-on:input="searchData.numberEng = $event.target.value"
                       autocomplete="on" type="text" class="form-control"
                       :placeholder="$ml.get('word.data')"
                       id="engNum"
                       v-on:change="getAutoEnByNum(1)"
                       aria-describedby="button-addon2" list="listNum">
                <datalist id="listNum">
                    <option v-for="current in STARTPARAM.engineNumber" v-bind:key="current" :value="current"
                            :label="current"/>
                </datalist>
                <div class="input-group-append">
                    <button class="btn btn-outline-danger" onclick="document.getElementById('engNum').value =null"
                            type="button" id="button-addon6">
                        <span>&#10008;</span>
                    </button>
                </div>

            </div>
            <div class="col input-group col-md-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="engCap">{{$ml.get('word.engineCapacity')}}</label>
                </div>
                <input v-model="searchData.engineCapacity" min="0" step="0.01" class="form-control"
                       type="number" value="" id="engCap"
                       :placeholder="$ml.get('word.data')">
                <div class="input-group-append">
                    <button class="btn btn-outline-danger" v-on:click="searchData.engineCapacity=null"
                            type="button" id="button-addon7">
                        <span>&#10008;</span>
                    </button>
                </div>
            </div>
            <div class="col input-group col-md-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="engPowerKWt">{{$ml.get('word.powerKwt')}}</label>
                </div>
                <input v-model="searchData.powerKWt" class="form-control" type="text"
                       value=""
                       id="engPowerKWt"
                       :placeholder="$ml.get('word.data')">
                <div class="input-group-append">
                    <button class="btn btn-outline-danger" v-on:click="searchData.powerKWt=null"
                            type="button" id="button-addon8">
                        <span>&#10008;</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="row ">
            <div class="input-group col-md-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">
                        {{$ml.get('word.autoManufacturer')}}
                        <div v-if="LOADPARAM" class="lds-dual-ring"></div>
                    </label>

                </div>
                <select v-model="searchData.autoManufacturer" aria-describedby="button-addon3"
                        id="inputGroupSelect01"
                        v-on:change="getEngDataByParam(1)"
                        class="custom-select form-control">
                    <option v-for="current in STARTPARAM.engineManufacture" v-bind:key="current">{{current}}
                    </option>
                </select>
                <div class="input-group-append">
                    <button class="btn btn-outline-danger"
                            v-on:click="clrAutoManufAndGetEngDataByParam(1)"
                            type="button" id="button-addon3">
                        <span>&#10008;</span>
                    </button>
                </div>
            </div>
            <div class="input-group col-md-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="modelAuto">
                        {{$ml.get('word.autoModel')}}
                        <div v-if="LOADPARAM" class="lds-dual-ring"></div>
                    </label>
                </div>
                <input id="modelAuto"
                       v-model="searchData.autoModel"
                       autocomplete="on" type="text"
                       class="form-control"
                       v-on:change="getEngDataByParam(1)"
                       :placeholder="$ml.get('word.data')"
                       aria-describedby="button-addon1" list="listModel">
                <datalist id="listModel">
                    <option v-for="current in STARTPARAM.autoModel" v-bind:key="current" :value="current"
                            :label="current"/>
                </datalist>
                <div class="input-group-append">
                    <button class="btn btn-outline-danger" v-on:click="clrAutoModelAndGetEngDataByParam(1)"
                            type="button"
                            id="button-addon">
                        <span>&#10008;</span>
                    </button>
                </div>
            </div>
            <div class="input-group col-md-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect03">
                        {{$ml.get('word.fuelType')}}
                        <div v-if="LOADPARAM" class="lds-dual-ring"></div>
                    </label>
                </div>
                <select ref="fuelType" v-model="searchData.fuelType" v-on:change="getEngDataByParam(1)"
                        aria-describedby="button-addon2" id="inputGroupSelect03"
                        class="custom-select form-control">
                    <option v-for="current in STARTPARAM.fuelType" v-bind:key="current">{{current}}
                    </option>
                </select>
                <div class="input-group-append">
                    <button class="btn btn-outline-danger" v-on:click="clrFuelAndGetEngDataByParam(1)" type="button"
                            id="button-addon2">
                        <span>&#10008;</span>
                    </button>
                </div>
            </div>
            <div class="col input-group col-md-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="engY">{{$ml.get('word.releaseYear')}}</label>
                </div>
                <input v-model="searchData.produceYear" class="form-control" min="1885" max="2020"
                       :placeholder="$ml.get('word.data')" step="1"
                       id="engY"
                       type="number" value="">
                <div class="input-group-append">
                    <button class="btn btn-outline-danger" v-on:click="searchData.produceYear=null"
                            type="button" id="button-addon9">
                        <span>&#10008;</span>
                    </button>
                </div>
            </div>
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
                <div v-for="(param,index) in searchData.paramList" v-bind:key="param" class="row">
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
                <div class="row">
                    <div class="col col-md-3"></div>
                    <div class="col col-md-6">
                        <button class="btn form-control btn-block btn-outline-secondary" type="button"
                                v-on:click="addParam(1)">
                            {{$ml.get('word.add')}}
                        </button>
                    </div>
                    <div class="col col-md-3"></div>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "search-engine-panel",
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
    .input-group-text {
        background: #272e38;
        color: #e0dfdc;
    }
</style>