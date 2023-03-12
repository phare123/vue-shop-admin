<template>
    <div>
        <el-card shadow="always">
            <tableHeader layout="create,delete,refresh" @delete="handleDel(ids)" @create="handleCreate" @refresh="getData" />
            <!-- 表格部分 -->
            <el-table 
            max-height="480px" 
            :data="tableData" 
            stripe style="width: 100%" 
            v-loading="loading" 
            @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" />
                <el-table-column prop="name" label="规格名称" width="230" />
                <el-table-column prop="default" label="规格值" width="270" />
                <el-table-column prop="order" label="排序" width="240" />
                <el-table-column label="状态" width="200">
                    <template #default="{ row }">
                        <el-switch :disabled="row.super == 1" @change="handleChange($event, row)" :model-value="row.status"
                            :active-value="1" :inactive-value="0" active-color="#4339ca">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200" align="center">
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
            <el-pagination small background layout="prev, pager, next" :total="total" @current-change="changePage" />
        </el-card>
        <!-- 新增与编辑 -->
        <form-drawer ref="formDrawerRef" :title="isEdit ? '编辑' : '新增'" confirm-text="提交" destroyOnClose
            @submit="onSubmit">
            <el-form :rules="rules" ref="formRef" :model="Form" status-icon label-width="auto">
                <el-form-item label="规格名称" prop="name">
                    <el-input v-model="Form.name" placeholder="请输入规格名称" />
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number v-model="Form.order" :min="0" :max="1000"></el-input-number>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="Form.status" :active-value="1" :inactive-value="0" active-color="#4339ca">
                    </el-switch>
                </el-form-item>
                <el-form-item prop="defalut" label="规格">
                    <tagInput v-model="Form.default" />
                </el-form-item>
            </el-form>
        </form-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import tableHeader from '@/components/common/tableHeader.vue';
import { getSkus, addSkus, editSkus, delSkus, changeSkusStatus } from '@/api/skus'
import { useInitForm, useInitTable } from '@/util/useCommon'
import { onMounted } from 'vue-demi';

const ids = ref([])
// 表格数据
const rules = {
    title: [
        { required: true, message: "标题不能为空", trigger: "blur" },
    ],
    content: [
        { required: true, message: "内容不能为空", trigger: "blur" },
    ],
}
// 获取表格数据与分页
const {
    loading,
    tableData,
    total,
    changePage,
    getData,
    handleDel,
    handleChange,
} = useInitTable({
    changeStatus:changeSkusStatus,
    del: delSkus,
    getList: getSkus,
})
// 新增 | 编辑
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
        name: '',
        status: 1,
        default:'',
        order:50
    },
    getData,
    add: addSkus,
    edit: editSkus
})
// 多选
const handleSelectionChange = (val) =>{
    ids.value = val.map(o => o.id)
}

onMounted(() => {
    getData()
})
</script>

<style lang="less" scoped>
.el-card {
    position: relative;
    padding-bottom: 30px;

    .el-pagination {
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translate(-50%, 0);
    }
}
</style>