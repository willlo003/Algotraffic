import { AnyMxRecord } from "dns";

const state = {
  startpoint: [undefined, undefined],
  destination: [undefined, undefined],
  currentSet: "startpoint",
  currentClear: false,
  currentDrag: null,
  currentBlock: [],
  currentColor: undefined,
  currentTempBlock: [],
};

const getters = {
  currentStart: (state: any) => state.startpoint,
  currentDestination: (state: any) => state.destination,
  currentSet: (state: any) => state.currentSet,
  currentClear: (state: any) => state.currentClear,
  currentDrag: (state: any) => state.currentDrag,
  currentBlock: (state: any) => state.currentBlock,
  currentColor: (state: any) => state.currentColor,
  currentTempBlock: (state: any) => state.currentTempBlock,
};

const actions = {
  newStart({ commit }: any, arg: Array<string>) {
    commit("setStart", arg);
  },
  newDestination({ commit }: any, arg: Array<string>) {
    commit("setDestination", arg);
  },
  newSet({ commit }: any, arg: string) {
    commit("setNewSet", arg);
  },
  newClear({ commit }: any, arg: boolean) {
    commit("setNewClear", arg);
  },
  newDrag({ commit }: any, arg: number) {
    commit("setNewDrag", arg);
  },
  newBlock({ commit }: any, arg: number) {
    commit("setNewBlock", arg);
  },
  newColor({ commit }: any, arg: number) {
    commit("setNewColor", arg);
  },
  newTempBlock({ commit }: any, arg: number) {
    commit("setNewTempBlock", arg);
  },
};

const mutations = {
  setStart: (state: any, startpoint: any) => (state.startpoint = startpoint),
  setDestination: (state: any, destination: any) =>
    (state.destination = destination),
  setNewSet: (state: any, currentSet: any) => (state.currentSet = currentSet),
  setNewClear: (state: any, currentClear: any) =>
    (state.currentClear = currentClear),
  setNewDrag: (state: any, currentDrag: any) =>
    (state.currentDrag = currentDrag),
  setNewBlock: (state: any, currentBlock: any) =>
    (state.currentBlock = currentBlock),
  setNewColor: (state: any, currentColor: any) =>
    (state.currentColor = currentColor),
  setNewTempBlock: (state: any, currentTempBlock: any) =>
    (state.currentTempBlock = currentTempBlock),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
