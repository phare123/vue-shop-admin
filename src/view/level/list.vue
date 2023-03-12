<template>
    <div>
        <el-card shadow="always">
            <tableHeader @create="handleCreate" @refresh="getData" />
            <!-- 表格部分 -->
            <el-table max-height="480px" :data="tableData" stripe style="width: 100%" v-loading="loading">
                <el-table-column align="center" prop="name" label="会员等级" width="220" />
                <el-table-column align="center" prop="content" label="折扣率" width="240">
                    <template #default="{ row }">
                        <span>{{ row.discount }}%</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="level" label="等级序号" width="400" />
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
        <form-drawer ref="formDrawerRef" :title="isEdit ? '编辑公告' : '新增公告'" confirm-text="提交" destroyOnClose
            @submit="onSubmit">
            <el-form :rules="rules" ref="formRef" :model="Form" status-icon label-width="auto">
                <el-form-item label="等级名称" prop="title">
                    <el-input v-model="Form.name" placeholder="等级名称" />
                </el-form-item>
                <el-form-item label="等级权重" prop="content">
                    <el-input v-model="Form.level" :rows="5" placeholder="等级权重" />
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-switch v-model="Form.status" :active-value="1" :inactive-value="0" active-color="#4339ca">
                    </el-switch>
                </el-form-item>
                <el-form-item label="升级条件">
                    <div style="display: flex; flex-direction: column;">
                        <div style="display: flex;">
                            <small style="margin-right: 5px;">累计消费满</small>
                            <el-input  type="number" style="width: 40%;" v-model="Form.max_price" controls-position="right">
                                <template #append>元</template>
                            </el-input>
                        </div>
                        <small style="color: #999;">设置会员等级所需要的累计消费必须大于等于0,单位：元</small>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <div style="display: flex;">
                            <small style="margin-right: 5px;">累计次数满</small>
                            <el-input type="number" style="width: 40%;" v-model="Form.max_times" controls-position="right">
                                <template #append>次</template>
                            </el-input>
                        </div>
                        <small style="color: #999;">设置会员等级所需要的购买量必须大于等于0,单位：笔</small>
                    </div>
                </el-form-item>
                <el-form-item label="折扣率">
                    <el-input type="number" style="width: 40%;" v-model="Form.discount" controls-position="right"
                        placeholder="折扣率">
                        <template #append>%</template>
                    </el-input>
                    <small style="color: #999;">折扣率单位为百分比，如输入90，表示该会员等级的用户可以以商品原价的90%购买</small>
                </el-form-item>
            </el-form>
        </form-drawer>
    </div>
</template>

<script setup>
import { getLevel, delLevel, changeLevelStatus, addLevel, editLevel } from '@/api/level'
import { useInitForm, useInitTable } from '@/util/useCommon'
import tableHeader from '@/components/common/tableHeader.vue';
import { onMounted } from 'vue-demi';
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
    del: delLevel,
    getList: getLevel,
    changeStatus: changeLevelStatus
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
        level: 0,
        status: 1,
        discount: 0,
        max_price: 0,
        max_times: 0
    },
    getData,
    add: addLevel,
    edit: editLevel
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