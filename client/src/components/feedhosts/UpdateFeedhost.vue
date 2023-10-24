<template>
	<v-container>
		<v-card>
			<v-container>
				<v-row>
					<v-col>
						<v-text-field v-model="feedhost.feedhost_name" label="Fodervært navn" />
					</v-col>
					<v-col>
						<v-select v-model="feedhost.status" :items="status_list" label="Status" required
							:rules="[rules.required]"></v-select>
					</v-col>
					<v-col>
						<v-text-field v-model="feedhost.dog_no" label="Hundenummer (dette skal rettes på hunden)" type="number" readonly/>
					</v-col>
					<v-col>
						<v-text-field v-model="feedhost.dog_name" label="Hundenavn (dette skal rettes på hunden)" readonly/>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field v-model="feedhost.feedhost_phone" label="Telefon" />
					</v-col>
					<v-col>
						<v-text-field v-model="feedhost.feedhost_mail" label="Mail adresse" />
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field v-model="feedhost.feedhost_adress" label="Adresse (gadenavn og nummer)" />
					</v-col>
					<v-col>
						<v-text-field v-model="feedhost.zip_code" label="Postnummer" />
					</v-col>
					<v-col>
						<v-text-field v-model="feedhost.town" label="By" />
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field v-model="feedhost.start_date" label="Start dato" type="date" />
					</v-col>
					<v-col>
						<v-text-field v-model="feedhost.end_date" label="Slut dato" type="date" />
					</v-col>
				</v-row>
			</v-container>
		</v-card>
		<v-card disabled>
			<v-card-title tabindex="0">
				<h4>Hunde historik</h4>
			</v-card-title>
			<v-container>
				<v-row>
					<v-col>
						<div class="status_columns">
							<div v-for="status in dog_changes" :key="status" class="status_div" tabindex="0">
								{{ status }}</div>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
		<v-card>
			<v-container>
				<v-row>
					<v-col>
						<v-text-field v-model="feedhost.price_amount" label="Beløb" />
					</v-col>
					<v-col>
						<v-text-field v-model="feedhost.appendix_no" label="Bilagsnummer" />
					</v-col>
					<v-col>
						<v-select v-model="paymentPeriod" :items="paymentlist" label="Betalingsinterval"></v-select>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field v-model="feedhost.invoice_no" label="Kreditor nr." />
					</v-col>
					<v-col>
						<v-text-field v-model="feedhost.reg_no" label="Reg. nummer" />
					</v-col>
					<v-col>
						<v-text-field v-model="feedhost.account_no" label="Konto nummer" />
					</v-col>
				</v-row>
			</v-container>
		</v-card>
		<v-card>
			<v-container>
				<v-row>
					<v-col>
						<v-text-field v-model="feedhost.dog_tag" label="Hundetegn" type="date" />
					</v-col>
					<v-col>
						<v-text-field v-model="feedhost.feedhost_agreement" label="Foderværtsaftale" type="date" />
					</v-col>
					<v-col>
						<v-text-field v-model="feedhost.feedhost_guide" label="Foderværtsguide" type="date" />
					</v-col>
					<v-col>
						<v-text-field v-model="feedhost.driving_encounter" label="Kørsel træf" />
					</v-col>
				</v-row>
			</v-container>
		</v-card>
		<v-card>
			<v-container>
				<v-row>
					<v-col>
						<v-textarea v-model="feedhost.remark" label="Bemærkning" rows="1" auto-grow />
					</v-col>
				</v-row>
			</v-container>
		</v-card>
		<v-row>
			<v-col>
				<v-btn class="teal lighten-3 mb-4 white--text" dark @click="updateFeedhost">Opdater fodervært</v-btn>
			</v-col>
			<v-col>
				<v-btn @click="cancel">Annuller</v-btn>
			</v-col>
			<v-col>
				<v-btn class="red mb-4 white--text" dark @click="deleteFH">Slet fodervært</v-btn>
			</v-col>
		</v-row>
		<v-dialog v-model="dialogDelete" max-width="500px">
			<v-card>
				<v-card-title class="text-h5" tabindex="0">
					Er du sikker på at du permanent vil slette:
					<br />
					{{ feedhost.feedhost_name }}?
					<br />Det kan ikke gøres om
				</v-card-title>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="closeDelete">Afbryd</v-btn>
					<v-btn color="blue darken-1" text @click="deleteItemConfirm">Jeg er sikker</v-btn>
					<v-spacer></v-spacer>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="dialogCancel" max-width="500px">
			<v-card class="mb-0">
				<v-card-title class="text-h5 ml-10">
					Er du sikker på at du vil gå tilbage?
					<br />Indtastet data vil blive slettet
				</v-card-title>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="confirmCancel({ name: 'feedhosts-view' })">Ja</v-btn>
					<v-btn color="blue darken-1" text @click="closeCancel">Nej</v-btn>
					<v-spacer></v-spacer>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>
