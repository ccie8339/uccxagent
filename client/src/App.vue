<template>
  <v-app>
    <login />
    <state-toggle />
  </v-app>
</template>

<script>
import Login from "./components/Login";
import StateToggle from "@/components/StateToggle";

export default {
  name: "App",

  components: {
    Login,
    StateToggle
  },
  data: () => ({
    //
  })
};
</script>
