<template>
    <div>
        <!-- 标签页 -->
        <el-tabs v-model="searchForm.tab" @tab-change="getData">
            <el-tab-pane :label="item.name" :name="item.key" v-for="(item, index) in tabs" :key="index" />
        </el-tabs>
        <el-card shadow="always">
            <el-tooltip effect="dark" content="导出订单" placement="bottom">
                <el-icon class="export-btn" @click="openOrderExport">
                    <Download />
                </el-icon>
            </el-tooltip>
            <!-- 搜索 -->
            <div class="search-item">
                <div class="search-input">
                    <el-input size="small" prefix-icon="Search" v-model="searchForm.no" placeholder="订单编号" clearable
                        @change="getData" />
                    <el-input v-show="!showType" size="small" prefix-icon="Search" v-model="searchForm.name"
                        placeholder="收货人" clearable @change="getData" />
                    <el-input v-show="!showType" size="small" prefix-icon="Search" v-model="searchForm.phone"
                        placeholder="手机号" clearable @change="getData" />
                    <span v-show="!showType">
                        <el-date-picker size="small" v-model="searchForm.starttime" type="date" placeholder="开始日期"
                            @change="getData" />
                    </span>
                    <span v-show="!showType">
                        <el-date-picker size="small" v-model="searchForm.endtime" type="date" placeholder="结束日期"
                            @change="getData" />
                    </span>
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
            <tableHeader layout="delete,refresh" @delete="handleDel(ids)" @refresh="getData" />
            <!-- 表格部分 -->
            <el-table max-height="480px" :data="tableData" stripe style="width: 100%" v-loading="loading"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" />
                <el-table-column prop="name" label="商品" width="230">
                    <template #default="{ row }">
                        <div class="order-first">
                            <p>订单号:</p>
                            <small style="padding: 4px 0;">{{ row.no }}</small>
                            <div v-for="item in row.order_items"
                                style="display: flex; align-items: center; margin-bottom: 5px;">
                                <el-image style="width: 40px; height: 40px;margin-right: 10px;"
                                    :src="item.goods_item?.cover ?? ''" fit="cover" />
                                <p style="color: #4338ca;">{{ item.goods_item?.title ?? 'XX商品' }}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="下单时间" width="180" />
                <el-table-column prop="total_price" label="实付款" width="120" align="center" />
                <el-table-column prop="order" label="买家" width="150" align="center">
                    <template #default="{ row }">
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <span>{{ row.user.username }}</span>
                            <small>（用户ID: {{ row.user.id }}）</small>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="order" label="交易状态" width="150" align="center">
                    <template #default="{ row }">
                        <div class="buy_status">
                            <div>
                                <h4>付款状态</h4>
                                <div>
                                    <el-tag v-if="row.payment_method == 'wechat'" size="small">微信支付</el-tag>
                                    <el-tag v-else-if="row.payment_method == 'alipay'" size="small">支付宝支付</el-tag>
                                    <el-tag v-else type="info" size="small">未支付</el-tag>
                                </div>
                            </div>
                            <div>
                                <h4>发货状态</h4>
                                <el-tag :type="row.ship_data ? 'success' : 'info'">{{ row.ship_data ? '已发货' : '未发货'
                                }}</el-tag>
                            </div>
                            <div>
                                <h4>收获状态</h4>
                                <el-tag :type="row.ship_status == 'received' ? 'success' : 'info'">{{ row.ship_status ==
                                    'received' ? '已收货' : '未收货' }}</el-tag>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="auto" align="center">
                    <template #default="{ row }">
                        <el-button link type="primary" size="small" @click="openOrderDetail(row)">订单详情</el-button>
                        <el-button link type="primary" size="small"
                            v-if="row.payment_method != null && searchForm.tab != 'refunding'"
                            @click="openOrderSend(row)">订单发货</el-button>
                        <el-button link type="primary" size="small" v-if="searchForm.tab == 'refunding'"
                            @click="handleRefund(row.id, 1)">同意退款</el-button>
                        <el-button link type="primary" size="small" v-if="searchForm.tab == 'refunding'"
                            @click="handleRefund(row.id, 0)">拒绝退款</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination small background layout="prev, pager, next" :total="total" @current-change="changePage" />
        </el-card>
        <!-- 订单详情 -->
        <form-drawer class="form-drawer" ref="orderDetailRef" title="订单详情" destroyOnClose @submit="onSubmit">
            <el-card shadow="never">
                <template #header>
                    <div class="card-header">
                        <span>订单信息</span>
                    </div>
                </template>
                <div class="order-info">
                    <div class="l-content">订单号</div>
                    <div class="r-content">{{ orderDetailInfo.payment_no }}</div>
                </div>
                <div class="order-info">
                    <div class="l-content">付款方式</div>
                    <div class="r-content">{{ orderDetailInfo.payment_method == 'alipay' ? '支付宝' : '微信' }}</div>
                </div>
                <div class="order-info">
                    <div class="l-content">创建时间</div>
                    <div class="r-content">{{ orderDetailInfo.create_time }}</div>
                </div>
                <div class="order-info">
                    <div class="l-content">付款时间</div>
                    <div class="r-content">{{ orderDetailInfo.update_time }}</div>
                </div>
            </el-card>
            <el-card shadow="never" v-if="orderDetailInfo.ship_data">
                <template #header>
                    <div class="card-header">
                        <span>发货信息</span>
                    </div>
                </template>
                <div class="order-info">
                    <div class="l-content">物流公司</div>
                    <div class="r-content">{{ orderDetailInfo.ship_data.express_company }}</div>
                </div>
                <div class="order-info">
                    <div class="l-content">运单号</div>
                    <div class="r-content">{{ orderDetailInfo.ship_data.express_no }}</div>
                </div>
                <div class="order-info">
                    <div class="l-content">发货时间</div>
                    <div class="r-content">{{ formatDate(Number(orderDetailInfo.ship_data.express_time)) }}</div>
                </div>
            </el-card>
            <el-card shadow="never" v-if="orderDetailInfo.order_items">
                <template #header>
                    <div class="card-header">
                        <span>商品信息</span>
                    </div>
                </template>
                <div class="goods-info">
                    <div v-for="item in orderDetailInfo.order_items" :key="item.id">
                        <div class="info-item">
                            <el-image :src="item.goods_item?.cover ?? ''" fit="cover"></el-image>
                            <div class="text-info">
                                <p>{{ item.goods_item?.title ?? '商品已下架' }}</p>
                                <el-tag type="info" v-for="item2 in item.goods_skus?.skus ?? []" :key="item2.id">
                                    <span>{{ item2.name }} : {{ item2.text }}</span>
                                </el-tag>
                                <div>
                                    <span>￥ {{ item.price }}</span>
                                    <small>x1</small>
                                </div>
                            </div>
                        </div>
                        <div class="already">
                            <p>成交价</p>
                            <span>￥ {{ item.price }}</span>
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card shadow="never">
                <template #header>
                    <div class="card-header">
                        <span>收货信息</span>
                    </div>
                </template>
                <div class="order-info">
                    <div class="l-content">收货人</div>
                    <div class="r-content">{{ orderDetailInfo.address.name }}</div>
                </div>
                <div class="order-info">
                    <div class="l-content">联系方式</div>
                    <div class="r-content">{{ orderDetailInfo.address.phone }}</div>
                </div>
                <div class="order-info">
                    <div class="l-content">收获地址</div>
                    <div class="r-content">
                        {{ orderDetailInfo.address.province }}{{ orderDetailInfo.address.city }}{{
                            orderDetailInfo.address.district }}{{ orderDetailInfo.address.address }}
                    </div>
                </div>
            </el-card>
        </form-drawer>
        <!-- 订单法护鸥 -->
        <form-drawer ref="orderSendRef" title="订单发货" destroyOnClose confirm-text="提交" @submit="handleOrderSend">
            <form ref="formRef" :model="Form" status-icon label-width="auto">
                <el-form-item label="物流公司">
                    <el-select v-model="Form.express_company" placeholder="请选择">
                        <el-option v-for="item in companyOpts" :key="item.code" :label="item.name" :value="item.name" />
                    </el-select>
                </el-form-item>
                <el-form-item label="快递单号">
                    <el-input v-model="Form.express_no"></el-input>
                </el-form-item>
            </form>
        </form-drawer>
        <!-- 导出订单 -->
        <form-drawer ref="exportOrderRef" title="导出订单" destroyOnClose confirm-text="导出" @submit="handleOrderExport">
            <form ref="formRef" :model="Form" status-icon label-width="auto">
                <el-form-item label="订单类型">
                    <el-select v-model="Form.express_company" placeholder="请选择">
                        <el-option v-for="item in tabs" :key="item.key" :label="item.name" :value="item.key" />
                    </el-select>
                </el-form-item>
                <el-form-item label="时间范围">
                    <el-date-picker v-model="Form.timeArr" type="daterange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期" value-format="YYYY-MM-DD" />
                </el-form-item>
            </form>
        </form-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import tableHeader from '@/components/common/tableHeader.vue';
