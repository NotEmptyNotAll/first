<template>
    <div>
        <ul class="nav nav-tabs" id="myTabengine" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="home-tabengine" data-toggle="tab" :href="'#h'+nameTitle"
                   v-on:click="cancelSave" @click="cancel"
                   role="tab" aria-controls="home" aria-selected="true">{{$ml.get('word.table')}}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="profile-tabengine" data-toggle="tab" :href="'#p'+nameTitle"
                   @click="cancel"
                   role="tab" aria-controls="profile" aria-selected="false">{{$ml.get('word.save')}}</a>
            </li>
            <li class="nav-item">
                <a  class="nav-link" id="contact-tabengine" ref="updateTab" data-toggle="tab"
                   :href="'#c'+nameTitle"
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
                    <div class="input-group col-md-5">
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
                <b-table class="my-table-scroll" no-border-collapse hover
                         @row-dblclicked="(item) => link( item)"
                         sticky-header="650px" :items="listForSearch.filter(elem=>{return elem.data!=='не задано'})" :fields="[
                { key: 'index', label:'№' },
                { key: 'data', label: $ml.get('word.name'), sortable: true },
                { key: 'status', label: $ml.get('word.status'), sortable: true }]">

                    <template v-slot:cell(index)="data">
                        {{ data.index + 1 }}
                    </template>
                </b-table>
                <!--  <table class="table table-hover  "
                         style="text-align: center; z-index: 0; border-radius: 0px">
                      <thead>
                      <tr>
                          <th scope="col">id</th>
                          <th scope="col">{{nameTitle}}</th>
                          <th scope="col" v-text="$ml.get('word.status')"></th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="current in listForSearch" v-bind:key="current" v-show="current.data!==''">
                          <td>{{current.id}}
                          </td>
                          <td>{{current.data}}
                          </td>
                          <td>{{current.status}}
                          </td>

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
                <div class=" row ">
                    <input-field
                            class="col-md-4"
                            :name-input="nameTitle"
                            :save-parameters="saveDataObj"
                            index="saveData"
                    />
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.status')"
                            :items="PARAM_NAME_AND_UNITS.status"
                            :update-obj="saveDataObj"
                            index="status"
                            :holderNum="dataList.find(elem=>elem.id===1).id"
                            :clean-search="cleanInputList"

                    />
                    <div class="col input-group  col-md-3">

                        <button v-if="!loadStatus && !LOAD_ADDITIONAL_DATA" type="submit" @click="save(1)"
                                class="btn  btn-outline-dark btn-block ">
                            <span>{{$ml.get('word.save')}}</span>
                        </button>
                        <button v-if="loadStatus || LOAD_ADDITIONAL_DATA" type="submit"
                                class="btn  btn-block btn-dark" disabled>
                            <span><div class="lds-dual-ring" style="position: relative; bottom: 1.2vh"></div></span>
                        </button>
                    </div>
                    <div class="  col-md-2">

                        <button type="submit" @click="cancelSave()"
                                class="btn  btn-outline-danger btn-block ">
                            <span>{{$ml.get('word.cancel')}}</span>
                        </button>
                    </div>
                </div>
                <hr/>
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
                <div class=" row ">
                    <div
                            class="col-md-1"
                    ></div>
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.dataChange')"
                            :items="dataList"
                            :update-obj="updateDataObj"
                            :clean-search="cleanInputList"
                            index="objToBeChanged"
                            :holderNum="tempUpdateObj.objToBeChanged!==0?dataList.find(elem=>elem.id===tempUpdateObj.objToBeChanged).id:0"
                    />
                    <input-field
                            class="col-md-4"
                            :name-input="nameTitle"
                            :save-parameters="updateDataObj"
                            index="updateData"
                    />
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.status')"
                            :items="PARAM_NAME_AND_UNITS.status"
                            :update-obj="updateDataObj"
                            index="status"
                            :clean-search="cleanInputList"
                            :holderNum="PARAM_NAME_AND_UNITS.status.find(elem=>elem.id===tempUpdateObj.status).id"

                    />

                    <div
                            class="col-md-1"
                    ></div>
                </div>
                <hr/>
                <div class="row">
                    <div class="col-md-3"></div>
                    <div class="  col-md-3">
                        <button type="submit" @click="cancel()"
                                class="btn  btn-outline-danger btn-block ">
                            <span>{{$ml.get('word.cancel')}}</span>
                        </button>
                    </div>
                    <div class="  col-md-3">
                        <button v-if="!loadStatus" type="submit" @click="update()"
                                class="btn  btn-outline-dark btn-block ">
                            <span>{{$ml.get('word.update')}}</span>
                        </button>
                        <button v-if="loadStatus" type="submit"
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
                            :show="dismissCountDownErrUpd"
                            dismissible
                            variant="danger"
                            @dismissed="dismissCountDownErrUpd=0"
                            @dismiss-count-down="countDownChangedErrUpd">
                        <p> {{$ml.get('msg.duplicateValue')}}</p>

                    </b-alert>
                    <b-alert
                            class="col-md-6"
                            :show="dismissCountDownSuccUpd"
                            dismissible
                            variant="success"
                            @dismissed="dismissCountDownSuccUpd=0"
                            @dismiss-count-down="countDownChangedSuccUpd">
                        <p> {{$ml.get('word.dataAddSuccess')}}</p>

                    </b-alert>
                    <div class="col-md-3"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import VueDatalist from "../input/vue-datalist";
    import InputField from "../input/input-field";


    export default {
        name: "save-update-panel",
        components: {InputField, VueDatalist},
        data: () => ({
            showErr: false,
            listForSearch: [],
            saveDataObj: {
                saveData: null,
                status: null
            },
            updateDataObj: {
                objToBeChanged: 0,
                updateData: null,
                status: 1
            },

            dismissSecsErr: 1.2,
            dismissCountDownErr: 0,
            dismissSecsSucc: 1.2,
            dismissCountDownSucc: 0,
            dismissSecsErrUpd: 1.2,
            dismissCountDownErrUpd: 0,
            dismissSecsSuccUpd:1.2,
            dismissCountDownSuccUpd: 0,
            showDismissibleAlert: false,
            tempUpdateObj: {
                objToBeChanged: 0,
                updateData: null,
                status: 1
            },
            cleanInputList: false,
            search: ''
        }),
        computed: {
            ...mapGetters([
                'PARAM_NAME_AND_UNITS',
                'LOAD_ADDITIONAL_DATA'
            ])
        },
        props: {
            nameTitle: String,
            dataList: null,
            loadStatus: null
        },
        methods: {
            ...mapActions([
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
            async clear() {
                this.search = '';
                this.filterResults();
            },
            onChange() {
                this.filterResults();
            }, filterResults() {
                // first uncapitalize all the things
                this.listForSearch = this.dataList.filter((item) => {
                    return item.data.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
                });
            },
            setDataList(tempList) {
                this.dataList = tempList;
            },
            cancel() {
                this.cleanInputList = !this.cleanInputList;
                this.updateDataObj.objToBeChanged = 1;
                this.updateDataObj.status = 1;
                this.updateDataObj.updateData = null;
                this.tempUpdateObj.objToBeChanged = 0
                console.log(1)
            },
            cancelSave() {
                this.cleanInputList = !this.cleanInputList;
                this.saveDataObj.saveData = null;
                this.saveDataObj.status = 1;
            },
            async save(number) {

                let temp = this.dataList.find(item =>
                    item.data === this.saveDataObj.saveData
                );
                if (temp === undefined) {
                    if (this.saveDataObj.saveData != null) {
                        if (this.saveDataObj.status === null) {
                            this.saveDataObj.status = 1;
                        }
                        this.$emit("save-data-api", this.saveDataObj);
                        this.showAlertSucc()
                       await setTimeout(() => console.log('1'), 1500);
                        this.GET_ALL_ADDITIONAL_DATA();
                    }

                } else {
                    this.showAlertErr()
                }
                console.log(number)
            },
            changeUpdateValue(number) {
                this.tempUpdateObj = this.updateDataObj;
                console.log(number)
            },
            async link(record) {

                this.$refs.updateTab.click();
                this.updateDataObj.objToBeChanged = record.id;
                this.tempUpdateObj.objToBeChanged = record.id;
                this.updateDataObj.updateData = record.data;

                console.log(1)
            },
            async update(number) {
                if (this.updateDataObj.objToBeChanged != null) {
                    if (this.updateDataObj.status === null) {
                        this.updateDataObj.status = 1;
                    }
                    await this.$emit("update-data-api", this.updateDataObj);
                    this.showAlertSuccUpd();
                    let temp = this.dataList.find(item => item.id === this.updateDataObj.objToBeChanged);
                    temp.status = this.PARAM_NAME_AND_UNITS.status.find(item => item.id === this.updateDataObj.status).data;
                    temp.data = this.updateDataObj.updateData;
                    this.listForSearch = this.dataList;
                }
                console.log(number)
            }

        },
        mounted() {
            this.listForSearch = this.dataList;
        },
        watch: {
            dataList: function (val) {
                if (val !== null || val !== undefined)
                    this.listForSearch = this.dataList;
            }
        }
    }
</script>

<style scoped>
    .my-table-scroll::-webkit-scrollbar {
        width: 0px;
    }

    .posCenter {
        padding-left: 50%;
        padding-right: 50%
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

    .title-bord {
        text-align: center;
        position: relative;
        right: 1vw;
        border-style: solid;
        border-color: lightgray;
        border-width: 0px 2px 0px 0px;
    }
</style>