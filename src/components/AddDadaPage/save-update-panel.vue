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

                    <search-input
                            class="col-md-5"
                            :title-input="$ml.get('word.search')"
                            :items="listForSearch"
                            @set-list="setDataList"
                    />
                </div>
                <table class="table table-hover  "
                       style="text-align: center; z-index: 0; border-radius: 0px">
                    <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">{{nameTitle}}</th>
                        <th scope="col" v-text="$ml.get('word.status')"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="current in dataList" v-bind:key="current">
                        <td>{{current.id}}
                        </td>
                        <td>{{current.data}}
                        </td>
                        <td>{{current.status}}
                        </td>

                    </tr>
                    </tbody>
                </table>

            </div>
            <div class="tab-pane fade" :id="'p'+nameTitle" role="tabpanel"
                 aria-labelledby="profile-tab">
                <br/>
                <br/>
                <div class="savePageRow row ">
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
                            :holder-num=0

                    />
                    <div class="col input-group  col-md-4">

                        <button type="submit" @click="save(1)"
                                class="btn  btn-outline-dark btn-block ">
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
                            :title-input="$ml.get('word.dataChange')"
                            :items="dataList"
                            :update-obj="updateDataObj"
                            :hide-title="true"
                            index="objToBeChanged"
                            :holder-num=0
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
                            :holder-num=0

                    />

                    <div class="  col-md-2">

                        <button type="submit" @click="save(1)"
                                class="btn  btn-outline-dark btn-block ">
                            <span>{{$ml.get('word.save')}}</span>
                        </button>
                    </div>
                </div>
                <hr/>
                <span v-if="loadStatus"><div class="lds-dual-ring-black posCenter"></div></span>

            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import VueDatalist from "../input/vue-datalist";
    import InputField from "../input/input-field";
    import SearchInput from "../input/searchInput";


    export default {
        name: "save-update-panel",
        components: {SearchInput, InputField, VueDatalist},
        data: () => ({
            showErr: false,
            listForSearch: [],
            saveDataObj: {
                saveData: null,
                status: null
            },
            updateDataObj: {
                objToBeChanged: null,
                updateData: null,
                status: null
            }
        }),
        computed: {
            ...mapGetters([
                'PARAM_NAME_AND_UNITS'
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
            setDataList(tempList) {
                this.dataList = tempList;
            },
            async save(number) {
                let temp = this.dataList.find(item =>
                    item.data === this.saveDataObj.saveData
                );
                if (temp === undefined) {
                    if (this.saveDataObj.saveData != null) {
                        this.$emit("save-data-api", this.saveDataObj);
                        this.GET_ALL_ADDITIONAL_DATA();
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
        mounted() {
            this.listForSearch = this.dataList.slice();
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