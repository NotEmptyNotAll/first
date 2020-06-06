<template>
    <div>
        <b-navbar class="navbar navbar-expand-lg navbar-light colorauto" toggleable="lg">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>

                <div class=" collapse navbar-collapse " id="conteudoNavbarSuportado">
                    <ul class="navbar-nav mr-auto" style="font-family: 'Montserrat', sans-serif; ">
                        <li class="nav-elem "   style="margin-right: 10px;">
                            <a class="nav-link fontbranco" href="/#/">{{$ml.get('word.search')}}</a>
                        </li>

                        <li class="nav-elem nav-hov"  style="margin-right: 5px;">
                            <a class="nav-link fontbranco"  href="/#/addData"
                               v-if="currentUser">{{$ml.get('word.updateData')}}</a>
                        </li>
                        <li class="nav-elem nav-hov" style="margin-right: 5px;">
                            <a class="nav-link fontbranco"  href="/#/edittree"
                               v-if="currentUser">{{$ml.get('word.treeElem')}}</a>
                        </li>
                        <!--<li class="nav-elem nav-hov" style="margin-right: 5px;">
                            <a class="nav-link fontbranco" href="/#/elemTree"
                               v-if="currentUser">{{$ml.get('word.treeElem')}}</a>
                        </li>-->
                        <li class=" nav-elem dropdown " style="position: absolute; right: 7vw">
                            <a class="nav-link dropdown-toggle fontbranco" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{$ml.get('word.language')}}
                            </a>
                            <div class="dropdown-menu colorauto" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item fontbranco"
                                   @click="$ml.change('ukraine')"
                                   href="#"><img src="../assets/Ukraine.png"> укр </a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item fontbranco" href="#"
                                   @click="$ml.change('russian')"
                                ><img src="../assets/Russia.png"> рус </a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item fontbranco"
                                   @click="$ml.change('english')"
                                   href="#"> <img src="../assets/United-Kingdom.png"> eng</a>
                            </div>
                        </li>
                        <li class="nav-elem   nav-hov" v-if="!currentUser" style="position: absolute; right: 2vw">
                            <a class="nav-link fontbranco" href="/#/login">{{$ml.get('word.login')}}</a>
                        </li>
                        <li class="nav-elem   nav-hov" v-if="currentUser" style="position: absolute; right: 2vw">
                            <a class="nav-link fontbranco" href="/#/login"
                               @click="logOut">{{$ml.get('word.logout')}}</a>
                        </li>
                    </ul>
                </div>
            </b-collapse>
        </b-navbar>

    </div>
</template>

<script>

    export default {
        name: "navbar",
        components: {},
        props: {},
        data: () => ({
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


<style>

    .navbar-nav {
        width: 100%;
    }

    #conteudoNavbarSuportado {
        width: 100%;
    }

    .nav-elem {
        margin-left: 2vw;
    }


    .nav-elem-left {
        position: absolute;
        right: 2vw;
        width: 10vw;
    }

    .nav-elem-left:hover {
        background: #272e38;

    }

    .navbar {
        width: 100%;
        background: #272e38;
        -webkit-box-shadow: 0px 10px 35px -9px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 0px 10px 35px -9px rgba(0, 0, 0, 0.75);
        box-shadow: 0px 10px 35px -9px rgba(0, 0, 0, 0.75);
    }

    .colorauto {
        background-color: #272e38 !important;
    }

    .fontbranco {
        color: white !important;
        letter-spacing: 2px;
    }

    .fontbranco:hover {
        background-color: #272e38 !important;

    }

    .nav-elem:hover {
        background-color: #272e38 !important;
    }

    .nav-elem:hover {
    }

    .dropdown-menu {
        background-color: #272e38 !important;
        font-weight: bold !important;
    }

    .dropdown-item:hover {
        background-color: #272e38 !important;
        font-weight: bold;
    }

    .logoresp1 {
        display: none;
        text-align: right;
        list-style-type: none;
    }


    .nav-elem::before {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #fff;
        transition: 0.3s;
        transform: translateX(0);
        transform: scaleX(0)
    }

    .nav-elem::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #fff;
        transition: 0.3s;
        transform: translateX(0);
        transform: scaleX(0)
    }

    .nav-elem:hover::after {
        width: 100%;
        transform: scaleX(1);
        opacity: 1
    }

    .nav-elem:hover::before {
        transform: scaleX(1);
        opacity: 1
    }

    .nav-link {
        padding: 15px 5px;
        transition: 0.2s;
    }


    .nav-link {
        padding: 15px 5px;
    }

    .navbar-nav .nav-link {
        color: #fff;
    }

    .center p {
        font-size: 10em;
        display: INLINE-block;
    }

    .center p:hover {
        display: none;
    }

    p:hover ~ #p2 {
        display: inherit;
    }


    @media screen and (max-width: 1000px) {
        .logoresp1 {
            display: inherit;
        }

        .dropdown-item:hover {
            background-color: white !important;
            color: rgba(12, 60, 96, 1) !important;
            font-weight: bold;
        }

        .nav-elem:hover::before {
            width: 100px;
        }

        .nav-elem:hover::after {
            width: 100px;
        }

    }

    .activeLink::before {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #fff;
        transition: 0.3s;
        transform: scaleX(1);
        opacity: 1
    }

    .activeLink::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #fff;
        transition: 0.3s;
        transform: scaleX(1);
        opacity: 1
    }


</style>
