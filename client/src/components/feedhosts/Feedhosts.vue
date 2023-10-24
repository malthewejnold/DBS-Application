<template>
	<v-container>
		<v-col class="text-left">
			<v-btn class="teal lighten-3 mb-4 white--text" @click="navigateTo({ name: 'feedhosts-create-view' })">
				Tilføj en fodervært
				<v-icon right dark>add</v-icon>
			</v-btn>
		</v-col>
		<input type="search" v-model="search" class="search_bar mb-2" placeholder="Søg efter ansøger..."
			aria-label="Søg i tabel" />
		<v-data-table :headers="headers" :items="feedhosts" :search="search" :disable-pagination="ifDisablePaging()"
			class="elevation-1" item-key="id">
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>
						<h4>Foderværter</h4>
					</v-toolbar-title>
					<v-divider class="mx-4" inset vertical></v-divider>
					<v-spacer></v-spacer>
				</v-toolbar>
			</template>
			<template v-slot:[`item.actions`]="{ item }">
				<v-icon medium class="ma-1" @click="editFeedhost('feedhosts-update-view', item)"
					aria-label="Foretag ændringer på ansøger" aria-hidden="false">edit</v-icon>
			</template>
			<template v-slot:[`item.status`]="{ item }">
				<span>
					<div v-if="item.status == 'Aktiv'" class="true status">{{ item.status }}</div>
					<div v-else class="false status">{{ item.status }}</div>
				</span>
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
import FeedhostService from "@/services/FeedhostService";
import AuthenticationService from "@/services/AuthenticationService";
export default {
	data() {
		return {
			search: "",
			feedhosts: [],
			headers: [
				{ text: "Foretag ændringer", value: "actions", width: "100px" },
				{ text: "Foderværts navn", value: "feedhost_name" },
				{ text: "Status", value: "status" },
				{ text: "Hundenummer", value: "dog_no" },
				{ text: "Hundenavn", value: "dog_name" },
				{ text: "Telefon", value: "feedhost_phone" },
				{ text: "Mail adresse", value: "feedhost_mail" },
				{ text: "Adresse", value: "feedhost_adress" },
				{ text: "Start", value: "start_date" },
				{ text: "Slut", value: "end_date" },
				{ text: "Senest ændret", value: "updatedAt" },
				{ text: "Ændret af", value: "initials" }
			],
			username: { name: this.$store.state.user },
			user: {}
		}
	},
	methods: {
		//Redirects the user to the edit feed host view with the specific id
		editFeedhost(route, feedhost) {
			this.$router.push({ name: route, params: { feedhostid: feedhost.id } });
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
		//Loads all the existing feedhosts
		try {
			this.feedhosts = (await FeedhostService.getFeedhosts()).data;
		} catch (err) {
			alert(err.response.data.error);
		}
		//Gets the current users credentials
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

.status {
	border-radius: 5px;
	text-align: center;
}

.true {
	background-color: #aefcc3;
}

.false {
	background-color: #ff6e6e;
}
</style>