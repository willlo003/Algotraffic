<template>
  <div class="city">
    <div class="mountain" draggable="true" @dragstart="startDrag($event)"></div>
    <div class="house" draggable="true" @dragstart="startDrag($event)"></div>
    <div
      class="road-block"
      draggable="true"
      @dragstart="startDrag($event)"
    ></div>
  </div>
</template>

<script lang="ts">
import { mapActions } from "vuex";

export default {
  name: "City",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["newDrag"]),
    startDrag(e: any) {
      let size: number = 0;
      if (e.target.className === "mountain") {
        size = 3;
      } else if (e.target.className === "house") {
        size = 2;
      } else if (e.target.className === "road-block") {
        size = 1;
      }
      this.newDrag(size);
    },
  },
};
</script>

<style scoped>
.city {
  width: 1200px;
  height: 80px;
  position: absolute;
  bottom: 30px;
  /* border: 2px solid red; */
  display: grid;
  grid-template-columns: auto auto auto;
  /* background-image: url("https://www.freeiconspng.com/thumbs/garbage-bin-png/recycle-bin-garbage-bin-png-22.png");
  background-position: center;
  background-repeat: no-repeat; */
}
.house {
  width: 200px;
  height: 100px;
  background-image: url("https://image.flaticon.com/icons/png/512/2173/2173841.png");
  background-size: 50px;
  background-position: center;
  background-repeat: no-repeat;
}
.road-block {
  width: 200px;
  height: 100px;
  background-image: url("https://image.flaticon.com/icons/png/512/4594/4594632.png");
  background-size: 50px;
  background-position: center;
  background-repeat: no-repeat;
}
.mountain {
  width: 200px;
  height: 100px;
  background-image: url("https://image.flaticon.com/icons/png/512/1020/1020515.png");
  background-size: 50px;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
