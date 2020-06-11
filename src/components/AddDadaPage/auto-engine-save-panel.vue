<template>
    <div>
        <ul class="nav nav-tabs" id="myTabengine" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="home-tabengine" data-toggle="tab" :href="'#h'+nameTitle"

                   role="tab" aria-controls="home" aria-selected="true">{{$ml.get('word.table')}}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="profile-tabengine" data-toggle="tab" :href="'#p'+nameTitle"
                   @click="cancel"
                   role="tab" aria-controls="profile" aria-selected="false">{{$ml.get('word.save')}}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="contact-tabengine" ref="updateTab" data-toggle="tab" :href="'#c'+nameTitle"
                   role="tab" aria-controls="contact" aria-selected="false">{{$ml.get('word.update')}}</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContentengine" style="border: white">
            <div class="tab-pane fade show active" :id="'h'+nameTitle" role="tabpanel"
                 aria-labelledby="home-tab">
                <div class="row" style="padding-top: 3vh">
                    <div class="title-bord col-md-2">
                        <h4> {{nameTitle}}</h4>
                    </div>
                    <div class="col-md-5"></div>

                    <div class="input-group  col-md-5">
                        <div class="input-group-prepend ">
                            <label class="input-group-text bg-white  "
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
                <b-table class="my-table-scroll" no-border-collapse hover sticky-header="650px" :items="dataList"
                         @row-dblclicked="(item) => link( item)"
                         :fields="[
                { key: 'index', label:'№' },
                { key: 'engineFk', label: $ml.get('word.engine'), sortable: true },
                { key: 'autoManufactureFk', label: $ml.get('word.autoManufacturer'), sortable: true },
                { key: 'autoModelFk', label: $ml.get('word.autoModel'), sortable: true },
                { key: 'releaseYearFrom', label:$ml.get('word.releaseYearFrom'), sortable: true },
                { key: 'releaseYearBy', label: $ml.get('word.releaseYearBy'), sortable: true }]">
                    <template v-slot:cell(index)="data">
                        {{ data.index + 1 }}
                    </template>
                </b-table>
                <!-- <table class="fixed_headers table table-hover  "  style="text-align: center; z-index: 0; border-radius: 0px">
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
                     <tr v-for="current in dataList" v-bind:key="current" v-show="current.data!==''">
                         <td>{{current.id}}</td>
                         <td>{{current.engineFk}}</td>
                         <td>{{current.autoManufactureFk}}</td>
                         <td>{{current.autoModelFk}}</td>
                         <td>
                             <span v-if="current.releaseYearFrom!=null && current.releaseYearBy!=null"> {{current.releaseYearFrom+'-'+current.releaseYearBy}}</span>
                             <span v-else-if="current.releaseYearFrom!=null ">{{current.releaseYearFrom}}</span>
                             <span v-else-if="current.releaseYearBy!=null">{{current.releaseYearBy}}</span>
                             <span v-else-if="current.releaseYearFrom==null && current.releaseYearBy==null"></span>
                         </td>
                         <td >{{current.status}}</td>
                     </tr>
                     </tbody>
                 </table>-->
                <div v-if="LOAD_ADDITIONAL_DATA" class="lds-dual-ring-black" style="margin-left:47% "></div>
            </div>
            <div class="tab-pane fade" :id="'p'+nameTitle" role="tabpanel"
                 aria-labelledby="profile-tab">
                <br/>
                <div class="title-bord col-md-2">
                    <h4> {{nameTitle}}</h4>
                </div>
                <hr/>

                <div class="row ">
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
                            :clean-search="cleanInputList"


                    />
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.autoModel')"
                            :items="ADDITIONAL_DATA.autoModel"
                            :update-obj="saveDataObj"
                            index="autoModelFk"
                            :holder-num=0
                            :clean-search="cleanInputList"


                    />
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.autoManufacturer')"
                            :items="ADDITIONAL_DATA.autoManufacture"
                            :update-obj="saveDataObj"
                            index="autoManufactureFk"
                            :holder-num=0
                            :clean-search="cleanInputList"

                    />
                    <div class="input-group col-md-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text bg-white  " for="releaseYea">
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
                <div class=" row">
                    <div class="col-md-3"></div>
                    <div class="  col-md-3">

                        <button type="submit" @click="cancel"
                                class="btn  btn-outline-danger btn-block ">
                            <span>{{$ml.get('word.cancel')}}</span>
                        </button>
                    </div>
                    <div class="col-md-3">

                        <button v-if="!loadStatus && !LOAD_ADDITIONAL_DATA" type="submit" @click="saveEngManufacture(1)"
                                class="btn btn-outline-dark btn-block">
                            <span>{{$ml.get('word.save')}}</span>
                        </button>
                        <button v-if="loadStatus || LOAD_ADDITIONAL_DATA" type="submit"
                                class="btn  btn-block btn-dark" disabled>
                            <span><div class="lds-dual-ring" style="position: relative; bottom: 1.2vh"></div></span>
                        </button>
                    </div>
                    <div class="col-md-3"></div>
                </div>
                <div class=" row ">

                    <div class="col-md-3"></div>

                    <b-alert
                            class="col-md-6"
                            :show="dismissCountDownErr"
                            dismissible
                            variant="danger"
                            @dismissed="dismissCountDownErr=0"
                            @dismiss-count-down="countDownChangedErr"
                    >
                        <p> {{$ml.get('msg.duplicateValue')}}</p>

                    </b-alert>

                    <b-alert
                            class="col-md-6"
                            :show="dismissCountDownSucc"
                            dismissible
                            variant="success"
                            @dismissed="dismissCountDownSucc=0"
                            @dismiss-count-down="countDownChangedSucc"
                    >
                        <p> {{$ml.get('word.dataAddSuccess')}}</p>
                    </b-alert>
                    <div class="col-md-3"></div>

                </div>

            </div>
            <div class="tab-pane fade" :id="'c'+nameTitle" role="tabpanel"
                 aria-labelledby="contact-tab">
                <br/>

                <div class="title-bord col-md-2">
                    <h4> {{nameTitle}}</h4>
                </div>
                <hr/>
                <div class="row" style="position: relative; left: 1vw">
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
                                    :holder-num="current.autoManufactureFk"
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
                                    :holder-num="current.autoModelFk"
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
                                    :holder-num="current.engineFk"
                            />
                        </td>
                        <td v-if="!current.editRow">{{current.releaseYearFrom}}</td>
                        <td v-if="current.editRow">
                            <input max="2020" min="1895" :placeholder="current.releaseYearFrom" type="number" class="form-control" v-model="current.releaseYearFrom">
                        </td>
                        <td v-if="!current.editRow">{{current.releaseYearBy}}</td>
                        <td v-if="current.editRow">
                            <input max="2020" min="1895" :placeholder="current.releaseYearBy" type="number" class="form-control" v-model="current.releaseYearBy">
                        </td>
                        <td>
                            <button type="button " v-if="!current.editRow"
                                    class="btn btn-group  btn-warning"
                                    @click="current.editRow=!current.editRow"
                            >
                                <span>
                                    <b-icon icon="pencil"></b-icon>
                                </span>
                            </button>
                            <button v-if="current.editRow"
                                    type="button"
                                    class="btn  btn-success "
                                    @click="current.editRow=!current.editRow"
                                    v-on:click="updateOldParam(current)"
                            >
                                <span>
                                    <p class="h5 mb-2"><b-icon icon="check"></b-icon></p>
                                </span>
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
                <hr style="position:center;width:50% "/>
                <div style="margin-left: 40%; width: 20%;margin-right: 40%;">
                    <button v-if="!loadStatus && AUTO_ENGINE.length>0"
                            type="submit"
                            class="btn  btn-block btn-outline-dark"
                            @click="update(1)"
                            v-text="$ml.get('word.update')"
                    >

                        <span></span>
                    </button>

                    <button v-if="loadStatus && AUTO_ENGINE.length>0" type="submit"
                            class="btn  btn-block btn-dark" disabled>
                        <span><div class="lds-dual-ring" style="position: relative; bottom: 1.2vh"></div></span>

                    </button>
                </div>
                <div class=" row ">

                    <div class="col-md-3"></div>

                    <b-alert
                            class="col-md-6"
                            :show="dismissCountDownSuccUpd"
                            dismissible
                            variant="success"
                            @dismissed="dismissCountDownSuccUpd=0"
                            @dismiss-count-down="countDownChangedSuccUpd"
                    >
                        <p> {{$ml.get('word.dataAddSuccess')}}</p>

                    </b-alert>
                    <div class="col-md-3"></div>

                </div>
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
        components: {SearchEnginePanel, VueDatalist},
        data: () => ({
            showErr: false,
            saveDataEngParam: {
                saveData: null
            },
            listForSearch: [],
            updateListParam: [],
            saveDataObj: {
                status: 1,
                engineFk: null,
                autoModelFk: null,
                autoManufactureFk: null,
                releaseYearFrom: null,
                releaseYearBy: null,
            },
            dismissSecsErr: 1.2,
            dismissCountDownErr: 0,
            dismissSecsSucc: 1.2,
            dismissCountDownSucc: 0,
            dismissSecsErrUpd: 1.2,
            dismissCountDownErrUpd: 0,
            dismissSecsSuccUpd: 1.2,
            dismissCountDownSuccUpd: 0,
            showDismissibleAlert: false,
            mainDataList: null,
            search: '',
            updateDataObj: {
                status: 1,
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
            cleanInputList: false,
            tempObj: null
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
                'AUTO_ENGINE_LOAD',
                'AUTO_ENGINE',
                'LOAD_SAVE_AUTOMOBILE_ENGINE',
                'LOAD_ADDITIONAL_DATA',
                'PARAM_NAME_AND_UNITS'

            ])
        },
        methods: {
            ...mapActions([
                'GET_AUTOENG_BY_ID',
                'SAVE_DATA_AUTOMOBILE_ENGINE',
                'GET_AUTOENG_BY_PARAM_UPDATE',
                'SAVE_DATA_ENGINE_NUMBER',
                'UPDATE_AUTO_ENGINE',
                'GET_ALL_ADDITIONAL_DATA'

            ]),
            countDownChangedErr(dismissCountDown) {
                this.dismissCountDownErr = dismissCountDown
            },
            countDownChangedSucc(dismissCountDown) {
                this.dismissCountDownSucc = dismissCountDown
            },
            countDownChangedSuccUpd(dismissCountDown) {
                this.dismissCountDownSuccUpd = dismissCountDown
            },
            countDownChangedErrUpd(dismissCountDown) {
                this.dismissCountDownErrUpd = dismissCountDown
            },
            showAlertErr() {
                this.dismissCountDownErr = this.dismissSecsErr
            },
            showAlertSucc() {
                this.dismissCountDownSucc = this.dismissSecsSucc
            },
            showAlertSuccUpd() {
                this.dismissCountDownSuccUpd = this.dismissSecsSuccUpd
            },
            showAlertErrUpd() {
                this.dismissCountDownErrUpd = this.dismissSecsErrUpd
            },
            setDataList(tempList) {
                this.dataList = tempList;
            },
            async clear() {
                this.cleanInputList = !this.cleanInputList;
                this.search = '';
                this.filterResults();
            },
            cancel() {
                this.cleanInputList = !this.cleanInputList;
                this.saveDataObj.releaseYearFrom = '';
                this.saveDataObj.releaseYearBy = '';
            },
            onChange() {
                this.filterResults();


            }, filterResults() {
                if (this.mainDataList === undefined) {
                    this.mainDataList = this.ADDITIONAL_DATA.autoEng;
                }
                // first uncapitalize all the things
                this.dataList = this.mainDataList.filter((item) => {
                    return ((item.engineFk.toLowerCase().indexOf(this.search.toLowerCase()) > -1) ||
                        (item.autoManufactureFk.toLowerCase().indexOf(this.search.toLowerCase()) > -1) ||
                        (item.autoModelFk.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
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
                    await this.SAVE_DATA_AUTOMOBILE_ENGINE(this.saveDataObj)
                    this.showAlertSucc()
                    this.GET_ALL_ADDITIONAL_DATA()
                } else {
                    this.showAlertErr()
                }
                //  this.SAVE_DATA_ENGINE_NUMBER(this.saveDataEngParam);
                console.log(number)
            },
            async update(number) {
                this.dataList = this.mainDataList;

                await this.UPDATE_AUTO_ENGINE(this.updateListParam);
                this.updateListParam.forEach(elem => {
                    let temp = this.dataList.find(item => item.id === elem.id);
                    temp.status = this.PARAM_NAME_AND_UNITS.status.find(item => item.id === elem.status).data;
                    temp.autoManufactureFk = this.ADDITIONAL_DATA.autoManufacture.find(item => item.id === elem.autoManufactureFk).data;
                    temp.engineFk = this.ADDITIONAL_DATA.engine.find(item => item.id === elem.engineFk).data;
                    temp.releaseYearFrom = elem.releaseYearFrom;
                    temp.releaseYearBy = elem.releaseYearBy;
                    temp.autoModelFk = this.ADDITIONAL_DATA.autoModel.find(item => item.id === elem.autoModelFk).data;
                });

                this.updateListParam = [];
                //  this.SAVE_DATA_ENGINE_NUMBER(this.saveDataEngParam);
                console.log(number)
            },
            async link(record) {
                this.$refs.updateTab.click();
                this.GET_AUTOENG_BY_ID({id: record.id});
                console.log(1)
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
                    tempObj.status = 2;
                } else {
                    this.updateListParam.push({
                        id: current.id,
                        elemId: current.elemId,
                        autoManufactureFk: current.autoManufactureFk,
                        engineFk: current.engineFk,
                        autoModelFk: current.autoModelFk,
                        releaseYearFrom: current.releaseYearFrom,
                        releaseYearBy: current.releaseYearBy,
                        editRow: current.editRow,
                        status: 2
                    });
                }
                console.log(1)
            }
        },
        watch: {},
        mounted() {
            this.mainDataList = this.ADDITIONAL_DATA.autoEng
            this.test()
        }
    }
</script>

<style scoped>
    .my-table-scroll::-webkit-scrollbar {
        width: 0px;
    }

    .title-bord {
        text-align: center;
        position: relative;
        right: 1vw;
        border-style: solid;
        border-color: lightgray;
        border-width: 0px 2px 0px 0px;
    }

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