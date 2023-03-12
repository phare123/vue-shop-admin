<!-- home组件数字加载动画 -->
<template>
    <div>
        {{ count.nums.toFixed() }}
    </div>
</template>

<script setup>
import gsap from 'gsap'
import { reactive } from 'vue-demi'

const props = defineProps({
    value:{
        type:Number,
        default:0
    }
})

const count = reactive({
    nums:0
})

const CountTo = () => {
    gsap.to(count,{
        duration:0.7,
        nums:props.value
    })
}

CountTo()
</script>

<style lang="less" scoped>

</style>