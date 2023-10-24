<template>
	<v-layout column class="pa-16">
		<v-flex>
			<h1>Login</h1>
			<v-text-field name="E-mail" label="Email" v-model="email"></v-text-field>
			<br />
			<v-text-field name="Adgangskode" label="Password" type="password" v-model="password"></v-text-field>
			<br />
			<v-btn dark name="Log ind" class="cyan" @click="login">Login</v-btn>
			<br />
			<br />
			<v-container class="danger-alert">
				<p v-html="error" class="red--text" tabindex="0" />
			</v-container>
		</v-flex>
	</v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
	data() {
		return {
			email: '',
			password: '',
			error: null
		}
	},
	methods: {
		async login() {
			try {
				const response = await AuthenticationService.login({
					email: this.email,
					password: this.password
				})
				this.$store.dispatch('setToken', response.data.token)
				this.$store.dispatch('setUser', response.data.user)

				window.localStorage.setItem('sessionToken', response.data.token)

				this.$router.push({
					name: 'mainpage'
				})

			} catch (error) {
				console.log(error)
				this.error = error.response.data.error
				console.log(this.error)
			}
		}
	}
}
</script>

<style scoped>
.flex {
	width: 50%;
	margin: auto;
}
</style>
