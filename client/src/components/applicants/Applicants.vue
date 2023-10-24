<template>
	<v-container>
		<v-col class="text-left">
			<v-btn class="purple lighten-3 mb-4 white--text" @click="navigateTo({ name: 'applicants-create-view' })">
				Tilføj en ansøger
				<v-icon right dark>add</v-icon>
			</v-btn>
		</v-col>
		<input type="search" v-model="search" class="search_bar mb-2" placeholder="Søg efter ansøger..."
			aria-label="Søg i tabel" />
		<v-data-table :headers="headers" :items="applicants" :search="search" :disable-pagination="ifDisablePaging()"
			class="elevation-1" item-key="id">
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>
						<h4>Ansøgere</h4>
					</v-toolbar-title>
					<v-divider class="mx-4" inset vertical></v-divider>
					<v-spacer></v-spacer>
				</v-toolbar>
			</template>
			<template v-slot:[`item.actions`]="{ item }">
				<v-icon medium class="ma-1" @click="editApplicant('applicants-update-view', item)"
					aria-label="Foretag ændringer på ansøger" aria-hidden="false">edit</v-icon>
			</template>
			<template v-slot:[`item.updatedAt`]="{ item }">
				<span>
					{{
						new Date(item.updatedAt).toLocaleDateString("da-DK")
					}}
				</span>
			</template>
		</v-data-table>
	</v-container>
</template>

<script>
import ApplicantsService from "@/services/ApplicantsService";
import AuthenticationService from "@/services/AuthenticationService";
export default {
	data() {
		return {
			search: "",
			applicants: [],
			headers: [
				{ text: "Foretag ændringer", value: "actions", width: "100px" },
				{ text: "Ansøger navn", value: "applicant_name" },
				{ text: "Født", value: "applicant_born" },
				{ text: "Status", value: "status" },
				{ text: "Telefon", value: "applicant_phone" },
				{ text: "Link til ansøgers mappe", value: "link_to_Archive" },
				{ text: "Antal?", value: "amount" },
				{ text: "Senest ændret", value: "updatedAt" },
				{ text: "Ændret af", value: "initials" }
			],
			username: { name: this.$store.state.user },
			user: {}
		}
	},
	methods: {
		//Redirects the user to the edit applicant view with the specific id
		editApplicant(route, applicant) {
			this.$router.push({ name: route, params: { applicantid: applicant.id } });
		},
		//Controls navigation and redirects the user based on the component name parsed
		navigateTo(route) {
			this.$router.push(route);
		},
		//Determines if all rows should be shown. Only visually impaired users will have all rows shown as they search via screen reader
		ifDisablePaging() {
			if (this.user.type == "VI") {
				return true;
			} else {
				return false;
			}
		},
	},
	async mounted() {
		//Reads the applications in the database
		try {
			this.applicants = (await ApplicantsService.getApplicants()).data;
		} catch (err) {
			alert(err.response.data.error);
		}
		//Fetches the user credentials
		try {
			this.user = (await AuthenticationService.getuser(this.username)).data;
		} catch (err) {
			alert(err.response.data.error);
		}
	}
}
</script>
<style scoped>
td {
	text-align: left;
}

.search_bar {
	font: 16px system-ui;
	height: 100%;
	width: 100%;
	padding: 10px 20px;
	border: solid 3px #808080;
	border-radius: 10px;
}

::placeholder {
	color: #808080;
	font-size: 18px;
	font-weight: 500;
}
</style>