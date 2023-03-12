<template>
    <div>
        <el-card shadow="always">
            <!-- 搜索 | 重置 -->
            <div class="search">
                <el-input prefix-icon="Search" v-model="searchForm" placeholder="手机号/邮箱/会员名称" clearable @change="getData" />
            </div>
            <!-- 新增 | 刷新 -->
            <tableHeader @create="handleCreate" @refresh="getData" />
            <!-- 表格部分 -->
            <el-table max-height="480px" :data="tableData" stripe style="width: 100%" v-loading="loading">
                <el-table-column label="会员" width="200">
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
                <el-table-column align="center" label="会员等级" width="340">
                    <template #default="{ row }">
                        {{ row.user_level ? row.user_level.name : '-' }}
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="create_time" label="注册时间" width="400" />
                <el-table-column label="状态" width="120">
                    <template #default="{ row }">
                        <el-switch :disabled="row.super == 1" @change="handleChange($event, row)" :model-value="row.status"
                            :active-value="1" :inactive-value="0" active-color="#4339ca">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="auto" align="center">
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
        <form-drawer ref="formDrawerRef" :title="isEdit ? '编辑' : '新增'" confirm-text="提交" destroyOnClose
            @submit="onSubmit">
            <el-form ref="formRef" :model="Form" status-icon label-width="auto">
                <el-form-item label="用户名" prop="title">
                    <el-input v-model="Form.username" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="密码" prop="content">
                    <el-input v-model.number="Form.password" :rows="5" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item label="昵称" prop="content">
                    <el-input v-model="Form.nickname" :rows="5" placeholder="请输入昵称" />
                </el-form-item>
                <el-form-item label="头像">
                    <SelectImg @choose="handleChoose" />
                </el-form-item>
                <el-form-item label="会员等级" prop="content">
                    <el-select v-model="Form.user_level_id" class="m-2" placeholder="请选择会员等级">
                        <el-option v-for="item in levelArr" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="手机" prop="content">
                    <el-input v-model="Form.phone" :rows="5" placeholder="请输入手机号" />
                </el-form-item>
                <el-form-item label="邮箱" prop="content">
                    <el-input v-model="Form.email" :rows="5" placeholder="请输入邮箱" />
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
import { getUser, delUser, changeUserStatus, addUser, editUser } from '@/api/user'
import { useInitForm, useInitTable } from '@/util/useCommon'
import SelectImg from '@/components/manager/selectImg.vue'
import tableHeader from '@/components/common/tableHeader.vue';
import {onMounted ,ref} from 'vue'

const levelArr = ref([])
// 获取表格数据与分页
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
    del: delUser,
    getList: getUser,
    changeStatus: changeUserStatus,
    onGetListSuccess: (res) => {
        total.value = res.data.totalCount;
        tableData.value = res.data.list;
        levelArr.value = res.data.user_level
    },
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
        username:'',
        password:0,
        status:1,
        nickname:'',
        phone:0,
        email:'',
        avatar:'',
        user_level_id:0
    },
    getData,
    add: addUser,
    edit: editUser
})

const handleChoose = (e) => {
    Form.value.avatar = e.value[0].url;
    console.log(Form.value);
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