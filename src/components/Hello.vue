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
            <typer
                :text='slogans'
                :repeat='Infinity'
                :shuffle='true'
                initial-action='typing'
                :pre-type-delay='400'
                :type-delay='100'
                :pre-erase-delay='2000'
                :erase-delay='50'
                erase-style='backspace'
                :erase-on-complete='false'
                caret-animation='blink'
                class="typer"
            ></typer>
            <login class="login"></login>
        </div>
    </div>
</template>

<script>
    import Login from './Login/Login.vue';
    import FrontpageBook from './Login/FrontpageBook.vue';
    import { VueTyper } from 'vue-typer';

    export default {
        data: function() {
            let bookCoverList = [],
                occupiedBook = [];

            bookCoverList = generateBook(bookCoverList, 10);
            this.$store.dispatch('getBookList').then(() => {
                setTimeout(this.updateBackground, 500);
            });

            return {
                bookCoverList,
                bookLoadingCount: 0,
                occupiedBook,
                slogans: [
                    "　多读书　好读书　读好书",
                    "书读百遍其义自现",
                    "书是人类　进步的　　阶梯",
                    "华二黄中　百分百读五十本　课外书",
                    "不动笔墨　不读书",
                    "　　风声　　雨声　读书声声声入耳",
                    "　　读书　　玩味",
                    "　　读书　破万卷",
                    "　　爱在华二黄中",
                    "　你啊你　　　是自在如风　的少年"
                ]
            };
        },
        computed: {
            bookList() {
                return this.$store.state.bookList;
            }
        },
        components: {
            'login': Login,
            'book-cover': FrontpageBook,
            'typer': VueTyper
        },
        methods: {
            updateBackground() {
//                if (window.innerWidth >= 600) {
                    if (this.occupiedBook.length === 0) {
                        for (let i = 0; i < this.bookList.length; i++) {
                            this.occupiedBook.push(0);
                        }
                    }
                    if (this.bookLoadingCount < 3) {
                        let emptyBook = [];

                        for (let i = 0; i < this.bookCoverList.length; i++) {
                            let book = this.$refs["book-" + i][0]
                                ? this.$refs["book-" + i][0].$el
                                : null;
                            if (book && isElementInViewport(book) && !(this.bookCoverList[i].name)) {
                                emptyBook.push(i)
                            }
                        }

                        if (emptyBook.length > 0) {
                            for (let i = 0; i < (2 - this.bookLoadingCount); i++) {
                                let index = Math.floor(Math.random() * emptyBook.length);
                                if (index === emptyBook.length) {
                                    index = emptyBook.length - 1
                                }
                                if (this.occupiedBook.includes(0)) {
                                    let temp,
                                        lock = 1;
                                    while (lock) {
                                        temp = Math.floor(Math.random() * this.bookList.length);
                                        if (this.occupiedBook[temp] === 0) {
                                            this.$set(this.bookCoverList, emptyBook[index], this.bookList[temp]);
                                            this.bookLoadingCount++;
                                            this.occupiedBook[temp] = 1;
                                            lock = 0;
                                        }
                                    }
                                } else {
                                    if (emptyBook.length > 0)
                                        this.$set(this.bookCoverList, emptyBook[index],
                                            this.bookList[Math.floor(Math.random() * this.bookList.length)]);
                                }
                                emptyBook.splice(index, 1);
                            }
                        }
                    }
//                }
                setTimeout(this.updateBackground, 500);
            }
        },
        beforeCreate() {
            if (this.$cookie.get('username'))
                this.$router.push('/dashboard');
        }
    }

    function generateBook(bookCoverList, n) {
        for (let i = 0; i < 10 * n; i++) {
            bookCoverList[bookCoverList.length] = {};
        }
        return bookCoverList;
    }

    // Originally from http://stackoverflow.com/a/7557433/5628
    function isElementInViewport(el) {
        let rect = el.getBoundingClientRect();

        return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 200;
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

    .frontlogin {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: fixed;
        z-index: 4;
        visibility: hidden;
    }

    .login {
        background-color: white;
        border-radius: .5rem;
        flex-grow: 0;
        z-index: 5;
        visibility: visible
    }

    .typer {
        visibility: visible;
        width: 410px;
        padding: 1rem;
    }

    @media (max-width: 920px) {
        .typer {
            display: none;
        }
    }

</style>