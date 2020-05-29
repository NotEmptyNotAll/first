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
                <br/>
                <br/>
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
                    <tr v-for="current in dataList" v-bind:key="current">
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

            </div>
            <div class="tab-pane fade" :id="'p'+nameTitle" role="tabpanel"
                 aria-labelledby="profile-tab">
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
                            :holder-num=0

                    />
                    <div class="col-md-3">
                        <button type="submit" @click="saveEngManufacture(1)"
                                class="btn btn-outline-dark btn-block ">
                            <span>{{$ml.get('word.save')}}</span>
                        </button>
                    </div>
                </div>
                <hr/>
                <span v-if="loadStatus"><div class="lds-dual-ring-black posCenter"></div></span>
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
                            :holder-num=0

                    />
                </div>
                <hr style="position: center; width: 70%"/>
                <div class="savePageRow row ">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                        <button type="submit" @click="update(1)"
                                class="btn  btn-block btn-outline-dark">
                            <span>{{$ml.get('word.update')}}</span>
                        </button>
                    </div>
                    <div class="col-md-4"></div>

                </div>
                <hr/>
                <span v-if="loadStatus"><div class="lds-dual-ring-black posCenter"></div></span>

            </div>
        </div>
    </div>

</template>

<script>
    import VueDatalist from "../vue-datalist";
    import {mapActions, mapGetters} from "vuex";
    import InputField from "../input-field";

    export default {
        name: "two-update-panel",
        components: {InputField, VueDatalist},
        data: () => ({
            showErr: null,
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
            }
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
                'PARAM_NAME_AND_UNITS'
            ])
        },
        methods: {
            ...mapActions([
                'GET_ALL_ADDITIONAL_DATA',
                'GET_PARAM_NAME'

            ]),
            async saveEngManufacture(number) {
                let temp = this.dataList.find(item =>
                    item.data === this.saveDataObj.saveData_primary
                );
                if (temp === undefined) {
                    if (this.saveDataObj.saveData_primary != null) {
                        this.$emit("save-data-api", this.saveDataObj);
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
                    this.$emit("update-data-api", this.updateDataObj);
                    this.GET_ALL_ADDITIONAL_DATA();
                }
                console.log(number)
            }
        },
        watch: {},
        mounted() {
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