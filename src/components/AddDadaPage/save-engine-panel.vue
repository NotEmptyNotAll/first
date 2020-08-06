<template>
    <div>
        <ul class="nav nav-tabs" id="myTabengine" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="home-tabengine" data-toggle="tab" :href="'#h'+nameTitle"
                   v-on:click="cancelsave" @click="cancel"
                   role="tab" aria-controls="home" aria-selected="true">{{$ml.get('word.table')}}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="profile-tabengine" data-toggle="tab" :href="'#p'+nameTitle"
                   @click="cancel"

                   role="tab" aria-controls="profile" aria-selected="false">{{$ml.get('word.save')}}</a>
            </li>
            <li class="nav-item">
                <a
                        class="nav-link" id="contact-tabengine" ref="updateTab" data-toggle="tab" :href="'#c'+nameTitle"
                        role="tab" aria-controls="contact" aria-selected="false">{{$ml.get('word.update')}}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab"
                   :href="'#inp'+nameTitle" @click="cancel"
                   role="tab" aria-controls="impr" aria-selected="false">{{$ml.get('word.importFile')}}</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContentengine" style="border: white">
            <div class="tab-pane fade show active" :id="'h'+nameTitle" role="tabpanel"
                 aria-labelledby="home-tab">
                <div class="row" style="padding-top: 3vh">
                    <div class="title-bord col-md-2">
                        <h4> {{nameTitle}}</h4>
                    </div>
                    <div class="col-md-2">
                    </div>
                    <div class="col-md-2">
                        <el-button plain type="info" style="width: 100%; font-size: 16px" v-on:click="onexport">
                            {{$ml.get('word.exportFile')}}
                        </el-button>
                    </div>
                    <div class="col-md-2">
                        <el-dropdown style="width: 100%" :hide-on-click="false">
                            <el-button type="primary" style="width: 100%; font-size: 16px">
                                {{$ml.get('word.column')}}
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu style="width: 11vw;" slot="dropdown">
                                <el-checkbox-group :min="1"
                                                   v-model="checkedColumns" @change="handleCheckedColumnChange">
                                    <el-checkbox v-for="column in columns" style="padding-left: 2vw" :label="column"
                                                 :key="column">{{column}}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="input-group col-md-4">
                        <el-input :placeholder="$ml.get('word.search')" v-model="search"
                                  v-on:input="onChange"
                                  v-on:click="onChange" class="input-with-select" clearable>
                            <el-button slot="prepend" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                </div>
                <b-table class="my-table-scroll" no-border-collapse hover
                         sticky-header="650px" :items="dataList"
                         @row-dblclicked="(item) => link( item)"
                         :fields="tableColumns">

                    <template v-slot:cell(index)="data">
                        {{ data.index + 1 }}
                    </template>

                </b-table>

                <!--<table responseive  class="table table-hover  " style="text-align: center; z-index: 0; border-radius: 0px; ">
                <thead >
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">{{$ml.get('word.engine')}}</th>
                    <th scope="col">{{$ml.get('word.cylinders')}}</th>
                    <th scope="col">{{$ml.get('word.fuelType')}}</th>
                    <th scope="col" v-text="$ml.get('word.engineManufacture')"></th>
                    <th scope="col" v-text="$ml.get('word.superchargedType')"></th>
                    <th scope="col" v-text="$ml.get('word.pistonStroke')"></th>
                    <th scope="col" v-text="$ml.get('word.engineCapacity')"></th>
                    <th scope="col" v-text="$ml.get('word.powerKwt')"></th>
                    <th scope="col" v-text="$ml.get('word.horsepower')"></th>
                    <th scope="col" v-text="$ml.get('word.cylindersNumber')"></th>
                    <th scope="col" v-text="$ml.get('word.flapNumber')"></th>
                    <th scope="col" v-text="$ml.get('word.degreeCompression')"></th>
                    <th scope="col" v-text="$ml.get('word.releaseYear')"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="current in dataList" v-bind:key="current" v-show="current.data!==''">
                    <td>{{current.id}}</td>
                    <td>{{current.data}}</td>
                    <td>{{current.cylindersPlacement}}</td>
                    <td>{{current.fuelType}}</td>
                    <td>{{current.engineManufacture}}</td>
                    <td>{{current.superchargedType}}</td>
                    <td>{{current.pistonStroke}}</td>
                    <td>{{current.engineCapacity}}</td>
                    <td>{{current.powerKwt}}</td>
                    <td>{{current.horsepower}}</td>
                    <td>{{current.cylindersNumber}}</td>
                    <td>{{current.flapNumber}}</td>
                    <td>{{current.degreeCompression}}</td>
                    <td>
                        <span v-if="current.releaseYearFrom!=null && current.releaseYearBy!=null"> {{current.releaseYearFrom+'-'+current.releaseYearBy}}</span>
                        <span v-else-if="current.releaseYearFrom!=null ">{{current.releaseYearFrom}}</span>
                        <span v-else-if="current.releaseYearBy!=null">{{current.releaseYearBy}}</span>
                        <span v-else-if="current.releaseYearFrom==null && current.releaseYearBy==null"></span>
                    </td>

                </tr>
                </tbody>
                </table>-->
                <div v-if="LOAD_ADDITIONAL_DATA" class="lds-dual-ring-black" style="margin-left:47% "></div>

            </div>
            <div class="tab-pane fade" :id="'p'+nameTitle" role="tabpanel"
                 aria-labelledby="profile-tab">
                <br/>
                <div class="title-bord col-md-2">
                    <h4> {{nameTitle}}</h4>
                </div>
                <hr/>
                <div class="savePageRow  row ">
                    <div v-if="showErr" class="alert alert-danger" role="alert" style="text-align:center; width: 100%">
                        {{$ml.get('msg.duplicateValue')}}
                    </div>

                </div>
                <div class=" row ">
                    <input-field class="col-md-4"
                                 :name-input="$ml.get('word.engine')"
                                 :save-parameters="saveDataObj"
                                 index="engineType"
                    />
                    <vue-datalist
                            class="col-md-4"
                            :title-input="$ml.get('word.fuelType')"
                            :items="ADDITIONAL_DATA.fuelType"
                            :update-obj="saveDataObj"
                            index="fuelTypeFk"
                            :holder-num=0
                    />
                    <vue-datalist
                            class="col-md-4"
                            :title-input="$ml.get('word.engineManufacture')"
                            :items="ADDITIONAL_DATA.engineManufacture"
                            :update-obj="saveDataObj"
                            index="engineManufacturerFk"
                            :holder-num=0

                    />

                </div>
                <div class=" row ">
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.cylinders')"
                            :items="ADDITIONAL_DATA.cylinders"
                            :update-obj="saveDataObj"
                            :holder-num=0
                            index="cylindersPlacementFk"
                    />
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.superchargedType')"
                            :items="ADDITIONAL_DATA.superchargeType"
                            :update-obj="saveDataObj"
                            index="superchargedTypeFk"
                            :holder-num=0
                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.pistonStroke')"
                                 :save-parameters="saveDataObj"
                                 index="pistonStroke"
                    />
                    <input-field class="col-md-3"
                                 :aria-placeholder="$ml.get('word.engineCapacity')"
                                 :save-parameters="saveDataObj"
                                 index="engineCapacity"

                    />
                </div>
                <div class="  row ">
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.powerKwt')"
                                 :save-parameters="saveDataObj"
                                 index="powerKwt"

                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.horsepower')"
                                 :save-parameters="saveDataObj"
                                 index="horsepower"
                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.cylindersNumber')"
                                 :save-parameters="saveDataObj"
                                 index="cylindersNumber"
                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.flapNumber')"
                                 :save-parameters="saveDataObj"
                                 index="flapNumber"
                    />
                </div>
                <div class=" row">
                    <input-field class="col-md-4"
                                 :name-input="$ml.get('word.degreeCompression')"
                                 :save-parameters="saveDataObj"
                                 index="degreeCompression"

                    />
                    <input-field class="col-md-4"
                                 :name-input="$ml.get('word.pistonDiameter')"
                                 :save-parameters="saveDataObj"
                                 index="pistonDiameter"
                    />
                    <div class="input-group col-md-4">
                        <el-input :placeholder="$ml.get('word.from')"
                                  v-model="saveDataObj.releaseYearFrom"
                                  style="width: 62%"
                                  max="2020"
                                  min="1895"
                                  type="number"
                                  clearable
                        >
                            <template slot="prepend">
                                <strong class="title" style="font-size: 15px">{{$ml.get('word.releaseYear')}}</strong>
                            </template>
                        </el-input>
                        <el-input :placeholder="$ml.get('word.by')"
                                  clearable
                                  max="2020"
                                  min="1895"
                                  type="number"
                                  style="width: 38%"
                                  v-model="saveDataObj.releaseYearBy">
                        </el-input>
                        <!--
                        <div class="input-group-prepend">
                            <label class="input-group-text bg-white  " for="relYear">
                                {{$ml.get('word.releaseYear')}}
                                <div v-if="LOADPARAM" class="lds-dual-ring"></div>
                            </label>
                        </div>
                        <input id="relYear" min="1885" max="2020"
                               v-model="saveDataObj.releaseYearFrom"
                               autocomplete="on" type="number"
                               class="form-control"
                               :placeholder="$ml.get('word.from')"
                               step="1"
                               aria-describedby="button-addon1">
                        <input min="1885" max="2020"
                               v-model="saveDataObj.releaseYearBy"
                               autocomplete="on"
                               class="form-control"
                               type="number"
                               step="1"
                               :placeholder="$ml.get('word.by')"
                               aria-describedby="button-addon1">
                        <div class="input-group-append">

                            <button class="btn btn-outline-danger"
                                    v-on:click="saveDataObj.releaseYearFrom=null"
                                    @click="saveDataObj.releaseYearBy=null"
                                    type="button">
                                <span>&#10008;</span>
                            </button>
                        </div>-->
                    </div>
                </div>
                <hr style="position: center; width: 70%"/>
                <div class=" row ">
                    <div class="col-md-3">
                    </div>
                    <div class="  col-md-3">

                        <button type="submit" @click="cancelsave()"
                                class="btn  btn-outline-danger btn-block ">
                            <span>{{$ml.get('word.cancel')}}</span>
                        </button>
                    </div>
                    <div class="col-md-3">
                        <button v-if="!loadStatus && !LOAD_ADDITIONAL_DATA" type="submit" @click="saveEngManufacture(1)"
                                class="btn btn-outline-dark btn-block ">
                            <span>{{$ml.get('word.save')}}</span>
                        </button>
                        <button v-if="loadStatus || LOAD_ADDITIONAL_DATA" type="submit"
                                class="btn  btn-block btn-dark" disabled>
                            <span><div class="lds-dual-ring" style="position: relative; bottom: 1.2vh"></div></span>
                        </button>
                    </div>

                    <div class="col-md-3"></div>
                </div>
                <hr/>
            </div>
            <div class="tab-pane fade" :id="'c'+nameTitle" role="tabpanel"
                 aria-labelledby="contact-tab">

                <br/>
                <div class="title-bord col-md-2">
                    <h4> {{nameTitle}}</h4>
                </div>
                <hr/>
                <div class=" row">
                    <vue-datalist
                            class="col-md-6"
                            :title-input="$ml.get('word.changeTypeOfEngine')"
                            :items="ADDITIONAL_DATA.engine"
                            :update-obj="updateDataObj"
                            index="objToBeChanged"
                            :holder-num=0
                            :show-title="false"

                    />
                    <div class="col-md-2">
                        <button v-if="!loadStatus"
                                type="submit"
                                class="btn btn-outline-dark btn-block "
                                @click="getEng(1)"
                        >
                            <span>{{$ml.get('word.choose')}}</span>
                        </button>
                        <button v-if="loadStatus" type="submit"
                                class="btn  btn-block btn-dark" disabled>
                            <span><div class="lds-dual-ring" style="position: relative; bottom: 1.2vh"></div></span>
                        </button>

                    </div>
                    <div class="col-md-2">
                        <button v-if="loadStatus" type="submit"
                                class="btn  btn-block btn-dark" disabled>
                            <span><div class="lds-dual-ring" style="position: relative; bottom: 1.2vh"></div></span>
                        </button>
                        <button v-if="!loadStatus" type="submit" @click="update(1)"
                                class="btn  btn-block btn-outline-dark">
                            <span>{{$ml.get('word.update')}}</span>
                        </button>
                    </div>
                    <div class="  col-md-2">

                        <button type="submit" @click="cancel()"
                                class="btn  btn-outline-danger btn-block ">
                            <span>{{$ml.get('word.cancel')}}</span>
                        </button>
                    </div>
                </div>
                <hr style="color: lightgray"/>
                <div class=" row">
                    <input-field
                            class="col-md-4"
                            :name-input="$ml.get('word.engine')"
                            :save-parameters="updateDataObj"
                            index="engineType"
                    />
                    <vue-datalist
                            class="col-md-4"
                            :title-input="$ml.get('word.cylinders')"
                            :items="ADDITIONAL_DATA.cylinders"
                            :update-obj="updateDataObj"
                            :holderNum="tempData.cylindersPlacementFk"
                            index="cylindersPlacementFk"
                            :clean-search="cleanInputList"

                    />
                    <vue-datalist
                            class="col-md-4"
                            :title-input="$ml.get('word.engineManufacture')"
                            :items="ADDITIONAL_DATA.engineManufacture"
                            :update-obj="updateDataObj"
                            :holderNum="tempData.engineManufacturerFk"
                            index="engineManufacturerFk"
                            :clean-search="cleanInputList"
                    />

                </div>
                <div class=" row">
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.fuelType')"
                            :items="ADDITIONAL_DATA.fuelType"
                            :update-obj="updateDataObj"
                            :holderNum="tempData.fuelTypeFk"
                            index="fuelTypeFk"
                            :clean-search="cleanInputList"
                    />
                    <vue-datalist
                            class="col-md-3"
                            :title-input="$ml.get('word.superchargedType')"
                            :items="ADDITIONAL_DATA.superchargeType"
                            :update-obj="updateDataObj"
                            :holderNum="tempData.superchargedTypeFk"
                            index="superchargedTypeFk"
                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.pistonStroke')"
                                 :save-parameters="updateDataObj"
                                 index="pistonStroke"
                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.engineCapacity')"
                                 :save-parameters="updateDataObj"
                                 index="engineCapacity"
                    />

                </div>
                <div class=" row">
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.powerKwt')"
                                 :save-parameters="updateDataObj"
                                 index="powerKwt"
                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.horsepower')"
                                 :save-parameters="updateDataObj"
                                 index="horsepower"
                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.cylindersNumber')"
                                 :save-parameters="updateDataObj"
                                 index="cylindersNumber"
                    />
                    <input-field class="col-md-3"
                                 :name-input="$ml.get('word.flapNumber')"
                                 :save-parameters="updateDataObj"
                                 index="flapNumber"
                    />
                </div>
                <div class=" row">
                    <input-field class="col-md-4"
                                 :name-input="$ml.get('word.degreeCompression')"
                                 :save-parameters="updateDataObj"
                                 index="degreeCompression"
                    />
                    <input-field class="col-md-4"
                                 :name-input="$ml.get('word.pistonDiameter')"
                                 :save-parameters="updateDataObj"
                                 index="pistonDiameter"
                    />
                    <div class="input-group col-md-4">
                        <el-input :placeholder="$ml.get('word.from')"
                                  v-model="updateDataObj.releaseYearFrom"
                                  style="width: 62%"
                                  max="2020"
                                  min="1895"
                                  type="number"
                                  clearable
                        >
                            <template slot="prepend">
                                <strong class="title" style="font-size: 15px">{{$ml.get('word.releaseYear')}}</strong>
                            </template>
                        </el-input>
                        <el-input :placeholder="$ml.get('word.by')"
                                  clearable
                                  max="2020"
                                  min="1895"
                                  type="number"
                                  style="width: 38%"
                                  v-model="updateDataObj.releaseYearBy"
                        >
                        </el-input>
                        <!--
                        <div class="input-group-prepend">
                            <label class="input-group-text  bg-white " for="releaseYear">
                                {{$ml.get('word.releaseYear')}}
                                <div v-if="LOADPARAM" class="lds-dual-ring"></div>
                            </label>
                        </div>
                        <input id="releaseYear" min="1885" max="2020"
                               v-model="updateDataObj.releaseYearFrom"
                               autocomplete="on" type="number"
                               class="form-control"
                               :placeholder="$ml.get('word.from')"
                               step="1"
                               aria-describedby="button-addon1">
                        <input id="fuelTFk" min="1885" max="2020"
                               v-model="updateDataObj.releaseYearBy"
                               autocomplete="on"
                               class="form-control"
                               type="number"
                               step="1"
                               :placeholder="$ml.get('word.by')"
                               aria-describedby="button-addon1">
                        <div class="input-group-append">

                            <button class="btn btn-outline-danger"
                                    v-on:click="updateDataObj.releaseYearFrom=null"
                                    @click="updateDataObj.releaseYearBy=null"
                                    type="button">
                                <span>&#10008;</span>
                            </button>
                        </div>-->
                    </div>
                </div>
                <hr/>
            </div>
            <div class="tab-pane fade" :id="'inp'+nameTitle" role="tabpanel"
                 aria-labelledby="impr-tab">
                <div class="upload-box">
                    <div class="row import-page-btn">
                        <div class="col-md-2 title-bord">
                            <h4> {{nameTitle}}</h4>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-4">
                            <el-upload
                                    :file-list="listFile"
                                    :show-file-list="false"
                                    class="upload-demo"
                                    :on-change="handleChange"
                                    :on-remove="handleRemove"
                                    :on-exceed="handleExceed"
                                    :limit="limitUpload"
                                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                                    :auto-upload="false">
                                <button class="btn  btn-block   btn-outline-dark" style="width: 20vw">
                                    {{$ml.get('word.clickToUpload')}}
                                </button>
                            </el-upload>
                        </div>
                        <div class="col-md-2">
                            <button class="btn  btn-block   btn-secondary" :class="{disabled:(da===null)}" type="button"
                                    @click="importFile"
                            >
                         <span>{{$ml.get('word.importFile')}}
                        </span>
                            </button>
                        </div>
                        <div class="col-md-2 ">
                            <button class="btn  btn-block  btn-danger" :class="{disabled:(da===null)}" type="button"
                                    @click="cancelInport"
                            >
                         <span>{{$ml.get('word.cancel')}}
                        </span>
                            </button>
                        </div>
                        <div class="col-md-1"></div>
                    </div>
                </div>
                <hr/>
                <el-table
                        :empty-text="$ml.get('word.empty')"
                        height="600" :data="da"
                        :row-class-name="tableRowClassName">
                    <el-table-column prop="id" label="№">
                    </el-table-column>
                    <el-table-column prop="data" :label="$ml.get('word.engine')">
                    </el-table-column>
                    <el-table-column prop="engineManufacturer" :label="$ml.get('word.engineManufacture')">
                    </el-table-column>
                    <el-table-column prop="cylindersPlacement" :label="$ml.get('word.cylinders')">
                    </el-table-column>
                    <el-table-column prop="fuelType" :label="$ml.get('word.fuelType')">
                    </el-table-column>
                    <el-table-column prop="superchargedType" :label="$ml.get('word.superchargedType')">
                    </el-table-column>
                    <el-table-column prop="cylindersNumber" :label="$ml.get('word.cylindersNumber')">
                    </el-table-column>
                    <el-table-column prop="pistonDiameter" :label="$ml.get('word.pistonDiameter')">
                    </el-table-column>
                    <el-table-column prop="flapNumber" :label="$ml.get('word.flapNumber')">
                    </el-table-column>
                    <el-table-column prop="engineCapacity" :label="$ml.get('word.engineCapacity')">
                    </el-table-column>
                    <el-table-column prop="pistonStroke" :label="$ml.get('word.pistonStroke')">
                    </el-table-column>
                    <el-table-column prop="powerKwt" :label="$ml.get('word.powerKwt')">
                    </el-table-column>
                    <el-table-column prop="horsepower" :label="$ml.get('word.horsepower')">
                    </el-table-column>
                    <el-table-column prop="degreeCompression" :label="$ml.get('word.degreeCompression')">
                    </el-table-column>
                    <el-table-column prop="releaseYearBy" :label="$ml.get('word.releaseYearBy')">
                    </el-table-column>
                    <el-table-column prop="releaseYearFrom" :label="$ml.get('word.releaseYearFrom')">
                    </el-table-column>
                    <el-table-column prop="status" :label="$ml.get('word.status')">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import VueDatalist from "../input/vue-datalist";
    import InputField from "../input/input-field";
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import {MLBuilder} from 'vue-multilanguage'
    import XLSX from "xlsx";

    export default {
        name: "save-engine-panel",
        components: {VueDatalist, InputField},
        data: () => ({
            showErr: false,
            saveDataObj: {
                engineType: null,
                engineManufacturerFk: null,
                cylindersPlacementFk: null,
                fuelTypeFk: null,
                superchargedTypeFk: null,
                cylindersNumber: null,
                flapNumber: null,
                pistonDiameter: null,
                pistonStroke: null,
                engineCapacity: null,
                powerKwt: null,
                degreeCompression: null,
                releaseYearFrom: null,
                releaseYearBy: null,
                horsepower: null,
                status: null
            },
            tempData: {
                engineType: null,
                engineManufacturerFk: 0,
                cylindersPlacementFk: 0,
                fuelTypeFk: 0,
                superchargedTypeFk: 0,
                cylindersNumber: null,
                flapNumber: null,
                pistonDiameter: null,
                pistonStroke: null,
                engineCapacity: null,
                powerKwt: null,
                degreeCompression: null,
                releaseYearFrom: null,
                releaseYearBy: null,
                horsepower: null,
                status: null
            },
            mainDataList: null,
            updateDataObj: {
                objToBeChanged: null,
                engineType: null,
                engineManufacturerFk: null,
                cylindersPlacementFk: null,
                fuelTypeFk: null,
                superchargedTypeFk: null,
                cylindersNumber: null,
                flapNumber: null,
                pistonDiameter: null,
                pistonStroke: null,
                engineCapacity: null,
                powerKwt: null,
                degreeCompression: null,
                releaseYearFrom: null,
                releaseYearBy: null,
                horsepower: null,
                status: null
            },
            search: '',
            test: null,
            showDismissibleAlert: false,
            cleanInputList: false,
            columnOptions: [],
            columns: [],
            limitUpload: 100,
            fileTemp: null,
            file: null,
            listFile: null,
            da: null,
            dalen: 0,
            testlist: [],
                checkedColumns: [],
            isIndeterminate: true,
            checkAll: false,
            tableColumns: [],
            allTableColumns: []
        }),
        props: {
            nameTitle: String,
            namePanel: String,
            dataList: [],
            loadStatus: null
        },
        computed: {
            ...mapGetters([
                'ADDITIONAL_DATA',
                'UPDATE_ENGINE',
                'ENGINE',
                'PARAM_NAME_AND_UNITS',
                'LOAD_ADDITIONAL_DATA'
            ]),
            mlmyMessage: function () {
                return new MLBuilder('word.superchargedType')
            }
        },
        methods: {
            ...mapActions([
                'GET_ENG',
                'GET_ALL_ADDITIONAL_DATA'
            ]),
            ...mapMutations({
                cylindersPlacementFk: 'SET_UPDATE_CYLINDERS'
            }),
            // eslint-disable-next-line no-unused-vars
            tableRowClassName({row, rowIndex}) {
                let temp = this.dataList.find(item =>
                    item.data === row.data
                );
                if (temp !== undefined) {
                    return 'warning-row';
                } else {
                    return 'success-row';
                }
            },
            onexport() { // On Click Excel download button

                // export json to Worksheet of Excel
                // only array possible

                let arr = []
                this.dataList.map(elem => {
                    let obj = {}
                    if (elem.data !== "не задано") {
                        obj['№'] = elem.id
                        obj[this.$ml.get('word.engine')] = elem.data
                        obj[this.$ml.get('word.engineManufacture')] = elem.engineManufacturer
                        obj[this.$ml.get('word.cylinders')] = elem.cylindersPlacement
                        obj[this.$ml.get('word.fuelType')] = elem.fuelType
                        obj[this.$ml.get('word.superchargedType')] = elem.superchargedType
                        obj[this.$ml.get('word.cylindersNumber')] = elem.cylindersNumber
                        obj[this.$ml.get('word.pistonDiameter')] = elem.pistonDiameter
                        obj[this.$ml.get('word.flapNumber')] = elem.flapNumber
                        obj[this.$ml.get('word.engineCapacity')] = elem.engineCapacity
                        obj[this.$ml.get('word.pistonStroke')] = elem.pistonStroke
                        obj[this.$ml.get('word.powerKwt')] = elem.powerKwt
                        obj[this.$ml.get('word.horsepower')] = elem.horsepower
                        obj[this.$ml.get('word.degreeCompression')] = elem.degreeCompression
                        obj[this.$ml.get('word.releaseYearFrom')] = elem.releaseYearFrom
                        obj[this.$ml.get('word.releaseYearBy')] = elem.releaseYearBy
                        obj[this.$ml.get('word.status')] = elem.status
                        arr.push(obj)
                    }
                });
                var animalWS = XLSX.utils.json_to_sheet(arr)

                // A workbook is the name given to an Excel file
                var wb = XLSX.utils.book_new() // make Workbook of Excel

                // add Worksheet to Workbook
                // Workbook contains one or more worksheets
                XLSX.utils.book_append_sheet(wb, animalWS, 'animals') // sheetAName is name of Worksheet

                // export Excel file
                XLSX.writeFile(wb, this.nameTitle + '.xlsx') // name of the file is 'book.xlsx'
            },
            cancelInport() {
                this.listFile = null
                this.fileTemp = null
                this.da = null
                this.file = null
            },
            // eslint-disable-next-line no-unused-vars
            handleChange(file, fileList) {
                this.fileTemp = file.raw;
                if (this.fileTemp) {
                    if ((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                        || (this.fileTemp.type == 'application/vnd.ms-excel')) {
                        this.importfxx(this.fileTemp);
                    } else {
                        this.$message({
                            showClose: true,
                            type: 'warning',
                            message: 'ошибка！'
                        })
                    }
                } else {
                    this.$message({
                        showClose: true,
                        type: 'warning',
                        message: 'ошибка'
                    })
                }
            },
            handleExceed() {
                this.$message({
                    showClose: true,
                    type: 'warning',
                    message: 'ошибка！'
                })
                return;
            },
            // eslint-disable-next-line no-unused-vars
            handleRemove(file, fileList) {
                this.fileTemp = null
                this.da = null
            },
            async importFile() {
                let importList = [];
                this.da.forEach(v => {
                        let temp = this.dataList.find(item =>
                            item.data === v.data
                        );
                        if (temp === undefined) {
                            let obj = {}
                            obj.engineType = v['data']
                            obj.engineManufacturerFk = this.ADDITIONAL_DATA.engineManufacture.find(item => item.data === v['engineManufacturer']).id
                            obj.cylindersPlacementFk = this.ADDITIONAL_DATA.cylinders.find(item => item.data === v['cylindersPlacement']).id
                            obj.fuelTypeFk = this.ADDITIONAL_DATA.fuelType.find(item => item.data === v[('fuelType')]).id
                            obj.superchargedTypeFk = this.ADDITIONAL_DATA.superchargeType.find(item => item.data === v['superchargedType']).id
                            obj.cylindersNumber = v['cylindersNumber']
                            obj.pistonDiameter = v['pistonDiameter']
                            obj.flapNumber = v['flapNumber']
                            obj.engineCapacity = v['engineCapacity']
                            obj.pistonStroke = v['pistonStroke']
                            obj.powerKwt = v['powerKwt']
                            obj.horsepower = v['horsepower']
                            obj.degreeCompression = v['degreeCompression']
                            obj.releaseYearBy = v['releaseYearBy']
                            obj.releaseYearFrom = v['releaseYearFrom']
                            obj.status = this.PARAM_NAME_AND_UNITS.status.find(item => item.data === v.status).id

                            obj.engineManufacturer = this.ADDITIONAL_DATA.engineManufacture.find(item => item.data === v['engineManufacturer']).id
                            obj.cylindersPlacement = this.ADDITIONAL_DATA.cylinders.find(item => item.data === v['cylindersPlacement']).id
                            obj.fuelType = this.ADDITIONAL_DATA.fuelType.find(item => item.data === v[('fuelType')]).id
                            obj.superchargedType = this.ADDITIONAL_DATA.superchargeType.find(item => item.data === v['superchargedType']).id

                            this.dataList.push(v)
                            importList.push(obj)
                        }
                    }
                )

                await this.$emit("import-data-api", {list: importList});
                this.GET_ALL_ADDITIONAL_DATA();
                this.$message({
                    showClose: true,
                    message: this.$ml.get('word.dataAddSuccess'),
                    type: 'success'
                });
            },
            // eslint-disable-next-line no-unused-vars
            importfxx(obj) {
                let _this = this;
                // eslint-disable-next-line no-unused-vars
                let inputDOM = this.$refs.inputer;

                this.file = event.currentTarget.files[0];

                var rABS = false;
                var f = this.file;

                var reader = new FileReader();
                //if (!FileReader.prototype.readAsBinaryString) {
                FileReader.prototype.readAsBinaryString = function (f) {
                    var binary = "";
                    var rABS = false;
                    // eslint-disable-next-line no-unused-vars
                    var pt = this;
                    var wb;
                    var outdata;
                    var reader = new FileReader();
                    // eslint-disable-next-line no-unused-vars
                    reader.onload = function (e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for (var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var XLSX = require("xlsx");
                        if (rABS) {
                            // eslint-disable-next-line no-undef
                            wb = XLSX.read(btoa(fixdata(binary)), {
                                type: "base64"
                            });
                        } else {
                            wb = XLSX.read(binary, {
                                type: "binary"
                            });
                        }
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                        console.log(outdata);
                        let arr = [];
                        outdata.map(v => {
                            let obj = {}
                            obj.id = v['№']
                            obj.data = v[_this.$ml.get('word.engine')]
                            obj.engineManufacturer = v[_this.$ml.get('word.engineManufacture')]
                            obj.cylindersPlacement = v[_this.$ml.get('word.cylinders')]
                            obj.fuelType = v[_this.$ml.get('word.fuelType')]
                            obj.superchargedType = v[_this.$ml.get('word.superchargedType')]
                            obj.cylindersNumber = v[_this.$ml.get('word.cylindersNumber')]
                            obj.pistonDiameter = v[_this.$ml.get('word.pistonDiameter')]
                            obj.flapNumber = v[_this.$ml.get('word.flapNumber')]
                            obj.engineCapacity = v[_this.$ml.get('word.engineCapacity')]
                            obj.pistonStroke = v[_this.$ml.get('word.pistonStroke')]
                            obj.powerKwt = v[_this.$ml.get('word.powerKwt')]
                            obj.horsepower = v[_this.$ml.get('word.horsepower')]
                            obj.degreeCompression = v[_this.$ml.get('word.degreeCompression')]
                            obj.releaseYearBy = v[_this.$ml.get('word.releaseYearBy')]
                            obj.releaseYearFrom = v[_this.$ml.get('word.releaseYearFrom')]
                            obj.status = v[_this.$ml.get('word.status')]
                            arr.push(obj)
                        });
                        _this.da = arr;
                        _this.dalen = arr.length;
                        return arr;
                    };
                    reader.readAsArrayBuffer(f);
                };
                if (rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            },
            handleCheckedColumnChange(value) {
                let checkedCount = value.length;
                this.tableColumns = []
                value.forEach(elem => {
                        this.tableColumns.push(this.allTableColumns.find(item => item.label === elem))
                    }
                )
                this.checkAll = checkedCount === this.columns.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.columns.length;
            },
            async clear() {
                this.search = '';
                this.filterResults();
            },
            onChange() {
                this.filterResults();
            }, filterResults() {
                if (this.mainDataList === null) {
                    this.mainDataList = this.ADDITIONAL_DATA.engine;
                }
                // first uncapitalize all the things
                this.dataList = this.mainDataList.filter((item) => {

                    return item.data.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
                        item.cylindersPlacement.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
                        item.engineManufacturer.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
                        item.superchargedType.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
                        item.fuelType.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                });
            },
            setDataList(tempList) {
                this.dataList = tempList;
            },
            cancelsave() {
                this.cleanInputList = !this.cleanInputList;
                this.saveDataObj.engineType = null
                this.saveDataObj.engineManufacturerFk = null
                this.saveDataObj.cylindersPlacementFk = null
                this.saveDataObj.fuelTypeFk = null
                this.saveDataObj.superchargedTypeFk = null
                this.saveDataObj.cylindersNumber = null
                this.saveDataObj.flapNumber = null
                this.saveDataObj.pistonDiameter = null
                this.saveDataObj.pistonStroke = null
                this.saveDataObj.engineCapacity = null
                this.saveDataObj.powerKwt = null
                this.saveDataObj.degreeCompression = null
                this.saveDataObj.releaseYearFrom = null
                this.saveDataObj.releaseYearBy = null
                this.saveDataObj.horsepower = null
            },
            cancel() {
                this.tempData = {
                    engineType: null,
                    engineManufacturerFk: 0,
                    cylindersPlacementFk: 0,
                    fuelTypeFk: 0,
                    superchargedTypeFk: 0,
                    cylindersNumber: null,
                    flapNumber: null,
                    pistonDiameter: null,
                    pistonStroke: null,
                    engineCapacity: null,
                    powerKwt: null,
                    degreeCompression: null,
                    releaseYearFrom: null,
                    releaseYearBy: null,
                    horsepower: null,
                    status: null
                }
                this.cleanInputList = !this.cleanInputList;
                this.updateDataObj.objToBeChanged = this.tempData.id
                this.updateDataObj.engineType = this.tempData.engineType
                this.updateDataObj.engineManufacturerFk = this.tempData.engineManufacturerFk
                this.updateDataObj.cylindersPlacementFk = this.tempData.cylindersPlacementFk
                this.updateDataObj.fuelTypeFk = this.tempData.fuelTypeFk
                this.updateDataObj.superchargedTypeFk = this.tempData.superchargedTypeFk
                this.updateDataObj.cylindersNumber = this.tempData.cylindersNumber
                this.updateDataObj.flapNumber = this.tempData.flapNumber
                this.updateDataObj.pistonDiameter = this.tempData.pistonDiameter
                this.updateDataObj.pistonStroke = this.tempData.pistonStroke
                this.updateDataObj.engineCapacity = this.tempData.engineCapacity
                this.updateDataObj.powerKwt = this.tempData.powerKwt
                this.updateDataObj.degreeCompression = this.tempData.degreeCompression
                this.updateDataObj.releaseYearFrom = this.tempData.releaseYearFrom
                this.updateDataObj.releaseYearBy = this.tempData.releaseYearBy
                this.updateDataObj.horsepower = this.tempData.horsepower
            },
            autocompliteResult() {
            },
            test(id) {
                console.log(id)
            },
            async link(record) {
                this.$refs.updateTab.click();
                await this.GET_ENG({id: record.id});
                this.tempData = this.ENGINE;
                this.updateDataObj.objToBeChanged = this.ENGINE.id
                this.updateDataObj.engineType = this.ENGINE.engineType
                this.updateDataObj.engineManufacturerFk = this.ENGINE.engineManufacturerFk
                this.updateDataObj.cylindersPlacementFk = this.ENGINE.cylindersPlacementFk
                this.updateDataObj.fuelTypeFk = this.ENGINE.fuelTypeFk
                this.updateDataObj.superchargedTypeFk = this.ENGINE.superchargedTypeFk
                this.updateDataObj.cylindersNumber = this.ENGINE.cylindersNumber
                this.updateDataObj.flapNumber = this.ENGINE.flapNumber
                this.updateDataObj.pistonDiameter = this.ENGINE.pistonDiameter
                this.updateDataObj.pistonStroke = this.ENGINE.pistonStroke
                this.updateDataObj.engineCapacity = this.ENGINE.engineCapacity
                this.updateDataObj.powerKwt = this.ENGINE.powerKwt
                this.updateDataObj.degreeCompression = this.ENGINE.degreeCompression
                this.updateDataObj.releaseYearFrom = this.ENGINE.releaseYearFrom
                this.updateDataObj.releaseYearBy = this.ENGINE.releaseYearBy
                this.updateDataObj.horsepower = this.ENGINE.horsepower
                console.log(1)
            },
            async getEng(number) {
                await this.GET_ENG({id: this.updateDataObj.objToBeChanged});
                this.tempData = this.ENGINE;
                this.updateDataObj.objToBeChanged = this.ENGINE.id
                this.updateDataObj.engineType = this.ENGINE.engineType
                this.updateDataObj.engineManufacturerFk = this.ENGINE.engineManufacturerFk
                this.updateDataObj.cylindersPlacementFk = this.ENGINE.cylindersPlacementFk
                this.updateDataObj.fuelTypeFk = this.ENGINE.fuelTypeFk
                this.updateDataObj.superchargedTypeFk = this.ENGINE.superchargedTypeFk
                this.updateDataObj.cylindersNumber = this.ENGINE.cylindersNumber
                this.updateDataObj.flapNumber = this.ENGINE.flapNumber
                this.updateDataObj.pistonDiameter = this.ENGINE.pistonDiameter
                this.updateDataObj.pistonStroke = this.ENGINE.pistonStroke
                this.updateDataObj.engineCapacity = this.ENGINE.engineCapacity
                this.updateDataObj.powerKwt = this.ENGINE.powerKwt
                this.updateDataObj.degreeCompression = this.ENGINE.degreeCompression
                this.updateDataObj.releaseYearFrom = this.ENGINE.releaseYearFrom
                this.updateDataObj.releaseYearBy = this.ENGINE.releaseYearBy
                this.updateDataObj.horsepower = this.ENGINE.horsepower
                console.log(number)
            },
            async saveEngManufacture(number) {
                let temp = this.ADDITIONAL_DATA.engine.find(item =>
                    item.data === this.saveDataObj.engineType
                );
                if (temp === undefined) {
                    this.showErr = false
                    if (this.saveDataObj.status === null) {
                        this.saveDataObj.status = 2;
                    }
                    await this.$emit("save-data-api", this.saveDataObj)
                    this.$message({
                        showClose: true,
                        message: this.$ml.get('word.dataAddSuccess'),
                        type: 'success'
                    });
                    this.GET_ALL_ADDITIONAL_DATA();

                } else {
                    this.$message({
                        showClose: true,
                        message: this.$ml.get('msg.duplicateValue'),
                        type: 'error'
                    });
                }
                console.log(number)
            },
            async update(number) {
                if (this.updateDataObj.status === null) {
                    this.updateDataObj.status = this.tempData.status;
                }
                this.dataList = this.ADDITIONAL_DATA.engine;
                let temp = this.dataList.find(item => item.id === this.updateDataObj.objToBeChanged);
                temp.data = this.updateDataObj.engineType
                temp.engineManufacturer = this.updateDataObj.engineManufacturerFk !== 0 ? this.ADDITIONAL_DATA.engineManufacture.find(item => item.id === this.updateDataObj.engineManufacturerFk).data : "не задано";
                temp.cylindersPlacement = this.updateDataObj.cylindersPlacementFk !== 100 ? this.ADDITIONAL_DATA.cylinders.find(item => item.id === this.updateDataObj.cylindersPlacementFk).data : "не задано";
                temp.fuelType = this.updateDataObj.fuelTypeFk !== 0 ? this.ADDITIONAL_DATA.fuelType.find(item => item.id === this.updateDataObj.fuelTypeFk).data : "не задано";
                temp.superchargedType = this.updateDataObj.superchargedType !== 0 ? this.ADDITIONAL_DATA.superchargeType.find(item => item.id === this.updateDataObj.superchargedTypeFk).data : "не задано";
                temp.cylindersNumber = this.updateDataObj.cylindersNumber
                temp.flapNumber = this.updateDataObj.flapNumber
                temp.pistonDiameter = this.updateDataObj.pistonDiameter
                temp.pistonStroke = this.updateDataObj.pistonStroke
                temp.engineCapacity = this.updateDataObj.engineCapacity
                temp.powerKwt = this.updateDataObj.powerKwt
                temp.degreeCompression = this.updateDataObj.degreeCompression
                temp.releaseYearFrom = this.updateDataObj.releaseYearFrom
                temp.releaseYearBy = this.updateDataObj.releaseYearBy
                temp.horsepower = this.updateDataObj.horsepower
                await this.$emit("update-data-api", this.updateDataObj)
                this.cancel()
                this.$message({
                    showClose: true,
                    message: this.$ml.get('word.dataAddSuccess'),
                    type: 'success'
                });
                console.log(number)
            }
        },
        watch: {},
        mounted() {


            this.checkedColumns = [
                '№', this.$ml.get('word.engine'), this.$ml.get('word.engineManufacture'),
                this.$ml.get('word.cylinders'), this.$ml.get('word.fuelType'),
                this.$ml.get('word.status'),
                this.$ml.get('word.superchargedType'), this.$ml.get('word.releaseYearFrom'), this.$ml.get('word.releaseYearBy')
            ];
            this.columns = [
                '№', this.$ml.get('word.engine'), this.$ml.get('word.engineManufacture'),
                this.$ml.get('word.cylinders'), this.$ml.get('word.fuelType'),
                this.$ml.get('word.powerKwt'), this.$ml.get('word.status'),
                this.$ml.get('word.engineCapacity'), this.$ml.get('word.flapNumber'),
                this.$ml.get('word.cylindersNumber'), this.$ml.get('word.horsepower'),
                this.$ml.get('word.superchargedType'), this.$ml.get('word.releaseYearFrom'),
                this.$ml.get('word.releaseYearBy'), this.$ml.get('word.degreeCompression')
            ];
            this.columnOptions = [
                '№', this.$ml.get('word.engine'), this.$ml.get('word.engineManufacture'),
                this.$ml.get('word.cylinders'), this.$ml.get('word.fuelType'),
                this.$ml.get('word.powerKwt'), this.$ml.get('word.status'),
                this.$ml.get('word.engineCapacity'), this.$ml.get('word.flapNumber'),
                this.$ml.get('word.cylindersNumber'), this.$ml.get('word.horsepower'),
                this.$ml.get('word.superchargedType'), this.$ml.get('word.releaseYearFrom'),
                this.$ml.get('word.releaseYearBy'), this.$ml.get('word.degreeCompression')];
            this.tableColumns = [
                {key: 'id', label: '№', sortable: true},
                {key: 'data', label: this.$ml.get('word.engine'), sortable: true},
                {key: 'engineManufacturer', label: this.$ml.get('word.engineManufacture'), sortable: true},
                {key: 'cylindersPlacement', label: this.$ml.get('word.cylinders'), sortable: true},
                {key: 'fuelType', label: this.$ml.get('word.fuelType'), sortable: true},
                {key: 'superchargedType', label: this.$ml.get('word.superchargedType'), sortable: true},
                {key: 'releaseYearFrom', label: this.$ml.get('word.releaseYearFrom'), sortable: true},
                {key: 'releaseYearBy', label: this.$ml.get('word.releaseYearBy'), sortable: true},
                {key: 'status', label: this.$ml.get('word.status'), sortable: true}];
            this.allTableColumns = [
                {key: 'id', label: '№', sortable: true},
                {key: 'data', label: this.$ml.get('word.engine'), sortable: true},
                {key: 'engineManufacturer', label: this.$ml.get('word.engineManufacture'), sortable: true},
                {key: 'cylindersPlacement', label: this.$ml.get('word.cylinders'), sortable: true},
                {key: 'fuelType', label: this.$ml.get('word.fuelType'), sortable: true},
                {key: 'powerKwt', label: this.$ml.get('word.powerKwt'), sortable: true},
                {key: 'engineCapacity', label: this.$ml.get('word.engineCapacity'), sortable: true},
                {key: 'flapNumber', label: this.$ml.get('word.flapNumber'), sortable: true},
                {key: 'cylindersNumber', label: this.$ml.get('word.cylindersNumber'), sortable: true},
                {key: 'degreeCompression', label: this.$ml.get('word.degreeCompression'), sortable: true},
                {key: 'horsepower', label: this.$ml.get('word.horsepower'), sortable: true},
                {key: 'superchargedType', label: this.$ml.get('word.superchargedType'), sortable: true},
                {key: 'releaseYearFrom', label: this.$ml.get('word.releaseYearFrom'), sortable: true},
                {key: 'releaseYearBy', label: this.$ml.get('word.releaseYearBy'), sortable: true},
                {key: 'status', label: this.$ml.get('word.status'), sortable: true}];
            this.GET_ALL_PARAM_NAME();

        }
    }
</script>

<style scoped>
    .my-table-scroll::-webkit-scrollbar {
        width: 0px;
    }

    a {
        padding-left: 3vw;
        padding-right: 3vw;
        color: #272e38;
        font-weight: bold;
    }

    .title-bord {
        text-align: center;
        position: relative;
        right: 1vw;
        border-style: solid;
        border-color: lightgray;
        border-width: 0px 2px 0px 0px;
    }

    .savePageRow {
        max-width: 75vw;
        min-width: 75vw;
    }
</style>