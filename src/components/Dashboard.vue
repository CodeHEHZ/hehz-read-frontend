<template>
    <div class="full">
        <div class="center">
            <read-status class="read-status" v-show="readStatusVisible" @go="goTo(book)"></read-status>
            <div class="books-with-title">
                <div class="title">
                    <p>全部书目</p>
                    <el-input
                        placeholder="搜索书名"
                        class="search"
                        icon="search"
                        size="small"
                        v-model="searchContent"
                        :on-icon-click="search">
                    </el-input>
                </div>
                <div class="books clearfix">
                    <lib-book v-for="book in bookList" class="lib-book clearfix"
                              :bookInfo="book" :key="book" @go="goTo(book)"
                    ></lib-book>
                </div>
            </div>
        </div>

        <el-dialog title="书本信息" v-model="dialogBookVisible" @close="closeBookDialog">
            <book-detail :inputName="showBook" :inputAuthor="showAuthor"></book-detail>
        </el-dialog>
    </div>
</template>


<script>
    import ReadStatus from './ReadStatus.vue'
    import LibBook from './LibBook.vue'
    import BookDetail from './BookDetail.vue'

    export default {
        components: {
            'read-status': ReadStatus,
            'lib-book': LibBook,
            'book-detail': BookDetail
        },

        data: function() {
            return{
                bookList: [{
                    name: "卡拉马佐夫兄弟",
                    author: "狗",
                    cover: "/src/assets/covers/cover2.jpg"
                }, {
                    name: "Hotstrip",
                    author: "D. Fense Dragon",
                    cover: "/src/assets/covers/cover1.png"
                }, {
                    name: "他改变了中国",
                    author: "狗狗",
                    cover: "/src/assets/covers/cover2.jpg"
                }, {
                    name: "Hotstrip",
                    author: "D. Fense Dragon",
                    cover: "/src/assets/covers/cover1.png"
                }, {
                    name: "他改变了中国",
                    author: "狗狗",
                    cover: "/src/assets/covers/cover2.jpg"
                }, {
                    name: "Hotstrip",
                    author: "D. Fense Dragon",
                    cover: "/src/assets/covers/cover1.png"
                }],
                searchContent: '',
                dialogBookVisible: false,
                showBook: '',
                showAuthor: ''
            }
        },

        computed: {
            readStatusVisible : function() {
                return this.$cookie.get('group') == 'student'
            }
        },

        methods: {
            search() {
                // doSomething
            },
            goTo(book) {
                this.showBook = book.name
                this.showAuthor = book.author
                window.history.pushState(book.author + book.name, book.name, '/book/' + book.author + '/' + book.name)
                this.dialogBookVisible = true
            },
            closeBookDialog() {
                this.$router.push('/dashboard')
            }
        }
    }
</script>

<style scoped>
    .full {
        display: flex;
        padding: 1rem;
        justify-content: center;
    }

    .center {
        display: flex;
        width: 100%;
        max-width: 60rem;
    }

    .read-status {
        display: flex;
    }

    .books-with-title {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: 1rem;
        /*overflow: auto;*/
    }

    .title {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        width: 100%
    }

    p {
        font-size: 24px;
        margin: 10px;
    }

    .search {
        padding: 0;
        width: 10rem;
        margin: .75rem;
    }

    .books {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: center;
    }

    .lib-book {
        width: 12rem;
        margin: .6rem .3rem;
    }
</style>