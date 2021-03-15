<template>
  <div class="ml-2">
    <v-btn
      color="green darken-3"
      title="Host A New Game"
      @click="showHostDialog"
      >Host Game</v-btn
    >    
  </div>
</template>
<script>
import bus from '../scripts/eventBus'
export default {
  data: () => ({
   //
  }),
  mounted() {
   //
  },
  methods:{
      showHostDialog(){
          bus.$emit('showHostDialog', true)
      }
  }
};
</script>