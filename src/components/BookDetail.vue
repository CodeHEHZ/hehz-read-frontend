<template>
    <div class="full">
        <div class="width-restriction"
            <div class="cover-and-info">
                <img class="cover"/>
                <div class="info-and-button">
                    <div class="info">
                        <p class="book-name">{{ bookName }}</p>
                    </div>
                    <el-button type="primary" icon="search">去做题</el-button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data: function () {
        },

        computed: {
            bookName: function() {
                return this.$route.params.name
            },


            thisBook: function() {

            }
        }

    }
</script>

<style>
</style>