import { getOrder, delOrders, shipOrder, refund, exportExcel, company } from '@/api/order'
import { useInitForm, useInitTable } from '@/util/useCommon'
import { onMounted } from 'vue-demi';
import { notification } from '../../util/msgTip';
import { formatDate } from '@/util/changeTime'

const tabs = ([
    {
        key: 'all',
        name: '全部'
    },
    {
        key: 'nopay',
        name: '待支付'
    },
    {
        key: 'noship',
        name: '待发货'
    },
    {
        key: 'shiped',
        name: '待收货'
    },
    {
        key: 'received',
        name: '已收货'
    },
    {
        key: 'finish',
        name: '已完成'
    },
    {
        key: 'closed',
        name: '已关闭'
    },
    {
        key: 'refunding',
        name: '退款中'
    },

])
const ids = ref([])
// 收起和展开
const showType = ref(true)
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
        tab: 'all',
        no: '',
        starttime: "",
        endtime: "",
        name: '',
        phone: ''
    },
    del: delOrders,
    getList: getOrder,
})
// 新增 | 编辑
const {
    formDrawerRef,
    formRef,
    Form,
    onSubmit
} = useInitForm({
    Form: {
        express_company: '',
        express_no: '',
        tab: '',
        starttime: '',
        endtime: '',
        FormArr: null
    },
    getData,
})
// 多选
const handleSelectionChange = (val) => {
    ids.value = val.map(o => o.id)
}
// 清空
const handleReset = () => {
    searchForm.no = ''
    searchForm.tab = ''
    searchForm.starttime = ''
    searchForm.endtime = ''
    searchForm.name = ''
    searchForm.phone = ''
    getData()
}
// 是否退款
const handleRefund = (id, agree) => {
    if (agree == 1) {
        refund(id, { agree }).then(res => {
            notification('操作成功', 2000, 'success')
            getData()
        })
    } else {
        open(id, agree)
    }
}
const open = (id, agree) => {
    ElMessageBox.prompt('请输入拒绝理由', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
    }).then(({ value }) => {
        let data = { agree, disagree_reason: value }
        refund(id, data).then(res => {
            console.log(res);
        })
        notification('操作成功', 2000, 'info')
    })
}
// 订单详情
const orderDetailRef = ref(null)
const orderDetailInfo = ref([])
const openOrderDetail = (row) => {
    orderDetailInfo.value = row
    console.log(orderDetailInfo.value);
    orderDetailRef.value.open()
}
// 订单发货
const orderSendRef = ref(null)
const companyOpts = ref([])
const orderItemId = ref(0)
const openOrderSend = (row) => {
    orderItemId.value = row.id
    company().then(res => {
        companyOpts.value = res.data.list
    })
    orderSendRef.value.open()
}
const handleOrderSend = () => {
    let data = {
        express_company: Form.value.express_company,
        express_no: Form.value.express_no
    }
    shipOrder(orderItemId.value, data).then(res => {
        getData()
        orderSendRef.value.close()
    })
}
// 导出订单
const exportOrderRef = ref(null)
const openOrderExport = () => {
    exportOrderRef.value.open()
}
const handleOrderExport = () => {
    if (Form.timeArr) {
        let t = Form.value.timeArr.slice(',')
        Form.value.starttime = t[0]
        Form.value.endtime = t[1]
    }
    exportExcel(Form.value.tab, Form.value.starttime, Form.value.endtime).then(res => {
        let url = window.URL.createObjectURL(new Blob([res]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        let filename = (new Date()).getTime() + '.xlsx'
        link.setAttribute('download',filename)
        document.body.appendChild(link)
        link.click()
        close()
        // exportOrderRef.value.close()
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

    .export-btn {
        color: #666;
        position: absolute;
        top: 74px;
        right: 60px;
    }

    .search-item {
        .search-input {
            width: 80%;
        }

        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-input,
        span {
            width: 50%;
            margin: 3px 10px;
            width: 200px;
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
.buy_status {
    color: #999;

    div {
        display: flex;
        align-items: center;
        margin-bottom: 5px;

        h4 {
            margin-right: 5px;
        }
    }
}

.form-drawer {
    .el-card {
        margin-bottom: 10px;

        .card-header {
            font-weight: bold;
        }

        .order-info {
            display: flex;
            align-items: center;
            margin: 5px 0;

            .l-content {
                color: #666;
                margin-right: 13px;
            }

            .r-content {
                color: #999;
                font-size: .9rem;
            }
        }

        .goods-info {
            .info-item {
                display: flex;
                align-items: center;

                .el-image {
                    margin: 0;
                    width: 70px;
                    height: 70px;
                    margin: 13px;
                }

                .text-info {
                    p {
                        font-size: .9rem;
                    }

                    .el-tag {
                        margin: 5px 2px;
                    }

                    div {
                        font-size: .9rem;

                        span {
                            color: red;
                            margin-right: 7px;
                        }

                        small {
                            color: #999;
                        }
                    }
                }
            }
        }

        .already {
            width: 150px;
            margin-left: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            p {
                color: #666;
            }

            span {
                color: red;
                font-weight: bold;
            }
        }
    }

}
</style>