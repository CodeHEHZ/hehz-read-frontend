<script>
    import { Pie } from 'vue-chartjs'

    export default Pie.extend({
        props: ['score'],
        data: function() {

            return {
                datacollection: {
                    labels: ['得分', '失分'],
                    datasets: [{
                        data: (this.score || this.score === 0) ? [this.score, 100 - this.score] : [90, 10],
                        backgroundColor: [
                            '#2ECC71',
                            '#86E2D5'
                        ],
                        hoverBackgroundColor: [
                            '#2ECC71',
                            '#86E2D5'
                        ]
                    }]
                },
                options: {
                    rotation: 30,
                    animation: {
                        animateRotate: true,
                        animateScale: true
                    }
                }
            }
        },
        mounted () {
            this.renderChart(this.datacollection, this.options);
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