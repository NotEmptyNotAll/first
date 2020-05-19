<template>
    <div class="input-group ">
        <div v-if="!hideTitle" class="input-group-prepend ">
            <label class="input-group-text  text-white bg-dark"
                   :for="'vue-list-input'+titleInput"
            >
                {{titleInput}}
                <div v-if="LOADPARAM" class="lds-dual-ring"></div>
            </label>
        </div>
        <input :id="'vue-list-input'+titleInput"
               autocomplete="off"
               class="form-control"
               type="text"
               :placeholder="$ml.get('word.data')"
               @input="onChange"
               @click="onChange"
               v-model="search"
               @keydown.down="onArrowDown"
               @keydown.up="onArrowUp"
               @keydown.enter="onEnter"
        />
        <ul
                id="autocomplete-results"
                v-show="isOpen"
                class="autocomplete-results"
        >
            <li
                    class="loading"
                    v-if="isLoading"
            >
                Loading results...
            </li>
            <li
                    v-else
                    v-for="(result, i) in results"
                    :key="i"
                    @click="setResult(result)"
                    class="autocomplete-result"
                    :class="{ 'is-active': i === arrowCounter }"
            >
                {{ result.data }}
            </li>
        </ul>

        <div class="input-group-append">
            <button class="btn btn-outline-danger"
                    v-on:click="search=null"
                    type="button">
                <span>&#10008;</span>
            </button>
        </div>

    </div>

</template>
<script>

    export default {
        name: 'autocomplete',

        props: {
            hideTitle: Boolean,
            titleInput: String,
            updateObj: Object,
            index: String,
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

        methods: {

            onChange() {
                // Let's warn the parent that a change was made
                this.$emit('input', this.search);

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
                    return item.data.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
                });
            },
            setResult(result) {
                this.search = result.data;
                this.updateObj[this.index] = result.id;
                this.isOpen = false;
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
                this.search = this.results[this.arrowCounter];
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
            items: function (val, oldValue) {
                // actually compare them
                if (val.length !== oldValue.length) {
                    this.results = val;
                    this.isLoading = false;
                }
            },
        },
        mounted() {
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
        left: 34%;
        background: white;
        opacity: 95%;
        z-index: 999;
        padding: 0;
        margin: 0;
        border: 1px solid #eeeeee;
        height: 120px;
        overflow: auto;
        width: 63%;
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