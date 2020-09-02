<template>

    <div v-if="!paramListMod" class="input-group">
        <el-input
                v-model="saveParameters[index]"
                ref="inp1"
                :placeholder="$ml.get('word.filter')"
                size="small"
                prefix-icon="el-icon-search"
                clearable
                @change="onInputAction"
        >
        </el-input>
    </div>
    <div v-else class="input-group">
        <el-input v-if="paramSizeList.length>0"
                  ref="inp2"
                  v-model="inputValue"
                  :disabled="paramSize===''"
                  class="input-with-select"
                  :placeholder="$ml.get('word.filter')"
                  size="small"
                  clearable
                  @change="onInputAction"
        >
            <el-select  slot="prepend" v-model="paramSize"
                        :clearable="inputValue===''"
                       :placeholder="$ml.get('word.choose')">
                <el-option
                        v-for="item in paramSizeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
        </el-input>
        <el-input v-else
                  ref="inp3"
                  v-model="inputValue"
                  :placeholder="$ml.get('word.filter')"
                  size="small"
                  prefix-icon="el-icon-search"
                  clearable
                  @change="onInputAction"
        >
        </el-input>
    </div>

</template>

<script>
    export default {
        name: "filter-input",
        components: {},
        data: () => ({
            saveDataObj: {
                saveData: null
            },
            inputValue: '',
            paramSize: ''
        }),
        props: {
            paramSizeList: {
                type: Array
            },
            paramListMod: {
                type: Boolean,
                default: false
            },
            placeHold: {
                type: String,
                default: ""
            },
            number: {
                type: Boolean,
                default: false
            },
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 99999999
            },
            bus:{
                type:Object
            },
            nameInput: String,
            dataList: [],
            loadStatus: null,
            saveParameters: Object,
            index: String,
            cleanSearch: null
        },
        computed: {},

        methods: {
            clear(){
                this.inputValue = ''
                this.paramSize = ''
                this.saveParameters[this.index] = ''
            },
            onInputAction() {
                if (!this.paramListMod) {
                    this.$emit("on-input-action");
                } else {
                    if (this.paramSizeList.length === 0) {
                        let temp = this.saveParameters.paramList.find(item => item.parameterChildId === this.index)
                        if (temp === undefined) {
                            this.saveParameters.paramList.push({
                                parameterChildId: this.index,
                                parameterNumber: this.inputValue
                            })
                        } else {
                            temp.parameterNumber = this.inputValue
                        }
                    } else {
                        let temp = this.saveParameters.paramList.find(item =>
                            item.parameterChildId === this.paramSize && item.parameterNodeId===this.index)
                        if (temp === undefined) {
                            this.saveParameters.paramList.push({
                                parameterChildId: this.paramSize,
                                parameterNodeId: this.index,
                                parameterNumber: this.inputValue
                            })
                        } else {
                            temp.parameterNumber = this.inputValue
                        }
                    }
                    this.$emit("on-input-action");
                }
            },
            async saveEngManufacture(number) {
                if (this.saveDataObj.saveData != null) {
                    this.$emit("save-data-api", this.saveDataObj)
                }
                console.log(number)
            }
        },
        watch: {
            cleanSearch: function (val) {
                if (val !== null) {
                    this.search = ''
                }
            },
        },
        mounted() {
            this.bus.$on('clear', this.clear)
        }
    }
</script>

<style>
    .input-with-select input  {
        cursor: pointer !important;
    }

    .input-with-select i {
        cursor: pointer !important;
    }

    .el-select .el-input {
        width: 175px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

    .title {
        color: dimgrey;
    }
</style>