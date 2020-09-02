<template>

  <ul style="height: auto;">
    <li class="border-white bold list-group-item   li-hov"
        style="position: relative; width: auto; display: flex;align-items: center; height: 3.5em "
        v-if="item.elementsCh.length>0"
    >
      <div class="row" style=" padding: 0px ;width:100%;">
        <div class="col-md-9" style="display: flex;align-items: center; ">
              <span v-show="item.name!=''" @click="toggle" style="padding-left: 0vw;">
                  {{ space + item.name }}
                  <span class="item" v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
              </span>
        </div>
        <inputList
            class="col-md-8"
            v-show="item.name===''"
            title-input="дані для зміни"
            :items="PARAM_NAME.filter(elem=>{return elem.tree_node})"
            :show-title="true"
            :update-obj="saveElemData"
            index="paramNameFk"
            :hide-title="true"
            :holder-num=0
            style="position: relative; top: 0.25em; width: 80%"
        />
        <div class="col-md-1" v-show="item.name===''"></div>

        <div class="col-md-3">
          <div class=" btn-group  " style="display: flex;">
            <button v-show="item.name===''"
                    type="button"
                    class="btn  btn-success "
                    @click="saveElem(1)"
                    style="position: relative; left: 5vw;top:0.5vh"
            >
                          <span>
                               <p class="h5 md-2"><b-icon icon="check"></b-icon></p>
                          </span>
            </button>
            <button v-show="item.name===''"
                    type="button"
                    class="btn  btn-danger "
                    @click="deleteInPatent(item.id)"
                    style="position: relative; left: 5vw;top:0.5vh"
            >
                          <span>
                                      <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                          </span>
            </button>
          </div>
          <el-button circle v-show="changeMod==='off'"
                     v-if=" !linkOnThisButt.isPressed && item.parametersIsExistInChild"
                     v-on:click="pressed" type="info"
                     class="   btn-posit"
                     @click="getParamtrs(nav,item.id,linkOnThisButt)"
                     style="max-width: 3vw" icon="el-icon-d-arrow-right"
                     size="small">
          </el-button>
          <el-button disabled v-show="changeMod==='off'"
                     circle size="small"
                     v-if=" linkOnThisButt.isPressed && item.parametersIsExistInChild"
                     class="  btn-posit  " type="info"
                     style="max-width: 3vw" icon="el-icon-d-arrow-right">
          </el-button>
          <div class=" btn-group  " v-show="item.name!='' && changeMod==='tree'" role="group"
               style=" position: relative; top: 0.5vh; left: 3vw;padding: 1vh; width: 5vw">
            <button type="button"
                    class="btn btn-group   btn-info" @click="addElement(1)" style="z-index: 999">
                              <span>
                                  <p class="h5 md-2"><b-icon icon="plus"></b-icon></p>
                              </span>
            </button>

            <button type="button "
                    class="btn btn-group   btn-info"
                    @click="getParamSizeEelem()"
            >
                              <span>
                                  <b-icon icon="list-ul" font-scale="1.5"></b-icon>
                              </span>
            </button>
            <button type="button"
                    v-if=" !linkOnThisButt.isPressed "
                    class="btn btn-group   btn-info"
                    @click="setColorElem(item,linkOnThisButt)"
                    style="z-index: 999">
                              <span>
                                      <i class="el-icon-brush"></i>
                              </span>
            </button>
            <button type="button"
                    v-if="linkOnThisButt.isPressed "
                    class="btn btn-group  disabled btn-info"
                    style="z-index: 999">
                              <span>
                                      <i class="el-icon-brush"></i>
                              </span>
            </button>

            <el-popconfirm
                :confirmButtonText='confirmOk'
                :cancelButtonText='confirmNo'
                icon="el-icon-info"
                cancelButtonType="danger"
                iconColor="red"
                @onConfirm="deleteElements(item.id)"
                :title="confirmText"
                style="width: 0px"
            >
              <button type="button"
                      @click="setConfirmText()"
                      slot="reference"

                      class="btn btn-group   btn-info"
                      style="z-index: 999;border-bottom-left-radius: 0px;border-top-left-radius: 0px">
                              <span v-if="deleteLoadId!==item.id">
                                      <i class="el-icon-delete-solid"></i>
                              </span>
                <span v-else>
                                      <i class="el-icon-loading"></i>
                              </span>
              </button>
            </el-popconfirm>
          </div>

          <div class=" btn-group  " v-show="item.name!='' && changeMod==='on'"
               role="group" style=" position: relative; top: 0.5vh; left: 3vw;padding: 1vh">
            <button type="button " v-if=" !linkOnThisButt.isPressed "
                    v-on:click="pressed"
                    class="btn btn-group   btn-warning"
                    @click="getParamtrs(nav,item.id,linkOnThisButt)"
            >
                              <span>
                                      <b-icon icon="pencil"></b-icon>
                              </span>
            </button>
            <button type="button" v-if=" linkOnThisButt.isPressed "
                    class="btn btn-group   btn-warning disabled">
                              <span>
                                  <b-icon icon="pencil" animation="cylon"></b-icon>
                              </span>
            </button>
            <button type="button "
                    class="btn btn-group    btn-warning" @click="getPhoto(item.id)"
            >
                              <span>
                                  <b-icon icon="camera" font-scale="1.5"></b-icon>
                              </span>
            </button>
          </div>
        </div>
      </div>
    </li>
    <ul class="list-group border-white left" v-show="isOpen" v-if="isFolder">
      <tree-item
          class="item"
          v-for="(child, index) in item.elementsCh"
          :key="index"
          :item="child"
          :choice-param="choiceParam"
          :nav="child.name"
          :id-parent-elem="item.id"
          :change-mod="changeMod"
          :space="space.concat('')"
          :auto_id="auto_id"
          @get-paramtrs="getParamtrs"
          :show-edit-param="showEditParam"
          @parent-delete="deleteElem"
          @set-color-elem="setColorElem"
          @get-photo="getPhoto"
      ></tree-item>
    </ul>

    <el-dialog width="30%" :title="$ml.get('word.paramSizeName')" close-delay="dialog"
               :visible.sync="dialogTableVisible">
      <hr/>
      <div v-if="LOAD_PARAM_SIZE_NAME" class="lds-dual-ring-black" style="margin-left:44.5% "></div>
      <el-card v-for="(param,index) in listSizeParamOnDialog" v-bind:key="param" v-show="param.name!==''"
               class="card-st" shadow="hover">
        <div class="dialog-number">
          <h2>{{ index + 1 }}</h2>
        </div>
        <h5 style="margin-left: 50px;">{{ param.name!=='Тест'?param.name:$ml.get('word.value') }}</h5>
        <div class="arrow-up" @click="upSortNum(param)">
          <i class="el-icon-arrow-up"></i>
        </div>
        <div class="arrow-down" @click="downSortNum(param)"><i class="el-icon-arrow-down"></i></div>
        <el-popconfirm
            :confirmButtonText='confirmOk'
            :cancelButtonText='confirmNo'
            icon="el-icon-info"
            cancelButtonType="danger"
            iconColor="red"
            @onConfirm="deleteElementsSize(param.id)"
            :title="confirmText"
        >
          <div    slot="reference" class="dialog-delete" @click="setConfirmText()">
          <span v-if="deleteLoadId!==param.id">
            <i class="el-icon-delete-solid"></i>
          </span>
            <span v-else>
            <i class="el-icon-loading"></i>
          </span>
          </div>
        </el-popconfirm>
      </el-card>
      <hr/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addNewParamSize()">{{ $ml.get('word.add') }}</el-button>
      </div>
      <el-card class="card-st" v-for="param in listSizeParamOnDialog" v-bind:key="param"
               v-show="param.name===''" shadow="hover">
        <div class="row">
          <inputList
              class="col-md-7"
              title-input="дані для зміни"
              :items="PARAM_NAME.filter(elem=>{return !elem.tree_node})"
              :show-title="true"
              :update-obj="param"
              index="paramNameFk"
              :hide-title="true"
              :holder-num=0
              style="position: relative; top: 0.25em; width: 80%"
          />
          <div class="col-md-1"></div>
          <div class=" btn-group  btn-input col-md-3">
            <button
                type="button"
                class="btn  btn-success "
                @click="saveParamSize(param)"
                style="position: relative; left: 4vw;top:0.5vh"
            >
                        <span>
                             <p class="h5 md-2"><b-icon icon="check"></b-icon></p>
                        </span>
            </button>
            <button
                type="button"
                class="btn  btn-danger "
                @click="deleteParamSize(param)"
                style="position: relative; left: 4vw;top:0.5vh"
            >
                        <span>
                                    <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                        </span>

            </button>
          </div>
        </div>
      </el-card>
    </el-dialog>
  </ul>
  <!--<div>
  <el-tree :data="item"
           :props="{
      children: 'elementsCh',
      label: 'name'
    }"
           ref="tree"
           @node-click="handleNodeClick">
      <span class="custom-tree-node" slot-scope="{ node }">
          <div class="row"  >
      <div class="col-md-8">
           <span
           >{{ node.label }}</span>
      </div>
                <inputList
                    class="col-md-8"
                    v-show="item.name===''"
                    title-input="дані для зміни"
                    :items="PARAM_NAME.filter(elem=>{return elem.tree_node})"
                    :show-title="true"
                    :update-obj="saveElemData"
                    index="paramNameFk"
                    :hide-title="true"
                    :holder-num=0
                    style="position: relative; top: 0.25em; width: 80%"
                />
        <div class="col-md-1" v-show="item.name===''"></div>

        <div class="col-md-3">
          <div class=" btn-group  " style="display: flex;">
            <button v-show="item.name===''"
                    type="button"
                    class="btn  btn-success "
                    @click="saveElem(1)"
                    style="position: relative; left: 5vw;top:0.5vh"
            >
                        <span>
                             <p class="h5 md-2"><b-icon icon="check"></b-icon></p>
                        </span>
            </button>
            <button v-show="item.name===''"
                    type="button"
                    class="btn  btn-danger "
                    @click="deleteInPatent(item.id)"
                    style="position: relative; left: 5vw;top:0.5vh"
            >
                        <span>
                                    <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                        </span>
            </button>
          </div>
          <el-button circle v-show="changeMod==='off'"
                     v-if=" !linkOnThisButt.isPressed && item.parametersIsExistInChild"
                     v-on:click="pressed" type="info"
                     class="   btn-posit"
                     @click="getParamtrs(nav,item.id,linkOnThisButt)"
                     style="max-width: 3vw" icon="el-icon-d-arrow-right"
                     size="small">
          </el-button>
          <el-button disabled v-show="changeMod==='off'"
                     circle size="small"
                     v-if=" linkOnThisButt.isPressed && item.parametersIsExistInChild"
                     class="  btn-posit  " type="info"
                     style="max-width: 3vw" icon="el-icon-d-arrow-right">
          </el-button>
          <div class=" btn-group  " v-show="item.name!='' && changeMod==='tree'" role="group"
              >
            <button type="button"
                    class="btn btn-group   btn-info" @click="addElement(1)" style="z-index: 999">
                            <span>
                                <p class="h5 md-2"><b-icon icon="plus"></b-icon></p>
                            </span>
            </button>

            <button type="button "
                    class="btn btn-group   btn-info"
                    @click="getParamSizeEelem()"
            >
                            <span>
                                <b-icon icon="list-ul" font-scale="1.5"></b-icon>
                            </span>
            </button>
            <button type="button"
                    v-if=" !linkOnThisButt.isPressed "
                    class="btn btn-group   btn-info"
                    @click="setColorElem(item,linkOnThisButt)"
                    style="z-index: 999">
                            <span>
                                    <i class="el-icon-brush"></i>
                            </span>
            </button>
            <button type="button"
                    v-if="linkOnThisButt.isPressed "
                    class="btn btn-group  disabled btn-info"
                    style="z-index: 999">
                            <span>
                                    <i class="el-icon-brush"></i>
                            </span>
            </button>
            <button type="button"
                    class="btn btn-group   btn-info"
                    style="z-index: 999">
                            <span>
                                    <i class="el-icon-delete-solid"></i>
                            </span>
            </button>
          </div>

          <div class=" btn-group  " v-show="item.name!='' && changeMod==='on'"
               role="group" style=" position: relative; top: 0.5vh; left: 3vw;padding: 1vh">
            <button type="button " v-if=" !linkOnThisButt.isPressed "
                    v-on:click="pressed"
                    class="btn btn-group   btn-warning"
                    @click="getParamtrs(nav,item.id,linkOnThisButt)"
            >
                            <span>
                                    <b-icon icon="pencil"></b-icon>
                            </span>
            </button>
            <button type="button" v-if=" linkOnThisButt.isPressed "
                    class="btn btn-group   btn-warning disabled">
                            <span>
                                <b-icon icon="pencil" animation="cylon"></b-icon>
                            </span>
            </button>
            <button type="button "
                    class="btn btn-group    btn-warning" @click="getPhoto(item.id)"
            >
                            <span>
                                <b-icon icon="camera" font-scale="1.5"></b-icon>
                            </span>
            </button>
          </div>
        </div>
          </div>
    </span>
  </el-tree>
  <el-dialog width="25%" :title="$ml.get('word.paramSizeName')" close-delay="dialog"
             :visible.sync="dialogTableVisible">
    <hr/>
    <div v-if="LOAD_PARAM_SIZE_NAME" class="lds-dual-ring-black" style="margin-left:44.5% "></div>
    <el-card v-for="(param,index) in listSizeParamOnDialog" v-bind:key="param" v-show="param.name!==''"
             class="card-st" shadow="hover">
      <div class="dialog-number">
        <h2>{{ index + 1 }}</h2>
      </div>
      <h5 style="margin-left: 50px;">{{ param.name }}</h5>
      <div class="arrow-up" @click="upSortNum(param)">
        <i class="el-icon-arrow-up"></i>
      </div>
      <div class="arrow-down" @click="downSortNum(param)"><i class="el-icon-arrow-down"></i></div>
      <div class="dialog-delete"><i class="el-icon-delete-solid"></i></div>
    </el-card>
    <hr/>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addNewParamSize()">{{ $ml.get('word.add') }}</el-button>
    </div>
    <el-card class="card-st" v-for="param in listSizeParamOnDialog" v-bind:key="param"
             v-show="param.name===''" shadow="hover">
      <div class="row">
        <inputList
            class="col-md-7"
            title-input="дані для зміни"
            :items="PARAM_NAME.filter(elem=>{return !elem.tree_node})"
            :show-title="true"
            :update-obj="param"
            index="paramNameFk"
            :hide-title="true"
            :holder-num=0
            style="position: relative; top: 0.25em; width: 80%"
        />
        <div class="col-md-1"></div>
        <div class=" btn-group  btn-input col-md-3">
          <button
              type="button"
              class="btn  btn-success "
              @click="saveParamSize(param)"
              style="position: relative; left: 4vw;top:0.5vh"
          >
                        <span>
                             <p class="h5 md-2"><b-icon icon="check"></b-icon></p>
                        </span>
          </button>
          <button
              type="button"
              class="btn  btn-danger "
              @click="deleteParamSize(param)"
              style="position: relative; left: 4vw;top:0.5vh"
          >
                        <span>
                                    <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                        </span>
          </button>
        </div>
      </div>
    </el-card>
  </el-dialog>
