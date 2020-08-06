<template>
    <div>
        <ul
                :id="elementId"
                class="vue-simple-context-menu"
                v-click-outside="onClickOutside"
        >
            <li class="label">{{$ml.get('word.downlandBlank')}}</li>
            <li
                    v-for="(option, index) in options"
                    :key="index"
                    @click.stop="optionClicked(option)"
                    class="vue-simple-context-menu__item"
                    :class="option.class"
            ><i class="el-icon-s-order"></i>
                    {{option.name}}
            </li>
        </ul>
    </div>
</template>

<script>

    import Vue from 'vue'
    import vClickOutside from 'v-click-outside'

    Vue.use(vClickOutside)

    export default {
        name: 'VueContextMenu',
        props: {
            elementId: {
                type: String,
                required: true
            },
            options: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                item: null,
                menuWidth: null,
                menuHeight: null
            }
        },
        methods: {
            showMenu(event, item) {
                this.item = item

                let menu = document.getElementById(this.elementId)
                if (!menu) {
                    return
                }
                if (!this.menuWidth || !this.menuHeight) {
                    menu.style.visibility = "hidden"
                    menu.style.display = "block"
                    this.menuWidth = menu.offsetWidth
                    this.menuHeight = menu.offsetHeight
                    menu.removeAttribute("style")
                }

                let e = e || window.event

                if (e.pageX == null && e.clientX != null) {
                    var html = document.documentElement
                    var body = document.body

                    e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
                    e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
                }

                if ((this.menuWidth + e.pageX) >= window.innerWidth) {
                    menu.style.left = (e.pageX - this.menuWidth - 35) + "px"
                } else {
                    menu.style.left = (e.pageX - 35) + "px"
                }

                if ((this.menuHeight + e.pageY) >= window.innerHeight) {
                    menu.style.top = (e.pageY + 130) + "px"
                } else {
                    menu.style.top = (e.pageY - 130) + "px"
                }

                menu.classList.add('vue-simple-context-menu--active')
            },
            hideContextMenu() {
                let element = document.getElementById(this.elementId)
                if (element) {
                    element.classList.remove('vue-simple-context-menu--active');
                }
            },
            onClickOutside() {
                this.hideContextMenu()
            },
            optionClicked(option) {
                this.hideContextMenu()
                this.$emit('option-clicked', {
                    item: this.item,
                    option: option
                })
            },
            onEscKeyRelease(event) {
                if (event.keyCode === 27) {
                    this.hideContextMenu();
                }
            }
        },
        mounted() {
            document.body.addEventListener('keyup', this.onEscKeyRelease);
        },
        beforeDestroy() {
            document.removeEventListener('keyup', this.onEscKeyRelease);
        }
    }
</script>

<style lang="scss">
    $light-grey: #ecf0f1;
    $grey: darken($light-grey, 15%);
    $blue: #409EFF;
    $white: #fff;
    $black: #333;

    .label {
        color: gray;
        text-align: center;
        border-style: solid;
        border-color: lightgray;
        border-width: 0px 0px 1px 0px;
    }

    .label:hover {
        background: #ecf0f1;
    }

    .vue-simple-context-menu {
        top: 0;
        left: 0;
        margin: 0;
        padding: 0;
        display: none;
        list-style: none;
        position: absolute;
        z-index: 1000000;
        background-color: $light-grey;
        border-bottom-width: 0px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
        box-shadow: 0 3px 6px 0 rgba($black, 0.2);
        border-radius: 4px;

        &--active {
            display: block;
        }

        &__item {
            display: flex;
            color: $black;
            cursor: pointer;
            padding: 5px 15px;
            align-items: center;

            &:hover {
                background-color: #409EFF;
                color: $white;
            }
        }

        // Have to use the element so we can make use of `first-of-type` and
        // `last-of-type`
        li {
            &:first-of-type {
                margin-top: 4px;
            }

            &:last-of-type {
                margin-bottom: 4px;
            }
        }
    }
</style>
