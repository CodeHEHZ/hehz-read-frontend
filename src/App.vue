<template>
    <div id="app">
        <el-menu :default-active="active" class="el-menu-demo" mode="horizontal" :router="true" v-show="showMenu">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/quiz">测试</el-menu-item>
        </el-menu>
        <transition name="component-fade" mode="out-in">
            <router-view class="marginForFooter"></router-view>
        </transition>
        <div class="footer" v-show="showMenu">
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
        font-family: Georgia, 'Times New Roman', Times, "Microsoft YaHei", "微软雅黑", "SimHei", "黑体", "STXihei", "华文细黑", serif;
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
        z-index: 3;
    }

    .margin {
        margin-bottom: 2rem;
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
