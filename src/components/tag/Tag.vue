<template>
    <div class="container">
        <el-tabs v-model="activeTab" type="card" @tab-remove="removeTab" @tab-change="changeTab">
            <el-tab-pane  v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path"
                :closable="item.path != '/'"></el-tab-pane>
        </el-tabs>
        <span class="dropdown">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute,useRouter,onBeforeRouteUpdate } from 'vue-router';
import Cookie from 'js-cookie'

const route = useRoute()
const router = useRouter()
const activeTab = ref(route.path)
const tabList = ref([
    {
        title: '后台首页',
        path: '/'
    },
])
// 添加标签导航
const addTab = (obj) => {
    let index =  tabList.value.findIndex(item => item.path === obj.path)
    if(index < 0){
        tabList.value.push(obj)
    }
    Cookie.set('tabList',JSON.stringify(tabList.value))
}

// 初始话tab标签导航
const initTabList  =() => {
    let tbs = Cookie.get('tabList')
    if(tbs){
        tabList.value = (JSON.parse(tbs)) 
    }
}
initTabList()

onBeforeRouteUpdate((to,from) => {
    activeTab.value = to.path
    addTab({
        title:to.meta.title,
        path:to.path
    })
})
// 跳转路哟
const changeTab = (tab) => {
    activeTab.value = tab
    router.push(tab)
}

// 移除tab
const removeTab = (targetName) => {
    const tabs = tabList.value
    let activeName = activeTab.value
    if (activeName === targetName) {
        tabs.forEach((tab, index) => {
            if (tab.path === activeName) {
                const nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                    activeName = nextTab.path
                }
            }
        })
    }
    activeTab.value = activeName
    tabList.value = tabs.filter((tab) => tab.path !== targetName)
}
</script>

<style lang="less" scoped>
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .el-tabs {
        min-width: 100px;
        margin: 8px 0;

        :deep(.el-tabs__nav) {
            border: 0;
        }

        :deep(.el-tabs__header) {
            margin: 0;
            border: 0;
        }

        :deep(.el-tabs__item) {
            border: 0;
            margin-right: 10px;
            background-color: #fff;
        }

        :deep(.is-active) {
            color: #4339ca;
            font-weight: 600;
        }

        :deep(.el-tabs__item:hover) {
            color: #4339ca;
        }

        :deep(.is-disabled) {
            cursor: not-allowed;
        }
    }

    .dropdown {
        background-color: #fff;
        display: flex;
        height: 40px;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        margin-right: 20px;
    }
}
</style>