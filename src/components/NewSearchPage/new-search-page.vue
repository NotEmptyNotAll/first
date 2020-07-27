<template>
    <div>

        <div class="container search-border tab  rounded bg-white rad">
            <div class="row" style="padding-top: 3vh">
                <div class=" col-md-1">
                </div>
                <div class="title-bord col-md-1">
                    <h4> {{$ml.get('word.parameters')}}</h4>
                </div>

                <div class="col-md-1">
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
                <div class="col-md-1">
                    <el-button size="medium" plain type="danger" style="width: 100%; font-size: 16px"
                               v-on:click="onexport">
                        clear
                    </el-button>
                </div>
                <div class="col-md-7">
                    <el-button-group>
                        <el-button v-for="current in ALL_AUTO_ENG.columnParam" v-bind:key="current"
                                   plain type="info" v-on:click="setEngineParamData(current.columnResponseList)">
                            {{current.name}}
                        </el-button>
                        <el-button plain type="info"
                                   v-show="ALL_AUTO_ENG.length!==0"
                                   icon="el-icon-close"
                                   v-on:click="setEngineParamData(null)">
                        </el-button>
                    </el-button-group>

                </div>
            </div>
            <hr style="width: 90%"/>
            <br/>
            <div v-if="!LOAD_ALL_AUTO_ENG" class="table-cont">
                <el-table
                        border
                        :data="ALL_AUTO_ENG.engineData"
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
                    </el-table-column>
                    <el-table-column resizable align="center"
                                     v-show="engineParamData!==null"
                                     v-for="mainColumn in engineParamData"
                                     v-bind:key="mainColumn" :label="mainColumn.name">
                        <el-table-column
                                resizable
                                align="center"
                                v-for="column in mainColumn.columnList"
                                v-bind:key="column"
                                :label="column.name"
                                min-width="270">
                            <template slot-scope="scope">
                                <span v-show="column.columnList[0]===undefined" style="margin-left: 10px"><h4>{{ scope.row[column.id] }}</h4></span>
                                <span v-show="column.columnList[0]!==undefined && scope.row[col.id]!==undefined"
                                      v-for="col in column.columnList"
                                      v-bind:key="col"
                                      style="margin-left: 10px"><strong>{{col.name+": "}}</strong>{{scope.row[col.id]}} <hr></span>

                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table>
                <el-pagination
                        class="pagin-st"
                        background
                        layout="prev, pager, next"
                        :total="1000">
                </el-pagination>
            </div>

            <div v-if="LOAD_ALL_AUTO_ENG" class="lds-dual-ring-black"
                 style="position: absolute;bottom: 0vh; right: 50%; "></div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "new-search-page",
        methods: {
            ...mapActions([
                'GET_ALL_AUTO'
            ]),
            // eslint-disable-next-line no-unused-vars
            tableRowClassName({row, rowIndex}) {
                return 'header-st';

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
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            setEngineParamData(data) {
                this.engineParamData = data
            }
        },
        computed: {
            ...mapGetters([
                'ALL_AUTO_ENG',
                'LOAD_ALL_AUTO_ENG'
            ])
        },
        mounted() {

            if (this.ALL_AUTO_ENG.length === 0) {
                this.GET_ALL_AUTO();
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
                {key: 'id', label: '№', widthSmall: 30,widthLarge: 40},
                {key: 'engineType', label: this.$ml.get('word.engine'), widthSmall: 110,widthLarge: 200},
                {key: 'autoManufacture', label: this.$ml.get('word.autoManufacturer'), widthSmall: 80,widthLarge: 70},
                {key: 'modelName', label: this.$ml.get('word.autoModel'), widthSmall: 80,widthLarge: 70},
                {key: 'releaseYear', label: this.$ml.get('word.releaseYear'), widthSmall: 80,widthLarge: 60},
                {key: 'fuelType', label: this.$ml.get('word.fuelType'), widthSmall: 80,widthLarge: 70},
                {key: 'cylinderPlace', label: this.$ml.get('word.cylinders'), widthSmall: 110,widthLarge: 70},
                {key: 'flapNumber', label: this.$ml.get('word.flapNumber'), widthSmall: 80,widthLarge: 90},
                {key: 'superchargedType', label: this.$ml.get('word.superchargedType'),widthSmall: 80,widthLarge: 90}]
            this.allTableColumns = [
                {key: 'id', label: '№', widthSmall: 30,widthLarge: 40},
                {key: 'engineType', label: this.$ml.get('word.engine'), widthSmall: 110,widthLarge: 200},
                {key: 'autoManufacture', label: this.$ml.get('word.autoManufacturer'), widthSmall: 140,widthLarge: 70},
                {key: 'modelName', label: this.$ml.get('word.autoModel'), widthSmall: 80,widthLarge: 70},
                {key: 'releaseYear', label: this.$ml.get('word.releaseYear'), widthSmall: 80,widthLarge: 60},
                {key: 'fuelType', label: this.$ml.get('word.fuelType'), widthSmall: 80,widthLarge: 70},
                {key: 'cylinderPlace', label: this.$ml.get('word.cylinders'), widthSmall: 110,widthLarge: 70},
                {key: 'flapNumber', label: this.$ml.get('word.flapNumber'), widthSmall: 80,widthLarge: 90},
                {key: 'pistonDiameter', label: this.$ml.get('word.pistonDiameter'), widthSmall: 90,widthLarge: 70},
                {key: 'pistonStroke', label: this.$ml.get('word.pistonStroke'), widthSmall: 80,widthLarge: 70},
                {key: 'engineCapacity', label: this.$ml.get('word.engineCapacity'), widthSmall: 80,widthLarge: 70},
                {key: 'powerKwt', label: this.$ml.get('word.powerKwt'),widthSmall: 80,widthLarge: 70},
                {key: 'superchargedType', label: this.$ml.get('word.superchargedType'),widthSmall: 80,widthLarge: 90}]
        },
        data() {
            return {
                columnOptions: [],
                columns: [],
                checkAll: false,
                tableColumns: [],
                checkedColumns: [],
                allTableColumns: [],
                engineParamData: null,
                isIndeterminate:true
            }
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

    .title-bord {
        text-align: center;
        position: relative;
        right: 1vw;
        display: flex;
        align-items: center;
        border-style: solid;
        border-color: lightgray;
        border-width: 0px 2px 0px 0px;
    }
</style>