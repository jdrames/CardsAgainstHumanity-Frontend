<template>
	<div class="d-flex flex-wrap card-container">
		<v-card class="d-flex flex-column play-box">
			<v-card-text class="d-flex card-container">
				<fmx-card
					v-for="(card, index) in Cards"
					:key="card.id"
					:card="card"
					@click.native="ReturnCardToPlayerHand(index)"
				></fmx-card>
			</v-card-text>
			<v-card-actions class="mx-2" v-if="GameStatus == 2">
				<v-spacer></v-spacer>
				<v-btn
					:disabled="Object.keys(Cards).length != PickAmount"
					color="primary darken-2"
					@click="SubmitCards()"
				>
					Submit Cards
				</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>
<script>
// Component used to display the cards that the player has submitted so far

import VueBus from "../../scripts/eventBus";
import FmxCard from "./Card.vue";

export default {
	name: "player-card",
	props: ["Cards", "GameStatus", "PickAmount"],
	components: {
		"fmx-card": FmxCard,
	},
	methods: {
		SubmitCards() {			
			VueBus.$emit("submit_cards");
		},
		ReturnCardToPlayerHand(card_index) {
			if (this.GameStatus != 2) return;
			VueBus.$emit("return_card_to_hand", card_index);
		},
	},
};
</script>