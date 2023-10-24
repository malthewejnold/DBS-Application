<template>
	<forms-panel header="Bruger" title="55 Hunde replaceret" @passData="updateHeader($event)" :guide="guide">
		<h1>Replacement</h1>
	</forms-panel>
</template>

<script>
import FormsPanel from '@/components/fixed/forms/FormsPanel'
import FormServices from '../../services/FormServices'
export default {
	data() {
		return {
			headercomponent: null,
			guide: null
		}
	},
	components: {
		FormsPanel
	},
	methods: {
		updateHeader(headerdata) {
			console.log("hey")
			this.headercomponent = headerdata
		}
	},
	async mounted() {

		try {
			this.guide = (await FormServices.getFormGuide('replacement')).data
		} catch (err) {
			alert(err.response.data.error);
		}
		
	}
}
</script>
<style scoped>
</style>