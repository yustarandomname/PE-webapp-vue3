<template>
	<Modal style="--width:40rem" v-if="openedCard" @close="closeCard">
		<h1>{{openedCard.header}}</h1>
		<p>{{openedCard.content}}</p>
	</Modal>
</template>

<script lang="ts">
	import { defineComponent} from "vue"

	export default defineComponent({
		name: "BlogOpen",
		props: {
			openedCard: {
				type: Object,
				required: false,
				default: null
			}
		},
		setup(props, {emit}) {
			const closeCard = () => emit("closeCard")
			

			return {closeCard}
		}
	})
</script>