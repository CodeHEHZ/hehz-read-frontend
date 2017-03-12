<script>
    import { Radar } from 'vue-chartjs'

    export default Radar.extend({
        data: function() {
            return {
                datacollection: {
                    labels: ["创作背景", "故事背景", "小说情节", "小说内涵", "人物理解"],
                    datasets: [{
                        label: "平均分",
                        backgroundColor: "rgba(179,181,198,0.2)",
                        borderColor: "rgba(179,181,198,1)",
                        pointBackgroundColor: "rgba(179,181,198,1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(179,181,198,1)",
                        data: [94, 99, 96, 97, 95]
                    },{
                        label: "你的得分",
                        backgroundColor: "rgba(255,99,132,0.2)",
                        borderColor: "rgba(255,99,132,1)",
                        pointBackgroundColor: "rgba(255,99,132,1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(255,99,132,1)",
                        data: [91, 95, 100, 95, 90]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    startAngle: 30,
                    scale: {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            }
        },
        mounted () {
            this.renderChart(this.datacollection, this.options)
        }
    })
</script>

<style scoped>
    .full {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
    }
</style>