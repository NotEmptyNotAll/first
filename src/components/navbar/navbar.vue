<template>
    <div>
        <el-menu
                router
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
          <el-menu-item class="item-menu" v-if="!currentUser"  ></el-menu-item>
          <el-menu-item class="item-menu" index="/" v-if="currentUser"> <i class="el-icon-s-order"></i>{{$ml.get('word.parameters')}}</el-menu-item>
          <el-menu-item class="item-menu"   index="/newsearch" v-if="currentUser"><i class="el-icon-search"></i> {{$ml.get('word.search')}}</el-menu-item>
            <el-menu-item class="item-menu" index="/addData" v-if="currentUser.roles.indexOf('MODERATOR')!==-1"> <i class="el-icon-notebook-1"></i>{{$ml.get('word.updateData')}}</el-menu-item>
            <el-menu-item class="item-menu" index="/edittree" v-if="currentUser.roles.indexOf('MODERATOR')!==-1"><i class="el-icon-edit-outline"></i>{{$ml.get('word.setParameter')}}</el-menu-item>
            <el-menu-item class="item-menu" index="/treeStruct" v-if="currentUser.roles.indexOf('MODERATOR')!==-1"> {{$ml.get('word.treeStruct')}}</el-menu-item>
            <el-submenu index="2" style="position: absolute; right: 6vw">
                <template class="item-menu" slot="title"><span
                        style="font-size: 130%;">{{$ml.get('word.language')}}</span></template>
                <el-menu-item align="center"
                              @click="$ml.change('english')">Eng <img src="../../assets/United-Kingdom.png">
                </el-menu-item>
                <el-menu-item align="center" @click="$ml.change('russian')">Рус <img
                        src="../../assets/Russia.png"></el-menu-item>
                <el-menu-item align="center" @click="$ml.change('ukraine')">Укр <img
                        src="../../assets/Ukraine.png"></el-menu-item>
            </el-submenu>
            <el-menu-item class="item-menu" v-if="!currentUser" index="/login" style="position: absolute; right: 0vw">
                {{$ml.get('word.login')}}
            </el-menu-item>
            <el-menu-item class="item-menu" v-if="currentUser" index="/login" style="position: absolute; right: 0vw"
                          @click="logOut">
                {{$ml.get('word.logout')}}
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>

    import Router from "vue-router";
    import searchEng from "../SearchPage/searchEng";
    import testSave from "../AddDadaPage/vue-save-update-page";
    import login from "../login/login";
    import registration from "../registration/Register";
    import treeEdit from "../TreeEditPage/tree-page";

    export default {
        name: "navbar",
        components: {},
        props: {},
        data: () => ({
            router: new Router({
                routes: [
                    {
                        path: '/',
                        component: searchEng
                    },
                    {
                        path: '/addData',
                        component: testSave
                    },
                    {
                        path: '/login',
                        component: login
                    },
                    {
                        path: '/registration',
                        component: registration
                    },
                    {
                        path: '/edittree',
                        component: treeEdit
                    }
                ]
            }),
            searchLink: false,
            updateDataLink: false,
            treeElemLink: false,
            loginLink: false,
            logoutLink: false,
            languageLink: false
        }),
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
            showAdminBoard() {
                if (this.currentUser) {
                    return this.currentUser.roles.includes("ROLE_ADMIN");
                }
                return false;
            },
            showModeratorBoard() {
                if (this.currentUser) {
                    return this.currentUser.roles.includes("ROLE_MODERATOR");
                }
                return false;
            }
        },
        methods: {

            logOut() {
                this.$store.dispatch("auth/logout");
                this.$router.push("/login");
            }
        },
        watch: {},
        mounted() {
        }
    }
</script>


<style scoped>

    .item-menu {
        font-size: 110%;
        padding-right: 2vw;
        padding-left: 2vw;
    }


</style>
