const state = {
  startpoint: [undefined, undefined],
  destination: [undefined, undefined],
  currentSet: "startpoint",
  currentClear: false,
};

const getters = {
  currentStart: (state: any) => state.startpoint,
  currentDestination: (state: any) => state.destination,
  currentSet: (state: any) => state.currentSet,
  currentClear: (state: any) => state.currentClear,
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
};

const mutations = {
  setStart: (state: any, startpoint: any) => (state.startpoint = startpoint),
  setDestination: (state: any, destination: any) =>
    (state.destination = destination),
  setNewSet: (state: any, currentSet: any) => (state.currentSet = currentSet),
  setNewClear: (state: any, currentClear: any) =>
    (state.currentClear = currentClear),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
