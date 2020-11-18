<template>
  <div>
    <div v-if="showModeratorBoard" class="container search-border tab  rounded bg-white rad">
      <vue-context-menu
          :pageSetting="pageSetting"
          :elementId="'myFirstMenu'"
          :options="ALL_AUTO_ENG.columnParam"
          :ref="'vueSimpleContextMenu1'"
          @option-clicked="onNewExport"
      ></vue-context-menu>
      <div class="row " style="padding-top: 0vh;padding-bottom: 0vh">
        <div class="title-bord col-md-1 param-navbar">

          <h4> {{ $ml.get('word.parameters') }}</h4>
        </div>
        <div class="col-md-1 fix-position ">
          <el-dropdown style="width: 100%" :hide-on-click="false">
            <el-button size="medium" type="primary" style="width: 100%; font-size: 16px">
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
        <div class=" col-md-2 fix-position ">
          <el-dropdown @command="changePageSize" style="width: 100%;">
            <el-button size="medium" type="warning" style="width: 100%; font-size: 16px">
              {{ $ml.get('word.numRowOnPage') }}{{ pageSetting.pageSize }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="5"> 5 {{ $ml.get('word.rows') }}</el-dropdown-item>
              <el-dropdown-item command="10"> 10{{ $ml.get('word.rows') }}</el-dropdown-item>
              <el-dropdown-item command="15"> 15{{ $ml.get('word.rows') }}</el-dropdown-item>
              <el-dropdown-item command="25"> 25{{ $ml.get('word.rows') }}</el-dropdown-item>
              <el-dropdown-item command="35"> 35{{ $ml.get('word.rows') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class=" col-md-2 fix-position ">
          <el-dropdown @command="changeSearchPercent" style="width: 100%;">
            <el-button size="medium" type="warning" style="width: 100%; font-size: 16px">
              {{ $ml.get('word.selectSearchPercent') }}&#177;{{ pageSetting.searchPercent + '%' }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0"> &#177;0%</el-dropdown-item>
              <el-dropdown-item command="5"> &#177;5%</el-dropdown-item>
              <el-dropdown-item command="10"> &#177;10%</el-dropdown-item>
              <el-dropdown-item command="15"> &#177;15%</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="col-md-2">
          <el-button size="medium" class="fix-position" plain type="danger"
                     style="width: 100%; font-size: 16px"
                     v-on:click="clearFilter">{{ $ml.get('word.clearAllFilter') }}
          </el-button>
        </div>
        <div class="col-md-4  border-butt param-navbar">
          <el-divider content-position="right">
            <el-button-group>
              <el-button v-for="current in ALL_AUTO_ENG.columnParam" v-bind:key="current"
                         :plain="engineParamData!==current.columnResponseList"
                         type="info"
                         v-on:click="setEngineParamData(current)">
                {{ current.name }}
              </el-button>
              <el-button plain type="info"
                         v-show="ALL_AUTO_ENG.length!==0"
                         icon="el-icon-close"
                         @click="setCurrent()"
                         v-on:click="setEngineParamData({columnResponseList:null})">
              </el-button>
            </el-button-group>
          </el-divider>
        </div>
      </div>
      <hr/>
      <div class="table-cont">
        <el-table

            v-loading="LOAD_ALL_AUTO_ENG && LOADPARAM"
            id="lol"
            stripe
            :empty-text="$ml.get('word.empty')"
            border
            ref="paramTable"
            :data="ALL_AUTO_ENG.engineData"
            highlight-current-row
            :max-height="tableHeight"
            @current-change="handleCurrentChange"
            @row-contextmenu="handleClick1"
            :header-cell-style="handleHeaderStyle"
            style="width: 100%; font-size: 0.8rem"
        >
          <el-table-column
              v-for="clmn in tableColumns"
              v-bind:key="clmn"
              label-class-name="header-st"
              resizable align="center"
              fixed
              :min-width="clmn.widthSmall"
              :prop="clmn.key"
              :label="clmn.label"
              :index="clmn"

          >

            <template slot="header" style="font-size: 0.8rem"
            >

              <h6 v-if="engineParamData===null">{{ clmn.label }}</h6>
              <h6 v-else>{{ clmn.label }}</h6>
              <filter-input
                  style="font-size: 0.8rem"
                  :bus="bus"
                  :clean-search="cleanSearch"
                  v-show="clmn.key!=='id'"
                  :place-hold="$ml.get('word.filter')"
                  :save-parameters="pageSetting"
                  :index="clmn.key"
                  @on-input-action="getAutoEngByFilter"
              />
            </template>
            <template slot-scope="scope">
              {{ String(scope.row[scope.column.property]).indexOf('NA') === -1?scope.row[scope.column.property]:'' }}
            </template>

          </el-table-column>
          <el-table-column resizable align="center"
                           v-show="engineParamData!==null"
                           v-for="mainColumn in engineParamData"
                           v-bind:key="mainColumn" :label="mainColumn.name"
                           :prop="mainColumn.color"
          >
            <el-table-column
                style="height: 10px"
                resizable
                align="center"
                v-for="column in mainColumn.columnList"
                v-bind:key="column"
                :label="column.name"
                :prop="column.color"
                :index="column"
                min-width="310">
              <template slot="header">
                <div>
                  {{ column.name }}
                </div>
                <filter-input
                    :bus="bus"
                    :clean-search="cleanSearch"
                    :paramListMod="true"
                    :param-size-list="column.columnList"
                    :place-hold="$ml.get('word.filter')"
                    :save-parameters="pageSetting"
                    :index="column.id"
                    @on-input-action="getAutoEngByFilter"
                />
              </template>
              <template slot-scope="scope">
                <span v-show="column.columnList[0]===undefined" style="margin-left: 10px">{{
                    scope.row[column.id]
                  }}</span>
                <span v-show="column.columnList[0]!==undefined && scope.row[col.id]!==undefined"
                      v-for="col in column.columnList"
                      v-bind:key="col">
                                   <strong v-if="(col.name!=='std' && col.name!=='Std' && col.name!=='знач.' )"

                                   >{{ col.name + ": " }}</strong>
                                      {{ scope.row[col.id] }}
                                                                 </span>
                <el-button size="medium" v-show="scope.row['listImage'+column.id]!==undefined"
                           type="text" @click="showImage(scope.row['listImage'+column.id])">
                  <i style="font-size: 25px" class="el-icon-camera-solid"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
        <el-pagination
            class="pagin-st"
            @current-change="handleCurrentPage"
            background
            :current-page.sync="pageSetting.initRecordFrom"
            layout="prev, pager, next"
            :total="ALL_AUTO_ENG.countResults*10">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="$ml.get('word.titlePhoto')" :visible.sync="dialogFormVisible"
               custom-class="dialog-photo" :before-close="closeDialog">
      <el-carousel arrow="always" height="60vh" class="dialog-photo">
        <el-carousel-item v-for="item in listFileUrl" :key="item"
                          style="display: flex; justify-content: center;align-items: center">
          <el-image :src="'https://res.cloudinary.com/notempty/image/upload/'+item"></el-image>

        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import InputField from "../input/input-field";
import FilterInput from "../input/filter-input";
import vueSimpleContextMenu from 'vue-simple-context-menu'
import VueContextMenu from "../ContextMenu/vue-context-menu";
// eslint-disable-next-line no-unused-vars
import xl from "excel4node";
// eslint-disable-next-line no-unused-vars
import XLSX from "xlsx";
import {saveAs} from 'file-saver'
// eslint-disable-next-line no-unused-vars
import json2xls from "json2xls";
// eslint-disable-next-line no-unused-vars
import fs from "fs";
import ExcelJS from 'exceljs/dist/es5/exceljs.browser.js'

// eslint-disable-next-line no-unused-vars
import pdfMake from "pdfmake/build/pdfmake";
import Vue from "vue"
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  name: "new-search-page",
  // eslint-disable-next-line vue/no-unused-components
  components: {VueContextMenu, FilterInput, vueSimpleContextMenu, InputField},
  data() {
    return {
      tableData: [],
      checkedRows: [],
      // eslint-disable-next-line no-undef
      bus: new Vue(),
      column: [
        'selected',
        'sku',
      ],
      options: {},
      listFileUrl: [],
      tableHeight: 635,
      columnOptions: [],
      cleanSearch: 1,
      dialogFormVisible: false,
      columns: [],
      itemArray1: [
        {
          name: 'Jim',
          job: 'Salesman'
        },
        {
          name: 'Dwight',
          job: 'Assistant to the Regional Manager'
        },
        {
          name: 'Pam',
          job: 'Receptionist'
        }
      ],
      checkAll: false,
      optionsArray1: [
        {
          name: 'Duplicate',
          slug: 'duplicate'
        },
        {
          name: 'Edit',
          slug: 'edit'
        },
        {
          name: 'Delete',
          slug: 'delete'
        }
      ],
      tableColumns: [],
      checkedColumns: [],
      allTableColumns: [],
      engineParamData: null,
      isIndeterminate: true,
      heightRowExls: 30,
      borderTable: {
        top: {style: 'thin', color: {argb: '7b7a7a'}},
        left: {style: 'thin', color: {argb: '7b7a7a'}},
        bottom: {style: 'thin', color: {argb: '7b7a7a'}},
        right: {style: 'thin', color: {argb: '7b7a7a'}}
      },
      searchData: {
        engineType: null,
        autoManufacturer: null,
        autoModel: null,
        produceYear: null,
      },
      pageSetting: {
        id: null,
        flapNumber: null,
        pistonDiameterAndStoke: null,
        fuelType: null,
        cylindersNumber: null,
        autoManufacture: null,
        engineManufacture: null,
        powerKWT: null,
        engineCapacity: null,
        horsepower: null,
        pistonStoke: null,
        pistonDiameter: null,
        modelName: null,
        engineType: null,
        releaseYear: null,
        elemID: null,
        cylinderNum: null,
        cylinderPlace: null,
        superchargedType: null,
        degreeCompression: null,
        initRecordFrom: 1,
        pageSize: 15,
        searchPercent: 0,
        paramList: []
      },
      fillHead: {
        type: 'gradient',
        gradient: 'path',
        center: {left: 0.5, right: 0.5},
        stops: [
          {position: 0, color: {argb: 'd2d1d1'}},
          {position: 1, color: {argb: 'd2d1d1'}}
        ]
      },
      lengTextForMoveLine: 10,
      fontHead: {
        name: 'Arial Black',
        family: 2,
        size: 8,
        italic: false
      },
      lengHeadNameArr: 0,
      test: null,
      temp: null,
      test1: null,
      inputFilds: []
    }
  },
  methods: {
    ...mapActions([
      'GET_COLUMN_PARAM',
      'GET_ENGDATA_BY_PARAM',
      'GET_ALL_AUTO'
    ]),
    handleCurrentPage(val) {
      this.pageSetting.initRecordFrom = val
      this.GET_ALL_AUTO(this.pageSetting)
    },
    // eslint-disable-next-line no-unused-vars
    tableRowClassName({row, rowIndex}) {
      return 'header-st';

    },

    showImage(list) {
      this.listFileUrl = list
      this.dialogFormVisible = true
    },
    showModeratorBoard() {
      if (this.currentUser) {
        return this.currentUser.roles.indexOf('MODERATOR') !== -1
      }
      return false;
    },
    // eslint-disable-next-line no-unused-vars
    handleHeaderStyle({row, column, rowIndex, columnIndex}) {
      return 'background-color: ' + column.property + ';' + 'padding:3px;'
    },
    setCurrent(row) {
      this.$refs.paramTable.setCurrentRow(row);
    },
    moveLineInText(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (String(arr[i]).length > this.lengTextForMoveLine) {
          arr[i] = arr[i].replace(' ', '\n');
        }
      }
      return arr
    },
    autoMergeTableExls(arr, worksheet, leng, startCodeChar, rowNum, firstRowMergeNum) {
      console.log(arr)
      arr = this.moveLineInText(arr)
      if (arr.length !== leng) {
        let tempArr = []
        let arrLeng = arr.length
        let temp = 1
        let startIndex = 0
        if (firstRowMergeNum !== -1) {
          startIndex = 2
          temp = 3
          leng += 2
          tempArr.push(arr[0])
          tempArr.push(arr[1])
        }
        for (let i = startIndex; i < arrLeng; i++) {
          let k = ((leng - arrLeng) - i) > 0 ? 1 + Math.floor((leng - arrLeng - i) / arrLeng) : 0
          tempArr.push(arr[i])
          for (let j = 0; j < k; j++) {
            tempArr.push('')
          }
        }
        const row = worksheet.addRow(tempArr)
        row.height = this.heightRowExls
        row.border = this.borderTable
        row.alignment = {vertical: 'middle', horizontal: 'center'};
        row.font = this.fontHead

        for (let i = startIndex; i < arrLeng; i++) {
          let k = ((leng - arrLeng) - i) > 0 ? 1 + Math.floor((leng - arrLeng - i) / arrLeng) : 0
          console.log(leng + '_' + arrLeng + '_' + i + ' ' + k + ' ' + temp + ' ' + rowNum)
          if (firstRowMergeNum !== -1 && (temp + k) < (leng - 2) && i === arrLeng - 1) {
            k += (leng - 2) - (temp + k)
          }
          worksheet
              .mergeCells(String.fromCharCode(startCodeChar + temp) + rowNum + ':'
                  + String.fromCharCode(startCodeChar + (temp + k)) + rowNum);
          temp += k + 1


        }

      } else {
        const row = worksheet.addRow(arr)
        row.height = this.heightRowExls
        row.border = this.borderTable
        row.font = this.fontHead
        row.alignment = {vertical: 'middle', horizontal: 'center'};
      }
    },
    clearFilter() {
      this.bus.$emit('clear')

      this.pageSetting.id = null;
      this.pageSetting.flapNumber = null;
      this.pageSetting.fuelType = null;
      this.pageSetting.cylindersNumber = null;
      this.pageSetting.autoManufacture = null;
      this.pageSetting.engineManufacture = null;
      this.pageSetting.powerKWT = null;
      this.pageSetting.engineCapacity = null;
      this.pageSetting.pistonDiameterAndStoke = null;
      this.pageSetting.horsepower = null;
      this.pageSetting.pistonStoke = null;
      this.pageSetting.pistonDiameter = null;
      this.pageSetting.modelName = null;
      this.pageSetting.engineType = null;
      this.pageSetting.releaseYear = null;
      this.pageSetting.elemID = null;
      this.pageSetting.cylinderNum = null;
      this.pageSetting.cylinderPlace = null;
      this.pageSetting.superchargedType = null;
      this.pageSetting.degreeCompression = null;
      this.pageSetting.paramList = [];
      this.GET_ALL_AUTO(this.pageSetting);
    },
    handleClick1(row, column, event) {
      this.$refs.vueSimpleContextMenu1.showMenu(event, row, column)
    },
    // eslint-disable-next-line no-unused-vars
    closeDialog() {
      this.listFileUrl = []
      this.dialogFormVisible = false
    },
    getMaxListParamFromColumnList(columnList) {
      let index = 0;
      let kol = 0;
      let max = 0;
      columnList.forEach((item) => {
        if (item.columnList.length > max) {
          index = kol
          max = item.columnList.length
        }
        kol++
      })
      return columnList[index].columnList
    },
    isEmptyRow(row) {
      let flag = true;
      for (let i = 2; i < row.length; i++) {
        if (row[i] !== '') {
          flag = false;
        }
      }
      return flag;
    },
    getGeneralName(arr) {
      let generalIndex = 0;
      let generalName = ''
      arr.map(elem => {
        let tempName = elem.text.split(' ')[0]
        if ((generalName === tempName) && generalIndex < 2) {
          generalIndex++
        } else if (generalIndex < 2 && elem.text.split(' ').length > 1) {
          generalName = tempName
        }
      })
      arr.map(elem => {
        if (generalName === elem.text.split(' ')[0] && elem.text.split(' ')[1] !== undefined)
          elem.text = elem.text.split(' ')[1]
      })
      return generalName
    },
    optionClicked1(event) {
      this.test1 = event
      let tables = [];
      event.option.columnResponseList.map((elem, index) => {
            let clmns = []
            let tempHeadName = []
            let headNameParamClmns = []
            let tempHeadNameIdArr = []
            let widthClmns = [100];
            let lengHeadNameArr = 0
            elem.columnList.map(item => {
              item.columnList.map(e => {

                if (headNameParamClmns.find(t => t.text.toString() === e.name.toString()) === undefined && event.item[e.id] !== undefined) {
                  headNameParamClmns.push({text: e.name, id: e.id})
                  tempHeadNameIdArr.push({name: e.name, arr: [{parentId: item.id, id: e.id}]})
                  lengHeadNameArr++
                } else if (headNameParamClmns.find(t => t.text.toString() !== e.name.toString()) !== undefined && event.item[e.id] !== undefined) {

                  if (tempHeadNameIdArr.find(elm => elm.name === e.name) !== undefined) {
                    tempHeadNameIdArr.find(elm => elm.name === e.name).arr.push({parentId: item.id, id: e.id})
                  }
                }
              })
            })
            this.temp = tempHeadNameIdArr
            if (tempHeadNameIdArr.length > 0) {
              if (lengHeadNameArr === 0) {
                lengHeadNameArr = 1
              }
              for (let i = 0; i < lengHeadNameArr; i++) {
                widthClmns.push('*')
              }
              let row = [{
                text: elem.name,
                colSpan: lengHeadNameArr + 1,
                style: 'headBlock'
              }]
              for (let i = 0; i < lengHeadNameArr; i++) {
                row.push({})
              }
              clmns.push(row)
              if (headNameParamClmns.length > 0) {
                tempHeadName.push({text: '', style: 'nameElem'})
                headNameParamClmns.map(elment => {
                  tempHeadName.push({text: elment.text, style: 'nameElem'})
                })
              } else {
                tempHeadName.push({text: "", style: 'nameElem'})
                tempHeadName.push({text: "Значення"})
              }
              clmns.push(tempHeadName)
              elem.columnList.map(item => {
                let tempArr = []
                tempArr.push({text: item.name, style: 'nameElem'})
                if (item.columnList.length > 0) {
                  headNameParamClmns.map(e => {
                    let tempVar = tempHeadNameIdArr
                        .find(elmn => elmn.name === e.text)
                    if (tempVar !== undefined) {
                      let resultId = tempVar.arr.find(elmnt => elmnt.parentId === item.id)
                      if (resultId !== undefined) {
                        tempArr.push({text: event.item[resultId.id], bold: true})
                      } else {
                        tempArr.push({text: '', bold: true})
                      }
                    } else {
                      tempArr.push({text: '', bold: true})
                    }
                  })
                } else {
                  tempArr.push({text: event.item[item.id], bold: true, colSpan: lengHeadNameArr,})
                }
                clmns.push(tempArr)
                tempArr = []
              })
              tables.push({
                margin: [0, 0, 0, 0],
                table: {
                  widths: widthClmns,
                  body: clmns,
                  headerRows: 1
                },
                layout: {
                  hLineColor: function (i) {
                    if (i === 0 && index !== 0) {
                      return 'lightgrey';
                    }
                    return 'grey';
                  },
                  vLineColor: 'grey'
                },
              })
            }
          }
      )
      this.test = tables
      let docInfo = {
        info: {
          title: event.option.name,
          author: 'Vlad',
          subject: 'Theme',
          keywords: 'Ключевые слова'
        },
        pageSize: 'A4',
        pageOrientation: 'portrait',//'portrait'
        pageMargins: [15, 10, 15, 30],
        content: [
          {
            text: 'Параметри обробки до замовлення №79930',
            fontSize: 20,
            bold: true,
            margin: [10, 15, 15, 15],
            alignment: 'center'
            //pageBreak:'after'
          },
          {
            text: 'Данні автомобіля',
            style: 'header'
          },
          {
            margin: [0, 15, 0, 10],

            table: {
              widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
              body: [
                [
                  {text: this.$ml.get('word.autoManufacturer'), style: 'headT'},
                  {text: this.$ml.get('word.autoModel'), style: 'headT'},
                  {text: this.$ml.get('word.engine'), style: 'headT'},
                  {text: this.$ml.get('word.releaseYear'), style: 'headT'},
                  {text: this.$ml.get('word.engineCapacity'), style: 'headT'},
                  {text: this.$ml.get('word.pistonDiameter'), style: 'headT'},
                  {text: this.$ml.get('word.flapNumber'), style: 'headT'}],
                [
                  {text: event.item.autoManufacture, bold: false},
                  {text: event.item.engineType, bold: false},
                  {text: event.item.autoManufacture, bold: false},
                  {text: event.item.releaseYear, bold: false},
                  {text: event.item.engineCapacity, bold: false},
                  {text: event.item.pistonDiameter, bold: false},
                  {text: event.item.flapNumber, bold: false}
                ],
              ],
              headerRows: 1
            },
            layout: {
              hLineColor: 'lightgrey',
              vLineColor: 'lightgrey'
            },
          },
          {
            margin: [0, 10, 0, 15],
            text: 'Параметри обробки',
            style: 'header'
          },
          tables,
          {
            margin: [0, 0, 0, 0],
            table: {
              widths: ['*'],
              body: [
                [{text: 'Тестування', style: 'endHead'}],
                [{
                  text: 'Тестування проводиться при температурі t=70*C та під тиском Р=4атм.',
                  alignment: 'center'
                }]
              ],
              headerRows: 1
            },
            layout: {
              hLineColor: function (i) {
                if (i === 0) {
                  return 'lightgrey';
                }
                return 'grey';
              },
              vLineColor: 'grey'
            },
          },
          {
            margin: [0, 50, 0, 30],
            text: 'З параметрами обробки ознайомлений та згоден',
            style: 'header'
          },
          {
            margin: [0, 0, 0, 0],
            table: {
              widths: [50, '*', 50, '*', 50, "*", 50],
              body: [
                [{text: ""}, {text: 'П.І.Б___________'}, {text: ""}, {text: "Підпис___________"}, {text: ""}, {text: "Дата___________"}, {text: ""},]
              ],
              headerRows: 1
            },
            layout: {
              hLineColor: 'white',
              vLineColor: 'white'
            },
          }

        ],
        styles: {
          endHead: {
            bold: true,
            fontSize: 13,
            fillColor: 'lightgrey',
            alignment: 'center'
          },
          nameElem: {
            fillColor: 'lightgrey',
            alignment: 'left',
            bold: true,
          },
          headBlock: {
            fillColor: 'lightgrey',
            alignment: 'center',
            bold: true,
          },
          headT: {
            fillColor: 'lightgrey',
            bold: true,
            alignment: 'center'
          },
          header: {
            fontSize: 15,
            bold: true,
            alignment: 'center'
          }
        }
      }

      pdfMake.createPdf(docInfo).download(event.option.name + '.pdf');
      console.log(event)
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    }
    ,
    // eslint-disable-next-line no-unused-vars
    findMaxColumns(event) {
      let max = 0
      event.option.columnResponseList.forEach(item => {
        if (item.columnList.length > max) {
          max = item.columnList.length
        }
      })
      return max
    },
    // eslint-disable-next-line no-unused-vars
    async onNewExport(event) {
      // const ExcelJS = require('exceljs');
      //   const ExcelJS = require('exceljs/dist/es5');
      let lengPage = this.findMaxColumns(event) + 2
      this.test = event
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Me';
      workbook.lastModifiedBy = 'Her';
      workbook.created = new Date();
      workbook.modified = new Date();
      workbook.lastPrinted = new Date();
      workbook.calcProperties.fullCalcOnLoad = true;
      workbook.views = [
        {
          x: 0, y: 0, width: 1000, height: 2000,
          firstSheet: 0, activeTab: 1, visibility: 'visible'
        }
      ]
      const worksheet = workbook.addWorksheet('My Sheet',
          {pageSetup: {paperSize: 1, orientation: 'landscape'}});
      worksheet.pageSetup.margins = {
        left: 0.1, right: 0.1,
        top: 0.75, bottom: 0.75,
        header: 0.3, footer: 0.3
      };
      // Set Print Area for a sheet
      //worksheet.pageSetup.printArea = 'A1:G20';

      // Repeat specific rows on every printed page
      worksheet.pageSetup.printTitlesRow = '1:3';
      let arrW = []
      for (let i = 0; i < lengPage; i++) {
        arrW.push({width: 10})
      }
      worksheet.columns = arrW
      const row = worksheet.addRow(['Параметри обробки до замовлення №75555'])
      row.height = this.heightRowExls
      const row1 = worksheet.addRow(['Данні автомобіля'])
      row1.height = this.heightRowExls - 10

      let arrNameAutoCell = [this.$ml.get('word.autoManufacturer'), this.$ml.get('word.autoModel'),
        this.$ml.get('word.engine'), this.$ml.get('word.releaseYear'), this.$ml.get('word.engineCapacity'),
        this.$ml.get('word.pistonDiameter'), this.$ml.get('word.flapNumber')]
      this.autoMergeTableExls(arrNameAutoCell, worksheet, lengPage, 64, 3, -1)
      let arrDataAutoCell = [event.item.autoManufacture, event.item.modelName,
        event.item.engineType, event.item.releaseYear, event.item.engineCapacity,
        event.item.pistonDiameter, event.item.flapNumber]
      this.autoMergeTableExls(arrDataAutoCell, worksheet, lengPage, 64, 4, -1)

      worksheet.addRow([''])
      worksheet.addRow(['Параметри обробки']).height = this.heightRowExls

      row.font = {bold: true}
      row1.font = {bold: true}
      let startRow = 7
      let tempArr = []
      let kolIter = 0
      event.option.columnResponseList.forEach(item => {
        kolIter = 0
        tempArr.push(item.name)
        tempArr.push('рем. размеры')
        let listParam = this.getMaxListParamFromColumnList(item.columnList)
        item.columnList.forEach(elem => {
          tempArr.push(elem.name)
        })


        // worksheet.addRow(tempArr)
        this.autoMergeTableExls(tempArr, worksheet, lengPage, 64, startRow, 1)
        let emptyRow = []
        for (let i = 0; i < tempArr.length; i++) {
          emptyRow.push(' ')
        }
        tempArr = []
        for (let i = 1; i < lengPage + 1; i++) {
          worksheet.getCell(String.fromCharCode(64 + i) + startRow).font = this.fontHead
          worksheet.getCell(String.fromCharCode(64 + i) + startRow).fill = this.fillHead
          worksheet.getCell(String.fromCharCode(64 + i) + startRow).border = this.borderTable
        }

        listParam.forEach(elem => {
          tempArr.push('')
          tempArr.push(elem.name)
          item.columnList.forEach(e => {
            let temp = e.columnList.find(elm => elm.nameId === elem.nameId)
            if (temp !== undefined && event.item[temp.id] !== undefined) {
              tempArr.push(event.item[temp.id])
            } else {
              tempArr.push('')
            }
          })
          if (!this.isEmptyRow(tempArr)) {
            ++kolIter
            this.autoMergeTableExls(tempArr, worksheet, lengPage, 64, startRow + kolIter, 1)
            // worksheet.addRow(tempArr)
          }
          tempArr = []
        })
        ++kolIter
        this.autoMergeTableExls(emptyRow, worksheet, lengPage, 64, startRow + kolIter, 1)
        worksheet.getCell('A' + startRow).font = this.fontHead
        worksheet.getCell('A' + startRow).fill = this.fillHead
        worksheet.mergeCells('A' + startRow + ':A' + (startRow + kolIter));
        startRow += kolIter + 1

      })
      let tempArrFoot = []
      worksheet.addRow([])
      tempArrFoot = ['З параметрами обробки ознайомлений та згоден']
      this.autoMergeTableExls(tempArrFoot, worksheet, lengPage - 1, 64, startRow + 1, -1)
      worksheet.addRow([])
      tempArrFoot = ['П.І.Б___________________', 'Підпис______________', 'Підпис______________']
      this.autoMergeTableExls(tempArrFoot, worksheet, lengPage - 1, 64, startRow + 3, -1)
      worksheet.getCell('A' + (startRow + kolIter - 2)).font = this.fontHead
      worksheet.getCell('A' + (startRow + kolIter - 2)).alignment = {vertical: 'middle', horizontal: 'center'};
      worksheet.getRow(startRow + kolIter).alignment = {vertical: 'middle', horizontal: 'center'};


      worksheet.mergeCells('A1:' + String.fromCharCode(64 + lengPage) + '1');
      worksheet.mergeCells('A2:' + String.fromCharCode(64 + lengPage) + '2');
      worksheet.mergeCells('A6:' + String.fromCharCode(64 + lengPage) + '6');
      for (let i = 1; i < lengPage + 1; i++) {
        worksheet.getCell(String.fromCharCode(64 + i) + '4').font = this.fontHead
        //  worksheet.getCell(String.fromCharCode(64 + i) + '4').fill = this.fillHead
        worksheet.getCell(String.fromCharCode(64 + i) + '4').border = this.borderTable
        worksheet.getCell(String.fromCharCode(64 + i) + '3').font = this.fontHead
        worksheet.getCell(String.fromCharCode(64 + i) + '3').fill = this.fillHead
        worksheet.getCell(String.fromCharCode(64 + i) + '3').border = this.borderTable
        worksheet.getCell(String.fromCharCode(64 + i) + '3').alignment = {vertical: 'middle', horizontal: 'center'};
        worksheet.getCell(String.fromCharCode(64 + i) + '4').alignment = {vertical: 'middle', horizontal: 'center'};
      }
      worksheet.getCell('A1').font = this.fontHead
      worksheet.getCell('A1').border = this.borderTable
      worksheet.getCell('A1').alignment = {vertical: 'middle', horizontal: 'center'};
      worksheet.getCell('A1').font.italic = true
      worksheet.getCell('A1').fill = this.fillHead
      worksheet.getCell('A1').border = this.borderTable
      worksheet.getCell('A2').alignment = {vertical: 'middle', horizontal: 'center'};
      worksheet.getCell('A6').alignment = {vertical: 'middle', horizontal: 'center'};

      const buf = await workbook.xlsx.writeBuffer()

      saveAs(new Blob([buf]), event.option.name + '.xlsx')
    },
    onexport(event) {
      // On Click Excel download button
      // export json to Worksheet of Excel
      // only array possible
      this.test = event
      // eslint-disable-next-line no-unused-vars
      let arrMerdes = []
      let dataArr = []
      // eslint-disable-next-line no-unused-vars
      let lengPage = this.findMaxColumns(event) + 1
      arrMerdes.push({s: {r: 1, c: 0}, e: {r: 1, c: lengPage}})
      let obj = {}
      obj[0] = 'Параметри обробки до замовлення №75555'
      dataArr.push(obj)

      var animalWS = XLSX.utils.json_to_sheet(dataArr)
      // animalWS["!cols"] = wscols
      animalWS["!rows"] = [{hidden: true}]
      animalWS["!merges"] = arrMerdes

      // A workbook is the name given to an Excel file
      var wb = XLSX.utils.book_new() // make Workbook of Excel

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, animalWS, 'sheet1') // sheetAName is name of Worksheet

      // export Excel file
      XLSX.writeFile(wb, this.nameTitle + '.xlsx') // name of the file is 'book.xlsx'

    },

    getAutoEngByFilter() {
      if (this.pageSetting.releaseYear === '') {
        this.pageSetting.releaseYear = null
      }
      this.pageSetting.initRecordFrom = 1
      this.GET_ALL_AUTO(this.pageSetting);
    }
    ,
    handleCheckedColumnChange(value) {
      let checkedCount = value.length;
      this.tableColumns = []
      value.forEach(elem => {
            this.tableColumns.push(this.allTableColumns.find(item => item.label === elem))
          }
      )
      this.checkAll = checkedCount === this.columns.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.columns.length;
    }
    ,
    deleteRow(index, rows) {
      rows.splice(index, 1);
    }
    ,
    setEngineParamData(data) {
      if (this.tableHeight === 635) {
        this.tableHeight = 634
      } else {
        this.tableHeight = 635
      }
      this.engineParamData = data.columnResponseList
    }
    ,
    changePageSize(value) {
      this.pageSetting.pageSize = value
      this.pageSetting.initRecordFrom = 1
      this.GET_ALL_AUTO(this.pageSetting)
    },
    changeSearchPercent(value) {
      this.pageSetting.searchPercent = value
      this.pageSetting.initRecordFrom = 1
      this.GET_ALL_AUTO(this.pageSetting)
    }

  },
  computed: {
    ...mapGetters([
      'ALL_AUTO_ENG',
      'LOADPARAM',
      'LOAD_ALL_AUTO_ENG'
    ])
  }
  ,
  mounted() {
    // eslint-disable-next-line no-unused-vars
    document.body.oncontextmenu = function () {
      return false;
    };
    this.GET_ENGDATA_BY_PARAM(this.searchData);


    if (this.ALL_AUTO_ENG.columnParam === null) {
      this.GET_COLUMN_PARAM();
      this.GET_ALL_AUTO(this.pageSetting);
      // this.GET_COLUMN_PARAM();
    }
    this.checkedColumns = [
      '№', this.$ml.get('word.autoManufacturer'),
      this.$ml.get('word.autoModel'), this.$ml.get('word.engine'), this.$ml.get('word.releaseYear'),
      this.$ml.get('word.fuelType'),
      this.$ml.get('word.diamAndStroke'),
      this.$ml.get('word.powerKwt'),
      this.$ml.get('word.engineCapacity')
    ];
    this.columns = [
      '№', this.$ml.get('word.autoManufacturer'),
      this.$ml.get('word.autoModel'), this.$ml.get('word.engine'), this.$ml.get('word.releaseYear'),
      this.$ml.get('word.fuelType'),
      this.$ml.get('word.cylinders'), this.$ml.get('word.flapNumber'),
      this.$ml.get('word.diamAndStroke'),
      this.$ml.get('word.powerKwt'), this.$ml.get('word.engineCapacity'),
      this.$ml.get('word.superchargedType')
    ];
    this.columnOptions = [
      '№', this.$ml.get('word.autoManufacturer'),
      this.$ml.get('word.autoModel'), this.$ml.get('word.engine'), this.$ml.get('word.releaseYear'),
      this.$ml.get('word.fuelType'),
      this.$ml.get('word.flapNumber'),
      this.$ml.get('word.powerKwt'), this.$ml.get('word.engineCapacity'),
      this.$ml.get('word.superchargedType')
    ];
    this.tableColumns = [
      {key: 'id', label: '№', widthSmall: 70, widthLarge: 40},
      {key: 'autoManufacture', label: this.$ml.get('word.autoManufacturer'), widthSmall: 110, widthLarge: 70},
      {key: 'modelName', label: this.$ml.get('word.autoModel'), widthSmall: 130, widthLarge: 70},
      {key: 'engineType', label: this.$ml.get('word.engine'), widthSmall: 110, widthLarge: 200},

      {key: 'releaseYear', label: this.$ml.get('word.releaseYear'), widthSmall: 110, widthLarge: 60},
      {key: 'fuelType', label: this.$ml.get('word.fuelType'), widthSmall: 110, widthLarge: 70},
      {
        key: 'pistonDiameterAndStoke',
        label: this.$ml.get('word.diamAndStroke'),
        widthSmall: 130,
        widthLarge: 70
      },
      {key: 'powerKWT', label: this.$ml.get('word.powerKwt'), widthSmall: 110, widthLarge: 70},
      {key: 'engineCapacity', label: this.$ml.get('word.engineCapacity'), widthSmall: 130, widthLarge: 70},

    ]
    this.allTableColumns = [
      {key: 'id', label: '№', widthSmall: 70, widthLarge: 40},
      {key: 'autoManufacture', label: this.$ml.get('word.autoManufacturer'), widthSmall: 140, widthLarge: 70},
      {key: 'modelName', label: this.$ml.get('word.autoModel'), widthSmall: 130, widthLarge: 70},
      {key: 'engineType', label: this.$ml.get('word.engine'), widthSmall: 110, widthLarge: 200},
      {key: 'releaseYear', label: this.$ml.get('word.releaseYear'), widthSmall: 110, widthLarge: 60},
      {key: 'fuelType', label: this.$ml.get('word.fuelType'), widthSmall: 110, widthLarge: 70},
      {key: 'cylinderPlace', label: this.$ml.get('word.cylinders'), widthSmall: 110, widthLarge: 70},
      {key: 'flapNumber', label: this.$ml.get('word.flapNumber'), widthSmall: 110, widthLarge: 90},
      {
        key: 'pistonDiameterAndStoke',
        label: this.$ml.get('word.diamAndStroke'),
        widthSmall: 130,
        widthLarge: 70
      },
      {key: 'powerKWT', label: this.$ml.get('word.powerKwt'), widthSmall: 110, widthLarge: 70},
      {
        key: 'superchargedType',
        label: this.$ml.get('word.superchargedType'),
        widthSmall: 110,
        widthLarge: 90
      },
      {key: 'engineCapacity', label: this.$ml.get('word.engineCapacity'), widthSmall: 130, widthLarge: 70}
    ]
  }
}
</script>

<style>
.table-cont {
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.pagin-st {
  position: relative;
  top: 15px;
}

.el-table .header-st {
  background: #f5f6fa;
}

.param-navbar {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  align-items: center;
}

.warning-row {
  background: oldlace;
}

.success-row {
  background: #f0f9eb;
}

.fix-position {
  position: relative;
  top: 4px;

}


.columnHead {
  width: 100%;
  height: 120%;
}

.border-butt {
  border-style: solid;
  border-color: lightgray;
  border-width: 0px 0px 0px 2px;
}

.photo {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.title-bord {
  border-style: solid;
  border-color: lightgray;
  border-width: 0px 2px 0px 0px;
}

.dialog-photo {
  border-radius: 30px;
  background: #E4E7ED;

}

.header-st {
  padding-top: 2px !important;
  padding-bottom: 2px !important;
}

.image {
  width: 100%;
  height: 100%;
}
</style>`