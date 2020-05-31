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
                <table class="table table-hover  "
                       style="text-align: center; z-index: 0; border-radius: 0px">
                    <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">{{$ml.get('word.name')}}</th>
                        <th scope="col">{{$ml.get('word.shortName')}}</th>
                        <th scope="col" v-text="$ml.get('word.status')"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="current in listForSearch" v-bind:key="current" v-show="current.data!==''">
                        <td>{{current.id}}
                        </td>
                        <td>{{current.data}}
                        </td>
                        <td>{{current.secondary_data}}
                        </td>
                        <td>{{current.status}}
                        </td>

                    </tr>
                    </tbody>
                </table>
                <div v-if="LOAD_ADDITIONAL_DATA" class="lds-dual-ring-black" style="margin-left:47% "></div>


            </div>
            <div class="tab-pane fade" :id="'p'+nameTitle" role="tabpanel"
                 aria-labelledby="profile-tab">
                <br/>
                <br/>
                <div class="savePageRow row ">
                    <input-field
                            class="col-md-3"
                            :name-input="nameTitle"
                            :save-parameters="saveDataObj"
                            index="saveData_primary"
                    />
                    <input-field
                            class="col-md-3"
                            :name-input="$ml.get('word.shortName')"
                            :save-parameters="saveDataObj"
                            index="saveData_secondary"
                    />
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.status')"
                            :items="PARAM_NAME_AND_UNITS.status"
                            :update-obj="saveDataObj"
                            index="status"
                            :holderNum="dataList.find(elem=>elem.id===1).id"

                    />
                    <div class="col-md-3">
                        <button v-if="!loadStatus" type="submit" @click="saveEngManufacture(1)"
                                class="btn btn-outline-dark btn-block ">
                            <span>{{$ml.get('word.save')}}</span>
                        </button>
                        <button v-if="loadStatus" type="submit"
                                class="btn  btn-block btn-dark" disabled>
                            <span><div class="lds-dual-ring" style="position: relative; bottom: 1.2vh"></div></span>
                        </button>
                    </div>
                </div>
                <hr/>
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
                <div class="savePageRow row ">
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.data')"
                            :items="dataList"
                            :update-obj="updateDataObj"
                            index="objToBeChanged"
                            :hide-title="true"
                            :holder-num=0

                    />
                    <input-field
                            class="col-md-3"
                            :name-input="nameTitle"
                            :save-parameters="updateDataObj"
                            index="saveData_primary"
                    />
                    <input-field
                            class="col-md-3"
                            :name-input="$ml.get('word.shortName')"
                            :save-parameters="updateDataObj"
                            index="saveData_secondary"
                    />
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.status')"
                            :items="PARAM_NAME_AND_UNITS.status"
                            :update-obj="updateDataObj"
                            index="status"
                            :holderNum="dataList.find(elem=>elem.id===1).id"

                    />
                </div>
                <hr style="position: center; width: 70%"/>
                <div class="savePageRow row ">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                        <button v-if="!loadStatus" type="submit" @click="update(1)"
                                class="btn  btn-block btn-outline-dark">
                            <span>{{$ml.get('word.update')}}</span>
                        </button>
                        <button v-if="loadStatus" type="submit"
                                class="btn  btn-block btn-dark" disabled>
                            <span><div class="lds-dual-ring" style="position: relative; bottom: 1.2vh"></div></span>
                        </button>
                    </div>
                    <div class="col-md-4"></div>

                </div>
                <hr/>

            </div>
        </div>
    </div>

</template>

<script>
    import VueDatalist from "../input/vue-datalist";
    import {mapActions, mapGetters} from "vuex";
    import InputField from "../input/input-field";

    export default {
        name: "two-update-panel",
        components: {InputField, VueDatalist},
        data: () => ({
            showErr: null,
            listForSearch: [],
            saveDataObj: {
                saveData_primary: null,
                saveData_secondary: null,
                status: null
            },
            updateDataObj: {
                objToBeChanged: null,
                saveData_primary: null,
                saveData_secondary: null,
                status: null
            },
            search:''
        }),
        props: {
            nameTitle: String,
            listParamTwo: null,
            listParamOnSave: Boolean,
            namePanel: String,
            dataList: null,
            loadStatus: null,
            title_one: String,
            title_two: String
        },
        computed: {
            ...mapGetters([
                'PARAM_NAME_AND_UNITS',
                'LOAD_ADDITIONAL_DATA'

            ])
        },
        methods: {
            ...mapActions([
                'GET_ALL_ADDITIONAL_DATA',
                'GET_PARAM_NAME'
            ]),
            async clear() {
                this.search = '';
                this.filterResults();
            },
            onChange() {
                this.filterResults();
            },
            filterResults() {
                // first uncapitalize all the things
                this.listForSearch = this.dataList.filter((item) => {
                    return (item.data.toLowerCase().indexOf(this.search.toLowerCase()) > -1) || (item.secondary_data.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
                });
            },
            setDataList(tempList) {
                this.dataList = tempList;
            },
            async saveEngManufacture(number) {
                let temp = this.dataList.find(item =>
                    item.data === this.saveDataObj.saveData_primary
                );
                if (temp === undefined) {
                    if (this.saveDataObj.saveData_primary != null) {
                        if (this.saveDataObj.status === null) {
                            this.saveDataObj.status = 1;
                        }
                        await this.$emit("save-data-api", this.saveDataObj);
                        this.GET_ALL_ADDITIONAL_DATA();
                        this.GET_PARAM_NAME();
                    }
                } else {
                    this.showErr = true;
                }
                console.log(number)
            },
            async update(number) {
                if (this.updateDataObj.objToBeChanged != null) {
                    if (this.updateDataObj.status === null) {
                        this.updateDataObj.status = 1;
                    }
                    await this.$emit("update-data-api", this.updateDataObj);
                    this.GET_ALL_ADDITIONAL_DATA();
                }
                console.log(number)
            }
        },
        watch: {},
        mounted() {
            this.listForSearch = this.dataList;
        }
    }
</script>

<style scoped>
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
</style>