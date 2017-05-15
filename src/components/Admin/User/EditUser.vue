<template>
    <div class="full">
        <div class="container">
            <div class="form">
                <p>书名</p>
                <el-input ref="bookName" v-model="bookName" placeholder="Peanuts" @keyup.enter.native="switchFocus('author')" :autofocus="true"></el-input>
            </div>
            <div class="form">
                <p>作者</p>
                <el-input ref="author" v-model="author" placeholder="查尔斯·舒尔茨" @keyup.enter.native="switchFocus('description')"></el-input>
            </div>
            <div class="form">
                <p>简介</p>
                <el-input ref="description" v-model="description" placeholder="查理·布朗，你又输了！" @keyup.enter.native="switchFocus('tag')"></el-input>
            </div>
            <div class="form">
                <p>标签</p>
                <el-input ref="tag" v-model="tagToAdd" placeholder="按下回车以添加标签" @keyup.enter.native="addTag"></el-input>
            </div>
            <div class="form" v-show="tags.length > 0">
                <p></p>
                <transition-group name="tags" tag="div" class="form tags">
                    <el-tag
                        v-for="(tag, index) of tags"
                        :key="tag"
                        :closable="true"
                        :close-transition="true"
                        @close="removeTag(index)"
                        class="tag"
                    >
                        {{ tag }}
                    </el-tag>
                </transition-group>
            </div>
            <div class="submit">
                <el-button @click="createBook">{{ this.$route.name === 'CreateUser' ? '创建用户' : '提交修改' }}</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                bookName: this.inputName || '',
                author: this.inputAuthor || '',
                id: '',
                description: '',
                tags: [],
                tagToAdd: ''
            }
        },
        methods: {
            switchFocus(ref) {
                this.$refs[ref] ? this.$refs[ref].inputSelect() : 0;
            },
            removeTag(index) {
                this.tags.splice(index, 1);
            },
            addTag() {
                if (this.tagToAdd !== '' && this.tags.indexOf(this.tagToAdd) < 0)
                    this.tags.push(this.tagToAdd);
                else if (this.tags.indexOf(this.tagToAdd) > -1)
                    this.$message('此标签已存在');
                this.tagToAdd = '';
            },
            createBook() {
                if (this.bookName === '') {
                    this.$message.error('请输入书名');
                    this.switchFocus('bookName');
                } else if (this.author === '') {
                    this.$message.error('请输入作者名');
                    this.switchFocus('author');
                } else if (this.description === '') {
                    this.$message.error('请输入简介');
                    this.switchFocus('description');
                } else {
                    let postData = {
                        name: this.bookName,
                        author: this.author,
                        category: this.tags,
                        description: this.description,
                        cover: this.imageUrl
                    };

                    if (this.$route.name === 'CreateBook') {
                        this.$http.post(this.$store.state.api + 'book/new', postData, {credentials: true}).then(response => {
                                if (response.status === 201) {
                                    this.bookName = '';
                                    this.author = '';
                                    this.description = '';
                                    this.tags = [];
                                    this.switchFocus('bookName');
                                    this.$message.success('创建成功');
                                }
                            },
                            response => {
                                this.$message.error(response.body.message);
                            });
                    } else {
                        postData.id = this.id;
                        this.$http.put(this.$store.state.api + 'book/' + this.author + '/' +this.bookName,
                            postData, { credentials: true }).then(response => {
                                this.$store.dispatch('getBookList', true).then(() => {
                                    this.$message.success('修改成功');
                                    this.$router.push({ name: 'BookAdmin' });
                                });
                            },
                            response => {
                                this.$message.error(response.body ? response.body.message : '出现了未知的错误');
                            });
                    }
                }
            },
            getUser() {

            }
        },
        created() {
            if (this.$route.name === 'EditBook') {
                this.getBook();
            }
        }
    };
</script>

<style scoped>
    .full {
        display: flex;
        justify-content: center;
    }

    .container {
        width: 100%;
        max-width: 30rem;
        margin: .5rem;
    }

    .form {
        display: flex;
        align-items: center;
    }

    .tags {
        margin: 0 0 .3rem 1rem;
        flex-wrap: wrap;
    }

    .tags-move {
        transition: transform 1s;
    }

    .tag {
        margin-right: .25rem;
        margin-bottom: .25rem;
        transition: all .3s;
        display: inline-block;
    }

    .submit {
        display: flex;
        width: 100%;
        justify-content: flex-end;
    }

    p {
        min-width: 2rem;
    }

    .el-input {
        margin: .3rem 0 .3rem 1rem;
    }

    .tags-enter, .tags-leave-active {
        opacity: 0;
        transform: translateY(30px);
    }
    .tags-leave-active {
        position: absolute;
    }
</style>