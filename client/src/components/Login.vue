<template>
  <v-card class="mx-auto" max-width="500">
    <v-row class="flex-d justify-center align-middle">
      <v-col cols="9">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="extension"
            :rules="extensionRules"
            label="Agent Extension"
            required
          ></v-text-field>
          <v-btn color="primary" class="mr-4" @click="login" :disabled="!valid">
            LOGIN
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
const axios = require("axios");
const convert = require("xml-js");
// const https = require('https');
import { mapActions } from "vuex";
export default {
  data() {
    return {
      valid: true,
      username: "Agent001",
      usernameRules: [v => !!v || "Name is required"],
      password: "ciscopsdt",
      passwordRules: [v => !!v || "Password is required"],
      extension: "6001",
      extensionRules: [v => !!v || "Extension is required"]
    };
  },
  methods: {
    ...mapActions([
      "setExtension",
      "setFirstName",
      "setLastName",
      "setLoginId",
      "setLoginName",
      "setPassword",
      "setRoles",
      "setAgentState",
      "setTeamName",
      "setAgentUri"
    ]),
    validate() {
      this.$refs.form.validate();
    },
    async login() {
      this.validate();
      const userUri = "http://localhost:8081/finesse/api/User/";
      const headers = {
        Accept: "*/*",
        "Content-Type": "application/xml"
      };
      try {
        let user = {
          User: {
            state: "LOGIN",
            extension: this.extension
          }
        };
        let xmlUser = convert.js2xml(user, {
          compact: true,
          ignoreComment: true,
          spaces: 4
        });
        let response = await axios.put(`${userUri}${this.username}`, xmlUser, {
          headers: headers,
          auth: { username: this.username, password: this.password }
        });
        if (response.status === 202) {
          response = await axios.get(`${userUri}${this.username}`, {
            headers: headers,
            auth: { username: this.username, password: this.password }
          });
        }
        user = convert.xml2js(response.data, {
          compact: true,
          ignoreComment: true
        }).User;
        this.setExtension(user.extension._text);
        this.setFirstName(user.firstName._text);
        this.setLastName(user.lastName._text);
        this.setLoginId(user.loginId._text);
        this.setLoginName(user.loginName._text);
        this.setPassword(this.password);
        this.setRoles(user.roles.role.map(role => role._text));
        this.setAgentState(user.state._text);
        this.setTeamName(user.teamName._text);
        this.setAgentUri(user.uri._text);
        // console.log(
        //   convert.xml2js(response.data, { compact: true, ignoreComment: true })
        //     .User
        // );
      } catch (error) {
        switch (error.response.status) {
          case 401:
            console.log("Invalid Username or Password");
            break;
          default:
            console.log(
              "An Unknown Error Has Occured Trying to Login, Please Try Again Later"
            );
        }
        console.log(error.response.status);
      }
      //   let xmlUser = convert.js2xml(user, {
      //     compact: true,
      //     ignoreComment: true,
      //     spaces: 4,
      //   });
      //   console.log(xmlUser);
    }
  }
};
</script>
<style></style>
