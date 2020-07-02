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
                <a class="nav-link" id="contact-tabengine" ref="updateTab" data-toggle="tab"
                   :href="'#c'+nameTitle"
                   role="tab" aria-controls="contact" aria-selected="false">{{$ml.get('word.update')}}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="importTab" ref="importTab" data-toggle="tab"
                   :href="'#i'+nameTitle" v-on:click="cancelSave" @click="cancel"
                   role="tab" aria-controls="import" aria-selected="false">{{$ml.get('word.importFile')}}</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContentengine" style="border: white">
            <div class="tab-pane fade show active" :id="'h'+nameTitle" role="tabpanel"
                 aria-labelledby="home-tab">
                <div class="row" style="padding-top: 3vh">
                    <div class="title-bord col-md-2">
                        <h4> {{nameTitle}}</h4>
                    </div>
                    <div class="col-md-2">
                    </div>
                    <div class="col-md-2">
                        <el-button plain type="info" style="width: 100%; font-size: 16px" v-on:click="onexport">
                            {{$ml.get('word.exportFile')}}
                        </el-button>
                    </div>
                    <div class="col-md-2">
                        <el-dropdown style="width: 100%" :hide-on-click="false">
                            <el-button type="primary" style="width: 100%; font-size: 16px">
                                {{$ml.get('word.column')}}
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu style="width: 11vw;" slot="dropdown">
                                <el-checkbox-group :min="1"
                                                   v-model="checkedColumns" @change="handleCheckedColumnChange">
                                    <el-checkbox v-for="column in columns" style="padding-left: 2vw" :label="column"
                                                 :key="column">{{column}}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="input-group col-md-4">
                        <el-input :placeholder="$ml.get('word.search')" v-model="search"
                                  v-on:input="onChange"
                                  v-on:click="onChange" class="input-with-select" clearable>
                            <el-button slot="prepend" icon="el-icon-search"></el-button>
                        </el-input>

                    </div>
                </div>
                <b-table class="my-table-scroll" no-border-collapse hover
                         @row-dblclicked="(item) => link( item)"
                         sticky-header="650px" :items="listForSearch.filter(elem=>{return elem.data!=='не задано'})"
                         :fields="tableColumns">

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

            </div>
            <div class="tab-pane fade" :id="'i'+nameTitle" role="tabpanel"
                 aria-labelledby="import-tab">
                <div class="upload-box">
                    <div class="row import-page-btn">
                        <div class="col-md-2 title-bord">
                            <h4> {{nameTitle}}</h4>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-4">
                            <el-upload
                                    :file-list="listFile"
                                    :show-file-list="false"
                                    class="upload-demo"
                                    :on-change="handleChange"
                                    :on-remove="handleRemove"
                                    :on-exceed="handleExceed"
                                    :limit="limitUpload"
                                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                                    :auto-upload="false">
                                <button class="btn  btn-block   btn-outline-dark" style="width: 20vw">
                                    {{$ml.get('word.clickToUpload')}}
                                </button>
                            </el-upload>
                        </div>
                        <div class="col-md-2">
                            <button class="btn  btn-block   btn-secondary" :class="{disabled:(da===null)}" type="button"
                                    @click="importFile"
                            >
                         <span>{{$ml.get('word.importFile')}}
                        </span>
                            </button>
                        </div>
                        <div class="col-md-2 ">
                            <button class="btn  btn-block  btn-danger" :class="{disabled:(da===null)}" type="button"
                                    @click="cancelInport"
                            >
                         <span>{{$ml.get('word.cancel')}}
                        </span>
                            </button>
                        </div>
                        <div class="col-md-1"></div>
                    </div>
                </div>
                <hr/>
                <el-table
                        empty-text="пусто"
                        height="600" :data="da"
                        :row-class-name="tableRowClassName">
                    <el-table-column prop="id" label="№">
                    </el-table-column>
                    <el-table-column prop="data" :label="$ml.get('word.name')">
                    </el-table-column>
                    <el-table-column prop="status" :label="$ml.get('word.status')">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>


