<!-- home组件图表 -->
<template>
    <div>
        <el-card shadow="never">
            <template #header>
                <div class="card-header">
                    <span class="text">订单统计</span>
                    <div>
                        <el-check-tag :checked="current == item.value"
                            @click="changeCheck(item.value), getData(item.value)" v-for="item in options"
                            :key="item.value">{{ item.title }}</el-check-tag>
                    </div>
                </div>
            </template>
            <div ref="orderTable" style="width: 100%;height: 400px;"></div>
        </el-card>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, reactive, ref } from "vue-demi";
import { useResizeObserver } from '@vueuse/core'
import { getCurrentInstance } from "vue-demi";
import { getChartTable } from '@/api/home'
import * as echarts from 'echarts';

const { proxy } = getCurrentInstance()

const current = ref('week')
const options = reactive([

    {
        title: '近一个月',
        value: 'month'
    },
    {
        title: '近一周',
        value: 'week'
    },
    {
        title: '近24小时',
        value: 'hour'
    },
])
// 切换选中tag
const changeCheck = (value) => {
    current.value = value
}
// 获取图表数据方法
const getData = async () => {
    const orderOption = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };
    let res = await getChartTable(current.value)
    orderOption.xAxis.data = res.data.x
    orderOption.series[0].data = res.data.y
    myChart.setOption(orderOption)
    myChart.hideLoading()
}
// echart
let myChart = null
onMounted(() => {
    myChart = echarts.init(proxy.$refs.orderTable)
    if (myChart) {
        myChart.showLoading()
        getData()
    }
})
onBeforeUnmount(() => {
    if (myChart) echarts.dispose(myChart)
})
const orderTable = ref(null)
useResizeObserver(orderTable, (entries) => {
    myChart.resize()
})
</script>

<style lang="less" scoped>
.el-card {
    margin-right: 10px;

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .text {
            color: #666;
        }

        .el-check-tag {
            margin-left: 10px;
        }
    }
}
</style>