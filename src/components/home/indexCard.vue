<template>
    <div>
        <el-card shadow="hover" v-for="(item, index) in cardData">
            <template #header>
                <div class="card-header">
                    <span>店铺及商品展示</span>
                    <el-tag type="danger" effect="plain">
                        店铺及商品展示
                    </el-tag>
                </div>
            </template>
            <div class="card-item">
                <div v-for="item2 in item">
                    <span>{{ item2.value }}</span>
                    <span>{{ item2.label }}</span>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue-demi";
import { getTwoStatic } from '@/api/home'


// 卡片数据
const cardData = ref({})
onMounted(async () => {
    let res = await getTwoStatic()
    cardData.value = res.data
})
</script>

<style lang="less" scoped>
.el-card {
    margin-left: 10px;

    &:nth-of-type(2) {
        margin-top: 20px;
    }

    .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .card-item {
        display: flex;
        align-items: center;
        justify-content: space-between;

        div {
            padding: 40px;
            background-color: #f7f7f7;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            span {
                &:nth-of-type(1) {
                    font-weight: bold;
                    color: #666;
                    padding-bottom: 4px;
                    font-size: 1.5rem;
                }

                &:nth-of-type(2) {
                    color: #666;
                }
            }
        }
    }
}
</style>