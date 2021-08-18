<template>
  <div class="header">
    <select name="methods" id="methods" @change="algoMethod($event)">
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
import DFS from "../Algorithm/DFS";
import Greedy from "../Algorithm/Greedy";
import A from "../Algorithm/A*";

let currentAlgoMethod = "DFS";

export default {
  name: "TheHeader",
  computed: mapGetters(["currentStart", "currentDestination"]),
  data() {
    return {};
  },
  methods: {
    ...mapActions(["newStart", "newDestination", "newClear", "newSet"]),
    startRunning() {
      //Current Start Node Coordinate
      let startNodeCoordinate = this.$store.getters.currentStart;
      let destinationNodeCoordinate = this.$store.getters.currentDestination;

      if (currentAlgoMethod === "DFS") {
        DFS(startNodeCoordinate);
      } else if (currentAlgoMethod === "BFS") {
        BFS(startNodeCoordinate);
      } else if (currentAlgoMethod === "Greedy") {
        Greedy(startNodeCoordinate, destinationNodeCoordinate);
      } else if (currentAlgoMethod === "A*") {
        A(startNodeCoordinate, destinationNodeCoordinate);
      }
    },
    algoMethod(e: any) {
      currentAlgoMethod = e.target.value;
    },
    clear() {
      // clear the current start point and destination
      let currentStart = this.$store.getters.currentStart;
      let currentDestination = this.$store.getters.currentDestination;
      let currentStartNode: any;
      let currentDestinationNode: any;

      if (currentStart[0] >= 0) {
        currentStartNode = document.getElementById(
          `x${currentStart[0]}` + `y${currentStart[1]}`
        );
        currentStartNode.textContent = "";
      }
      if (currentDestination[0] >= 0) {
        currentDestinationNode = document.getElementById(
          `x${currentDestination[0]}` + `y${currentDestination[1]}`
        );
        currentDestinationNode.textContent = "";
      }

      //set new end start point
      this.newStart([undefined, undefined]);
      this.newDestination([undefined, undefined]);
      this.newSet("startpoint");
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
