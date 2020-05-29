<template>
    <div id="vue-save-update-page">

        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4 col-lg-2  navbar-container ">
                    <nav class="navbar navbar-expand-md shadow-lg navbar-light rounded  " id="nav-panel">
                        <div class="collapse navbar-collapse" id="navbar" style="width: 100%;">
                            <!-- Вертикальное меню -->

                            <!-- <li class="nav-item">
                                    <a class="nav-link menu-item" href="#link-1">
                                        <span></span>
                                        {{$ml.get('word.engine')}}</a>
                                </li>-->
                            <ul class="nav nav-tabs tabs-right sideways">
                                <li class="bord nav-item"><a class="nav-link menu-item " href="#engine"
                                                             data-toggle="tab">
                                    <span></span>
                                    {{$ml.get('word.engine')}}</a>
                                </li>
                                <li class="nav-item"><a class="nav-link menu-item " href="#cylinders" data-toggle="tab">
                                    <span></span>
                                    {{$ml.get('word.cylinders')}}</a>
                                </li>
                                <li class="nav-item"><a class="nav-link menu-item " href="#fuelType" data-toggle="tab">
                                    <span></span>
                                    {{$ml.get('word.fuelType')}}</a>
                                </li>
                                <li class="nav-item"><a class="nav-link menu-item " href="#superchargedType"
                                                        data-toggle="tab">
                                    <span></span>
                                    {{$ml.get('word.superchargedType')}}</a>
                                </li>
                                <li class="nav-item"><a class="nav-link menu-item " href="#autoEngine"
                                                        data-toggle="tab">
                                    <span></span>
                                    {{$ml.get('word.autoEngine')}}</a>
                                </li>
                                <li class="nav-item"><a class="nav-link menu-item " href="#engineManufacture"
                                                        data-toggle="tab">
                                    <span></span>
                                    {{$ml.get('word.engineManufacture')}}</a>
                                </li>
                                <li class="nav-item"><a class="nav-link menu-item " href="#autoManufacturer"
                                                        data-toggle="tab">
                                    <span></span>
                                    {{$ml.get('word.autoManufacturer')}}</a></li>
                                <li class="nav-item"><a class="nav-link menu-item " href="#autoModel"
                                                        data-toggle="tab">
                                    <span></span>
                                    {{$ml.get('word.autoModel')}}
                                </a></li>
                                <li class="nav-item"><a class="nav-link menu-item " href="#units"
                                                        data-toggle="tab">
                                    <span></span>
                                    {{$ml.get('word.units')}}
                                </a></li>
                                <li class="nav-item"><a class="nav-link menu-item " href="#nameElements"
                                                        data-toggle="tab">
                                    <span></span>
                                    {{$ml.get('word.nameElements')}}
                                </a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div class="col-md-10 col-lg-10 rounded content-container shadow-lg bg-white"
                     style="background-color: #ffe0b2">
                    <div class="col-xs-9">
                        <!-- Tab panes -->
                        <div class="tab-content bg-white" style="border: white">
                            <div class="tab-pane active" id="engine">
                                <save-engine-panel
                                        :name-title="$ml.get('word.engine')"
                                        :name-panel="$ml.get('word.engine')"
                                        :load-status="LOAD_SAVE.engine"
                                        @save-data-api="SAVE_DATA_ENGINE"
                                        @update-data-api="UPDATE_DATA_ENGINE"

                                />
                            </div>
                            <div class="tab-pane" id="cylinders">

                                <save-update-panel
                                        :name-title="$ml.get('word.cylinders')"
                                        :load-status="LOAD_SAVE.cylinders"
                                        :data-list="ADDITIONAL_DATA.cylinders"
                                        @save-data-api="SAVE_DATA_CYLINDERS"
                                        @update-data-api="UPDATE_DATA_CYLINDERS"
                                />
                            </div>
                            <div class="tab-pane" id="fuelType">

                                <save-update-panel
                                        :name-title="$ml.get('word.fuelType')"
                                        :load-status="LOAD_SAVE.fuelType"
                                        :data-list="ADDITIONAL_DATA.fuelType"
                                        @save-data-api="SAVE_DATA_FUEL_TYPE"
                                        @update-data-api="UPDATE_DATA_FUEL_TYPE"

                                />
                            </div>
                            <div class="tab-pane " id="superchargedType">
                                <two-update-panel
                                        :name-title="$ml.get('word.autoEngine')"
                                        :name-panel="$ml.get('word.superchargedType')"
                                        :data-list="ADDITIONAL_DATA.superchargeType"
                                        :load-status="LOAD_SAVE.superchargedType"
                                        @save-data-api="SAVE_DATA_SUPERCHARGE_TYPE"
                                        @update-data-api="UPDATE_DATA_SUPERCHARGE_TYPE"
                                />
                            </div>
                            <div class="tab-pane " id="engineManufacture">

                                <save-update-panel
                                        :name-title="$ml.get('word.engineManufacture')"
                                        :data-list="ADDITIONAL_DATA.engineManufacture"
                                        :load-status="LOAD_SAVE.engineManufacture"
                                        @save-data-api="SAVE_ENGINE_MANUFACTURE"
                                        @update-data-api="UPDATE_ENGINE_MANUFACTURE"
                                />
                            </div>
                            <div class="tab-pane" id="autoEngine">

                                <auto-engine-save-panel
                                        :name-panel="$ml.get('word.autoEngine')"
                                        :load-status="LOAD_SAVE.engine"
                                />

                            </div>
                            <div class="tab-pane" id="autoManufacturer">
                                <save-update-panel

                                        :name-title="$ml.get('word.autoManufacturer')"
                                        :data-list="ADDITIONAL_DATA.autoManufacture"
                                        :load-status="LOAD_SAVE.autoManufacturer"
                                        @save-data-api="SAVE_DATA_AUTO_MANUFACTURE"
                                        @update-data-api="UPDATE_DATA_AUTO_MANUFACTURE"

                                />
                            </div>
                            <div class="tab-pane " id="autoModel">
                                <save-update-panel
                                        :name-title="$ml.get('word.autoModel')"
                                        :load-status="LOAD_SAVE.autoModel"
                                        :data-list="ADDITIONAL_DATA.autoModel"
                                        @save-data-api="SAVE_DATA_AUTO_MODEL"
                                        @update-data-api="UPDATE_DATA_AUTO_MODEL"

                                />

                            </div>
                            <div class="tab-pane" id="units">

                                <two-update-panel
                                        :name-title="$ml.get('word.units')"
                                        :title_two="$ml.get('word.mark')"
                                        :data-list="ADDITIONAL_DATA.units"
                                        :load-status="LOAD_SAVE.measurementUnits"
                                        @save-data-api="SAVE_DATA_MEASUREMENT_UNITS"
                                        @update-data-api="UPDATE_DATA_MEASUREMENT_UNITS"
                                />
                            </div>
                            <div class="tab-pane" id="nameElements">
                                <two-update-panel
                                        :name-title="$ml.get('word.nameElements')"
                                        :name-panel="$ml.get('word.nameElements')"
                                        :data-list="ADDITIONAL_DATA.parameterName"
                                        :load-status="LOAD_SAVE.paramName"
                                        @save-data-api="SAVE_PARAM_NAME"
                                        @update-data-api="UPDATE_PARAM_NAME"
                                />
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SaveUpdatePanel from "./save-update-panel";
    import {mapActions, mapGetters} from "vuex";
    import TwoUpdatePanel from "./two-update-panel";
    import SaveEnginePanel from "./save-engine-panel";
    import AutoEngineSavePanel from "./auto-engine-save-panel";

    export default {
        name: "vue-save-update-page",
        components: {AutoEngineSavePanel, SaveEnginePanel, TwoUpdatePanel, SaveUpdatePanel},
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
                'UPDATE_PARAM_NAME',
                'GET_PARAM_NAME'
            ]),
        },

        mounted() {
            this.GET_PARAM_NAME();
            this.GET_ALL_ADDITIONAL_DATA();
            this.GET_START_PARAM();

        }
    }
