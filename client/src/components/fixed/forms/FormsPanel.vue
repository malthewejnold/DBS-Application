<template>
	<v-card class="rounded-lg">
		<v-toolbar dense class="rounded-b-0 blue-grey darken-3" dark>
			<v-toolbar-title>{{ title }}</v-toolbar-title>
		</v-toolbar>
		<v-container class="mt-4" v-if="this.$route.name != 'form-navigator'" @change="passData()">
			<v-layout>
				<v-flex xs6>
					<v-container class="blue-grey lighten-5">
						<v-row class="ma-2">
							<v-col>
								<v-text-field label="Navn" v-model="headercomponent.instructor_name" />
							</v-col>
						</v-row>
						<v-row class="ma-2">
							<v-col>
								<v-text-field label="Lønnummer" v-model="headercomponent.instructor_salaryNo" />
							</v-col>
						</v-row>
					</v-container>
					<br />
					<v-layout>
						<v-flex xs5 class="mr-6">
							<v-row class="mt-6 ma-2">
								<v-col class="text-left">
									<h3>{{ header }}</h3>
								</v-col>
							</v-row>
							<v-row class="ml-2">
								<v-col>
									<v-text-field label="Navn" v-model="headercomponent.feedhost_name" />
								</v-col>
							</v-row>
							<v-row class="ml-2">
								<v-col>
									<v-text-field label="Adresse (gadenavn + nr.)"
										v-model="headercomponent.feedhost_adress" />
								</v-col>
							</v-row>
							<v-row class="ml-2">
								<v-col>
									<v-text-field label="Postnummer" v-model="headercomponent.feedhost_zip" />
								</v-col>
							</v-row>
							<v-row class="ml-2">
								<v-col>
									<v-text-field label="By" v-model="headercomponent.feedhost_city" />
								</v-col>
							</v-row>
						</v-flex>
						<v-spacer></v-spacer>
						<v-flex class="flex-right">
							<v-row class="mt-6 ma-2">
								<v-col class="text-left">
									<h3>Hund</h3>
								</v-col>
							</v-row>
							<v-row class="ml-2">
								<v-col>
									<v-select label="Hundenummer" v-model="headercomponent.dog_number"
										:items="dogs_list" @change="setDog" />
								</v-col>
								<v-col>
									<v-text-field label="Hundenavn" v-model="headercomponent.dog_name" />
								</v-col>
							</v-row>
							<v-row class="ml-2">
								<v-col>
									<v-select label="Race" v-model="headercomponent.dog_race" :items="race_list" />
								</v-col>
							</v-row>
							<v-row class="ml-2">
								<v-col>
									<v-text-field label="Farve" v-model="headercomponent.dog_colour" />
								</v-col>
								<v-col>
									<v-select label="Køn" v-model="headercomponent.dog_gender" :items="gender_list" />
								</v-col>
							</v-row>
							<v-row class="ml-2">
								<v-col>
									<v-text-field label="Fødselsdato" v-model="headercomponent.dog_birth" type="date" />
								</v-col>
								<v-col>
									<v-text-field label="Chipnummer" v-model="headercomponent.dog_chipNo" />
								</v-col>
							</v-row>
						</v-flex>
					</v-layout>
				</v-flex>
				<v-spacer></v-spacer>
				<v-flex xs5>
					<v-container style="width:100%; height:100%">
						<h3>Brugsvejledning</h3>
						<br />
						<textarea rows="10" style="width:100%; height:90%" v-model="guide" readonly></textarea>
					</v-container>
				</v-flex>
			</v-layout>
			<v-divider class="mt-8 mb-8"></v-divider>
		</v-container>
		<slot>No content</slot>
	</v-card>
</template>

<script>
import ListItems from "@/services/ListItems";
import DogsServices from '@/services/DogsServices';
import FeedhostService from '@/services/FeedhostService'

export default {
	data() {
		return {
			race_list: ListItems.race_list(),
			gender_list: ListItems.gender_list(),
			dogs_list: null,
			dogs: null,
			headercomponent: {
				instructor_name: null,
				instructor_salaryNo: null,
				feedhost_name: null,
				feedhost_adress: null,
				feedhost_zip: null,
				feedhost_city: null,
				dog_number: null,
				dog_name: null,
				dog_race: null,
				dog_colour: null,
				dog_gender: null,
				dog_birth: null,
				dog_chipNo: null
			},
			feedhostdata: null
		}
	},
	props: [
		'title',
		'header',
		'guide'
	],
	methods: {
		passData() {
			this.$emit('passData', this.headercomponent)
		},
		async setDog() {
			var index = this.dogs.findIndex(e => e.dog_number === this.headercomponent.dog_number);

			this.headercomponent.dog_name = this.dogs[index].dog_name
			this.headercomponent.dog_race = this.dogs[index].race
			this.headercomponent.dog_colour = this.dogs[index].colour
			this.headercomponent.dog_gender = this.dogs[index].gender
			this.headercomponent.dog_birth = this.dogs[index].born
			this.headercomponent.dog_chipNo = this.dogs[index].chip_no
		}
	},
	async mounted() {
		this.dogs = (await DogsServices.index()).data;
		this.dogs_list = this.dogs.map(a => a.dog_number)
	},
}
</script>

<style scoped>
.flex-right {
	border-left: 1px dotted;
}
</style>