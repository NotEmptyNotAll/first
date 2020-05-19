<template>
    <div>
        <div id="main-page">
            <navbar/>
            <br/>
            <router-view/>
        </div>
    </div>
</template>

<script>
    import navbar from "./navbar";

    export default {
        name: "main-page",
        components: {
            navbar
        },
        props: {},
        computed: {},
        methods: {},
        watch: {},
        mounted() {
        }
    }
</script>


<style>

</style>
