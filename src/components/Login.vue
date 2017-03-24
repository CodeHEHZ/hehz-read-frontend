<template>
    <div class="full">
        <div class="container">
            <b>登录</b>
            <div class="form">
                <p>姓名</p>
                <el-input v-model="name" placeholder="谢大叔" @keyup.enter.native="switchfocus" :autofocus="true"></el-input>
            </div>
            <div class="form">
                <p>密码</p>
                <el-input ref="pw" v-model="password" type="password" placeholder="*********" @keyup.enter.native="login"></el-input>
            </div>
            <div class="buttons">
                <el-button type="text">找回密码</el-button>
                <el-button type="primary" @click="login">愉快地登录</el-button>
            </div>
            <!--<div class="buttons">-->
                <!--<el-button type="text" @click="ikyuu">Ikyuu的御用注册通道</el-button>-->
            <!--</div>-->
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
                this.$http.post(this.$store.state.api+'user/login', postData, { credentials: true }).then(response => {
                    if (response.status === 200) {
                        //For development
                        this.$cookie.set('username','ikyuustudent');
                        this.$cookie.set('group','student');
                        this.$router.push('/dashboard')
                    }
                    else
                        this.clear();
                },
                response => {
//                    this.clear();
                    //For development
                    this.$router.push('/dashboard')
                    this.$cookie.set('username','ikyuustudent');
                    this.$cookie.set('group','student');
                });
            },

            switchfocus: function(event) {
                this.$refs.pw.inputSelect();
            },

            clear: function(){
                this.$message.error('错了哦');
                this.password="";
            },

            cookieandpush: function(cookieContent) {
//                this.$cookie.set('username',cookieContent.body.username);
//                this.$cookie.set('group',cookieContent.body.group);
            },


//            ikyuu: function(event) {
//                var postData = {username: 'ikyuustudent', schoolId: '233333333', group: 'student', password: '233'};
//                this.$http.post(this.$store.state.api + 'user/register', postData, {credentials: true})
//            }
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
        align-items: center;
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