<template>
  <div class="ml-2" v-if="$route.path != '/'">
    <v-btn
      color="primary darken-3"
      title="Return Home"
      to="/"      
      >Return Home</v-btn
    >
  </div>
</template>