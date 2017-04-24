<template>
    <div class="full">
        <div class="result">
            <p>{{ score >= 90 ? '恭喜' : '很遗憾' }}，你的得分为 {{ score }} 分，{{ score >= 90 ? '' : '未能' }}通过《{{ $route.params.name }}》的测试。</p>
            <result-radar :score="score"></result-radar>
        </div>
    </div>
</template>

<script>
    import QuizResultRadar from './QuizResultRadar.vue'

    export default {
        data: function() {
            return {
                score: this.$store.state.tempScore,
                pass: false
            }
        },
        created() {
            this.$store.commit('setTempScore', null);
            if (!this.score && this.score !== 0) {
                this.$router.push('/dashboard');
                this.$message.error('未找到该书的测试成绩');
            }
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