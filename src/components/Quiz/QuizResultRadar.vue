<script>
    import { Pie, mixins } from 'vue-chartjs';
    const { reactiveProp } = mixins;

    export default Pie.extend({
        mixins: [reactiveProp],
        props: ['scoreUpdated'],
        data: function() {
            return {
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
            this.renderChart(this.chartData, this.options);
        },
        watch: {
            'updated': function() {
                this._chart.update();
            }
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