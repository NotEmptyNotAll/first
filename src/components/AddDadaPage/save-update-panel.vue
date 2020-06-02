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
                <b-table class="my-table-scroll" no-border-collapse hover  sticky-header="650px" :items="listForSearch" :fields="[
                { key: 'index', label:'№' },
                { key: 'data', label: $ml.get('word.nameTitle'), sortable: true },
                { key: 'status', label: $ml.get('word.status'), sortable: true }]"    >

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
                            :holderNum="dataList.find(elem=>elem.id===1).id"

                    />
                    <div class="col input-group  col-md-4">

                        <button v-if="!loadStatus" type="submit" @click="save(1)"
                                class="btn  btn-outline-dark btn-block ">
                            <span>{{$ml.get('word.save')}}</span>
                        </button>
                        <button v-if="loadStatus" type="submit"
                                class="btn  btn-block btn-dark" disabled>
                            <span><div class="lds-dual-ring" style="position: relative; bottom: 1.2vh" ></div></span>
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
                            :holderNum="dataList.find(elem=>elem.id===1).id"

                    />

                    <div class="  col-md-2">

                        <button v-if="!loadStatus" type="submit" @click="update(1)"
                                class="btn  btn-outline-dark btn-block ">
                            <span>{{$ml.get('word.save')}}</span>
                        </button>
                        <button v-if="loadStatus" type="submit"
                                class="btn  btn-block btn-dark" disabled>
                            <span><div class="lds-dual-ring" style="position: relative; bottom: 1.2vh" ></div></span>
                        </button>
                    </div>
                </div>
                <hr/>

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
        components: { InputField, VueDatalist},
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
            } ,
            search:''
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
            async save(number) {
                let temp = this.dataList.find(item =>
                    item.data === this.saveDataObj.saveData
                );
                if (temp === undefined) {
                    if (this.saveDataObj.saveData != null) {
                        if(this.saveDataObj.status===null) {
                            this.saveDataObj.status=1;
                        }
                        await this.$emit("save-data-api", this.saveDataObj);
                        this.GET_ALL_ADDITIONAL_DATA();
                    }
                } else {
                    this.showErr = true;
                }
                console.log(number)
            },
            async update(number) {
                if (this.updateDataObj.objToBeChanged != null) {
                    if(this.updateDataObj.status===null) {
                        this.updateDataObj.status=1;
                    }
                    await this.$emit("update-data-api", this.updateDataObj);
                    this.GET_ALL_ADDITIONAL_DATA();
                    console.log(number)
                }
                console.log(number)
            }

        },
        mounted() {
            this.listForSearch = this.dataList;
        },
        watch:{
            dataList: function (val) {
                    if(val!==null || val!==undefined)
                        this.listForSearch = this.dataList;
            }
        }
    }
</script>

<style scoped>
    .my-table-scroll::-webkit-scrollbar {width:0px;}

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