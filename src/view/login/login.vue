<template>
    <el-row>
        <!-- 左边 -->
        <el-col :lg="16" :md="12">
            <div>
                <h2>欢迎光临</h2>
                <p>此站点是基于vue3+vite与Element-Plus开发的商城后台管理系统</p>
            </div>
        </el-col>
        <!-- 右边 -->
        <el-col :lg="8" :md="12">
            <div class="text">
                <h2>欢迎回来</h2>
                <div class="info">
                    <span></span>
                    <p>账号密码登录</p>
                    <span></span>
                </div>
            </div>
            <el-form ref="formRef" status-icon :rules="rules" :model="form">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名" :prefix-icon="User" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" show-password type="password" placeholder="请输入密码"
                        :prefix-icon="Lock" />
                </el-form-item>
                <el-form-item>
                    <el-button round color="#6366f1" type="primary" :loading="loading" @click="onSubmit">登 录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
import { useStore } from 'vuex'
import {  onBeforeUnmount, onMounted } from "@vue/runtime-core";
import { notification } from "../../util/msgTip";

const store = useStore()
const router = useRouter()
// 表单输入
const form = reactive({
    username: 'admin',
    password: 'admin'
})
// 验证规则
const rules = {
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 1, max: 10, message: '用户名过长，请重新输入', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 5, max: 10, message: '密码长度应为5到10个字符', trigger: 'blur' }
    ],
}
// 点击登录事件
const loading = ref(false)
const formRef = ref(null)
const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        loading.value = true

        store.dispatch("login", form).then(res => {
            notification("登录成功",3000,'success')
            router.replace("/")
        }).finally(() => {
            loading.value = false
        })
    })
}
// 键盘事件
const onKeyUp = (e) => {
        if (e.key == 'Enter') onSubmit()
    }
    onMounted(() => {
        document.addEventListener('keyup', onKeyUp)
    })
    onBeforeUnmount(() => {
        document.removeEventListener('keyup', onKeyUp)
    })
</script>

<style lang="less" scoped>
.el-row {
    background-color: #6366f1;
    min-height: 100vh;

    .el-col {
        display: flex;
        align-items: center;
        justify-content: center;

        // 左边
        &:first-child {
            h2 {
                color: #fff;
                font-size: 4.5rem;
            }

            p {
                color: #fff;
                font-size: 1.2rem;
                margin-top: 10px;
            }
        }

        // 右边
        &:nth-of-type(2) {
            background-color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .text {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                h2 {
                    font-size: 2.4rem;
                    color: #666;
                }

                .info {
                    margin-top: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    p {
                        font-size: 1.2rem;
                        color: #ccc;
                        margin: 0 10px;
                    }

                    span {
                        width: 50px;
                        border: solid 1px #eee;
                    }
                }
            }

            .el-form {
                margin-top: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-top: 40px;

                .el-form-item {
                    width: 250px;
                    position: relative;

                    .el-button {
                        width: 100%;
                    }
                }
            }
        }
    }
}
</style>