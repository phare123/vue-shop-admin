<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-container>
                <el-aside :width="$store.state.collapse ? '64px' : '250px'">
                    <Aside />
                </el-aside>
                <el-main>
                    <Tag />
                    <router-view v-slot="{ Component }">
                        <transition name="fade">
                            <keep-alive :max="10">
                                <component :is="Component"></component>
                            </keep-alive>
                        </transition>
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
    <!-- <el-button @click="logout">退出登录</el-button> -->
</template>

<script setup>
import Header from '@/components/header/Header.vue'
import Aside from '@/components/aside/Aside.vue'
import Tag from '@/components/tag/Tag.vue'


</script>

<style lang="less">
.el-header {
    background-color: #4339ca;
    padding: 0;
}

.el-aside {
    transition: all .4s;
}

.el-main {
    padding: 0 20px;
    background-color: #f3f4f6;
}
.fade-enter-from{
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
}
.fade-enter-to{
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0)
}
.fade-leave-from{
    opacity: 1;
}
.fade-leave-to{
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
}
.fade-enter-active,
.fade-leave-active{
    transition: all .5s;
}
.fade-enter-active{
    transition-delay: .3s;
}
</style>