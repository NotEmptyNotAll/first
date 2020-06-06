<template>
    <div class="input-field">
        <div class="input-group">
            <div class="input-group-prepend">
                <label class="input-group-text  bg-white " for="fuelTypeFk" style="font-weight: bold">
                    {{nameInput}}
                    <div v-if="loadStatus" class="lds-dual-ring"></div>
                </label>
            </div>
            <input id="fuelTypeFk"
                   v-model="saveParameters[index]"
                   autocomplete="off" type="text"
                   class="form-control"
                   :placeholder="$ml.get('word.data')"
                   aria-describedby="button-addon1">
            <div class="input-group-append">
                <button class="btn btn-outline-danger"
                        v-on:click="saveParameters[index]=null"
                        type="button">
                    <span>&#10008;</span>
                </button>
            </div>
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

</style>