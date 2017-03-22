<template>
    <div class="full">
        <div class="backbook">
            <book-cover
                v-for="(book, index) in bookCoverList"
                :bookInfo="book"
                :key="index"
                :ref="'book-' + index"
                @loaded="bookLoadingCount > 0 ? bookLoadingCount-- : ''"
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
        data: function() {
            let bookCoverList = [],
                bookList = this.$store.state.bookList,
                occupiedBook = []

            bookCoverList = generateBook(bookCoverList, 10)
            setTimeout(this.updateBackground, 500)

            for (let i = 0; i < bookList.length; i++) {
                occupiedBook.push(0)
            }

            return {
                bookCoverList,
                bookLoadingCount: 0,
                bookList,
                occupiedBook
            }
        },
        components: {
            'book-list': BookList,
            'login': Login,
            'book-cover': FrontpageBook
        },
        methods: {
            updateBackground() {
                if (window.innerWidth >= 600) {
                    if (this.bookLoadingCount < 3) {

                        let emptyBook = []

                        for (let i = 0; i < this.bookCoverList.length; i++) {
                            let book = this.$refs["book-" + i][0]
                                ? this.$refs["book-" + i][0].$el
                                : null
                            if (book && isElementInViewport(book) && !(this.bookCoverList[i].name)) {
                                emptyBook.push(i)
                            }
                        }

                        if (emptyBook.length > 0) {
                            for (let i = 0; i < (2 - this.bookLoadingCount); i++) {
                                let index = Math.floor(Math.random() * emptyBook.length)
                                if (index == emptyBook.length) {
                                    index = emptyBook.length - 1
                                }
                                if (this.occupiedBook.includes(0)) {
                                    let temp,
                                        lock = 1
                                    while (lock) {
                                        temp = Math.floor(Math.random() * this.bookList.length)
                                        if (this.occupiedBook[temp] == 0) {
                                            this.$set(this.bookCoverList, emptyBook[index], this.bookList[temp])
                                            this.bookLoadingCount++
                                            this.occupiedBook[temp] = 1
                                            lock = 0
                                        }
                                    }
                                } else {
                                    if (emptyBook.length > 0)
                                        this.$set(this.bookCoverList, emptyBook[index],
                                            this.bookList[Math.floor(Math.random() * this.bookList.length)])
                                }
                                emptyBook.splice(index, 1)
                            }
                        }
                    }
                }
                setTimeout(this.updateBackground, 500)
            }
        }
    }

    function generateBook(bookCoverList, n) {
        for (let i = 0; i < 10 * n; i++) {
            bookCoverList[bookCoverList.length] = {}
        }
        return bookCoverList
    }

    // Originally from http://stackoverflow.com/a/7557433/5628
    function isElementInViewport (el) {
        let rect = el.getBoundingClientRect()

        return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 200
    }
    
</script>

<style scoped>

    .backbook {
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
        position: fixed;
        z-index: 5;
        visibility: visible
    }

    @media (min-width: 4096px), (min-height: 2160px) {

    }

</style>