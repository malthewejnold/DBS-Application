<template>
	<v-app v-if="isAuthenticated">
		<vue-announcer />
		<page-header />
		<v-main class="pt-2 pt-md-0">
			<v-container fluid>
				<router-view></router-view>
			</v-container>
		</v-main>
	</v-app>
</template>

<script src="/path/to/vuex.js"></script>
<script>
import PageHeader from '@/components/fixed/PageHeader.vue'

export default {
	name: 'App',
	components: {
		PageHeader
	},
	  created() {
    if (!this.$msal.isAuthenticated()) {
      this.$msal.signIn();
    } else{
		this.$store.dispatch('setUser', this.$msal.data.user.name)
	}
  },
	computed: {
    isAuthenticated() {
      const token = window.localStorage.getItem("msal.310549cf-ae4e-4d34-a15b-865c38b7d30f.idtoken")
	  if(token){
		  return true
	  }
    }
  },
}
</script>

<style>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
