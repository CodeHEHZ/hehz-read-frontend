<template>
    <div class="full">
        <read-status class="read-status" v-show="readStatusVisible"></read-status>
        <div class="books-with-title">
            <div class="title">
                <p>全部书目</p>
                <el-input
                    placeholder="搜索书名"
                    class="search"
                    icon="search"
                    size="small"
                    v-model="input2"
                    :on-icon-click="handleIconClick">
                </el-input>
            </div>
            <div class="books">
                <lib-book v-for="book in bookList" class="lib-book" :bookInfo="book"></lib-book>
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
//                tempInfo: {
//                    bookName: "《他改变了中国》",
//                    author: "狗狗",
//                    imgUrl: "/src/assets/covers/cover2.jpg",
//                    ref: null
//                },

                bookList: [{
                    name: "《他改变了中国》",
                    author: "狗狗",
                    cover: "/src/assets/covers/cover2.jpg",
                }, {
                    name: "《Hotstrip》",
                    author: "D. Fense Dragon",
                    cover: "/src/assets/covers/cover1.png",
                }]

            }
        },

        computed: {
            readStatusVisible : function() {
                console.log(this.$cookie.get('group'))
                return this.$cookie.get('group') == 'student'
            }
        }


    }
</script>

<style scoped>
    .full {
        display: flex;
        flex-direction: row;
        padding: 1rem;
        padding-top: 3rem;
    }

    .read-status {
        display: flex;
    }

    .books-with-title {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        min-height: 99vh;
        min-width: 288px;
        padding: 1.1rem;
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
        width: 150px;
        margin: 10px;
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