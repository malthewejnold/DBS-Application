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
						<v-text-field v-model="feedhost.dog_no" label="Hundenummer (dette vælges på hunden)" type="number" disabled/>
					</v-col>
					<v-col>
						<v-text-field v-model="feedhost.dog_name" label="Hundenavn (dette vælges på hunden)" disabled/>
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
				<v-btn class="purple lighten-3 mb-4 white--text" dark @click="createFeedhost">Opret fodervært</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import FeedhostService from '../../services/FeedhostService';
import ListItems from "@/services/ListItems";
export default {
	data() {
		return {
			feedhost: {},
			paymentPeriod: null,
			paymentlist: ['Månedligt', 'Kvartal', 'Årligt'],
			status_list: ListItems.feedhostStatus(),
			rules: {
				required: (value) => !!value || "Dette felt må ikke være tomt"
			},
		}
	},
	methods: {
		//Creates the feedhost in the database
		async createFeedhost() {
			if (this.paymentPeriod == 'Månedligt') {
				this.feedhost.monthly = 'x'
			} else if (this.paymentPeriod == 'Kvartal') {
				this.feedhost.quarterly = 'x'
			} else if (this.paymentPeriod == 'Årligt') {
				this.feedhost.yearly = 'x'
			}

			this.feedhost.initials = this.$store.state.user

			if (this.feedhost.dog_no != null) {
				var today = new Date();
				var dd = String(today.getDate()).padStart(2, '0');
				var mm = String(today.getMonth() + 1).padStart(2, '0');
				var yyyy = today.getFullYear();
				today = dd + '-' + mm + '-' + yyyy;

				this.feedhost.dog_history = this.feedhost.dog_no + " " + today;
			}

			try {
				await FeedhostService.createFeedhost(this.feedhost);
			} catch (err) {
				alert(err.response.data.error);
			}

			this.$router.push({
				name: "feedhosts-view",
			});
		}
	}
}
</script>
<style scoped>
.v-card {
	margin-bottom: 32px;
}
</style>