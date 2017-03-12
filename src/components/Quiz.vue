<template>
    <div class="center">
        <div :class="[transition]">
            <router-view></router-view>
        </div>

        <div class="buttons">
            <el-button type="primary" icon="arrow-left" @click="last" :disabled="isLoading || isLastAvailable">
                上一问
            </el-button>
            <el-button type="primary" @click="next" :disabled="isLoading || isNextAvailable">
                下一页
                <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
        </div>

        <div class="progress-bar">
            <div class="progress" :style="'width: ' + progress * 100 + '%'"></div>
        </div>
    </div>
</template>

<script>
    import Question from './Question.vue'

    export default {
        data: function() {
            return {
                transition: '',
                isLoading: false
            }
        },
        components: {
            question: Question,
        },
        computed: {
            isNextAvailable: function() {
                return !(this.$store.state.questionNumber < this.$store.state.quiz.length - 1)
            },
            isLastAvailable: function() {
                return !(this.$store.state.questionNumber > 0)
            },
            progress: function() {
                return (this.$store.state.questionNumber) / this.$store.state.quiz.length
            }
        },
        methods: {
            next() {
                this.transition = 'slide-out-leftward'
                this.isLoading = true
                setTimeout(() => {
                    this.$store.commit('nextQuestion')
                    this.transition = 'slide-in-leftward'
                    this.$router.push('/quiz/' + (this.$store.state.questionNumber + 1))
                    this.isLoading = false
                }, 250)
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
        max-width: 20rem;
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