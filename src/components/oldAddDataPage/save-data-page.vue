<template>
    <div>
        <error-page
                v-if="!currentUser"
        />
        <div id="savePage" v-if="currentUser">
            <div class="row mainRow">
                <add-engine-data-panel
                        class="col-md-12"
                        :name-panel="$ml.get('word.engine')"
                        :load-status="LOAD_SAVE.engine"
                        @save-data-api="SAVE_DATA_ENGINE"
                        @update-data-api="UPDATE_DATA_ENGINE"
                />
            </div>
            <div class="row mainRow">
                <save-data-panel
                        class="col-md-3"
                        :name-panel="$ml.get('word.cylinders')"
                        :load-status="LOAD_SAVE.cylinders"
                        :data-list="ADDITIONAL_DATA.cylinders"
                        @save-data-api="SAVE_DATA_CYLINDERS"
                        @update-data-api="UPDATE_DATA_CYLINDERS"
                />
                <save-data-panel
                        class="col-md-3"
                        :name-panel="$ml.get('word.fuelType')"
                        :load-status="LOAD_SAVE.fuelType"
                        :data-list="ADDITIONAL_DATA.fuelType"
                        @save-data-api="SAVE_DATA_FUEL_TYPE"
                        @update-data-api="UPDATE_DATA_FUEL_TYPE"
                />

                <two-param-save-panel
                        class="col-md-3"
                        :name-panel="$ml.get('word.superchargedType')"
                        :title_one="$ml.get('word.title')"
                        :title_two="$ml.get('word.mark')"
                        :data-list="ADDITIONAL_DATA.superchargeType"
                        :load-status="LOAD_SAVE.superchargedType"
                        @save-data-api="SAVE_DATA_SUPERCHARGE_TYPE"
                        @update-data-api="UPDATE_DATA_SUPERCHARGE_TYPE"
                />
                <save-data-panel
                        class="col-md-3"
                        :name-panel="$ml.get('word.engineManufacture')"
                        :data-list="ADDITIONAL_DATA.engineManufacture"
                        :load-status="LOAD_SAVE.engineManufacture"
                        @save-data-api="SAVE_ENGINE_MANUFACTURE"
                        @update-data-api="UPDATE_ENGINE_MANUFACTURE"
                />

            </div>
            <div class="row mainRow">
                <add-auto-engine-data-panel
                        class="col-md-12"
                        :name-panel="$ml.get('word.autoEngine')"
                        :load-status="LOAD_SAVE.engine"
                />
            </div>
            <div class="row mainRow">
                <save-data-panel
                        class="col-md-3"
                        :name-panel="$ml.get('word.autoManufacturer')"
                        :data-list="ADDITIONAL_DATA.autoManufacture"
                        :load-status="LOAD_SAVE.autoManufacturer"
                        @save-data-api="SAVE_DATA_AUTO_MANUFACTURE"
                        @update-data-api="UPDATE_DATA_AUTO_MANUFACTURE"
                />
                <save-data-panel
                        class="col-md-3"
                        :name-panel="$ml.get('word.autoModel')"
                        :load-status="LOAD_SAVE.autoModel"
                        :data-list="ADDITIONAL_DATA.autoModel"
                        @save-data-api="SAVE_DATA_AUTO_MODEL"
                        @update-data-api="UPDATE_DATA_AUTO_MODEL"
                />
                <two-param-save-panel
                        class="col-md-3"
                        :name-panel="$ml.get('word.units')"
                        :title_one="$ml.get('word.title')"
                        :title_two="$ml.get('word.mark')"
                        :data-list="ADDITIONAL_DATA.units"
                        :load-status="LOAD_SAVE.measurementUnits"
                        @save-data-api="SAVE_DATA_MEASUREMENT_UNITS"
                        @update-data-api="UPDATE_DATA_MEASUREMENT_UNITS"
                />
                <two-param-save-panel
                        class="col-md-3"
                        :title_one="$ml.get('word.title')"
                        :title_two="$ml.get('word.mark')"
                        :name-panel="$ml.get('word.nameElements')"
                        :data-list="ADDITIONAL_DATA.parameterName"
                        :load-status="LOAD_SAVE.paramName"
                        @save-data-api="SAVE_PARAM_NAME"
                        @update-data-api="UPDATE_PARAM_NAME"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import saveDataPanel from "./save-data-panel";
    import AddEngineDataPanel from "./add-engine-data-panel";
    import AddAutoEngineDataPanel from "./add-auto-engine-panel";
    import TwoParamSavePanel from "./two-param-save-panel";
    import ErrorPage from "../Error/error-page";

    export default {
        name: "savePage",
        components: {
            ErrorPage,
            TwoParamSavePanel,
            AddAutoEngineDataPanel,
            AddEngineDataPanel,
            saveDataPanel
        },
        props: {},
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
            ...mapGetters([
                'STARTPARAM',
                'LOAD_SAVE',
                'STARTPARAM',
                'ADDITIONAL_DATA',
                'LOAD_ADDITIONAL_DATA',
                'SAVE_STATUS',
                'LOAD_UPLOAD'
            ])
        },
        methods: {
            ...mapActions([
                'GET_START_PARAM',
                'SAVE_ENGINE_MANUFACTURE',
                'SAVE_DATA_AUTO_MODEL',
                'SAVE_DATA_FUEL_TYPE',
                'SAVE_DATA_ENGINE_NUMBER',
                'SAVE_DATA_ELEMENTS',
                'SAVE_DATA_PARAMETERS',
                'SAVE_DATA_MEASUREMENT_UNITS',
                'SAVE_DATA_AUTOMOBILE_ENGINE',
                'SAVE_DATA_ENGINE',
                'SAVE_DATA_AUTO_MANUFACTURE',
                'SAVE_DATA_CYLINDERS',
                'GET_ALL_ADDITIONAL_DATA',
                'SAVE_DATA_SUPERCHARGE_TYPE',
                'UPDATE_ENGINE_MANUFACTURE',
                'UPDATE_DATA_AUTO_MODEL',
                'UPDATE_DATA_FUEL_TYPE',
                'UPDATE_DATA_ENGINE_NUMBER',
                'UPDATE_DATA_ELEMENTS',
                'UPDATE_DATA_PARAMETERS',
                'UPDATE_DATA_MEASUREMENT_UNITS',
                'UPDATE_DATA_AUTOMOBILE_ENGINE',
                'UPDATE_DATA_ENGINE',
                'UPDATE_DATA_AUTO_MANUFACTURE',
                'UPDATE_DATA_CYLINDERS',
                'UPDATE_DATA_SUPERCHARGE_TYPE',
                'SAVE_PARAM_NAME',
                'UPDATE_PARAM_NAME'
            ]),
        },
        watch: {},
        mounted() {
            this.GET_ALL_ADDITIONAL_DATA();
            this.GET_START_PARAM();

        }
    }
</script>


<style>


    .card {
        transition: 0.5s;
    }

    .mainRow {
        min-width: 50vw;
        max-width: 98vw;
        padding: 0;
    }
</style>
