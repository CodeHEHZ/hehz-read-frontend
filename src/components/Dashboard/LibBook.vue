<template>
    <el-card :body-style="{ padding: '0' }" class="book">
        <img :src="cover" class="book-cover" @click="goToDetail" @load="visible()" :style="{ opacity }">
        <div class="book-container" @click="goToDetail">
            <el-tag :type="status === '已通过' ? 'primary' : ''" v-show="status" class="tag">
                {{ status }}
            </el-tag>
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
                opacity: 0,
                status: null
            }
        },

        computed: {
            cover() { return this.bookInfo.cover },
            name() { return this.bookInfo.name },
            author() { return this.bookInfo.author }
        },

        methods: {
            goToDetail: function() {
                this.$emit('go');
            },
            visible() {
                this.opacity = 1;
            }
        },

        mounted() {
            this.$store.dispatch('getSingleBookStatus', this.bookInfo).then(
                status => {
                    this.status = status;
                }
            );
        },

        props: ['bookInfo'] //format: {name, author, imgUrl, ref}

    }


</script>

<style scoped>
    .book {
        cursor: pointer;
    }

    .tag {
        margin-right: .25rem;
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
        background-color: #eef6f6;
        transition: all .4s;
    }

    .book-container {
        padding: 1rem;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    span {
        line-height: 24px;
    }

    @media (max-width: 600px) {
        .book-cover {
            height: 8rem;
        }
    }

</style>
