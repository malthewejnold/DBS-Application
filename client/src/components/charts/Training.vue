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
						label: "Antal i træning pr. år",
						data: null,
						fill: false,
						borderWidth: 1,
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)',
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
							'rgba(255,99,132,1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
							'rgba(255,99,132,1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)'
						],
					}
				],
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

		this.chart_importdata = (await ChartServices.getTraining()).data
		const year = this.chart_importdata.map(a => a.year)
		const counts = this.chart_importdata.map(a => a.count)

		this.chartData.labels = year;
		this.chartData.datasets[0].data = counts;
		this.renderChart(this.chartData, this.options)

	}
}
</script>