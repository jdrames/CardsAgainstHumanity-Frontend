<template>
    <div class="ml-2">
    <v-btn color="primary darken-3" title="Get Started" to="/getstarted" v-if="$route.path != '/getstarted'">Get Started</v-btn>
    <v-btn color="primary darken-3" title="Return Home" to="/" v-if="$route.path == '/getstarted'">Return Home</v-btn>
    </div>
</template>