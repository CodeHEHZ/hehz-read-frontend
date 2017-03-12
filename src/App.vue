<template>
    <div id="app">
        <el-menu :default-active="active" class="el-menu-demo" mode="horizontal" :router="true">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/quiz">测试</el-menu-item>
        </el-menu>
        <transition name="component-fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <div class="footer">
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
        components: {
            quiz: Quiz,
            footers: Footer
        }
    }
</script>

<style>
    body {
        margin: 0;
        min-height: 100vh;
    }

    #app {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    a, span, p {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        line-height: 125%;
    }

    .el-button {
        transition: background .25s, background-color .25s, border .25s, border-color .25s, color .25s, length .25s;
    }

    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .3s ease;
    }
    .component-fade-enter, .component-fade-leave-active {
        opacity: 0;
    }
</style>
