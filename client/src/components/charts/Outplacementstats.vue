<script>
import { Bar } from 'vue-chartjs';
import ChartServices from '../../services/ChartServices'
export default {
	extends: Bar,
	data() {
		return {
			chart_importdata: {},
			chartData: {
				labels: null,
				datasets: [
					{
						label: "Han",
						backgroundColor: 'rgba(54, 162, 235, 0.2)',
						borderWidth: 1,
						borderColor: 'rgba(54, 162, 235, 1)',
						data: null,
						skipNull: true
					},
					{
						label: "Tæve",
						backgroundColor: 'rgba(255, 99, 132, 0.2)',
						borderWidth: 1,
						borderColor: 'rgba(255,99,132,1)',
						data: null,
						skipNull: true
					},
					{
						label: "Ingen køn eller race data",
						backgroundColor: 'rgba(255, 206, 86, 0.2)',
						borderWidth: 1,
						borderColor: 'rgba(255, 206, 86, 1)',
						data: null,
						skipNull: true
					}
				]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: true
						}
					}],
					xAxes: [{
						gridLines: {
							display: false
						}
					}]
				},
				legend: {
					display: true
				},
				responsive: true,
				maintainAspectRatio: false
			}
		}
	},
	async mounted() {
		try {
			this.chart_importdata = (await ChartServices.getOutplacementstats()).data
		} catch (err) {
			alert(err);
		}

		let malelist = [null, null, null, null, null, null]
		let femalelist = [null, null, null, null, null, null]
		let emptylist = []

		for (let i = 0; i < this.chart_importdata.length; i++) {
			if (this.chart_importdata[i].gender == 'Han') {
				switch (this.chart_importdata[i].race) {
					case ('Golden Retriever'):
						malelist.splice(2, 0, this.chart_importdata[i].counter)
						break;
					case ('Labrador'):
						malelist.splice(3, 0, this.chart_importdata[i].counter)
						break;
					case ('Labrador Golden Mix'):
						malelist.splice(4, 0, this.chart_importdata[i].counter)
						break;
					case ('Puddel'):
						malelist.splice(5, 0, this.chart_importdata[i].counter)
						break;
					case ('Schæfer'):
						malelist.splice(6, 0, this.chart_importdata[i].counter)
						break;
					case (''):
						malelist.splice(1, 0, this.chart_importdata[i].counter)
						break;
				}
			} else if (this.chart_importdata[i].gender == 'Tæve') {
				switch (this.chart_importdata[i].race) {
					case ('Golden Retriever'):
						femalelist.splice(2, 0, this.chart_importdata[i].counter)
						break;
					case ('Labrador'):
						femalelist.splice(3, 0, this.chart_importdata[i].counter)
						break;
					case ('Labrador Golden Mix'):
						femalelist.splice(4, 0, this.chart_importdata[i].counter)
						break;
					case ('Puddel'):
						femalelist.splice(5, 0, this.chart_importdata[i].counter)
						break;
					case ('Schæfer'):
						femalelist.splice(6, 0, this.chart_importdata[i].counter)
						break;
					case (''):
						femalelist.splice(1, 0, this.chart_importdata[i].counter)
						break;
				}
			} else {
				emptylist.splice(0, 0, this.chart_importdata[i].counter)
			}
		}

		this.chartData.labels = ['Ingen køn eller race', 'Ingen race data', 'Golden Retriever', 'Labrador', 'Labrador Golden Mix', 'Puddel', 'Schæfer'];
		this.chartData.datasets[0].data = malelist;
		this.chartData.datasets[1].data = femalelist;
		this.chartData.datasets[2].data = emptylist;
		this.renderChart(this.chartData, this.options)
	}
}
</script>