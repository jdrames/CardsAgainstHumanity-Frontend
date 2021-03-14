<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-2">
        <h1 class="display-2 font-weight-bold">Getting Started</h1>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Easy As One and Done</h2>
        <v-layout justify-center>
          <v-card max-width="500" color="transparent" flat>
            <p>Just enter a username to get started.</p>
          </v-card>
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