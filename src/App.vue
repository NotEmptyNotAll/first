<template>
  <div id="app">
    <search/>
  </div>
</template>

<script>
  import search from "@/components/searchEng"
export default {
  name: 'App',
  components: {
    search
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
