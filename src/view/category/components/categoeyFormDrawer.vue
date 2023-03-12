<template>
    <div>
        <formDrawer ref="formDrawerRef" confirm-text="关联" title="推荐产品" destroyOnClose @submit="submit">
            <el-table :data="tableData" border style="width: 100%" v-loading="loading">
                <el-table-column align="center" prop="goods_id" label="编号" width="80" />
                <el-table-column align="center" prop="date" label="商品封面" width="200">
                    <template #default="{row}">
                        <el-image style="width: 70px; height: 70px" :src="row.cover" fit="cover" />
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="name" label="商品名称" width="180" />
                <el-table-column align="center" label="操作" width="100">
                    <template #default="{row}">
                        <el-popconfirm title="确认删除吗?" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDel(row.id)">
                            <template #reference>
                                <el-button link type="primary" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </formDrawer>
        <selectGoods ref="selectGoodsRef"/>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import formDrawer from '@/components/formdrawer/formDrawer.vue'
import {notification} from '@/util/msgTip'
import { getCategoryItem, delCategoryItem } from '@/api/category'
import selectGoods from './selectGoods.vue'

const category_id = ref(0)
const tableData = ref([])
const formDrawerRef = ref(null)
// 打开抽屉
const open = (data) => {
    category_id.value = data.id
    getData().then(res => {
        formDrawerRef.value.open()
    })
}
// 获取数据
const getData = () => {
    return getCategoryItem(category_id.value).then(res => {
        tableData.value = res.data
    })
}
// 删除操作
const loading = ref(false)
const handleDel = (id) => {
    loading.value = true
    delCategoryItem(id).then(res => {
        notification('删除成功',2000,'success')
        getData()
    }).finally(() => {
        loading.value = false
    })
}
const selectGoodsRef = ref(null)
const submit = () => {
    selectGoodsRef.value.open()
}

defineExpose({
    open
})
</script>