<script>
import FeedhostService from "../../services/FeedhostService";
import ListItems from "@/services/ListItems";

export default {
	data() {
		return {
			feedhost: {},
			paymentPeriod: null,
			paymentlist: ListItems.paymentList(),
			dialogDelete: false,
			status_list: ListItems.feedhostStatus(),
			rules: {
				required: (value) => !!value || "Dette felt må ikke være tomt"
			},
			dialogCancel: false,
			dog_changes: [],
		}
	},
	methods: {
		//Updates the feed host
		async updateFeedhost() {
			if (this.paymentPeriod == 'Månedligt') {
				this.feedhost.monthly = 'x'
				this.feedhost.quarterly = ''
				this.feedhost.yearly = ''
			} else if (this.paymentPeriod == 'Kvartal') {
				this.feedhost.monthly = ''
				this.feedhost.quarterly = 'x'
				this.feedhost.yearly = ''
			} else if (this.paymentPeriod == 'Årligt') {
				this.feedhost.monthly = ''
				this.feedhost.quarterly = ''
				this.feedhost.yearly = 'x'
			}

			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0');
			var yyyy = today.getFullYear();
			today = dd + '-' + mm + '-' + yyyy;

			if (this.feedhost.dog_history === null) {
				this.feedhost.dog_history = this.feedhost.dog_no + " " + today;
			} else {
				const dogArr = this.feedhost.dog_history.split(",");
				const lastDog = dogArr[dogArr.length - 1].split(" ")[0];
				if (lastDog != this.feedhost.dog_no) {
					this.feedhost.dog_history = this.feedhost.dog_history + "," + this.feedhost.dog_no + " " + today;
				}
			}

			this.feedhost.initials = this.$store.state.user

			try {
				await FeedhostService.updateFeedhost(this.feedhost);
			} catch (err) {
				alert(err.response.data.error);
			}

			this.$router.push({
				name: "feedhosts-view",
			});
		},
		//Opens delete dialog
		deleteFH() {
			this.dialogDelete = true;
		},
		//If deletion is accepted the feed host is deleted in the database
		async deleteItemConfirm() {
			let res = null;
			try {
				res = await FeedhostService.delete(this.feedhost.id)
			} catch (err) {
				alert(err.response.data.error);
			}
			if (res.status == 200) {
				this.$router.push({
					name: "feedhosts-view",
				});
			}
		},
		//Closes the delete dialog
		closeDelete() {
			this.dialogDelete = false;
		},
		//Option to cancel the update dialog opens
		cancel() {
			this.dialogCancel = true;
		},
		//When the cancel dialog is confirmed the user is redirected back
		confirmCancel(route) {
			this.$router.push(route);
		},
		//Option to close the cancel dialog
		closeCancel() {
			this.dialogCancel = false;
		},
	},
	//Reads the feed host based on id parsed as a parameter
	async mounted() {
		const feedhostId = this.$route.params.feedhostid;
		try {
			this.feedhost = (await FeedhostService.getoneFeedhost(feedhostId)).data;
		} catch (err) {
			alert(err.response.data.error);
		}

		this.dog_changes = this.feedhost.dog_history.split(",");


		if (this.feedhost.monthly == 'x') {
			this.paymentPeriod = 'Månedligt'
		} else if (this.feedhost.quarterly == 'x') {
			this.paymentPeriod = 'Kvartal'
		} else if (this.feedhost.yearly == 'x') {
			this.paymentPeriod = 'Årligt'
		}
	}
}
</script>
<style scoped>
.v-card {
	margin-bottom: 32px;
}
.status_columns {
	column-count: 5;
	width: 100%;
}

.status_div {
	background-color: #f5f5f5;
	border-radius: 5px;
	text-align: center;
	width: 80%;
	margin: auto;
}
</style>