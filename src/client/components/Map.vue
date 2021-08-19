<template>
  <div class="map" id="map">
    <grid-layout
      :layout.sync="layout"
      :auto-size="false"
      :col-num="35"
      :row-height="30"
      :is-draggable="false"
      :is-resizable="false"
      :use-css-transforms="true"
      :margin="[0, 0]"
      ref="grid-layout"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :ref="`item-${item.i}`"
        :is-draggable="false"
        :is-resizable="false"
      >
        <button
          @click="click(item.x, item.y)"
          :ref="`x${item.x}` + `y${item.y}`"
          :id="`x${item.x}` + `y${item.y}`"
          :style="{ background: currentClear ? 'white' : '#ffffff' }"
          @drop="onDrop($event)"
          @dragover.prevent
          @dragleave.prevent
          @dragleave="leaveDrag($event, item.x, item.y)"
          @dragover="overDrag($event, item.x, item.y)"
        ></button>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script lang="ts">
import VueGridLayout from "vue-grid-layout";
import Grid from "../store/modules/grid";
import { mapGetters, mapActions } from "vuex";

let testLayout: Array<Object> = Grid;

export default {
  name: "Map",
  computed: mapGetters(["currentClear", "currentDrag"]),
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  data() {
    return {
      layout: testLayout,
      activeColor: false,
    };
  },
  methods: {
    ...mapActions([
      "newStart",
      "newDestination",
      "newSet",
      "newBlock",
      "newColor",
      "newTempBlock",
    ]),

    // function of drop
    onDrop(e: any) {
      // when the facility can be placed
      if (this.$store.getters.currentColor === "green") {
        let rect = e.target.getBoundingClientRect();
        let thisNode: any = document.getElementById(e.target.id);
        let currentDragSize = this.$store.getters.currentDrag;
        let newFacility = document.createElement("div");
        let dropBoard: any = document.getElementById("map");

        thisNode.style.background = "green";
        newFacility.style.backgroundRepeat = "no-repeat";
        newFacility.style.backgroundPosition = "center";
        newFacility.style.backgroundSize = "cover";
        newFacility.style.position = "absolute";
        newFacility.className = "facility";

        if (currentDragSize === 1) {
          newFacility.style.backgroundImage =
            "url('https://image.flaticon.com/icons/png/512/4594/4594632.png')";
          newFacility.style.width = "30px";
          newFacility.style.height = "30px";
          newFacility.style.left = `${rect.x + 2.5}px`;
          newFacility.style.top = `${rect.y}px`;
        } else if (currentDragSize === 2) {
          newFacility.style.backgroundImage =
            "url('https://image.flaticon.com/icons/png/512/2173/2173841.png')";
          newFacility.style.width = "55px";
          newFacility.style.height = "55px";
          newFacility.style.left = `${rect.x + 8}px`;
          newFacility.style.top = `${rect.y + 1}px`;
        } else if (currentDragSize === 3) {
          newFacility.style.backgroundImage =
            "url('https://image.flaticon.com/icons/png/512/1020/1020515.png')";
          newFacility.style.width = "90px";
          newFacility.style.height = "90px";
          newFacility.style.left = `${rect.x - 28}px`;
          newFacility.style.top = `${rect.y - 30}px`;
        }
        dropBoard.append(newFacility);

        let newBlock = this.$store.getters.currentBlock;
        this.$store.getters.currentTempBlock.forEach((e: string) =>
          newBlock.push(e)
        );
        this.newBlock(newBlock);
      } else {
        // when it can't
        this.$store.getters.currentTempBlock.forEach((e: any) => {
          let currentNode: any = document.getElementById(e);
          currentNode.style.background = "white";
        });
      }
      this.newTempBlock([]);
    },

    // function of overLeave
    overDrag(e: any, thisX: number, thisY: number) {
      let unBlockedNodess = this.selectingBlock(thisX, thisY);
      for (let i = 0; i < unBlockedNodess.length; i++) {
        let currentaffectedNodeNode: any = document.getElementById(
          unBlockedNodess[i]
        );
        currentaffectedNodeNode.style.background =
          this.$store.getters.currentColor;
      }
    },

    // function of dragLeave
    leaveDrag(e: any, thisX: number, thisY: number) {
      let unBlockedNodess = this.selectingBlock(thisX, thisY);
      for (let i = 0; i < unBlockedNodess.length; i++) {
        let currentaffectedNodeNode: any = document.getElementById(
          unBlockedNodess[i]
        );
        currentaffectedNodeNode.style.background = "white";
      }
    },

    //function for selecting hovering block
    selectingBlock(thisX: number, thisY: number) {
      let currentDragSize = this.$store.getters.currentDrag;
      let affectedNode = [[thisX, thisY]];
      let affectedNodeId: Array<string> = [];
      this.newColor("green");

      if (currentDragSize === 2) {
        affectedNode.push([thisX + 1, thisY]);
        affectedNode.push([thisX, thisY + 1]);
        affectedNode.push([thisX + 1, thisY + 1]);
      } else if (currentDragSize === 3) {
        affectedNode.push([thisX - 1, thisY - 1]);
        affectedNode.push([thisX, thisY - 1]);
        affectedNode.push([thisX + 1, thisY - 1]);
        affectedNode.push([thisX - 1, thisY]);
        affectedNode.push([thisX + 1, thisY]);
        affectedNode.push([thisX - 1, thisY + 1]);
        affectedNode.push([thisX, thisY + 1]);
        affectedNode.push([thisX + 1, thisY + 1]);
      }
      // filter the node when it is out of boundary
      let filtered = affectedNode.filter(
        (e) => e[0] >= 0 && e[0] <= 34 && e[1] >= 0 && e[1] <= 14
      );
      // create an array to memorize the blocked node
      filtered.forEach((e) => affectedNodeId.push(`x${e[0]}` + `y${e[1]}`));
      let unBlockedNodes = affectedNodeId.filter(
        (e) => !this.$store.getters.currentBlock.includes(e)
      );
      if (affectedNode.length !== unBlockedNodes.length) {
        this.newColor("red");
      }

      this.newTempBlock(unBlockedNodes);
      return unBlockedNodes;
    },

    // function of cleaning colors
    clearColor() {
      this.activeColor = !this.activeColor;
    },
    // function of clicking the node
    click(x: number, y: number) {
      //OnClick Node
      let onClickNode: any = this.$refs[`x${x}` + `y${y}`];
      //Current set Start or Destination
      let currentSet = this.$store.getters.currentSet;
      //Current StartNode and DestinationNode
      let currentStart = this.$store.getters.currentStart;
      let currentDestination = this.$store.getters.currentDestination;
      let currentStartNode: any;
      let currentDestinationNode: any;

      if (currentSet === "startpoint") {
        onClickNode[0].textContent = "S";
        if (currentStart[0] >= 0) {
          currentStartNode =
            this.$refs[`x${currentStart[0]}` + `y${currentStart[1]}`];
          currentStartNode[0].textContent = "";
        }
        this.newStart([x, y]);
        this.newSet("destination");
      } else {
        onClickNode[0].textContent = "D";
        if (currentDestination[0] >= 0) {
          currentDestinationNode =
            this.$refs[
              `x${currentDestination[0]}` + `y${currentDestination[1]}`
            ];
          currentDestinationNode[0].textContent = "";
        }
        this.newDestination([x, y]);
        this.newSet("startpoint");
      }
    },
  },
};
</script>

<style scoped>
button {
  display: inline-block; /* this shouldn't be needed on a button though */
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 20px;
  border-radius: 7px;
  opacity: 0.7;
}

button:hover {
  /* transition-delay: 0s;
  transition-duration: 0.5s; */
  opacity: 1;
}

button:active {
  background: orange;
  transition-delay: 0s;
  transition-duration: 0.1s;
  opacity: 1;
}
</style>
