import Vue from "vue";
import Vuex from "vuex";

import peopleStore from "@/store/modules/people";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { isLoading: false, logs: [] },
  mutations: {
    loadingToggle(state, loading) {
      console.log(
        "mutations!!!!!!!!!!!!!!!!!!!!!! %c%s",
        "color:green;",
        loading
      );
      state.isLoading = loading;
    }
  },
  actions: {},
  modules: { people: peopleStore }
});
