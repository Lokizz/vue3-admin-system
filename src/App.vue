<template>
  <el-config-provider :locale="$store.getters.language === 'en' ? en : zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { generateNewStyle, writeNewStyle } from './utils/theme'

const store = useStore()
generateNewStyle(store.getters.mainColor)
  .then(newStyle => writeNewStyle(newStyle))
</script>

<style lang="scss"></style>
