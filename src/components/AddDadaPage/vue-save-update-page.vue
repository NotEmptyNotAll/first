<template>
  <div id="vue-save-update-page">
    <error-page
        v-if="!currentUser.roles.indexOf('MODERATOR')!==-1"
    />
    <!-- Tab panes -->
    <div v-if="currentUser.roles.indexOf('MODERATOR')!==-1" class="search-border rounded main-tab">
      <el-tabs type="border-card" class="  shadow-lg page" style=" height: 85vh;" tab-position="left">
        <el-tab-pane :label="$ml.get('word.engine')">
          <div class="tab-pane">
            <save-engine-panel
                :name-title="$ml.get('word.engine')"
                :name-panel="$ml.get('word.engine')"
                :load-status="LOAD_SAVE.engine"
                @save-data-api="SAVE_DATA_ENGINE"
                @update-data-api="UPDATE_DATA_ENGINE"
                @import-data-api="IMPORT_DATA_ENGINE"
                @delete-data-api="DELETE_ENGINE"
                :data-list="DATA_PAGE.engine"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$ml.get('word.cylinders')">
          <div class="tab-pane">

            <save-update-panel
                :name-title="$ml.get('word.cylinders')"
                :load-status="LOAD_SAVE.cylinders"
                @load-data="GET_CYLINDERS_PAGINATION"
                :data-list="DATA_PAGE.cylinders"
                @save-data-api="SAVE_DATA_CYLINDERS"
                @delete-data-api="DELETE_CYLINDERS"
                @import-data-api="IMPORT_DATA_CYLINDERS"
                @update-data-api="UPDATE_DATA_CYLINDERS"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$ml.get('word.fuelType')">
          <div class="tab-pane" id="fuelType">

            <save-update-panel
                :name-title="$ml.get('word.fuelType')"
                @load-data="GET_FUEL_TYPE_PAGINATION"
                :load-status="LOAD_SAVE.fuelType"
                :data-list="DATA_PAGE.fuelType"
                @save-data-api="SAVE_DATA_FUEL_TYPE"
                @update-data-api="UPDATE_DATA_FUEL_TYPE"
                @import-data-api="IMPORT_DATA_FUEL_TYPE"
                @delete-data-api="DELETE_FUEL_TYPE"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$ml.get('word.superchargedType')">
          <div class="tab-pane " id="superchargedType">
            <two-update-panel
                :name-title="$ml.get('word.superchargedType')"
                :name-panel="$ml.get('word.superchargedType')"
                :data-list="DATA_PAGE.superchargedType"
                :load-status="LOAD_SAVE.superchargedType"
                @load-data="GET_SUPERCHARGE_PAGINATION"
                @import-data-api="IMPORT_DATA_MEASUREMENT_UNITS"
                @save-data-api="SAVE_DATA_SUPERCHARGE_TYPE"
                @update-data-api="UPDATE_DATA_SUPERCHARGE_TYPE"
                @delete-data-api="DELETE_SUPERCHARGED"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$ml.get('word.engineManufacture')">
          <div class="tab-pane " id="engineManufacture">
            <save-update-panel
                :name-title="$ml.get('word.engineManufacture')"
                :data-list="DATA_PAGE.engineManufacture"
                :load-status="LOAD_SAVE.engineManufacture"
                @load-data="GET_ENGINE_MANUF_PAGINATION"
                @save-data-api="SAVE_ENGINE_MANUFACTURE"
                @import-data-api="IMPORT_ENGINE_MANUFACTURE"
                @update-data-api="UPDATE_ENGINE_MANUFACTURE"
                @delete-data-api="DELETE_ENGINE_MANUFACTURE"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$ml.get('word.autoEngine')">
          <div class="tab-pane" id="autoEngine">

            <auto-engine-save-panel
                :name-title="$ml.get('word.autoEngine')"
                :data-list="DATA_PAGE.automobileEngine"
                :name-panel="$ml.get('word.autoEngine')"
                @import-data-api="IMPORT_DATA_AUTOMOBILE_ENGINE"
                :load-status="LOAD_SAVE.automobileEngine"
                @delete-data-api="DELETE_AUTO_ENGINE"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$ml.get('word.autoManufacturer')">
          <div class="tab-pane" id="autoManufacturer">
            <save-update-panel
                :name-title="$ml.get('word.autoManufacturer')"
                :data-list="DATA_PAGE.autoManufacturer"
                :load-status="LOAD_SAVE.autoManufacturer"
                @load-data="GET_AUTO_MANUF_PAGINATION"
                @save-data-api="SAVE_DATA_AUTO_MANUFACTURE"
                @update-data-api="UPDATE_DATA_AUTO_MANUFACTURE"
                @import-data-api="IMPORT_DATA_AUTO_MANUFACTURE"
                @delete-data-api="DELETE_AUTO_MANUFACTURE"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$ml.get('word.autoModel')">
          <div class="tab-pane " id="autoModel">
            <save-update-panel
                :name-title="$ml.get('word.autoModel')"
                :load-status="LOAD_SAVE.autoModel"
                :data-list="DATA_PAGE.autoModel"
                @save-data-api="SAVE_DATA_AUTO_MODEL"
                @load-data="GET_AUTO_MODEL_PAGINATION"
                @update-data-api="UPDATE_DATA_AUTO_MODEL"
                @import-data-api="IMPORT_DATA_AUTO_MODEL"
                @delete-data-api="DELETE_AUTO_MODEL"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$ml.get('word.units')">
          <div class="tab-pane" id="units">
            <two-update-panel
                :name-title="$ml.get('word.units')"
                :title_two="$ml.get('word.mark')"
                :data-list="DATA_PAGE.measurementUnits"
                :load-status="LOAD_SAVE.measurementUnits"
                @load-data="GET_MEASUREMENT_UNITS_PAGINATION"
                @import-data-api="IMPORT_DATA_MEASUREMENT_UNITS"
                @save-data-api="SAVE_DATA_MEASUREMENT_UNITS"
                @update-data-api="UPDATE_DATA_MEASUREMENT_UNITS"
                @delete-data-api="DELETE_MEASUREMENT_UNITS"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$ml.get('word.nameElements')">
          <div class="tab-pane" id="nameElements">
            <two-update-panel
                :name-title="$ml.get('word.nameElements')"
                :title_two="$ml.get('word.mark')"
                :load-status="LOAD_SAVE.paramName"
                :data-list="DATA_PAGE.parameterName"
                @load-data="GET_PARAM_NAME_PAGINATION"
                @import-data-api="IMPORT_PARAM_NAME"
                @save-data-api="SAVE_PARAM_NAME"
                @update-data-api="UPDATE_PARAM_NAME"
                @delete-data-api="DELETE_PARAM_NAME"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$ml.get('word.paramSizeName')">
          <div class="tab-pane" id="nameElementsSize">
            <two-update-panel
                :name-title="$ml.get('word.paramSizeName')"
                :title_two="$ml.get('word.mark')"
                :load-status="LOAD_SAVE.paramName"
                :data-list="DATA_PAGE.parameterSizeName"
                @load-data="GET_PARAM_NAME_SIZE_PAGINATION"
                @import-data-api="IMPORT_PARAM_NAME"
                @save-data-api="SAVE_PARAM_NAME"
                @delete-data-api="DELETE_PARAM_NAME"
                @update-data-api="UPDATE_PARAM_NAME"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
