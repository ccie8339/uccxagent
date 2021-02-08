<template>
  <v-row class="mx-auto">
    <v-col>
      <v-btn
        v-if="agentState !== null && agentState != undefined"
        :loading="refreshingUserData"
        class="mr-2 red white--text"
        :color="agentState === 'READY' ? 'red' : 'green'"
        @click="toggleStatus"
        minWidth="210"
        >{{ agentStateText }}</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
const convert = require("xml-js");

export default {
  computed: {
    ...mapState(["serverUri", "loginId", "password"]),
    ...mapState("user", [
      "refreshingUserData",
      "agentState",
      "extension",
      "agentUri",
      "extension"
    ]),
    agentStateText() {
      return this.agentState === "READY" ? "Mark Not Ready" : "Mark Ready";
    }
  },
  methods: {
    ...mapActions("user", ["refreshUserData"]),
    async toggleStatus() {
      const headers = {
        Accept: "*/*",
        "Content-Type": "application/xml"
      };
      let user = {
        User: {
          state: this.agentState === "NOT_READY" ? "READY" : "NOT_READY"
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
