<template>
    <div class="full">
        <div class="cover-and-info">
            <img class="cover" :src="book.cover" :style="{ opacity }" :load="opacity = 1">
            <div class="info-and-button">
                <div class="info">
                    <p class="book-name">{{ name }}</p>
                    <p class="author">{{ author }} 著</p>
                    <p>{{ book.description }}</p>
                    <div class="tags">
                        <el-tag type="success" class="tag" v-for="tag of book.category" :key="tag">
                            {{ tag }}
                        </el-tag>
                    </div>
                </div>
                <div class="button-container">
                    <el-button type="primary" icon="search"
                               class="test-button" @click="test"
                    >
                        开始测试
                    </el-button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                name: this.inputName || this.$route.params.name,
                author: this.inputAuthor || this.$route.params.author,
                opacity: 0,
                book: {}
            };
        },
        computed: {
        },
        methods: {
            test() {
                this.$router.push('/quiz');
            },
            getBook() {
                this.$store.dispatch('getBook', {
                    author: this.author,
                    name: this.name
                }).then((book) => {
                    this.book = Object.assign({}, this.book, book);
                }).catch(() => {
                    this.$message.warning('您找的书不存在');
                    this.$router.push('/dashboard');
                });
            }
        },

        created() {
            this.getBook();
        },

        beforeRouteUpdate (to, from, next) {
            this.getBook();
            next();
        },

        watch: {
            inputName: function(val, oldVal) {
                this.name = val;
                this.author = this.inputAuthor;
                this.opacity = 0;
                this.book = {};
                this.getBook();
            }
        },
        props: ['inputName', 'inputAuthor']
    }
</script>

<style scoped>
    .full {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        max-height: 20rem;
        padding: 0 !important;
    }

    .cover {
        width: 15rem;
        height: 20rem;
        object-fit: contain;
        margin: 0 0 1rem 0;
        transition: all .3s;
        background-color: #eef6f6;
    }

    .cover-and-info {
        width: 100%;
        max-width: 40rem;
        height: 100%;
        max-height: 20rem;
        margin: 1rem;
        display: flex;
    }

    .info-and-button {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        margin-left: 1rem;
    }

    .book-name {
        font-size: 2rem;
        font-weight: bold;
        margin: 1rem 0;
    }

    .author {
        color: #03a678;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
    }

    .tag {
        margin: .125rem;
        transition: all .2s;
        cursor: pointer;
    }

    .tag:hover {
        border: 1px solid #03a678;
        background-color: #03a678;
        color: #fff;
    }

    .button-container {
        display: flex;
        flex: 1;
        align-items: flex-end;
        justify-content: flex-end;
    }

    @media (max-width: 600px) {
        .cover {
            width: 50%;
            height: 15rem;
            margin: 0;
        }

        .book-name {
            font-size: 1.5rem;
        }
    }
</style>