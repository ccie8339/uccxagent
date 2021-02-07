<template>
  <v-row class="mx-auto">
    <v-col>
      <v-chip
        v-if="agentState !== null"
        class="mr-2 red white--text"
        @click="toggleStatus"
        >{{ agentState }}</v-chip
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
    ...mapState([
      "serverUri",
      "agentState",
      "extension",
      "agentUri",
      "loginId",
      "password",
      "extension"
    ])
  },
  methods: {
    ...mapActions(["refreshAgentData"]),
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
          this.refreshAgentData();
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
