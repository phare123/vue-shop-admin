<template>
    <el-aside width="13vw">
        <div class="aside-top">
            <div class="aside-item" :class="activeIdx == index ? 'active' : ''" @click="handleCheck(index, item.id)"
                v-for="(item, index) in imageClass.list">
                <el-tooltip effect="dark" :content="item.name" placement="left">
                    <div class="text">{{ item.name }}</div>
                    </el-tooltip>
                    <div class="icon">
                        <el-button @click.stop="handleEdit(item)" text type="primary" size="small"><el-icon :size="16">
                                <Edit />
                            </el-icon></el-button>
                        <span @click.stop="() => {}">
                            <el-popconfirm title="是否删除该分类?" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDelete(item.id)">
                            <template #reference>
                                <el-button text type="primary" size="small"><el-icon :size="16">
                                        <Close />
                                    </el-icon></el-button>
                            </template>
                        </el-popconfirm>
                        </span>
                    </div>
            </div>
        </div>
        <div class="aside-bottom">
            <el-pagination :current-page="currentPage" background layout="prev, next" :total="Number(imageClass.totalCount)"
                @current-change="getData" />
        </div>
    </el-aside>
    <!-- 抽屉 -->
    <form-drawer ref="formDrawerRef" :title="isEdit?'编辑':'新增'" confirm-text="提交" destroyOnClose @submit="onSubmit">
        <el-form :rules="rules" ref="formRef" :model="Form" status-icon label-width="auto">
            <el-form-item label="相册名称" prop="name">
                <el-input v-model="Form.name" />
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="Form.count" :min="1" :max="500" />
            </el-form-item>
        </el-form>
    </form-drawer>
</template>

<script setup>
import { onMounted, ref } from "vue-demi"
import { useStore } from "vuex";
import formDrawer from '@/components/formdrawer/formDrawer.vue'
import { notification } from "../../util/msgTip";
import { getImageClass, addImageClass, editImageClass, delImageClass } from '@/api/image'

const store = useStore()
const rules = {
    name: [
        { required: true, message: "图库分类相册名不能为空", trigger: "blur" },
    ],
}
// 页码，列表数据
const currentPage = ref(1)
const imageClass = ref({})
const emit = defineEmits(['change'])
// 是否激活样式与选中事件
const activeIdx = ref(0)
const handleCheck = (index, id) => {
    activeIdx.value = index
    getImgData(id)
    emit('change', id || imageClass.value.list[0].id)
}
// 获取图片
const getImgData = (id) => {
    const params = {
        id: id || imageClass.value.list[0].id,
        page: currentPage.value || 1
    }
    store.dispatch('getimagelist', params)
}
// 获取列表数据
const getData = async (pageIdx) => {
    let pageIndex = pageIdx ? pageIdx : 1
    currentPage.value = pageIdx
    let res = await getImageClass(pageIndex)
    imageClass.value = res.data
    handleCheck(0)
}

// 判断新增或编辑提交响应请求
const isEdit = ref(false)
const formRef = ref(null)
const Form = ref({
    name: '',
    count: 1
})
const formDrawerRef = ref(null)
const handleAdd = () => {
    isEdit.value = false
    formDrawerRef.value.open()
}
const itemId = ref(0)
const handleEdit = (item) => {
    isEdit.value = true
    itemId.value = item.id
    Form.value.name = item.name
    Form.value.count = item.images_count
    formDrawerRef.value.open()
}
defineExpose({
    handleAdd
})
const onSubmit = () => {
    formRef.value.validate(async (valid) => {
        if (!valid) return
        formDrawerRef.value.startLoading()
        if (isEdit.value) {
            let res = await editImageClass(itemId.value, Form.value)
            if (res.msg == 'ok') {
                notification('编辑分类成功', 1000, 'success')
                formDrawerRef.value.endLoading()
                formDrawerRef.value.close()
            }
        } else {
            let res = await addImageClass(Form.value)
            if (res.msg == 'ok') {
                notification('新增分类成功', 1000, 'success')
                formDrawerRef.value.endLoading()
                formDrawerRef.value.close()
            }
        }
    })
    getData()
}
// 移除列表
const handleDelete = (id) => {
    delImageClass(id).then(res => notification('删除成功', 2000, 'success'))
    getData()
}

onMounted(() => {
    getData()
})
</script>

<style lang="less" scoped>
// 激活状态
.active {
    background-color: #eff6ff;
}

.el-aside {
    position: relative;
    background-color: #fff !important;

    .aside-top {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 40px;
        overflow-y: auto;

        .aside-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 3px;

            .text {
                cursor: pointer;
                color: #666;
                padding-left: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .icon {
                display: flex;
                justify-content: center;
                align-items: center;
                color: #4339ca;
            }

            &:hover {
                transition: all .5s;
                background-color: #eff6ff;
            }
        }
    }

    .aside-bottom {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -30%);
        display: flex;
        align-items: center;
        justify-content: center;

        .el-button {
            &:hover {
                .el-icon {
                    color: #68a9ff;
                }
            }
        }
    }

    border-radius: 0 0 0 8px;
}
</style>