<template>
  <div>
    <ul style="background: white; width: 250px;"
        :id="elementId"
        v-show="!dialogFormVisible"
        class="vue-simple-context-menu"
        v-click-outside="onClickOutside"
    >
      <li class="label">{{ $ml.get('word.downlandBlank') }}</li>
      <li
          v-for="(option, index) in options"
          :key="index"
          @click.stop="optionClicked(option)"
          class="vue-simple-context-menu__item"
          :class="option.class"
      ><i class="el-icon-s-order"></i>
        {{ option.name }}
      </li>
      <li v-show="showModeratorBoard"
          class="label">{{ $ml.get('word.editing') }}
      </li>
      <li style="text-align: center"
          v-show="showModeratorBoard"
          @click="dialogFormVisible=true"
          class="vue-simple-context-menu__item">
        <i class="el-icon-edit" style="padding-right:5px "></i>
        {{ $ml.get('word.setParameter') }}
      </li>
      <li style="text-align: center"
          v-show="showModeratorBoard"
          @click="openAutoDialog()"
          class="vue-simple-context-menu__item">
        <i class="el-icon-plus" style="padding-right:5px "></i>
        {{ $ml.get('word.addRow') }}
      </li>

    </ul>
    <el-dialog :title="titleDialog"
               :visible.sync="dialogFormVisible">
      <div v-if="dialogAutoFormVisible">
        <div class="row">
          <vue-datalist
              class="col-md-6"
              :alert-mess="alertMess"
              :title-input="$ml.get('word.autoManufacturer')"
              :items="searchParamsLists.engineManufacture"
              :update-obj="autoDataSave"
              :holderNum="0"
              :clean-search="cleanField"
              index="autoManufacture"
              param-when-exist="autoManufactureName"
              @change-meth="getEngDataByParam"
              @alert-meth="showAlert"
          />
          <vue-datalist
              class="col-md-6"
              :alert-mess="alertMess"
              :title-input="$ml.get('word.autoModel')"
              :items="searchParamsLists.autoModel"
              :update-obj="autoDataSave"
              :clean-search="cleanField"
              param-when-exist="modelName"
              :holderNum="0"
              index="modelNameId"
              @alert-meth="showAlert"
              @change-meth="getEngDataByParam"
          />
        </div>
        <hr/>
        <div class="row">
          <vue-datalist
              class="col-md-6"
              :alert-mess="alertMess"
              :title-input="$ml.get('word.engine')"
              :items="searchParamsLists.engineType"
              :clean-search="cleanField"
              :update-obj="autoDataSave"
              param-when-exist="engineType"
              :holderNum="0"
              @change-meth="getEngDataByParam"
              @alert-meth="showAlert"
              index="engineTypeId"
          />
          <div class="col-md-6">
            <el-input :placeholder="$ml.get('word.from')"
                      v-model="autoDataSave.releaseYearFrom"
                      style="width: 65%"
                      max="2020"
                      min="1895"
                      type="number"
                      clearable
            >
              <template slot="prepend">
                <strong class="title" style="font-size: 15px">{{ $ml.get('word.releaseYear') }}</strong>
              </template>
            </el-input>
            <el-input :placeholder="$ml.get('word.by')"
                      clearable
                      max="2020"
                      min="1895"
                      type="number"
                      style="width: 35%"
                      v-model="autoDataSave.releaseYearBy"
            >
            </el-input>
          </div>
        </div>

      </div>
      <div style="min-height: 100px;width: 100%;" v-else-if="column.index.key === undefined">
        <div class="row" v-for="param in paramList" v-bind:key="param.id">
          <div v-if="param.elemName!==''" class="col-lg-3">
            <h6 style="position:relative; top:10px">
              {{ param.elemName }}
            </h6>
          </div>
          <div v-else class="col-lg-3">

            <VueDatalist
                :items="listParmName"
                :update-obj="param"
                :holderNum="0"
                :hide-title="true"
                index="elemId"
            />
          </div>

          <div class="col-lg-3">
            <el-select v-model="param.select"
                       style="width: 100% !important;"
                       :placeholder="$ml.get('word.choose')"

            >
              <el-option
                  :label="$ml.get('word.text')"
                  :value="1">
              </el-option>
              <el-option
                  :label="$ml.get('word.number')"
                  :value="2">
              </el-option>
              <el-option
                  :label="$ml.get('word.range')"
                  :value="3">
              </el-option>
            </el-select>
          </div>
          <div class="col-lg-6">
            <div style="justify-self: right; width: 100%; ">
        <span v-if="param.select===3">
          <div class="inp-grp">
            <el-input type="number"
                      @change="onChangeData(param)"
                      :placeholder="param.doubleMin"
                      clearable
                      v-model="param.doubleMin"></el-input>
            <el-input @change="onChangeData(param)" type="number"
                      clearable :placeholder="param.doubleMax"
                      v-model="param.doubleMax"></el-input>
          </div>
        </span>
              <span v-else-if="param.select===2">
          <el-input type="number" @change="onChangeData(param)"
                    :placeholder="param.doubleNum"
                    clearable
                    v-model="param.doubleNum"></el-input>
              </span>
              <span v-else-if="param.select===1">
          <el-input type="text" @change="onChangeData(param)"
                    clearable
                    :placeholder="param.textData" v-model="param.textData"
                    maxlength="250"
          ></el-input>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="keyValue!=='releaseYear' && keyValue!=='engineType'
      && keyValue!=='modelName' && keyValue!=='autoManufacture'"
           style="height: 100px">


        <span v-if="keyValue!=='fuelType' && keyValue!=='superchargedType' && keyValue!=='pistonDiameterAndStoke'">
          <h5 style="position: absolute; top: 30px;left: 100px">
          {{ $ml.get('word.update') + ' ' + $ml.get('word.value') }}
        </h5>
          <el-input style="position: absolute; top: 25px;left: 350px;width: 50%"
                    :placeholder="item[keyValue]" v-model="autoDataSave[keyValue]"
                    clearable type="text"
          ></el-input>
        </span>
        <span v-else-if="keyValue==='pistonDiameterAndStoke'">
          <div class="row">
          <div class="col-md-4">
            <h5>
          {{ $ml.get('word.update') + ' ' + $ml.get('word.value') }}
        </h5>
            <h6>{{ '(' + item[keyValue] + ')' }}</h6>
          </div>
            <div class="col-md-4">
              <el-input
                  :placeholder="$ml.get('word.pistonDiameter')" v-model="autoDataSave.pistonDiameter"
                  clearable type="text"
              ></el-input>
          </div>
          <div class="col-md-4">
              <el-input
                  :placeholder="$ml.get('word.pistonStroke')" v-model="autoDataSave.pistonStoke"
                  clearable type="text"
              ></el-input>
          </div>

        </div>
        </span>
        <span v-else>
            <h5 style="position: absolute; top: 30px;left: 100px">
          {{ $ml.get('word.update') + ' ' + $ml.get('word.value') }}
        </h5>
        <vue-datalist
            style="position: absolute; top: 25px;left: 350px;width: 50%"
            :title-input="$ml.get('word.'+keyValue)"
            :place-holder="item[keyValue]"
            :items="searchParamsLists[keyValue]"
            :update-obj="autoDataSave"
            :holderNum="0"
            :clean-search="cleanField"
            @change-meth="getEngDataByParam"
            @alert-meth="showAlert"
            :alert-mess="alertMess"
            :index="keyValue"
        /></span>
      </div>
      <div v-else>
        <div class="row">
          <vue-datalist
              :place-holder="item['autoManufacture']"
              class="col-md-6"
              :alert-mess="alertMess"
              :title-input="$ml.get('word.autoManufacturer')"
              :items="searchParamsLists.engineManufacture"
              :update-obj="autoDataSave"
              :holderNum="0"
              :clean-search="cleanField"
              param-when-exist="autoManufactureName"
              index="autoManufacture"
              @change-meth="getEngDataByParam"
              @alert-meth="showAlert"
          />
          <vue-datalist
              class="col-md-6"
              :alert-mess="alertMess"
              :place-holder="item['modelName']"
              :title-input="$ml.get('word.autoModel')"
              :items="searchParamsLists.autoModel"
              :update-obj="autoDataSave"
              :clean-search="cleanField"
              :holderNum="0"
              param-when-exist="modelName"
              index="modelNameId"
              @alert-meth="showAlert"
              @change-meth="getEngDataByParam"
          />
        </div>
        <hr/>
        <div class="row">
          <vue-datalist
              class="col-md-6"
              :alert-mess="alertMess"
              :place-holder="item['engineType']"
              :title-input="$ml.get('word.engine')"
              :items="searchParamsLists.engineType"
              :clean-search="cleanField"
              :update-obj="autoDataSave"
              param-when-exist="engineType"
              :holderNum="0"
              @change-meth="getEngDataByParam"
              @alert-meth="showAlert"
              index="engineTypeId"
          />
          <div class="col-md-6">
            <el-input :placeholder="$ml.get('word.from')"
                      v-model="autoDataSave.releaseYearFrom"
                      style="width: 65%"
                      max="2020"
                      min="1895"
                      type="number"
                      clearable
            >
              <template slot="prepend">
                <strong class="title" style="font-size: 15px">{{ $ml.get('word.releaseYear') }}</strong>
              </template>
            </el-input>
            <el-input :placeholder="$ml.get('word.by')"
                      clearable
                      max="2020"
                      min="1895"
                      type="number"
                      style="width: 35%"
                      v-model="autoDataSave.releaseYearBy"
            >
            </el-input>
          </div>
        </div>

      </div>
      <transition name="el-zoom-in-top">

        <el-alert
            v-show="alertMess.showMess"
            :title="$ml.get('msg.alertParamWarn')"
            type="warning"
            :closable="false"
            center
            :description="$ml.get('msg.inNextParam')+alertMess.textAlert"
            show-icon>
        </el-alert>
      </transition>
      <el-button type="info "
                 v-show="column.index.key === undefined"
                 @click="addNewParamToList" plain style="width: 100%">
        {{ $ml.get('word.add') }}
      </el-button>
      <hr style="width: 80%"/>
      <div class="dialog-foot">
        <el-button style="justify-items: start" type="danger" @click="dialogFormVisible = false">
          {{ $ml.get('word.cancel') }}
        </el-button>
        <el-button style="justify-items: end" :loading="SAVE_FAST_PARAM_STATUS" type="primary"
                   @click="saveAllParam">
          {{ $ml.get('word.confirm') }}
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import Vue from 'vue'
import vClickOutside from 'v-click-outside'
import {mapActions, mapGetters} from "vuex";
import VueDatalist from "../input/vue-datalist";

