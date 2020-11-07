<template>
  <div>
    <ul style="background: white; min-width: 250px;"
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
      <li class="label">{{ $ml.get('word.editing') }}</li>
      <li style="text-align: center"
          @click="openAutoDialog()"
          class="vue-simple-context-menu__item">
        <i class="el-icon-plus" style="padding-right:5px "></i>
        {{ $ml.get('word.add') + ' ' + $ml.get('word.newData') }}
      </li>
      <li style="text-align: center"
          @click="dialogFormVisible=true"
          class="vue-simple-context-menu__item">
        <i class="el-icon-edit" style="padding-right:5px "></i>
        {{ $ml.get('word.add') + ' ' + $ml.get('word.parameter') }}
      </li>
    </ul>
    <el-dialog :title=" $ml.get('word.autoEngine') +': №'+row_id+' \\ '+ $ml.get('word.parameter')+': '+column_name"
               :visible.sync="dialogFormVisible">
      <div v-if="dialogAutoFormVisible" style="height: 300px">

      </div>
      <div style="min-height: 100px;width: 100%;" v-else-if="column_id!==undefined">
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
                       :placeholder="$ml.get('word.choose')">
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
                    v-model="param.doubleNum"></el-input>
              </span>
              <span v-else-if="param.select===1">
          <el-input type="text" @change="onChangeData(param)"
                    :placeholder="param.textData" v-model="param.textData"
                    maxlength="120"
                    show-word-limit></el-input>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else style="height: 100px">

        <h5 style="position: absolute; top: 30px;left: 100px">
          {{ $ml.get('word.update') + ' ' + $ml.get('word.value') }}
        </h5>
        <el-input style="position: absolute; top: 25px;left: 350px;width: 50%" type="text"
                  v-model="param.textData"></el-input>
      </div>
      <el-button type="info " @click="addNewParamToList" plain style="width: 100%">Primary</el-button>
      <hr/>
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
    pageSetting:{
      type:Object
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

      paramList: [],
      paraSaveList: [],
      typeParamSelect: 1,
      dialogAutoFormVisible: false,
      dialogFormVisible: false,
      item: null,
      column: null,
      menuWidth: null,
      menuHeight: null,
      column_id: -1,
      column_name: '',
      listParmName: [],
      row_id: -1
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    ...mapGetters([
      'SAVE_FAST_PARAM_STATUS',
      'ENGDATA',
      'LISTPARAM',
      'LOAD_LIST_URL',
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
    onChangeData(param) {
      let temp = this.paraSaveList.find(item =>
          (item.elemId === param.elemId && param.nameElemId === -1) ||
          (item.nameElemId === param.nameElemId && param.elemId === -1)
      )
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
      'GET_ALL_AUTO'
    ]),
    openAutoDialog() {
      this.dialogFormVisible = true
      this.dialogAutoFormVisible = true
    },
    async saveAllParam() {
      let param = await this.SAVE_FAST_PARAM_DATA(this.paraSaveList)
      console.log(param)
      this.GET_ALL_AUTO(this.pageSetting);
      this.dialogFormVisible = false
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
      if (column.index !== undefined) {
        this.listParmName = []
        this.column_id = column.index.id;
        column.index.columnList.map(elem => {
          this.listParmName.push({
            id: elem.id,
            data: elem.name
          })
          if (item[elem.id] !== undefined) {
            let param = {
              id: 1,
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
            if (item[elem.id].match('^[0-9]*$')) {
              param.doubleNum = item[elem.id]
              param.select = 2
            } else if (item[elem.id].match('^[0-9]*.[0-9]*\\s*-\\s*[0-9]*.[0-9]*$')) {
              param.doubleMin = item[elem.id].substr(0, item[elem.id].indexOf('-'))
              param.doubleMax = item[elem.id].substr(item[elem.id].indexOf('-') + 1, item[elem.id].length)
              param.select = 3
            } else {
              param.textData = item[elem.id]
              param.select = 1
            }
            this.paramList.push(param)
          }
        })
      }

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
      this.paramList = []
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

<style lang="scss">
$light-grey: #ecf0f1;
$grey: darken($light-grey, 15%);
$blue: #409EFF;
$white: #fff;
$black: #333;

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
  background-color: $light-grey;
  border-bottom-width: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
  sans-serif;
  box-shadow: 0 3px 6px 0 rgba($black, 0.2);
  border-radius: 4px;

  &--active {
    display: block;
  }

  .dialog-foot {
    display: flex;
  }

  &__item {
    display: flex;
    color: $black;
    cursor: pointer;
    padding: 5px 15px;
    align-items: center;

    &:hover {
      background-color: #409EFF;
      color: $white;
    }
  }

  .main-row {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }

  el-select {
    justify-self: left;
  }

  .vue-simple-context-menu__item {
    padding-left: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  // Have to use the element so we can make use of `first-of-type` and
  // `last-of-type`
  li {
    &:first-of-type {
      margin-top: 4px;
    }

    &:last-of-type {
      margin-bottom: 4px;
    }
  }
}
</style>
