<template>
  <router-view></router-view>
</template>

<script setup>
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
#nprogress .bar{
  background-color: #577eff !important;
  height: 3px !important;
}
::-webkit-scrollbar{
  width: 4px;
  height: 6px;
}
::-webkit-scrollbar-corner{
  display: block;
}
::-webkit-scrollbar-thumb{
  border-radius: 8px;
  background-color: rgba(0,0,0,0.2);
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track{
  border-left-color: transparent;
  border-right-color: transparent;
  background-color: rgba(0,0,0,0.1);
}
</style>
