<template>
    <div class="book-cover-container" :style="'background-color: rgba(19,198,148,' + containerOpacity + ')'">
        <img :src="bookInfo.cover"
             class="book-cover"
             :style="style"
             @load="loaded">
    </div>
</template>

<script>
    export default{
        data: function() {
            return {
                style: {
                    opacity: 0
                },
                containerOpacity: .65 + Math.random() * .35
            }
        },

        props: ['bookInfo'], // format: { name, url },

        methods: {
            loaded() {
                this.style.opacity = 0.6;
                this.$emit('loaded');
            }
        }
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
        background-color: #03a678;
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
        z-index: 20;
        opacity: 1 !important;
    }

    @media (min-height: 768px) {
        .book-cover-container {
            height: 25%;
        }
    }

    @media (min-height: 1080px) {
        .book-cover-container {
            height: 20%;
        }
    }

    @media (min-height: 2000px) {
        .book-cover-container {
            height: 10%;
        }
    }
</style>
