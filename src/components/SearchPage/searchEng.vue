<template>

    <div class="searchEng">
        <error-page
                v-if="!currentUser"
        />
        <div v-if="currentUser">
            <div class="search-border container  bg-white rounded" id="searchCont" style="  display: flex; flex-direction: column; text-align: center ;">
                <br/>
                <div class="search-logo" id="Searchlogo" style=" height: 40px;">

                    <div class="deepshd head-text " >
                        <h4> {{ $ml.get('word.search')}}</h4>
                    </div>
                </div>
                <br/>
                <search-engine-panel
                        @submit-function="GET_AUTOENG"
                />
            </div>
            <!--engine data table. By clicking on row m we open the engine tree, where we can find out its parameters-->
            <div class="container search-border tab  rounded bg-white rad" id="contTable" style=" display: flex;
	flex-direction: row; height: auto">
                <table class=" table  rounded table-hover " style="height: auto;align-items: flex-start; ">
                    <thead>
                    <tr>
                        <th>{{$ml.get('word.engine')}}</th>
                        <th>{{$ml.get('word.autoManufacturer')}}</th>
                        <th>{{$ml.get('word.autoModel')}}</th>
                        <th>{{$ml.get('word.releaseYear')}}</th>
                        <th>{{$ml.get('word.fuelType')}}</th>
                        <th>{{$ml.get('word.cylinders')}}</th>
                        <th>{{$ml.get('word.cylindersNumber')}}</th>
                        <th>{{$ml.get('word.flapNumber')}}</th>
                        <th>{{$ml.get('word.pistonDiameter')}}</th>
                        <th>{{$ml.get('word.pistonStroke')}}</th>
                        <th>{{$ml.get('word.engineCapacity')}}</th>
                        <th>{{$ml.get('word.powerKwt')}}</th>
                        <th>{{$ml.get('word.horsepower')}}</th>
                        <th>{{$ml.get('word.superchargedType')}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="current in ENGDATA" v-bind:key="current" data-toggle="collapse" href="#collapse"
                        role="button" aria-expanded="false" :class="{trActive: current.active}" aria-controls="collapse"
                        v-on:click="getElements(current)">
                        <td>{{current.engineType}}</td>
                        <td>{{current.autoManufacture}}</td>
                        <td>{{current.modelName}}</td>
                        <td v>
                            <span v-if="current.releaseYearFrom!=null && current.releaseYearBy!=null"> {{current.releaseYearFrom+'-'+current.releaseYearBy}}</span>
                            <span v-else-if="current.releaseYearFrom!=null ">{{current.releaseYearFrom}}</span>
                            <span v-else-if="current.releaseYearBy!=null">{{current.releaseYearBy}}</span>
                            <span v-else-if="current.releaseYearFrom==null && current.releaseYearBy==null"></span>
                        </td>
                        <td>{{current.fuelType}}</td>
                        <td>{{current.cylinderPlace}}</td>
                        <td>{{current.cylindersNumber}}</td>
                        <td>{{current.flapNumber}}</td>
                        <td>
                            <span v-if="current.pistonDiameter!==null">{{Number(current.pistonDiameter).toFixed(4)}}</span>
                            <span v-else></span>
                        </td>
                        <td>
                            <span v-if="current.pistonStoke!==null">{{Number(current.pistonStoke).toFixed(4)}}</span>
                            <span v-else></span>
                        </td>
                        <td>{{current.engineCapacity}}</td>
                        <td>{{current.powerKWT}}</td>
                        <td>{{current.horsepower}}</td>
                        <td>{{current.superchargedType}}</td>

                    </tr>
                    </tbody>
                </table>
                <div v-if="SHOW_LOAD || ELEMENTS_LOAD"  class="lds-dual-ring-black"
                     style="position: absolute;bottom: 0vh; right: 50%; "></div>
            </div>

            <!--recursive tree of objects. Most likely it will look different-->

            <auto-engine-full-tree
                    v-if="currentUser"
                    :auto_id="auto_id"
                    ref="contParam" v-show="ELEMENTS!=null"/>


        </div>
    </div>
</template>

<script>

    import {mapActions, mapGetters} from 'vuex'
    import AutoEngineFullTree from "../tree/auto-engine-full-tree";
    import SearchEnginePanel from "./search-engine-panel";

    export default {
        name: "searchEng",

        components: {
            SearchEnginePanel,
            AutoEngineFullTree

        },
        data: () => ({
            paramtrs: [],
            choiceParam: [],
            paramIndex: 1,
            elemParameters: [],
            errorMessage: '',
            nowPressed: {
                linkOnButt: {
                    isPressed: false
                }
            },
            tempActiveRow: {active: false},
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
            auto_id: null,
            choiceData: [],
            test: null,
            advanceSearch: false
        }),
        //All requests will be transferred to the vuex for convenience.
        mounted() {

        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
            ...mapGetters([
                'STARTPARAM',
                'ENGDATA',
                'SHOW_LOAD',
                'PARAM_NAME_AND_UNITS',
                'SEARCHDATA',
                'LOADPARAM',
                'ELEMENTS',
                'PARAM_NAME',
                'ELEMENTS_LOAD'

            ])
        },
        methods: {
            ...mapActions([
                'GET_START_PARAM',
                'GET_PARAM_NAME',
                'GET_ELEMENTS',
                'GET_AUTO_BY_ENG',
                'GET_AUTOENG',
                'GET_AUTOENG_BY_PARAM',
                'GET_ALL_PARAM_NAME'
            ]),

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
            //query to get a list of parameter names
            async getElements(current) {
                this.tempActiveRow.active = false;
                current.active = true;
                this.tempActiveRow = current;
                this.listParam = [];
                this.nowPressed.linkOnButt.isPressed = false;
                this.auto_id = current.id;
                this.GET_ELEMENTS(current.id);
                document.getElementById('contParam').style.display = 'block'
                console.log(current.id)
            }
            ,
            //request for data about the auto engine
            async submitChanges(dat) {
                document.getElementById('contParam').style.display = 'none';
                this.dataEng = [];
                this.listParam = [];
                this.elements = [];
                if ((!Number.isInteger(Number(this.searchData.produceYear))
                    || (this.searchData.produceYear < 1885 || this.searchData.produceYear > 2020))
                    && !this.searchData.produceYear == 0) {
                    this.errorMessage = "Ви некоректно ввели рік";
                    document.getElementById('openModal').click();
                } else {
                    this.GET_AUTOENG_BY_PARAM(this.searchData);
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
    #contTable {
        min-height: 20vh;
    }


    .container {
        padding: 20px;
        min-width: 97vw;
    }

    .row {
        position: center;
        padding: 20px;
        width: auto;
        min-width: 17vw;
        max-width: 97vw;
    }

    .input-group-prepend {
        max-height: 38px;

    }


    .modal-dialog {
        width: 1300px;
    }

    .head-text {
        font-family: 'Allerta', Helvetica, Arial, sans-serif;
        font-size: 50px;
        line-height: 55px;
        width: 100%;
        position: center;
    }


    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
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

    .btn-danger span:after {
        content: '\2718';
        position: absolute;
        opacity: 0;
        right: -20px;
        transition: 0.5s;
    }

    .btn-secondary span:after {
        content: "\271A";
        position: absolute;
        opacity: 0;
        right: -20px;
        transition: 0.5s;
    }

    .btn-primary span:after {
        content: "\27A4";
        position: absolute;
        opacity: 0;
        right: -20px;
        transition: 0.5s;
    }

    .buttonanim:hover span {
        padding-right: 25px;
    }

    .buttonanim:hover span:after {
        opacity: 1;
        right: 0;
    }




    .search-logo {

        position: absolute;
        left: 40%;
        right: 40%;
        top: 0px;
        width: 20%;
        height: 50px;
        background: lightslategrey;
        border-bottom-right-radius: 90px;
        border-bottom-left-radius: 90px;
    }

    .search-tab {
        text-align: center;
        horiz-align: center;
        position: relative;
        top: -5vh;
        border-style: solid;
        border-top-color: #272e38;
        border-width: 1px 0px 0px 0px;
    }


    .search-border {
        border-style: solid;
        border-top-color: lightslategrey;
        border-width: 15px 0px 0px 0px;

    }

    #Searchlogo{

    }

    .trActive {
        background: lightgray;
    }

</style>
