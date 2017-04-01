<template>
    <div class="read-status-full">
        <read-book-pie></read-book-pie>
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
                passedBooks: [{
                    name: '江南皮革厂倒闭之谜',
                    author: '狗狗'
                }]
            }
        },
        components: {
            'read-book-pie': ReadBookPie
        },
        methods: {
            goTo(name) {
                console.log(name, 11)
            }
        }
    }
</script>

<style scoped>
    .read-status-full {
        display: flex;
        flex-direction: column;
        width: 15rem;
        padding: 0 1rem;
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

</style>