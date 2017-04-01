<template></template>

<script>
    export default {
        created() {
            this.$cookie.delete('user')
            this.$cookie.delete('username')
            this.$cookie.delete('group')
            this.$http.get(this.$store.state.api + 'user/logout', { credentials: true }).then(response => {
                if (response.status === 200) {
                    this.$router.push('/')
                }
            })
        }
    }
</script>