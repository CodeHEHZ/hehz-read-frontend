<template>
    <img :src="url" class="book-cover" :style="style" @load="style.opacity = 1">
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
        props: ['url']
    }


</script>

<style scoped>
    .book-cover {
        object-fit: cover;
        opacity: 0;
        transition: all .3s;
    }
</style>
