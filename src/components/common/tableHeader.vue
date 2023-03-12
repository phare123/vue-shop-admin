<!-- 新增与刷新 -->
<template>
    <div class="table-header">
        <div>
            <el-button v-if="btns.includes('create')" type="primary" size="small" @click="$emit('create')">新增</el-button>
            <el-popconfirm v-if="btns.includes('delete')" title="确认删除所有吗?" confirm-button-text="确定" cancel-button-text="取消"
                @confirm="$emit('delete')">
                <template #reference>
                    <el-button type="danger" size="small">批量删除</el-button>
                </template>
            </el-popconfirm>
            <el-button v-if="btns.includes('put')" size="small"  @click="$emit('put')">上架</el-button>
            <el-button v-if="btns.includes('down')" size="small" @click="$emit('down')">下架</el-button>
            <el-button v-if="btns.includes('callback')" size="small" @click="$emit('callback')" type="warning">恢复商品</el-button>
            <el-button v-if="btns.includes('destroy')" size="small" @click="$emit('destroy')" type="danger">彻底删除</el-button>
        </div>
        <el-tooltip v-if="btns.includes('refresh')" effect="dark" content="刷新数据" placement="bottom">
            <el-icon @click="$emit('refresh')">
                <Refresh />
            </el-icon>
        </el-tooltip>
    </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';

const emit = defineEmits(['create', 'refresh','delete','put','down','callback','destroy'])
const props = defineProps({
    layout:{
        type:String,
        default:'create,refresh'
    }
})
const btns = computed(() => {
    return props.layout.split(',')
})
</script>

<style lang="less" scoped>
.table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .el-icon {
        margin-right: 10px;
        color: #666;
    }
}
</style>