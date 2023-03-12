<template>
    <div>
        <el-card shadow="always">
            <tableHeader layout="create,refresh" @delete="handleDel(ids)" @create="handleCreate" @refresh="getData" />
            <!-- 表格部分 -->
            <el-table max-height="480px" :data="tableData" stripe style="width: 100%" v-loading="loading">
                <el-table-column label="优惠券名称" width="300">
                    <template #default="{ row }">
                        <div :class="row.statusText == '领取中' ? 'coupon-item-active' : 'coupon-item'">
                            <span>{{ row.name }}</span>
                            <span>{{ row.start_time }} ~ {{ row.end_time }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="statusText" label="状态" width="200" />
                <el-table-column label="优惠" width="200">
                    <template #default="{ row }">
                        <span style="padding-right: 4px;">{{ row.type == 0 ? '满减' : '折扣' }}</span>
                        <span>{{ row.type == 0 ? ('￥' + row.value) : (row.value + '折扣') }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="total" label="发放数量" width="200" />
                <el-table-column prop="used" label="已使用 " width="80" />
                <el-table-column table-column fixed="right" label="操作" width="200" align="center">
                    <template #default="{ row }">
                        <div v-if="row.statusText != '领取中'">
                            <el-button v-if="row.statusText != '已结束'" link type="primary" size="small"
                                @click="handleEdit(row)">编辑</el-button>
                            <el-popconfirm title="确认删除吗?" confirm-button-text="确定" cancel-button-text="取消"
                                @confirm="handleDel(row.id)">
                                <template #reference>
                                    <el-button link type="primary" size="small">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                        <el-popconfirm title="让当前优惠券失效?" confirm-button-text="确定" cancel-button-text="取消"
                                @confirm="handleFail(row)" v-else>
                                <template #reference>   
                                    <el-button type="danger" size="small">失效</el-button>
                                </template>
                            </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination small background layout="prev, pager, next" :total="total" @current-change="changePage" />
        </el-card>
        <!-- 新增与编辑 -->
        <form-drawer ref="formDrawerRef" :title="isEdit ? '编辑' : '新增'" confirm-text="提交" destroyOnClose @submit="onSubmit">
            <el-form :rules="rules" ref="formRef" :model="Form" status-icon label-width="auto">
                <el-form-item label="优惠券名称" prop="name">
                    <el-input v-model="Form.name" placeholder="请输入优惠券名称" />
                </el-form-item>
                <el-form-item label="类型">
                    <el-radio-group v-model="Form.type">
                        <el-radio :label="0">满减</el-radio>
                        <el-radio :label="1">折扣</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="面值">
                    <el-input v-model="Form.value" placeholder="请输入面值" style="width: 50%;">
                        <template #append>元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="发行量">
                    <el-input-number v-model="Form.total" :min="0" :max="1000"></el-input-number>
                </el-form-item>
                <el-form-item label="最近使用价格">
                    <el-input-number v-model="Form.min_price" :min="1" :max="1000" controls-position="right" />
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number v-model="Form.order" :min="0" :max="1000"></el-input-number>
                </el-form-item>
                <el-form-item label="活动时间">
                    <div>
                        <el-date-picker 
                        v-model="Form.timeArray" 
                        type="datetimerange" 
                        range-separator="To" 
                        :editable="false"
                        start-placeholder="开始时间" 
                        end-placeholder="结束时间" 
                        value-format="YYYY-MM-DD HH:mm:ss"
                        />
                    </div>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="Form.desc" :rows="4" type="textarea" placeholder="描述" />
                </el-form-item>
            </el-form>  
        </form-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import tableHeader from '@/components/common/tableHeader.vue';
import { getCoupon, addCoupon, editCoupon, delCoupon, updateCoupon } from '@/api/coupon'
import { useInitForm, useInitTable } from '@/util/useCommon'
import { onMounted } from 'vue-demi';
import {notification} from '@/util/msgTip'

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
} = useInitTable({
    del: delCoupon,
    getList: getCoupon,
    onGetListSuccess: (res) => {
        total.value = res.data.totalCount;
        tableData.value = res.data.list.map(o => {
            // 修改优惠券状态
            o.statusText = formatStatus(o)
            return o
        });
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
        timeArray:null,
        name: '',
        type: 0,
        value: 0,
        total: 0,
        min_price: 0,
        start_time: null,
        end_time: null,
        order: 50,
        desc: ""
    },
    getData,
    add: addCoupon,
    edit: editCoupon,
    beforeSubmit:(Form) => {
        Form.start_time = (new Date(Form.timeArray[0])).getTime()
        Form.end_time = (new Date(Form.timeArray[1])).getTime()
        return Form
    }
})
// 优惠券状态
const formatStatus = (row) => {
    let s = '领取中'
    let start = new Date(row.start_time).getTime()
    let now = new Date().getTime()
    let end = new Date(row.end_time).getTime()
    if (start > now) {
        s = '未开始'
    } else if (end < now) {
        s = '已结束'
    } else if (row.status == 0) {
        s = '已失效'
    }
    return s
}
// 优惠券失效方法
const handleFail = (row) => {
    updateCoupon(row.id,row.status).then(res => {
        getData()
        notification('优惠券已失效',2000,'success')
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

.coupon-item {
    background-color: #f9fafb;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border: dotted 1px #ededed;
    margin-right: 20px;

    span {
        &:nth-of-type(1) {
            color: #9ca3af;
            font-weight: bold;
        }

        &:nth-of-type(2) {
            color: #9ca3af;
            font-size: .7rem;
        }
    }
}

.coupon-item-active {
    background-color: #fff1f2;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border: dotted 1px #f9d9f6;
    margin-right: 20px;

    span {
        &:nth-of-type(1) {
            color: #f87171;
            font-weight: bold;
        }

        &:nth-of-type(2) {
            color: #f87171;
            font-size: .7rem;
        }
    }
}
</style>