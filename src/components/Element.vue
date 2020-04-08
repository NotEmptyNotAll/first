<template>
    <div class="Elements">
        <div class="card">
            <div class="card-header" :id="elem.name+index+'1'">
                <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" aria-expanded="false"
                            :data-target="'#'+elem.name+index"
                            :aria-controls="elem.name+index">
                        {{elem.name}}
                    </button>
                    <button type="button" class="btn btn-outline-info"
                            data-toggle="modal" data-target=".bd-example-modal-lg"
                            v-on:click="getParamtrs(elem.id)"> параметри елемента
                    </button>
                </h5>
            </div>
<!--recursive element to represent the element tree. When pressed, displays the parameters.-->
            <div :id="elem.name+index" class="collapse " :aria-labelledby="elem.name+index+'1'"
                 :data-parent="'#'+elem.name+index">
                <div class="card-body">
                    <Element
                            v-for="(child,subIndex) in elem.elementsCh"
                            v-bind:elem="child"
                            :key="child"
                            :index="subIndex+index"
                    />

                </div>
            </div>
        </div>

    </div>
</template>

<script>

    export default {

        name: "Element",
        components: {},
        props: {
            elem: null,
            index: {
                type: Number
            }
        },
        data: () => {
        },
        computed: {},
        methods: {
            async getParamtrs(number) {
                this.$parent.getParamtrs(number);
            }
        },
        watch: {},
        mounted() {
        }
    }
</script>


<style>

</style>