Vue.use(vClickOutside)

export default {
  name: 'VueContextMenu',
  components: {
    VueDatalist
  },
  props: {
    pageSetting: {
      type: Object
    },
    elementId: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      searchData: {
        engineType: null,
        autoManufacturer: null,
        autoModel: null,
        produceYear: null,
      },
      alertMess: {
        titleAlert: '',
        textAlert: '',
        alertParamList: [],
        showMess: false
      },
      cleanField: false,
      searchParamsLists: null,
      autoDataSave: {
        id: -1,
        flapNumber: null,
        pistonDiameterAndStoke: null,
        fuelType: null,
        cylindersNumber: null,
        engineTypeId: null,
        autoManufactureName: null,
        autoManufacture: null,
        engineManufactureName: null,
        releaseYearBy: null,
        releaseYearFrom: null,
        engineManufacture: null,
        modelNameId: null,
        powerKWT: null,
        engineCapacity: null,
        horsepower: null,
        pistonStoke: null,
        pistonDiameter: null,
        modelName: null,
        engineType: null,
        releaseYear: null,
        elemID: null,
        cylinderNum: null,
        cylinderPlace: null,
        superchargedType: null,
        degreeCompression: null
      },
      paramList: [],
      paraSaveList: [],
      titleDialog: '',
      typeParamSelect: 1,
      dialogAutoFormVisible: false,
      dialogFormVisible: false,
      item: null,
      column: null,
      menuWidth: null,
      menuHeight: null,
      column_id: -1,
      keyValue: null,
      column_name: '',
      listParmName: [],
      row_id: -1
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showModeratorBoard() {
      if (this.currentUser) {
        return this.currentUser.roles.indexOf('MODERATOR') !== -1
      }
      return false;
    },
    ...mapGetters([
      'SAVE_FAST_PARAM_STATUS',
      'ENGDATA',
      'LISTPARAM',
      'LOAD_LIST_URL',
      'STARTPARAM',
      'LANG',
      'LISTPARAMUP',
      'PARAM_NAME_AND_UNITS',
      'SEARCHDATA',
      'TREE_ROOT_NAMES',
      'PARAM_SIZE_NAME',
      'LOAD_PARAM_SIZE_NAME',
      'ELEMENTS_UPDATE',
      'ELEMENTS_AND_MAX_ID',
      'LISTNEWELEM',
      'LOAD_TREE_UPDATE',
      'LOAD_SAVE_ELEMENTS',
      'PARAM_NAME'
    ])
  },

  methods: {
    showAlert() {
      this.alertMess.textAlert = ''
      if (this.alertMess.alertParamList.length > 0) {
        this.alertMess.alertParamList.forEach(item => {
          this.alertMess.textAlert += item + ', '
        })
        this.alertMess.showMess = true
      } else {
        this.alertMess.showMess = false
      }
      console.log(1)
    },
    async getEngDataByParam() {
      /* this.GET_ENGDATA_BY_PARAM({
         engineType: this.autoDataSave.engineTypeId,
         autoManufacturer: this.autoDataSave.autoManufacture,
         autoModel: this.autoDataSave.modelNameId,
         produceYear: this.autoDataSave.releaseYearFrom,
       });*/
      console.log(1)
    },
    onChangeData(param) {
      let temp = this.paraSaveList.find(item =>
          (item.elemId === param.elemId && param.nameElemId === -1) ||
          (item.nameElemId === param.nameElemId && param.elemId === -1)
      )
      if (param.select === 1) {
        param.doubleMin = null
        param.doubleMax = null
        param.doubleNum = null
      } else if (param.select === 2) {
        param.textData = null
        param.doubleMin = null
        param.doubleMax = null
      } else if (param.select === 3) {
        param.textData = null
        param.doubleNum = null
      }
      if (temp === undefined) {
        param.name = this.column.index.columnList.find(item => item.id === param.elemId).nameId
        this.paraSaveList.push(param)
      } else {

        temp.name = this.column.index.columnList.find(item => item.id === param.elemId).nameId
        temp.doubleNum = param.doubleNum
        temp.doubleMax = param.doubleMax
        temp.doubleMin = param.doubleMin
        temp.elemId = param.elemId
      }
    },
    ...mapActions([
      'SAVE_FAST_PARAM_DATA',
      'GET_ENGDATA_BY_PARAM',
      'SAVE_FAST_AUTO_ENGINE_DATA',
      'GET_ALL_AUTO'
    ]),
    openAutoDialog() {
      this.titleDialog = this.$ml.get('word.addRow')
      this.autoDataSave.engineTypeId = null
      this.dialogFormVisible = true
      this.dialogAutoFormVisible = true
    },
    async saveAllParam() {
      // eslint-disable-next-line no-constant-condition
      if ((this.autoDataSave.engineTypeId === null || this.autoDataSave.modelNameId === null || this.autoDataSave.autoManufacture === null) && this.paraSaveList.length === 0) {
        this.$message({
          showClose: true,
          message: this.$ml.get('msg.notFullData'),
          type: 'error'
        });
      } else if (!(this.STARTPARAM.autoModel.length === 1 && this.STARTPARAM.engineManufacture.length === 1
          && this.STARTPARAM.engineType.length === 1
          && this.STARTPARAM.engineType[0].id === this.autoDataSave.engineTypeId
          && this.STARTPARAM.autoModel[0].id === this.autoDataSave.modelNameId
          && this.STARTPARAM.engineManufacture[0].id === this.autoDataSave.autoManufacture)) {
        if (this.column.index.key === undefined) {
          let param = await this.SAVE_FAST_PARAM_DATA({saveList:this.paraSaveList,langId:this.LANG,userId:this.currentUser.id})
          console.log(param)
          this.GET_ENGDATA_BY_PARAM(this.searchData)
        } else {
          if (this.dialogFormVisible === true &&
              this.dialogAutoFormVisible === true) {
            this.autoDataSave.id = -1
          }
          let param = await this.SAVE_FAST_AUTO_ENGINE_DATA(this.autoDataSave)
          console.log(param)
          this.GET_ENGDATA_BY_PARAM(this.searchData)
        }
        this.GET_ALL_AUTO(this.pageSetting);

        this.dialogFormVisible = false
      } else {
        this.$message({
          showClose: true,
          message: this.$ml.get('msg.duplicateValue'),
          type: 'error'
        });
      }
    },
    addNewParamToList() {
      let param = {
        id: 1,
        select: 1,
        elemId: -1,
        units: 5,
        nameElemId: -1,
        auto_id: this.row_id,
        name: 0,
        elemName: '',
        doubleMin: null,
        doubleMax: null,
        doubleNum: null,
        status: 2,
        textData: null
      };
      this.paramList.push(param)
    },
    showMenu(event, item, column) {
      this.clearData();
      this.row_id = item.id;
      this.column_name = column.label
      this.item = item
      this.column = column
      if (column.index.key === undefined) {
        this.listParmName = []
        this.column_id = column.index.id;
        column.index.columnList.map(elem => {
          this.listParmName.push({
            id: elem.id,
            data: elem.name
          })
          if (item[elem.id] !== undefined) {
            let param = {
              id: 0,
              select: 1,
              elemId: elem.id,
              nameElemId: -1,
              units: 5,
              auto_id: item.id,
              name: elem.nameId,
              elemName: elem.name,
              doubleMin: null,
              doubleMax: null,
              doubleNum: null,
              status: 2,
              textData: null
            };
            if (item[elem.id].match('^[0-9]*.[0-9]*$')) {
              param.doubleNum = item[elem.id]
              param.doubleMin = null
              param.doubleMax = null
              param.textData = null
              param.select = 2
            } else if (item[elem.id].match('^[0-9]*.[0-9]*\\s*-\\s*[0-9]*.[0-9]*$')) {
              param.doubleMin = item[elem.id].substr(0, item[elem.id].indexOf('-'))
              param.doubleMax = item[elem.id].substr(item[elem.id].indexOf('-') + 1, item[elem.id].length)
              param.doubleNum = null
              param.textData = null
              param.select = 3
            } else {
              param.textData = item[elem.id]
              param.doubleMin = null
              param.doubleNum = null
              param.doubleMax = null
              param.select = 1
            }
            this.paramList.push(param)
          }
        })
      } else {

        this.keyValue = column.index.key
        this.autoDataSave.id = item.id
        if (item.engineType !== '' || item.engineType !== null) {
          this.autoDataSave.engineTypeId = this.STARTPARAM
              .engineType.find(elem => elem.data === item.engineType).id
        }
      }
      if (this.searchParamsLists === null) {
        this.searchParamsLists = this.STARTPARAM
      }
      if (this.paramList.length === 0) {
        this.addNewParamToList()
      }
      if (this.listParmName.filter(item => {
        return item.data.toLowerCase() !== 'std' && item.data.toLowerCase() !== 'знач.' && item.data.toLowerCase()!=='значення' &&  item.data.toLowerCase() !== 'std.' && item.data.toLowerCase() !== 'dane'
      }).length === 0 && column.index.key === undefined) {
        this.paramList[0].elemId = this.listParmName[0].id
        this.paramList[0].elemName = this.$ml.get('word.value')
      }

      this.titleDialog = this.$ml.get('word.row') +
          ': №' + this.row_id + ' \\ ' + this.$ml.get('word.parameter') +
          ': ' + this.column_name

      let menu = document.getElementById(this.elementId)
      if (!menu) {
        return
      }
      if (!this.menuWidth || !this.menuHeight) {
        menu.style.visibility = "hidden"
        menu.style.display = "block"
        this.menuWidth = menu.offsetWidth
        this.menuHeight = menu.offsetHeight
        menu.removeAttribute("style")
      }

      let e = e || window.event

      if (e.pageX == null && e.clientX != null) {
        var html = document.documentElement
        var body = document.body

        e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
        e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
      }

      if ((this.menuWidth + e.pageX) >= window.innerWidth) {
        menu.style.left = (e.pageX - this.menuWidth) + "px"
      } else {
        menu.style.left = (e.pageX - 35) + "px"
      }

      if ((this.menuHeight + e.pageY) >= window.innerHeight) {
        menu.style.top = (e.pageY - 130) + "px"
      } else {
        menu.style.top = (e.pageY - 130) + "px"
      }

      menu.classList.add('vue-simple-context-menu--active')
    },
    hideContextMenu() {
      let element = document.getElementById(this.elementId)
      if (element) {
        element.classList.remove('vue-simple-context-menu--active');
      }
    },
    clearData() {
      this.row_id = null;
      this.column_name = null
      this.item = null
      this.column = null
      this.dialogFormVisible = false
      this.dialogAutoFormVisible = false
      this.cleanField = !this.cleanField
      this.paramList = []
      this.paraSaveList = []
      this.alertMess = {
        titleAlert: '',
        textAlert: '',
        alertParamList: [],
        showMess: false
      }
      this.autoDataSave = {
        id: -1,
        flapNumber: null,
        pistonDiameterAndStoke: null,
        fuelType: null,
        cylindersNumber: null,
        engineTypeId: null,
        autoManufactureName: null,
        autoManufacture: null,
        engineManufactureName: null,
        releaseYearBy: null,
        releaseYearFrom: null,
        engineManufacture: null,
        modelNameId: null,
        powerKWT: null,
        engineCapacity: null,
        horsepower: null,
        pistonStoke: null,
        pistonDiameter: null,
        modelName: null,
        engineType: null,
        releaseYear: null,
        elemID: null,
        cylinderNum: null,
        cylinderPlace: null,
        superchargedType: null,
        degreeCompression: null
      }
    },
    onClickOutside() {
      this.hideContextMenu()
    },
    optionClicked(option) {
      this.hideContextMenu()
      this.$emit('option-clicked', {
        item: this.item,
        option: option
      })
    },
    onEscKeyRelease(event) {
      if (event.keyCode === 27) {
        this.hideContextMenu();
      }
    }
  },
  mounted() {
    document.body.addEventListener('keyup', this.onEscKeyRelease);
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.onEscKeyRelease);
  }
}
</script>

