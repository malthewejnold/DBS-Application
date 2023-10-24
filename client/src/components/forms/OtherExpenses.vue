<template>
	<forms-panel header="Vedr." title="56 Andre udgifter" @passData="updateHeader($event)" :guide="guide">
		<h1>Other Expenses</h1>
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
			this.guide = (await FormServices.getFormGuide('otherexpenses')).data
		} catch (err) {
			alert(err.response.data.error);
		}
		

	}
}
</script>
<style scoped>
</style>