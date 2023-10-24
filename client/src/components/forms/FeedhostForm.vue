<template>
	<forms-panel header="Fodervært/sælger" title="50 Hunde i fodervært" :guide="guide" @passData="updateHeader($event)">
		<v-layout>
			<v-flex xs6>
				<h3>Sammentælling</h3>
				<v-simple-table dense class="text-left ma-8">
					<template v-slot:default>
						<thead>
							<tr>
								<th colspan="3" style="font-size:14px;">
									<b>Kontering løn</b>
								</th>
								<th colspan="1" style="font-size:14px;">
									Beskatning
									<br />Uden
								</th>
								<th colspan="1" style="font-size:14px;">
									<br />Med
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>3006</td>
								<td>
									Honorar
									<br />Fodervært
								</td>
								<td>
									Antal timer
									<br />
									<input class="input-read-small" type="text"
										v-model="instructordata.driving_drivingtime_sum" name="Honorar Fodervært"
										readonly /> á kr. 190,44
								</td>
								<td></td>
								<td>{{
									calculate(instructordata.driving_drivingtime_sum, 190.44, 'honorarfeedhost_with')
								}}</td>
							</tr>
							<tr>
								<td>7006</td>
								<td>
									Kilometergodtgørelse
									<br />i flg. bilag
								</td>
								<td>
									Antal timer
									<br />
									<input class="input-read-small" type="number"
										v-model="instructordata.driving_drivingkm_sum" name="Antal kilometer"
										readonly /> á kr. 3,51
								</td>
								<td>{{ calculate(instructordata.driving_drivingkm_sum, 3.51, 'numberkilom_without') }}
								</td>
								<td></td>
							</tr>
							<tr>
								<td>7150</td>
								<td>
									Øvrige rejse/opholdsudgifter
									<br />i flg. bilag
								</td>
								<td>
									Broafgift mv.
									<br />
									<input class="input" type="number" v-model="instructordata.otherexpenses"
										name="Broafgift mv." />
								</td>
								<td>{{ calculate(instructordata.otherexpenses, 1, 'otherexpenses_without') }}</td>
								<td></td>
							</tr>
							<tr>
								<td>7150</td>
								<td>
									Diverse udgifter
									<br />i flg. bilag
								</td>
								<td>
									Foder/medicin mv.
									<br />
									<input class="input" type="number" v-model="instructordata.diverseexpenses"
										name="Foder/medicin mv." />
								</td>
								<td>{{ calculate(instructordata.diverseexpenses, 1, 'diverseexpenses_without') }}</td>
								<td></td>
							</tr>
							<tr>
								<td>3007</td>
								<td>
									Hund i pension - kost & smuds
									<br />Fra
									<input class="input" type="number" v-model="instructordata.from" name="Fra" /> til
									<input class="input" type="number" v-model="instructordata.to" name="Til" />
								</td>
								<td>
									Antal dage
									<br />
									<input class="input" type="number" v-model="instructordata.numberdays"
										name="Antal dage" /> á kr.
									112,83
								</td>
								<td></td>
								<td>{{ calculate(instructordata.numberdays, 112.83, 'numberdays_without') }}</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-flex>
			<v-spacer></v-spacer>
			<v-flex xs6>
				<h3>Kørselsskema</h3>
				<v-simple-table dense class="text-left ma-8">
					<template v-slot:default>
						<thead>
							<tr>
								<th>Dato</th>
								<th>Afg. Kl.</th>
								<th>Fra adresse</th>
								<th>Ank. Kl.</th>
								<th>Til adresse</th>
								<th>Via adresse</th>
								<th>time-forbrug</th>
								<th>km. afg.</th>
								<th>km ank.</th>
								<th>kørte km</th>
								<th>Arbejdets art</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="row in norows" :key="row">
								<td>
									<input class="input-large" type="text" v-model="instructordata.driving_date[row]" />
								</td>
								<td>
									<input class="input-large" type="text"
										v-model="instructordata.driving_timedeparture[row]" />
								</td>
								<td>
									<input class="input-large" type="text"
										v-model="instructordata.driving_adressdeparture[row]" />
								</td>
								<td>
									<input class="input-large" type="text"
										v-model="instructordata.driving_timearrival[row]" />
								</td>
								<td>
									<input class="input-large" type="text"
										v-model="instructordata.driving_adressarrival[row]" />
								</td>
								<td>
									<input class="input-large" type="text"
										v-model="instructordata.driving_adressvia[row]" />
								</td>
								<td>
									<input class="input-large" type="number"
										v-model="instructordata.driving_timeused[row]" />
								</td>
								<td>
									<input class="input-large" type="text"
										v-model="instructordata.driving_kmdeparture[row]"
										@change="calculateMinus(instructordata.driving_kmarrival[row], instructordata.driving_kmdeparture[row], row)" />
								</td>
								<td>
									<input class="input-large" type="text"
										v-model="instructordata.driving_kmarrival[row]"
										@change="calculateMinus(instructordata.driving_kmarrival[row], instructordata.driving_kmdeparture[row], row)" />
								</td>
								<td>
									<input readonly class="input-read" type="text"
										v-model="instructordata.driving_drivenkm[row]" />
								</td>
								<td>
									<input class="input-large" type="text"
										v-model="instructordata.driving_natureofwork[row]" />
								</td>
							</tr>
							<tr>
								<td colspan="6"></td>
								<td>{{ calculateSum('timeused') }}</td>
								<td colspan="2"></td>
								<td>{{ calculateSum('drivenkm') }}</td>
								<td></td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-flex>
		</v-layout>
		<v-divider class="mb-8"></v-divider>
		<v-layout>
			<v-flex xs6>
				<h3 class="mb-4">Bemærkninger om besøg</h3>
				<v-flex class="text-left ma-8">
					<v-row>
						<v-col>Dato</v-col>
						<v-col>
							<input class="input-large" type="date" v-model="instructordata.visit_report_date"
								name="Dato" />
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-textarea v-model="instructordata.visit_report_environment" rows="1" auto-grow
								label="Sted - miljøtyper" />
							<p style="font-size:10px; color:grey">
								(f.eks. derhjemme, rolig boligområde, travle veje, centrum af byen, inkøbscenter, bus,
								tog - rejse eller station…, navngiv alle typer miljø, der var en del af besøget)
							</p>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-textarea v-model="instructordata.visit_report_finished_work" rows="1" auto-grow
								label="Beskrivelse af afsluttet arbejde" />
							<p style="font-size:10px; color:grey">
								(inklusive hundenes reaktioner, arbejde med foderværter, problemløsning strategier
								prøvet i løbet af besøget osv.)
							</p>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-textarea v-model="instructordata.visit_report_options_challenges" rows="1" auto-grow
								label="Oplysninger og udfordringer rapporteret af foderværter" />
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-textarea v-model="instructordata.visit_report_remarks_dog" rows="1" auto-grow
								label="Bemærkninger om hundens sundhed, vægt og lignende" />
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-textarea v-model="instructordata.visit_report_next_work" rows="1" auto-grow
								label="Næste arbejde" />
							<p style="font-size:10px; color:grey">(dato for næste besøg, hvad skal der arbejdes med,
								problemløsning strategier osv. som pasning af hvalpen hos andre, dyrelæge besøg osv.
								hvad er planlagt med foderværten, hvad skal evt. trænes / gøres i tiden inden næste
								besøg osv.)</p>
						</v-col>
					</v-row>
				</v-flex>
			</v-flex>
			<v-flex xs6>
				<h3>Tidligere besøg</h3>
			</v-flex>
		</v-layout>
		<v-divider class="mb-8"></v-divider>
		<v-layout>
			<v-flex xs6>
				<h3>Månedligt overblik</h3>
				<v-flex class="text-left ma-8">
					<v-row>
						<v-col>
							<b>Problem 1</b>
							<br />Nøgleord, kort beskrivelse:
						</v-col>
						<v-col>
							<v-textarea v-model="instructordata.monthly_report_problem1" rows="1" auto-grow
								label="Problem 1" />
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<b>Problem 2</b>
							<br />Nøgleord, kort beskrivelse:
						</v-col>
						<v-col>
							<v-textarea v-model="instructordata.monthly_report_problem2" rows="1" auto-grow
								label="Problem 2" />
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<b>Problem 3</b>
							<br />Nøgleord, kort beskrivelse:
						</v-col>
						<v-col>
							<v-textarea v-model="instructordata.monthly_report_problem3" rows="1" auto-grow
								label="Problem 3" />
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<b>Problem 4</b>
							<br />Nøgleord, kort beskrivelse:
						</v-col>
						<v-col>
							<v-textarea v-model="instructordata.monthly_report_problem4" rows="1" auto-grow
								label="Problem 4" />
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<b>Karakterskala:</b>
							<br />0: Ikke observeret / har ingen info om emnet / adfærden
							<br />1: Hund/fodervært har betydelige problemer
							<br />2: Hund/fodervært har små problemer
							<br />3: Hund/fodervært klarer emnet / adfærden som forventet i hundens alder
							<br />
							<i>Skriv i kommentar feltet, hvis oplysningerne om emnet / adfærden udelukkende er baseret
								på rapportering fra foderværten og ikke på din egen observation.</i>
						</v-col>
					</v-row>
					<v-simple-table class="mt-8">
						<thead>
							<tr>
								<th>Adfærd udenfor hjemmet</th>
								<th>Karakter</th>
								<th>Kommentar</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Frifase:</td>
								<td>
									<input class="input" type="number"
										v-model="instructordata.monthly_report_freephase_grade" />
								</td>
								<td>
									<input class="input-large"
										v-model="instructordata.monthly_report_freephase_remark" />
								</td>
							</tr>
							<tr>
								<td>Indkald:</td>
								<td>
									<input class="input" type="number"
										v-model="instructordata.monthly_report_call_grade" />
								</td>
								<td>
									<input class="input-large" v-model="instructordata.monthly_report_call_remark" />
								</td>
							</tr>
							<tr>
								<td>Gå pænt i snor:</td>
								<td>
									<input class="input" type="number"
										v-model="instructordata.monthly_report_walk_grade" />
								</td>
								<td>
									<input class="input-large" v-model="instructordata.monthly_report_walk_remark" />
								</td>
							</tr>
							<tr>
								<td>Passage, mennesker:</td>
								<td>
									<input class="input" type="number"
										v-model="instructordata.monthly_report_passage_people_grade" />
								</td>
								<td>
									<input class="input-large"
										v-model="instructordata.monthly_report_passage_people_remark" />
								</td>
							</tr>
							<tr>
								<td>Passage, hunde:</td>
								<td>
									<input class="input" type="number"
										v-model="instructordata.monthly_report_passage_dogs_grade" />
								</td>
								<td>
									<input class="input-large"
										v-model="instructordata.monthly_report_passage_dogs_remark" />
								</td>
							</tr>
							<tr>
								<td>Omgang med hunde:</td>
								<td>
									<input class="input" type="number"
										v-model="instructordata.monthly_report_dogs_grade" />
								</td>
								<td>
									<input class="input-large" v-model="instructordata.monthly_report_dogs_remark" />
								</td>
							</tr>
							<tr>
								<td>Omgang med børn:</td>
								<td>
									<input class="input" type="number"
										v-model="instructordata.monthly_report_children_grade" />
								</td>
								<td>
									<input class="input-large"
										v-model="instructordata.monthly_report_children_remark" />
								</td>
							</tr>
							<tr>
								<td>Omgang med voksne:</td>
								<td>
									<input class="input" type="number"
										v-model="instructordata.monthly_report_adults_grade" />
								</td>
								<td>
									<input class="input-large" v-model="instructordata.monthly_report_adults_remark" />
								</td>
							</tr>
							<tr>
								<td>Socialisering:</td>
								<td>
									<input class="input" type="number"
										v-model="instructordata.monthly_report_socialising_grade" />
								</td>
								<td>
									<input class="input-large"
										v-model="instructordata.monthly_report_socialising_remark" />
								</td>
							</tr>
							<tr>
								<td>Adfærd i gågade og butikker:</td>
								<td>
									<input class="input" type="number"
										v-model="instructordata.monthly_report_street_grade" />
								</td>
								<td>
									<input class="input-large" v-model="instructordata.monthly_report_street_remark" />
								</td>
							</tr>
							<tr>
								<td>Aktivitetsniveau:</td>
								<td>
									<input class="input" type="number"
										v-model="instructordata.monthly_report_activity_grade" />
								</td>
								<td>
									<input class="input-large"
										v-model="instructordata.monthly_report_activity_remark" />
								</td>
							</tr>
						</tbody>
					</v-simple-table>
					<v-simple-table class="mt-8">
						<thead>
							<tr>
								<th>Adfærd og selvsikkerhed med</th>
								<th>Karakter</th>
								<th>Kommentar</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Villavej:</td>
								<td>
									<input class="input" type="number"
										v-model="instructordata.monthly_report_villa_grade" />
								</td>
								<td>
									<input class="input-large" v-model="instructordata.monthly_report_villa_remark" />
								</td>
							</tr>
							<tr>
								<td>Storby:</td>
								<td>
									<input class="input" type="number"
										v-model="instructordata.monthly_report_bigcity_grade" />
								</td>
								<td>
									<input class="input-large" v-model="instructordata.monthly_report_bigcity_remark" />
								</td>
							</tr>
							<tr>
								<td>Tog - observeret:</td>
								<td>
									<input class="input" type="number"
										v-model="instructordata.monthly_report_train_watched_grade" />
								</td>
								<td>
									<input class="input-large"
										v-model="instructordata.monthly_report_train_watched_remark" />
								</td>
							</tr>
							<tr>
								<td>Tog - indstigning:</td>
								<td>
									<input class="input" type="number"
										v-model="instructordata.monthly_report_train_on_grade" />
								</td>
								<td>
									<input class="input-large"
										v-model="instructordata.monthly_report_traing_on_remark" />
								</td>
							</tr>
							<tr>
								<td>Togkørsel:</td>
								<td>
									<input class="input" type="number"
										v-model="instructordata.monthly_report_train_grade" />
								</td>
								<td>
									<input class="input-large" v-model="instructordata.monthly_report_train_remark" />
								</td>
							</tr>
						</tbody>
					</v-simple-table>
				</v-flex>
			</v-flex>
		</v-layout>
		<v-btn class="ma-8 purple" dark @click="create">Opret lønbilag</v-btn>
	</forms-panel>
