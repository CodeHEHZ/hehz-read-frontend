<template>
    <el-card :body-style="{ padding: '0' }" class="book">
        <img :src="cover" class="book-cover" @click="goToDetail" @load="style.opacity = 1" @style="style">
        <div style="padding: 14px;">
            <span>{{ name }}</span>
            <div class="bottom">
                <span class="author">{{ author }}</span>
                <el-button type="text" class="button" @click="goToDetail">详细信息</el-button>
            </div>
        </div>
    </el-card>
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
            cover() { return this.bookInfo.cover },
            name() { return this.bookInfo.name },
            author() { return this.bookInfo.author }
        },

        methods: {
            goToDetail: function() {
                this.$router.push('/book/' + this.name)
            }
       },

        props: ['bookInfo'] //format: {name, author, imgUrl, ref}

    }


</script>

<style scoped>
    .book {
        cursor: pointer;
    }

    .author {
        font-size: 11px;
        margin: 0;
        color: #666666;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .button {
        padding: 0;
        float: right;
    }

    .book-cover {
        width: 100%;
        height: 15rem;
        object-fit: cover;
     }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

</style>
