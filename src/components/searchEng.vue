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
                    <input name="engType" v-model="searchData.engineType" autocomplete="on" type="text"
                           class="form-control"
                           placeholder="Тип двигуна"
                           aria-describedby="button-addon1">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary"
                                v-on:click="choiceData={model:'engineType',data:startData.engineType}"
                                type="button" data-toggle="modal"
                                data-target="#choiceModal"> Обрати
                        </button>

                    </div>
                </div>
                <div class="input-group col-md-6">
                    <input v-model="searchData.numberEng" autocomplete="on" type="text" class="form-control"
                           placeholder="Номер двигуна"
                           aria-describedby="button-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" v-on:click="choiceData={model:'engineNumber',data:startData.engineNumber}"
                                type="button" data-toggle="modal"
                                data-target="#choiceModal"> Обрати
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
                        <label class="input-group-text" for="inputGroupSelect01">Марка авт.</label>
                    </div>
                    <select v-model="searchData.engineManufacturer" aria-describedby="button-addon3"
                            id="inputGroupSelect01"
                            class="custom-select form-control">
                        <option v-for="current in startData.engineManufacture" v-bind:key="current">{{current}}
                        </option>
                    </select>
                    <div class="input-group-append">
                        <button class="btn btn-outline-danger" v-on:click="searchData.engineManufacturer=''"
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

                            <div v-for="(param,index) in searchData.paramList" v-bind:key="param" class="row">
                                <div class="input-group col-md-5">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="inputGroupSelect2">Параметр</label>
                                    </div>

                                    <input list="listParam" id="inputGroupSelect2" v-model="param.parameterName"
                                           class="form-control">
                                    <datalist id="listParam"
                                              aria-describedby="button-addon4">
                                        <option v-for="current in paramNameAndUnits.parameterName" v-bind:key="current">
                                            {{current.fullName}}
                                        </option>
                                    </datalist>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary"
                                                v-on:click="choiceData={id:index,model:'paramName',data:paramNameAndUnits.paramName}" type="button"
                                                data-toggle="modal" id="button-addon4"  data-target="#choiceModal">
                                            <span>обрати</span>
                                        </button>
                                    </div>
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
                                    <input v-model="param.parameterName" class="form-control" type="number"
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

                        <div class="accordion" id="accord">
                            <div v-for="current in choiceParam" v-bind:key="current">
                                <div class="card">
                                    <div class="card-header" :id="current.name+'1'">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link" type="button" data-toggle="collapse"
                                                    :data-target="'#'+current.name"
                                                    :aria-controls="current.name">
                                                {{current.name}}
                                            </button>
                                        </h2>
                                    </div>
                                </div>

                                <div :id="current.name" class="collapse show" :aria-labelledby="current.name+'1'"
                                     data-parent="#accord">
                                    <div class="card-body">
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
                                            <tr v-for="current in current.paramtrs" v-bind:key="current">
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

                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="choiceModal" tabindex="-1" role="dialog" aria-labelledby="choiceModal"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="choiceModalLable">виберіть елемент</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">пошук</span>
                            </div>
                            <input type="text" class="form-control"
                                   aria-describedby="basic-addon1" id="myInput"  v-on:keyup="searchByList(1)"
                                   placeholder="назва" title="Type in a name"
                            >
                        </div>
                        <ul id="myUL" class="list-group ">
                            <li class="searchList list-group-item" v-for="current in choiceData.data"
                                v-bind:key="current"
                                data-dismiss="modal" type="button"  v-on:click="setModel(choiceData.model,current,choiceData.id)"
                                style="text-align: center"
                            ><a>{{current}}</a>

                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer">

                    </div>
                </div>
            </div>
        </div>

        <button type="button " class="btn btn-primary" id="openModal" data-toggle="modal" data-target="#errorModal"
                style="visibility: hidden">
        </button>
        <!-- Modal -->
        <div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        {{errorMessage}}
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
                enginManufacturer: null,
                autoModel: null,
                produceYear: null,
                numberEng: null,
                fuelType: null,
                powerKWt: null,
                engineCapacity: null
            },
            choiceData: []
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
            setModel(model,current,id) {
                if (model == 'engineType')
                    this.searchData.engineType=current;
                else if (model == 'engineNumber')
                    this.searchData.numberEng=current;
                else if (model == 'paramName')
                    this.searchData.paramList[id].parameterName=current
            },
            searchByList(number) {

                var input, filter, ul, li, a, i, txtValue;
                input = document.getElementById("myInput");
                filter = input.value.toUpperCase();
                ul = document.getElementById("myUL");
                li = ul.getElementsByClassName("searchList");
                for (i = 0; i < li.length; i++) {
                    a = li[i].getElementsByTagName("a")[0];
                    txtValue = a.textContent || a.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1 && txtValue!="") {
                        li[i].style.display = "";
                    } else {
                        li[i].style.display = "none";
                    }
                }
                console.log(number)
            },
            addParam(number) {
                this.searchData.paramList.push({
                    parameterName: '',
                    unitsFullName: '',
                    parameterNumber: ''
                });
                console.log(number)
            },
            //request for initial data
            async getParamtrs(nav,number) {
                await axios({
                    method: 'POST',
                    url: this.serviceApi + 'getParameters',
                    data: {id: number},
                    responseType: 'json'
                }).then(resp => {
                    this.choiceParam.push({name:nav,paramtrs:resp.data})
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
        min-height: 50vh;
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