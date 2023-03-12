<template>
    <div>
        <el-card>
            <!-- 标签页 -->
            <el-tabs @tab-change="getData">
                <!-- 注册与访问 -->
                <el-tab-pane label="注册与访问">
                    <el-form ref="formRef" :model="Form" status-icon label-width="auto">
                        <el-form-item label="是否允许注册会员">
                            <el-radio-group v-model="Form.open_reg">
                                <el-radio :label="1" border>是</el-radio>
                                <el-radio :label="0" border>否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="注册类型">
                            <el-radio-group v-model="Form.reg_method">
                                <el-radio label="username" border>普通注册</el-radio>
                                <el-radio label="phone" border>手机注册</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="密码最小长度">
                            <el-input class="input-width" type="number" v-model="Form.password_min"></el-input>
                        </el-form-item>
                        <el-form-item label="强制密码复杂度">
                            <el-checkbox-group v-model="Form.password_encrypt">
                                <el-checkbox :label="0" border>数字</el-checkbox>
                                <el-checkbox :label="1" border>小写字母</el-checkbox>
                                <el-checkbox :label="2" border>大写字母</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <!-- 上传设置 -->
                <el-tab-pane label="上传设置">
                    <el-form ref="formRef" :model="Form" status-icon label-width="auto">
                        <el-form-item label="默认上传方式">
                            <el-radio-group v-model="Form.upload_method">
                                <el-radio label="local" border>本地</el-radio>
                                <el-radio label="oss" border>阿里oss</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="Bucket">
                            <el-input class="input-width" placeholder="Bucket" v-model="Form.upload_config.Bucket"></el-input>
                        </el-form-item>
                        <el-form-item label="ACCESS_KEY">
                            <el-input class="input-width" type="password" placeholder="ACCESS_KEY" v-model="Form.upload_config.ACCESS_KEY"></el-input>
                        </el-form-item>
                        <el-form-item label="SECRET_KEY">
                            <el-input class="input-width" type="password" placeholder="SECRET_KEY" v-model="Form.upload_config.SECRET_KEY"></el-input>
                        </el-form-item>
                        <el-form-item label="空间域名">
                            <el-input class="input-width" v-model="Form.upload_config.http" placeholder="http"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="Api安全">
                    <el-form :model="Form" status-icon label-width="auto">
                        <el-form-item label="是否开启API安全">
                            <el-radio-group v-model="Form.api_safe">
                                <el-radio :label="1" border>是</el-radio>
                                <el-radio :label="0" border>否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="密钥">
                            <el-input class="input-width" v-model="Form.api_secret"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <el-form-item label=" ">
                <el-button @click="saveSetting" type="primary" size="small">保存</el-button>
            </el-form-item>
        </el-card>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { getSetting,changeSetting } from '@/api/setting'

const getData = () => {
    getSetting().then(res => {
        for (const key in res.data) {
            Form[key] = res.data[key]
        }
        Form.password_encrypt = res.data.password_encrypt.split(',')
        Form.password_encrypt = Form.password_encrypt.map(Number)
        Form.password_encrypt = Form.password_encrypt.splice(1,3)
    })
}
let Form = reactive({
    "open_reg": 1, //开启注册，0关闭1开启
    "reg_method": "username", //注册方式，username普通phone手机
    "password_min": 7, //密码最小长度
    "password_encrypt": [], //密码复杂度，0数字、1小写字母、2大写字母、3符号；例如0,1,2
    "upload_method": "oss", //上传方式，local本地，oss对象存储
    "upload_config": {
        ACCESS_KEY:"",
        Bucket:"",
        SECRET_KEY:"",
        http:""
    }, //上传配置 { Bucket:"", ACCESS_KEY:"", SECRET_KEY:"", http:""}
    "api_safe": 1, //api安全，0关闭1开启
    "api_secret": "", //秘钥
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

<style lang="less" scoped>
.input-width {
    width: 200px;
}

.el-checkbox {
    margin: 0 5px;
}
</style>