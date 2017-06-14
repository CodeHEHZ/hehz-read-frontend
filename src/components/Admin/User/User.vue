<template>
    <div class="full">
        <div class="full overall">
            <div class="container top">
                <div class="buttons">
                    <el-button type="primary" @click="goTo('CreateUser')">创建用户</el-button>
                    <el-button type="success" @click="banUser('unban')" :disabled="selectedUser.length === 0">解禁用户</el-button>
                    <el-button type="warning" @click="banUser('ban')" :disabled="selectedUser.length === 0">停用用户</el-button>
                </div>
                <el-input
                    placeholder="查找用户"
                    icon="search"
                    v-model="search"
                    class="search"
                >
                </el-input>
            </div>
            <el-table
                :data="filteredUserList"
                border
                tooltip-effect="dark"
                class="container"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="用户名"
                    width="130px"
                >
                    <template scope="scope">
                        <el-tag v-if="scope.row.status === 'banned'" type="danger">停用</el-tag>
                        {{ scope.row.name }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="tag"
                    label="标签">
                    <template scope="scope">
                        <el-tag v-for="tag of getTag(scope.row)" :key="tag" type="primary">
                            {{ tag }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="group"
                    label="用户组"
                    width="100px"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="100px"
                >
                    <template scope="scope">
                        <el-button type="text" @click="goTo('EditUser', scope.row)">
                            编辑
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
    import EditUser from './EditUser.vue';

    export default {
        data: function() {
            return {
                userList: this.$store.state.userList,
                search: '',
                selectedUser: [],
                dialogVisible: this.isRoot,
                dialogTitle: '',
                routes: {
                    CreateUser: '创建用户',
                    EditUser: '编辑用户信息'
                }
            }
        },

        methods: {
            handleSelectionChange(val) {
                this.selectedUser = val;
            },
            goTo(route, params) {
                this.$router.push({ name: route, params });
                this.dialogTitle = this.routes[this.$route.name];
            },
            closeDialog() {
                this.$router.push('/admin/user');
            },
            getTag(user) {
                return user.tag.length === 0 ? ['没有标签'] : user.tag;
            },
            banUser(action) {
                let users = [];
                for (let user of this.selectedUser) {
                    users.push(user.username);
                }
                this.$http.post(this.$store.state.api + 'user/' + action, { username: users })
                    .then(
                        () => {
                            this.$store.dispatch('getUserList')
                                .then(
                                    () => {
                                        this.selectedUser = [];
                                        this.$message.success('操作成功');
                                    }
                                )
                                .catch(
                                    error => this.$message.error(error.body.message)
                                )
                        }
                    )
                    .catch(
                        error => this.$message.error(error.body.message)
                    )
            }
        },

        computed: {
            filteredUserList() {
                if (this.search === '') {
                    return this.userList;
                } else {
                    return this.userList.filter(user => {
                        return user.username.includes(this.search)
                            || user.name.includes(this.search)
                            || user.tag.includes(this.search)
                            || user.school.includes(this.search)
                            || user.group.includes(this.search);
                    });
                }
            },
            isRoot() {
                return this.$route.name === 'UserAdmin';
            }
        },

        created() {
            this.$store.dispatch('getUserList').then(
                userList => this.userList = userList
            );
            this.dialogVisible = !this.isRoot;
            this.dialogTitle = this.routes[this.$route.name];
        },

        components: {
            'edit-user': EditUser
        },

        watch: {
            '$store.state.userList'(val) {
                this.userList = val;
            },
            '$route.path'() {
                this.dialogVisible = !this.isRoot;
                this.dialogTitle = this.routes[this.$route.name];
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

    .el-tag {
        margin: .125rem;
    }

    .el-tag:first-child {
        margin-top: .25rem;
    }

    .el-tag:last-child {
        margin-bottom: .25rem;
    }
</style>