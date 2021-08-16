<template>
  <div class="header">
    <select name="methods" id="methods">
      <option value="DFS">DFS</option>
      <option value="BFS">BFS</option>
      <option value="A*">A*</option>
      <option value="Greedy">Greedy</option>
      <option value="Dijkstra's">Dijkstra's</option>
    </select>
    <button class="start" id="start" @click="startRunning">start</button>
    <button class="clear" id="clear" @click="clear">clear</button>
    <p class="start-point" id="start-point">
      Start Point:
      {{ currentStart[0] === undefined ? "Please Set" : currentStart }}
    </p>
    <p class="destination" id="destination">
      Destination:
      {{
        currentDestination[0] === undefined ? "Please Set" : currentDestination
      }}
    </p>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from "vuex";
import BFS from "../Algorithm/BFS";

export default {
  name: "TheHeader",
  computed: mapGetters(["currentStart", "currentDestination"]),
  data() {
    return {};
  },
  methods: {
    ...mapActions(["newStart", "newDestination", "newClear"]),
    startRunning() {
      //Current Start Node Coordinate
      let startNodeCoordinate = this.$store.getters.currentStart;
      BFS(startNodeCoordinate);
    },
    clear() {
      // clear the current start point and destination
      let currentStart = this.$store.getters.currentStart;
      let currentDestination = this.$store.getters.currentDestination;
      let currentStartNode: any;
      let currentDestinationNode: any;

      if (currentStart[0]) {
        currentStartNode = document.getElementById(
          `x${currentStart[0]}` + `y${currentStart[1]}`
        );
        currentStartNode.textContent = "";
      }
      if (currentDestination[0]) {
        currentDestinationNode = document.getElementById(
          `x${currentDestination[0]}` + `y${currentDestination[1]}`
        );
        currentDestinationNode.textContent = "";
      }

      //set new end start point
      this.newStart([undefined, undefined]);
      this.newDestination([undefined, undefined]);

      //clear color
      let newClear = !this.$store.getters.currentClear;
      this.newClear(newClear);
    },
  },
};
</script>

<style scoped>
.header > select,
.header > button,
.header > p {
  display: inline-block;
}

.header > p {
  color: white;
}
</style>
