<script>
    import { Pie } from 'vue-chartjs'

    export default Pie.extend({
        props: ['read', 'unread'],
        data: function() {
            return {
                datacollection: {
                    labels: ['已读书目', '未读书目'],
                    datasets: [{
                        data: [this.read || 28, this.unread || 22],
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