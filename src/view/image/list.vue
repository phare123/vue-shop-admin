<template>
    <el-container :style="{ height: (h + 'px') }">
        <el-header>
            <el-button @click="openAdd" type="primary">新增图片分类</el-button>
            <el-button @click="openImg" type="warning">上传图片</el-button>
        </el-header>
        <el-container>
            <image-aside ref="imageAsideRef" @change="handleChangeId"/>
            <image-main ref="imageMainRef" />
        </el-container>
        <!-- 图片上传抽屉 -->
        <form-drawer ref="formDrawerRef" title="上传图片" destroyOnClose>
            <el-upload 
                drag 
                :action="uploadSrc"
                multiple 
                :headers="{ token }" 
                name="img" 
                :data="{image_class_id:imgClassId}"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    拖拽文件至此 或<em>点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        只能上传jpg / png 格式图片，且大小不能超过500kb
                    </div>
                </template>
            </el-upload>
        </form-drawer>
    </el-container>
</template>

<script setup>
import imageAside from '@/components/image/imageAside.vue'
import imageMain from '@/components/image/imageMain.vue'
import { notification } from '../../util/msgTip';
import { uploadSrc } from '@/api/image';
import { getToken } from '@/util/token';
import { ref } from 'vue-demi'

const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 150

const imageAsideRef = ref(null)
const openAdd = () => imageAsideRef.value.handleAdd()

const formDrawerRef = ref(null)
const token = getToken()
const openImg = () => {
    formDrawerRef.value.open()
}
const imgClassId = ref(0)
const handleChangeId = (id) => {
    imgClassId.value = id
}
// 上传成功
const uploadSuccess = (response, uploadFile, uploadFiles) => {
    console.log('上传成功');
}
// 上传失败
const uploadError = (error, uploadFile, uploadFiles) => {
    console.log(uploadFile);
    let msg = (JSON.parse(error.message)).msg;
    notification(msg,2000,'error')
}
</script>

<style lang="less" scoped>
.el-container {
    .el-header {
        border-radius: 8px 8px 0 0;
        background-color: #fff;
        display: flex;
        align-items: center;
        padding: 0 20px;
        border-bottom: solid #eee 1px;

        .el-button {
            margin-right: 10px;
        }
    }
}
</style>