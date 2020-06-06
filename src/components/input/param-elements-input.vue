<template>
    <div class="input-group ">
        <div v-if="!hideTitle" class="input-group-prepend " >
            <label class="input-group-text    bg-white " style="font-weight: bold; "
                   :for="'vue-list-input'+titleInput"
            >
                {{titleInput}}
                <div v-if="LOADPARAM" class="lds-dual-ring-black"></div>
            </label>
        </div>
        <input
                v-model="search"
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
        <ul style="margin-left:13%;width: 40%"
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
                {{ result.name }}
            </li>
        </ul>

        <input v-if="!showChildInput"
               disabled
               autocomplete="off"
               class="form-control"
               type="text"
        />
        <input v-if="showChildInput"
               v-model="searchChild"
               placeholder=" "
               v-on:input="onChangeChild"
               v-on:click="onChangeChild"
               v-on:keydown.down="onArrowDownChild"
               v-on:keydown.up="onArrowUpChild"
               v-on:keydown.enter="onEnterChild"
               autocomplete="off"
               class="form-control"
               type="text"
        />
        <ul style="margin-left:53%;width: 40%"
            id="autocomplete"
            v-show="isOpenChild"
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
                v-for="(results, i) in resultsChild"
                :key="i"
                @click="setResultChild(results)"
                class="autocomplete-result"
                :class="{ 'is-active': i === arrowCounterChild }"
            >
                {{ results.name }}
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
        name: "param-elements-input",
        props: {
            hideTitle: Boolean,
            titleInput: String,
            paramObj: null,
            indexNodeId: null,
            indexChildId: null,
            index: String,
            items: {
                type: Array,
                required: false,
                default: () => []
            },
            isAsync: {
                type: Boolean,
                required: false,
                default: false,
            },
            tp: []
        },

        data() {
            return {
                showChildInput: false,
                isOpen: false,
                isOpenChild: false,
                childItem:[],
                results: [],
                resultsChild: [],
                search: '',
                searchChild: '',
                isLoading: false,
                arrowCounter: 0,
                arrowCounterChild: 0,
            };
        },
        computed: {
            ...mapGetters(['LOADPARAM'])
        },
        methods: {

            async clear() {
                this.paramObj[this.indexNodeId]=null;
                this.paramObj[this.indexChildId]=null;
                this.search = '';
                this.searchChild = '';
                this.showChildInput=false;
            },
            onChange() {
                // Let's warn the parent that a change was made
                // this.$emit('input', this.search);

                // Is the data given by an outside ajax request?
                if(this.search===''){
                    this.paramObj[this.indexNodeId]=null;
                    this.showChildInput=false;
                }
                if (this.isAsync) {
                    this.isLoading = true;
                } else {
                    // Let's  our flat array
                    this.filterResults();
                    this.isOpen = true;
                }
            },
            onChangeChild() {
                // Let's warn the parent that a change was made
                // this.$emit('input', this.search);

                // Is the data given by an outside ajax request?

                    // Let's  our flat array
                    this.filterResultsChild();
                    this.isOpenChild = true;

            },

            filterResults() {
                // first uncapitalize all the things
                this.results = this.items.filter((item) => {
                    return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
                });

            },
            filterResultsChild() {
                // first uncapitalize all the things
                this.resultsChild = this.childItem.filter((item) => {
                    return item.name.toLowerCase().indexOf(this.searchChild.toLowerCase()) > -1;
                });

            },
            setResult(result) {
                this.search = result.name;
                this.paramObj[this.indexNodeId] = result.id;
                this.showChildInput = true;
                this.searchChild='',
                this.childItem=result.paramNameResponseList;
                this.isOpen = false;
            },
            setResultChild(result) {
                this.searchChild = result.name;
                this.paramObj[this.indexChildId] = result.id;
                this.isOpenChild = false;
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
            onArrowDownChild() {
                if (this.arrowCounterChild < this.resultsChild.length) {
                    this.arrowCounterChild = this.arrowCounterChild + 1;
                }
            },
            onArrowUpChild() {
                if (this.arrowCounterChild > 0) {
                    this.arrowCounterChild = this.arrowCounterChild - 1;
                }
            },
            onEnter() {
                this.search = this.results[this.arrowCounter].name;
                this.paramObj[this.indexNodeId] = this.results[this.arrowCounter].id;
                this.showChildInput = true;
                this.childItem=this.results[this.arrowCounter].paramNameResponseList;
                this.isOpen = false;
                this.arrowCounter = -1;
            },
            onEnterChild() {
                this.searchChild = this.resultsChild[this.arrowCounterChild].name;
                this.paramObj[this.indexChildId] = this.resultsChild[this.arrowCounterChild].id;
                this.isOpenChild = false;
                this.arrowCounterChild = -1;
            },
            handleClickOutside(evt) {
                if (!this.$el.contains(evt.target)) {
                    this.isOpen = false;
                    this.isOpenChild=false;
                    this.arrowCounter = -1;
                    this.arrowCounterChild = -1;
                }
            }

        },
        watch: {

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
    }
</script>

<style scoped>

</style>