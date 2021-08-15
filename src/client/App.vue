<template>
  <div id="app">
    <TheHeader />
    <Map />
  </div>
</template>

<script  lang="ts">
import TheHeader from "./components/TheHeader.vue";
import Map from "./components/Map.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    Map,
  },
};
</script>
