<template>


<div class="input-group ">
        <div v-if="!hideTitle" class="input-group-prepend ">
            <label class="input-group-text  bg-white " style="font-weight: bold"
                   :for="'vue-list-input'+titleInput"
            >
                {{titleInput}}
            </label>
        </div>
            <input
                    v-if="holderNum===0"
                    v-model="search"
                    v-on:change="chMeth"
                    :id="'vue-list-input'+titleInput"
                    autocomplete="off"
                    class="form-control"
                    type="text"
                    placeholder=" "
                    v-on:input="onChange"
                    v-on:click="onChange"
                    v-on:keydown.down="onArrowDown"
                    v-on:keydown.up="onArrowUp"
                    v-on:keydown.enter="onEnter"
            />
            <input v-if="holderNum!==0"
                   :id="'vue-list-input'+titleInput"
                   autocomplete="off"
                   class="form-control"
                   type="text"
                   :placeholder="items.find(e=>e.id===holderNum)[indexItem]"
                   v-on:change="chMeth"
                   v-model="search"
                   v-on:input="onChange"
                   v-on:click="onChange"
                   v-on:keydown.down="onArrowDown"
                   v-on:keydown.up="onArrowUp"
                   v-on:keydown.enter="onEnter"
            />
            <ul
                    id="autocomplete-results"
                    v-show="isOpen"
                    class="autocomplete-results"
            >
                <li style="text-align: center"
                    class="loading"
                    v-if="isLoading"
                >
                    Loading results...
                </li>
                <li style="text-align: center"
                    v-else
                    v-for="(result, i) in results"
                    :key="i"
                    @click="setResult(result)"
                    class="autocomplete-result"
                    :class="{ 'is-active': i === arrowCounter }"
                >
                    {{ result[indexItem] }}
                </li>
            </ul>
        <div class="input-group-append">
            <button class="btn btn-outline-danger"
                    v-on:click="clear"
                    type="button">
                <span>&#10008;</span>
            </button>
        </div>

    </div>
</template>
<script>
    import {mapGetters} from "vuex";

    export default {
        name: 'autocomplete',

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

            async clear() {
                this.updateObj[this.index] = null;
                this.search = '';
                this.$emit("change-meth", 1);
            },
            async chMeth() {
                this.$emit("change-meth", 1);
            },
            onChange() {
                // Let's warn the parent that a change was made
                // this.$emit('input', this.search);

                // Is the data given by an outside ajax request?
                if (this.isAsync) {
                    this.isLoading = true;
                } else {
                    // Let's  our flat array
                    this.filterResults();
                    this.isOpen = true;
                }
            },

            filterResults() {
                // first uncapitalize all the things
                this.results = this.items.filter((item) => {
                    return item[this.indexItem].toLowerCase().indexOf(this.search.toLowerCase()) > -1;
                });

            },
            setResult(result) {
                this.search = result[this.indexItem];
                this.updateObj[this.index] = result.id;
                this.isOpen = false;
                this.$emit("change-meth", 1);
            },
            onArrowDown() {
                if (this.arrowCounter < this.results.length) {
                    this.arrowCounter = this.arrowCounter + 1;
                }
            },
            onArrowUp() {
                if (this.arrowCounter > 0) {
                    this.arrowCounter = this.arrowCounter - 1;
                }
            },
            onEnter() {
                this.$emit("change-meth", 1);
                this.search = this.results[this.arrowCounter][this.indexItem];
                this.updateObj[this.index] = this.results[this.arrowCounter].id;
                this.isOpen = false;
                this.arrowCounter = -1;
            },
            handleClickOutside(evt) {
                if (!this.$el.contains(evt.target)) {
                    this.isOpen = false;
                    this.arrowCounter = -1;
                }
            }
        },
        watch: {
            cleanSearch: function (val) {
                if (val !== null) {
                    this.updateObj[this.index] = null;
                    this.search = '';
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
        },
        mounted() {
            if (this.holderNum === null || this.holderNum === undefined) {
                this.holderNum = 0;
            }

            if (this.hideTitle == null) {
                this.hideTitle = false;
            }
            document.addEventListener('click', this.handleClickOutside)
        },
        destroyed() {
            document.removeEventListener('click', this.handleClickOutside)
        }
    };
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


</style>