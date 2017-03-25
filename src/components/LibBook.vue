<template>
    <div class="full" @click="gotoDetail">
        <img class="book-cover"
             :src="this.cover"
             :style="style"
             @load="style.opacity = 1"
        >
        <p class="name">{{ name }}</p>
        <p class="author">{{ author }}</p>
    </div>
</template>

<script>
    export default{
        data: function() {
            return {
                style: {
                    opacity: 0,
                }
            }
        },

        computed: {
            cover: function() { return this.bookInfo.cover },
            name: function() { return this.bookInfo.name },
            author: function() { return this.bookInfo.author }
        },

        methods: {
            gotoDetail: function() {
                this.$router.push('/book/'+this.name)
            }
       },

        props: ['bookInfo'] //format: {name, author, imgUrl, ref}

    }


</script>

<style scoped>
    .full {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 140px;
        height: 250px;
        padding: 10px 10px 10px 10px;
        border-color: #f0f0f0;
        border-style: solid;
        border-width: 1px;
    }

    .book-cover {
        width: 140px;
        height: 210px;
        object-fit: cover;
        opacity: 0;
        transition: all .3s;
    }

    .name {
        font-size: 15px;
        margin: 4px 0 2px 0;
    }

    .author {
        font-size: 11px;
        margin: 0 0 0 0;
        color: #666666;
    }


</style>
