<template>
    <div class="center" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="router-view">
            <transition :name="transition" mode="out-in">
                <router-view :key="questionNumber" class="transition"></router-view>
            </transition>
        </div>

        <div class="buttons">
            <div class="button-left">
                <el-button type="primary" icon="arrow-left" @click="last" :disabled="isLoading || !isLastAvailable">
                    上一问
                </el-button>
            </div>
            <div class="button-right">
                <el-button :type="isNextAvailable ? 'primary' : 'success'" @click="next" :disabled="isLoading">
                    {{ isNextAvailable ? "下一问" : "提交答卷" }}
                    <i :class="[rightIcon]" class="el-icon--right"></i>
                </el-button>
            </div>
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
                isLoading: false,
                fullscreenLoading: false,
                submitting: false,
                transition: 'next-question'
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
                    this.transition = 'next-question'
                    this.$store.commit('nextQuestion')
                    this.$router.push('/quiz/' + (this.$store.state.questionNumber + 1))
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
                this.transition = 'last-question'
                this.$store.commit('lastQuestion')
                this.$router.push('/quiz/' + (this.$store.state.questionNumber + 1))
            },
            unansweredQuestion() {
                let unansweredList = []
                for (let i = 0; i < this.$store.state.quiz.length; i++) {
                    console.log(this.$store.state.answer[i])
                    if (!this.$store.state.answer[i])
                        unansweredList.push(i + 1)
                }
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

    .button-left {
        width: 10rem;
        display: flex;
        height: 2.5rem;
        justify-content: flex-start;
    }

    .button-right {
        width: 10rem;
        display: flex;
        height: 2.5rem;
        justify-content: flex-end;
    }

    .progress-bar {
        width: 100%;
        height: .2rem;
        position: fixed;
        top: 0;
        left: 0;
    }

    .progress {
        background-color: #4ecdc4;
        height: 100%;
        transition: width .4s;
    }

    .el-button--success:hover {
        background-color: #13bb11;
        border-color: #13bb11;
    }

    .el-progress-bar__inner {
        transition: width .25s;
    }

    .router-view {
        display: block;
    }

    .transition {
        transition: all .25s;
    }

    .next-question-enter {
        transition: all .25s;
        opacity: 0;
    }

    .next-question-enter-active {
        animation-duration: .25s;
        animation-name: slide-in-leftward;
        transition: all .25s;
        opacity: 1;
    }

    .next-question-leave-active {
        animation-duration: .25s;
        animation-name: slide-out-leftward;
        opacity: 0;
    }

    .last-question-enter {
        transition: all .25s;
        opacity: 0;
    }

    .last-question-enter-active {
        animation-duration: .25s;
        animation-name: slide-in-rightward;
        transition: all .25s;
        opacity: 1;
    }

    .last-question-leave-active {
        animation-duration: .25s;
        animation-name: slide-out-rightward;
        opacity: 0;
    }

    @media(max-width: 768px) {
        .buttons {
            width: 90%;
            min-width: inherit;
        }
    }

    @keyframes slide-out-leftward {
        from {
            transform: translate(0);
        }

        to {
            transform: translate(-10%);
        }
    }

    @keyframes slide-in-leftward {
        from {
            transform: translate(10%);
        }

        to {
            transform: translate(0);
        }
    }

    @keyframes slide-out-rightward {
        from {
            transform: translate(0);
        }

        to {
            transform: translate(10%);
        }
    }

    @keyframes slide-in-rightward {
        from {
            transform: translate(-10%);
        }

        to {
            transform: translate(0);
        }
    }
</style>