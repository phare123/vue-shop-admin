<template>
    <div class="aside">
        <el-menu @select="handleSelect" 
        :default-active="defaultActive" 
        :collapse="$store.state.collapse" 
        active-text-color="#4339ca" 
        unique-opened
        :collapse-transition="false"
        >
            <template v-for="item in asideMenu" :key="item.name">
                <!-- 二级菜单 -->
                <el-sub-menu :index="item.name" v-if="item.child && item.child.length > 0">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item :index="item2.frontpath" v-for="item2 in item.child">
                        <el-icon>
                            <component :is="item2.icon"></component>
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
                <!-- 一级菜单 -->
                <el-menu-item index="item.frontpath" v-else>
                    <el-icon><component :is="item.icon"></component></el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { computed,ref} from 'vue'
import {useRouter,useRoute, onBeforeRouteUpdate} from 'vue-router'
import {useStore} from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()

const asideMenu = computed(() => store.state.asideMenu)
// 点击后跳转响应路由
const handleSelect = (path) => {
    router.push(path)
}
// 默认选中菜单位置
const defaultActive = ref(route.path)

// 监听路由变化
onBeforeRouteUpdate((to,from) => {
    defaultActive.value = to.path
})

</script>

<style lang="less" scoped>
.aside {
    height: 100%;
    
    .el-menu {
        min-height: 100vh;
        height: 100%;
    }
}
</style>