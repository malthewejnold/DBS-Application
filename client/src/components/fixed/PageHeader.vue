<template>
	<v-app-bar app hide-on-scroll>
		<v-app-bar-title>
			<img
				src="@/assets/logo161102.gif"
				alt="Dansk Blinde Samfund Logo"
				style="width:auto;height:45px;cursor:pointer"
				@click="navigateTo({ name: 'mainpage' })"
			/>
		</v-app-bar-title>

		<v-spacer></v-spacer>

		<v-btn alt="Startside" class="mx-2" @click="navigateTo({ name: 'mainpage' })" :disabled="this.$route.name == 'mainpage'">Startside</v-btn>

		<v-btn alt="Ansøgere" class="mx-2" @click="navigateTo({ name: 'applicants-view' })" :disabled="this.$route.name == 'applicants-view'">Ansøgere</v-btn>

		<v-btn alt="Foderværter" class="mx-2" @click="navigateTo({ name: 'feedhosts-view' })" :disabled="this.$route.name == 'feedhosts-view'">Foderværter</v-btn>

		<v-btn alt="Find hunde til matchning" class="mx-2" @click="navigateTo({ name: 'find-one-dog' })" :disabled="this.$route.name == 'find-one-dog'">Find hunde til matching</v-btn>

		<v-btn alt="Statistik" class="mx-2" @click="navigateTo({ name: 'statistics' })" :disabled="this.$route.name == 'statistics'">Statistik</v-btn>

		<v-btn alt="Lønbilag" class="mx-2" @click="navigateTo({ name: 'form-navigator' })" :disabled="this.$route.name == 'form-navigator'">Lønbilag</v-btn>
	</v-app-bar>
</template>

<script>
export default {
	methods: {
		//Controls the navigation of the page header based on the component name that is parsed
		navigateTo(route) {
			this.$router.push(route)
		},
	}
}
</script>

<style scoped>
</style>