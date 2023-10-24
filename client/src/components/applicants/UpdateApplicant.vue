<template>
	<v-container>
		<v-card>
			<v-container>
				<v-row>
					<v-col>
						<v-text-field v-model="applicant.applicant_name" label="Ansøger navn" />
					</v-col>
					<v-col>
						<v-text-field v-model="applicant.applicant_phone" label="Telefon" />
					</v-col>
					<v-col>
						<v-text-field v-model="applicant.applicant_born" label="Født" />
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field v-model="applicant.status" label="Status" />
					</v-col>
					<v-col>
						<v-text-field v-model="applicant.link_to_Archive" label="Link til ansøgers mappe" />
					</v-col>
					<v-col>
						<v-text-field v-model="applicant.amount" label="Antal" />
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-textarea v-model="applicant.remark" label="Bemærkning" rows="1" auto-grow />
					</v-col>
					<v-col></v-col>
					<v-col></v-col>
				</v-row>
			</v-container>
		</v-card>
		<v-card>
			<v-container>
				<v-row>
					<v-col>
						<v-text-field v-model="applicant.help_scheme_sent" label="Hjælpemiddelskema sendt"
							type="date" />
					</v-col>
					<v-col>
						<v-text-field v-model="applicant.help_scheme_received" label="Hjælpemiddelskema modtaget"
							type="date" />
					</v-col>
					<v-col>
						<v-text-field v-model="applicant.application_sent" label="Ansøgning sendt" type="date" />
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field v-model="applicant.home_visit_ordered" label="Hjemmebesøg bestilt" type="date" />
					</v-col>
					<v-col>
						<v-text-field v-model="applicant.home_visit_ordered_by" label="Bestilt af" />
					</v-col>
					<v-col>
						<v-text-field v-model="applicant.home_visit_date" label="Hjemmebesøg dato" type="date" />
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field v-model="applicant.grant_received" label="Bevilling modtaget" type="date" />
					</v-col>
					<v-col>
						<v-text-field v-model="applicant.outplacement_date" label="Udplacerings dato" type="date" />
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field v-model="applicant.contract_sent_municipality" label="Kontrakt sendt til kommune"
							type="date" />
					</v-col>
					<v-col>
						<v-text-field v-model="applicant.contract_received_municipality" label="Kontrakt modtaget"
							type="date" />
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field v-model="applicant.dog_tag_ordered" label="Hundetegn bestilt" type="date" />
					</v-col>

					<v-col>
						<v-text-field v-model="applicant.cd_sent" label="CD sendt" type="date" />
					</v-col>
					<v-col>
						<v-text-field v-model="applicant.declaration_of_title_sent"
							label="Ejendomsforbeholdserklæring sendt" type="date" />
					</v-col>
					<v-col>
						<v-text-field v-model="applicant.declaration_of_title_received"
							label="Ejendomsforbeholdserklæring modtaget" type="date" />
					</v-col>
				</v-row>
			</v-container>
		</v-card>
		<v-row>
			<v-col>
				<v-btn class="purple lighten-3 mb-4 white--text" dark @click="updateApplicant">Opdater ansøger</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import ApplicantsService from "@/services/ApplicantsService";
export default {
	data() {
		return {
			applicant: {}
		}
	},
	methods: {
		//Updates the applicant in the database with all the inputted information
		async updateApplicant() {

			this.applicant.initials = this.$store.state.user

			try {
				await ApplicantsService.updateApplicant(this.applicant);
			} catch (err) {
				alert(err.response.data.error);
			}

			this.$router.push({
				name: "applicants-view",
			});
		}
	},
	async mounted() {
		//Read the data on the applicant based on the id
		try {
			const applicantId = this.$route.params.applicantid;
			this.applicant = (await ApplicantsService.getoneApplicant(applicantId)).data;
		} catch (err) {
			alert(err.response.data.error);
		}

	}
}
</script>
<style scoped>
.v-card {
	margin-bottom: 32px;
}
</style>