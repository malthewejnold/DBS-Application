<script>
import { Pie } from 'vue-chartjs';
import ChartServices from '../../services/ChartServices'
export default {
	extends: Pie,
	data() {
		return {
			chart_importdata: {},
			chartData: {
				labels: null,
				datasets: [
					{
						label: "Antal i denne status",
						data: null,
						fill: false,
						borderWidth: 1,
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)'
						],
						borderColor: [
							'rgba(255,99,132,1)',
							'rgba(54, 162, 235, 1)'
						],
					}
				],
			},
			options: {
				legend: {
					display: true
				},
				responsive: true,
				maintainAspectRatio: false
			}
		}
	},
	async mounted() {
		this.chart_importdata = (await ChartServices.getRemovedCauseData()).data
		const removed_cause = this.chart_importdata.map(a => a.removed_cause)
		const counts = this.chart_importdata.map(a => a.counts)

		this.chartData.labels = removed_cause;
		this.chartData.datasets[0].data = counts;
		this.renderChart(this.chartData, this.options)

	}
}
</script>