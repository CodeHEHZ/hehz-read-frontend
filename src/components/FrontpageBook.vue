<template>
    <div class="book-cover-container">
        <img :src="bookInfo.url"
             :title="bookInfo.name"
             class="book-cover"
             :style="style"
             @load="style.opacity = 0.3"/>
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
        height: 33.33%;
        min-height: 200px;
        width: 150px;
        flex-grow: 1;
        align-items: center;
    }

    .book-cover {
        display: flex;
        height: 100%;
        width: 100%;
        flex-grow: 1;
        object-fit: cover;
        opacity: 0;
        transition: all .3s;
        filter: saturate(0%);
    }

    .book-cover:hover {
        box-shadow: 0 0 20px #000 !important;
        animation-name: book-hover;
        animation-duration: .3s;
        filter: saturate(100%) !important;
        /*float: left;*/
        z-index: 20;
        opacity: 1 !important;
    }


</style>
