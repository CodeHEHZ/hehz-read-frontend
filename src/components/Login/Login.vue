<template>
    <div class="container">
        <b>读书@华二黄中</b>
        <div class="form">
            <p>账号</p>
            <el-input ref="username" v-model="username" placeholder="谢大叔" @keyup.enter.native="switchFocus" :autofocus="true"></el-input>
        </div>
        <div class="form">
            <p>密码</p>
            <el-input ref="password" v-model="password" type="password" placeholder="*********" @keyup.enter.native="!verified || login"></el-input>
        </div>
        <div id="captcha"></div>
        <div class="buttons">
            <el-button type="text">找回密码</el-button>
            <el-button type="primary" @click="login" :disabled="logging">
                {{ verified ? (logging ? '正在登录中' : '愉快地登录') : '请先通过验证' }}
            </el-button>
        </div>
        <div class="sponsors">
            <span>由</span>
            <a class="sponsor" href="https://qingcloud.com/about/nonprofits" title="感谢青云免费提供云主机服务" target="_blank">
                <img class="sponsor" src="../../assets/qingcloud.jpg">
            </a>
            <a class="sponsor" href="https://www.upyun.com/league" title="感谢又拍云提供云加速服务" target="_blank">
                <img class="sponsor sponsor-upyun" src="../../assets/upyun.png">
            </a>
            <span>驱动</span>
        </div>
        <a class="copyright" href="http://hehlzx.cn" target="_blank">© 2017 华二黄流中学</a>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                username: '',
                id: '',
                password: '',
                nameFocus: true,
                passwordFocus: false,
                logging: false,
                verified: false,
                captcha: undefined,
                captchaResult: {}
            }
        },

        methods: {
            login: function(event){
                if (this.username.length === 0) {
                    this.$refs.username.inputSelect();
                    this.$message.warning('请输入您的用户名');
                } else if (this.password.length === 0) {
                    this.$refs.password.inputSelect();
                    this.$message.warning('请输入您的密码');
                } else if (!this.verified) {
                    this.$message.warning('请先点击按钮进行验证');
                } else {
                    let postData = {
                        username: this.username,
                        password: this.password,
                        captchaChallenge: this.captchaResult['geetest_challenge'],
                        captchaValidate: this.captchaResult['geetest_validate'],
                        captchaSecCode: this.captchaResult['geetest_seccode']
                    };
                    this.logging = true;
                    this.$http.post(this.$store.state.api + 'user/login', postData, { credentials: true }).then(response => {
                        if (response.status === 200) {
                            let user = {};
                            if (this.$cookie.get('user')) {
                                user = JSON.parse(this.$cookie.get('user').slice(2, 1000));
                            }
                            this.$cookie.set('username', user.username);
                            this.$cookie.set('group', user.group);
                            setTimeout(() => {
                                this.$router.push('/dashboard');
                            }, 250);
                        }
                    },
                    response => {
                        this.clear();
                        this.logging = false;
                    });
                }
            },

            switchFocus: function(event) {
                this.$refs.password.inputSelect();
            },

            clear: function(){
                this.captcha.reset();
                this.$message.error('用户名或密码错误');
                this.password = '';
            }
        },

        mounted() {
            let checkLoginStatus = () => {
                if (this.$cookie.get('username'))
                    this.$router.push('/dashboard');
                else
                    setTimeout(checkLoginStatus, 250);
            };

            checkLoginStatus();

            this.$store.dispatch('getBookList')

            this.$http.get(this.$store.state.api + 'captcha').then(response => {
                if (response.status === 200) {
                    initGeetest({
                        lang: 'zh-cn',
                        width: '100%',
                        height: '2rem',
                        gt: response.body.gt,
                        challenge: response.body.challenge,
                        offline: !response.body.success,
                        new_captcha: true
                    }, (captchaObj) => {
                        this.captcha = captchaObj;
                        if (!this.$cookie.get('username')) {
                            captchaObj.appendTo('#captcha');
                            captchaObj.onSuccess(() => {
                                this.verified = true;
                                this.captchaResult = captchaObj.getValidate();
                            });
                        }
                    })
                }
            });
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 15rem;
        background-color: white;
        padding: 3rem 3rem 2rem 3rem;
        border-radius: .5rem;
    }

    .form {
        display: flex;
        align-items: center;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        margin-top: .5rem;
    }

    .sponsors {
        display: flex;
        align-items: center;
        flex-direction: row;
        height: 2rem;
        justify-content: space-between;
        margin-top: 1rem;
    }

    .sponsor {
        height: 100%;
        margin-top: .1rem;
        width: auto;
    }

    span {
        margin-top: .2rem;
        font-size: .8rem;
    }

    .sponsor-upyun {
        margin-top: 0;
    }

    .copyright {
        height: 1rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: grey !important;
        font-size: .8rem;
        margin-top: .25rem;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    .el-input {
        margin: .3rem 0 .3rem 1rem;
    }

    .el-message__group {
        display: flex;
        align-items: center;
    }

    p {
        min-width: 2rem;
    }

    b {
        align-self: center;
        font-size: 2rem;
        line-height: 150%;
        margin-bottom: 1rem;
        font-family: Arial, "Lucida Sans", "Lucida Sans Regular", "SimHei", "黑体", "STHeiti", "华文黑体", serif;
    }
</style>