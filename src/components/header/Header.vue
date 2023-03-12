<template>
    <div class="container">
        <div class="l-content">
            <div class="h-logo">
                <el-icon>
                    <ElementPlus />
                </el-icon>
                <p>商城后台</p>
            </div>
            <div class="icons">
                <el-button color="#4339ca" :icon="$store.state.collapse ? 'Expand' : 'Fold'" @click="handleCollapse"/>
                <el-tooltip class="box-item" effect="dark" content="刷新" placement="top-start">
                    <el-button color="#4339ca" icon="Refresh" @click="handleRefresh" />
                </el-tooltip>
            </div>
        </div>
        <div class="r-content">
            <el-tooltip class="box-item" effect="dark" :content="isFullscreen ? '缩小' : '全屏'" placement="top-start">
                <el-button @click="toggle" color="#4339ca" :icon="isFullscreen ? 'Aim' : 'FullScreen'" />
            </el-tooltip>
            <div class="userList">
                <img :src="$store.state.user.data.avatar" alt="">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ $store.state.user.data.username }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="repassword">修改密码</el-dropdown-item>
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
    <form-drawer ref="formDrawerRef" title="修改密码" confirm-text="提交" destroyOnClose @submit="onSubmit">
        <el-form ref="formRef" :model="pwdForm" status-icon :rules="rules" label-width="auto" class="demo-ruleForm">
            <el-form-item label="旧密码" prop="oldpassword">
                <el-input v-model="pwdForm.oldpassword" type="password" show-password />
            </el-form-item>
            <el-form-item label="新密码" prop="password">
                <el-input v-model="pwdForm.password" type="password" show-password />
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
                <el-input v-model="pwdForm.repassword" type="password" show-password />
            </el-form-item>
        </el-form>
    </form-drawer>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'
import formDrawer from '../formdrawer/formDrawer.vue';
import {userRePassword,Logout} from '@/util/useManager'

const { isFullscreen, toggle } = useFullscreen()
const {
    formDrawerRef,
    formRef,
    onSubmit,
    pwdForm,
    rules,
    handleCollapse
} = userRePassword()
// 退出登录
const {logout} = Logout()
// 右侧下拉菜单事件判断
const handleCommand = (value) => {
    switch (value) {
        case 'repassword':
            formDrawerRef.value.open()
            break;
        case 'logout':
            logout()
            break;
        default:
            break;
    }
}

// 刷新
const handleRefresh = () => location.reload()
</script>

<style lang="less" scoped>
.container {
    height: 60px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .l-content {
        height: 100%;
        margin-left: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .h-logo {
            display: flex;
            justify-content: center;
            align-items: center;

            .el-icon {
                font-size: 1.5rem;
            }

            p {
                margin-left: 15px;
                font-size: 1.4rem;
            }
        }

        .icons {
            margin-left: 120px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .el-button {
                font-size: 1.3rem;

                &:nth-of-type(2) {
                    margin-left: 4px;
                }
            }
        }
    }

    .r-content {
        margin-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        .el-button {
            font-size: 1.3rem;
            margin-right: 40px;
        }

        .userList {
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
                width: 30px;
                height: 30px;
                border-radius: 100%;
                margin-right: 10px;
            }

            .el-dropdown {
                span {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                color: #fff;
            }
        }
    }
}

.el-drawer {
    .el-form {
        .el-form-item {
            margin-bottom: 30px;
        }
    }
}
</style>