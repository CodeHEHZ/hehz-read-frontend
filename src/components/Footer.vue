<template>
    <div class="full">
        <div class="split">
            <a href="http://hehlzx.cn" target="_blank">© {{ new Date().getFullYear() }} 华二黄中</a>
            <a href="https://github.com/CodeHEHZ/hehz-read-frontend" target="_blank">CodeHEHZ @<img src="../assets/GitHub-Mark-64px.png"></a>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    .full {
        display: flex;
        height: 2rem;
        position: relative;
        justify-content: center;
        align-items: center;
        width: 100%;
        z-index: 3;
        visibility: hidden;
    }

    .split {
        display: flex;
        height: 100%;
        width: 40rem;
        justify-content: space-between;
        align-items: center;
        color: grey;
        font-size: .6rem;
        padding: 0 1rem;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    a {
        height: 100%;
        min-width: 6rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        text-decoration: none;
        color: grey !important;
        visibility: visible;
    }

    p {
        margin: 0;
    }

    img {
        height: 60%;
        margin-left: .25rem;
    }
</style>