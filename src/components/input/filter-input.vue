<template>
    <div class="input-field">


        <div class="input-group">
            <el-input
                      v-model="saveParameters[index]"
                      :placeholder="$ml.get('word.filter')"
                      size="small"
                      prefix-icon="el-icon-search"
                      clearable
                      @change="onInputAction"
            >
            </el-input>

        </div>

    </div>
</template>

<script>
    export default {
        name: "filter-input",
        components: {},
        data: () => ({
            saveDataObj: {
                saveData: null
            }
        }),
        props: {
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
            nameInput: String,
            dataList: [],
            loadStatus: null,
            saveParameters: Object,
            index: String,
            cleanSearch: null
        },
        computed: {},

        methods: {
            onInputAction(){
                this.$emit("on-input-action");
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
        }
    }
</script>

<style scoped>


    .title {
        color: dimgrey;
    }
</style>