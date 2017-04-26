<template>
    <div class="full">
        <div class="result">
            <p>{{ score >= 90 ? '恭喜' : '很遗憾' }}，你的得分为 {{ score }} 分，{{ score >= 90 ? '' : '未能' }}通过《{{ $route.params.name }}》的测试。</p>
            <el-progress type="circle" :percentage="score || 0" :stroke-width="15"
                         :status="score >= 90 ? 'success' : ''"></el-progress>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                score: null
            }
        },
        created() {
            this.$store.dispatch('getScore', {
                author: this.$route.params.author,
                name: this.$route.params.name
            }).then(
                score => this.score = score
            ).catch(
                () => {
                    this.$message.error('未找到该书成绩');
                    this.$router.push('/dashboard');
                }
            );
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