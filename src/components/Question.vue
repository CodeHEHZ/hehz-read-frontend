<template>
    <div class="full">
        <div class="content">
            <p>{{ (this.$store.state.questionNumber + 1) + '、' + quiz[question].text }}</p>
            <el-radio-group v-model="radio" @change="select">
                <el-radio v-for="option in quiz[question].answers" :label="option.label">
                    {{ option.answer }}
                </el-radio>
            </el-radio-group>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            this.$store.commit('setQuestion', this.$route.params.id - 1)

            let quiz = this.$store.state.quiz
            return {
                radio: '',
                quiz,
            }
        },
        computed: {
            question: function() {
                this.radio = this.$store.state.answer[this.$store.state.questionNumber] || ''
                return this.$store.state.questionNumber
            }
        },
        methods: {
            select() {
                if (this.radio != '')
                    this.$store.commit('select', {
                        number: this.$store.state.questionNumber,
                        label: this.radio
                    })
            }
        }
    }
</script>

<style scoped>
    .full {
        width: 100%;
        min-height: 20rem;
        display: flex;
        justify-content: center;
    }

    .content {
        width: 30rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .el-radio-group {
        display: flex;
        flex-direction: column;
    }

    .el-radio {
        margin: .5rem;
    }
</style>