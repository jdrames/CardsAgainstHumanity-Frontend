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
      <GetStartedBtn v-if="!$store.state.token" />
      <HostGameBtn v-if="$store.state.token" />
      <JoinGameBtn v-if="$store.state.token" />
      <v-btn icon class="ml-2" title="Logout" @click="signOut" v-if="$store.state.token"><v-icon color="red">mdi-logout</v-icon></v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
      <JoinGameDialog />
      <HostGameDialog />
      <NetworkErrorDialog />
    </v-main>
  </v-app>
</template>

<script>
import GetStartedBtn from '@/components/GetStartedBtn.vue'
import HostGameBtn from '@/components/HostGameBtn.vue'
import JoinGameBtn from '@/components/JoinGameBtn.vue'
import JoinGameDialog from '@/components/JoinGameDialog.vue'
import HostGameDialog from '@/components/HostGameDialog.vue'
import NetworkErrorDialog from '@/components/NetworkErrorDialog.vue'

export default {
  name: 'App',
  components: {
    GetStartedBtn,
    HostGameBtn,
    JoinGameBtn,
    JoinGameDialog,
    HostGameDialog,
    NetworkErrorDialog
  },

  data: () => ({
    //
  }),
  methods:{
    signOut(){
      this.$store.dispatch('doLogout');
      // route back to the homepage if they aren't already on it.      
      if(this.$route.path != '/') this.$router.push('/');
    }
  }
};
</script>
