<template>
  <div>route: {{card?.content}} {{cardId}}</div>
</template>

<script lang="ts">
import { getRandomParagraph } from "./../../util/getRandomParagraph";
import { defineComponent } from "vue";

export default defineComponent({
	name: "cards",
	data() {
		return {
			cardId: this.$route.query.id, 
			card: this.getCard(this.$route.query.id)
		}
	},
	methods: {
		getCard(id: string) {
			const res = {
				id,
				title: "Card Title",
				content: getRandomParagraph(id)
			}

			console.log(res)

			return res
		}
	}
})
</script>
