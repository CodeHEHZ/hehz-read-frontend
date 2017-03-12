<template>
    <div id="app">
        <el-menu :default-active="active" class="el-menu-demo" mode="horizontal" :router="true" @select="handleSelect">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/quiz">测试</el-menu-item>
        </el-menu>
        <transition name="component-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import Quiz from './components/Quiz.vue'

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
            quiz: Quiz
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
    }
</script>

<style>
    body {
        margin: 0;
        min-height: 100vh;
    }

    .el-button {
        transition: background .25s, background-color .25s, border .25s, border-color .25s, color .25s;
    }

    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .3s ease;
    }
    .component-fade-enter, .component-fade-leave-active {
        opacity: 0;
    }
</style>
