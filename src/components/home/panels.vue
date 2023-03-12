<template>
    <div>
        <el-row v-if="panels.length === 0">
            <el-col :span="6" v-for="i in 4">
                <el-skeleton style="width: 240px; height: 240px;" animated loading>
                    <el-card class="skeleton-card" shadow="hover">
                        <template #header>
                            <div class="card-header">
                                <el-skeleton-item variant="text" style="width: 20%" />
                            </div>
                        </template>
                        <div class="content">
                            <el-skeleton-item variant="text" style="width: 30%" />
                        </div>
                        <el-divider />
                        <div class="sub-content">
                            <el-skeleton-item variant="text" style="width: 10%" />
                        </div>
                    </el-card>
                </el-skeleton>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" v-for="(item, index) in panels" :key="index">
                <el-card shadow="hover">
                    <template #header>
                        <div class="card-header">
                            <span>{{ item.title }}</span>
                            <el-tag :type="item.unitColor" effect="plain">
                                {{ item.unit }}
                            </el-tag>
                        </div>
                    </template>
                    <div class="content">
                        <CountTo :value="item.value" />
                    </div>
                    <el-divider />
                    <div class="sub-content">
                        <span>{{ item.subTitle }}</span>
                        <span>{{ item.subValue }}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { getOneStatic } from '@/api/home'
import { onMounted, ref } from 'vue-demi'
// 面板数据
const panels = ref([])
onMounted(async () => {
    let res = await getOneStatic()
    panels.value = res.data.panels
})
</script>

<style lang="less" scoped>
.el-card,
.skeleton-card {
    margin: 0 10px;

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .content {
        font-size: 2.3rem;
        padding: 15px 0 15px 5px;
        font-weight: bold;
        color: #666;
    }

    .sub-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 0 10px 0;
        color: #666;
    }
}
</style>