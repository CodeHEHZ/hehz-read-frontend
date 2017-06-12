<template>
    <div class="full">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"
                          auto-complete="off"
                          @keyup.enter.native="switchFocus('name')"
                          placeholder="用户登录所用的 ID，如 hehz20190123"
                ></el-input>
            </el-form-item>
            <el-form-item label="用户组" prop="group">
                <el-select v-model="form.group" placeholder="请选择所属用户组">
                    <el-option v-for="group of groupList"
                               :label="group.label"
                               :value="group.value"
                               :key="group.label"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model.number="form.name"
                          ref="name"
                          @keyup.enter.native="switchFocus('uid')"
                          placeholder="用户的真实姓名"
                ></el-input>
            </el-form-item>
            <el-form-item label="学号" prop="uid">
                <el-input v-model.number="form.uid"
                          ref="uid"
                          @keyup.enter.native="switchFocus('password')"
                          placeholder="校园卡上显示的学号"
                ></el-input>
            </el-form-item>
            <el-form-item label="学校" prop="school">
                <el-select v-model="form.school" placeholder="请选择所属学校">
                    <el-option v-for="school of schoolList"
                               :label="school"
                               :value="school"
                               :key="school"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设置密码" prop="password">
                <el-input type="password"
                          v-model="form.password"
                          auto-complete="off"
                          ref="password"
                          @keyup.enter.native="switchFocus('checkPassword')"
                          placeholder="用户的初始密码"
                ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
                <el-input type="password"
                          v-model="form.checkPassword"
                          auto-complete="off"
                          ref="checkPassword"
                          @keyup.enter.native="submitForm('form')"
                          placeholder="再次输入密码以确认无误"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">提交</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data: function() {
            let checkEmpty = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('不能为空'));
                } else {
                    callback();
                }
            };

            let checkNumber = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('不能为空'));
                }

                if (!new RegExp('^[0-9]+$').test(value)) {
                    return callback(new Error('请输入数字值'));
                }
                callback();
            };

            let validatePassword = (rule, value, callback) => {
                if (this.$route.name === 'EditUser') {
                    callback();
                } else if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.checkPassword !== '') {
                        this.$refs.form.validateField('checkPassword');
                    }
                    callback();
                }
            };

            let validatePassword2 = (rule, value, callback) => {
                if (this.$route.name === 'EditUser' && this.form.password === '') {
                    callback();
                } else if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    username: '',
                    group: 'student',
                    name: '',
                    uid: '',
                    school: '华二黄中',
                    password: '',
                    checkPassword: ''
                },
                rules: {
                    username: [
                        { validator: checkEmpty, trigger: 'blur' }
                    ],
                    name: [
                        { validator: checkEmpty, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    checkPassword: [
                        { validator: validatePassword2, trigger: 'blur' }
                    ],
                    uid: [
                        { validator: checkNumber, trigger: 'blur' }
                    ]
                },
                groupList: [
                    { label: '学生', value: 'student' },
                    { label: '教师', value: 'teacher' },
                    { label: '管理猿', value: 'manager' },
                    { label: '超级管理猿', value: 'admin' }
                ],
                schoolList: ['华二黄中', '华师大二附中'],
                origUser: {}
            };
        },
        methods: {
            switchFocus(ref) {
                this.$refs[ref] ? this.$refs[ref].inputSelect() : 0;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            username: this.form.username,
                            name: this.form.name,
                            school: this.form.school,
                            uid: this.form.uid,
                            group: this.form.group,
                            password: this.form.password
                        };
                        (this.$route.name === 'CreateUser'
                            ? this.$http.post(this.$store.state.api + 'user/register', data)
                            : this.$http.put(this.$store.state.api + 'user/' + this.origUser.username, data))
                            .then(
                                response => {
                                    if (this.$route.name === 'EditUser') {
                                        this.changeGroup();
                                    } else {
                                        this.succeed();
                                    }
                                },
                                error => {
                                    this.$message.error(error.body.message);
                                }
                            );
                    }
                });
            },
            changeGroup() {
                if (this.form.group !== this.origUser.group) {
                    this.$http.put(this.$store.state.api + 'user/' + this.origUser.username + '/group', {
                        group: this.form.group
                    })
                        .then(
                            response => {
                                this.changePassword();
                            },
                            error => {
                                this.$message.error(error.body.message);
                            }
                        );
                } else {
                    this.changePassword();
                }
            },
            changePassword() {
                if (this.form.password !== '') {
                    this.$http.put(this.$store.state.api + 'user/' + this.origUser.username + '/password', {
                        password: this.form.password
                    })
                        .then(
                            response => {
                                this.succeed();
                            },
                            error => {
                                this.$message.error(error.body.message);
                            }
                        );
                } else {
                    this.succeed();
                }
            },

            succeed() {
                this.$message.success(this.$route.name === 'EditUser'
                    ? '修改成功！'
                    : '创建成功！');
                this.$store.dispatch('getUserList').then(
                    () => this.$router.push({ name: 'UserAdmin' })
                );
            },
            resetForm(formName) {
                if (this.$route.name === 'EditUser') {
                    this.form.username = this.origUser.username;
                    this.form.name = this.origUser.name;
                    this.form.school = this.origUser.school;
                    this.form.group = this.origUser.group;
                    this.form.uid = this.origUser.uid;
                } else {
                    this.$refs[formName].resetFields();
                }
            }
        },
        created() {
            if (this.$route.name === 'EditUser') {
                this.$store.dispatch('getUser', this.$route.params.username).then(
                    user => {
                        this.origUser = user;
                        this.resetForm('form');
                    }
                )
            }
        }
    };
</script>

<style scoped>
    .full {
        display: flex;
        justify-content: center;
    }

    .form {
        width: 100%;
        padding: 1rem;
    }
</style>