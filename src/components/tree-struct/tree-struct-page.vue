<template >
    <div class="container bord rounded">
        <tree-struct

        />
    </div>
</template>

<script>
    import TreeStruct from "./tree-struct";
    export default {
        name: "tree-struct-page",
        components: {TreeStruct},
        mounted() {
            document.body.oncontextmenu = function () {
                return true;
            };
        }
    }
</script>

<style scoped>
    .bord {
        border-style: solid;
        border-top-color: lightslategrey;
        border-width: 15px 0px 0px 0px;

    }
</style>