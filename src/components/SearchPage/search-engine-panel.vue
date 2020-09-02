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
                    :clean-search="cleanField"
                    index="autoManufacturer"
                    @change-meth="getEngDataByParam"

            />
            <vue-datalist
                    class="col-md-3"
                    :title-input="$ml.get('word.autoModel')"
                    :items="STARTPARAM.autoModel"
                    :update-obj="searchData"
                    :holderNum="0"
                    :clean-search="cleanField"
                    index="autoModel"
                    @change-meth="getEngDataByParam"

            />
            <vue-datalist
                    class="col-md-3"
                    :title-input="$ml.get('word.engine')"
                    :items="STARTPARAM.engineType"
                    :update-obj="searchData"
                    :clean-search="cleanField"
                    :holderNum="0"
                    @change-meth="getEngDataByParam"
                    index="engineType"
            />
            <input-field class="col-md-3"
                         number
                         min="1895"
                         max="2020"
                         :name-input="$ml.get('word.releaseYear')"
                         :save-parameters="searchData"
                         index="produceYear"
            />
        </div>
        <!--here we enter data for an improved search, which the user measures-->
        <b-collapse id="collapse-1" class="mt-2">

            <div class=" row  ">
                <vue-datalist
                        class="col-md-3"
                        :title-input="$ml.get('word.engineNumber')"
                        :items="STARTPARAM.engineNumber"
                        :update-obj="searchData"
                        :holderNum="0"
                        index="numberEng"
                        :clean-search="cleanField"
                        @change-meth="getAutoEnByNum"

                />
                <vue-datalist
                        class="col-md-3"
                        :title-input="$ml.get('word.fuelType')"
                        :items="STARTPARAM.fuelType"
                        :update-obj="searchData"
                        :holderNum="0"
                        :clean-search="cleanField"
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
                    <param-elements-input
                            :load="ELEMENTS_TREE_FOR_SEARCH_LOAD"
                            :title-input="$ml.get('word.parameter')"
                            :items="treeElem"
                            :param-obj="param"
                            index-node-id="parameterNodeId"
                            index-child-id="parameterChildId"
                    />
                </div>
                <vue-datalist
                        class="col-md-4"
                        :title-input="$ml.get('word.units')"
                        :items="PARAM_NAME_AND_UNITS.units"
                        :update-obj="param"
                        :holderNum="0"
                        index="unitsFullName"
                />
                <div v-if="searchData.paramList.length>1" class="col col-md-2">
                    <input v-model="param.parameterNumber" class="form-control" type="number"
                           value="" :placeholder="$ml.get('word.data')"
                    >
                </div>
                <div v-if="searchData.paramList.length>1" class="col col-md-1">
                    <button class="btn  btn-outline-danger"
                            v-on:click="searchData.paramList.splice(index,1)" type="button">
                        <span>        <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                        </span>
                    </button>
                </div>
                <div v-if="searchData.paramList.length===1" class="col col-md-3">
                    <input v-model="param.parameterNumber" class="form-control" type="text"
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
        </b-collapse>
        <hr style="position: center; width: 70%"/>

        <div class="row ">
            <div class="col-md-3"></div>
            <div class="col col-md-2">
                <!-- <button class="btn btn-block buttonanim btn-secondary" type="button" data-toggle="collapse"
                         @click="advanceSearch=!advanceSearch">
                          <span>{{$ml.get('word.advancedSearch')}}
                         </span>
                 </button>-->
                <b-button v-b-toggle.collapse-1 class="btn btn-block buttonanim btn-secondary"
                          variant="secondary"><span>{{$ml.get('word.advancedSearch')}}
                        </span></b-button>

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

    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import InputField from "../input/input-field";
    import VueDatalist from "../input/vue-datalist";
    import ParamElementsInput from "../input/param-elements-input";


    export default {
        name: "search-engine-panel",
        components: {ParamElementsInput, VueDatalist, InputField},
        data: () => ({
            paramtrs: [],
            choiceParam: [],
            paramIndex: 1,
            elemParameters: [],
            errorMessage: '',
            searchData: {
                paramList: [{
                    parameterNodeId: null,
                    parameterChildId: null,
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
            treeElem: [],
            cleanField: false,
            choiceData: [],
            test: null,
            advanceSearch: false
        }),
        mounted() {
            this.GET_PARAM_NAME();
            this.GET_ALL_PARAM_NAME();
            this.GET_TREE_ELEMENTS()
            this.clear(1)

        },
        watch: {
            // eslint-disable-next-line no-unused-vars
            TREE_ELEMENTS: function (val) {
                this.treeElem = this.TREE_ELEMENTS.elementsCh
                this.mapTreeElem(this.treeElem)
            }
        },
        computed: {
            ...mapGetters([
                'STARTPARAM',
                'ENGDATA',
                'SHOW_LOAD',
                'LISTPARAM',
                'ELEMENTS_TREE_FOR_SEARCH_LOAD',
                'PARAM_NAME_AND_UNITS',
                'ELEMENTS',
                'SEARCHDATA',
                'LOADPARAM',
                'TREE_ELEMENTS'
            ])
        },
        methods: {
            ...mapActions([
                'GET_START_PARAM',
                'GET_AUTOENG_BY_PARAM',
                'GET_ALL_PARAM_NAME',
                'GET_PARAMTRS',
                'GET_PARAM_NAME',
                'GET_TREE_ELEMENTS',
                'GET_ELEMENTS',
                'GET_AUTO_BY_ENG',
                'GET_ENGDATA_BY_PARAM'
            ]),
            ...mapMutations({
                setEngData: 'SET_ENGDATA',
                setElements: 'SET_ELEMENTS',
                setAutoEng: 'SET_AUTO_ENGINE',
                setTree: 'SET_LISTPARAM_ELEMENT',
                setEngList: 'SET_ENGDATA_TREE',
                setListNewParam: 'SET_LIST_NEW_PARAM',
                setElemUpdate: 'SET_ELEMENTS_UPDATE'

            }),
            clear(number) {
                this.setListNewParam([])
                this.setEngData(null)
                this.setElements(null)
                this.setAutoEng(null)
                this.setTree(null)
                this.setEngList(null)
                this.setElemUpdate(null)
                this.cleanField = !this.cleanField
                this.searchData = {
                    paramList: [{
                        parameterNodeId: null,
                        parameterChildId: null,
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
                    parameterNodeId: null,
                    parameterChildId: null,
                    unitsFullName: '',
                    parameterNumber: ''
                });
                console.log(number)
            },
            mapTreeElem(treeElem) {
                treeElem.map(elem => {
                        if (elem.elementsCh.length === 0) {
                            delete elem.elementsCh
                        } else {
                            this.mapTreeElem(elem.elementsCh)
                        }
                    }
                )
            }
            ,
            async getAutoEnByNum(number) {
                this.GET_AUTO_BY_ENG(this.searchData);
                this.setListNewParam([])
                this.setEngData(null)
                this.setElements(null)
                this.setAutoEng(null)
                this.setTree(null)
                this.setEngList(null)
                this.setElemUpdate(null)
                if (this.SEARCHDATA.powerKwt != undefined) {
                    this.searchData.autoModel = this.SEARCHDATA.autoModel;
                    this.searchData.autoManufacturer = this.SEARCHDATA.autoManufacture;
                    this.searchData.produceYear = this.SEARCHDATA.produceYear;
                    this.searchData.powerKWt = this.SEARCHDATA.powerKwt;
                    this.searchData.engineType = this.SEARCHDATA.engineType;
                    this.searchData.fuelType = this.SEARCHDATA.fuelType;
                    this.searchData.engineCapacity = this.SEARCHDATA.engineCapacity;
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

            //request for data about the auto engine
            async submitChanges(dat) {
                // this.dataEng = [];
                // this.listParam = [];
                //   this.elements = [];

                this.setElements(null);
                if ((!Number.isInteger(Number(this.searchData.produceYear)) || (this.searchData.produceYear < 1885 || this.searchData.produceYear > 2020)) && !this.searchData.produceYear == 0) {
                    this.$message({
                        showClose: true,
                        message: this.$ml.get('word.inccYear'),
                        type: 'error'
                    });
                } else {
                    this.$emit('submit-function', this.searchData);
                    // this.GET_AUTOENG_BY_PARAM(this.searchData);

                    if (this.ENGDATA.status == null) {
                        if (this.ENGDATA.dataEng[0] == null) {
                            this.$message({
                                showClose: true,
                                message: this.$ml.get('word.noRecordsInDB'),
                                type: 'error'
                            });
                        }
                    } else {
                        this.$message({
                            showClose: true,
                            message: this.$ml.get('word.noRecordsInDB'),
                            type: 'error'
                        });
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