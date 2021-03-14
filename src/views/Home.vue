<template>
  <v-container>
    <v-row class="text-center">
      <!-- 
        <v-col cols="12">
        <h1 class="display-1 font-weight-bold mb-3">
          Force<span class="red--text text--darken-4">MX</span> Presents
        </h1>
      </v-col>
      -->

      <v-col class="mb-2">
        <h1 class="display-2 font-weight-bold">
          Cards Against Humanity<small>&trade;</small> Online
        </h1>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">A What Now?!</h2>
        <v-layout justify-center>
          <v-card max-width="500" color="transparent" flat>
            <p>Your favorite terrible card game... moved online</p>
            <p class="text-left">
              Made with
              <v-icon small color="red" title="love">mdi-heart</v-icon> for
              friends and family during the Covid 19 pandemic. Please support
              the original creators of Cards Against Humanity&trade; by visiting
              their
              <v-btn
                color="primary darken-4"
                href="https://www.cardsagainsthumanity.com"
                x-small
                link
                title="https://www.cardsagainsthumanity.com"
                target="_blank"
                >site</v-btn
              >
              and purchasing a game pack from them. One day we'll all get
              together and play games in person again so get those sets ready!
            </p>
          </v-card>
        </v-layout>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Get Started</h2>
        <v-layout justify-center>
          <v-card max-width="500" color="transparent" flat>            
                Gather up your friends online and start up a game. Have your
                friends join the game and let the good times roll.            
            <v-card-actions class="justify-center">
              <GetStartedBtn v-if="!$store.state.token" />
              <HostGameBtn v-if="$store.state.token" />
              <JoinGameBtn v-if="$store.state.token" />                            
            </v-card-actions>
          </v-card>
        </v-layout>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Suggested Links</h2>
        <v-layout justify="center">
          <v-col cols="12">
            <v-btn
              target="_blank"
              title="CardsAgainstHumanity.com"
              class="my-2"
              href="https://www.cardsagainsthumanity.com"
            >
              <v-icon class="mr-2">mdi-cards</v-icon>
              Cards Against Humanity
            </v-btn>
            <br />
            <v-btn
              target="_blank"
              title="Discord.com"
              class="mb-2"
              href="https://www.discord.com"
            >
              <v-icon class="mr-2">mdi-discord</v-icon>
              Discord
            </v-btn>
            <br />
            <v-btn
              target="_blank"
              title="Zoom.us"
              class="mb-2"
              href="https://zoom.us"
            >
              <v-icon class="mr-2">mdi-message-video</v-icon>
              Zoom
            </v-btn>
            <br />
          </v-col>
        </v-layout>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Disclaimer</h2>
        <v-layout justify-center>
          <i>
            This site is not associated with, endorsed, or sponsored by the
            makers of Cards Against Humanity.<br />
            Their cards are used under the Creative Commons License. This
            site/service is provided free of charge.</i
          >
        </v-layout>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import GetStartedBtn from '@/components/GetStartedBtn.vue'
import HostGameBtn from '@/components/HostGameBtn.vue'
import JoinGameBtn from '@/components/JoinGameBtn.vue'

export default {
  name: "Home",
  components: {
    GetStartedBtn,
    HostGameBtn,
    JoinGameBtn
  },
};
</script>
