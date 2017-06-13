<template>
    <div class="upload-container">
        <el-row :gutter="24">
            <el-col :span="12" class="col-margin">
                <h3>上传用户名单</h3>
                <p>如需批量上传用户名单，请按照规定格式编辑 Excel 文档并上传。</p>
                <a href="https://baidu.com" target="_blank"><small>点击获取 Excel 文档样例</small></a>
            </el-col>
            <el-col :span="12">
                <el-upload class="upload" drag
                           action="https://jsonplaceholder.typicode.com/posts/"
                           multiple
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将 Excel 文件拖到此处，或 <em>点击上传</em></div>
                </el-upload>
            </el-col>
        </el-row>
    </div>
</template>

<script>

</script>

<style>
    .upload-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
    }

    .el-col:first-child {
        padding-left: 24px !important;
    }

    .el-col:last-child {
        padding-right: 24px !important;
    }

    .upload {
        margin-top: 1rem;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    a {
        color: #999999;
        text-decoration: none;
    }

    @media(max-width: 600px) {
        .el-row {
            display: flex;
            flex-direction: column;
        }

        .el-col {
            width: 100%;
        }

        .el-col {
            padding-left: 24px !important;
            padding-right: 24px !important;
        }
    }
</style>