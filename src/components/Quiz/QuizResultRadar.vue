<script>
    import { Pie, mixins } from 'vue-chartjs';
    const { reactiveProp } = mixins;

    export default Pie.extend({
        mixins: [reactiveProp],
        props: ['updated'],
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
        methods: {
            update() {
                this._chart.update();
            }
        },
        mounted () {
            this.renderChart(this.chartData, this.options);
        },
        watch: {
            'updated': function() {
                this.update();
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