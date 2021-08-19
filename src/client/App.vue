<template>
  <div id="app">
    <TheHeader />
    <Map />
    <City />
  </div>
</template>

<script  lang="ts">
import TheHeader from "./components/TheHeader.vue";
import Map from "./components/Map.vue";
import City from "./components/City.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    City,
    Map,
  },
};
</script>

<style>
</style>
