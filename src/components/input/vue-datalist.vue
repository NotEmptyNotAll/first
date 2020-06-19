<template>
    <div class="input-group ">

        <el-autocomplete
                v-if="holderNum===0"
                clearable
                style="width: 100%"
                class="inline-input"
                v-model="state1"
                :fetch-suggestions="querySearch"
                :placeholder="$ml.get('word.data')"
                @select="handleSelect"
        >
            <template v-if="!hideTitle" slot="prepend">
                <strong class="title" style="font-size: 15px">{{titleInput}}</strong>
            </template>
        </el-autocomplete>
        <el-autocomplete
                v-if="holderNum!==0"
                clearable
                style="width: 100%"
                class="inline-input"
                v-model="state1"
                :fetch-suggestions="querySearch"
                :placeholder="items.find(e=>e.id===holderNum)[indexItem]"
                @select="handleSelect"
        >
            <template v-if="!hideTitle" slot="prepend">
                <strong class="title" style="font-size: 15px">{{titleInput}}</strong>
            </template>

        </el-autocomplete>

    </div>
</template>
<script>
    import {mapGetters} from "vuex";

    export default {
        name: "vue-data-list-02",

        props: {
            holderNum: Number,
            hideTitle: Boolean,
            titleInput: String,
            updateObj: Object,
            index: String,
            indexItem: {
                default: () => 'data',
            },
            items: {
                type: Array,
                required: false,
                default: () => [],
            },
            isAsync: {
                type: Boolean,
                required: false,
                default: false,
            },
            cleanSearch: null,
            tp: []
        },

        data() {
            return {
                state1: '',
                state2: '',
                isOpen: false,
                results: [],
                search: '',
                isLoading: false,
                arrowCounter: 0,
            };
        },
        computed: {
            ...mapGetters(['LOADPARAM'])
        },
        methods: {

            querySearch(queryString, cb) {
                var results = [];
                this.items.filter((item) => {
                    return item[this.indexItem].toLowerCase().indexOf(queryString.toLowerCase()) > -1;
                }).map(elem => {
                    let obj = {}
                    obj.value = elem[this.indexItem]
                    results.push(obj)
                })

                // call callback function to return suggestions

                cb(results);
            },
            createFilter(queryString) {
                return (link) => {
                    return (link.data.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
            }
        },
        watch: {
            state1: function (val) {
                if (val !== "") {
                    let temp = this.items.find(elem => elem[this.indexItem] === val)
                    if (temp !== undefined) {
                        this.updateObj[this.index] = temp.id
                        this.$emit("change-meth", 1);
                    }
                } else {
                    this.updateObj[this.index] = null
                    this.$emit("change-meth", 1);
                }
            },
            cleanSearch: function (val) {
                if (val !== null) {
                    this.updateObj[this.index] = null;
                    this.state1 = '';
                    this.$emit("change-meth", 1);
                }
            },
            items: function (val, oldValue) {
                // actually compare them
                if (val.length !== oldValue.length) {
                    this.results = val;
                    this.isLoading = false;
                }
            },
        }
        ,
        mounted() {

            if (this.holderNum === null || this.holderNum === undefined) {
                this.holderNum = 0;
            }

            if (this.hideTitle == null) {
                this.hideTitle = false;
            }
            document.addEventListener('click', this.handleClickOutside)
        }
        ,
        destroyed() {
            document.removeEventListener('click', this.handleClickOutside)
        }
    }
    ;
</script>

<style>


    .autocomplete-results {
        color: #272e38;
        position: absolute;
        background: white;
        z-index: 999;
        padding: 0;
        border: 1px solid #eeeeee;
        height: 130px;
        overflow: auto;
        width: 90%;
        top: 100%;
    }


    .autocomplete-result {
        list-style: none;
        text-align: left;
        padding: 4px 2px;
        cursor: pointer;
    }

    .autocomplete-result.is-active,
    .autocomplete-result:hover {
        background-color: #4AAE9B;
        color: white;
    }

    .cancel-btn {
        background: white;
    }

    .title {
        color: dimgrey;
    }

</style>