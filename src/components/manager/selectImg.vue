<template>
    <div class="plus-icon" @click="open" v-if="showPlusIcon">
        <el-icon :size="25">
            <Plus />
        </el-icon>
    </div>
    <!-- 弹出框 -->
    <el-dialog v-model="dialogVisible" title="图片选择" width="85%" top="2vh">
        <el-container>
            <image-aside ref="imageAsideRef" @change="handleChangeId"/>
            <image-main :limit="limit" ref="imageMainRef" :isCheckedImg="true" @choose="handleChoose"/>
        </el-container>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="onSubmit" color="#4339ca">确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import imageAside from '@/components/image/imageAside.vue'
import imageMain from '@/components/image/imageMain.vue'
import { getToken } from '@/util/token';
import { ref } from 'vue-demi'

const dialogVisible = ref(false)
const imageAsideRef = ref(null)
const formDrawerRef = ref(null)
const checkedImg = ref([])
const url = ref('')

const openAdd = () => imageAsideRef.value.handleAdd()
const token = getToken()
const openImg = () => {
    formDrawerRef.value.open()
}
const imgClassId = ref(0)
const handleChangeId = (id) => {
    imgClassId.value = id
}
// 确定事件
const emit = defineEmits(['choose'])
const onSubmit = () => {
    dialogVisible.value = false
    url.value = checkedImg.value[0].url
    emit('choose',checkedImg)
}

const handleChoose = (e) => {
    checkedImg.value = e
}
const open = () => {
    dialogVisible.value = true
}

defineExpose({
    open
})
defineProps({
    limit:{
        type:Number,
        default:1
    },
    showPlusIcon:{
        type:Boolean,
        default:true
    }
})

</script>

<style lang="less" scoped>
.plus-icon {
    margin: 10px 10px 10px 0;
    // margin-left: 5px;
    position: relative;
    width: 100px;
    height: 100px;
    border: dotted 1px #ccc;
    transition: all .3s;

    &:hover {
        background-color: #f3f4f7;
    }

    .el-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        color: #999;
    }
}
.el-container {
    height: 70vh;
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