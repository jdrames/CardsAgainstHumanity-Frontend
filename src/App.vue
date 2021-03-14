<template>
  <v-app>
    <v-app-bar
      app      
      dark
    >
      <div class="d-flex align-center">
        <h2 class="mr-4">Force<span class="red--text text--darken-3 ">MX</span></h2>
        <div class="d-flex-inline hidden-sm-and-down text-right">
          <i><small><q>Some sort of experience</q></small></i>
          <br />
          - Grumpy Old Man
        </div>
      </div>

      <v-spacer></v-spacer>
      
      <span v-if="$store.state.name" class="hidden-xs-only">{{$store.state.name}}</span>
      <v-btn color="primary darken-3" class="ml-2" title="Get Started" v-if="!$store.state.token">Get Started</v-btn>
      <v-btn color="green darken-3" class="ml-2" title="Host A New Game" v-if="$store.state.token">Host Game</v-btn> 
      <v-btn color="primary darken-3" class="ml-2" title="Join A Game" v-if="$store.state.token">Join Game</v-btn>
      <v-btn icon class="ml-2" title="Logout" @click="signOut" v-if="$store.state.token"><v-icon color="red">mdi-logout</v-icon></v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
    //
  },

  data: () => ({
    //
  }),
  methods:{
    signOut(){
      this.$store.dispatch('doLogout');
    }
  }
};
</script>
