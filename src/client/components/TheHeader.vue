<template>
  <div class="content">
    <h1>AlgoTraffic</h1>
    <div class="header">
      <div class="select">
        <select name="methods" id="methods" @change="algoMethod($event)">
          <option value="" disabled>Approach</option>
          <option value="DFS" id="option">Depth-first Search</option>
          <option value="BFS" id="option">Breadth-first Search</option>
          <option value="A*" id="option">A* Search</option>
          <option value="Greedy" id="option">Greedy Best-first Search</option>
          <option value="Dijkstra's" id="option">Dijkstra's Algorithm</option>
        </select>
      </div>
      <button class="start" id="start" @click="startRunning">start</button>
      <button class="clean" id="clean" @click="clean">clean</button>
      <p class="start-point" id="start-point">
        Start Point:
        {{ currentStart[0] === undefined ? "Please Set" : currentStart }}
      </p>
      <p class="destination" id="destination">
        Destination:
        {{
          currentDestination[0] === undefined
            ? "Please Set"
            : currentDestination
        }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from "vuex";
import BFS from "../Algorithm/BFS";
import DFS from "../Algorithm/DFS";
import Greedy from "../Algorithm/Greedy";
import A from "../Algorithm/A*";
import Dijkstra from "../Algorithm/Dijkstra";

export default {
  name: "TheHeader",
  computed: mapGetters(["currentStart", "currentDestination"]),
  data() {
    return {};
  },
  methods: {
    ...mapActions([
      "newStart",
      "newDestination",
      "newClean",
      "newSet",
      "newBlock",
      "newAlgoMethod",
    ]),
    startRunning() {
      //Current Start Node Coordinate
      let startNodeCoordinate = this.$store.getters.currentStart;
      let destinationNodeCoordinate = this.$store.getters.currentDestination;
      let currentBlockedNodeId = this.$store.getters.currentBlock;
      if (this.$store.getters.currentAlgoMethod === "DFS") {
        DFS(
          startNodeCoordinate,
          destinationNodeCoordinate,
          currentBlockedNodeId
        );
      } else if (this.$store.getters.currentAlgoMethod === "BFS") {
        BFS(
          startNodeCoordinate,
          destinationNodeCoordinate,
          currentBlockedNodeId
        );
      } else if (this.$store.getters.currentAlgoMethod === "Greedy") {
        Greedy(
          startNodeCoordinate,
          destinationNodeCoordinate,
          currentBlockedNodeId
        );
      } else if (this.$store.getters.currentAlgoMethod === "A*") {
        A(startNodeCoordinate, destinationNodeCoordinate, currentBlockedNodeId);
      } else if (this.$store.getters.currentAlgoMethod === "Dijkstra's") {
        Dijkstra(
          startNodeCoordinate,
          destinationNodeCoordinate,
          currentBlockedNodeId
        );
      }
    },

    algoMethod(e: any) {
      this.newAlgoMethod(e.target.value);
    },

    clean() {
      // clean all facilities

      const elements = document.getElementsByClassName("facility");
      while (elements.length > 0) {
        let currentFacilityParentNode: any = elements[0].parentNode;
        currentFacilityParentNode.removeChild(elements[0]);
      }
      // clean blocked Nodes
      this.newBlock([]);

      // clean the current start point and destination
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
      //clean color
      let newClean = !this.$store.getters.currentClean;
      this.newClean(newClean);
    },
  },
};
</script>

<style scoped>
.content {
  text-align: center;
  color: white;
}
.header {
  text-align: center;
  width: 1200px;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  align-items: center;
}

.header > select,
.header > button,
.header > p {
  display: inline-block;
}

.header > p {
  color: white;
  position: relative;
}

select {
  padding-right: 15px;
  border: none;
  color: rgb(255, 255, 255);
  background: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
}

select:hover {
  color: rgba(99, 88, 72, 0.603);
}

.select {
  position: relative;
  border: none;
  border-radius: 20px;
  color: rgb(255, 255, 255);
  background-color: rgba(255, 255, 255, 0.2);
  margin: auto;
  padding: 10px;
}

.select::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  right: 15px;
  width: 0;
  height: 0;
  margin: auto 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid white;
}

.select:hover::after {
  border-top-color: black;
}

button {
  position: relative;
  border: none;
  border-radius: 20px;
  color: rgb(255, 255, 255);
  background-color: rgba(255, 255, 255, 0.2);
  margin: 30px;
  padding: 10px;
  /* font-weight: bold; */
  font-size: 18px;
}

button:hover {
  background-color: rgba(255, 255, 255, 0.562);
}

button:active {
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>
