<template>
    <div>
        <el-card shadow="always">
            <!-- 搜索 | 重置 -->
            <div class="search">
                <el-input prefix-icon="Search" v-model="searchForm.keyword" placeholder="管理员名称" clearable @change="getData" />
            </div>
            <!-- 新增|刷新 -->
            <tableHeader @create="handleCreate" @refresh="getData" />
            <!-- 表格部分 -->
            <el-table max-height="450px" :data="tableData" stripe style="width: 100%" v-loading="loading">
                <el-table-column label="管理员" width="320">
                    <template #default="{ row }">
                        <div class="avatarItem">
                            <div class="l-content">
                                <el-avatar :size="40"
                                    :src="row.avatar != '' ? row.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
                            </div>
                            <div class="r-content">
                                <span>{{ row.username }}</span>
                                <span>ID: {{ row.id }}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="所属角色" width="340">
                    <template #default="{ row }">
                        <span>{{ row.role.name ? row.role.name : '-' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="120">
                    <template #default="{ row }">
                        <el-switch :disabled="row.super == 1" @change="handleChange($event, row)" :model-value="row.status"
                            :active-value="1" :inactive-value="0" active-color="#4339ca">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="420" align="center">
                    <template #default="scoped">
                        <el-button :disabled="scoped.row.super == 1" link type="primary" size="small"
                            @click.stop="handleEdit(scoped.row)">编辑</el-button>
                        <el-popconfirm title="确认删除吗?" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDel(scoped.row.id)">
                            <template #reference>
                                <el-button :disabled="scoped.row.super == 1" link type="primary" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination small background layout="prev, pager, next" :total="total" @current-change="changePage" />
        </el-card>
        <form-drawer ref="formDrawerRef" :title="isEdit ? '编辑公告' : '新增公告'" confirm-text="提交" destroyOnClose
            @submit="onSubmit">
            <el-form ref="formRef" :model="Form" status-icon label-width="auto">
                <el-form-item label="用户名">
                    <el-input v-model="Form.username" placeholder="请输入名称" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="Form.password" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item label="头像" style="display: flex;">
                    <el-image style="width:100px;height: 100px;margin-right: 10px;" v-show="Form.avatar" lazy :src="Form.avatar" fit="cover" />
                    <SelectImg @choose="handleChoose" />
                </el-form-item>
                <el-form-item label="所属角色">
                    <el-select v-model="Form.role_id" placeholder="请选择所属角色">
                        <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="Form.status" :active-value="1" :inactive-value="0" active-color="#4339ca">
                    </el-switch>
                </el-form-item>
            </el-form>
        </form-drawer>
    </div>
</template>

<script setup>
import { getManagerList, delManager, changeStatus, addManager, EditManager } from '@/api/manager'
import { onMounted, ref } from 'vue-demi';
import SelectImg from '@/components/manager/selectImg.vue'
import { useInitTable, useInitForm } from '@/util/useCommon'
import tableHeader from '@/components/common/tableHeader.vue';

const roles = ref([]);
// 搜索与分页,删除与修改状态
const {
    loading,
    tableData,
    total,
    searchForm,
    changePage,
    getData,
    handleDel,
    handleChange,
} = useInitTable({
    getList: getManagerList,
    del: delManager,
    searchForm:{
        keyword:''
    },
    changeStatus,
    onGetListSuccess: (res) => {
        roles.value = res.data.roles;
        total.value = res.data.totalCount;
        tableData.value = res.data.list;
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
        username: "",
        password: "",
        role_id: 0,
        status: 1,
        avatar: "",
    },
    getData,
    add: addManager,
    edit: EditManager
})

const handleChoose = (e) => {
    Form.value.avatar = e.value[0].url;
};

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