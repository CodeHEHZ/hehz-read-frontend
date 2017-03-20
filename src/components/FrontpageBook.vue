<template>
    <div class="book-cover-container">
        <img :src="bookInfo.url"
             :title="bookInfo.name"
             class="book-cover"
             :style="style"
             @load="style.opacity = 0.5"/>
    </div>
</template>


<script>
    export default{
        data: function() {
            return {
                style: {
                    opacity: 0
                }
            }
        },

        props: ['bookInfo'] //format: {name, url}



    }


</script>

<style scoped>
    .book-cover-container {
        display: flex;
        height: 300px;
        width: 150px;
        flex-grow: 1;
        align-items: center;
    }

    .book-cover {
        display: flex;
        height: 300px;
        width: 150px;
        flex-grow: 1;
        object-fit: cover;
        opacity: 0;
        transition: all .3s;
    }

    .book-cover:hover {
        opacity: 1 !important;
        box-shadow: 0 0 20px #000;
        position: absolute;

        z-index: 20;
    }


</style>
