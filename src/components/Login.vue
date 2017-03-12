<template>
    <div class="full">
        <div class="container">
            <b>登录</b>
            <div class="form">
                <p>姓名</p>
                <el-input v-model="name" placeholder="谢大叔"></el-input>
            </div>
            <div class="form">
                <p>学号</p>
                <el-input v-model="id" placeholder="201900520"></el-input>
            </div>
            <div class="form">
                <p>密码</p>
                <el-input v-model="password" type="password" placeholder="*********"></el-input>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                name: '',
                id: '',
                password: ''
            }
        }
    }
</script>

<style scoped>
    .full {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 20rem;
        margin-bottom: 5rem;
    }

    .form {
        display: flex;
    }

    .el-input {
        margin: .3rem 1rem;
    }

    p {
        min-width: 2rem;
    }

    b {
        align-self: center;
        font-size: 3rem;
        line-height: 150%;
        font-family: Arial, "Lucida Sans", "Lucida Sans Regular", "SimHei", "黑体", "STHeiti", "华文黑体", serif;
    }
</style>