<style scoped>
.label {
  color: gray;
  padding-left: 10px;
  text-align: left;
  border-style: solid;
  border-color: lightgray;
  border-width: 0px 0px 1px 0px;
}

.label:hover {
  background: #ecf0f1;
}

.el-icon-s-order {
  padding-right: 5px;
}

.vue-simple-context-menu {
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  display: none;
  list-style: none;
  position: absolute;
  z-index: 1000000;
  background-color: #ecf0f1;
  border-bottom-width: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  box-shadow: 0 3px 6px 0 rgba(51, 51, 51, 0.2);
  border-radius: 4px;
}

.vue-simple-context-menu--active {
  display: block;
}

.vue-simple-context-menu .dialog-foot {
  display: flex;
}

.vue-simple-context-menu__item {
  display: flex;
  color: #333;
  cursor: pointer;
  padding: 5px 15px;
  align-items: center;
}

.vue-simple-context-menu__item:hover {
  background-color: #409EFF;
  color: #fff;
}

.vue-simple-context-menu .main-row {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.vue-simple-context-menu el-select {
  justify-self: left;
}

.vue-simple-context-menu .vue-simple-context-menu__item {
  width: 250px;
  padding-left: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.vue-simple-context-menu li:first-of-type {
  margin-top: 4px;
}

.vue-simple-context-menu li:last-of-type {
  margin-bottom: 4px;
}
</style>
