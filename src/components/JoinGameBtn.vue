<template>
  <div class="ml-2" v-if="$route.path != '/games'">
    <v-btn
      color="primary darken-3"
      title="Join A Game"
      @click="showJoinDialog"      
      >Join Game</v-btn
    >    
  </div>
</template>
<script>
import bus from '../scripts/eventBus'

export default {
  data: () => ({
    //
  }),
  methods: {
    showJoinDialog() {
      bus.$emit('showJoinDialog', true);
    },
  }
};
</script>