<template>
  <v-dialog v-model="showJoinDialog" max-width="500" persistent>
    <v-card light>
      <v-card-title class="headline">
        <v-icon large class="mr-2">mdi-cards</v-icon> Join Game
      </v-card-title>
      <v-card-text>
        Were you invited to join a game? You'll need the game and access codes
        to join. Enter the values below and click join.
        <v-form v-model="valid" @submit.prevent class="mt-3" ref="joinGameForm">
          <v-text-field
            label="Game Id"
            counter="25"
            v-model="formData.id"
            maxlength="25"
            :rules="[rules.required, rules.counterid, rules.content]"
          />

          <v-text-field
            label="Access Code"
            counter="8"
            v-model="formData.code"
            maxlength="8"
            :rules="[rules.required, rules.countercode, rules.content]"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="warning" @click="close">Close</v-btn>
        <v-btn color="primary darken-2" :disabled="!valid" :loading="loading" @click="joinGame">Join Game</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import bus from "../scripts/eventBus";

const regex = new RegExp("^[a-zA-Z0-9_-]{8,21}$");

export default {
  data: () => ({
    valid: false,
    formData: {
      id: "",
      code: "",
    },
    rules: {
      required: (value) => !!value || "Required.",
      counterid: (value) =>
        value.length > 9 || "Must be 15 characters long.",
      countercode: (value) =>
        value.length == 8 || "Must be 8 characters long.",
      content: (value) =>
        regex.test(value) || "Can only contain letters numbers and underscore.",
    },
    loading: false,    
    showJoinDialog: false,
  }),
  methods: {
    async joinGame(){
      this.loading = true;
      try{
        var response = await this.$axios.post(`games/${this.formData.id}`, {id: this.formData.id, code: this.formData.code});
        if(this.$mode == 'dev') console.log("Join Response", response);
        this.$router.push({path: "/games", query:{id:this.formData.id}, replace: true});
		this.showJoinDialog = false;
      }catch(error){
        console.error(error);
      }
      this.loading = false;
    },
    close() {
      this.$refs.joinGameForm.resetValidation();
      this.showJoinDialog = false;
      this.formData.id = "";
      this.formData.code = "";
    },
  },
  mounted() {
    // add event listener
    bus.$on("showJoinDialog", (value) => {
      this.showJoinDialog = value;
    });

    // if this page is being reached from a share link then auto fill and show the join game dialog
    if (
      this.$store.state.token &&
      !!this.$route.query?.join &&
      !!this.$route.query?.code
    ) {
      this.formData.id = this.$route.query?.join;
      this.formData.code = this.$route.query?.code;
      this.showJoinDialog = true;
    }
  },
};
</script>