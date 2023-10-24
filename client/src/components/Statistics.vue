<template>
	<div>
		<v-layout>
			<v-flex xs6 class="ma-8">
				<v-card>
					<h3 tabindex="-1">Hundestatus</h3>
					<status-chart tabindex="-1"></status-chart>
				</v-card>
				<h6 tabindex="0" style="color:white">Hundestatus tabel</h6>
				<table class="mt-2 elevation-1" dense tabindex="0">
					<tr>
						<td class="grey lighten-3">Status</td>
						<td v-for="row in this.statusData" :key="row.status">{{ row.status }}</td>
					</tr>
					<tr>
						<td class="grey lighten-3">Antal</td>
						<td v-for="row in this.statusData" :key="row.counts">{{ row.counts }}</td>
					</tr>
				</table>
			</v-flex>
			<v-flex xs6 class="ma-8">
				<v-card>
					<h3 tabindex="-1">Hunde udplaceret</h3>
					<outplacement tabindex="-1"></outplacement>
				</v-card>
				<h6 tabindex="0" style="color:white">Hunde udplaceret tabel</h6>
				<table class="mt-2 elevation-1" dense tabindex="0">
					<tr>
						<td class="grey lighten-3">År</td>
						<td v-for="row in this.outplacementData" :key="row.year">{{ row.year }}</td>
					</tr>
					<tr>
						<td class="grey lighten-3">Antal</td>
						<td v-for="row in this.outplacementData" :key="row.count">{{ row.count }}</td>
					</tr>
				</table>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex xs4 class="ma-8">
				<v-card>
					<h3 tabindex="-1">Hunde i træning</h3>
					<training tabindex="-1"></training>
				</v-card>
				<h6 tabindex="0" style="color:white">Hunde i træning tabel</h6>
				<table class="mt-2 elevation-1" dense tabindex="0">
					<tr>
						<td class="grey lighten-3">År</td>
						<td v-for="row in this.trainingData" :key="row.year">{{ row.year }}</td>
					</tr>
					<tr>
						<td class="grey lighten-3">Antal</td>
						<td v-for="row in this.trainingData" :key="row.count">{{ row.count }}</td>
					</tr>
				</table>
			</v-flex>
			<v-flex xs4 class="ma-8">
				<v-card>
					<h3 tabindex="-1">Hunde der er godkendt</h3>
					<approved tabindex="-1"></approved>
				</v-card>
				<h6 tabindex="0" style="color:white">Hunde der er godkendt tabel</h6>
				<table class="mt-2 elevation-1" dense tabindex="0">
					<tr>
						<td class="grey lighten-3">År</td>
						<td v-for="row in this.approvalData" :key="row.year">{{ row.year }}</td>
					</tr>
					<tr>
						<td class="grey lighten-3">Antal</td>
						<td v-for="row in this.approvalData" :key="row.count">{{ row.count }}</td>
					</tr>
				</table>
			</v-flex>
			<v-flex xs4 class="ma-8">
				<v-card>
					<h3 tabindex="-1">Kasseret årsag</h3>
					<removed-cause tabindex="-1"></removed-cause>
				</v-card>
				<h6 tabindex="0" style="color:white">Kasseret årsag tabel</h6>
				<table class="mt-2 mt-2 elevation-1" tabindex="0">
					<tr>
						<td class="grey lighten-3">Årsag</td>
						<th v-for="row in this.removedcauseData" :key="row.removed_cause">{{ row.removed_cause }}</th>
					</tr>
					<tr>
						<td class="grey lighten-3">Antal</td>
						<td v-for="row in this.removedcauseData" :key="row.counts">{{ row.counts }}</td>
					</tr>
				</table>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex xs6 class="ma-8">
				<v-card>
					<h3 tabindex="-1">Hunde udplaceret på race og køn</h3>
					<outplacementstats tabindex="-1"></outplacementstats>
				</v-card>
				<h6 tabindex="0" style="color:white">Hunde udplaceret på race og køn tabel</h6>
				<table class="mt-2 elevation-1" dense tabindex="0">
					<tr>
						<td></td>
						<td v-for="row in this.racelist" :key="row">{{ row }}</td>
					</tr>
					<tr>
						<td>Antal hanner</td>
						<td v-for="row in this.malelist" :key="row">{{ row }}</td>
					</tr>
					<tr>
						<td>Antal tæver</td>
						<td v-for="row in this.femalelist" :key="row">{{ row }}</td>
					</tr>
					<tr>
						<td>Intet køn valgt</td>
						<td v-for="row in this.emptylist" :key="row">{{ row }}</td>
					</tr>
				</table>
			</v-flex>
			<v-flex xs6 class="ma-8">
				<v-card>
					<h3 tabindex="-1">Fodervært statusser</h3>
					<feedhost-status tabindex="-1"></feedhost-status>
				</v-card>
				<h6 tabindex="0" style="color:white">Fodervært statusser tabel</h6>
				<table class="mt-2 elevation-1" dense tabindex="0">
					<tr>
						<td class="grey lighten-3">År</td>
						<td v-for="row in this.feedhoststatusData" :key="row.status">{{ row.status }}</td>
					</tr>
					<tr>
						<td class="grey lighten-3">Antal</td>
						<td v-for="row in this.feedhoststatusData" :key="row.counts">{{ row.counts }}</td>
					</tr>
				</table>
			</v-flex>
		</v-layout>
	</div>
