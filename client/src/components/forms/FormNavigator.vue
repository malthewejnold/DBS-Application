<template>
	<v-container>
		<forms-panel
			v-if="this.$route.name == 'form-navigator'"
			title="Vælg hvilken lønform du vil oprette"
			header="Blank"
		>
			<v-btn
				color="primary"
				class="ma-4 white--text"
				@click="navigateTo({ name: 'form-feedhost' })"
				x-large
			>Hunde i fodervært</v-btn>
			<v-btn
				color="primary"
				class="ma-4 white--text"
				@click="navigateTo({ name: 'form-test' })"
				x-large
			>Hunde i test</v-btn>
			<v-btn
				color="primary"
				class="ma-4 white--text"
				@click="navigateTo({ name: 'form-training' })"
				x-large
			>Hunde i træning</v-btn>
			<v-btn
				color="primary"
				class="ma-4 white--text"
				@click="navigateTo({ name: 'form-jointtraining' })"
				x-large
			>Hunde i samtræning</v-btn>
			<v-btn
				color="primary"
				class="ma-4 white--text"
				@click="navigateTo({ name: 'form-outplacement' })"
				x-large
			>Hunde udplaceret</v-btn>
			<v-btn
				color="primary"
				class="ma-4 white--text"
				@click="navigateTo({ name: 'form-replacement' })"
				x-large
			>Hunde replaceret</v-btn>
			<v-btn
				color="primary"
				class="ma-4 white--text"
				@click="navigateTo({ name: 'form-otherexpenses' })"
				x-large
			>Andre udgifter</v-btn>
		</forms-panel>

		<router-view></router-view>
	</v-container>
</template>

<script>

import FormsPanel from '@/components/fixed/forms/FormsPanel'


export default {
	data() {
		return {
			router: this.$router
		}
	},
	methods: {
		navigateTo(route) {
			this.$router.push(route)
		}
	},
	components: {
		FormsPanel
	}
}
</script>
<style scoped>
</style>