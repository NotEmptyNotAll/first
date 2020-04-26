<template>
<div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>

</div>
</template>

<script>


    export default {

        name: "load-item",
        components: {},
        props: {

        },
        computed: {

        },
        methods: {

        },
        watch: {},
        mounted() {
        }
    }
</script>


<style>

    /* Balls */
    div.circle {
        border-radius: 50%;
        background: #fff;
        width: 13px;
        height: 13px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    /* First Ball */
    div.circle:first-child {
        animation: upload 0.8s cubic-bezier(0.39, 0.56, 0.57, 1) 0s infinite alternate-reverse;
        background-color: #2d2a2a;
        margin-right: 20px;
    }
    /* Second Ball */
    div.circle:nth-child(2) {
        animation: upload 1.3s cubic-bezier(0.39, 0.56, 0.57, 1) 0s infinite alternate-reverse;
        background-color: #2d2a2a;
        margin-right: 20px;
    }

    /* Third Ball */
    div.circle:nth-child(3) {
        animation: upload 1.1s cubic-bezier(0.39, 0.56, 0.57, 1) 0s infinite alternate-reverse;
        background-color: #2d2a2a;
        margin-left: 20px;
    }
    /* Fourth Ball */
    div.circle:last-child {
        animation: upload 1.5s cubic-bezier(0.39, 0.56, 0.57, 1) 0s infinite alternate-reverse;
        background-color: #2d2a2a;
        margin-left: 20px;
    }
    /*--- Animation Keyframes ---*/
    /*-- Page Upload --*/
    @keyframes body-opacity-change {
        from { opacity: 0; background-color: transparent; }
        to { opacity: 1; background-color: #2d2a2a; }
    }
    /*-- Balls Animation --*/
    @keyframes upload {
        from { transform: translateY(35px); }
        to { transform: translateY(-35px); }
    }

</style>