<template>
    <img :src="bookInfo.url"
         :title="bookInfo.name"
         class="book-cover"
         :style="style"
         @load="style.opacity = 1"/>
</template>


<script>
    export default{
        data: function() {
            console.log(this.bookInfo)
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
    .book-cover {
        display: flex;
        height: 100px;
        width: 80px;
        object-fit: cover;
        opacity: 0;
        transition: all .3s;
    }
</style>
