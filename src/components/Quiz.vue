<template>
    <div class="center" v-loading.fullscreen.lock="fullscreenLoading">
        <div :class="[transition]">
            <router-view></router-view>
        </div>

        <div class="buttons">
            <el-button type="primary" icon="arrow-left" @click="last" :disabled="isLoading || !isLastAvailable">
                上一问
            </el-button>
            <el-button :type="isNextAvailable ? 'primary' : 'success'" @click="next" :disabled="isLoading">
                {{ isNextAvailable ? "下一问" : "提交答卷" }}
                <i :class="[rightIcon]" class="el-icon--right"></i>
            </el-button>
        </div>

        <div class="progress-bar">
            <div class="progress" :style="'width: ' + (submitting ? 100 : progress * 100) + '%'"></div>
        </div>
    </div>
</template>

<script>
    import Question from './Question.vue'

    export default {
        data: function() {
            return {
                transition: '',
                isLoading: false,
                fullscreenLoading: false,
                submitting: false
            }
        },
        components: {
            question: Question,
        },
        computed: {
            isNextAvailable: function() {
                return this.$store.state.questionNumber < this.$store.state.quiz.length - 1
            },
            isLastAvailable: function() {
                return this.$store.state.questionNumber > 0
            },
            progress: function() {
                return (this.$store.state.questionNumber) / this.$store.state.quiz.length
            },
            questionNumber: function() {
                return this.$store.state.questionNumber
            },
            rightIcon: function() {
                return this.isNextAvailable ? 'el-icon-arrow-right' : 'el-icon-check'
            }
        },
        methods: {
            next() {
                if (this.isNextAvailable) {
                    this.transition = 'slide-out-leftward'
                    this.isLoading = true
                    setTimeout(() => {
                        this.$store.commit('nextQuestion')
                        this.transition = 'slide-in-leftward'
                        this.$router.push('/quiz/' + (this.$store.state.questionNumber + 1))
                        this.isLoading = false
                    }, 250)
                } else {

                    this.$confirm(this.submitConfirmationText(), '确认提交', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: this.unansweredQuestion().length == 0 ? 'success' : 'warning'
                    }).then(() => {
                        this.submitting = true
                        this.fullscreenLoading = true
                        setTimeout(() => {
                            this.fullscreenLoading = false
                            this.$router.push('/quiz/result')
                        }, 1000)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
                }
            },
            last() {
                this.transition = 'slide-out-rightward'
                this.isLoading = true
                setTimeout(() => {
                    this.$store.commit('lastQuestion')
                    this.transition = 'slide-in-rightward'
                    this.$router.push('/quiz/' + (this.$store.state.questionNumber + 1))
                    this.isLoading = false
                }, 250)
            },
            unansweredQuestion() {
                let unansweredList = []
                for (let i = 0; i < this.$store.state.quiz.length; i++) {
                    console.log(this.$store.state.answer[i])
                    if (!this.$store.state.answer[i])
                        unansweredList.push(i + 1)
                }
                console.log(unansweredList)
                return unansweredList
            },
            submitConfirmationText() {
                if (this.unansweredQuestion().length == 0)
                    return '您已完成所有问题，确定提交？'
                else
                    return "您还有第 " + this.unansweredQuestion().join(" 题、第 ") + " 题未完成，确定提交？"
            }
        }
    }
</script>

<style scoped>
    .center {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .buttons {
        min-width: 20rem;
        max-width: 25rem;
        display: flex;
        justify-content: space-between;
    }

    .progress-bar {
        width: 100%;
        height: .2rem;
        position: absolute;
        top: 0;
    }

    .progress {
        background-color: #4ecdc4;
        height: 100%;
        transition: width .4s;
    }

    .el-progress-bar__inner {
        transition: width .25s;
    }

    .slide-out-leftward {
        animation-duration: .25s;
        animation-name: slide-out-leftward;
        transition: opacity .25s;
        opacity: 0;
    }

    .slide-in-leftward {
        animation-duration: .25s;
        animation-name: slide-in-leftward;
        transition: opacity .25s;
        opacity: 1;
    }

    @keyframes slide-out-leftward {
        from {
            margin-left: 0;
        }

        to {
            margin-left: -10%;
        }
    }

    @keyframes slide-in-leftward {
        from {
            margin-left: 10%;
        }

        to {
            margin-left: 0;
        }
    }

    .slide-out-rightward {
        animation-duration: .25s;
        animation-name: slide-out-rightward;
        transition: opacity .25s;
        opacity: 0;
    }

    .slide-in-rightward {
        animation-duration: .25s;
        animation-name: slide-in-rightward;
        transition: opacity .25s;
        opacity: 1;
    }

    @keyframes slide-out-rightward {
        from {
            margin-right: 0;
        }

        to {
            margin-right: -10%;
        }
    }

    @keyframes slide-in-rightward {
        from {
            margin-right: 10%;
        }

        to {
            margin-right: 0;
        }
    }
</style>