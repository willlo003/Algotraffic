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
      <button class="clear" id="clear" @click="clear">clear</button>
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
      } else if (currentAlgoMethod === "Dijkstra's") {
        Dijkstra(startNodeCoordinate);
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
