import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serverUri: "http://localhost:8081",
    loginId: null,
    password: null
  },
  mutations: {
    setLoginId: (state, loginId) => (state.loginId = loginId),
    setPassword: (state, password) => (state.password = password)
  },
  actions: {
    setLoginId: ({ commit }, loginId) => commit("setLoginId", loginId),
    setPassword: ({ commit }, password) => commit("setPassword", password)
  },
  modules: { user }
});
