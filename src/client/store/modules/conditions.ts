const state = {
  startpoint: undefined,
  destination: undefined,
  currentSet: "startpoint",
};

const getters = {
  currentStart: (state: any) => state.startpoint,
  currentDestination: (state: any) => state.destination,
  currentSet: (state: any) => state.currentSet,
};

const actions = {
  newStart({ commit }: any, arg: number) {
    commit("setStart", arg);
  },
  newDestination({ commit }: any, arg: number) {
    commit("setDestination", arg);
  },
  newSet({ commit }: any, arg: string) {
    commit("setNewSet", arg);
  },
};

const mutations = {
  setStart: (state: any, startpoint: any) => (state.startpoint = startpoint),
  setDestination: (state: any, destination: any) =>
    (state.destination = destination),
  setNewSet: (state: any, currentSet: any) => (state.currentSet = currentSet),
  // setTodos: (state, todos) => (state.todos = todos),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
