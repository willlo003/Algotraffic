<template>
  <div id="app">
    <TheHeader />
    <Map />
  </div>
</template>

<script>
import TheHeader from "./TheHeader.vue";
import Map from "./Map.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    Map,
  },
};
</script>
