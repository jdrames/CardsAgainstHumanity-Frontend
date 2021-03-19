<template>
	<div class="d-flex flex-wrap card-container">
		<v-card
			class="d-flex flex-column play-box"
			v-for="(cards, playerid) in Cards"
			:key="playerid"
		>
			<v-card-text class="d-flex flex-wrap card-container">
				<fmx-card
					v-for="card in cards"
					class="mb-2"
					:key="card.id"
					:card="card"
				></fmx-card>
			</v-card-text>
			<v-card-actions class="mx-2" v-if="CardZar == $store.state.id && GameStatus == 3">
				<v-spacer></v-spacer>
				<v-btn color="primary darken-2" @click="SelectWinner(playerid)">Select as Winner</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>
<script>
// Component used to display the cards that were played by users and awaiting cardZar selection

import VueBus from "../../scripts/eventBus";
import FmxCard from './Card.vue'

export default {
	name: "played-cards",
	props: ["Cards", "CardZar", "GameStatus"],
	components:{
		'fmx-card': FmxCard
	},
	methods: {
		SelectWinner(winnerId) {
			console.log(winnerId);
			VueBus.$emit("select_winner", winnerId);
		},
	},
};
</script>