<script>
    import {mapActions, mapGetters} from "vuex";
    import VueDatalist from "../input/vue-datalist";
    import InputField from "../input/input-field";
    import XLSX from 'xlsx'

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

            showDismissibleAlert: false,
            tempUpdateObj: {
                objToBeChanged: 0,
                updateData: null,
                status: 1
            },
            search: '',
            test: null,
            cleanInputList: false,
            columnOptions: [],
            columns: [],
            limitUpload: 100,
            fileTemp: null,
            file: null,
            listFile: null,
            da: null,
            dalen: 0,
            testlist: [],
            checkedColumns: [],
            isIndeterminate: true,
            checkAll: false,
            tableColumns: [],
            allTableColumns: []
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
            handleCheckedColumnChange(value) {
                let checkedCount = value.length;
                this.tableColumns = []
                value.forEach(elem => {
                        this.tableColumns.push(this.allTableColumns.find(item => item.label === elem))
                    }
                )
                this.checkAll = checkedCount === this.columns.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.columns.length;
            },
            async clear() {
                this.search = '';
                this.filterResults();
            },
            // eslint-disable-next-line no-unused-vars
            tableRowClassName({row, rowIndex}) {
                let temp = this.dataList.find(item =>
                    item.data === row.data
                );
                if (temp !== undefined) {
                    return 'warning-row';
                } else {
                    return 'success-row';
                }
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
            cancelInport() {
                this.listFile = null
                this.fileTemp = null
                this.da = null
                this.file = null
            },
            cancelSave() {
                this.cleanInputList = !this.cleanInputList;
                this.saveDataObj.saveData = null;
                this.saveDataObj.status = 1;
            },
            onexport() { // On Click Excel download button

                // export json to Worksheet of Excel
                // only array possible
                let arr = []
                this.dataList.map(elem => {
                    let obj = {}
                    if (elem.data !== "не задано") {
                        obj['№'] = elem.id
                        obj[this.$ml.get('word.name')] = elem.data
                        obj[this.$ml.get('word.status')] = elem.status
                        arr.push(obj)
                    }
                });
                var animalWS = XLSX.utils.json_to_sheet(arr)

                // A workbook is the name given to an Excel file
                var wb = XLSX.utils.book_new() // make Workbook of Excel

                // add Worksheet to Workbook
                // Workbook contains one or more worksheets
                XLSX.utils.book_append_sheet(wb, animalWS, 'animals') // sheetAName is name of Worksheet

                // export Excel file
                XLSX.writeFile(wb, this.nameTitle + '.xlsx') // name of the file is 'book.xlsx'
            },

            // eslint-disable-next-line no-unused-vars
            handleChange(file, fileList) {
                this.fileTemp = file.raw;
                if (this.fileTemp) {
                    if ((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                        || (this.fileTemp.type == 'application/vnd.ms-excel')) {
                        this.importfxx(this.fileTemp);
                    } else {
                        this.$message({
                            showClose: true,
                            type: 'warning',
                            message: 'ошибка！'
                        })
                    }
                } else {
                    this.$message({
                        showClose: true,
                        type: 'warning',
                        message: 'ошибка'
                    })
                }
            },
            handleExceed() {
                this.$message({
                    showClose: true,
                    type: 'warning',
                    message: 'ошибка！'
                })
                return;
            },
            // eslint-disable-next-line no-unused-vars
            handleRemove(file, fileList) {
                this.fileTemp = null
                this.da = null
            },
            // eslint-disable-next-line no-unused-vars
            importfxx(obj) {
                let _this = this;
                // eslint-disable-next-line no-unused-vars
                let inputDOM = this.$refs.inputer;

                this.file = event.currentTarget.files[0];

                var rABS = false;
                var f = this.file;

                var reader = new FileReader();
                //if (!FileReader.prototype.readAsBinaryString) {
                FileReader.prototype.readAsBinaryString = function (f) {
                    var binary = "";
                    var rABS = false;
                    // eslint-disable-next-line no-unused-vars
                    var pt = this;
                    var wb;
                    var outdata;
                    var reader = new FileReader();
                    // eslint-disable-next-line no-unused-vars
                    reader.onload = function (e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for (var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var XLSX = require("xlsx");
                        if (rABS) {
                            // eslint-disable-next-line no-undef
                            wb = XLSX.read(btoa(fixdata(binary)), {
                                type: "base64"
                            });
                        } else {
                            wb = XLSX.read(binary, {
                                type: "binary"
                            });
                        }
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                        console.log(outdata);
                        let arr = [];
                        outdata.map(v => {
                            let obj = {}
                            obj.id = v['№']
                            obj.data = v[_this.$ml.get('word.name')]
                            obj.status = v[_this.$ml.get('word.status')]
                            arr.push(obj)
                        });
                        _this.da = arr;
                        _this.dalen = arr.length;
                        return arr;
                    };
                    reader.readAsArrayBuffer(f);
                };
                if (rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
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
                        this.$message({
                            showClose: true,
                            message: this.$ml.get('word.dataAddSuccess'),
                            type: 'success'
                        });
                        await setTimeout(() => console.log('1'), 1500);
                        this.GET_ALL_ADDITIONAL_DATA();
                    }

                } else {
                    this.$message({
                        showClose: true,
                        message: this.$ml.get('msg.duplicateValue'),
                        type: 'error'
                    });
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
            async importFile() {
                let importList = [];
                await  this.da.forEach(v => {
                        let temp = this.dataList.find(item =>
                            item.data === v.data
                        );
                        if (temp === undefined) {
                            let obj = {}
                            obj.saveData = v['data']
                            obj.status = this.PARAM_NAME_AND_UNITS.status.find(item => item.data === v.status).id
                            this.dataList.push(v)
                            importList.push(obj)
                        }
                    }
                )

                await this.$emit("import-data-api", {list: importList});
                 this.GET_ALL_ADDITIONAL_DATA();
                this.$message({
                    showClose: true,
                    message: this.$ml.get('word.dataAddSuccess'),
                    type: 'success'
                });
            },
            async update(number) {
                if (this.updateDataObj.objToBeChanged != null) {
                    let temp = this.dataList.find(item =>
                        item.data === this.updateDataObj.updateData
                    );
                    if (temp === undefined) {
                        if (this.updateDataObj.status === null) {
                            this.updateDataObj.status = 1;
                        }
                        await this.$emit("update-data-api", this.updateDataObj);
                        this.$message({
                            showClose: true,
                            message: this.$ml.get('word.dataAddSuccess'),
                            type: 'success'
                        });
                        let temp = this.dataList.find(item => item.id === this.updateDataObj.objToBeChanged);
                        temp.status = this.PARAM_NAME_AND_UNITS.status.find(item => item.id === this.updateDataObj.status).data;
                        temp.data = this.updateDataObj.updateData;
                        this.listForSearch = this.dataList;
                        this.cancel()
                    } else {
                        this.$message({
                            showClose: true,
                            message: this.$ml.get('msg.duplicateValue'),
                            type: 'error'
                        });
                    }
                }
                console.log(number)
            }

        },
        mounted() {
            this.listForSearch = this.dataList;
            this.checkedColumns = ['№', this.$ml.get('word.name'), this.$ml.get('word.status')];
            this.columns = ['№', this.$ml.get('word.name'), this.$ml.get('word.status')];
            this.columnOptions = ['№', this.$ml.get('word.name'), this.$ml.get('word.status')];
            this.tableColumns = [
                {key: 'id', label: '№', sortable: true},
                {key: 'data', label: this.$ml.get('word.name'), sortable: true},
                {key: 'status', label: this.$ml.get('word.status'), sortable: true}];
            this.allTableColumns = [
                {key: 'id', label: '№', sortable: true},
                {key: 'data', label: this.$ml.get('word.name'), sortable: true},
                {key: 'status', label: this.$ml.get('word.status'), sortable: true}];
        }
        ,
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


    .import-page-btn {
        padding-top: 3%;
    }


</style>