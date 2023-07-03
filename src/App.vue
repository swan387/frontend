<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <ItemList></ItemList>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import ItemList from './components/ItemList.vue';

export default {
  name: 'App',
  components: {
    ItemList
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

body {
  margin: 0;
  padding: 0;
}
</style>
