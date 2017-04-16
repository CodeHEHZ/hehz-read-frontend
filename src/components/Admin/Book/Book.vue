<template>
    <div class="full">
        <router-view id="router-view"></router-view>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    .full {
        display: flex;
        justify-content: center;
        height: 100%;
        width: 100%;
    }

    #router-view {
        padding-top: 1rem;
        padding-bottom: 2rem;
    }
</style>