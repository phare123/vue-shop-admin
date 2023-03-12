<template>
    <div class="setting-card" v-loading="loading">
        <el-card shadow="never">
            <template #header>
                <div class="card-header">
                    <span>基础设置</span>
                </div>
            </template>
            <el-form label-width="auto">
                <el-form-item label="分销启用">
                    <div style="display: flex; flex-direction: column;">
                        <el-radio-group v-model="Form.distribution_open">
                            <el-radio :label="1" border style="margin-right: 10px;">是</el-radio>
                            <el-radio :label="0" border>否</el-radio>
                        </el-radio-group>
                        <small>关闭分销功能后不会再产生新的分销佣金，商城端分销入口会关闭。</small>
                    </div>
                </el-form-item>
                <el-form-item label="分销海报" class="goods_banner">
                    <div class="close-btn" v-for="item in Form.spread_banners" v-show="Form.spread_banners.length > 0">
                        <el-image lazy :src="item" fit="cover" />
                    </div>
                    <SelectImg :limit="5" @choose="handleChoose" />
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="never">
            <template #header>
                <div class="card-header">
                    <span>返佣设置</span>
                </div>
            </template>
            <el-form label-width="auto">
                <el-form-item label="一级返佣比例">
                    <div style="display: flex; flex-direction: column;">
                        <el-input type="number" v-model="Form.store_first_rebate" placeholder="一级返佣比例">
                            <template #append>%</template>
                        </el-input>
                        <small>订单交易成功后给上级返佣的比例0 - 100,例:5 = 反订单金额的5%</small>
                    </div>
                </el-form-item>
                <el-form-item label="二级返佣比例">
                    <div style="display: flex; flex-direction: column;">
                        <el-input type="number" v-model="Form.store_second_rebate" placeholder="二级返佣比例">
                            <template #append>%</template>
                        </el-input>
                        <small>订单交易成功后给上级返佣的比例0 - 100,例:5 = 反订单金额的5%</small>
                    </div>
                </el-form-item>
                <el-form-item label="自动返佣">
                    <div style="display: flex; flex-direction: column;">
                        <el-radio-group v-model="Form.is_self_brokerage">
                            <el-radio :label="1" border style="margin-right: 10px;">是</el-radio>
                            <el-radio :label="0" border>否</el-radio>
                        </el-radio-group>
                        <small>是否开启自购返佣（开启：分销员自己购买商品，享受一级返佣，上级享受二级返佣； 关闭：分销员自己购买商品没有返佣）</small>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="never">
            <template #header>
                <div class="card-header">
                    <span>结算设置</span>
                </div>
            </template>
            <el-form label-width="auto">
                <el-form-item label="结算时间">
                    <div style="display: flex; flex-direction: column;">
                        <el-input v-model="Form.settlement_days" placeholder="天数" style="width: 250px;" type="number">
                            <template #prepend>订单完成后</template>
                            <template #append>天</template>
                        </el-input>
                        <small>预估佣金结算后无法进行回收，请谨慎设置结算天</small>
                    </div>
                </el-form-item>
                <el-form-item label="佣金到账方式">
                    <div style="display: flex; flex-direction: column;">
                        <el-radio-group v-model="Form.brokerage_method">
                            <el-radio label="hand" border style="margin-right: 10px;">手动转账</el-radio>
                            <el-radio label="wx" border>自动微信到账</el-radio>
                        </el-radio-group>
                        <small>关闭分销功能后不会再产生新的分销佣金，商城端分销入口会关闭。</small>
                    </div>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" size="small" @click="handleSaveSetting">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import SelectImg from '@/components/manager/selectImg.vue'
import { getSetting, setSetting } from '@/api/distribution'
import { useInitTable, useInitForm } from '@/util/useCommon'
import { notification } from '@/util/msgTip'
import { onMounted, ref } from 'vue';

// 获取表格数据与分页
const {
    loading,
    getData,
} = useInitTable({
    getList: getSetting,
    onGetListSuccess: (res) => {
        Form.value = res.data
    },
})
const {
    Form,
} = useInitForm({
    Form: {},
    getData,
})
// 选择封面
const bannerArr = ref([])
const handleChoose = (e) => {
    bannerArr.value = e.value.map(item => item.url)
    Form.value.spread_banners = [...bannerArr.value]
};
// 保存设置
const handleSaveSetting = () => {
    setSetting(Form.value).then(res => {
        console.log(res);
        getData()
        notification('保存成功', 2000, 'success')
    })
}

onMounted(() => {
    getData()
})
</script>

<style lang="less" scoped>
.setting-card {
    padding: 20px;
    background-color: #fff;

    .el-card {
        margin-bottom: 20px;
        border: none;

        :deep(.el-card__header) {
            padding: 15px !important;
            background-color: #f3f4f6;
        }
    }
}

.goods_banner {
    display: flex;
    align-items: center;

    .el-image {
        width: 100px;
        height: 100px;
        margin-right: 10px;
    }

    .close-btn {
        width: 100px;
        height: 100px;
        position: relative;
        margin-right: 10px;
        background-color: #333;
    }
}
</style>