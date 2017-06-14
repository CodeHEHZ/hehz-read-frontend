<template>
    <div class="full">
        <div class="full">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form-container">
                <h2>修改密码</h2>
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input type="password" v-model="form.oldPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" v-model="form.newPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword">
                    <el-input type="password" v-model="form.checkPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            let validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.checkPassword !== '') {
                        this.$refs.form.validateField('checkPassword');
                    }
                    callback();
                }
            };
            let validatePassword2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入新密码'));
                } else if (value !== this.form.newPassword) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    oldPassword: '',
                    newPassword: '',
                    checkPassword: ''
                },
                rules: {
                    oldPassword: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    newPassword: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    checkPassword: [
                        { validator: validatePassword2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            presentPassword: this.form.oldPassword,
                            newPassword: this.form.newPassword
                        };
                        this.$http.put(this.$store.state.api + 'user/password', data)
                            .then(
                                () => {
                                    this.$message.success('修改成功');
                                    this.resetForm('form');
                                }
                            )
                            .catch(
                                error => this.$message.error(error.body.message)
                            );
                    } else {
                        this.$message.error('请先正确填写信息');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .full {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .form-container {
        margin-top: 2rem;
        width: 100%;
        max-width: 30rem;
    }
</style>