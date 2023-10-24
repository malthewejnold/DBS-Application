<template>
	<v-container>
		<v-flex>
			<v-card class="mb-16">
				<v-card-title tabindex="0"><h4>Find hunde ved hjælp af filtre</h4></v-card-title>
				<v-container>
					<v-row>
						<v-col>
							<v-select v-model="dogSearch.status" label="Status" :items="status_list"></v-select>
						</v-col>
						<v-col>
							<v-select v-model="dogSearch.gender" label="Køn" :items="gender_list"></v-select>
						</v-col>
						<v-col>
							<v-select v-model="dogSearch.race" label="Race" :items="race_list"></v-select>
						</v-col>
						<v-col>
							<v-select v-model="dogSearch.walk_speed" label="Ganghastighed" :items="walk_speed_list">
							</v-select>
						</v-col>
						<v-col>
							<v-select v-model="dogSearch.temper" label="Temperament" :items="temper_list"></v-select>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-btn class="mb-4 white--text green" @click="findDogs">
								Find hunde
								<v-icon right dark>search</v-icon>
							</v-btn>
						</v-col>
					</v-row>
				</v-container>
			</v-card>
		</v-flex>
		<v-card v-if="clicked">
			<v-data-table :headers="headers" :items="dogs" class="elevation-1" item-key="dog_number" tabindex="0">
				<template v-slot:[`item.training_start`]="{ item }">
					<span v-if="item.training_start != null">{{
						new
							Date(item.training_start).toLocaleDateString("da-DK")
					}}</span>
				</template>
				<template v-slot:[`item.approval_date`]="{ item }">
					<span v-if="item.approval_date != null">{{
						new Date(item.approval_date).toLocaleDateString("da-DK")
					}}</span>
				</template>
				<template v-slot:[`item.born`]="{ item }">
					<span v-if="item.born != null">{{ new Date(item.born).toLocaleDateString("da-DK") }}</span>
				</template>
				<template v-slot:[`item.updatedAt`]="{ item }">
					<span v-if="item.updatedAt != null">{{
						new Date(item.updatedAt).toLocaleDateString("da-DK")
					}}</span>
				</template>
				<template v-slot:[`item.status_changes`]="{ item }">{{ countchanges(item) }}</template>
			</v-data-table>
		</v-card>
	</v-container>
</template>

<script>
import DogsServices from "@/services/DogsServices";
import ListItems from "@/services/ListItems";

export default {
	data() {
		return {
			status_list: ListItems.status_list(),
			race_list: ListItems.race_list(),
			gender_list: ListItems.gender_list(),
			walk_speed_list: ListItems.walk_speed_list(),
			temper_list: ListItems.temper_list(),
			dogSearch: {
				status: null,
				gender: null,
				race: null,
				walk_speed: null,
				temper: null
			},
			dogs: [],
			headers: [
				{ text: "Hundenummer", value: "dog_number" },
				{ text: "Hundenavn", value: "dog_name" },
				{ text: "Status", value: "status" },
				{ text: "Race", value: "race" },
				{ text: "Køn", value: "gender" },
				{ text: "Ganghastighed", value: "walk_speed" },
				{ text: "Temperament", value: "temper" },
				{ text: "Født", value: "born" },
				{ text: "Træning start", value: "training_start" },
				{ text: "Godkendelsesdato", value: "approval_date" },
				{ text: "Instruktør", value: "instructor" },
				{ text: "Senest ændret", value: "updatedAt" },
				{ text: "Antal status ændringer", value: "status_changes" },
			],
			clicked: false
		}
	},
	methods: {
		//Loads a list of all dogs based on the selected options
		async findDogs() {
			try {
				this.dogs = (await DogsServices.findDogsFiltered(this.dogSearch)).data;
			} catch (err) {
				alert(err.response.data.error);
			}
			
			this.clicked = true;
		},
		//Counts the status changes of the dogs
		countchanges(item) {
			const str = item.status_changes
			const count = str.split(',').length - 1
			return count
		},
	}
}
</script>
<style scoped>
</style>