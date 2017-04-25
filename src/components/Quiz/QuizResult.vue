<template>
    <div class="full">
        <div class="result">
            <p>{{ score >= 90 ? '恭喜' : '很遗憾' }}，你的得分为 {{ score }} 分，{{ score >= 90 ? '' : '未能' }}通过《{{ $route.params.name }}》的测试。</p>
            <result-radar :chart-data="dataCollection" :updated="scoreUpdated"></result-radar>
        </div>
    </div>
</template>

<script>
    import QuizResultRadar from './QuizResultRadar.vue'

    export default {
        data: function() {
            return {
                score: null,
                pass: false,
                scoreUpdated: false,
                dataCollection: {
                    labels: ['得分', '失分'],
                        datasets: [{
                        data: [0, 1],
                        backgroundColor: [
                            '#2ECC71',
                            '#86E2D5'
                        ],
                        hoverBackgroundColor: [
                            '#2ECC71',
                            '#86E2D5'
                        ]
                    }]
                }
            }
        },
        created() {
            this.$store.dispatch('getScore', {
                author: this.$route.params.author,
                name: this.$route.params.name
            }).then(
                score => {
                    this.score = score;
                    this.$set(this.dataCollection.datasets[0].data, '0', score);
                    this.$set(this.dataCollection.datasets[0].data, '1', 100 - score);
                    this.scoreUpdated = true;
                }
            ).catch(
                () => {
                    this.$message.error('未找到该书成绩');
                    this.$router.push('/dashboard');
                }
            )
        },
        components: {
            'result-radar': QuizResultRadar
        }
    }
</script>

<style scoped>
    .full {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .result {
        display: flex;
        flex-direction: column;
        max-width: 25rem;
        justify-content: center;
        align-items: center;
    }

    p {
        font-size: 1.5rem;
        line-height: 150%;
    }

    @media(max-width: 768px) {
        .result {
            max-width: 90%;
        }
    }
</style>