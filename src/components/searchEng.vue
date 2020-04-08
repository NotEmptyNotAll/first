<template>
    <div class="v-addNewItem">
        <div class="container shadow-lg p-3 mb-5 bg-white rounded">
            <h3>двигатели</h3>
            <br/>
            <!--fields for entering search data.
             Fill with the initial parameters that you get from the backend
              Use a v-model to populate data.-->
            <div class="row ">
                <div class="input-group col-md-6">
                    <input name="engType" v-model="searchData.engineType" autocomplete="on" type="text"
                           class="form-control"
                           placeholder="Тип двигуна"
                           aria-describedby="button-addon1">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" data-toggle="collapse"
                                data-target="#engineTypeList"
                                aria-expanded="false" aria-controls="engineTypeList"> Выбрать
                        </button>

                    </div>
                </div>
                <div class="input-group col-md-6">
                    <input v-model="searchData.numberEng" autocomplete="on" type="text" class="form-control"
                           placeholder="Модель двигателя"
                           aria-describedby="button-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" data-toggle="collapse"
                                data-target="#AutoNumberList"
                                aria-expanded="false" aria-controls="AutoNumberList"> Выбрать
                        </button>
                    </div>
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
                        <label class="input-group-text" for="inputGroupSelect01">виробник дв.</label>
                    </div>
                    <select v-model="searchData.engineManufacturern" id="inputGroupSelect01"
                            class="custom-select form-control">
                        <option v-for="current in startData.engineManufacture" v-bind:key="current">{{current}}
                        </option>
                    </select>
                </div>
                <div class="input-group col-md-4">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect02">виробник aвт.</label>
                    </div>
                    <select v-model="searchData.autoModel" id="inputGroupSelect02"
                            class="custom-select form-control">
                        <option v-for="current in startData.autoModels" v-bind:key="current">{{current}}
                        </option>
                    </select>
                </div>
                <div class="input-group col-md-4">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect03">тип бензина</label>
                    </div>
                    <select v-model="searchData.fuelType" id="inputGroupSelect03"
                            class="custom-select form-control">
                        <option v-for="current in startData.fuelType" v-bind:key="current">{{current}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="row ">
                <div class="col col-md-3">
                    <input v-model="searchData.engineCapacity" class="form-control" type="number" value=""
                           placeholder="Об’єм двигуна">
                </div>
                <div class="col col-md-3">
                    <input v-model="searchData.powerKWt" class="form-control" type="number" value=""
                           placeholder="Потужність(kWt)">
                </div>

                <div class="col col-md-2">
                    <input v-model="searchData.produceYear" class="form-control" placeholder="Рік випуску"
                           type="number" value="">
                </div>
                <div class="col col-md-4">
                    <button type="submit" @click="submitChanges('submit')" class="btn  btn-block btn-outline-primary">
                        поиск
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

                            <div class="row">
                                <div class="input-group col-md-5">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="inputGroupSelect2">Параметр</label>
                                    </div>
                                    <select v-model="searchData.parameterName" id="inputGroupSelect2"
                                            class="custom-select form-control">
                                        <option v-for="current in paramNameAndUnits.paramName" v-bind:key="current">
                                            {{current.fullName}}
                                        </option>
                                    </select>
                                </div>
                                <div class="input-group col-md-4">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="inputGroupSelect3">одиниця виміру</label>
                                    </div>
                                    <select v-model="searchData.unitsFullName" id="inputGroupSelect3"
                                            class="custom-select form-control">
                                        <option v-for="current in paramNameAndUnits.units" v-bind:key="current">
                                            {{current.fullName}}
                                        </option>
                                    </select>
                                </div>
                                <div class="col col-md-2">
                                    <input v-model="searchData.parameterNumber" class="form-control" type="number"
                                           value="" placeholder="Значення"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!--recursive tree of objects. Most likely it will look different-->
        <div class="collapse" id="collapse">
            <div class="container shadow-lg p-3  bg-white rounded">
                <div class="card card-body">
                    <div class="card">
                        <div class="card-header" :id="elements.name+'1'">
                            <h5 class="mb-0">
                                <button class="btn btn-link" data-toggle="collapse"
                                        :data-target="'#'+elements.name" aria-expanded="false"
                                        :aria-controls="elements.name">
                                    {{elements.name}}
                                </button>
                                <button type="button" class="btn btn-outline-info" data-toggle="modal"
                                        data-target=".bd-example-modal-lg"> параметри елемента
                                </button>
                            </h5>
                        </div>
                        <div :id="elements.name" class="collapse " :aria-labelledby="elements.name+'1'"
                             :data-parent="'#'+elements.name">
                            <div class="card-body">
                                <Element
                                        v-for="(child,subIndex) in elements.elementsCh"
                                        v-bind:elem="child"
                                        :key="child"
                                        :index="subIndex"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--engine data table. By clicking on row m we open the engine tree, where we can find out its parameters-->
        <div class="container shadow-lg p-3  bg-white rounded" id="contTable">
            <table class="table table-hover">
                <thead class="thead-light">
                <tr>
                    <th>Тип двигуна</th>
                    <th>модель</th>
                    <th>Виробник двигуна</th>
                    <th>Виробник авто</th>
                    <th>К-ть клапанів</th>
                    <th>Діаметр поршня</th>
                    <th>Хід поршня</th>
                    <th>Об’єм двигуна</th>
                    <th>кінськ.сил</th>
                    <th>kWt</th>
                    <th>Рік випуску (з)</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="current in dataEng" v-bind:key="current" data-toggle="collapse" href="#collapse"
                    role="button" aria-expanded="false" aria-controls="collapse" v-on:click="getElements(current.id)">
                    <td>{{current.engineType}}</td>
                    <td>{{current.modelName}}</td>
                    <td>{{current.engineManufacture}}</td>
                    <td>{{current.autoManufacture}}</td>
                    <td>{{current.flapNumber}}</td>
                    <td>{{current.pistonDiameter}}</td>
                    <td>{{current.pistonStoke}}</td>
                    <td>{{current.engineCapacity}}</td>
                    <td>{{current.horsepower}}</td>
                    <td>{{current.powerKWT}}</td>
                    <td>{{current.releaseYearFrom}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
             aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <table class="table table-hover">
                        <thead class="thead-light">
                        <tr>
                            <th>Од. вим</th>
                            <th>мін</th>
                            <th>макс</th>
                            <th>значення</th>
                            <th>текст</th>
                            <th>автор</th>
                            <th>джерело</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="current in paramtrs" v-bind:key="current">
                            <td>{{current.measurementUnits}}</td>
                            <td>{{current.doubleMin}}</td>
                            <td>{{current.doubleMax}}</td>
                            <td>{{current.doubleNum}}</td>
                            <td>{{current.textData}}</td>
                            <td>{{current.author}}</td>
                            <td>{{current.source}}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import axios from "axios";
    import Element from "@/components/Element";

    export default {
        name: "v-addNewItem",

        components: {
            Element
        },
        data: () => ({
            paramtrs: [],
            elemParameters: [],
            paramNameAndUnits: [],
            elements: [],
            dataEng: [],
            startData: [],
            searchData: {
                parameterName: null,
                unitsFullName: null,
                parameterNumber: null,
                engineType: null,
                engineManufacturer: null,
                autoModel: null,
                produceYear: null,
                numberEng: null,
                fuelType: null,
                powerKWt: null,
                engineCapacity: null
            }
        }),
        //All requests will be transferred to the vuech for convenience.
        mounted() {
            axios({
                method: 'GET',
                url: 'http://localhost:5050/start',
                data: this.searchData,
                responseType: 'json'
            }).then(resp => {
                this.startData = resp.data
            })
        },
        methods: {
            //request for initial data
            async getParamtrs(number) {
                await axios({
                    method: 'POST',
                    url: 'http://localhost:5050/getParameters',
                    data: {id: number},
                    responseType: 'json'
                }).then(resp => {
                    this.paramtrs = resp.data
                });
                console.log(number)
            },
            //request for parameters
            async getParamName(number) {
                await axios({
                    method: 'GET',
                    url: 'http://localhost:5050/paramNameAndUnits',
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
                    url: 'http://localhost:5050/getElements',
                    data: {id: number},
                    responseType: 'json'
                }).then(resp => {
                    this.elements = resp.data
                });
                console.log(number)
            },
            //request for data about the auto engine
            async submitChanges(dat) {
                await axios({
                    method: 'POST',
                    url: 'http://localhost:5050/getAutoEngine',
                    data: this.searchData,
                    responseType: 'json'
                }).then(resp => {
                    this.dataEng = resp.data
                });
                console.log(dat)
            }
        }
    }

</script>

<style>
    #contTable {
        min-height: 50vh;
    }

    .row, .container {
        padding: 20px;
        min-width: 75vw;
    }

    .box {
        display: flex;
        justify-content: center;
        align-content: center;
        padding: 20px;
        margin-bottom: 20px;
    }

    th, td {
        padding: 20px;
    }

    .pad {
        padding: 0;
    }

    .container {
        text-align: center;
        margin-top: 10px;
        margin-bottom: 30px;
        transition: 0.8s;
    }

    li:hover {
        background-color: lightgray;
    }


    .modal-dialog {
        width: 1300px;
    }


    .container:hover {
        transform: scale(1.05);
    }
</style>