<template>
    <div class="full">
        <read-status class="read-status"></read-status>
        <div class="books-with-title">
            <h1>全部书目</h1>
            <div class="books">
                <lib-book class="lib-book" :bookInfo="tempInfo"></lib-book>
                <lib-book class="lib-book" :bookInfo="tempInfo"></lib-book>
                <lib-book class="lib-book" :bookInfo="tempInfo"></lib-book>
                <lib-book class="lib-book" :bookInfo="tempInfo"></lib-book>
                <lib-book class="lib-book" :bookInfo="tempInfo"></lib-book>
                <lib-book class="lib-book" :bookInfo="tempInfo"></lib-book>
                <lib-book class="lib-book" :bookInfo="tempInfo"></lib-book>
                <lib-book class="lib-book" :bookInfo="tempInfo"></lib-book>
            </div>
        </div>
    </div>
</template>

<script>
    import ReadStatus from './ReadStatus.vue'
    import LibBook from './LibBook.vue'
    export default {
        components: {
            'read-status': ReadStatus,
            'lib-book': LibBook
        },

        data: function() {
            return{
                tempInfo: {
                    bookName: "《他改变了中国》",
                    author: "狗狗",
                    imgUrl: "/src/assets/covers/cover2.jpg",
                    ref: null
                }
            }
        }


    }
</script>

<style scoped>
    .full {
        display: flex;
        flex-direction: row;
        padding: 1rem;
        padding-top: 4rem;
    }

    .read-status {
        display: flex;
    }

    .books-with-title {
        display: flex;
        flex-direction: column;
        min-height: 99vh;
    }

    h1 {
        width: 100%
    }

    .books{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;
    }

    .lib-book {
        display: flex;
    }


</style>