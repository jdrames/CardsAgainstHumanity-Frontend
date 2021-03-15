<template>
  <v-dialog v-model="showHostDialog" max-width="500" persistent>
    <v-card light>
      <v-card-title class="headline">
        <v-icon large class="mr-2">mdi-cards</v-icon> Host Game
      </v-card-title>
      <v-card-text>
        Ready to host a game huh? GREAT!<br />
        Select any additional sets you want to use. The cards from the base game
        are always included.

        <v-row class="mt-3">
          <v-col cols="12">
            <h3 class="headline">Most Used Packs</h3>
          </v-col>
          <v-col cols="12" sm="6" class="my-0 py-0">
            <v-checkbox
              v-for="favs in packOptions.favorites.col1"
              :key="favs.value"
              :value="favs.value"
              :label="favs.name"
              v-model="selectedPacks"
              dense
              class="my-0 py-0"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" sm="6" class="my-0 py-0">
            <v-checkbox
              v-for="favs in packOptions.favorites.col2"
              :key="favs.value"
              :value="favs.value"
              :label="favs.name"
              v-model="selectedPacks"
              dense
              class="my-0 py-0"
            ></v-checkbox>
          </v-col>

          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>More Packs</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="12" sm="6" class="my-0 py-0">
                    <v-checkbox
                      v-for="favs in packOptions.remaining.col1"
                      :key="favs.value"
                      :value="favs.value"
                      :label="favs.name"
                      v-model="selectedPacks"
                      dense
                      class="my-0 py-0"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="6" class="my-0 py-0">
                    <v-checkbox
                      v-for="favs in packOptions.remaining.col2"
                      :key="favs.value"
                      :value="favs.value"
                      :label="favs.name"
                      v-model="selectedPacks"
                      dense
                      class="my-0 py-0"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
        <v-row class="mt-3"> </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="warning" @click="showHostDialog = false">Close</v-btn>
        <v-btn color="primary darken-2">Create Game</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import bus from "../scripts/eventBus";
import Packs from "../assets/cardpacks.js";

export default {
  data: () => ({
    packOptions: {
      favorites: { col1: [], col2: [] },
      remaining: { col1: [], col2: [] },
    },
    showHostDialog: false,
    selectedPacks: [0],
  }),
  mounted() {
    // listen for show dialog event
    bus.$on("showHostDialog", (value) => {
      this.showHostDialog = value;
    });
    // divide packs up into 2 columns
    Packs.filter((pack) => {
      return pack.favorite;
    }).reduce((prev, cur, index) => {
      if (prev) this.packOptions.favorites.col1.push(prev);
      if (index % 2 != 0) this.packOptions.favorites.col2.push(cur);
      else this.packOptions.favorites.col1.push(cur);
    });

    Packs.filter((pack) => {
      return !pack.favorite;
    }).reduce((prev, cur, index) => {
      if (prev) this.packOptions.remaining.col1.push(prev);
      if (index % 2 != 0) this.packOptions.remaining.col2.push(cur);
      else this.packOptions.remaining.col1.push(cur);
    });
  },
};
</script>