</template>

<script>
import FormsPanel from '@/components/fixed/forms/FormsPanel'
import FormServices from '../../services/FormServices'
import InstructorService from '../../services/InstructorService'


export default {
	data() {
		return {
			norows: [0, 1, 2, 3, 4, 5, 6],
			guide: null,
			headercomponent: null,
			instructordata: {
				type: 'Fodervært',
				honorarfeedhost_without: null,
				honorarfeedhost_with: null,
				numberkilom_without: null,
				numberkilom_with: null,
				otherexpenses: null,
				otherexpenses_without: null,
				otherexpenses_with: null,
				diverseexpenses: null,
				diverseexpenses_without: null,
				diverseexpenses_with: null,
				numberdays: null,
				numberdays_without: null,
				numberdays_with: null,
				from: null,
				to: null,
				driving_date: [],
				driving_timedeparture: [],
				driving_adressdeparture: [],
				driving_timearrival: [],
				driving_adressarrival: [],
				driving_adressvia: [],
				driving_timeused: [],
				driving_kmdeparture: [],
				driving_kmarrival: [],
				driving_drivenkm: [],
				driving_natureofwork: [],
				driving_drivingtime_sum: 0,
				driving_drivingkm_sum: 0,
				visit_report_date: null,
				visit_report_environment: null,
				visit_report_finished_work: null,
				visit_report_options_challenges: null,
				visit_report_next_work: null,
				monthly_report_problem1: null,
				monthly_report_problem2: null,
				monthly_report_problem3: null,
				monthly_report_problem4: null,
			}
		}
	},
	components: {
		FormsPanel
	},
	methods: {
		updateHeader(headerdata) {
			this.headercomponent = headerdata
		},
		calculate(a, b, setvalue) {
			this.$data.instructordata[setvalue] = a * b;
			return a * b;
		},
		calculateMinus(a, b, setvalue) {
			if (a == null || b == null) {
				return 0;
			} else {
				this.$set(this.instructordata.driving_drivenkm, setvalue, a - b)
				return a - b;
			}
		},
		calculateSum(setvalue) {
			let sum = 0;
			if (setvalue == 'drivenkm') {
				sum = this.instructordata.driving_drivenkm.reduce((partialSum, a) => partialSum + a, 0);
				this.instructordata.driving_drivingkm_sum = sum;
			} else if (setvalue == 'timeused') {
				let timeusedNumber = [];
				for (let i = 0; i < this.instructordata.driving_timeused.length; i++) {
					timeusedNumber.push(Number(this.instructordata.driving_timeused[i]))
				}
				sum = timeusedNumber.reduce((partialSum, a) => partialSum + a, 0);
				this.instructordata.driving_drivingtime_sum = sum;
			}
			return sum
		},
		async create() {
			this.instructordata.instructor_name = this.headercomponent.instructor_name;
			this.instructordata.instructor_salaryNo = this.headercomponent.instructor_salaryNo;

			this.instructordata.feedhost_name = this.headercomponent.feedhost_name;
			this.instructordata.feedhost_adress = this.headercomponent.feedhost_adress;
			this.instructordata.feedhost_zip = this.headercomponent.feedhost_zip;
			this.instructordata.feedhost_city = this.headercomponent.feedhost_city;

			this.instructordata.dog_number = this.headercomponent.dog_number;
			this.instructordata.dog_name = this.headercomponent.dog_name;
			this.instructordata.dog_race = this.headercomponent.dog_race;
			this.instructordata.dog_colour = this.headercomponent.dog_colour;
			this.instructordata.dog_gender = this.headercomponent.dog_gender;
			this.instructordata.dog_birth = this.headercomponent.dog_birth;
			this.instructordata.dog_chipNo = this.headercomponent.dog_chipNo;

			try {
				await InstructorService.createInstructor(this.instructordata);
			} catch (err) {
				alert(err.response.data.error);
			}
			
			this.$router.push({
				name: "form-navigator",
			});
		}
	},
	async mounted() {
		try {
			this.guide = (await FormServices.getFormGuide('feedhost')).data
		} catch (err) {
			alert(err.response.data.error);
		}

	},
	generateExcel() {
		//Denne bliver nyttig i løn bilag
		XLSX.utils.sheet_add_aoa(ws, [
			[1],
			,
			[/*B5*/, /*C5*/, /*D5*/, "abc"]
		], { origin: "B3" });
	}
}
</script>
<style scoped>
.input {
	background-color: orange;
	width: 20%;
}

.input-large {
	background-color: orange;
	width: 80%;
}

.input-read {
	width: 80%;
}

.input-read-small {
	width: 20%;
}
</style>