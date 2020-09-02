<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleTabsClick">
      <el-tab-pane :label="$ml.get('word.table')" name="0">
        <div class="row" style="padding-top: 3vh">
          <div class="title-bord col-md-2">
            <h4> {{ nameTitle }}</h4>
          </div>
          <div class=" col-md-2 fix-position ">
            <el-dropdown @command="changePageSize" style="width: 100%;">
              <el-button size="medium" type="warning" style="width: 100%; font-size: 16px">
                {{ $ml.get('word.numRowOnPage') }}{{ pageSetting.pageSize }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="15"> 15 {{ $ml.get('word.rows') }}</el-dropdown-item>
                <el-dropdown-item command="30"> 30{{ $ml.get('word.rows') }}</el-dropdown-item>
                <el-dropdown-item command="50"> 50{{ $ml.get('word.rows') }}</el-dropdown-item>
                <el-dropdown-item command="75"> 75{{ $ml.get('word.rows') }}</el-dropdown-item>
                <el-dropdown-item command="100"> 100{{ $ml.get('word.rows') }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="col-md-2">
            <el-button plain type="info" style="width: 100%; font-size: 16px" v-on:click="onexport">
              {{ $ml.get('word.exportFile') }}
            </el-button>
          </div>
          <div class="col-md-2">
            <el-dropdown style="width: 100%" :hide-on-click="false">
              <el-button type="primary" style="width: 100%; font-size: 16px">
                {{ $ml.get('word.column') }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu style="width: 11vw;" slot="dropdown">
                <el-checkbox-group :min="1"
                                   v-model="checkedColumns" @change="handleCheckedColumnChange">
                  <el-checkbox v-for="column in columns" style="padding-left: 2vw" :label="column"
                               :key="column">{{ column }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="input-group col-md-4">
            <el-input :placeholder="$ml.get('word.search')" v-model="pageSetting.data"
                      v-on:change="onChange"
                      class="input-with-select" clearable>
              <el-button slot="prepend" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
        <el-table
            v-loading="LOAD_ADDITIONAL_DATA"
            id="lol"
            stripe
            :empty-text="$ml.get('word.empty')"
            ref="paramTable"
            :data="DATA_PAGE.automobileEngine.data"
            max-height="570"
            @row-dblclick="link"

            style="width: 100%"
        >
          <el-table-column
              v-for="clmn in tableColumns"
              v-bind:key="clmn"
              label-class-name="header-st"
              resizable align="left"
              sortable
              :prop="clmn.key"
              :label="clmn.label"
          >
          </el-table-column>
          <el-table-column
              header-align="right"
              label-class-name="header-st"
              resizable align="right"
              :label="this.$ml.get('word.deleteR')"
          >
            <template slot-scope="scope">
              <el-popconfirm
                  :confirmButtonText='confirmOk'
                  :cancelButtonText='confirmNo'
                  icon="el-icon-info"
                  cancelButtonType="danger"
                  iconColor="red"
                  @onConfirm="deleteObj(scope.$index, scope.row,$event)"
                  :title="confirmText"
              >
                <el-button
                    slot="reference"
                    :loading="deleteLoadId===scope.row.id"
                    icon="el-icon-delete-solid"
                    size="mini"
                    type="danger"
                    @click="setConfirmText"
                    style="font-size: 20px"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>

        </el-table>

        <!--
                      <b-table class="my-table-scroll" no-border-collapse hover sticky-header="650px" :items="dataList"
                 @row-dblclicked="(item) => link( item)"
                 :fields="tableColumns">
            <template v-slot:cell(index)="data">
                {{ data.index + 1 }}
            </template>
        </b-table>

        <table class="fixed_headers table table-hover  "  style="text-align: center; z-index: 0; border-radius: 0px">
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
         </table>
                 <div v-if="LOAD_ADDITIONAL_DATA" class="lds-dual-ring-black" style="margin-left:47% "></div>

         -->
        <div class="pagin-content">
        <el-pagination
            class="pagin-st"
            @current-change="handleCurrentPage"
            background
            :current-page.sync="pageSetting.initRecordFrom"
            layout="prev, pager, next"
            :total="DATA_PAGE.automobileEngine.countResults*10">
        </el-pagination>
      </div>
      </el-tab-pane>

      <el-tab-pane :label="$ml.get('word.save')" name="1">
        <br/>
        <div class="title-bord col-md-2">
          <h4> {{ nameTitle }}</h4>
        </div>
        <hr/>

        <div class="row ">
          <div v-if="showErr" class="alert alert-danger" role="alert" style="text-align:center; width: 100%">
            {{ $ml.get('msg.duplicateValue') }}
          </div>

        </div>
        <div class="row">
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
              :title-input="$ml.get('word.autoManufacturer')"
              :items="ADDITIONAL_DATA.autoManufacture"
              :update-obj="saveDataObj"
              index="autoManufactureFk"
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
          <div class="input-group col-md-3">
            <el-input :placeholder="$ml.get('word.from')"
                      v-model="saveDataObj.releaseYearFrom"
                      style="width: 69%"
                      max="2020"
                      min="1895"
                      type="number"
                      clearable
            >
              <template slot="prepend">
                <strong class="title" style="font-size: 15px">{{ $ml.get('word.releaseYear') }}</strong>
              </template>
            </el-input>
            <el-input :placeholder="$ml.get('word.by')"
                      clearable
                      max="2020"
                      min="1895"
                      type="number"
                      style="width: 31%"
                      v-model="saveDataObj.releaseYearBy"
            >
            </el-input>
          </div>
        </div>
        <hr style="position: center; width: 70%"/>
        <div class=" row">
          <div class="col-md-3"></div>
          <div class="  col-md-3">
            <el-button type="danger" @click="cancel()" plain style="width: 100%">
              <span>{{ $ml.get('word.cancel') }}</span>
            </el-button>

          </div>
          <div class="col-md-3">
            <el-button :loading="loadStatus && LOAD_ADDITIONAL_DATA"
                       @click="save(1)" plain
                       style="width: 100%"
                       type="success"><span>{{ $ml.get('word.save') }}</span>
            </el-button>
          </div>
          <div class="col-md-3"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$ml.get('word.update')" name="2">
        <br/>

        <div class="title-bord col-md-2">
          <h4> {{ nameTitle }}</h4>
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
            <th v-if="!current.editRow">{{
                ADDITIONAL_DATA.autoManufacture.find(elem =>
                    elem.id === current.autoManufactureFk).data
              }}
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
            <td v-if="!current.editRow">{{
                ADDITIONAL_DATA.autoModel.find(elem =>
                    elem.id === current.autoModelFk).data
              }}
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
            <td v-if="!current.editRow">{{
                ADDITIONAL_DATA.engine.find(elem =>
                    elem.id === current.engineFk).data
              }}
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
            <td v-if="!current.editRow">{{ current.releaseYearFrom }}</td>
            <td v-if="current.editRow">
              <input max="2020" min="1895" :placeholder="current.releaseYearFrom" type="number"
                     class="form-control" v-model="current.releaseYearFrom">
            </td>
            <td v-if="!current.editRow">{{ current.releaseYearBy }}</td>
            <td v-if="current.editRow">
              <input max="2020" min="1895" :placeholder="current.releaseYearBy" type="number"
                     class="form-control" v-model="current.releaseYearBy">
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
          <button v-if="!loadStatus && AUTO_ENGINE!==null"
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
      </el-tab-pane>
      <el-tab-pane :label="$ml.get('word.importFile')" name="3">
        <div class="upload-box">
          <div class="row import-page-btn">
            <div class="col-md-2 title-bord">
              <h4> {{ nameTitle }}</h4>
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
                <el-button type="warning" style="width: 20vw;" plain>
                  <strong>{{ $ml.get('word.clickToUpload') }}</strong>

                </el-button>
              </el-upload>
            </div>
            <div class="col-md-2">
              <button class="btn  btn-block   btn-secondary" :class="{disabled:(da===null)}" type="button"
                      @click="importFile"
              >
                         <span>{{ $ml.get('word.importFile') }}
                        </span>
              </button>
            </div>
            <div class="col-md-2 ">
              <button class="btn  btn-block  btn-danger" :class="{disabled:(da===null)}" type="button"
                      @click="cancelInport"
              >
                         <span>{{ $ml.get('word.cancel') }}
                        </span>
              </button>
            </div>
            <div class="col-md-1"></div>
          </div>
        </div>
        <hr/>
        <el-table
            :empty-text="$ml.get('word.empty')"
            height="600" :data="da"
            :row-class-name="tableRowClassName">
          <el-table-column prop="id" label="№">
          </el-table-column>
          <el-table-column prop="engineFk" :label="$ml.get('word.engine')">
          </el-table-column>
          <el-table-column prop="autoManufactureFk" :label="$ml.get('word.autoManufacturer')">
          </el-table-column>
          <el-table-column prop="autoModelFk" :label="$ml.get('word.autoModel')">
          </el-table-column>
          <el-table-column prop="releaseYearFrom" :label="$ml.get('word.releaseYearFrom')">
          </el-table-column>
          <el-table-column prop="releaseYearBy" :label="$ml.get('word.releaseYearBy')">
          </el-table-column>
          <el-table-column prop="status" :label="$ml.get('word.status')">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import SearchEnginePanel from "../SearchPage/search-engine-panel";
import VueDatalist from "../input/vue-datalist";
import {mapActions, mapGetters} from "vuex";
import XLSX from "xlsx";

export default {
  name: "auto-engine-save-panel",
  // eslint-disable-next-line vue/no-unused-components
  components: {SearchEnginePanel, VueDatalist},
  data: () => ({
    confirmText: '',
    confirmOk: '',
    confirmNo: '',
    activeName: '0',
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
    deleteLoadId: -1,
    tempObj: null,
    columnOptions: [],
    columns: [],
    limitUpload: 100,
    fileTemp: null,
    file: null,
    listFile: null,
    da: null,
    dalen: 0,
    test: null,
    testlist: [],
    checkedColumns: [],
    isIndeterminate: true,
    pageSetting: {
      initRecordFrom: 1,
      pageSize: 50,
      data:null
    },
    checkAll: false,
    tableColumns: [],
    allTableColumns: []
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
      'DELETE_RESPONSE',
      'DATA_PAGE',
      'AUTO_ENGINE',
      'LOAD_SAVE_AUTOMOBILE_ENGINE',
      'LOAD_ADDITIONAL_DATA',
      'PARAM_NAME_AND_UNITS'

    ])
  },
  methods: {
    ...mapActions([
      'GET_AUTOENG_BY_ID',
      'GET_AUTO_ENG_PAGINATION',
      'SAVE_DATA_AUTOMOBILE_ENGINE',
      'GET_AUTOENG_BY_PARAM_UPDATE',
      'SAVE_DATA_ENGINE_NUMBER',
      'UPDATE_AUTO_ENGINE',
      'GET_ALL_ADDITIONAL_DATA'

    ]),
    handleCurrentPage(val) {
      this.pageSetting.initRecordFrom = val
      this.GET_AUTO_ENG_PAGINATION(this.pageSetting)
    },
    onChange() {
      this.GET_AUTO_ENG_PAGINATION(this.pageSetting)
      // this.filterResults();
    },
    handleDeleteRow(index, row) {
      console.log(index, row);
    },
    handleTabsClick() {
      this.cancel()
      this.cancelSave()
    },
    setConfirmText() {
      this.confirmText = this.$ml.get('msg.deleteConfirm')
      this.confirmOk = this.$ml.get('word.confirm')
      this.confirmNo = this.$ml.get('word.cancel')
    },
    // eslint-disable-next-line no-unused-vars
    tableRowClassName({row, rowIndex}) {
      let temp = this.dataList.find(item =>
          item.engineFk === row.engineFk &&
          item.autoManufactureFk === row.autoManufactureFk &&
          item.autoModelFk === row.autoModelFk
      );
      if (temp !== undefined) {
        return 'warning-row';
      } else {
        return 'success-row';
      }
    },
    onexport() { // On Click Excel download button

      // export json to Worksheet of Excel
      // only array possible
      let arr = []
      this.dataList.map(elem => {
        let obj = {}
        if (elem.data !== "не задано") {
          obj['№'] = elem.id
          obj[this.$ml.get('word.engine')] = elem.engineFk
          obj[this.$ml.get('word.autoManufacturer')] = elem.autoManufactureFk
          obj[this.$ml.get('word.autoModel')] = elem.autoModelFk
          obj[this.$ml.get('word.releaseYearFrom')] = elem.releaseYearFrom
          obj[this.$ml.get('word.releaseYearBy')] = elem.releaseYearBy
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
    cancelInport() {
      this.listFile = null
      this.fileTemp = null
      this.da = null
      this.file = null
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
    async importFile() {
      let importList = [];

      await this.da.forEach(v => {
            let temp = this.dataList.find(item =>
                item.engineFk === v.engineFk &&
                item.autoManufactureFk === v.autoManufactureFk &&
                item.autoModelFk === v.autoModelFk
            );
            if (temp === undefined) {
              let obj = {}
              obj.autoManufactureFk = v['autoManufactureFk']
              obj.autoModelFk = v['autoModelFk']
              obj.engineFk = ['engineFk']
              obj.releaseYearFrom = v['releaseYearFrom']
              obj.releaseYearBy = v['releaseYearBy']
              obj.status = this.PARAM_NAME_AND_UNITS.status.find(item => item.data === v.status).id
              this.dataList.push(v)
              obj.autoManufactureFk = this.ADDITIONAL_DATA.autoManufacture.find(item => item.data === v['autoManufactureFk']).id
              obj.autoModelFk = this.ADDITIONAL_DATA.autoModel.find(item => item.data === v['autoModelFk']).id
              obj.engineFk = this.ADDITIONAL_DATA.engine.find(item => item.data === v['engineFk']).id
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
    async deleteObj(index, row) {
      this.deleteLoadId = row.id
      this.$emit("delete-data-api", row.id)
      console.log(index, row);
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
            obj.autoManufactureFk = v[_this.$ml.get('word.autoManufacturer')]
            obj.engineFk = v[_this.$ml.get('word.engine')]
            obj.autoModelFk = v[_this.$ml.get('word.autoModel')]
            obj.releaseYearFrom = v[_this.$ml.get('word.releaseYearFrom')]
            obj.releaseYearBy = v[_this.$ml.get('word.releaseYearBy')]
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
   filterResults() {
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
    async save(number) {
      let temp = this.ADDITIONAL_DATA.autoEng.find(elem => {
            let dupAutoM = elem.autoManufactureFk === this.ADDITIONAL_DATA.autoManufacture.find(item =>
                item.id === this.saveDataObj.autoManufactureFk
            ).data;
            let dupAutoModel = elem.autoModelFk === this.ADDITIONAL_DATA.autoModel.find(item =>
                item.id === this.saveDataObj.autoModelFk
            ).data;
            let dupEngine = elem.engineFk === this.ADDITIONAL_DATA.engine.find(item =>
                item.id === this.saveDataObj.engineFk
            ).data;
            return dupAutoM && dupAutoModel && dupEngine
          }
      )

      if (temp === undefined) {
        this.showErr = false
        await this.SAVE_DATA_AUTOMOBILE_ENGINE(this.saveDataObj)
        this.$message({
          showClose: true,
          message: this.$ml.get('word.dataAddSuccess'),
          type: 'success'
        });
        this.GET_ALL_ADDITIONAL_DATA()
      } else {
        this.$message({
          showClose: true,
          message: this.$ml.get('msg.duplicateValue'),
          type: 'error'
        });
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
      this.activeName = '2'
      this.GET_AUTOENG_BY_ID({id: record.id});
      console.log(1)
    },
    changePageSize(value) {
      this.pageSetting.pageSize = value
      this.pageSetting.initRecordFrom = 1
      this.GET_AUTO_ENG_PAGINATION(this.pageSetting)
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
  watch: {

    DELETE_RESPONSE: function (val) {
      if (this.deleteLoadId !== -1) {
        if (val.resp) {
          this.$message({
            showClose: true,
            message: this.$ml.get('msg.deleteSuccess'),
            type: 'success'
          });
          this.dataList
              .splice(this.dataList.findIndex(item => item.id === val.id), 1)
        } else {
          this.$message({
            showClose: true,
            message: this.$ml.get('errPage.deleteErr'),
            type: 'error'
          });
        }
        this.deleteLoadId = -1
      }
    }
  },
  mounted() {
    this.checkedColumns = ['№', this.$ml.get('word.engine'), this.$ml.get('word.autoManufacturer'),
      this.$ml.get('word.autoModel'), this.$ml.get('word.releaseYearFrom'), this.$ml.get('word.releaseYearBy')];
    this.columns = ['№', this.$ml.get('word.engine'), this.$ml.get('word.autoManufacturer'),
      this.$ml.get('word.autoModel'), this.$ml.get('word.releaseYearFrom'), this.$ml.get('word.releaseYearBy')];
    this.columnOptions = ['№', this.$ml.get('word.engine'), this.$ml.get('word.autoManufacturer'),
      this.$ml.get('word.autoModel'), this.$ml.get('word.releaseYearFrom'), this.$ml.get('word.releaseYearBy')];
    this.tableColumns = [
      {key: 'id', label: '№', sortable: true},
      {key: 'engineFk', label: this.$ml.get('word.engine'), sortable: true},
      {key: 'autoManufactureFk', label: this.$ml.get('word.autoManufacturer'), sortable: true},
      {key: 'autoModelFk', label: this.$ml.get('word.autoModel'), sortable: true},
      {key: 'releaseYearFrom', label: this.$ml.get('word.releaseYearFrom'), sortable: true},
      {key: 'releaseYearBy', label: this.$ml.get('word.releaseYearBy'), sortable: true}];
    this.allTableColumns = [
      {key: 'id', label: '№', sortable: true},
      {key: 'engineFk', label: this.$ml.get('word.engine'), sortable: true},
      {key: 'autoManufactureFk', label: this.$ml.get('word.autoManufacturer'), sortable: true},
      {key: 'autoModelFk', label: this.$ml.get('word.autoModel'), sortable: true},
      {key: 'releaseYearFrom', label: this.$ml.get('word.releaseYearFrom'), sortable: true},
      {key: 'releaseYearBy', label: this.$ml.get('word.releaseYearBy'), sortable: true}];
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

.pagin-st {
  position: relative;
  top: 15px;
}

.pagin-content {
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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