<template>
    <div>
        <el-card shadow="always">
            <!-- 新增|刷新 -->
            <tableHeader @create="handleCreate" @refresh="getData" />
            <!-- 表格部分 -->
            <el-table max-height="480px" :data="tableData" stripe style="width: 100%" v-loading="loading">
                <el-table-column prop="name" width="auto" />
                <el-table-column width="100" align="center">
                    <template #default="scoped">
                        <el-button link type="primary" size="small" @click="openGoodsDrawer(scoped.row)">推荐产品</el-button>
                    </template>
                </el-table-column>
                <el-table-column  width="50">
                    <template #default="{ row }">
                        <el-switch :disabled="row.super == 1" @change="handleChange($event, row)" :model-value="row.status"
                            :active-value="1" :inactive-value="0" active-color="#4339ca">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" width="120" align="center">
                    <template #default="scoped">
                        <el-button link type="primary" size="small" @click="handleEdit(scoped.row)">编辑</el-button>
                        <el-popconfirm title="确认删除吗?" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDel(scoped.row.id)">
                            <template #reference>
                                <el-button link type="primary" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 抽屉 -->
        <form-drawer ref="formDrawerRef" :title="isEdit ? '编辑' : '新增'" confirm-text="提交" destroyOnClose
            @submit="onSubmit">
            <el-form ref="formRef" :model="Form" status-icon label-width="auto">
                <el-form-item label="分类名称">
                    <el-input v-model="Form.name" placeholder="请输入分类名称" />
                </el-form-item>
            </el-form>
        </form-drawer>
        <categoryFormDrawer ref="goodsFormDrawerRef" />
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { getCategory, delCategory, changeCategoryStatus, addCategory, editCategory } from '@/api/category'
import { onMounted } from 'vue-demi';
import categoryFormDrawer from './components/categoeyFormDrawer.vue'
import { useInitTable, useInitForm } from '@/util/useCommon'
import tableHeader from '@/components/common/tableHeader.vue';

// 搜索与分页,删除与修改状态
const {
    loading,
    tableData,
    getData,
    handleDel,
    handleChange,
} = useInitTable({
    getList: getCategory,
    del: delCategory,
    changeStatus:changeCategoryStatus,
    onGetListSuccess: (res) => {
        tableData.value = res.data;
    },
})
// 新增与删除
const {
    formDrawerRef,
    formRef,
    isEdit,
    Form,
    handleCreate,
    handleEdit,
    onSubmit
} = useInitForm({
    Form: {
        name:'',
        status:1
    },
    getData,
    add: addCategory,
    edit: editCategory
})
// 推荐产品
const goodsFormDrawerRef = ref(null)
const openGoodsDrawer = (data) => {
    goodsFormDrawerRef.value.open(data)
}

onMounted(() => {
    getData()
})
</script>

<style lang="less" scoped>
.el-card {
    position: relative;
    padding-bottom: 30px;

    .search {
        .el-input {
            width: 200px;
            margin-bottom: 20px;
        }
    }


    .el-pagination {
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translate(-50%, 0);
    }

    .el-table {
        .avatarItem {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .r-content {
                margin-left: 10px;
                display: flex;
                flex-direction: column;

                span {
                    color: #666;

                    &:nth-of-type(2) {
                        font-size: .7rem;
                    }
                }
            }
        }
    }
}
</style>