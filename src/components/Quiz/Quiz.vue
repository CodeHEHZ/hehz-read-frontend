<template>
    <div class="center"
         v-loading.fullscreen.lock="fullscreenLoading"
         element-loading-text="正在提交答卷"
    >
        <div class="router-view">
            <transition :name="transition" mode="out-in">
                <router-view :key="questionNumber" class="transition"></router-view>
            </transition>
        </div>

        <span class="time" v-show="deadline">剩余时间： {{ time }}</span>

        <div class="buttons"  v-show="quiz.length > 0">
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

        <div class="progress-button-set">
            <button v-for="(question, index) in quiz"
                    :class="['progress-button', progressButtonActive(index), progressButtonSelected(index)]"
                    @click="jumpTo(index)"
            >
                {{ index + 1 }}
            </button>
        </div>

        <div class="progress-bar">
            <div class="progress" :style="'width: ' + (submitting ? 100 : progress * 100) + '%'"></div>
        </div>
    </div>
</template>

<script>
    import Question from './Question.vue';

    export default {
        data: function() {
            return {
                isLoading: false,
                fullscreenLoading: false,
                submitting: false,
                transition: 'next-question',
                quiz: [],
                deadline: null,
                time: ''
            }
        },
        components: {
            question: Question
        },
        computed: {
            isNextAvailable: function() {
                return this.$store.state.questionNumber < this.$store.state.quiz.length - 1;
            },
            isLastAvailable: function() {
                return this.$store.state.questionNumber > 0;
            },
            progress: function() {
                return (this.$store.state.questionNumber) / this.$store.state.quiz.length;
            },
            questionNumber: function() {
                return this.$store.state.questionNumber;
            },
            rightIcon: function() {
                return this.isNextAvailable ? 'el-icon-arrow-right' : 'el-icon-check';
            },

        },
        methods: {
            next() {
                if (this.isNextAvailable) {
                    this.isLoading = true;
                    this.transition = 'next-question';
                    this.$store.commit('nextQuestion');
                    this.$router.push({
                        name: 'Question',
                        params: {
                            id: this.$store.state.questionNumber + 1
                        }
                    });
                    setTimeout(() => { this.isLoading = false }, 400);
                } else {
                    this.$confirm(this.submitConfirmationText(), '确认提交', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: this.unansweredQuestion().length === 0 ? 'success' : 'warning'
                    }).then(() => {
                        this.submitQuiz();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消提交'
                        });
                    });
                }
            },
            last() {
                this.isLoading = true;
                this.transition = 'last-question';
                this.$store.commit('lastQuestion');
                this.$router.push({
                    name: 'Question',
                    params: {
                        id: this.$store.state.questionNumber + 1
                    }
                });
                setTimeout(() => { this.isLoading = false }, 400);
            },
            jumpTo(index) {
                if (index !== this.questionNumber) {
                    this.isLoading = true;
                    this.transition = this.$route.params.id - 1 > index
                        ? 'last-question'
                        : 'next-question';
                    this.$store.commit('setQuestion', index);
                    this.$router.push({
                        name: 'Question',
                        params: {
                            id: this.$store.state.questionNumber + 1
                        }
                    });
                    setTimeout(() => {
                        this.isLoading = false
                    }, 400)
                }
            },
            unansweredQuestion() {
                let unansweredList = [];
                for (let i = 0; i < this.$store.state.quiz.length; i++) {
                    if (!this.$store.state.answer[i])
                        unansweredList.push(i + 1)
                }
                return unansweredList
            },
            submitConfirmationText() {
                if (this.unansweredQuestion().length === 0)
                    return '您已完成所有问题，确定提交？';
                else
                    return "您还有第 " + this.unansweredQuestion().join(" 题、第 ") + " 题未完成，确定提交？"
            },
            progressButtonActive(index) {
                return this.$route.params.id - 1 === index
                    ? 'progress-button-active'
                    : ''
            },
            progressButtonSelected(index) {
                if (this.$store.state.visited[index]) {
                    return this.$store.state.answer[index]
                        ? 'progress-button-selected'
                        : 'progress-button-missed';
                } else
                    return '';
            },
            timeLeft() {
                if (!this.deadline) {
                    this.time = null;
                } else {
                    let second = Math.floor((this.deadline - Date.now()) / 1000),
                        minute = Math.floor(second / 60);
                    second %= 60;
                    this.time = minute + ' 分 ' + second + ' 秒';
                    if (this.deadline - Date.now() < 0) {
                        this.submitQuiz();
                    }
                }
            },
            submitQuiz() {
                this.submitting = true;
                this.fullscreenLoading = true;
                if (this.$store.state.quizInfo.id) {
                    let postData = {
                        quiz: this.$store.state.quizInfo.id,
                        answer: this.$store.state.answer
                    };
                    this.$http.post(this.$store.state.api + 'book/' + this.$route.params.author + '/' + this.$route.params.name + '/quiz',
                        postData, { credentials: true }).then(
                        response => {
                            this.$store.dispatch('getReadingStatus', true).then(
                                () => {
                                    this.submitting = false;
                                    this.fullscreenLoading = false;
                                    this.$router.push({
                                        name: 'QuizResult',
                                        params: {
                                            author: this.$route.params.author,
                                            name: this.$route.params.name
                                        }
                                    });
                                    this.$store.commit('cleanQuizInfo');
                                    this.$store.commit('setTempScore', response.body.score);
                                }
                            ).catch(
                                response => {
                                    this.submitting = false;
                                    this.fullscreenLoading = false;
                                    this.$message.error(response.body.message);
                                    this.$store.commit('cleanQuizInfo');
                                    this.$store.commit('setScore', response.body.score);
                                }
                            );
                        },
                        response => {
                            this.submitting = false;
                            this.fullscreenLoading = false;
                            this.$message.error(response.body.message);
                            this.$router.push('/dashboard');
                            this.$store.commit('cleanQuizInfo');
                        }
                    );
                }
            }
        },
        beforeMount() {
            this.$store.dispatch('getQuiz', {
                name: this.$route.params.name,
                author: this.$route.params.author
            }).then(
                quiz => {
                    this.quiz = quiz;
                    if (this.$route.params.id > this.quiz.length)
                        this.jumpTo(0);
                    this.deadline = this.$store.state.quizInfo.deadline;
                }
            ).catch(
                response => {
                    this.$message.error(response.body.message);
                    this.$router.push('/dashboard');
                }
            );

            let updateTime = () => {
                setTimeout(() => {
                    this.timeLeft();
                    if (this.$route.name === 'Question' || this.$route.name === 'Quiz')
                        updateTime();
                }, 500);
            };

            updateTime();
        },
        watch: {
            '$store.state.quizInfo.deadline': function(val) {
                this.deadline = val;
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

    .time {
        position: absolute;
        top: 0;
        color: #03a678;
        margin: .5rem;
        min-width: 10rem;
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

    .progress-button-set {
        margin-top: 1rem;
        display: flex;
        flex-wrap: wrap;
        max-width: 23rem;
        justify-content: center;
    }

    .progress-button {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 1px solid rgb(191, 217, 212);
        margin: .15rem;
        background-color: rgb(238, 246, 246);
        color: #03a678;
        transition: all .25s;
        outline: 0;
        cursor: pointer;
        font-size: .9rem;
        padding: 0;
    }

    .progress-button:hover {
        background-color: #35b893 !important;
        color: #fff !important;
    }

    .progress-button-active {
        background-color: #03a678 !important;
        border: none;
        border-radius: 25%;
        color: #fff;
    }

    .progress-button-selected {
        background-color: #13ce66;
        color: #fff;
    }

    .progress-button-missed {
        background-color: #f7ba2a;
        border: none;
        color: #fff;
    }

    .progress-bar {
        width: 100%;
        height: .2rem;
        position: fixed;
        top: 0;
        left: 0;
    }

    .progress {
        background-color: #03a678;
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