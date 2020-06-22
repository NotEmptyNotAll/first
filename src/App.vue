<template>
    <div id="app">

        <mainPage/>
    </div>
</template>

<script>
    import mainPage from "./components/main-page"

    export default {
        name: 'App',
        components: {
            mainPage
        },

    }
</script>

<style>
    #app {

    }
    .el-table .warning-row {
        background: #fde3e3;
    }



    .el-table .success-row {
        background: #e2f3d9;
    }

    .container {
        margin-top: 10px;
        margin-bottom: 30px;
        transition: all .8s;
        -webkit-box-shadow: 0px 0px 60px -25px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 0px 60px -25px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 0px 60px -25px rgba(0, 0, 0, 0.75);
        background-color: white;
    }

    .rad {
        border-radius: 30px;

    }

    .container:hover {
        -webkit-box-shadow: 0px 6px 66px -12px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 6px 66px -12px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 6px 66px -12px rgba(0, 0, 0, 0.75);
    }

    li:hover {
        background-color: lightgray;
    }

    .col-md-2, .col-md-3, .col-md-4, .col-md-6 {
        margin-bottom: 10px;
    }

    .row {
        transition: 1.1s
    }

    body {
        background-color: #F0F8FF;
    }


    .thead-light-dark {
        background: #272e38;
        color: #e0dfdc;
    }

    .text-light-grey {

    }

    .card {
        margin-top: 10px;
        margin-bottom: 30px;
        background: #272e38;
        transition: all .8s;
        -webkit-box-shadow: 0px 0px 60px -25px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 0px 60px -25px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 0px 60px -25px rgba(0, 0, 0, 0.75);
    }

    .card:hover {
        border-top-left-radius: 50px;
        border-top-right-radius: 50px;
        -webkit-box-shadow: 0px 6px 66px -12px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 6px 66px -12px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 6px 66px -12px rgba(0, 0, 0, 0.75);
    }

    .btn {
        max-height: 38px;
    }



    li, tr, table, td, .row, .container {
        animation: moveInBottom 0.5s ease-out;
        animation-fill-mode: backwards;
    }

    @keyframes moveInBottom {
        0% {
            opacity: 0;
            transform: translateY(-30px);
        }

        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }

    .lds-dual-ring {
        display: inline-block;
        width: 35px;
        height: 47px;
    }

    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 30px;
        height: 30px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #e0dfdc;
        border-color: #e0dfdc transparent #e0dfdc transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }

    .lds-dual-ring-black {
        display: inline-block;
        width: 35px;
        height: 47px;
    }

    .lds-dual-ring-black:after {
        content: " ";
        display: block;
        width: 30px;
        height: 30px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #272e38;
        border-color: #272e38 transparent  #272e38 transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }

    .bg-dark {
        background: #272e38;
    }

    .btn-outline-danger {
        z-index: 0;
    }


    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }


    .deepshd {
        color: white;

        letter-spacing: .1em;
    }

</style>
