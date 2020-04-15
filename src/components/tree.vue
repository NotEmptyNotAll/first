<template>

    <ul>
        <li class="list-group-item border-white left"
             :class="{bold: isFolder}"
        >
            <span @click="toggle">
                {{ space+item.name }}
                <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
            </span>
            <button type="button" v-if="!isPressed" v-on:click="pressed" class="btn posLeft btn-success"  @click="getParamtrs(nav,item.id)">&#x2b;</button>
            <button type="button" v-if="isPressed"  class="btn posLeft btn-secondary disabled" >&#x2b;</button>
        </li>
        <ul class="list-group border-white left" v-show="isOpen" v-if="isFolder">
            <tree-item
                    class="item"
                    v-for="(child, index) in item.elementsCh"
                    :key="index"
                    :item="child"
                    :choice-param="choiceParam"
                    :nav="child.name"
                    :space="space.concat('')"
                    @get-paramtrs="getParamtrs"
            ></tree-item>
        </ul>
    </ul>

</template>

<script>


    export default {

        name: "tree-item",
        components: {},
        props: {
            space:String,
            item: Object,
            nav: String,
            choiceParam: Object
        },
        data: function () {
            return {
                isOpen: false,
                isPressed:false
            };
        },
        computed: {
            isFolder: function () {
                return this.item.elementsCh && this.item.elementsCh.length;
            }
        },
        methods: {
             getParamtrs(nav, number) {
                 this.$emit("get-paramtrs", nav, number)
            },
            pressed(){
                if (!this.isPressed) {
                    this.isPressed = !this.isPressed;
                }
            },
            toggle: function () {
                if (this.isFolder) {
                    this.isOpen = !this.isOpen;
                }
            }
        },
        watch: {},
        mounted() {
        }
    }
</script>


<style>
    .item {
        cursor: pointer;
    }

    .bold {
        font-weight: bold;
    }

    ul {
        padding-left: 1em;
        line-height: 1.5em;
        list-style-type: none;
    }

    .left {
        position: relative; /* Абсолютное позиционирование */
        left: -1px;
    }

    div {
        position: relative;;
    }

    .posLeft {
        position: absolute;
        right: 5px;
        bottom: 5px;
        top: 5px;
    }


</style>