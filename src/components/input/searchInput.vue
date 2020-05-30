<template>
    <div class="input-group ">
        <div class="input-group-prepend ">
            <label class="input-group-text   "
                   for="vue-list-input1"
            >{{titleInput}}</label>
        </div>
        <input
                v-model="search"
                id="vue-list-input1"
                autocomplete="off"
                class="form-control"
                type="text"
                placeholder=" "
                v-on:input="onChange"
                v-on:click="onChange"

        />
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
        name: "searchInput",
        props: {
            titleInput: String,
            items: {
                type: Array,
                required: false,
                default: () => [],
            },
            changList: [],

        },
        data() {
            return {
                search: '',
                temp: []

            };
        },
        computed: {
            ...mapGetters(['LOADPARAM'])
        },
        methods: {

            async clear() {
                this.search = '';
                this.filterResults();
            },
            onChange() {
                this.filterResults();


            }, filterResults() {
                // first uncapitalize all the things
                this.temp = this.items.filter((item) => {
                    return item.data.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
                });
                this.$emit("set-list", this.temp);

            }

        },
        watch: {},
        mounted() {

        },
        destroyed() {
        }

    }
</script>

<style>

</style>