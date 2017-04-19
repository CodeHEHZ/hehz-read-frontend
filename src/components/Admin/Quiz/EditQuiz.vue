<template>
    <div class="full">
        <div class="container">
            <h2>《{{ $route.params.name }}》题库</h2>
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
                <el-input :ref="option.ref" v-model="option.text" :placeholder="option.placeholder"
                          @keyup.enter.native="switchFocus(option.next)"></el-input>
            </div>
            <el-radio-group v-model="correctAnswer" size="large" class="radio-group">
                <el-radio label="A">选项 A</el-radio>
                <el-radio label="B">选项 B</el-radio>
                <el-radio label="C">选项 C</el-radio>
                <el-radio label="D">选项 D</el-radio>
            </el-radio-group>
            <div class="submit-container">
                <el-button type="primary" @click="createQuestion">创建题目</el-button>
            </div>

            <el-table :data="existingQuestions" class="existing-questions">
                <el-table-column type="expand">
                    <template scope="props">
                        <el-form label-position="left" class="table-expand">
                            <el-form-item v-for="label of ['A', 'B', 'C', 'D']" :label="label" key="props.row.options[label]">
                                <span>{{ props.row.options[label] }}</span>
                            </el-form-item>
                            <el-form-item label="正确答案">
                                <span>{{ props.row.correctAnswer }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="70px"
                    prop="index"
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
                ref: 'A',
                text: '',
                placeholder: '陀思妥耶夫斯基',
                next: 'B'
            }, {
                ref: 'B',
                text: '',
                placeholder: '托尔斯泰斯基',
                next: 'C'
            }, {
                ref: 'C',
                text: '',
                placeholder: '兔斯基',
                next: 'D'
            }, {
                ref: 'D',
                text: '',
                placeholder: '老司机',
                next: 'last'
            }];

            return {
                name: '嗷嗷',
                question: '',
                defaultOptions,
                options: defaultOptions,
                correctAnswer: null,
                book: {},
                existingQuestions: [{
                    question: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                    options: {
                        A: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                        B: '啊啊啊啊',
                        C: '啊啊啊啊',
                        D: '啊啊啊啊'
                    },
                    correctAnswer: 'A',
                    index: 1
                }]
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
                    for (let option of this.options) {
                        if (option.text === '') {
                            this.$message.error('请输入选项');
                            this.switchFocus(option.ref);
                            break;
                        }
                    }

                    if (!this.correctAnswer) {

                    }
                }
            },
            editQuestion(question) {
                console.log(question);
            }
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
        margin: 0 0 1rem 0;
        font-family: Arial, "Lucida Sans", "Lucida Sans Regular", "SimHei", "黑体", "STHeiti", "华文黑体", serif;
    }
</style>