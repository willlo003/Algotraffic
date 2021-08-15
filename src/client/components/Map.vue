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
        <button @click="click(item.i, item.x, item.y)" :ref="item.i"></button>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script lang="ts">
import VueGridLayout from "vue-grid-layout";
import Grid from "./grid";
import { mapGetters, mapActions } from "vuex";

// let sizing: number = 30;
let testLayout: Array<Object> = Grid;

export default {
  name: "Map",
  // props: {
  //   msg: String,
  // },
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  data() {
    return {
      layout: testLayout,
    };
  },
  methods: {
    ...mapActions(["newStart", "newDestination", "newSet"]),
    click(id: number, x: number, y: number) {
      let onClickNode = this.$refs[`${id}`];
      let currentStartNode = this.$refs[`${this.$store.getters.currentStart}`];
      let currentDestinationNode =
        this.$refs[`${this.$store.getters.currentDestination}`];
      if (this.$store.getters.currentSet === "startpoint") {
        onClickNode[0].textContent = "S";
        if (currentStartNode) {
          currentStartNode[0].textContent = "";
        }
        this.newStart(id);
        this.newSet("destination");
      } else {
        onClickNode[0].textContent = "D";
        if (currentDestinationNode) {
          currentDestinationNode[0].textContent = "";
        }
        this.newDestination(id);
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
