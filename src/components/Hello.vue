<template>
    <div class="full">
        <div class="backbook">
            <h1>Hello~</h1>
            <book-cover :url="'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'"></book-cover>


        </div>
        <div class="floating">
            <login v-if="false" class="login"></login>
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
        }

    }
</script>

<style scoped>

    .backbook {
        display: flex;
        flex-grow: 1;
        width: 100%;
    }

    .full {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-grow: 1;
    }


    .floating {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: fixed;
        height: calc(100% - 6rem);
        z-index: 2;
    }

    .login {
        background-color: white;
        opacity: .9;
        flex-grow: 0;

    }

</style>