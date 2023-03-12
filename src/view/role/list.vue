<template>
    <div>
        <el-card shadow="always">
            <tableHeader @create="handleCreate" @refresh="getData" />
            <!-- 表格部分 -->
            <el-table max-height="480px" :data="tableData" stripe style="width: 100%" v-loading="loading">
                <el-table-column prop="name" label="角色名称" width="320" />
                <el-table-column prop="desc" label="角色描述" width="360" />
                <el-table-column label="状态" width="320">
                    <template #default="{ row }">
                        <el-switch :disabled="row.super == 1" @change="handleChange($event, row)" :model-value="row.status"
                            :active-value="1" :inactive-value="0" active-color="#4339ca">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200" align="center">
                    <template #default="scoped">
                        <el-button link type="primary" size="small" @click="handleSetPermission(scoped.row)">配置权限</el-button>
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
        <form-drawer ref="formDrawerRef" :title="isEdit ? '编辑公告' : '新增公告'" confirm-text="提交" destroyOnClose
            @submit="onSubmit">
            <el-form ref="formRef" :model="Form" status-icon label-width="auto">
                <el-form-item label="角色名称">
                    <el-input v-model="Form.name" placeholder="请输入角色名称" />
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input type="textarea" rows="4" v-model="Form.desc" placeholder="请输入角色描述" />
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="Form.status" :active-value="1" :inactive-value="0" active-color="#4339ca">
                    </el-switch>
                </el-form-item>
            </el-form>
        </form-drawer>
        <!-- 权限配置 -->
        <form-drawer ref="setRoleformDrawerRef" title="配置权限" confirm-text="提交" destroyOnClose @submit="handleTreeSubmit">
            <el-tree-v2 
            v-loading="loading"
            ref="treeRef"
            :data="ruleList" 
            :props="{label:'name',children:'child'}"  
            show-checkbox 
            :height="height"
            :default-expanded-keys="defaultExpandedKeys"
            @check="handleTreeCheck"
            >
            <template #default="{ node, data }">
                <div>
                    <el-tag :type="data.menu == 1?'':'info'" size="small" style="margin: 0 5px;">{{ data.menu == 1 ? '菜单' : '权限'}}</el-tag>
                    <span>{{ data.name }}</span>
                </div>
            </template>
            </el-tree-v2>
        </form-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import tableHeader from '@/components/common/tableHeader.vue';
import {getRules} from '@/api/access'
import { getRoles, addRoles, editRoles, delRoles, changeRoleStatus, setRoleRule } from '@/api/role'
import { useInitForm, useInitTable } from '@/util/useCommon'
import { onMounted } from 'vue-demi';
import {notification} from '@/util/msgTip'
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
    changeStatus:changeRoleStatus,
    del: delRoles,
    getList: getRoles,
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
        desc:''
    },
    getData,
    add: addRoles,
    edit: editRoles
})

// 配置权限
const height = window.innerHeight - 170
const setRoleformDrawerRef = ref(null)
const treeRef = ref(null)
const defaultExpandedKeys = ref([])
const ruleList = ref([])
const roleId = ref(0)
// 当前用户的权限id
const ruleIds = ref([])
const handleSetPermission = (row) => {
    roleId.value = row.id
    getRules(1).then(res => {
        ruleList.value = res.data.list
        setRoleformDrawerRef.value.open()
        defaultExpandedKeys.value = res.data.list.map(item => item.id)
        // 当前用户的权限id
        ruleIds.value = row.rules.map(o => o.id)
        setTimeout(() => {
            treeRef.value.setCheckedKeys(ruleIds.value)
        },150)
    })
}
const handleTreeCheck = (...e) => {
    const {checkedKeys,halfCheckedKeys} = e[1]
    ruleIds.value = [...checkedKeys,...halfCheckedKeys]
}
const handleTreeSubmit = () => {
    setRoleformDrawerRef.value.startLoading()
    setRoleRule(roleId.value,ruleIds.value).then(res => {
        notification('配置成功',2000,'success')
        setRoleformDrawerRef.value.close()
        getData()
    }).finally(() => {
        setRoleformDrawerRef.value.endLoading()
    })
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