<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-2">
        <h1 class="display-2 font-weight-bold">Getting Started</h1>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Easy as One and Done</h2>
        <v-layout justify-center>
            <v-form v-model="valid" @submit.prevent>
          <v-card max-width="500" color="transparent" flat>
            <p>Just enter a username to get started.</p>
            <v-text-field 
                label="Username" 
                counter
                maxlength="15"
                minlength="3" 
                hint="This is the name displayed to other players."
                v-model="username"
                ref="username"
                @keyup.enter="checkSubmit"
                :rules="[rules.required, rules.counter, rules.content]"
                 />
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary darken-3" :disabled="!valid" :loading="loading" @click="login">Start</v-btn>
            </v-card-actions>
          </v-card>
            </v-form>
        </v-layout>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">No Password???</h2>
        <v-layout justify-center>
          <v-card color="transparent" flat max-width="500">
            <p class="text-left">
              I don't believe in collecting and storing more information than is
              needed. That includes your passwords. People tend to reuse the
              same password for multiple sites and applications so the best way
              to prevent a data breach for us and for you is to just not require
              a password for a card game.
            </p>
            <p class="text-left">
                Don't worry. We still use SSL <v-icon small>mdi-lock</v-icon> security for all connections to our site.
            </p>
          </v-card>
        </v-layout>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import bus from '../scripts/eventBus'

const regex = new RegExp("^[a-zA-Z0-9''_']{3,15}$");

export default {
    name: "Get-Started",
    data: ()=>({
        valid: false,
        username: "",        
        loading: false,
        rules:{
            required: value => !!value || 'Required.',
            counter: value => value.length >= 3 && value.length <= 15 || 'Must be between 3-15 characters long.',
            content: value => regex.test(value) || 'Can only contain letters numbers and underscore.'
        }
    }),
    methods:{
        async checkSubmit(){
            if(this.valid) await this.login();
        },

        async login(){
            this.loading = true;
            try{
                var response = (await this.$axios.post('auth', {Username: this.username})).data;
                if(this.$mode == 'dev') console.log(response);
                this.$store.dispatch('doLogin', response);
                this.$router.push("/");
            }catch (error){                
                if(this.$mode == 'dev') console.error(error);
                bus.$emit("showNetworkDialog", true);
            }
            this.loading = false;
        }
    },
    mounted(){
        // No reason for the user to be here if they are already authenticated
        if(this.$store.state.token && this.$store.state.name && this.$store.state.id)
            this.$router.push("/");

        this.$refs.username.focus();
    }
}
</script>