<template>
    <el-drawer v-model="drawer" :title="title" :close-on-click-modal="false" :size="size"
        :destroy-on-close="destroyOnClose">
        <div class="formDrawer">
            <div class="body" style="overflow: auto">
                <slot></slot>
            </div>
            <div class="btn">
                <div style="flex: auto" v-if="confirmText">
                    <el-button type="primary" color="#6366f1" :loading="loading" @click="submit">{{ confirmText
                    }}</el-button>
                    <el-button @click="drawer = false">取消</el-button>
                </div>
            </div>
        </div>
</el-drawer>
</template>

<script setup>
import { ref } from "vue-demi";

const drawer = ref(false)
const loading = ref(false)
const props = defineProps({
    title: String,
    size: {
        type: String,
        default: '40%'
    },
    confirmText: {
        type: String
    },
    destroyOnClose: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['submit'])
const submit = () => emit('submit')

// 打开
const open = () => {
    drawer.value = true
}
// 关闭
const close = () => {
    drawer.value = false
}
// 开始加载
const startLoading = () => {
    loading.value = true
}
// 结束加载
const endLoading = () => {
    loading.value = false
}
// 向父组件暴露方法
defineExpose({
    open,
    close,
    startLoading,
    endLoading
})
</script>

<style lang="less" scoped>
.formDrawer {
    width: 100%;
    height: 100%;

    .body {
        width: 100%;
        height: 92%;
        margin-bottom: 20px;
    }
}
</style>