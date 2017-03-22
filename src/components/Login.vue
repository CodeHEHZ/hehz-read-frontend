<template>
    <div class="full">
        <div class="container">
            <b>登录</b>
            <div class="form">
                <p>姓名</p>
                <el-input v-model="name" placeholder="谢大叔" @keyup.enter.native="switchfocus " :autofocus="true"></el-input>
            </div>
            <div class="form">
                <p>密码</p>
                <el-input ref="pw" v-model="password" type="password" placeholder="*********" @keyup.enter="login"></el-input>
            </div>
            <div class="buttons">
                <el-button type="text">找回密码</el-button>
                <el-button type="primary" @click="login">愉快地登录</el-button>
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
                password: '',
                nameFocus: true,
                passwordFocus: false
            }
        },

        methods: {
            login: function(event){
                var postData = {username: this.name, password: this.password};
                this.$http.post(this.$store.state.JinTianDeIP+'user/login', postData, { credentials: true }).then(response => {
                    if(response.status===200) this.$router.push('/dashboard')
                    else this.clear();
                },
                response => {
                    this.clear();
                });
            },

            switchfocus: function(event) {
                this.$refs.pw.inputSelect();
            },

            clear: function(){
                this.$message.error('错了哦');
                this.password="";
            }
        }

    }
</script>

<style scoped>
    .full {
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 15rem;
        margin-bottom: 1rem;
        background-color: white;
        padding: 3rem;
        border-radius: .5rem;

    }

    .form {
        display: flex;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        margin-top: .3rem;
    }

    .el-input {
        margin: .3rem 0 .3rem 1rem;
    }

    p {
        min-width: 2rem;
    }

    b {
        align-self: center;
        font-size: 3rem;
        line-height: 150%;
        margin-bottom: 1rem;
        font-family: Arial, "Lucida Sans", "Lucida Sans Regular", "SimHei", "黑体", "STHeiti", "华文黑体", serif;
    }
</style>