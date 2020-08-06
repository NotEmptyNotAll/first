`
<template>
    <div>
        <div class="container search-border tab  rounded bg-white rad">


            <vue-context-menu
                    :elementId="'myFirstMenu'"
                    :options="ALL_AUTO_ENG.columnParam"
                    :ref="'vueSimpleContextMenu1'"
                    @option-clicked="optionClicked1"
            ></vue-context-menu>

            <div class="row " style="padding-top: 3vh">
                <div class="title-bord col-md-1 param-navbar">
                    <h4> {{$ml.get('word.parameters')}}</h4>
                </div>

                <div class="col-md-2 param-navbar fix-position">
                    <el-dropdown style="width: 100%" :hide-on-click="false">
                        <el-button size="medium" type="primary" style="width: 100%; font-size: 16px">
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
                <div class=" col-md-2 ">
                    <el-dropdown class="fix-position" @command="changePageSize" style="width: 100%;">
                        <el-button size="medium" type="warning" style="width: 100%; font-size: 16px">
                            {{$ml.get('word.numRowOnPage')}}{{pageSetting.pageSize}}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1"> 1 {{$ml.get('word.rows')}}</el-dropdown-item>
                            <el-dropdown-item command="3"> 3{{$ml.get('word.rows')}}</el-dropdown-item>
                            <el-dropdown-item command="5"> 5{{$ml.get('word.rows')}}</el-dropdown-item>
                            <el-dropdown-item command="10"> 10{{$ml.get('word.rows')}}</el-dropdown-item>
                            <el-dropdown-item command="15"> 15{{$ml.get('word.rows')}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="col-md-2   param-navbar">
                    <el-button size="medium" class="fix-position" plain type="danger"
                               style="width: 100%; font-size: 16px"
                               v-on:click="clearFilter">{{$ml.get('word.clearAllFilter')}}
                    </el-button>

                </div>


                <div class="col-md-5  border-butt param-navbar">
                    <el-divider content-position="right">
                        <el-button-group>
                            <el-button v-for="current in ALL_AUTO_ENG.columnParam" v-bind:key="current"
                                       plain type="info" v-on:click="setEngineParamData(current.columnResponseList)">
                                {{current.name}}
                            </el-button>
                            <el-button plain type="info"
                                       v-show="ALL_AUTO_ENG.length!==0"
                                       icon="el-icon-close"
                                       @click="setCurrent()"
                                       v-on:click="setEngineParamData(null)">
                            </el-button>
                        </el-button-group>
                    </el-divider>
                </div>
            </div>
            <hr/>
            <br/>
            <div class="table-cont">
                <el-table
                        v-loading="LOAD_ALL_AUTO_ENG"
                        id="lol"
                        stripe
                        :empty-text="$ml.get('word.empty')"
                        border
                        ref="paramTable"
                        :data="ALL_AUTO_ENG.engineData"
                        highlight-current-row
                        max-height="600"
                        @current-change="handleCurrentChange"
                        @row-contextmenu="handleClick1"
                        :header-cell-style="handleHeaderStyle"
                        style="width: 100%"
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
                    >

                        <template slot="header">
                            <h5>{{clmn.label}}</h5>
                            <filter-input
                                    v-show="clmn.key!=='id'"
                                    :place-hold="$ml.get('word.filter')"
                                    :save-parameters="pageSetting"
                                    :index="clmn.key"
                                    @on-input-action="getAutoEngByFilter"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column resizable align="center"
                                     v-show="engineParamData!==null"
                                     v-for="mainColumn in engineParamData"
                                     v-bind:key="mainColumn" :label="mainColumn.name"
                                     :prop="mainColumn.color"
                    >
                        <el-table-column
                                resizable
                                align="center"
                                v-for="column in mainColumn.columnList"
                                v-bind:key="column"
                                :label="column.name"
                                :prop="column.color"
                                min-width="310">
                            <template slot="header">
                                <div>
                                    <h5>{{column.name}}</h5>
                                </div>
                            </template>
                            <template slot-scope="scope">
                                <span v-show="column.columnList[0]===undefined" style="margin-left: 10px"><h4>{{ scope.row[column.id] }}</h4></span>
                                <span v-show="column.columnList[0]!==undefined && scope.row[col.id]!==undefined"
                                      v-for="col in column.columnList"
                                      v-bind:key="col">
                                    <h6><strong>{{col.name+": "}}</strong>{{scope.row[col.id]}}</h6><hr>
                                </span>
                                <el-button v-show="scope.row['listImage'+column.id]!==undefined"
                                           type="text" @click="showImage(scope.row['listImage'+column.id])">{{$ml.get('word.showPhoto')}}
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
            <el-carousel  arrow="always"  height="60vh" style="background: lightgray">
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
    // eslint-disable-next-line no-unused-vars
    import json2xls from "json2xls";
    // eslint-disable-next-line no-unused-vars
    import fs from "fs";
    // eslint-disable-next-line no-unused-vars
    import pdfMake from "pdfmake/build/pdfmake";
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
                column: [
                    'selected',
                    'sku',
                ],
                options: {},
                listFileUrl:[],
                columnOptions: [],
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
                pageSetting: {
                    id: null,
                    flapNumber: null,
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
                    pageSize: 3
                },
                lengHeadNameArr: 0,
                test: null,
                test1: null,
                inputFilds: []
            }
        },
        methods: {
            ...mapActions([
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
            showImage(list){
                this.listFileUrl=list
                this.dialogFormVisible = true
            },
            // eslint-disable-next-line no-unused-vars
            handleHeaderStyle({row, column, rowIndex, columnIndex}) {
                return 'background-color: ' + column.property + ';'
            },
            setCurrent(row) {
                this.$refs.paramTable.setCurrentRow(row);
            },
            clearFilter() {

                this.pageSetting = {
                    id: null,
                    flapNumber: null,
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
                    initRecordFrom: this.pageSetting.initRecordFrom,
                    pageSize: this.pageSetting.pageSize
                }
                this.GET_ALL_AUTO(this.pageSetting);
            },
            handleClick1(row, column, event) {
                this.$refs.vueSimpleContextMenu1.showMenu(event, row)
            },
            // eslint-disable-next-line no-unused-vars
            closeDialog(){
                this.listFileUrl=[]
                this.dialogFormVisible=false
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
                        let widthClmns = [100];
                        let lengHeadNameArr = 0
                        elem.columnList.map(item => {
                            item.columnList.map(e => {
                                if (headNameParamClmns.find(t => t.text === e.name) === undefined && event.item[e.id] !== undefined) {
                                    headNameParamClmns.push({text: e.name, id: e.id})
                                    lengHeadNameArr++
                                }
                            })
                        })
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
                            tempHeadName.push({text: this.getGeneralName(headNameParamClmns), style: 'nameElem'})
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
                                    tempArr.push({text: event.item[e.id], bold: true})
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
                    footer: function (currentPage, pageCount) {
                        if (currentPage === pageCount) {
                            return {
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
                        } else {
                            return {
                                text: ''
                            }
                        }
                    },


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
            getAutoEngByFilter() {
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
                this.engineParamData = data
            }
            ,
            changePageSize(value) {
                this.pageSetting.pageSize = value
                this.pageSetting.initRecordFrom = 1
                this.GET_ALL_AUTO(this.pageSetting)
            }
        },
        computed: {
            ...
                mapGetters([
                    'ALL_AUTO_ENG',
                    'LOAD_ALL_AUTO_ENG'
                ])
        }
        ,
        mounted() {
            // eslint-disable-next-line no-unused-vars
            document.body.oncontextmenu = function () {
                return false;
            };

            if (this.ALL_AUTO_ENG.length === 0) {
                this.GET_ALL_AUTO(this.pageSetting);
            }
            this.checkedColumns = [
                '№', this.$ml.get('word.engine'), this.$ml.get('word.autoManufacturer'),
                this.$ml.get('word.autoModel'), this.$ml.get('word.releaseYear'),
                this.$ml.get('word.fuelType'),
                this.$ml.get('word.cylinders'), this.$ml.get('word.flapNumber'), this.$ml.get('word.pistonDiameter')
            ];
            this.columns = [
                '№', this.$ml.get('word.engine'), this.$ml.get('word.autoManufacturer'),
                this.$ml.get('word.autoModel'), this.$ml.get('word.releaseYear'),
                this.$ml.get('word.fuelType'),
                this.$ml.get('word.cylinders'), this.$ml.get('word.flapNumber'),
                this.$ml.get('word.pistonDiameter'),
                this.$ml.get('word.pistonStroke'),
                this.$ml.get('word.engineCapacity'), this.$ml.get('word.powerKwt'),
                this.$ml.get('word.superchargedType')
            ];
            this.columnOptions = [
                '№', this.$ml.get('word.engine'), this.$ml.get('word.autoManufacturer'),
                this.$ml.get('word.autoModel'), this.$ml.get('word.releaseYear'),
                this.$ml.get('word.fuelType'),
                this.$ml.get('word.cylinders'), this.$ml.get('word.flapNumber'),
                this.$ml.get('word.pistonDiameter'),
                this.$ml.get('word.pistonStroke'),
                this.$ml.get('word.engineCapacity'), this.$ml.get('word.powerKwt'),
                this.$ml.get('word.superchargedType')
            ];
            this.tableColumns = [
                {key: 'id', label: '№', widthSmall: 30, widthLarge: 40},
                {key: 'engineType', label: this.$ml.get('word.engine'), widthSmall: 110, widthLarge: 200},
                {key: 'autoManufacture', label: this.$ml.get('word.autoManufacturer'), widthSmall: 80, widthLarge: 70},
                {key: 'modelName', label: this.$ml.get('word.autoModel'), widthSmall: 80, widthLarge: 70},
                {key: 'releaseYear', label: this.$ml.get('word.releaseYear'), widthSmall: 80, widthLarge: 60},
                {key: 'fuelType', label: this.$ml.get('word.fuelType'), widthSmall: 80, widthLarge: 70},
                {key: 'cylinderPlace', label: this.$ml.get('word.cylinders'), widthSmall: 110, widthLarge: 70},
                {key: 'flapNumber', label: this.$ml.get('word.flapNumber'), widthSmall: 80, widthLarge: 90},
                {key: 'superchargedType', label: this.$ml.get('word.superchargedType'), widthSmall: 80, widthLarge: 90}]
            this.allTableColumns = [
                {key: 'id', label: '№', widthSmall: 30, widthLarge: 40},
                {key: 'engineType', label: this.$ml.get('word.engine'), widthSmall: 110, widthLarge: 200},
                {key: 'autoManufacture', label: this.$ml.get('word.autoManufacturer'), widthSmall: 140, widthLarge: 70},
                {key: 'modelName', label: this.$ml.get('word.autoModel'), widthSmall: 80, widthLarge: 70},
                {key: 'releaseYear', label: this.$ml.get('word.releaseYear'), widthSmall: 80, widthLarge: 60},
                {key: 'fuelType', label: this.$ml.get('word.fuelType'), widthSmall: 80, widthLarge: 70},
                {key: 'cylinderPlace', label: this.$ml.get('word.cylinders'), widthSmall: 110, widthLarge: 70},
                {key: 'flapNumber', label: this.$ml.get('word.flapNumber'), widthSmall: 80, widthLarge: 90},
                {key: 'pistonDiameter', label: this.$ml.get('word.pistonDiameter'), widthSmall: 90, widthLarge: 70},
                {key: 'pistonStroke', label: this.$ml.get('word.pistonStroke'), widthSmall: 80, widthLarge: 70},
                {key: 'engineCapacity', label: this.$ml.get('word.engineCapacity'), widthSmall: 80, widthLarge: 70},
                {key: 'powerKwt', label: this.$ml.get('word.powerKwt'), widthSmall: 80, widthLarge: 70},
                {key: 'superchargedType', label: this.$ml.get('word.superchargedType'), widthSmall: 80, widthLarge: 90}]
        }
    }
</script>

<style >

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
    .dialog-photo{
        background: lightgray;
    }
.image{
    width: 100%;
height: 100%;
}
</style>`