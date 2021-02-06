import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    extension: null,
    firstName: null,
    lastName: null,
    loginId: null,
    loginName: null,
    roles: [],
    agentState: null,
    teamName: null
  },
  mutations: {
    setExtension: (state, extension) => (state.extension = extension),
    setFirstName: (state, firstName) => (state.firstName = firstName),
    setLastName: (state, lastName) => (state.lastName = lastName),
    setLoginId: (state, loginId) => (state.loginId = loginId),
    setLoginName: (state, loginName) => (state.loginName = loginName),
    setRoles: (state, roles) => (state.roles = [...roles]),
    setAgentState: (state, agentState) => (state.AgentState = agentState),
    setTeamName: (state, teamName) => (state.teamName = teamName)
  },
  actions: {
    setExtension: ({ commit }, extension) => commit("setExtension", extension),
    setFirstName: ({ commit }, firstName) => commit("setFirstName", firstName),
    setLastName: ({ commit }, lastName) => commit("setLastName", lastName),
    setLoginId: ({ commit }, loginId) => commit("setLoginId", loginId),
    setLoginName: ({ commit }, loginName) => commit("setLoginName", loginName),
    setRoles: ({ commit }, roles) => commit("setRoles", [...roles]),
    setAgentState: ({ commit }, agentState) =>
      commit("setAgentState", agentState),
    setTeamName: ({ commit }, teamName) => commit("setTeamName", teamName)
  },
  modules: {}
});
