<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in StatisticList" :key="index">
                <el-card shadow="never">
                    <div class="statistic-item">
                        <div class="l-content">
                            <el-icon :style="{ backgroundColor: (item.bgColor) }">
                                <component :is="item.icon"></component>
                            </el-icon>
                        </div>
                        <div class="r-content">
                            <h3>{{ item.value }}</h3>
                            <small>{{ item.label }}</small>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-card shadow="never" class="card-box">
            <!-- 搜索 -->
            <div class="search-item">
                <div class="search-input">
                    <el-radio-group @change="getData" v-model="searchForm.type" size="small">
                        <el-radio-button label="all">全部</el-radio-button>
                        <el-radio-button label="today">今天</el-radio-button>
                        <el-radio-button label="yesterday">昨天</el-radio-button>
                        <el-radio-button label="last7day">最近七天</el-radio-button>
                    </el-radio-group>
                    <div class="input-box">
                        <el-input class="input-item" v-show="!showType" size="small" prefix-icon="Search"
                            v-model="searchForm.keyword" placeholder="关键词" clearable @change="getData" />
                        <div v-show="!showType" class="input-item">
                            <el-date-picker size="small" v-model="searchForm.starttime" type="date" placeholder="开始日期"
                                @change="getData" />
                        </div>
                        <div v-show="!showType" class="input-item">
                            <el-date-picker size="small" v-model="searchForm.endtime" type="date" placeholder="结束日期"
                                @change="getData" />
                        </div>
                    </div>
                </div>
                <div class="btn">
                    <el-button size="small" @click="handleReset" plain>清空</el-button>
                    <el-button class="type-btn" link type="primary" @click="showType = !showType">
                        <p>{{ showType ? '展开' : '收起' }}</p>
                        <el-icon v-show="showType">
                            <ArrowDownBold />
                        </el-icon>
                        <el-icon v-show="!showType">
                            <ArrowUpBold />
                        </el-icon>
                    </el-button>
                </div>
            </div>
            <!-- 新增 | 刷新 -->
            <tableHeader layout="refresh" @refresh="getData" />
            <!-- 表格部分 -->
            <el-table max-height="480px" :data="tableData" stripe style="width: 100%" v-loading="loading">
                <el-table-column prop="id" label="ID" width="60" align="center" />
                <el-table-column label="头像" width="120" align="center">
                    <template #default="{ row }">
                        <el-avatar
                            :src="row.avatar != '' ? row.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                            fit="cover" round></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column label="用户信息" width="120">
                    <template #default="{ row }">
                        <div style="display: flex; flex-direction: column;">
                            <small>用户:{{ row.username }}</small>
                            <small>昵称:{{ row.nickname }}</small>
                            <small>姓名:{{ row.user_info?.name ?? '私密' }}</small>
                            <small>电话:{{ row?.phone ?? '私密'}}</small>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="推广用户数量" width="100" prop="share_num" align="center" />
                <el-table-column label="订单数量" width="100" prop="share_order_num" align="center" />
                <el-table-column label="订单金额" width="100" prop="order_price" align="center" />
                <el-table-column label="账户佣金" width="100" prop="commission" align="center" />
                <el-table-column label="已提取金额" width="100" prop="cash_out_price" align="center" />
                <el-table-column label="提现次数" width="100" prop="cash_out_time" align="center" />
                <el-table-column label="未提现金额" width="100" prop="no_cash_out_price" align="center" />
                <el-table-column fixed="right" label="操作" width="auto" align="center">
                    <template #default="{ row }">
                        <el-button link type="primary" size="small"
                            @click="handelOpenDrawer('person', row.id)">推广人</el-button>
                        <el-button link type="primary" size="small" @click="handelOpenDrawer('order')">推广订单</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination small background layout="prev, pager, next" :total="total" @current-change="changePage" />
        </el-card>
        <!-- 推广人 | 推广订单 -->
        <promoteDrawer ref="promoteDrawerRef" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import tableHeader from '@/components/common/tableHeader.vue';
import { getAgentList, getStatistic } from '@/api/distribution'
import { useInitTable } from '@/util/useCommon'
import promoteDrawer from './promoteDrawer.vue'

// 卡片数据
let StatisticList = ref([
    {
        icon: 'User',
        bgColor: '#60a5fa',
    },
    {
        icon: 'ShoppingCart',
        bgColor: '#fb923c',
    },
    {
        icon: 'PriceTag',
        bgColor: '#34d399',
    },
    {
        icon: 'Timer',
        bgColor: '#818cf8',
    },
])
const getStatisticData = () => {
    loading.value = true
    getStatistic().then(res => {
        StatisticList.value = StatisticList.value.map((item, index) => {
            return { ...item, ...res.data.panels[index] }
        })
    }).finally(() => {
        loading.value = false
    })
}
// 获取表格数据与分页
const {
    loading,
    tableData,
    total,
    searchForm,
    changePage,
    getData,
    handleDel,
} = useInitTable({
    searchForm: {
        type: 'all',
        keyword: '',
        starttime: '',
        endtime: '',
        level: 0
    },
    getList: getAgentList,
})
// 清空
const handleReset = () => {
    searchForm.type = 'all'
    searchForm.keyword = ''
    searchForm.starttime = ''
    searchForm.endtime = ''
    getData()
}
// 收起和展开
const showType = ref(true)
// 推广人和推广订单
const promoteDrawerRef = ref(null)
const handelOpenDrawer = (type, id) => {
    promoteDrawerRef.value.open(type, id)
}

onMounted(() => {
    getStatisticData()
    getData()
})
</script>

<style lang="less" scoped>
.statistic-item {
    padding-left: 10px;
    display: flex;
    align-items: center;

    .l-content {
        .el-icon {
            background-color: #ff9e9e;
            padding: 13px;
            font-size: 1.3rem;
            border-radius: 100%;
            color: #fff;
        }
    }

    .r-content {
        display: flex;
        flex-direction: column;
        margin-left: 10px;

        small {
            color: #999;
            font-size: .8rem;
        }
    }
}

.card-box {
    margin-top: 20px;
    padding-bottom: 30px;
    position: relative;

    .search-item {
        .search-input {
            width: 80%;
        }

        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .input-box {
            margin-top: 10px;
            display: flex;
            align-items: center;

            .input-item {
                width: 50%;
                margin: 5px 10px 5px 0;
                width: 200px;
            }
        }

        .btn {
            position: absolute;
            top: 20px;
            right: 10px;

            .type-btn {
                background-color: #f3f4f6;
                font-size: .7rem;
                padding: 5px 8px;

                p {
                    margin-right: 3px;
                }
            }
        }
    }

    .el-pagination {
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translate(-50%, 0);
    }
}
</style>