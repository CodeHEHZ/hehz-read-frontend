<template>
    <div class="full">
        <div class="container">
            <el-menu theme="dark" :default-active="active" class="el-menu-container submenu" mode="horizontal" :router="true">
                <div class="menu-restrictor">
                    <el-menu-item index="/admin/book" class="menu-item submenu-item">书本</el-menu-item>
                    <el-menu-item index="/admin/user" class="menu-item submenu-item">用户</el-menu-item>
                </div>
            </el-menu>
            <transition name="component-fade" mode="out-in">
                <router-view id="router-view"></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            active() {
                let active = this.$route.path;
                if (active === '/admin') {
                    this.$router.push('/admin/book');
                    active = '/admin/book';
                }
                if (active.includes('admin/book'))
                    active = '/admin/book';
                if (active.includes('admin/user'))
                    active = '/admin/user';
                return active;
            }
        }
    };
</script>

<style scoped>
    .full {
        display: flex;
        flex-direction: column;
        width: inherit;
    }

    .container {
        width: 100%;
        height: 100%;
    }

    .submenu {
        height: 2rem;
        background-color: #f5ffff;
        z-index: 1;
        position: relative;
    }

    .menu-restrictor {
        justify-content: flex-start;
    }

    .submenu-item {
        height: 2rem;
        line-height: 2rem;
        padding: 0 1rem;
        color: rgb(72, 106, 101);
    }

    .submenu-item:hover {
        background-color: #A2DED0 !important;
    }

    .submenu-item:first-child {
        margin-left: .25rem;
    }

    .is-active {
        border-bottom: .2rem solid #03a678;
    }

    .is-active:hover {
        border-bottom: .25rem solid #03a678;
    }
</style>