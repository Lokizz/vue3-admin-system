<template>
  <el-dropdown
    class="international"
    trigger="click"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip content="国际化" :effect="effect">
        <!-- <svg-icon icon="language" /> -->
        <el-icon><svg-icon icon="language" /></el-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="language === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler.js'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})
const store = useStore()
const language = computed(() => store.getters.language)

// ? 切换语言
const i18n = useI18n()
const handleSetLanguage = (lang) => {
  // 切换 i18n 的 locale
  i18n.locale.value = lang
  // 修改 vuex 保存的 language
  store.commit('app/setLanguage', lang)
  // 提示
  ElMessage.success('更新成功')
}
</script>

<style lang="scss" scoped>
.el-button {
  padding: 0;
  margin: 0;
  border: none;
  box-shadow: none;
}
</style>
