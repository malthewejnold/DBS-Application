<template>
	<v-container>
		<v-flex>
			<v-form v-model="isFormValid">
				<v-card>
					<v-card-title tabindex="0">
						<h4>Vigtig information</h4>
					</v-card-title>
					<v-container>
						<v-row>
							<v-col>
								<v-text-field v-model="dog.dog_name" label="Hundenavn" required
									:rules="[rules.required]" />
							</v-col>
							<v-col>
								<v-text-field type="number" @wheel="$event.target.blur()" v-model="dog.dog_number"
									label="Hundenummer" required :rules="[rules.required]" readonly />
							</v-col>
							<v-col>
								<v-select v-model="dog.status" :items="status_list" label="Status" required
									:rules="[rules.required]"></v-select>
							</v-col>
							<v-col v-if="dog.status == 'Kasseret'">
								<v-select v-model="dog.removed_cause" :items="cause_list" label="Årsag" required
									:rules="[rules.required]"></v-select>
							</v-col>
						</v-row>
					</v-container>
				</v-card>
				<v-card>
					<v-card-title tabindex="0">
						<h4>Hundeinformation</h4>
					</v-card-title>
					<v-container>
						<v-row>
							<v-col>
								<v-text-field type="date" v-model="dog.born" label="Hundens fødselsdag" />
							</v-col>
							<v-col>
								<v-text-field type="number" @wheel="$event.target.blur()" :rules="[rules.chipnumber]"
									counter maxlength="15" v-model="dog.chip_no" label="Chipnummer" />
							</v-col>
							<v-col>
								<v-text-field v-model="dog.kennel_name" label="Kennel" />
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-select v-model="dog.race" :items="race_list" label="Race" required
									:rules="[rules.required]"></v-select>
							</v-col>
							<v-col>
								<v-select v-model="dog.gender" :items="gender_list" label="Køn" required
									:rules="[rules.required]"></v-select>
							</v-col>
							<v-col>
								<v-text-field v-model="dog.colour" label="Farve" />
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field v-model="dog.pedigree" label="Stamtavle" />
							</v-col>
							<v-col cols="8">
								<v-textarea v-model="dog.remark" label="Bemærkning" rows="1" auto-grow />
							</v-col>
						</v-row>
					</v-container>
				</v-card>
				<v-card v-if="dog.status == 'Kommende' || dog.status == 'Fodervært'">
					<v-card-title tabindex="0">
						<h4>Indkøbsinformation</h4>
					</v-card-title>
					<v-container>
						<v-row>
							<v-col>
								<v-text-field v-model="dog.buy_status" label="Købsstatus" />
							</v-col>
							<v-col>
								<v-text-field type="number" v-model="dog.buying_price" label="Indkøbspris" />
							</v-col>
							<v-col>
								<v-text-field type="date" v-model="dog.buying_date" label="Indkøbsdato" />
							</v-col>
							<v-col>
								<v-text-field type="date" v-model="dog.feedhost_pickup_date"
									label="Foderværts afhentningsdato" />
							</v-col>
						</v-row>
					</v-container>
				</v-card>
				<v-card v-if="dog.status != 'Kommende'">
					<v-card-title tabindex="0">
						<h4>Administrativ information</h4>
					</v-card-title>
					<v-container>
						<v-row>
							<v-col>
								<v-text-field v-model="dog.link_to_Archive" label="Link til arkiv" required
									:rules="[rules.required]" />
							</v-col>
							<v-col>
								<v-text-field v-model="dog.dkk_no" label="DKK-nummer" />
							</v-col>
							<v-col>
								<v-text-field type="number" @wheel="$event.target.blur()" v-model="dog.insurance"
									label="Forsikringsnummer" />
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field type="date" v-model="dog.training_start" label="Påbegyndt træningsdato" />
							</v-col>
							<v-col>
								<v-text-field type="date" v-model="dog.approval_date" label="Godkendelsesdato" />
							</v-col>
							<v-col>
								<v-text-field type="date" v-model="dog.owner_certificate" label="Ejercertifikat" />
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field v-model="dog.instructor" label="Instruktør" />
							</v-col>
							<v-col>
								<v-text-field v-model="dog.user" label="Borger"
									v-if="dog.status == 'Samtræning' || dog.status == 'Udplaceret'" />
								<v-select v-model="dog.feedhost" label="Fodervært" v-if="dog.status == 'Fodervært'"
									:items="feedhosts"
									:item-text="item => item.feedhost_name + ' - ' + item.feedhost_adress"
									item-value="id" @change="setFeedhost" />
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field type="date" v-model="dog.outplacement" label="Udplacering" />
							</v-col>
							<v-col>
								<v-text-field type="date" v-model="dog.follow_up" label="Opfølgning" />
							</v-col>
							<v-col>
								<v-text-field type="date" v-model="dog.grant_date" label="Godkendelsesdato" />
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-text-field type="date" v-model="dog.reg_attest" label="Registreringsattest" />
							</v-col>
							<v-col>
								<v-text-field type="date" v-model="dog.added_agria" label="Tilføjet til Agria" />
							</v-col>
							<v-col>
								<v-text-field type="date" v-model="dog.healtcard_send" label="Sundhedskort sendt" />
							</v-col>
						</v-row>
					</v-container>
				</v-card>
				<v-card v-if="dog.status != 'Kommende'">
					<v-card-title tabindex="0">
						<h4>Faktureringsinformation</h4>
					</v-card-title>
					<v-container>
						<v-row>
							<v-col v-if="dog.status == 'Fodervært'">
								<v-text-field @wheel="$event.target.blur()" v-model="dog.account_no"
									label="Reg. og kontonummer" />
							</v-col>
							<v-col>
								<v-text-field type="number" @wheel="$event.target.blur()" v-model="dog.invoice_price"
									label="Faktura pris" v-if="dog.status != 'Fodervært'" />
								<v-text-field type="number" @wheel="$event.target.blur()" v-model="feedhost_amount"
									label="Fodervært beløb" v-if="dog.status == 'Fodervært'" />
							</v-col>
							<v-col>
								<v-text-field v-model="dog.invoice_municipality" label="Afregn. Til kommunen"
									type="date" v-if="dog.status != 'Fodervært'" />
							</v-col>
							<v-col v-if="dog.status != 'Fodervært'">
								<v-select v-model="dog.municipality" :items="municipalities"
									:item-text="item => item.municipality" label="Kommune" @change="setEan"></v-select>
								<v-text-field v-model="municipality_ean" label="Kommune EAN" />
							</v-col>
						</v-row>
					</v-container>
				</v-card>
				<v-card v-if="dog.status == 'Kasseret' &&
				dog.status == 'Udgået' &&
				dog.status == 'Aflivet'">
					<v-card-title tabindex="0">
						<h4>Udgået information</h4>
					</v-card-title>
					<v-container>
						<v-row>
							<v-col>
								<v-text-field type="date" v-model="dog.removed_agria" label="Fjernet fra Agria" />
							</v-col>
							<v-col>
								<v-text-field type="date" v-model="dog.removed_DKK" label="Fjernet fra DKK" />
							</v-col>
							<v-col>
								<v-text-field type="date" v-model="dog.removed_dog_reg"
									label="Fjernet fra hunderegister" />
							</v-col>
						</v-row>
					</v-container>
				</v-card>
				<v-checkbox v-model="checkbox" label="Tilføj til Axapta?"></v-checkbox>
				<v-container>
					<v-row>
						<v-col>
							<v-btn class="mr-4 cyan" dark @click="create" :disabled="!isFormValid">Opret hund</v-btn>
							<v-btn class="mr-4 grey" dark v-if="!isFormValid">Du mangler at udfylde felter der ikke må
								være tomme</v-btn>
						</v-col>
						<v-col>
							<v-btn @click="cancel">Annuller</v-btn>
						</v-col>
					</v-row>
				</v-container>
				<v-dialog v-model="dialogCancel" max-width="500px">
					<v-card class="mb-0">
						<v-card-title class="text-h5 ml-10">
							Er du sikker på at du vil gå tilbage?
							<br />Indtastet data vil blive slettet
						</v-card-title>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="confirmCancel({ name: 'mainpage' })">Ja</v-btn>
							<v-btn color="blue darken-1" text @click="closeCancel">Nej</v-btn>
							<v-spacer></v-spacer>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-form>
		</v-flex>
	</v-container>
