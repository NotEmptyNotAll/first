<template>

    <div class="searchEng">

        <div class="search-border container  bg-white rad" id="searchCont" style="text-align: center">
            <div class="search-logo">
                <div class="head-text deepshd "><h2>{{$ml.get('word.engine')}}</h2></div>
            </div>
            <br/>
            <br/>
            <search-engine-panel
                    @submit-function="GET_AUTOENG_BY_PARAM"
            />
        </div>
        <!--engine data table. By clicking on row m we open the engine tree, where we can find out its parameters-->
        <div class="container tab  search-border bg-white rad" id="contTable" style="position: relative">
            <table class="table search-tab table-hover">
                <thead class="thead-light-dark ">
                <tr>
                    <th>{{$ml.get('word.engine')}}</th>
                    <th>{{$ml.get('word.engineManufacture')}}</th>
                    <th>{{$ml.get('word.cylinders')}}</th>
                    <th>{{$ml.get('word.fuelType')}}</th>
                    <th>{{$ml.get('word.cylindersNumber')}}</th>
                    <th>{{$ml.get('word.flapNumber')}}</th>
                    <th>{{$ml.get('word.pistonDiameter')}}</th>
                    <th>{{$ml.get('word.pistonStroke')}}</th>
                    <th>{{$ml.get('word.engineCapacity')}}</th>
                    <th>{{$ml.get('word.powerKwt')}}</th>
                    <th>{{$ml.get('word.horsepower')}}</th>
                    <th>{{$ml.get('word.degreeCompression')}}</th>
                    <th>{{$ml.get('word.superchargedType')}}</th>
                    <th>{{$ml.get('word.releaseYear')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="current in ENGDATA" v-bind:key="current" data-toggle="collapse" href="#collapse"
                    role="button" aria-expanded="false" aria-controls="collapse"
                    v-on:click="getElements(current.id)">
                    <td>{{current.engineType}}</td>
                    <td>{{current.engineManufacture}}</td>
                    <td>{{current.cylinderPlace}}</td>
                    <td>{{current.fuelType}}</td>
                    <td>{{current.cylindersNumber}}</td>
                    <td>{{current.flapNumber}}</td>
                    <td>{{Number(current.pistonDiameter).toFixed(4)}}</td>
                    <td>{{Number(current.pistonStoke).toFixed(4)}}</td>
                    <td>{{current.engineCapacity}}</td>
                    <td>{{current.powerKWT}}</td>
                    <td>{{current.horsepower}}</td>
                    <td>{{Number(current.degreeCompression).toFixed(4)}}</td>
                    <td>{{current.superchargedType}}</td>
                    <td v-if="current.releaseYearFrom!=null && current.releaseYearBy!=null">
                        {{current.releaseYearFrom+'-'+current.releaseYearBy}}
                    </td>
                    <td v-if="current.releaseYearFrom!=null ">{{current.releaseYearFrom}}</td>
                    <td v-if="current.releaseYearBy!=null">{{current.releaseYearFrom}}</td>
                    <td v-if="current.releaseYearFrom==null && current.releaseYearBy==null"></td>
                </tr>
                </tbody>
            </table>
            <load v-if="SHOW_LOAD" style="position: absolute;left: 43%; right: 40%; bottom: 20%"></load>
        </div>

        <!--recursive tree of objects. Most likely it will look different-->
        <auto-engine-full-tree ref="contParam" v-show="ELEMENTS!=null"/>


        <!-- Modal -->
        <button type="button " class="btn btn-primary" id="openModal" data-toggle="modal" data-target="#errorModal"
                style="visibility: hidden">
        </button>
        <!-- Modal -->
        <div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Помилка</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h5>{{errorMessage}}</h5>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import load from "./load";
    import {mapActions, mapGetters} from 'vuex'
    import SearchEnginePanel from "./search-engine-panel";
    import AutoEngineFullTree from "./auto-engine-full-tree";

    export default {
        name: "searchEng",

        components: {
            AutoEngineFullTree,
            SearchEnginePanel,
            load
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
        //All requests will be transferred to the vuex for convenience.
        mounted() {
            this.GET_START_PARAM()
        },
        computed: {
            ...mapGetters([
                'STARTPARAM',
                'ENGDATA',
                'SHOW_LOAD',
                'PARAM_NAME_AND_UNITS',
                'SEARCHDATA',
                'LOADPARAM',
                'ELEMENTS'
            ])
        },
        methods: {
            ...mapActions([
                'GET_START_PARAM',
                'GET_AUTOENG_BY_PARAM',
                'GET_PARAM_NAME',
                'GET_ELEMENTS',
                'GET_AUTO_BY_ENG',
                'GET_AUTOENG_BY_PARAM'
            ]),

            clear() {
                document.getElementById('contParam').style.display = 'none'
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
                }
                document.getElementById('engineType').value = ''
                document.getElementById('engNum').value = ''
                this.dataEng = []
                this.listParam = []
                this.elements = []
                this.getEngDataByParam(1)
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
            //query to get a list of parameter names
            async getElements(number) {
                this.listParam = [];
                this.nowPressed.linkOnButt.isPressed = false;
                this.GET_ELEMENTS(number);
                document.getElementById('contParam').style.display = 'block'
                console.log(number)
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


    .row, .container {
        padding: 20px;
        min-width: 97vw;
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
    }


    .slide-fade-enter, .slide-fade-leave-to
        /*.slide-fade-leave-active до версии 2.1.8 */
    {
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
        content: '\2716';
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

    .buttonanim:hover {
        box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
    }


    .search-logo {

        position: absolute;
        left: 40%;
        right: 40%;
        top: 0px;
        width: 20%;
        height: 50px;
        background: #272e38;
        border-bottom-right-radius: 90px;
        border-bottom-left-radius: 90px;
    }

    .search-tab {
        position: absolute;
        top: -15px;
        left: 3%;
        width: 94%;
        border: 1px solid black; /* Рамка вокруг таблицы */
    }

    .search-border {
        border-style: solid;
        border-top-color: #272e38;
        border-width: 15px 0px 0px 0px;

    }

</style>
