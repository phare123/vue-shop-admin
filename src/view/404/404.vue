<template>
      <el-result
        icon="warning"
        title="404"
        sub-title="你找的页面走丢了~"
      >
        <template #extra>
          <el-button type="primary" @click="$router.replace('/')">回到首页</el-button>
        </template>
      </el-result>
</template>

<script setup>
</script>

<style lang="less"  scoped>

</style>