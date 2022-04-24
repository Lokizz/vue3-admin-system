<template>
  <el-config-provider :locale="$store.getters.language === 'en' ? en : zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { generateNewStyle, writeNewStyle } from './utils/theme'
import { watchSwitchLang } from '@/utils/i18n'

const store = useStore()
// ! 强制重新注入新的样式
generateNewStyle(store.getters.mainColor).then((newStyle) =>
  writeNewStyle(newStyle)
)
// ! 重新获取新的 userInfo，确保正确的国际化解析
watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})
</script>

<style lang="scss"></style>
