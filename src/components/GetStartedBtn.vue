<template>
  <div class="ml-2" v-if="$route.path != '/getstarted'">
    <v-btn
      color="primary darken-3"
      title="Get Started"
      to="/getstarted"      
      >Get Started</v-btn
    >
  </div>
</template>