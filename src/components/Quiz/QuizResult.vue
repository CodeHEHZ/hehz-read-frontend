<template>
    <div class="full">
        <div class="result">
            <p>恭喜，你的得分为 95 分，通过《卡拉马佐夫兄弟》的测试。</p>
            <result-radar></result-radar>
        </div>
    </div>
</template>

<script>
    import QuizResultRadar from './QuizResultRadar.vue'

    export default {
        data: function() {
            return {
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