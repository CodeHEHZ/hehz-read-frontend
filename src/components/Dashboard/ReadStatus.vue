<template>
    <div class="read-status-full">
        <read-book-pie class="read-book-pie" :chart-data="dataCollection" :updated="dataCollectionUpdated"></read-book-pie>
        <div class="bookList table" v-if="passedBooks.length">
            <div class="bookListRow bookListHeader">
                已通过测试书目
            </div>
            <router-link v-for="book of passedBooks" :key="book"
                :to="{ name: 'BookDetail', params: { author: book.author, name: book.name } }">
                <div class="book bookListRow">
                    <span class="link">{{ book.name }}</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import ReadBookPie from './ReadBookPie.vue'

    export default {
        data() {
            return {
                dataCollection: {
                    labels: ['已读书目', '未读书目'],
                    datasets: [{
                        data: [0, 1],
                        backgroundColor: [
                            '#2ECC71',
                            '#86E2D5'
                        ],
                        hoverBackgroundColor: [
                            '#2ECC71',
                            '#86E2D5'
                        ]
                    }]
                },
                dataCollectionUpdated: false
            }
        },
        components: {
            'read-book-pie': ReadBookPie
        },
        computed: {
            passedBooks() {
                return this.$store.state.bookList.filter(
                    book => {
                        for (let item of this.$store.state.readingStatus.filter(book => book.pass)) {
                            if (book._id === item.id)
                                return 1;
                        }
                        return 0;
                    }
                );
            }
        },
        methods: {
            read() {
                return this.$store.state.readingStatus.filter(book => book.pass).length;
            },
            unread() {
                return this.$store.state.bookList.length - this.read();
            }
        },
        mounted() {
            this.$store.dispatch('getReadingStatus').then(
                () => {
                    this.$store.dispatch('getBookList').then(
                        () => {
                            this.$set(this.dataCollection.datasets[0].data, '0', this.read() || 22);
                            this.$set(this.dataCollection.datasets[0].data, '1', this.unread() || 28);
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

    .read-book-pie {
        width: 100%;
        height: 250px;
    }

    .table {
        width: 15rem;
        margin: .65rem 0;
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
        padding: 0 1rem;
        border-bottom: 1px solid rgb(223, 236, 233);
        vertical-align: center;
        height: 2.5rem;
        transition: all .2s;
        text-decoration: none;
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
    }

    a {
        text-decoration: none !important;
        color: #000;
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