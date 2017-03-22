<template>
    <div class="full">
        <el-table :data="booksFail" class="table">
            <el-table-column
                    prop="bookname"
                    label="未通过测试书目">
            </el-table-column>
        </el-table>

        <el-table :data="booksPass" class="table">
            <el-table-column
                    prop="bookname"
                    label="已通过测试书目">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                booksFail: [{
                    bookname: '《他改变了中国》'
                }, {
                    bookname: '《JavaScript从入门到放弃》'
                }],


                booksPass: [{
                    bookname: '《江南皮革厂倒闭之谜》'
                }]
            }
        }
    }
</script>

<style scoped>
    .full {
        display: flex;
        flex-direction: column;
    }

    .table {
        width: 15rem;
        margin: 1.3rem 1rem 0rem 1rem;
    }

</style>