</script>

<style scoped>
    #nav-panel {
        background: white;
    }


    .nav-item {
        color: black;

    }

    @media (min-width: 768px) {
        .navbar-container {
            position: sticky;
            top: 0;
            height: 100vh;
        }

        .navbar-container .navbar {
            align-items: flex-start;
            justify-content: flex-start;
            flex-wrap: nowrap;
            flex-direction: column;
            height: 100%;
        }

        .menu-item span {
            cursor: pointer;
            display: inline-block;
            position: relative;
            transition: 0.5s;
        }

        .menu-item span:after {
            content: '   ';
            position: absolute;
            opacity: 0;
            top: -1vw;
            right: -20px;
            transition: 0.5s;
        }

        .menu-item:hover span {
            padding-right: 25px;
        }

        .menu-item:hover span:after {
            opacity: 1;
            right: 0;
        }

        .menu-item:hover {
            color: black;

        }

        .menu-item {
            width: 100%;
            display: inline-block;
            transition: all 0.5s;
            border: white;
            background: white;
            color: black;
            font-size: 1.2em;

        }


        .navbar-container .navbar-collapse {
            align-items: flex-start;
        }

        .navbar-container .nav {
            flex-direction: column;
            flex-wrap: nowrap;
        }

        .navbar-container .navbar-nav {
            flex-direction: column !important;
        }
    }
</style>