</template>

<script>
import DogsServices from "@/services/DogsServices";
import ListItems from "@/services/ListItems";
import FeedhostService from "@/services/FeedhostService";

export default {
	data() {
		return {
			checkbox: null,
			status_list: ListItems.status_list(),
			cause_list: ListItems.cause_list(),
			race_list: ListItems.race_list(),
			gender_list: ListItems.gender_list(),
			modal: false,
			dialogCancel: false,
			dog: {
				dog_number: null,
				dog_name: null,
				status: null,
				link_to_Archive: null,
				insurance: null,
				chip_no: null,
				dkk_no: null,
				born: null,
				kennel_name: null,
				gender: null,
				colour: null,
				race: null,
				buy_status: null,
				training_start: null,
				approval_date: null,
				initials: null,
				instructor: null,
				user: null,
				outplacement: null,
				follow_up: null,
				grant_date: null,
				invoice_price: null,
				invoice_municipality: null,
				owner_certificate: null,
				pedigree: null,
				reg_attest: null,
				added_agria: null,
				healtcard_send: null,
				removed_agria: null,
				removed_DKK: null,
				removed_dog_reg: null,
				account_no: null,
				removed_cause: null,
				remark: null,
				status_changes: null
			},
			rules: {
				required: (value) => !!value || "Dette felt må ikke være tomt",
				chipnumber: (value) =>
					value.length == 15 ||
					value.length == 0 ||
					"Dette felt skal være 15 cifre",
			},
			isFormValid: false,
			feedhosts: [],
			feedhostUpdate: {},
			feedhost_active: false
		};
	},
	async mounted() {
		//Generates the dog number based on the existing dog data
		try {
			const lastDogNo = (await DogsServices.getLast()).data.lastNo;
			this.dog.dog_number = lastDogNo;
		} catch (err) {
			alert(err.response.data.error);
		}
		//Get all feedhosts so they can be selected
		try {
			this.feedhosts = (await FeedhostService.getFeedhosts()).data;
		} catch (err) {
			alert(err.response.data.error);
		}
		//Get all the municipalities so they can be selected
		try {
			this.municipalities = (await DogsServices.getMunicipality()).data;
		} catch (err) {
			alert(err.response.data.error);
		}

		this.setFeedhost()
		this.setEan()
	},
	methods: {
		//Creates the dog in the database with all the inputted information
		async create() {
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0');
			var yyyy = today.getFullYear();
			today = dd + '-' + mm + '-' + yyyy;

			this.dog.status_changes = this.dog.status + " " + today;

			this.dog.initials = this.$store.state.user

			if(this.dog.feedhost != null){
				let index = this.feedhosts.findIndex(e => e.id === this.dog.feedhost);
				this.dog.feedhost_history = this.feedhosts[index].feedhost_name + "  " + today;
			}

			if (this.dog.status != "Kasseret") {
				this.dog.removed_cause = null;
			}

			//Sends the create request to the backend
			try {
				await DogsServices.create(this.dog);
			} catch (err) {
				alert(err.response.data.error)
			}

			//if the checkbox "Tilføj til axapta" is checked the dog is created in the axapta table
			if (this.checkbox != null) {
				try {
					await DogsServices.createAxapta(this.dog)
				} catch (err) {
					alert(err.response.data.error)
				}
			}
			if (this.dog.feedhost != null) {
				this.feedhostUpdate.dog_name = this.dog.dog_name
				this.feedhostUpdate.dog_no = this.dog.dog_number
				this.feedhostUpdate.price_amount = this.dog.feedhost_amount
				const account_no = this.dog.account_no.split(' ');
				this.feedhostUpdate.reg_no = account_no[0]
				this.feedhostUpdate.account_no = account_no[1]
				this.feedhostUpdate.id = this.dog.feedhost

				try {
					await FeedhostService.updateFeedhost(this.feedhostUpdate);
				} catch (err) {
					alert(err.response.data.error)
				}

			}
			this.$router.push({
				name: "mainpage",
			});
		},
		//Opens the cancel pop up
		cancel() {
			this.dialogCancel = true;
		},
		//Confirm the cancel pop up and route the user back
		confirmCancel(route) {
			this.$router.push(route);
		},
		//Option to close the cancel dialog
		closeCancel() {
			this.dialogCancel = false;
		},
		//Set the feedhost selected
		setFeedhost() {
			let index = this.feedhosts.findIndex(e => e.id === this.dog.feedhost);

			this.feedhost_amount = this.feedhosts[index].price_amount
			this.dog.account_no = this.feedhosts[index].reg_no + " " + this.feedhosts[index].account_no
		},
		//Set the EAN selected based on the municipality
		setEan() {
			let index = this.municipalities.findIndex(e => e.municipality === this.dog.municipality);

			this.municipality_ean = this.municipalities[index].EAN
		}
	},
};
</script>
<style scoped>
.v-card {
	margin-bottom: 32px;
}
</style>