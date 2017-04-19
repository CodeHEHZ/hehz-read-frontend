<template>
    <div class="full">
        <div class="full overall">
            <div class="container top">
                <div class="buttons">
                    <el-button type="primary" @click="goTo('CreateBook')">创建书本</el-button>
                    <el-button :disabled="selectedBook.length === 0">关闭书本</el-button>
                </div>
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
                class="container"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="书名">
                </el-table-column>
                <el-table-column
                    prop="author"
                    label="作者">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="120px"
                >
                    <template scope="scope">
                        <el-button type="text" @click="goTo('EditBook', scope.row)">
                            编辑
                        </el-button>
                        <el-button type="text" @click="goTo('EditQuiz', scope.row)">
                            题库
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog :title="dialogTitle" v-model="dialogVisible" @close="closeDialog">
            <router-view></router-view>
        </el-dialog>
    </div>
</template>

<script>
    import EditBook from './EditBook.vue';

    export default {
        data: function() {
            return {
                bookList: this.$store.state.bookList,
                search: '',
                selectedBook: [],
                dialogVisible: this.isRoot,
                dialogTitle: '',
                routes: {
                    CreateBook: '创建书本',
                    EditBook: '编辑书本'
                }
            }
        },

        methods: {
            handleSelectionChange(val) {
                this.selectedBook = val;
            },
            goTo(route, params) {
                this.$router.push({ name: route, params });
                this.dialogTitle = this.routes[this.$route.name];
            },
            closeDialog() {
                this.$router.push('/admin/book');
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
            },
            isRoot() {
                return this.$route.name === 'BookAdmin';
            }
        },

        created() {
            this.$store.dispatch('getBookList');
            this.dialogVisible = !this.isRoot;
            this.dialogTitle = this.routes[this.$route.name];
        },

        components: {
            'edit-book': EditBook
        },

        watch: {
            '$store.state.bookList'(val) {
                this.bookList = val;
            },
            '$route.path'() {
                this.dialogVisible = !this.isRoot;
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

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .container {
        max-width: 40rem;
        width: 100%;
        margin-bottom: .5rem;
    }

    .container:last-child {
        margin-bottom: 0;
    }

    .buttons {
        display: flex;
        margin-right: .5rem;
    }

    .search {
        width: initial;
    }
</style>