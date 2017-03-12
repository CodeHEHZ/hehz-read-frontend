<template>
    <div class="full">
        <div class="split">
            <a href="http://hehlzx.cn">© 2017 华二黄流中学</a>
            <a href="https://github.com/CodeHEHZ">CodeHEHZ @<img src="../assets/GitHub-Mark-64px.png"></a>
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
        padding: .2rem;
        justify-content: center;
        align-items: center;
        background-color: rgb(238, 245, 246);
    }

    .split {
        display: flex;
        height: 100%;
        width: 40rem;
        justify-content: space-between;
        align-items: center;
        color: grey;
        font-size: .6rem;
    }

    a {
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        text-decoration: none;
        color: grey !important;
    }

    p {
        margin: 0;
    }

    img {
        height: 60%;
        margin-left: .25rem;
    }
</style>