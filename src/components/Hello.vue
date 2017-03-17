<template>
    <div class="full">
        <h1>Hello~</h1>
        <book-list></book-list>
    </div>
</template>

<script>

    import BookList from './BookList.vue'


    export default {
        components: {
            'book-list' : BookList
        }

    }
</script>

<style scoped>
    .full {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>