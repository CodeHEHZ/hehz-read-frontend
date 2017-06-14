<template>
    <div class="full">
        <div class="full overall">
            <div class="container top">
                <el-input
                    placeholder="输入书名或作者名"
                    icon="search"
                    v-model="search"
                    class="search"
                >
                </el-input>
            </div>
            <el-table
                    :data="filteredBookList"
                    border
                    tooltip-effect="dark"
                    class="container">
                <el-table-column
                    prop="name"
                    label="书名">
                    <template scope="scope">
                        <el-tag v-if="scope.row.open" type="primary">
                            {{ "已开放" }}
                        </el-tag>
                        {{ scope.row.name }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="author"
                    label="作者">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="100px"
                >
                    <template scope="scope">
                        <el-button type="text" @click="edit(scope.row)">
                            编辑题库
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                bookList: this.$store.state.bookList,
                search: ''
            }
        },

        methods: {
            edit(params) {
                this.$router.push({ name: 'EditQuiz', params });
            }
        },

        computed: {
            filteredBookList() {
                if (this.search === '') {
                    return this.bookList;
                } else {
                    return this.bookList.filter(book => {
                        return book.author.includes(this.search) || book.name.includes(this.search);
                    });
                }
            }
        },

        created() {
            this.$store.dispatch('getBookList');
        },

        watch: {
            '$store.state.bookList'(val) {
                this.bookList = val;
            }
        }
    }
</script>

<style scoped>
    .full {
        display: flex;
        height: 100%;
    }

    .overall {
        align-items: center;
        flex-direction: column;
        padding: 2rem .5rem 1rem .5rem;
        display: -webkit-box;
    }

    .container {
        max-width: 40rem;
        width: 100%;
        margin-bottom: .5rem;
    }

    .container:last-child {
        margin-bottom: 0;
    }

    .top {
        display: flex;
        justify-content: flex-end;
    }

    .buttons {
        display: flex;
        margin-right: .5rem;
    }

    .search {
        width: initial;
    }
</style>