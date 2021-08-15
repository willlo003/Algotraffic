<template>
  <div class="header">
    <select name="methods" id="methods">
      <option value="DFS">DFS</option>
      <option value="BFS">BFS</option>
      <option value="A*">A*</option>
      <option value="Greedy">Greedy</option>
      <option value="Dijkstra's">Dijkstra's</option>
    </select>
    <button class="start" id="start">start</button>
    <button class="clear" id="clear">clear</button>
    <p class="start-point" id="start-point">Start Point {{ currentStart }}</p>
    <p class="destination" id="destination">
      Destination {{ currentDestination }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TheHeader",
  computed: mapGetters(["currentStart", "currentDestination"]),
  // data() {
  //   return {};
  // },
};
</script>

<style scoped>
.header > select,
.header > button,
.header > p {
  display: inline-block;
}
</style>
