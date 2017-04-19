<template>
    <div id="app">
        <el-menu :default-active="active" class="el-menu-container" mode="horizontal" :router="true" v-show="showMenu">
            <div class="menu-restrictor">
                <div class="menu-left">
                    <el-menu-item index="/dashboard" class="menu-item">首页</el-menu-item>
                    <el-menu-item index="/quiz" class="menu-item">测试</el-menu-item>
                    <el-menu-item index="/admin" class="menu-item">管理</el-menu-item>
                </div>
                <div class="menu-right">
                    <el-submenu index="">
                        <template slot="title">{{ username || '未登录' }}</template>
                        <el-menu-item :index="username ? '/logout' : '/'">{{ username ? '注销' : '登录' }}</el-menu-item>
                    </el-submenu>
                </div>
            </div>
        </el-menu>
        <div :class="marginTop" id="margin-top"></div>
        <transition name="component-fade" mode="out-in">
            <router-view class="content" id="router-view"></router-view>
        </transition>
        <div class="footer" id="footer" v-show="showFooter">
            <footers></footers>
        </div>
    </div>
</template>

<script>
    import Quiz from './components/Quiz/Quiz.vue';
    import Footer from './components/Footer.vue';

    export default {
        data() {
            return {
                true: true,
                username: this.$cookie.get('username')
            }
        },
        computed: {
            active() {
                let active = this.$route.path;
                if (active.includes('quiz'))
                    active = '/quiz';
                if (active.includes('admin'))
                    active = '/admin';
                return active;
            },
            showMenu() {
                return this.$route.path !== '/';
            },
            showFooter() {
                return this.$route.path !== '/';
            },
            marginTop() {
                return this.$route.path === '/'
                    ? ''
                    : 'margin-top';
            }
        },

        components: {
            quiz: Quiz,
            footers: Footer
        },

        mounted() {
            let getUsername = () => {
                this.username = this.$cookie.get('username');
                setTimeout(getUsername, 250);
            };

            getUsername();
        }
    }
</script>

<style>
    html {
        height: 100%;
    }

    body {
        margin: 0;
        height: 100%;
        font-family: Georgia, 'Times New Roman', Times, "Microsoft YaHei", "微软雅黑", "SimHei", "黑体", "STXihei", "华文细黑", serif;
    }

    #app {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .el-menu-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        display: flex;
        justify-content: center;
    }

    .menu-restrictor {
        display: flex;
        width: 100%;
        height: 100%;
        max-width: 60rem;
        justify-content: space-between;
    }

    .el-menu-item {
        font-weight: bold;
    }

    .menu-item:hover {
        border-bottom: .25rem solid #03a678;
    }

    .margin-top {
        margin-top: 60px
    }

    #router-view {
        min-height: calc(100vh - 60px - 2rem);
    }

    .footer {
        position: relative;
        bottom: 0;
        width: 100%;
        z-index: 3;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    a, span, p {
        line-height: 125%;
    }

    .el-button {
        transition: all .25s;
    }

    .el-message__group {
        display: flex;
        align-items: center;
    }

    .el-upload {
        width: 100%;
        height: 100%;
    }

    .el-upload-dragger {
        width: 100%;
        height: 100%;
        border: none;
    }

    .el-upload-dragger:hover {
        border: none;
    }

    .el-dialog {
        margin-bottom: 2rem;
    }

    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .3s ease;
    }

    .component-fade-enter, .component-fade-leave-active {
        opacity: 0;
    }

    .el-form-item__content, .el-form-item__label {
        line-height: 1.5rem;
    }

    .el-form-item__label {
        padding: 0 .5rem 0 0;
        min-width: 1.5rem;
    }

    .geetest_holder.geetest_wind {
        min-width: 0 !important;
    }

    .geetest_holder.geetest_wind .geetest_radar_btn, .geetest_holder.geetest_wind .geetest_success_btn {
        border-radius: 4px !important;
    }

    .vue-typer.typer {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
    }

    .vue-typer .custom.char {
        font-size: 5rem;
        font-weight: bold;
        color: #03a678 !important;
        -webkit-text-stroke: .1rem #fff;
        line-height: 100%;
        text-align: end;
        margin-top: .5rem;
        font-family: SimHei, PingFang SC, Hiragino Sans GB, STHeiti;
    }

    .vue-typer .custom.caret {
        width: .5rem;
        height: 5rem;
        background-color: #03a678;
        margin-left: .5rem;
        border-right: solid .2rem #fff;
    }

    .vue-typer .custom.caret:before {
        content: '　';
    }

    span.left {
        display: flex !important;
        justify-content: flex-end;
        flex-wrap: wrap;
    }

    @media (max-width: 600px) {
        .el-message-box, .el-dialog--small {
            width: 95%;
        }
    }

    @media (max-width: 400px) {
        .menu-item {
            padding-left: 15px;
            padding-right: 15px;
        }

        .content, .books-with-title {
            padding: 0 !important;
        }
    }
</style>
