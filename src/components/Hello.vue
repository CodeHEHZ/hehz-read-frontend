<template>
    <div class="full">
        <div class="backbook">
            <h1>Hello~</h1>
            <book-cover v-for="book in bookList"
                :bookInfo="book"
                :key="book.name"
            >

            </book-cover>


        </div>
            <login  class="login"></login>

    </div>
</template>

<script>

    import BookList from './BookList.vue'
    import Login from './Login.vue'
    import FrontpageBook from './FrontpageBook.vue'

    export default {
        components: {
            'book-list': BookList,
            'login': Login,
            'book-cover': FrontpageBook
        },



        computed: {
            bookList() {
                console.log(this.$store.state.booklist[0].name)
                return this.$store.state.booklist
            }
//            bookInfoRandom: function() {
//                var Arr=this.bookInfo;
//                //copied from http://zpz.name/562/
//                var iLength = aArr.length;
//                var i = iLength;
//                var mTemp;
//                var iRandom;
//
//                while(i--){
//                    if(i !== (iRandom = Math.floor(Math.random() * iLength))){
//                        mTemp = aArr[i];
//                        aArr[i] = aArr[iRandom];
//                        aArr[iRandom] = mTemp;
//                    }
//                }
//                return aArr;
//                return this.bookInfo;
            }
    }
    
    
</script>

<style scoped>

    .backbook {
        display: flex;
        flex-grow: 1;
        width: 100%;
        height: 100%;
        /*z-index: 1;*/
    }

    .full {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
    }

    .login {
        background-color: white;
        opacity: .9;
        flex-grow: 0;
        position: fixed;
    }

    @media (min-width: 4096px), (min-height: 2160px) {

    }

</style>