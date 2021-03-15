<template>
  <v-dialog v-model="showNetworkDialog" max-width="500">
    <v-card light>
      <v-card-title class="headline">
        <v-icon large color="red" class="mr-2">mdi-alert</v-icon>
        The Internet's Broken!
      </v-card-title>
      <v-card-text>
        <p>
          Ok so maybe not the internet. But something has gone wrong with our
          network or this request. We tried executing the request but the system
          just wasn't having any of it today. You can close this dialog and try
          again. We'll make sure to glare really hard at the servers this time. 
          That always helps.
        </p>
        <p>If the problem persists please reach out to <a href="mailto:support@forcemx.com">support.</a></p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-2" @click="showNetworkDialog = false"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import bus from "../scripts/eventBus";

export default {
  data: () => ({
    showNetworkDialog: false,
  }),
  mounted() {
    bus.$on("showNetworkDialog", (value) => {
      this.showNetworkDialog = value;
    });
  },
};
</script>