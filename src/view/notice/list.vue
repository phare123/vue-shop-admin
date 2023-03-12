<template>
    <div>
        <el-card shadow="always">
            <tableHeader  @create="handleCreate" @refresh="getData"/>
            <!-- 表格部分 -->
            <el-table max-height="480px" :data="tableData" stripe style="width: 100%" v-loading="loading">
                <el-table-column prop="title" label="公告标题" width="320" />
                <el-table-column prop="content" label="内容" width="340" />
                <el-table-column prop="create_time" label="发布时间" width="400" />
                <el-table-column fixed="right" label="操作" width="120" align="center">
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
        <form-drawer ref="formDrawerRef" :title="isEdit ? '编辑公告' : '新增公告'" confirm-text="提交" destroyOnClose
            @submit="onSubmit">
            <el-form :rules="rules" ref="formRef" :model="Form" status-icon label-width="auto">
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="Form.title" placeholder="请输入标题" />
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input v-model="Form.content" :rows="5" type="textarea" placeholder="请输入内容" />
                </el-form-item>
            </el-form>
        </form-drawer>
    </div>
</template>

<script setup>
import { getNotice, addNotice, delNotice, editNotice } from '@/api/notice'
import { useInitForm, useInitTable } from '@/util/useCommon'
import tableHeader from '@/components/common/tableHeader.vue';
import { onMounted } from 'vue-demi';
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
    handleDel
} = useInitTable({
    del:delNotice,
    getList: getNotice,
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
        title: '',
        content: ''
    },
    getData,
    add: addNotice,
    edit: editNotice
})

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