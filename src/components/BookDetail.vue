<template>
    <div class="full">
        <div class="cover-and-info">
            <img class="cover" :src="cover">
            <div class="info-and-button">
                <div class="info">
                    <p class="book-name">{{ name }}</p>
                    <p>{{ author }} 著</p>
                    <div class="tags">
                        <el-tag type="success" class="tag">标签四</el-tag><el-tag type="success" class="tag">标签四</el-tag>
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
                author: this.inputAuthor || this.$route.params.author
            }
        },
        computed: {
            book() {
                return this.$store.state.bookList.filter(bookItem => {
                    return bookItem.name == this.name && bookItem.author == this.author
                })[0]
            },
            cover() {
                return this.book ? this.book.url : ''
            }
        },
        methods: {
            test() {
                this.$router.push('/quiz')
            }
        },

        created() {
            this.$store.dispatch('getBook', {
                author: this.$route.params.author,
                name: this.$route.params.name
            })
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
</style>