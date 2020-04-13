<template>
    <div class="v-addNewItem">
        <div class="container shadow-lg p-3 mb-5 bg-white rounded" style="text-align: center">
            <h3>двигуни</h3>

            <br/>
            <!--fields for entering search data.
             Fill with the initial parameters that you get from the backend
              Use a v-model to populate data.-->
            <div class="row ">
                <div class="input-group col-md-6">
                    <input id="engineType"
                           v-on:input="searchData.engineType = $event.target.value"

                           autocomplete="on" type="text"
                           class="form-control"
                           placeholder="Тип двигуна"
                           aria-describedby="button-addon1" list="listEn">
                    <datalist id="listEn">
                        <option v-for="current in startData.engineType" v-bind:key="current" :value="current"
                                :label="current"/>
                    </datalist>

                </div>

                <div class="input-group col-md-6">
                    <input v-on:input="searchData.numberEng = $event.target.value"
                           autocomplete="on" type="text" class="form-control"
                           placeholder="Номер двигуна"
                           v-on:change="getAutoEnByNum(1)"
                           aria-describedby="button-addon2" list="listNum">
                    <datalist id="listNum">
                        <option v-for="current in startData.engineNumber" v-bind:key="current" :value="current"
                                :label="current"/>
                    </datalist>

                </div>
            </div>
            <div class="row pad">
                <div class="col">
                    <div class="collapse multi-collapse" id="engineTypeList">
                        <div class="card card-body">
                            <ul class="list-group">
                                <li v-for="current in startData.engineType" v-bind:key="current"
                                    v-on:click="searchData.engineType=current"
                                    class="list-group-item">{{current}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="collapse multi-collapse" id="AutoNumberList">
                        <div class="card card-body">
                            <li v-for="current in startData.engineNumber" v-bind:key="current"
                                v-on:click="searchData.numberEng=current"
                                class="list-group-item">{{current}}
                            </li>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row ">
                <div class="input-group col-md-4">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect01">Марка авт.</label>
                    </div>
                    <select v-model="searchData.autoManufacturer" aria-describedby="button-addon3"
                            id="inputGroupSelect01"
                            class="custom-select form-control">
                        <option v-for="current in startData.engineManufacture" v-bind:key="current">{{current}}
                        </option>
                    </select>
                    <div class="input-group-append">
                        <button class="btn btn-outline-danger" v-on:click="searchData.autoManufacturer=''"
                                type="button" id="button-addon3">
                            <span>&#10008;</span>
                        </button>
                    </div>
                </div>
                <div class="input-group col-md-4">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect02">Модель авт.</label>
                    </div>
                    <select v-model="searchData.autoModel" id="inputGroupSelect02"
                            class="custom-select form-control">
                        <option v-for="current in startData.autoModels" aria-describedby="button-addon"
                                v-bind:key="current">{{current}}
                        </option>
                    </select>
                    <div class="input-group-append">
                        <button class="btn btn-outline-danger" v-on:click="searchData.autoModel=''" type="button"
                                id="button-addon">
                            <span>&#10008;</span>
                        </button>
                    </div>
                </div>
                <div class="input-group col-md-4">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect03">Вид палива</label>
                    </div>
                    <select v-model="searchData.fuelType" aria-describedby="button-addon2" id="inputGroupSelect03"
                            class="custom-select form-control">
                        <option v-for="current in startData.fuelType" v-bind:key="current">{{current}}
                        </option>
                    </select>
                    <div class="input-group-append">
                        <button class="btn btn-outline-danger" v-on:click="searchData.fuelType=''" type="button"
                                id="button-addon2">
                            <span>&#10008;</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row ">

                <div class="col col-md-3">
                    <input v-model="searchData.engineCapacity" min="0" step="0.01" class="form-control"
                           type="number" value=""
                           placeholder="Об’єм двигуна">
                </div>
                <div class="col col-md-3">
                    <input v-model="searchData.powerKWt" class="form-control" step="0.01" min="0" type="number"
                           value=""
                           placeholder="Потужність(kWt)">
                </div>

                <div class="col col-md-2">
                    <input v-model="searchData.produceYear" class="form-control" min="1885" max="2020"
                           placeholder="Рік випуску" step="1"
                           type="number" value="">
                </div>

                <div class="col col-md-4">
                    <button type="submit" @click="submitChanges('submit')"
                            class="btn  btn-block btn-outline-primary">
                        пошук
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col col-md-12">
                    <button class="btn btn-outline-secondary" type="button" data-toggle="collapse"
                            v-on:click="getParamName(1)"
                            data-target="#collapseSearch" aria-expanded="false" aria-controls="collapseSearch">
                        покращити пошук
                    </button>
                    <div class="collapse" id="collapseSearch">
                        <div class="card card-body">
                            <!--here we enter data for an improved search, which the user measures-->

                            <div v-for="(param) in searchData.paramList" v-bind:key="param" class="row">
                                <div class="input-group col-md-5">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="inputGroupSelect2">Параметр</label>
                                    </div>

                                    <input list="listParam" id="inputGroupSelect2"
                                           v-on:input="param.parameterName = $event.target.value"
                                           class="form-control">
                                    <datalist id="listParam">
                                        <option v-for="current in paramNameAndUnits.paramName" v-bind:key="current"
                                                :value="current"
                                                :label="current"/>
                                    </datalist>
                                </div>
                                <div class="input-group col-md-4">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="inputGroupSelect3">одиниця виміру</label>
                                    </div>
                                    <select v-model="param.unitsFullName" aria-describedby="button-addon5"
                                            id="inputGroupSelect3"
                                            class="custom-select form-control">
                                        <option v-for="current in paramNameAndUnits.units" v-bind:key="current">
                                            {{current.fullName}}
                                        </option>
                                    </select>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-danger"
                                                v-on:click="searchData.unitsFullName=''" type="button"
                                                id="button-addon5">
                                            <span>&#10008;</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="col col-md-2">
                                    <input v-model="param.parameterNumber" class="form-control" type="number"
                                           value="" placeholder="Значення"
                                    >
                                </div>

                            </div>
                            <div class="row">
                                <div class="col col-md-11">
                                    <button class="btn form-control btn-block btn-outline-secondary" type="button"
                                            v-on:click="addParam(1)">
                                        додати елемент
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!--engine data table. By clicking on row m we open the engine tree, where we can find out its parameters-->
        <div class="container shadow-lg p-3 tab  bg-white rounded" id="contTable">
            <table class="table table-hover">
                <thead class="thead-light">
                <tr>
                    <th>Тип двигуна</th>
                    <th>модель</th>
                    <th>Виробник двигуна</th>
                    <th>Виробник авто</th>
                    <th>К-ть клапанів</th>
                    <th>Діаметр поршня</th>
                    <th>Розміщення циліндрів</th>
                    <th>кількість циліндрів</th>
                    <th>Хід поршня</th>
                    <th>Об’єм двигуна</th>
                    <th>кінськ.сил</th>
                    <th>kWt</th>
                    <th>Рік випуску (з)</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="current in dataEng" v-bind:key="current" data-toggle="collapse" href="#collapse"
                    role="button" aria-expanded="false" aria-controls="collapse"
                    v-on:click="getElements(current.id)">
                    <td>{{current.engineType}}</td>
                    <td>{{current.modelName}}</td>
                    <td>{{current.engineManufacture}}</td>
                    <td>{{current.autoManufacture}}</td>
                    <td>{{current.flapNumber}}</td>
                    <td>{{current.pistonDiameter}}</td>
                    <td>{{current.pistonDiameter}}</td>
                    <td>{{current.cylinderPlace}}</td>
                    <td>{{current.pistonStoke}}</td>
                    <td>{{current.engineCapacity}}</td>
                    <td>{{current.horsepower}}</td>
                    <td>{{current.powerKWT}}</td>
                    <td>{{current.releaseYearFrom}}</td>
                </tr>
                </tbody>
            </table>
        </div>

        <!--recursive tree of objects. Most likely it will look different-->
        <div class="collapse" id="collapse">
            <div class="container shadow-lg   bg-white rounded">
                <div class="row">
                    <div class="col-md-3">
                        <div class="list-group">
                            <tree
                                    class="item"
                                    :item="elements"
                                    :nav="elements.name"
                                    :choice-param="choiceParam"
                                    @get-paramtrs="getParamtrs"
                            ></tree>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <table class="table table-hover">
                            <thead class="thead-light">
                            <tr>
                                <th>Од. вим</th>
                                <th>мін</th>
                                <th>макс</th>
                                <th>значення</th>
                                <th>автор</th>
                                <th>джерело</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="current in choiceParam" v-bind:key="current">
                                <td>{{current.measurementUnits}}</td>
                                <td>{{current.doubleMin}}</td>
                                <td>{{current.doubleMax}}</td>
                                <td>{{current.doubleNum}}</td>
                                <td>{{current.author}}</td>
                                <td>{{current.source}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->

        <button type="button " class="btn btn-primary" id="openModal" data-toggle="modal" data-target="#errorModal"
                style="visibility: hidden">
        </button>
        <!-- Modal -->
        <div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Помилка</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h5>{{errorMessage}}</h5>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import axios from "axios";
    import tree from "@/components/tree.vue";

    export default {
        name: "v-addNewItem",

        components: {
            tree
        },
        data: () => ({
            paramtrs: [],
            choiceParam: [],
            paramIndex: 1,
            serviceApi: 'https://springeng.herokuapp.com/',
            elemParameters: [],
            errorMessage: '',
            paramNameAndUnits: [],
            elements: [],
            dataEng: [],
            startData: [],
            searchData: {
                paramList: [{
                    parameterName: '',
                    unitsFullName: '',
                    parameterNumber: ''
                }],
                engineType: null,
                autoManufacturer: null,
                autoModel: null,
                produceYear: null,
                numberEng: null,
                fuelType: null,
                powerKWt: null,
                engineCapacity: null
            },
            choiceData: [],
            test: null
        }),
        //All requests will be transferred to the vuex for convenience.
        mounted() {
            axios({
                method: 'GET',
                url: this.serviceApi + 'start',
                data: this.searchData,
                responseType: 'json'
            }).then(resp => {
                this.startData = resp.data
            })
        },
        methods: {
            addParam(number) {
                this.searchData.paramList.push({
                    parameterName: '',
                    unitsFullName: '',
                    parameterNumber: ''
                });
                console.log(number)
            },
            async getAutoEnByNum(number) {
                await axios({
                    method: 'POST',
                    url: this.serviceApi + 'getAutoEng',
                    data: this.searchData,
                    responseType: 'json'
                }).then(resp => {
                    if (resp.data.powerKwt != undefined) {
                        this.searchData.powerKWt = resp.data.powerKwt;
                        document.getElementById('engineType').value = resp.data.engineType;
                        this.searchData.fuelType = resp.data.fuelType;
                        this.searchData.engineCapacity = resp.data.engineCapacity;
                    } else {
                        this.errorMessage = 'відсутній номер двигуна';
                        document.getElementById('openModal').click();
                    }
                });

                console.log(number)
            },
            //request for initial data
            async getParamtrs(nav, number) {
                await axios({
                    method: 'POST',
                    url: this.serviceApi + 'getParameters',
                    data: {id: number},
                    responseType: 'json'
                }).then(resp => {
                    if (resp.data != null)
                        this.choiceParam.push(resp.data)
                });
                console.log(number)
            },
            //request for parameters
            async getParamName(number) {
                await axios({
                    method: 'GET',
                    url: this.serviceApi + 'paramNameAndUnits',
                    data: {id: number},
                    responseType: 'json'
                }).then(resp => {
                    this.paramNameAndUnits = resp.data
                });
                console.log(number)
            },
            //query to get a list of parameter names
            async getElements(number) {
                await axios({
                    method: 'POST',
                    url: this.serviceApi + 'getElements',
                    data: {id: number},
                    responseType: 'json'
                }).then(resp => {
                    this.elements = resp.data
                });
                console.log(number)
            },
            //request for data about the auto engine
            async submitChanges(dat) {
                if ((Number.isInteger(this.searchData.produceYear) || this.searchData.produceYear < 1885 || this.searchData.produceYear > 2020) && !this.searchData.produceYear == 0) {
                    this.errorMessage = "Ви некоректно ввели рік";
                    document.getElementById('openModal').click();
                } else {
                    await axios({
                        method: 'POST',
                        url: this.serviceApi + 'getAutoEngine',
                        data: this.searchData,
                        responseType: 'json'
                    }).then(resp => {
                        if (resp.data.status == null) {
                            this.dataEng = resp.data
                        } else {
                            this.errorMessage = resp.data.status;
                            document.getElementById('openModal').click();
                        }
                    });
                    console.log(dat)
                }
            }
        }
    }

</script>

<style>
    #contTable {
        min-height: 20vh;
    }

    .row, .container {
        padding: 20px;
        min-width: 95vw;
    }


    th, td {
        padding: 20px;
    }

    .pad {
        padding: 0;
    }

    .container {
        margin-top: 10px;
        margin-bottom: 30px;
        transition: 0.8s;
    }


    li:hover {
        background-color: lightgray;
    }

    .row {
        transition: 1.1s;
    }

    .modal-dialog {
        width: 1300px;
    }

    body {
        background-color: #f1ecec;
    }

    .color {
        background-color: rgba(105, 154, 186, 0.48);
    }

    table {
        size: auto;
    }


</style>