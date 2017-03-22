<template>
    <div class="full">
        <div class="backbook">
            <book-cover
                v-for="(book, index) in bookList"
                :bookInfo="book"
                :key="index"
            >

            </book-cover>

        </div>
        <div class="frontlogin">
            <login class="login"></login>
        </div>
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
                return this.$store.state.bookList
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
        background-color: #c8e0cd;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 2;
    }

    .full {
        /*display: flex;*/
        /*flex-direction: column;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        /*flex-grow: 1;*/
        /*width: 100vw;*/
        /*height: 100vh;*/
    }

    .frontlogin {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: fixed;
        z-index: 4;
        visibility: hidden ;
    }

    .login {
        background-color: white;
        border-radius: .25rem;
        /*opacity: .9;*/
        flex-grow: 0;
        /*position: fixed;*/
        z-index: 5;
        visibility: visible
    }

    @media (min-width: 4096px), (min-height: 2160px) {

    }

</style>