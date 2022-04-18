<template>
  <!-- 单个根组件时可使用 $attrs 传送父组件的 Fallthrough Attributes -->
  <el-dropdown v-bind="$attrs" trigger="click" @command="handleSetTheme">
    <!-- 图标 -->
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <el-icon><svg-icon icon="change-theme"></svg-icon></el-icon
      ></el-tooltip>
    </div>
    <!-- menu -->
    <template #dropdown>
      <!-- 传递数值给 el-dropdown 的回调函数 -->
      <el-dropdown-menu command="color">
        <el-dropdown-item>
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 弹出层 -->
  <div>
    <select-color v-model="selectColorVisible"></select-color>
  </div>
</template>

<script setup>
import SelectColor from './components/SelectColor.vue'

// ? dialog
const selectColorVisible = ref(false)
const handleSetTheme = (command) => {
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped></style>
