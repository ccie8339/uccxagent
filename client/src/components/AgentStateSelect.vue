<template>
  <div class="text-center">
    <v-menu auto>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-on="on"
          v-bind="attrs"
          min-width="200"
          :color="
            agentState === 'NOT_READY' ? 'red white--text' : 'green white--text'
          "
          ><v-icon>{{
            agentState === "NOT_READY" ? "mdi-phone-off" : "mdi-phone"
          }}</v-icon
          >{{ agentState === "NOT_READY" ? "Not Ready" : "Ready" }}</v-btn
        >
      </template>
      <v-list>
        <v-list-item
          @click="
            () =>
              setAgentState(agentState === 'NOT_READY' ? 'READY' : 'NOT_READY')
          "
          key="READY_NOT_READY"
          ><v-btn
            :color="
              agentState === 'READY' ? 'red white--text' : 'green white--text'
            "
            min-width="200"
            ><v-icon>{{
              agentState === "READY" ? "mdi-phone-off" : "mdi-phone"
            }}</v-icon
            >{{ agentState === "READY" ? "Not Ready" : "Ready" }}</v-btn
          ></v-list-item
        >
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
const convert = require("xml-js");
export default {
  computed: {
    ...mapState("user", ["agentState", "agentUri"]),
    ...mapState(["serverUri", "loginId", "password"])
  },
  methods: {
    ...mapActions("user", ["refreshUserData"]),
    async setAgentState(agentState) {
      const headers = {
        Accept: "*/*",
        "Content-Type": "application/xml"
      };
      let user = {
        User: {
          state: agentState
        }
      };
      let xmlUser = convert.js2xml(user, {
        compact: true,
        ignoreComment: true,
        spaces: 4
      });
      try {
        const response = await axios.put(
          `${this.serverUri}${this.agentUri}`,
          xmlUser,
          {
            headers: headers,
            auth: { username: this.loginId, password: this.password }
          }
        );
        if (response.status === 202) {
          this.refreshUserData();
        } else {
          console.log("Agent State Change Failed");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
