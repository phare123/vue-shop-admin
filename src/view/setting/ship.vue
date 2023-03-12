<template>
    <el-card>
        <el-form :model="Form" label-width="auto" style="padding: 10px 0 20px 30px;">
            <el-form-item label="物流查询key">
                <el-input style="width: 40%;" v-model="Form.ship" placeholder="物流查询key"></el-input>
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary" size="small" @click="saveSetting">保存</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { getSetting, changeSetting } from '@/api/setting'

const getData = () => {
    getSetting().then(res => {
        for (const key in res.data) {
            Form[key] = res.data[key]
        }
    })
}
let Form = reactive({
    "ship": ''
})
// 保存设置
const saveSetting = () => {
    changeSetting(Form).then(res => {
        getData()
    })
}

onMounted(() => {
    getData()
})
</script>

<style lang="less" scoped></style>