</template>
<script>
import StatusChart from '@/components/charts/StatusChart'
import RemovedCause from '@/components/charts/RemovedCause'
import Training from '@/components/charts/Training'
import Approved from '@/components/charts/Approved'
import Outplacement from '@/components/charts/Outplacement'
import Outplacementstats from '@/components/charts/Outplacementstats'
import FeedhostStatus from '@/components/charts/FeedhostStatus'
import ChartServices from '@/services/ChartServices'

export default {
	data() {
		return {
			approvalData: null,
			outplacementData: null,
			outplacementstatsData: null,
			removedcauseData: null,
			statusData: null,
			trainingData: null,
			emptylist: null,
			femalelist: null,
			malelist: null,
			racelist: ['Ingen race valgt', 'Golden Retriever', 'Labrador', 'Labrador Golden Mix', 'Puddel', 'Schæfer']
		}
	},
	components: {
		StatusChart,
		RemovedCause,
		Training,
		Approved,
		Outplacement,
		Outplacementstats,
		FeedhostStatus
	},

	//Reads the same data as the statistics, but renders as tables as these are used for visually impaired users
	async mounted() {
		try {
			this.approvalData = (await ChartServices.getApproval()).data
			this.outplacementData = (await ChartServices.getOutplacement()).data
			this.outplacementstatsData = (await ChartServices.getOutplacementstats()).data
			this.removedcauseData = (await ChartServices.getRemovedCauseData()).data
			this.statusData = (await ChartServices.getStatusChartData()).data
			this.trainingData = (await ChartServices.getTraining()).data
			this.feedhoststatusData = (await ChartServices.getFeedhostStatus()).data

		} catch (err) {
			alert(err.response.data.error);
		}

		let malelist = [null, null, null, null, null, null]
		let femalelist = [null, null, null, null, null, null]
		let emptylist = []

		for (let i = 0; i < this.outplacementstatsData.length; i++) {
			if (this.outplacementstatsData[i].gender == 'Han') {
				switch (this.outplacementstatsData[i].race) {
					case ('Golden Retriever'):
						malelist.splice(1, 0, this.outplacementstatsData[i].counter)
						break;
					case ('Labrador'):
						malelist.splice(2, 0, this.outplacementstatsData[i].counter)
						break;
					case ('Labrador Golden Mix'):
						malelist.splice(3, 0, this.outplacementstatsData[i].counter)
						break;
					case ('Puddel'):
						malelist.splice(4, 0, this.outplacementstatsData[i].counter)
						break;
					case ('Schæfer'):
						malelist.splice(5, 0, this.outplacementstatsData[i].counter)
						break;
					case (''):
						malelist.splice(0, 0, this.outplacementstatsData[i].counter)
						break;
				}
			} else if (this.outplacementstatsData[i].gender == 'Tæve') {
				switch (this.outplacementstatsData[i].race) {
					case ('Golden Retriever'):
						femalelist.splice(1, 0, this.outplacementstatsData[i].counter)
						break;
					case ('Labrador'):
						femalelist.splice(2, 0, this.outplacementstatsData[i].counter)
						break;
					case ('Labrador Golden Mix'):
						femalelist.splice(3, 0, this.outplacementstatsData[i].counter)
						break;
					case ('Puddel'):
						femalelist.splice(4, 0, this.outplacementstatsData[i].counter)
						break;
					case ('Schæfer'):
						femalelist.splice(5, 0, this.outplacementstatsData[i].counter)
						break;
					case (''):
						femalelist.splice(0, 0, this.outplacementstatsData[i].counter)
						break;
				}
			} else {
				emptylist.splice(0, 0, this.outplacementstatsData[i].counter)
			}

			this.malelist = malelist
			this.femalelist = femalelist
			this.emptylist = emptylist
		}

	}
}
</script>
<style scoped>
table {
	width: 100%;
	border-radius: 4px;
}
</style>