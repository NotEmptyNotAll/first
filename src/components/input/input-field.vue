<template>
    <div class="input-field">


        <div  class="input-group">
            <el-input v-show="!number"
                    v-model="saveParameters[index]"
                    :placeholder="$ml.get('word.data')"
                    clearable>
                <template   slot="prepend">   <strong class="title" style="font-size: 15px">{{nameInput}}</strong></template>
            </el-input>

        </div>

        <div  class="input-group">
            <el-input v-show="number"
                      :max="max"
                      :min="min"
                      type="number"
                      v-model="saveParameters[index]"
                      :placeholder="$ml.get('word.data')"
                      clearable>
                <template   slot="prepend">   <strong class="title" style="font-size: 15px">{{nameInput}}</strong></template>
            </el-input>

        </div>




    </div>
</template>

<script>
    export default {
        name: "input-field",
        components: {},
        data: () => ({
            saveDataObj: {
                saveData: null
            }
        }),
        props: {
            number: {
                type: Boolean,
                default: false
            },
            min:{
                type: Number,
                default: 0
            },
            max:{
                type: Number,
                default: 99999999
            },
            nameInput: String,
            dataList: [],
            loadStatus: null,
            saveParameters:Object,
            index:String,
            cleanSearch: null
        },
        computed: {},
        methods: {
            async saveEngManufacture(number) {
                if (this.saveDataObj.saveData != null) {
                    this.$emit("save-data-api", this.saveDataObj)
                }
                console.log(number)
            }
        },
        watch: {
            cleanSearch:function(val){
                if(val!==null){
                    this.search=''
                }
            },
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .title{
        color: dimgrey;
    }
</style>