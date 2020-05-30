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
                <div class="row">
                    <div class="col-md-7"></div>
                    <div class="input-group col-md-5">
                        <div class="input-group-prepend ">
                            <label class="input-group-text   "
                                   for="vue-list-input1"
                            >{{$ml.get('word.search')}}</label>
                        </div>
                        <input
                                v-model="search"
                                id="vue-list-input1"
                                autocomplete="off"
                                class="form-control"
                                type="text"
                                placeholder=" "
                                v-on:input="onChange"
                                v-on:click="onChange"

                        />
                        <div class="input-group-append">
                            <button class="btn btn-outline-danger"
                                    v-on:click="clear"
                                    type="button">
                                <span>&#10008;</span>
                            </button>
                        </div>

                    </div>
                </div>
                <table class="table table-hover  " style="text-align: center; z-index: 0; border-radius: 0px">
                    <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">{{$ml.get('word.engine')}}</th>
                        <th scope="col" v-text="$ml.get('word.autoManufacturer')"></th>
                        <th scope="col" v-text="$ml.get('word.autoModel')"></th>
                        <th scope="col" v-text="$ml.get('word.releaseYear')"></th>
                        <th scope="col" v-text="$ml.get('word.status')"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="current in dataList" v-bind:key="current">
                        <td>{{current.id}}</td>
                        <td>{{current.engineFk}}</td>
                        <td>{{current.autoManufactureFk}}</td>
                        <td>{{current.autoModelFk}}</td>
                        <td v-if="current.releaseYearFrom!=null && current.releaseYearBy!=null">
                            {{current.releaseYearFrom+'-'+current.releaseYearBy}}
                        </td>
                        <td v-if="current.releaseYearFrom!=null ">{{current.releaseYearFrom}}</td>
                        <td v-if="current.releaseYearBy!=null">{{current.releaseYearFrom}}</td>
                        <td v-if="current.releaseYearFrom==null && current.releaseYearBy==null"></td>
                        <td>{{current.status}}</td>
                    </tr>
                    </tbody>
                </table>

            </div>
            <div class="tab-pane fade" :id="'p'+nameTitle" role="tabpanel"
                 aria-labelledby="profile-tab">

                <div class="savePageRow row ">
                    <div v-if="showErr" class="alert alert-danger" role="alert" style="text-align:center; width: 100%">
                        {{$ml.get('msg.duplicateValue')}}
                    </div>

                </div>
                <div class=" savePageRow row">
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
                            <label class="input-group-text  text-white bg-dark" for="releaseYea">
                                {{$ml.get('word.releaseYear')}}
                                <div v-if="LOADPARAM" class="lds-dual-ring"></div>
                            </label>
                        </div>
                        <input id="releaseYea"
                               min="1885" max="2020"
                               v-model="saveDataObj.releaseYearFrom"
                               autocomplete="on" type="number"
                               step="1"
                               class="form-control"
                               :placeholder="$ml.get('word.from')"
                               aria-describedby="button-addon1">
                        <input id="fuelTk" type="number"
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
                <div class="savePageRow row">
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
            <div class="tab-pane fade" :id="'c'+nameTitle" role="tabpanel"
                 aria-labelledby="contact-tab">
                <br/>
                <br/>
                <div class="savePageRow">
                    <search-engine-panel class="col-md-12"
                                         @submit-function="GET_AUTOENG_BY_PARAM_UPDATE"
                                         style="position: relative;right: 1vw; width: 75vw "
                    />
                    <br/></div>
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
                <hr/>
                <span v-if="loadStatus"><div class="lds-dual-ring-black posCenter"></div></span>

            </div>
        </div>
    </div>

</template>

<script>
    import SearchEnginePanel from "../SearchPage/search-engine-panel";
    import VueDatalist from "../input/vue-datalist";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "auto-engine-save-panel",
        components: { SearchEnginePanel, VueDatalist},
        data: () => ({
            showErr: false,
            saveDataEngParam: {
                saveData: null
            },
            listForSearch: [],
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
            setDataList(tempList) {
                this.dataList = tempList;
            },
            async clear() {
                this.search = '';
                this.filterResults();
            },
            onChange() {
                this.filterResults();


            }, filterResults() {
                // first uncapitalize all the things
                this.dataList = this.ADDITIONAL_DATA.autoEng.filter((item) => {
                    return ( (item.engineFk.toLowerCase().indexOf(this.search.toLowerCase()) > -1) ||
                        (item.autoManufactureFk.toLowerCase().indexOf(this.search.toLowerCase()) > -1) ||
                        ( item.autoModelFk.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
                    );
                });
                this.$emit("set-list", this.temp);

            },
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

<style scoped>

    a {
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