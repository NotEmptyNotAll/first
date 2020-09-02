<template >
    <div class="container bord rounded" v-if="currentUser.roles.indexOf('MODERATOR')!==-1">
        <tree-struct

        />
    </div>
</template>

<script>
    import TreeStruct from "./tree-struct";
    export default {
        name: "tree-struct-page",
        components: {TreeStruct},
      computed:{
        currentUser() {
          return this.$store.state.auth.user;
        },
      },
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