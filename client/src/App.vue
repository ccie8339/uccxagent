<template>
  <v-app>
    <login />
    <agent-state-select
      v-if="agentState === 'READY' || agentState === 'NOT_READY'"
    />
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import Login from "./components/Login";
// import StateToggle from "@/components/StateToggle";
import AgentStateSelect from "@/components/AgentStateSelect";

export default {
  name: "App",
  computed: {
    ...mapState("user", ["agentState"])
  },
  components: {
    Login,
    // StateToggle
    AgentStateSelect
  },
  data: () => ({
    //
  })
};
</script>
