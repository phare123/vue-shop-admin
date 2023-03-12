<template>
    <form-drawer ref="distributionRef" size="55%" :title="promoteType == 'person'?'推广人':'推广订单'" destroyOnClose>
        <el-form label-width="auto">
            <el-form-item label="时间范围">
                <el-radio-group @change="getData" v-model="searchForm.type" size="small">
                    <el-radio-button label="all">全部</el-radio-button>
                    <el-radio-button label="today">今天</el-radio-button>
                    <el-radio-button label="yesterday">昨天</el-radio-button>
                    <el-radio-button label="last7day">最近七天</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="开始时间">
                <el-date-picker size="small" v-model="searchForm.starttime" type="date" placeholder="开始日期"
                    @change="getData" />
            </el-form-item>
            <el-form-item label="结束时间">
                <el-date-picker size="small" v-model="searchForm.endtime" type="date" placeholder="结束日期"
                    @change="getData" />
            </el-form-item>
            <el-form-item label="用户类型">
                <el-radio-group @change="getData" v-model="searchForm.level" size="small">
                    <el-radio-button :label="0">全部</el-radio-button>
                    <el-radio-button :label="1">一级推广</el-radio-button>
                    <el-radio-button :label="2">二级推广</el-radio-button>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <!-- 表格 -->
        <div class="table-box">
            <el-table v-if="promoteType == 'person'"  max-height="480px" :data="tableData" stripe style="width: 100%" v-loading="loading">
                <el-table-column prop="id" label="UID" width="60" align="center" />
                <el-table-column label="头像" width="120" align="center">
                    <template #default="{ row }">
                        <el-avatar
                            :src="row.avatar != '' ? row.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                            fit="cover" round></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column label="用户信息" width="130" prop="username" align="center" />
                <el-table-column label="推广数量" width="130" prop="share_num" align="center" />
                <el-table-column label="推广订单数" width="130" prop="share_order_num" align="center" />
                <el-table-column label="绑定时间" width="auto" prop="create_time" align="center" />
            </el-table>
            <el-table v-else max-height="480px" :data="promoteOrderTable" stripe style="width: 100%" v-loading="loading">
                <el-table-column label="订单号" width="auto" prop="order.no" align="center" />
                <el-table-column label="用户名" width="80" prop="order.user.username" align="center" />
                <el-table-column label="昵称" width="80" prop="order.user.nickname" align="center" />
                <el-table-column label="手机号" width="140" prop="order.user.phone" align="center" />
                <el-table-column label="时间" width="140" prop="create_time" align="center" />
                <el-table-column label="返佣金额" width="100" prop="commission" align="center" />
            </el-table>
            <el-pagination small background layout="prev, pager, next" :total="total" @current-change="changePage" />
        </div>
    </form-drawer>
</template>

<script setup>
import {ref} from 'vue'
import { getAgentList,getPromoteList} from '@/api/distribution'
import { useInitTable } from '@/util/useCommon'

const promoteType = ref('')
const promoteOrderTable = ref([])
// 获取表格数据与分页
const {
    loading,
    tableData,
    total,
    searchForm,
    changePage,
    getData,
    currentPage,
    handleDel,
} = useInitTable({
    searchForm: {
        type: 'all',
        user_id:0,
        starttime: '',
        endtime: '',
        level:0
    },
    getList: getAgentList,
})

const distributionRef  = ref(null)
const open = (type,id) => {
    searchForm.user_id = id
    promoteType.value = type
    if(type == 'person'){
        getData()
    }else{
        getPromoteList(currentPage.value,{...searchForm}).then(res => {
            console.log(res);
            promoteOrderTable.value  = res.data.list
        }) 
    }
    distributionRef.value.open()
}

defineExpose({
    open
})
</script>

<style lang="less" scoped>
.table-box{
    position: relative;    
    .el-pagination {
        position: absolute;
        left: 50%;
        bottom: -40px;
        transform: translate(-50%, 0);
    }
}
</style>