<template>
    <div id="app">
        <el-menu :default-active="active" class="el-menu-demo" mode="horizontal" :router="true" v-show="showMenu">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/quiz">测试</el-menu-item>
            <el-menu-item index="/dashboard" v-show="dashboardVisible">图书馆</el-menu-item>
        </el-menu>
        <div :class="marginTop"></div>
        <transition name="component-fade" mode="out-in">
            <router-view class="content"></router-view>
        </transition>
        <div class="footer" v-show="showFooter">
            <footers></footers>
        </div>
    </div>
</template>

<script>
    import Quiz from './components/Quiz.vue'
    import Footer from './components/Footer.vue'

    export default {
        data() {
            let active = this.$route.path
            if (active.includes('quiz'))
                active = '/quiz'
            return {
                active,
                true: true
            }
        },
        computed: {
            showMenu() {
                return this.$route.path != '/'
            },
            showFooter() {
                return this.$route.path != '/' && this.$route.path != '/dashboard'
            },
            dashboardVisible() {
                return this.$cookie.get("group") != null //!!to be restricted
            },
            marginTop() {
                return this.$route.path == '/'
                    ? ''
                    : 'margin-top'
            }
        },

        components: {
            quiz: Quiz,
            footers: Footer
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
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .el-menu-demo {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
    }

    .margin-top {
        margin-top: 60px
    }

    .content {
        height: 100%;
    }

    .footer {
        position: relative;
        bottom: 0;
        width: 100%;
        z-index: 3;
    }

    .margin {
        margin-bottom: 2rem;
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

    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .3s ease;
    }
    .component-fade-enter, .component-fade-leave-active {
        opacity: 0;
    }

    @media(max-width: 420px) {
        .el-message-box {
            width: 95%;
        }
    }
</style>
