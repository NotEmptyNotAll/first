<template>
    <div>
        <ul class="nav nav-tabs" id="myTabengine" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="home-tabengine" data-toggle="tab" :href="'#h'+nameTitle"
                   v-on:click="cancelsave" @click="cancel"
                   role="tab" aria-controls="home" aria-selected="true">{{$ml.get('word.table')}}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="profile-tabengine" data-toggle="tab" :href="'#p'+nameTitle"
                   @click="cancel"

                   role="tab" aria-controls="profile" aria-selected="false">{{$ml.get('word.save')}}</a>
            </li>
            <li class="nav-item">
                <a
                        class="nav-link" id="contact-tabengine" ref="updateTab" data-toggle="tab" :href="'#c'+nameTitle"
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
                            <label class="input-group-text  bg-white "
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
                         sticky-header="650px" :items="dataList"
                         @row-dblclicked="(item) => link( item)"
                         :fields="[{ key: 'index', label:'№' },
                { key: 'data', label: $ml.get('word.engine'), sortable: true },
                { key: 'engineManufacturer', label: $ml.get('word.engineManufacture'), sortable: true },
                { key: 'cylindersPlacement', label: $ml.get('word.cylinders'), sortable: true },
                { key: 'fuelType', label: $ml.get('word.fuelType'), sortable: true },
                { key: 'powerKwt', label:$ml.get('word.powerKwt'), sortable: true },
                { key: 'engineCapacity', label: $ml.get('word.engineCapacity'), sortable: true },
                { key: 'flapNumber', label: $ml.get('word.flapNumber'), sortable: true },
                { key: 'cylindersNumber', label:$ml.get('word.cylindersNumber'), sortable: true },
                { key: 'horsepower', label: $ml.get('word.horsepower'), sortable: true },
                { key: 'superchargedType', label: $ml.get('word.superchargedType'), sortable: true },
                { key: 'releaseYearFrom', label: $ml.get('word.releaseYearFrom'), sortable: true },
                { key: 'releaseYearBy', label: $ml.get('word.releaseYearBy'), sortable: true },
                { key: 'status', label: $ml.get('word.status'), sortable: true }]">

                    <template v-slot:cell(index)="data">
                        {{ data.index + 1 }}
                    </template>

                </b-table>

                <!--<table responseive  class="table table-hover  " style="text-align: center; z-index: 0; border-radius: 0px; ">
                <thead >
                <tr>
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
                <tr v-for="current in dataList" v-bind:key="current" v-show="current.data!==''">
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
                    <td>
                        <span v-if="current.releaseYearFrom!=null && current.releaseYearBy!=null"> {{current.releaseYearFrom+'-'+current.releaseYearBy}}</span>
                        <span v-else-if="current.releaseYearFrom!=null ">{{current.releaseYearFrom}}</span>
                        <span v-else-if="current.releaseYearBy!=null">{{current.releaseYearBy}}</span>
                        <span v-else-if="current.releaseYearFrom==null && current.releaseYearBy==null"></span>
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
                <div class="savePageRow  row ">
                    <div v-if="showErr" class="alert alert-danger" role="alert" style="text-align:center; width: 100%">
                        {{$ml.get('msg.duplicateValue')}}
                    </div>

                </div>
                <div class=" row ">
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
                <div class=" row ">
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
                <div class="  row ">
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
                <div class=" row">
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
                            <label class="input-group-text bg-white  " for="relYear">
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
                <div class=" row ">
                    <div class="col-md-3">
                    </div>
                    <div class="  col-md-3">

                        <button type="submit" @click="cancelsave()"
                                class="btn  btn-outline-danger btn-block ">
                            <span>{{$ml.get('word.cancel')}}</span>
                        </button>
                    </div>
                    <div class="col-md-3">
                        <button v-if="!loadStatus && !LOAD_ADDITIONAL_DATA" type="submit" @click="saveEngManufacture(1)"
                                class="btn btn-outline-dark btn-block ">
                            <span>{{$ml.get('word.save')}}</span>
                        </button>
                        <button v-if="loadStatus || LOAD_ADDITIONAL_DATA" type="submit"
                                class="btn  btn-block btn-dark" disabled>
                            <span><div class="lds-dual-ring" style="position: relative; bottom: 1.2vh"></div></span>
                        </button>
                    </div>

                    <div class="col-md-3"></div>
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
                        <p> {{$ml.get('msg.dataAddSuccess')}}</p>

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
                <div class=" row">
                    <vue-datalist
                            class="col-md-6"
                            :title-input="$ml.get('word.changeTypeOfEngine')"
                            :items="ADDITIONAL_DATA.engine"
                            :update-obj="updateDataObj"
                            index="objToBeChanged"
                            :holder-num=0
                            :show-title="false"

                    />
                    <div class="col-md-2">
                        <button v-if="!loadStatus"
                                type="submit"
                                class="btn btn-outline-dark btn-block "
                                @click="getEng(1)"
                        >
                            <span>{{$ml.get('word.choose')}}</span>
                        </button>
                        <button v-if="loadStatus" type="submit"
                                class="btn  btn-block btn-dark" disabled>
                            <span><div class="lds-dual-ring" style="position: relative; bottom: 1.2vh"></div></span>
                        </button>

                    </div>
                    <div class="col-md-2">
                        <button v-if="loadStatus" type="submit"
                                class="btn  btn-block btn-dark" disabled>
                            <span><div class="lds-dual-ring" style="position: relative; bottom: 1.2vh"></div></span>
                        </button>
                        <button v-if="!loadStatus" type="submit" @click="update(1)"
                                class="btn  btn-block btn-outline-dark">
                            <span>{{$ml.get('word.update')}}</span>
                        </button>
                    </div>
                    <div class="  col-md-2">

                        <button type="submit" @click="cancel()"
                                class="btn  btn-outline-danger btn-block ">
                            <span>{{$ml.get('word.cancel')}}</span>
                        </button>
                    </div>
                </div>
                <hr style="color: lightgray"/>
                <div class=" row">
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
                            :holderNum="tempData.cylindersPlacementFk"
                            index="cylindersPlacementFk"
                            :clean-search="cleanInputList"

                    />
                    <vue-datalist
                            class="col-md-4"
                            :title-input="$ml.get('word.engineManufacture')"
                            :items="ADDITIONAL_DATA.engineManufacture"
                            :update-obj="updateDataObj"
                            :holderNum="tempData.engineManufacturerFk"
                            index="engineManufacturerFk"
                            :clean-search="cleanInputList"
                    />

                </div>
                <div class=" row">
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.fuelType')"
                            :items="ADDITIONAL_DATA.fuelType"
                            :update-obj="updateDataObj"
                            :holderNum="tempData.fuelTypeFk"
                            index="fuelTypeFk"
                            :clean-search="cleanInputList"
                    />
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.superchargedType')"
                            :items="ADDITIONAL_DATA.superchargeType"
                            :update-obj="updateDataObj"
                            :holderNum="tempData.superchargedTypeFk"
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
                <div class=" row">
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
                <div class=" row">
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
                            <label class="input-group-text  bg-white " for="releaseYear">
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
    import VueDatalist from "../input/vue-datalist";
    import InputField from "../input/input-field";
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import {MLBuilder} from 'vue-multilanguage'

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
                horsepower: null,
                status: null
            },
            tempData: {
                engineType: null,
                engineManufacturerFk: 0,
                cylindersPlacementFk: 0,
                fuelTypeFk: 0,
                superchargedTypeFk: 0,
                cylindersNumber: null,
                flapNumber: null,
                pistonDiameter: null,
                pistonStroke: null,
                engineCapacity: null,
                powerKwt: null,
                degreeCompression: null,
                releaseYearFrom: null,
                releaseYearBy: null,
                horsepower: null,
                status: null
            },
            mainDataList: null,
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
                horsepower: null,
                status: null
            },
            search: '',
            test: null,
            dismissSecsErr: 1.2,
            dismissCountDownErr: 0,
            dismissSecsSucc: 1.2,
            dismissCountDownSucc: 0,
            dismissSecsErrUpd: 1.2,
            dismissCountDownErrUpd: 0,
            dismissSecsSuccUpd: 1.2,
            dismissCountDownSuccUpd: 0,
            showDismissibleAlert: false,
            cleanInputList: false
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
                'ENGINE',
                'LOAD_ADDITIONAL_DATA'
            ]),
            mlmyMessage: function () {
                return new MLBuilder('word.superchargedType')
            }
        },
        methods: {
            ...mapActions([
                'GET_ENG',
                'GET_ALL_ADDITIONAL_DATA'
            ]),
            ...mapMutations({
                cylindersPlacementFk: 'SET_UPDATE_CYLINDERS'
            }),
            async clear() {
                this.search = '';
                this.filterResults();
            },
            countDownChangedErr(dismissCountDown) {
                this.dismissCountDownErr = dismissCountDown
            },
            countDownChangedSucc(dismissCountDown) {
                this.dismissCountDownSucc = dismissCountDown
            },
            countDownChangedSuccUpd(dismissCountDown) {
                this.dismissCountDownSuccUpd = dismissCountDown
            },
            showAlertErr() {
                this.dismissCountDownErr = this.dismissSecsErr
            },
            showAlertSucc() {
                this.dismissCountDownSucc = this.dismissSecsSucc
            },
            showAlertSuccUpd() {
                this.dismissCountDownSuccUpd = this.dismissSecsSucc
            },
            onChange() {
                this.filterResults();
            }, filterResults() {
                if (this.mainDataList === null) {
                    this.mainDataList = this.ADDITIONAL_DATA.engine;
                }
                // first uncapitalize all the things
                this.dataList = this.mainDataList.filter((item) => {

                    return item.data.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
                        item.cylindersPlacement.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
                        item.engineManufacturer.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
                        item.superchargedType.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
                        item.fuelType.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                });
            },
            setDataList(tempList) {
                this.dataList = tempList;
            },
            cancelsave() {
                this.cleanInputList = !this.cleanInputList;
                this.saveDataObj.engineType = null
                this.saveDataObj.engineManufacturerFk = null
                this.saveDataObj.cylindersPlacementFk = null
                this.saveDataObj.fuelTypeFk = null
                this.saveDataObj.superchargedTypeFk = null
                this.saveDataObj.cylindersNumber = null
                this.saveDataObj.flapNumber = null
                this.saveDataObj.pistonDiameter = null
                this.saveDataObj.pistonStroke = null
                this.saveDataObj.engineCapacity = null
                this.saveDataObj.powerKwt = null
                this.saveDataObj.degreeCompression = null
                this.saveDataObj.releaseYearFrom = null
                this.saveDataObj.releaseYearBy = null
                this.saveDataObj.horsepower = null
            },
            cancel() {
                this.tempData = {
                    engineType: null,
                    engineManufacturerFk: 0,
                    cylindersPlacementFk: 0,
                    fuelTypeFk: 0,
                    superchargedTypeFk: 0,
                    cylindersNumber: null,
                    flapNumber: null,
                    pistonDiameter: null,
                    pistonStroke: null,
                    engineCapacity: null,
                    powerKwt: null,
                    degreeCompression: null,
                    releaseYearFrom: null,
                    releaseYearBy: null,
                    horsepower: null,
                    status: null
                }
                this.cleanInputList = !this.cleanInputList;
                this.updateDataObj.objToBeChanged = this.tempData.id
                this.updateDataObj.engineType = this.tempData.engineType
                this.updateDataObj.engineManufacturerFk = this.tempData.engineManufacturerFk
                this.updateDataObj.cylindersPlacementFk = this.tempData.cylindersPlacementFk
                this.updateDataObj.fuelTypeFk = this.tempData.fuelTypeFk
                this.updateDataObj.superchargedTypeFk = this.tempData.superchargedTypeFk
                this.updateDataObj.cylindersNumber = this.tempData.cylindersNumber
                this.updateDataObj.flapNumber = this.tempData.flapNumber
                this.updateDataObj.pistonDiameter = this.tempData.pistonDiameter
                this.updateDataObj.pistonStroke = this.tempData.pistonStroke
                this.updateDataObj.engineCapacity = this.tempData.engineCapacity
                this.updateDataObj.powerKwt = this.tempData.powerKwt
                this.updateDataObj.degreeCompression = this.tempData.degreeCompression
                this.updateDataObj.releaseYearFrom = this.tempData.releaseYearFrom
                this.updateDataObj.releaseYearBy = this.tempData.releaseYearBy
                this.updateDataObj.horsepower = this.tempData.horsepower
            },
            autocompliteResult() {
                alert(this.$refs.autocomplete.data.value);
            },
            test(id) {
                alert(id)
            },
            async link(record) {
                this.$refs.updateTab.click();
                await this.GET_ENG({id: record.id});
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
                console.log(1)
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
                    if (this.saveDataObj.status === null) {
                        this.saveDataObj.status = 2;
                    }
                    await this.$emit("save-data-api", this.saveDataObj)
                    this.showAlertSucc()
                    this.GET_ALL_ADDITIONAL_DATA();

                } else {
                    this.showAlertErr()

                }
                console.log(number)
            },
            async update(number) {
                if (this.updateDataObj.status === null) {
                    this.updateDataObj.status = this.tempData.status;
                }
                this.dataList = this.ADDITIONAL_DATA.engine;
                let temp = this.dataList.find(item => item.id === this.updateDataObj.objToBeChanged);
                temp.data = this.updateDataObj.engineType
                temp.engineManufacturer = this.updateDataObj.engineManufacturerFk !== 0 ? this.ADDITIONAL_DATA.engineManufacture.find(item => item.id === this.updateDataObj.engineManufacturerFk).data : "не задано";
                temp.cylindersPlacement = this.updateDataObj.cylindersPlacementFk !== 100 ? this.ADDITIONAL_DATA.cylinders.find(item => item.id === this.updateDataObj.cylindersPlacementFk).data : "не задано";
                temp.fuelType = this.updateDataObj.fuelTypeFk !== 0 ? this.ADDITIONAL_DATA.fuelType.find(item => item.id === this.updateDataObj.fuelTypeFk).data : "не задано";
                temp.superchargedType = this.updateDataObj.superchargedType !== 0 ? this.ADDITIONAL_DATA.superchargeType.find(item => item.id === this.updateDataObj.superchargedTypeFk).data : "не задано";
                temp.cylindersNumber = this.updateDataObj.cylindersNumber
                temp.flapNumber = this.updateDataObj.flapNumber
                temp.pistonDiameter = this.updateDataObj.pistonDiameter
                temp.pistonStroke = this.updateDataObj.pistonStroke
                temp.engineCapacity = this.updateDataObj.engineCapacity
                temp.powerKwt = this.updateDataObj.powerKwt
                temp.degreeCompression = this.updateDataObj.degreeCompression
                temp.releaseYearFrom = this.updateDataObj.releaseYearFrom
                temp.releaseYearBy = this.updateDataObj.releaseYearBy
                temp.horsepower = this.updateDataObj.horsepower
                this.$emit("update-data-api", this.updateDataObj)
                this.showAlertSuccUpd()
                console.log(number)
            }
        },
        watch: {},
        mounted() {
            this.GET_ALL_PARAM_NAME();

        }
    }
</script>

<style scoped>
    .my-table-scroll::-webkit-scrollbar {
        width: 0px;
    }

    a {
        padding-left: 3vw;
        padding-right: 3vw;
        color: #272e38;
        font-weight: bold;
    }

    .title-bord {
        text-align: center;
        position: relative;
        right: 1vw;
        border-style: solid;
        border-color: lightgray;
        border-width: 0px 2px 0px 0px;
    }

    .savePageRow {
        max-width: 75vw;
        min-width: 75vw;
    }
</style>