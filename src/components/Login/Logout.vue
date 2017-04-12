<template>
    <div
        v-loading.fullscreen.lock="true"
        element-loading-text="正在注销"
    ></div>
</template>

<script>
    export default {
        created() {
            this.$cookie.delete('user');
            this.$cookie.delete('username');
            this.$cookie.delete('group');
            this.$http.get(this.$store.state.api + 'user/logout', { credentials: true }).then(response => {
                if (response.status === 200) {
                    this.$router.push('/');
                }
            });
        }
    }
</script>