import Vuex from "vuex";
import Vue from "vue";
import conditions from "./modules/conditions";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    conditions,
  },
});
