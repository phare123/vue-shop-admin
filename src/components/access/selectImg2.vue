<!-- 图标选择器 -->
<template>
    <el-form-item label="图标" >
        <component class="preview" :is="modelValue"></component>
        <el-select filterable :modelValue="modelValue" placeholder="请选择图标" @change=" handleChange">
            <el-option v-for="item in icons" :key="item" :label="item" :value="item" >
                <div class="icon-item">
                    <el-icon>
                        <component :is="item"></component>
                    </el-icon>
                    <div>{{ item }}</div>
                </div>
            </el-option>
        </el-select>
    </el-form-item>
</template>

<script setup>
import * as iconList from '@element-plus/icons-vue'
import { ref } from 'vue';
defineProps({
    modelValue  :{
        type:String
    }
})
const icons = ref(Object.keys(iconList))
const emit = defineEmits(['update:modelValue'])
const handleChange = (e) => {
    emit('update:modelValue',e)
}
</script>

<style lang="less" scoped>
.el-form-item{
    .preview{
        width: 15px;
        height: 15px;
        margin: 0 10px;
    }
}
.icon-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    div{
        color: #999;
    }
}
</style>