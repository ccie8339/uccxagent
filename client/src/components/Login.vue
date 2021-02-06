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
      username: "",
      usernameRules: [v => !!v || "Name is required"],
      password: "",
      passwordRules: [v => !!v || "Password is required"],
      extension: "",
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
      "setRoles"
    ]),
    validate() {
      this.$refs.form.validate();
    },
    async login() {
      this.validate();
      const userUri = "http://localhost:8081/finesse/api/User/";
      //   const user = {
      //     User: {
      //       state: "LOGIN",
      //       extension: this.extension,
      //     },
      //   };
      try {
        const response = await axios.get(`${userUri}${this.username}`, {
          auth: { username: this.username, password: this.password }
        });
        const user = convert.xml2js(response.data, {
          compact: true,
          ignoreComment: true
        }).User;
        this.setExtension(user.extension._text);
        this.setFirstName(user.firstName._text);
        this.setLastName(user.lastName._text);
        this.setLoginId(user.loginId._text);
        this.setLoginName(user.loginName._text);
        this.setRoles(user.roles.role.map(role => role._text));
        console.log(
          convert.xml2js(response.data, { compact: true, ignoreComment: true })
            .User
        );
      } catch (error) {
        console.log(error);
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
