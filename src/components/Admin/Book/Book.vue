<template>
    <div class="full">
        <div class="full overall">
            <div class="container">
                <el-button type="primary" @click="goTo('CreateBook')">创建书本</el-button>
                <el-button :disabled="selectedBook.length === 0">开放书本</el-button>
                <el-button :disabled="selectedBook.length === 0">关闭书本</el-button>
            </div>
            <el-table
                    :data="bookList"
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
                        label="操作">
                    <template scope="scope">
                        <el-button type="text" @click="goTo('')">
                            编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog :title="dialogTitle" v-model="dialogVisible" @close="closeDialog">
            <router-view id="router-view"></router-view>
        </el-dialog>
    </div>
</template>

<script>
    import EditBook from './EditBook.vue';

    export default {
        data: function() {
            return {
                bookList: this.$store.state.bookList,
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
            '$route.path'(val) {
                this.dialogVisible = !this.isRoot;
            }
        }
    }
</script>

<style scoped>
    .full {
        display: flex;
        justify-content: center;
        height: 100%;
        width: 100%;
    }

    .overall {
        align-items: center;
        flex-direction: column;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    .container {
        max-width: 40rem;
        width: 100%;
        margin-bottom: .5rem;
    }

    .container:last-child {
        margin-bottom: 0;
    }
</style>