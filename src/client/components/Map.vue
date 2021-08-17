<template>
  <div class="map">
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
  computed: mapGetters(["currentClear"]),
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
    clearColor() {
      this.activeColor = !this.activeColor;
    },
    ...mapActions(["newStart", "newDestination", "newSet"]),
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
.vue-grid-layout {
  position: relative;
  width: 1200px;
}

.vue-grid-item {
  border: 1.2px solid #469096;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  display: inline-block; /* this shouldn't be needed on a button though */
  width: 100%;
  height: 100%;
  background: white;
  font-weight: bold;
  font-size: 20px;
}

button:hover {
  background: rgb(174, 175, 175);
  transition-delay: 0s;
  transition-duration: 0.5s;
  opacity: 1;
}

button:active {
  background: orange;
  transition-delay: 0s;
  transition-duration: 0.1s;
  opacity: 1;
}
</style>
