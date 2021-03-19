<template>
	<v-card
		height="225"
		width="175"
		class="d-inline-flex"
		min-width="175"		
		:color="card.type == 0 ? 'black' : 'white'"
	>
		<v-card-text :class="card.type == 0 ? 'white--text' : 'black--text'">
			{{ card.text }}
		</v-card-text>
		<v-card-actions class="card-actions" v-if="card.type == 0">
			<v-spacer></v-spacer>
			Pick
			<v-avatar size="1.5em" color="white" class="black--text ml-2">{{
				card.pick_amount
			}}</v-avatar>
		</v-card-actions>
	</v-card>
</template>
<script>
export default {
	name: "Card",
	props: ["card"],
};
</script>