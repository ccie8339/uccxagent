import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import convert from "xml-js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serverUri: "http://localhost:8081",
    extension: null,
    firstName: null,
    lastName: null,
    loginId: null,
    loginName: null,
    password: null,
    roles: [],
    agentState: null,
    teamName: null,
    agentUri: null
  },
  mutations: {
    setExtension: (state, extension) => (state.extension = extension),
    setFirstName: (state, firstName) => (state.firstName = firstName),
    setLastName: (state, lastName) => (state.lastName = lastName),
    setLoginId: (state, loginId) => (state.loginId = loginId),
    setLoginName: (state, loginName) => (state.loginName = loginName),
    setPassword: (state, password) => (state.password = password),
    setRoles: (state, roles) => (state.roles = [...roles]),
    setAgentState: (state, agentState) => (state.agentState = agentState),
    setTeamName: (state, teamName) => (state.teamName = teamName),
    setAgentUri: (state, agentUri) => (state.agentUri = agentUri)
  },
  actions: {
    setExtension: ({ commit }, extension) => commit("setExtension", extension),
    setFirstName: ({ commit }, firstName) => commit("setFirstName", firstName),
    setLastName: ({ commit }, lastName) => commit("setLastName", lastName),
    setLoginId: ({ commit }, loginId) => commit("setLoginId", loginId),
    setLoginName: ({ commit }, loginName) => commit("setLoginName", loginName),
    setPassword: ({ commit }, password) => commit("setPassword", password),
    setRoles: ({ commit }, roles) => commit("setRoles", [...roles]),
    setAgentState: ({ commit }, agentState) =>
      commit("setAgentState", agentState),
    setTeamName: ({ commit }, teamName) => commit("setTeamName", teamName),
    setAgentUri: ({ commit }, agentUri) => commit("setAgentUri", agentUri),
    refreshAgentData: async ({ commit, state }) => {
      const headers = {
        Accept: "*/*",
        "Content-Type": "application/xml"
      };
      const response = await axios.get(`${state.serverUri}${state.agentUri}`, {
        headers: headers,
        auth: { username: state.loginId, password: state.password }
      });
      const user = convert.xml2js(response.data, {
        compact: true,
        ignoreComment: true
      }).User;
      commit("setExtension", user.extension._text);
      commit("setFirstName", user.firstName._text);
      commit("setLastName", user.lastName._text);
      commit("setLoginId", user.loginId._text);
      commit("setLoginName", user.loginName._text);
      commit(
        "setRoles",
        user.roles.role.map(role => role._text)
      );
      commit("setAgentState", user.state._text);
      commit("setTeamName", user.teamName._text);
      commit("setAgentUri", user.uri._text);
    }
  },
  modules: {}
});
