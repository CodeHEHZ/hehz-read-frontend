<template>
    <div class="read-status-full">
        <el-progress type="circle"
                     :percentage="Math.round(((passedBooks.length / $store.state.bookList.length) || 0) * 100)"
                     :stroke-width="10"
        >
        </el-progress>
        <div class="bookList table" v-if="passedBooks.length">
            <div class="bookListRow bookListHeader">
                <span>已通过测试书目</span>
                <div @click="() => { showPassedBooks = !showPassedBooks }" class="toggle-button">
                    <el-tag v-show="passedBooks" class="count-tag"> {{!passedBooks || passedBooks.length }} </el-tag>
                    <i :class="showPassedBooks ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
                </div>
            </div>
            <div v-for="(book, index) of passedBooks" :key="book" v-show="showPassedBooks"
                @click="goTo(book)">
                <div class="book bookListRow">
                    <span>{{ book.name }}</span>
                    <el-tag type="gray" v-if="book.score">{{ book.score + ' 分' }}</el-tag>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dataCollection: {
                    labels: ['已读书目', '未过关书目', '未测书目'],
                    datasets: [{
                        data: [0, 0, 1],
                        backgroundColor: [
                            '#019875',
                            '#2ECC71',
                            '#86E2D5'
                        ],
                        hoverBackgroundColor: [
                            '#019875',
                            '#2ECC71',
                            '#86E2D5'
                        ]
                    }]
                },
                dataCollectionUpdated: false,
                showPassedBooks: true
            }
        },
        computed: {
            passedBooks() {
                let books = this.$store.state.bookList.filter(
                    book => {
                        for (let item of this.$store.state.readingStatus.filter(book => book.pass)) {
                            if (book._id === item.id)
                                return 1;
                        }
                        return 0;
                    }
                );
                for (let i = 0; i < books.length; i++) {
                    this.$store.dispatch('getScore', {
                        author: books[i].author,
                        name: books[i].name
                    }).then(
                        score => {
                            books[i].score = score;
                        }
                    );
                }
                return books;
            }
        },
        methods: {
            read() {
                return this.$store.state.readingStatus.filter(book => book.pass).length;
            },
            failed() {
                return this.$store.state.readingStatus.length - this.read();
            },
            unread() {
                return this.$store.state.bookList.length - this.read() - this.failed;
            },
            goTo(book) {
                this.$store.commit('setTempBook', book);
                this.$emit('go');
            }
        },
        mounted() {
            this.$store.dispatch('getReadingStatus').then(
                () => {
                    this.$store.dispatch('getBookList').then(
                        () => {
                            this.$set(this.dataCollection.datasets[0].data, '0', this.read() || 0);
                            this.$set(this.dataCollection.datasets[0].data, '1', this.failed() || 0);
                            this.$set(this.dataCollection.datasets[0].data, '2', this.unread() || 50);
                            this.dataCollectionUpdated = true;
                        }
                    );
                }
            );
        }
    }
</script>

<style scoped>
    .read-status-full {
        display: flex;
        flex-direction: column;
        width: 15rem;
        padding: 1rem;
    }

    .table {
        width: 15rem;
        margin: .65rem 0;
    }

    .count-tag {
        width: 24px;
        height: 24px;
        text-align: center;
        border-radius: 12px;
    }

    .bookList {
        width: 100%;
        line-height: 1.125rem;
        text-align: left;
        font-size: .875rem;
        border: 1px solid rgb(223, 236, 233);
    }

    .bookListRow {
        display: flex;
        align-items: center;
        padding: .25rem 1rem;
        border-bottom: 1px solid rgb(223, 236, 233);
        vertical-align: center;
        min-height: 2.5rem;
        transition: all .2s;
        text-decoration: none;
        justify-content: space-between;
        cursor: pointer;
    }

    .bookListRow:last-child {
        border-bottom: none;
    }

    .book:hover {
        background-color: rgba(238, 246, 246, .3);
    }

    .bookListHeader {
        background-color: rgb(238, 246, 246);
        font-weight: bold;
        display: flex;
        justify-content: space-between;
    }

    .toggle-button {
        cursor: pointer;
    }

    a {
        text-decoration: none !important;
        color: #000;
    }

    i {
        color: rgb(131, 165, 160);
        margin-left: .5rem;
    }

    @media(max-width: 600px) {
        .read-status-full {
            width: 90%;
        }

        .table {
            width: 100%;
            margin: 0;
        }

        .read-book-pie {
            display: none;
        }
    }

</style>