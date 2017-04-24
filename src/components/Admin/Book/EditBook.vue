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
            <el-upload
                    class="cover-uploader"
                    :action="$store.state.uploadUrl"
                    name="file"
                    :drag="true"
                    :show-file-list="false"
                    :on-progress="handleCoverUploading"
                    :on-success="handleCoverSuccess"
                    :before-upload="beforeCoverUpload">
                <img v-if="image" :src="image" class="cover" :style="'opacity: ' + imageLoaded" @load="imageLoaded = 1">
                <i v-else class="el-icon-plus cover-uploader-icon"> {{ uploading ? '正在上传' : '上传封面' }}</i>
            </el-upload>
            <div class="submit">
                <el-button @click="createBook">{{ this.$route.name === 'CreateBook' ? '创建书本' : '提交编辑' }}</el-button>
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
                tagToAdd: '',
                image: null,
                imageUrl: null,
                imageLoaded: 0,
                uploading: false
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
            handleCoverUploading() {
                this.uploading = true;
            },
            handleCoverSuccess(res, file) {
                this.image = URL.createObjectURL(file.raw);
                this.imageUrl = this.$store.state.static + res.key;
                this.uploading = false;
            },
            beforeCoverUpload(file) {
                let isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                let isLt2M = file.size / 1024 / 1024 < 5;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 jpg 或 png 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 5MB!');
                }
                if (isJPG && isLt2M) {
                    this.image = null;
                    this.imageUrl = null;
                }
                return isJPG && isLt2M;
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
                } else if (!this.image) {
                    this.$message.error('请上传封面图');
                    this.switchFocus('image');
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
                                this.imageUrl = null;
                                this.image = null;
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
            getBook() {
                this.$store.dispatch('getBook', {
                    author: this.$route.params.author,
                    name: this.$route.params.name
                }).then(book => {
                    this.image = book.cover;
                    this.bookName = book.name;
                    this.author = book.author;
                    this.tags = book.category || [];
                    this.description = book.description;
                    this.id = book._id;
                });
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

    .cover-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: .5rem;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 15rem;
        height: 20rem;
        margin: .3rem 0 .3rem 0;
    }

    .cover-uploader:hover {
        border-color: #03a678;
    }

    .cover-uploader-icon {
        font-size: 2rem;
        color: #8c939d;
        width: 100%;
        height: 100%;
        line-height: 20rem;
        text-align: center;
    }

    .cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all .3s;
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