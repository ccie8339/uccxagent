import axios from "axios";
import convert from "xml-js";

const state = () => ({
  extension: null,
  firstName: null,
  lastName: null,
  loginId: null,
  loginName: null,
  roles: [],
  agentState: null,
  teamName: null,
  agentUri: null
});

const mutations = {
  setExtension: (state, extension) => (state.extension = extension),
  setFirstName: (state, firstName) => (state.firstName = firstName),
  setLastName: (state, lastName) => (state.lastName = lastName),
  setLoginId: (state, loginId) => (state.loginId = loginId),
  setLoginName: (state, loginName) => (state.loginName = loginName),
  setRoles: (state, roles) => (state.roles = [...roles]),
  setAgentState: (state, agentState) => (state.agentState = agentState),
  setTeamName: (state, teamName) => (state.teamName = teamName),
  setAgentUri: (state, agentUri) => (state.agentUri = agentUri)
};

const actions = {
  setExtension: ({ commit }, extension) => commit("setExtension", extension),
  setFirstName: ({ commit }, firstName) => commit("setFirstName", firstName),
  setLastName: ({ commit }, lastName) => commit("setLastName", lastName),
  setLoginId: ({ commit }, loginId) => commit("setLoginId", loginId),
  setLoginName: ({ commit }, loginName) => commit("setLoginName", loginName),
  setRoles: ({ commit }, roles) => commit("setRoles", [...roles]),
  setAgentState: ({ commit }, agentState) =>
    commit("setAgentState", agentState),
  setTeamName: ({ commit }, teamName) => commit("setTeamName", teamName),
  setAgentUri: ({ commit }, agentUri) => commit("setAgentUri", agentUri),
  refreshAgentData: async ({ commit, rootState }) => {
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/xml"
    };
    const response = await axios.get(
      `${rootState.serverUri}/finesse/api/User/${rootState.loginId}`,
      {
        headers: headers,
        auth: { username: rootState.loginId, password: rootState.password }
      }
    );
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
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