</div>-->
</template>

<script>

import {mapMutations, mapGetters, mapActions} from "vuex";
import inputList from "../input/vue-datalist";

export default {

  name: "tree-item",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    inputList
  },
  props: {
    showEditParam: Boolean,
    idParentElem: null,
    changeMod: String,
    nowPressed: Object,
    space: String,
    auto_id: Number,
    item: Object,
    nav: String,
    choiceParam: Object
  },
  data: function () {
    return {
      confirmText: '',
      confirmOk: '',
      confirmNo: '',
      listSizeParamOnDialog: [],
      paramSizeList: [],
      dialogTableVisible: false,
      saveElemData: {
        elemId: null,
        paramNameFk: null,
        parentId: null,
        sortNumber: null
      },
      color1: null,
      deleteLoadId: -1,
      elementsCh: [],
      listNewElem: [],
      isOpen: false,
      linkOnThisButt: {
        isPressed: false
      },
      maxId: 5000
    };
  },
  computed: {
    ...mapGetters([
      'PARAM_NAME_AND_UNITS',
      'LISTNEWELEM',
      'ELEMENTS_AND_MAX_ID',
      'ELEMENTS',
      'ELEMENTS_TREE',
      'PARAM_SIZE_NAME',
      'LOAD_PARAM_SIZE_NAME',
      'PARAM_NAME'
    ]),
    isFolder: function () {
      return this.elementsCh && this.item.elementsCh.length
          && this.elementsCh.find(item => item.elementsCh.length > 0) !== undefined;
    }
  },
  methods: {
    ...mapMutations({
      setElements: 'SET_ELEMENTS',
      setListNewElem: 'SET_LIST_NEW_PARAM',
      setParamSizeName: 'SET_PARAM_SIZE_NAME',
      setMaxId: 'SET_ELEMENTS_TREE_MAXID'
    }),
    ...mapActions([
      'GET_PARAM_SIZE_NAME',
      'DELETE_ELEMENTS'
    ]),
    handleNodeClick(data) {
      console.log(data);
    },
    deleteInPatent(id) {
      this.saveElemData = {
        elemId: null,
        paramNameFk: null,
        parentId: null
      },
          this.$emit("parent-delete", id)
    },
    deleteElem(id) {
      this.item.elementsCh = this.item.elementsCh.filter(elem => elem.id !== id)
      console.log(id)
    },
    async getParamSizeEelem() {
      this.listSizeParamOnDialog = this.item.elementsCh.filter(elem => {
        return !elem.parametersIsExistInChild
      })
      this.dialogTableVisible = true
    },
    showRow(value, data, node) {
      console.log(value, data, node)
      return data.elementsCh.length > 0
    },
    getPhoto(id) {
      this.$emit("get-photo", id)
    },
    setConfirmText() {
      this.confirmText=  this.$ml.get('msg.deleteConfirm')
      this.confirmOk=  this.$ml.get('word.confirm')
      this.confirmNo=  this.$ml.get('word.cancel')
    },
    swap(obj1, obj2) {
      let obj = {
        id: obj1.id,
        name: obj1.name
      };
      obj1.name = obj2.name
      obj1.id = obj2.id
      obj2.id = obj.id
      obj2.name = obj.name
    },
    upSortNum(param) {
      let index = this.listSizeParamOnDialog.indexOf(param);
      if (index > 0) {
        let obj1 = {
          elemId: param.id,
          sortNumber: this.listSizeParamOnDialog[index - 1].sortNumber,
        }
        let obj2 = {
          elemId: this.listSizeParamOnDialog[index - 1].id,
          sortNumber: this.listSizeParamOnDialog[index].sortNumber,
        }
        this.swap(this.listSizeParamOnDialog[index],
            this.listSizeParamOnDialog[index - 1])
        this.$emit("add-elem-to-update", obj1)
        this.$emit("add-elem-to-update", obj2)
      }

    },
    downSortNum(param) {

      let index = this.listSizeParamOnDialog.indexOf(param);
      if (index < this.listSizeParamOnDialog.length - 1) {
        let obj1 = {
          elemId: param.id,
          sortNumber: this.listSizeParamOnDialog[index + 1].sortNumber,
        }
        let obj2 = {
          elemId: this.listSizeParamOnDialog[index + 1].id,
          sortNumber: this.listSizeParamOnDialog[index].sortNumber,
        }
        this.swap(this.listSizeParamOnDialog[index],
            this.listSizeParamOnDialog[index + 1])
        this.$emit("add-elem-to-update", obj1)
        this.$emit("add-elem-to-update", obj2)
      }
    },
    async deleteElementsSize(id) {
      this.deleteLoadId = id
      let index = this.LISTNEWELEM.findIndex(item => item.elemid === id)
      if (index !== -1) {
        this.listNewElem = this.LISTNEWELEM;
        this.listNewElem.splice(index, 1);
        this.setListNewElem(this.listNewElem);
      } else {
        let resp = await this.DELETE_ELEMENTS(id)
        if (resp) {
          this.item.elementsCh.splice(this.item.elementsCh.findIndex(item => item.id === id), 1);
          this.listSizeParamOnDialog.splice(this.listSizeParamOnDialog.findIndex(item => item.id === id), 1);
        }
      }
      this.$message({
        showClose: true,
        message: this.$ml.get('msg.deleteSuccess'),
        type: 'success'
      });
      this.deleteLoadId = -1
    },
    async deleteElements(id) {
      this.deleteLoadId = id
      let index = this.LISTNEWELEM.findIndex(item => item.elemid === id)
      if (index !== -1) {
        this.$message({
          showClose: true,
          message: this.$ml.get('msg.deleteSuccess'),
          type: 'success'
        });
        this.listNewElem = this.LISTNEWELEM;
        this.listNewElem.splice(index, 1);
        this.setListNewElem(this.listNewElem);
      } else {
        this.$message({
          showClose: true,
          message: this.$ml.get('msg.deleteSuccess'),
          type: 'success'
        });
        let resp = await this.DELETE_ELEMENTS(id)
        if (resp) {
          this.item.elementsCh = []
        }
      }
      this.deleteLoadId = -1
    },
    addElement: function (number) {
      this.isOpen = true;
      this.item.elementsCh.push({
            id: this.ELEMENTS_TREE.maxId,
            elementsCh: [{
              id: 0,
              elementsCh: [],
              name: '',
              paramIsNotEmpty: true,
              parametersIsExistInChild: true
            }],
            name: '',
            paramIsNotEmpty: true,
            parametersIsExistInChild: true
          }
      );
      //  this.setMaxId(this.ELEMENTS_TREE.maxId + 1);
      console.log(number);
    },
    saveElem(number) {
      this.item.name = this.PARAM_NAME.find(item => item.id === this.saveElemData.paramNameFk).data;
      this.saveElemData.parentId = this.idParentElem;
      this.saveElemData.elemId = this.ELEMENTS_TREE.maxId + 1;
      this.saveElemData.sortNumber = this.ELEMENTS_TREE.maxId + 1;
      this.item.id = this.ELEMENTS_TREE.maxId + 1;
      this.listNewElem = this.LISTNEWELEM;
      this.listNewElem.push(this.saveElemData);
      this.listNewElem.push({
        elemId: this.ELEMENTS_TREE.maxId + 2,
        paramNameFk: -1,
        parentId: this.ELEMENTS_TREE.maxId + 1,
        color: this.item.color,
        sortNumber: this.ELEMENTS_TREE.maxId + 2
      });
      this.setListNewElem(this.listNewElem);
      this.setMaxId(this.ELEMENTS_TREE.maxId + 2);
      this.listElem.push(this.saveElemData)
      console.log(number);
    },
    getParamtrs(nav, number, link) {
      if (this.showEditParam.show) {
        this.$emit("get-paramtrs", nav, number, link)
      } else {
        this.$emit("get-paramtrs", nav, number, link)
        this.showEditParam.show = true;
      }
    },
    setColorElem(item, link) {
      if (!link.isPressed) {
        this.$emit("set-color-elem", item, link)
      }
    },
    addNewParamSize() {
      this.listSizeParamOnDialog.push({
            elementsCh: [],
            paramNameFk: 0,
            parentId: 0,
            name: '',
          }
      )
    },
    deleteParamSize(param) {
      this.listSizeParamOnDialog.splice(this.listSizeParamOnDialog.indexOf(param), 1)
    },
    deleteDefaultSizeFromItem() {
      let listNewElem = this.LISTNEWELEM;
      let index = this.listNewElem
          .findIndex(item => item.parentId === this.item.id && item.paramNameFk === -1)
      listNewElem.splice(index, 1)
      this.setListNewElem(listNewElem);
    },
    saveParamSize(param) {
      if (this.item.elementsCh.length === 1) {
        this.item.elementsCh = []
        this.deleteDefaultSizeFromItem()
      }
      param.name = this.PARAM_NAME.find(item => item.id === param.paramNameFk).data;
      this.listNewElem = this.LISTNEWELEM;
      this.listNewElem.push({
        elemId: this.ELEMENTS_TREE.maxId + 1,
        paramNameFk: param.paramNameFk,
        parentId: this.item.id,
        color: "grey",
        sortNumber: this.ELEMENTS_TREE.maxId + 1
      });

      this.item.elementsCh.push({
        id: this.ELEMENTS_TREE.maxId + 1,
        name: param.name,
        paramIsNotEmpty: true,
        color: "gray",
        sortNumber: this.ELEMENTS_TREE.maxId + 1,
        parametersIsExistInChilda: false
      })
      this.listSizeParamOnDialog = this.item.elementsCh.filter(elem => {
        return !elem.parametersIsExistInChild
      })
      this.setListNewElem(this.listNewElem);
      this.setMaxId(this.ELEMENTS_TREE.maxId + 1);
    },
    pressed() {
      if (!this.linkOnThisButt.isPressed) {
        this.linkOnThisButt.isPressed = true;
      }

    },
    toggle: function () {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    }
  },
  mounted() {
    this.maxId = this.ELEMENTS_TREE.maxId;
    this.elementsCh = this.item.elementsCh;
  }
}
</script>


