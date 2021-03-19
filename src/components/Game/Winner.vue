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
		</v-card>
	</div>
</template>
<script>
// Component used to display the winning cards
import FmxCard from './Card.vue'

export default {
	name: "winning-cards",
	props: ["Cards"],
	components:{
		'fmx-card': FmxCard
	},
};
</script>