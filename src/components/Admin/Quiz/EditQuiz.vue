<template>
    <div class="full">
        <div class="container">
            <div class="top">
                <h2>《{{ $route.params.name }}》题库</h2>
                <el-tag :type="open ? null : 'gray'">{{ open ? '已开放' : (open === false ? '未开放' : '查询中') }}</el-tag>
            </div>
            <div class="form">
                <p>题目</p>
                <el-input
                    ref="question"
                    @keyup.enter.native="switchFocus('A')"
                    :autofocus="true"
                    placeholder="《卡拉马佐夫兄弟》的作者是"
                    v-model="question">
                </el-input>
            </div>
            <div class="form" v-for="option of options">
                <p>选项 {{ option.ref }}</p>
                <el-input :ref="option.label" v-model="option.text" :placeholder="option.placeholder"
                          @keyup.enter.native="switchFocus(option.next)"></el-input>
            </div>
            <el-radio-group v-model="correctAnswer" size="large" class="radio-group">
                <el-radio label="A">选项 A</el-radio>
                <el-radio label="B">选项 B</el-radio>
                <el-radio label="C">选项 C</el-radio>
                <el-radio label="D">选项 D</el-radio>
            </el-radio-group>
            <div class="submit-container">
                <el-button @click="openBook">开放测试</el-button>
                <el-button type="primary" @click="createQuestion">创建题目</el-button>
            </div>

            <el-table :data="existingQuestions" class="existing-questions" border>
                <el-table-column type="expand">
                    <template scope="props">
                        <el-form label-position="left" class="table-expand">
                            <el-form-item v-for="label of ['A', 'B', 'C', 'D']" :label="label" key="props.row.option[label]">
                                <span>{{ props.row.option[label] }}</span>
                            </el-form-item>
                            <el-form-item label="正确答案">
                                <span>{{ props.row.answer }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label="题号"
                    width="70px"
                    prop="index"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    label="现有题目"
                    prop="question"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="80px"
                    align="center"
                >
                    <template scope="scope">
                        <el-button type="text" @click="editQuestion(scope.row)">
                            编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            let defaultOptions = [{
                label: 'A',
                text: '',
                placeholder: '陀思妥耶夫斯基',
                next: 'B'
            }, {
                label: 'B',
                text: '',
                placeholder: '托尔斯泰斯基',
                next: 'C'
            }, {
                label: 'C',
                text: '',
                placeholder: '兔斯基',
                next: 'D'
            }, {
                label: 'D',
                text: '',
                placeholder: '老司机',
                next: 'last'
            }];

            return {
                author: this.$route.params.author,
                name: this.$route.params.name,
                open: null,
                question: '',
                defaultOptions,
                options: defaultOptions,
                correctAnswer: null,
                book: {},
                existingQuestions: []
            }
        },
        methods: {
            switchFocus(ref) {
                this.$refs[ref]
                    ? (this.$refs[ref].inputSelect ? this.$refs[ref].inputSelect() : this.$refs[ref][0].inputSelect())
                    : 0;
            },
            createQuestion() {
                if (this.question === '') {
                    this.$message.error('请输入题目');
                    this.switchFocus('question');
                } else {
                    let temp = 0;
                    for (let option of this.options) {
                        if (option.text === '') {
                            this.$message.error('请输入选项');
                            this.switchFocus(option.label);
                            temp = 1;
                            break;
                        }
                    }

                    if (!this.correctAnswer && !temp) {
                        this.$message.error('请选择正确选项');
                    } else {

                        let option = {};
                        for (let item of this.options) {
                            option[item.label] = item.text;
                        }

                        let postData = {
                            author: this.author,
                            name: this.name,
                            question: this.question,
                            option,
                            answer: this.correctAnswer
                        };

                        this.$http.post(this.$store.state.api + 'question/new', postData, { credentials: true }).then(
                            () => {
                                this.question = '';
                                for (let i = 0; i < 4; i++) {
                                    this.$set(this.options[i], 'text', '');
                                }
                                this.correctAnswer = null;
                                this.switchFocus('question');
                                this.$message.success('创建成功');
                                this.updateQuestionCollection()
                            },
                            response => {
                                this.$message.error(response.body.message);
                            }
                        );
                    }
                }
            },
            editQuestion(question) {
                console.log(question);
            },
            updateQuestionCollection() {
                this.$http.get(this.$store.state.api + 'book/' + this.$route.params.author + '/' + this.$route.params.name + '/question',
                    { credentials: true }).then(
                    response => {
                        let existingQuestions = response.body.question;
                        for (let i = 0; i < existingQuestions.length; i++) {
                            existingQuestions[i].index = i + 1;
                        }
                        this.existingQuestions = existingQuestions;
                    }
                );
            },
            getBookOpenness() {
                this.$store.dispatch('getBook', {
                    author: this.$route.params.author,
                    name: this.$route.params.name,
                    forceRefresh: true
                }).then(
                    book => {
                        this.open = book.open;
                    }
                );
            },
            openBook() {
                this.$http.get(this.$store.state.api + 'book/' + this.$route.params.author + '/' + this.$route.params.name + '/open',
                    { credentials: true }).then(
                    response => {
                        this.$message.success('开放成功');
                        this.getBookOpenness();
                    },
                    response => {
                        this.$message.error(response.body.message);
                    }
                );
            }
        },
        mounted() {
            this.updateQuestionCollection();
            this.getBookOpenness();
        }
    }
</script>

<style scoped>
    .full {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: .5rem;
    }

    .container {
        width: 100%;
        max-width: 40rem;
        margin: .5rem;
    }

    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .form {
        display: flex;
        align-items: flex-start;
    }

    .radio-group {
        display: flex;
        justify-content: space-between;
        margin-top: .5rem;
    }

    .submit-container {
        display: flex;
        justify-content: flex-end;
        margin-top: .5rem;
    }

    .existing-questions {
        margin-top: 1rem;
    }

    .table-expand {
        font-size: 0;
    }
    .table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
    }

    .el-input, .el-textarea {
        margin: 8px 0 8px 1rem;
    }

    p {
        min-width: 3rem;
    }

    p.textarea {
        margin-top: 13px;
        line-height: 150%;
    }

    h2 {
        font-family: Arial, "Lucida Sans", "Lucida Sans Regular", "SimHei", "黑体", "STHeiti", "华文黑体", serif;
    }
</style>