import SaveUpdatePanel from "./save-update-panel";
import {mapActions, mapGetters, mapMutations} from "vuex";
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
      'DATA_PAGE',
      'LOAD_ADDITIONAL_DATA',
      'SAVE_STATUS',
      'LOAD_UPLOAD'
    ])
  },
  methods: {
    ...mapMutations({
      setAutoModel: ''
    }),
    ...mapActions([
      'IMPORT_DATA_MEASUREMENT_UNITS',
      'IMPORT_DATA_SUPERCHARGE_TYPE',
      'IMPORT_PARAM_NAME',
      'IMPORT_DATA_AUTOMOBILE_ENGINE',
      'IMPORT_DATA_ENGINE',
      'IMPORT_DATA_CYLINDERS',
      'IMPORT_ENGINE_MANUFACTURE',
      'IMPORT_DATA_AUTO_MODEL',
      'IMPORT_DATA_AUTO_MANUFACTURE',
      'IMPORT_DATA_FUEL_TYPE',
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
      'DELETE_PARAM_NAME',
      'DELETE_PARAMETERS',
      'DELETE_AUTO_MODEL',
      'DELETE_ENGINE',
      'DELETE_AUTO_ENGINE',
      'GET_PARAM_NAME_SIZE_PAGINATION',
      'DELETE_MEASUREMENT_UNITS',
      'DELETE_CYLINDERS',
      'DELETE_FUEL_TYPE',
      'DELETE_ENGINE_MANUFACTURE',
      'DELETE_AUTO_MANUFACTURE',
      'DELETE_FILE_STORAGE',
      'DELETE_SUPERCHARGED',
      'GET_AUTO_ENG_PAGINATION',
      'GET_ENG_PAGINATION',
      'GET_PARAM_NAME_PAGINATION',
      'GET_CYLINDERS_PAGINATION',
      'GET_SUPERCHARGE_PAGINATION',
      'GET_FUEL_TYPE_PAGINATION',
      'GET_MEASUREMENT_UNITS_PAGINATION',
      'GET_AUTO_MODEL_PAGINATION',
      'GET_ENGINE_MANUF_PAGINATION',
      'GET_AUTO_MANUF_PAGINATION',
      'GET_PARAM_NAME'
    ]),
  },

  mounted() {
    document.body.oncontextmenu = function () {
      return true;
    };
    let pageSetting = {
      initRecordFrom: 1,
      pageSize: 50,
      data: ''
    };
    this.GET_AUTO_ENG_PAGINATION(pageSetting)
    this.GET_ENG_PAGINATION(pageSetting)
    this.GET_PARAM_NAME();
  //  this.GET_ALL_ADDITIONAL_DATA();
    this.GET_START_PARAM();


  }
}
</script>

<style>
.content-container {
  height: 85vh;
}

#nav-panel {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  position: relative;
  top: 3vh;
  background: white;
  border-style: solid;
  border-width: 0px 1px 0px 0px;
  border-right-color: lightgray;
}


.nav-item {
  height: 35px;
  border-color: white;
  color: lightgray;
  width: auto;

}


@media (min-width: 768px) {
  .navbar-container {
    position: sticky;
    top: 0;
    height: auto;
    min-height: 85vh;
  }

  #main-panel {
    height: 94vh;
    width: 96vw;
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
    border-color: white;

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
    border: white;
    width: 100%;
    display: inline-block;
    transition: all 0.5s;
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

.main-tab {
  margin-left: 30px;
  margin-right: 30px;
  height: 90vh;
}

.el-tabs__item {
  font-size: 20px !important;

}

.page .el-tabs__item {
  margin-top: 10px !important;
}


li {
  border-color: white;
  background: white;
}

.search-border {
  border-style: solid;
  border-top-color: lightslategrey;
  border-width: 15px 0px 0px 0px;

}

</style>