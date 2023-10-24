<template>
	<v-container fluid class="pl-16 pr-16">
		<v-flex>
			<v-col class="text-left">
				<v-btn color="primary" class="mb-4 white--text" @click="navigateTo({ name: 'createDog' })">
					Tilføj en ny hund
					<v-icon right dark>add</v-icon>
				</v-btn>
			</v-col>
			<input type="search" v-model="search" class="search_bar mb-2" placeholder="Søg i tabel..."
				aria-label="Søg i tabel" />
			<v-card>
				<v-data-table v-model="selected" :headers="headers" :items="dogs" :search="search"
					:disable-pagination="ifDisablePaging()" class="elevation-1" item-key="dog_number" show-select>
					<template v-slot:top>
						<v-toolbar flat>
							<v-toolbar-title><h3>Statusark</h3></v-toolbar-title>
							<v-divider class="mx-4" inset vertical></v-divider>
							<v-spacer></v-spacer>
							<v-dialog v-model="dialog" max-width="75%">
								<v-card>
									<v-card-title>
										<span class="text-h8">{{ formTitle }}</span>
									</v-card-title>
									<v-card-text>
										<v-container>
											<v-row>
												<v-col cols="12" sm="6" md="4">
													<v-text-field v-model="editedItem.dog_name" label="Hundenavn">
													</v-text-field>
												</v-col>
												<v-col cols="12" sm="6" md="4">
													<v-select v-model="editedItem.status" :items="status_list"
														label="Status" required></v-select>
												</v-col>
												<v-col cols="12" sm="6" md="4" v-if="editedItem.status == 'Kasseret'">
													<v-select v-model="editedItem.removed_cause" :items="cause_list"
														label="Kasseret årsag" required></v-select>
												</v-col>
												<v-col cols="8">
													<v-textarea v-model="editedItem.remark" label="Bemærkning" rows="1"
														auto-grow />
												</v-col>
											</v-row>
										</v-container>
									</v-card-text>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn color="blue darken-1" text @click="close">Afbryd</v-btn>
										<v-btn color="blue darken-1" text @click="updateStatus">
											{{
												formSave
											}}
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</v-toolbar>
					</template>
					<template v-slot:[`item.update_dog`]="{ item }">
						<v-icon medium class="ma-1" @click="seeDog('updateDog', item)"
							aria-label="Se hundedetaljer og ret" aria-hidden="false">fact_check</v-icon>
					</template>
					<template v-slot:[`item.status_dog`]="{ item }">
						<v-icon medium class="ma-1" @click="editItem(item)" aria-label="Ændrer hundenavn og status"
							aria-hidden="false">edit</v-icon>
					</template>
					<template v-slot:[`item.updatedAt`]="{ item }">
						<span>
							{{
								new Date(item.updatedAt).toLocaleDateString("da-DK")
							}}
						</span>
					</template>
					<template v-slot:[`item.born`]="{ item }">
						<span v-if="item.born != null">{{ new Date(item.born).toLocaleDateString("da-DK") }}</span>
					</template>
					<template v-slot:[`item.approval_date`]="{ item }">
						<span v-if="item.approval_date != null">{{
							new
								Date(item.approval_date).toLocaleDateString("da-DK")
						}}</span>
					</template>
					<template v-slot:[`item.ax_dog_no`]="{ item }">
						<div v-if="item.ax_dog_no == item.dog_number" class="true axapta">Oprettet</div>
						<div v-else class="false axapta">Ikke oprettet</div>
					</template>
					<template v-slot:[`item.ax_dog_name`]="{ item }">
						<div v-if="item.ax_dog_name == item.dog_name" class="true axapta">Navn passer</div>
						<div v-else class="false axapta">Navn passer ikke</div>
					</template>
					<template v-slot:[`item.link_to_Archive`]="{ item }">
						<a target="_blank" :href="`${item.link_to_Archive}`" tabindex="-1"
							style="text-decoration: none;">
							<v-btn tabindex="-1" style="padding: 0; font-size:.875rem;" class="text-none">Link til
								arkiv: {{ item.dog_number }}</v-btn>
						</a>
					</template>
				</v-data-table>
			</v-card>
			<v-checkbox v-model="showremoved" @change="removedRequest" label="Vis ikke aflivet, udgået og kasserede"></v-checkbox>
		</v-flex>
		<v-flex class="mt-8" v-if="selected.length">
			<v-btn @click="create_axapta">Træk ud til axapta</v-btn>
		</v-flex>
	</v-container>
</template>

<script>
import DogsServices from "@/services/DogsServices";
import AuthenticationService from "@/services/AuthenticationService";
import FeedhostService from "@/services/FeedhostService";
import ListItems from "@/services/ListItems";
import * as XLSX from 'xlsx/xlsx.mjs';
import { saveAs } from 'file-saver';

