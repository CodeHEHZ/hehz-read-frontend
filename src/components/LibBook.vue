<template>
    <div class="full">
        <img class="book-cover"
             :src="this.imgsrc"
             :style="style"
             @load="style.opacity = 1"
        >
        <p class="bookname">{{ bookname }}</p>
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
            imgsrc: function() { return this.bookInfo.imgUrl },
            bookname: function() { return this.bookInfo.bookName },
            author: function() { return this.bookInfo.author }
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

    .bookname {
        font-size: 15px;
        margin: 4px 0 2px 0;
    }

    .author {
        font-size: 11px;
        margin: 0 0 0 0;
        color: #666666;
    }


</style>
