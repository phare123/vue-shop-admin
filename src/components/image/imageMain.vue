<template>
    <el-main v-loading="loading">
        <div class="main-top">
            <el-row>
                <el-col v-for="item in imageList" :span="6">
                    <el-card shadow="hover">
                        <el-image :src="item.url" fit="cover" lazy :zoom-rate="1.2" :preview-src-list="[item.url]"
                            :initial-index="0" />
                        <div class="shadowMask">{{ item.name }}</div>
                        <div class="bottom">
                            <el-checkbox v-if="isCheckedImg" v-model="item.checked" @change="handlexCheck(item)"/>
                            <el-button text type="primary" size="small" @click="handleReName(item)">重命名</el-button>
                            <el-popconfirm title="是否删除该图片?" confirm-button-text="确定" cancel-button-text="取消"
                                @confirm="handleDelImg(item.id)">
                                <template #reference>
                                    <el-button text type="primary" size="small">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </el-card>
                </el-col>
                <el-col v-if="imageList && imageList.length == 0" :span="24"><el-empty description="暂无图片" /></el-col>
            </el-row>
        </div>
    </el-main>
</template>

<script setup>
import { msgBox, notification } from '../../util/msgTip';
import { computed,  ref, } from 'vue-demi';
import { reNameImg, delImg } from '../../api/image';
import { useStore } from 'vuex';

const prop = defineProps({
    isCheckedImg:{
        type:Boolean,
        default:false
    },
    limit:{
        type:Number,
        default:1
    }
})
const store = useStore()
const loading = ref(false)
const imageList = computed(() => {
    return store.state.imageList
})
const currentPage = ref(1)
// 重命名
const handleReName = (item) => {
    msgBox('重命名', item.name).then(({ value }) => {
        loading.value = true
        reNameImg(item.id, value).then(res => {
            notification('修改成功', 2000, 'success')
        }).finally(res => loading.value = false)
    })
}
// 点击删除
const handleDelImg = (id) => {
    delImg([id])
}
// 处理多选问题
const emit = defineEmits(['choose'])
const checkedImg = computed(() => imageList.value.filter(o => o.checked))
const handlexCheck = (item) => {
    if(item.checked && checkedImg.value.length > prop.limit){
        item.checked = false
        return notification(`只能选择${prop.limit}张图片`,2000,'error')
    }
    emit('choose',checkedImg.value)
}
</script>

<style lang="less" scoped>
.el-main {
    position: relative;
    background-color: #fff !important;

    .main-top {
        padding: 20px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 40px;
        overflow-y: auto;

        .el-row {
            .el-col {
                margin: 5px 0;

                .el-card {
                    position: relative;
                    width: 15vw;

                    :deep(.el-card__body) {
                        padding: 0;
                    }

                    .el-image {
                        width: 100%;
                        height: 150px;
                        object-fit: cover;
                    }

                    .bottom {
                        padding: 5px 0 7px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .shadowMask {
                        height: 30px;
                        width: 100%;
                        line-height: 30px;
                        text-align: center;
                        color: #fff;
                        background-color: rgba(51, 51, 51, 0.358);
                        position: absolute;
                        bottom: 40px;
                    }
                }
            }
        }
    }

    border-radius: 0 0 8px 0;
}
</style>