<style>
.dialog-number {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0px;
  color: white;
  width: 50px;
  height: 100%;
  background: lightslategrey;
}

.btn-group {
  position: relative;
  right: 7em;
}

.item {
  cursor: pointer;
}

.bold {
  font-weight: bold;
}

ul {
  color: #303133;
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: none;
}

.li-hov:hover {
  background: #edf5ff;
}

div {
  position: relative;;
}

.dialog-footer {
  display: flex;
  justify-content: center;
  align-content: flex-end;
  width: 100%;
}

.posLeft {
  position: relative;
  left: 8em;
  top: 1.4em;
}

.btn-input {
  justify-self: center;
  align-self: self-end;
}

.card-st {
  flex-direction: row;
  margin: 20px;
  position: relative;
}

.btn-posit {
  position: relative;
  left: .5em;
  top: .5em;
}


.arrow-up {
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  right: 50px;
  width: 50px;
  height: 50%;
  transition: .3s;
}

.arrow-down {
  border-style: solid;
  border-top-color: lightgray;
  border-width: 1px 0px 0px 0px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0px;
  right: 50px;
  width: 50px;
  height: 50%;
  transition: .3s;
}

.dialog-delete {
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  right: 0%;
  width: 50px;
  height: 100%;
  transition: .3s;
}

.arrow-down:hover {
  background: #E4E7ED;
}

.arrow-up:hover {
  background: #E4E7ED;
}

.dialog-delete:hover {
  background: #fde2e2;
}

</style>