export default {
	data() {
		return {
			showremoved: false,
			dialog: false,
			dialogDelete: false,
			singleSelect: false,
			cause_list: ListItems.cause_list(),
			selected: [],
			search: "",
			status_list: ListItems.status_list(),
			headers: [
				{ text: "Hundedetaljer", value: "update_dog", width: "100px" },
				{ text: "Ret status og navn", value: "status_dog", width: "100px" },
				{ text: "Hundenummer", value: "dog_number" },
				{ text: "Hundenavn", value: "dog_name" },
				{ text: "Status", value: "status" },
				{ text: "Dokument Arkiv", value: "link_to_Archive" },
				{ text: "Født", value: "born" },
				{ text: "Senest ændret", value: "updatedAt" },
				{ text: "Ændret af", value: "initials" },
				{ text: "Instruktør", value: "instructor" },
				{ text: "Axapta", value: "ax_dog_no" },
				{ text: "Axapta navn", value: "ax_dog_name" },
				{ text: "Antal status ændringer", value: "status_changes_count" },
			],
			dogs: [],
			editedIndex: -1,
			editedItem: {
				dog_name: null,
				dog_number: null,
				status: null,
				link_to_Archive: null,
				remark: null,
				removed_cause: null,
				status_changes: null
			},
			defaultItem: {
				dog_name: null,
				dog_number: null,
				status: null,
				link_to_Archive: null,
				remark: null,
				removed_cause: null,
			},
			username: { name: this.$store.state.user },
			user: {},
			editedFeedhost: {
				dog_no: null,
				dog_name: null
			}
		};
	},
	computed: {
		//Set the title of the update status and name pop up
		formTitle() {
			return this.editedIndex === -1
				? "New Item"
				: `Lav ændringer på hundenummer: ${this.editedItem.dog_number}`;
		},
		//Set the name of the button of the update status and name pop up
		formSave() {
			return this.editedIndex === -1 ? "Opret hund" : "Gem ændringer";
		},
	},
	watch: {
		//Determines if the pop up should be open or not
		dialog(val) {
			val || this.close();
		},
		//Determines if the delete pop up should be open or not OBSOLETE: Delete is removed
		dialogDelete(val) {
			val || this.closeDelete();
		},
	},
	//Loads initial data on page load
	async mounted() {
		//Loads the dogs
		try {
			this.dogs = (await DogsServices.index()).data;
		} catch (err) {
			alert(err.response.data.error);
		}
		//Fetches the user credentials
		try {
			this.user = (await AuthenticationService.getuser(this.username)).data;
		} catch (err) {
			alert(err.response.data.error);
		}
	},
	methods: {
		//Navigates the user to whatever route name is passed
		navigateTo(route) {
			this.$router.push(route);
		},
		//Opens the update view with the specific dog
		seeDog(route, item) {
			this.$router.push({ name: route, params: { dogid: item.dog_number } });
		},
		//Sets the values of the pop up update view
		editItem(item) {
			this.editedIndex = this.dogs.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},
		//Closes the pop up view and reloads the status sheet
		async close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
			try {
				this.dogs = (await DogsServices.index()).data;
			} catch (err) {
				alert(err.response.data.error);
			}


		},
		//Closes delete pop up OBSOLETE: delete has been removed
		closeDelete() {
			this.dialogDelete = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},
		//Updates the status and name of the selected dog
		async updateStatus() {
			if (this.editedIndex > -1) {

				Object.assign(this.dogs[this.editedIndex], this.editedItem);
				if (this.editedItem.status != "Kasseret") {
					this.editedItem.removed_cause = null;
				}

				const statusArr = this.editedItem.status_changes.split(",");
				const lastStatus = statusArr[statusArr.length - 1].split(" ")[0]

				if (lastStatus === this.editedItem.status) {
					this.editedItem.status_changes = this.editedItem.status_changes;
				} else {
					var today = new Date();
					var dd = String(today.getDate()).padStart(2, '0');
					var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
					var yyyy = today.getFullYear();
					today = dd + '-' + mm + '-' + yyyy;
					this.editedItem.status_changes = this.editedItem.status_changes + "," + this.editedItem.status + " " + today;
				}
				this.editedItem.initials = this.$store.state.user
				try {
					await DogsServices.updateDog(this.editedItem);
				} catch (err) {
					alert(err.response.data.error);
				}

				this.editedFeedhost.dog_name = this.editedItem.dog_name;
				this.editedFeedhost.dog_no = this.editedItem.dog_number;

				try{
					await FeedhostService.updateDogName(this.editedFeedhost);
				}catch (err){
					alert(err.response.data.error)
				}

			} else {
				this.dogs.push(this.editedItem);
			}
			this.close();
		},
		//Creates the extracted excel sheet based on the selected dogs
		create_axapta() {
			let extract = [];
			this.selected.forEach(element => extract.push({ 'dog_number': element.dog_number, 'dog_name': element.dog_name, 'dimension': 5 }))

			var ws = XLSX.utils.aoa_to_sheet([
				["dog_number", 'dog_name', 'dimension']
			]);

			XLSX.utils.sheet_add_json(ws, extract, { origin: -1, skipHeader: true });

			var wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, ws, "Axapta Upload");
			var wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

			saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Axapta Upload.xlsx");
		},
		//Determines if all rows should be shown. Only visually impaired users will have all rows shown as they search via screen reader
		ifDisablePaging() {
			if (this.user.type == "VI") {
				return true;
			} else {
				return false;
			}
		},
		//Changes the request to the database if the removed checkbox is checked
		async removedRequest() {
			try{
				if(this.showremoved==true){
					this.dogs = (await DogsServices.indexWithoutRemoved()).data;
				}else{
					this.dogs = (await DogsServices.index()).data;
				}
			}catch(err){
				alert(err.response.data.error);
			}
			
		}
	},
};
</script>

<style scoped>
.axapta {
	border-radius: 5px;
	text-align: center;
}

.true {
	background-color: #aefcc3;
}

.false {
	background-color: #ff6e6e;
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
