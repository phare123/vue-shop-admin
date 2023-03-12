<template>
    <div>
        <!-- 数据面板与骨架 -->
        <Panels v-permission="['getStatistics1,GET']"/>
        <!-- 分类 -->
        <el-row class="category">
            <el-col :span="3" v-for="(item, index) in categoryData" :key="index">
                <el-card shadow="hover" @click="$router.push(item.path)">
                    <div class="icon">
                        <el-icon :style="{ color: item.color }">
                            <component :is="item.icon"></component>
                        </el-icon>
                    </div>
                    <span>{{ item.title }}</span>
                </el-card>
            </el-col>
        </el-row>
        <!-- 图表 -->
        <el-row class="row3">
            <el-col :span="12">
                <echartTable v-permission="['getStatistics3,GET']"/>
            </el-col>
            <el-col :span="12" v-permission="['getStatistics2,GET']">
                <indexCard />
            </el-col>
        </el-row>

    </div>
</template>

<script setup>
import Panels from '@/components/home/panels.vue'
import CountTo from '@/components/home/CountTo.vue'
import echartTable from '@/components/home/echartTable.vue'
import indexCard from '@/components/home/indexCard.vue'

// 分类数据
const categoryData = [
    {
        icon: 'UserFilled',
        color: 'skyblue',
        title: '用户',
        path: '/user/list'
    },
    {
        icon: 'shopping-cart',
        color: 'pink',
        title: '商品',
        path: '/goods/list'
    },
    {
        icon: 'tickets',
        color: '#fbbf24',
        title: '订单',
        path: '/order/list'
    },
    {
        icon: 'chat-dot-square',
        color: 'yellowgreen',
        title: '评价',
        path: '/comment/list'
    },
    {
        icon: 'picture',
        color: 'skyblue',
        title: '图库',
        path: '/image/list'
    },
    {
        icon: 'bell',
        color: 'pink',
        title: '公告',
        path: '/notice/list'
    },
    {
        icon: 'set-up',
        color: '#fbbf24',
        title: '配置',
        path: '/setting/base'
    },
    {
        icon: 'files',
        color: 'yellowgreen',
        title: '优惠卷',
        path: '/coupon/list'
    },
]
</script>

<style lang="less" scoped>
.category {
    margin-top: 10px;

    .el-card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            padding-bottom: 5px;
        }

        span {
            color: #666;
        }
    }

}
.row3{
    margin: 10px;
}
</style>