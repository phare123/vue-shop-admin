<template>
    <div>
        <el-card>
            <!-- 标签页 -->
            <el-tabs @tab-change="getData">
                <!-- 注册与访问 -->
                <el-tab-pane label="支付设置">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column label="支付方式" width="auto">
                            <template #default="{ row }">
                                <div class="pay-item">
                                    <el-image fit="cover" :src="row.src"></el-image>
                                    <div class="text-info">
                                        <span>{{ row.name }}</span>
                                        <small>{{ row.desc }}</small>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="180" align="center">
                            <template #default="{ row }">
                                <el-button link size="small" type="primary" @click="handleSetting(row.key)">配置</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="购物设置" style="padding: 20px 0 20px 30px;">
                    <el-form :model="Form" status-icon label-width="auto">
                        <el-form-item label="未支付订单">
                            <div class="form-item">
                                <el-input v-model="Form.close_order_minute" type="number" class="input-width"
                                    placeholder="未支付订单">
                                    <template #append>分钟后自动关闭</template>
                                </el-input>
                                <small>订单下单未付款，n分钟后自动关闭，设置0不自动关闭</small>
                            </div>
                        </el-form-item>
                        <el-form-item label="已发货订单">
                            <div class="form-item">
                                <el-input v-model="Form.auto_received_day" type="number" class="input-width"
                                    placeholder="已发货订单">
                                    <template #append>天后自动确认收获</template>
                                </el-input>
                                <small>如果在期间未确认收货，系统自动完成收货，设置0不自动收货</small>
                            </div>
                        </el-form-item>
                        <el-form-item label="已完成订单">
                            <div class="form-item">
                                <el-input v-model="Form.after_sale_day" type="number" class="input-width"
                                    placeholder="已完成订单">
                                    <template #append>天内允许申请售后</template>
                                </el-input>
                                <small>订订单完成后 ，用户在n天内可以发起售后申请，设置0不允许申请售后</small>
                            </div>
                        </el-form-item>
                        <el-form-item label=" ">
                            <el-button size="small" @click="onSubmit" type="primary">保存</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <!-- 配置弹窗 -->
        <form-drawer ref="paySettingRef" title="配置" confirm-text="提交" destroyOnClose @submit="onSubmit">
            <el-form ref="formRef" :model="Form" status-icon label-width="auto" v-if="payType == 'alipay'">
                <el-form-item label="app_id">
                    <el-input v-model="Form.alipay.app_id" placeholder="app_id" />
                </el-form-item>
                <el-form-item label="公钥">
                    <el-input type="textarea" rows="4" v-model="Form.alipay.ali_public_key" placeholder="公钥" />
                </el-form-item>
                <el-form-item label="私钥">
                    <el-input type="textarea" rows="4" v-model="Form.alipay.private_key" placeholder="私钥" />
                </el-form-item>
            </el-form>
            <el-form ref="formRef" :model="Form" status-icon label-width="auto" v-else>
                <el-form-item label="公众号 APPID">
                    <el-input class="input-width" v-model="Form.wxpay.app_id" placeholder="公众号 APPID" />
                </el-form-item>
                <el-form-item label="小程序 APPID">
                    <el-input class="input-width" v-model="Form.wxpay.miniapp_id" placeholder="公众号 APPID" />
                </el-form-item>
                <el-form-item label="小程序 secret">
                    <el-input class="input-width" v-model="Form.wxpay.secret" placeholder="小程序 secret" />
                </el-form-item>
                <el-form-item label="app_id">
                    <el-input class="input-width" v-model="Form.wxpay.appid" placeholder="app_id" />
                </el-form-item>
                <el-form-item label="商户号">
                    <el-input class="input-width" v-model="Form.wxpay.mch_id" placeholder="商户号" />
                </el-form-item>
                <el-form-item label="API密钥">
                    <el-input v-model="Form.wxpay.key" placeholder="API密钥" />
                </el-form-item>
                <el-form-item label="cert_client">
                    <div class="upload-btn">
                        <el-upload
                            :action="uploadFileSrc"
                            :headers="{token}"
                            :limit="1"
                            accept=".pem"
                            :on-success="onSuccess"
                            >
                            <el-button type="primary" size="small">点击上传</el-button>
                        </el-upload>
                        <span>{{ Form.wxpay.cert_client }}</span>
                        <small>apiclient_cert.pem</small>
                    </div>
                </el-form-item>
                <el-form-item label="cert_key">
                    <div class="upload-btn">
                        <el-upload
                            :action="uploadFileSrc"
                            :headers="{token}"
                            :limit="1"
                            accept=".pem"
                            :on-success="onSuccess"
                            >
                            <el-button type="primary" size="small">点击上传</el-button>
                        </el-upload>
                        <span>{{ Form.wxpay.cert_key }}</span>
                        <small>apiclient_key.pem</small>
                    </div>
                </el-form-item>
            </el-form>
        </form-drawer>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import {getToken} from '@/util/token'
import { getSetting, changeSetting,uploadFileSrc } from '@/api/setting'

const token = getToken()
const tableData = ref([
    {
        name: '支付宝支付',
        desc: '该系统支持即时到账接口',
        src: 'public/alipay.png',
        key: 'alipay'
    },
    {
        name: '微信支付',
        desc: '该系统支持微信网页支付和扫码支付',
        src: 'public/wepay.png',
        key: 'wxpay'
    },
])
const getData = () => {
    getSetting().then(res => {
        for (const key in res.data) {
            Form[key] = res.data[key]
        }
    })
}
let Form = reactive({
    "close_order_minute": 30,

    "auto_received_day": 7,

    "after_sale_day": 23,

    "alipay": {
        "app_id": "****已配置****",

        "ali_public_key": "****已配置****",

        "private_key": "****已配置****"

    },

    "wxpay": {
        "app_id": "****已配置****",

        "miniapp_id": "****已配置****",

        "secret": "****已配置****",

        "appid": "****已配置****",

        "mch_id": "****已配置****",

        "key": "****已配置****",

        "cert_client": "****已配置****.pem",

        "cert_key": "****已配置****.pem"
    }
})
const paySettingRef = ref(null)
const payType = ref('')
// 配置
const handleSetting = (type) => {
    payType.value = type
    paySettingRef.value.open()
}
// 保存设置
const onSubmit = () => {
    changeSetting(Form).then(res => {
        getData()
    })
}
// 上传成功
const onSuccess = (res) => {
    Form.wxpay.cert_client = res.data
}   

onMounted(() => {
    getData()
})
</script>

<style lang="less" scoped>
.input-width {
    width: 250px;
}

.el-checkbox {
    margin: 0 5px;
}

.pay-item {
    display: flex;
    align-items: center;

    .el-image {
        width: 40px;
        height: 40px;
        margin: 0 10px;
    }

    .text-info {
        display: flex;
        flex-direction: column;

        span {
            font-size: .9rem;
            color: #666;
        }

        small {
            color: #999;
        }
    }
}

.form-item {
    display: flex;
    flex-direction: column;

    small {
        color: #666;
    }
}

.upload-btn {
    display: flex;
    flex-direction: column;

    span {
        margin-top: 5px;
        color: red;
    }

    small {
        color: #666;
    }
}
</style>