<template>
  <div class="app-wrapper">
    <!-- 左侧 Menu -->
    <sidebar
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    ></sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部 navbar -->
        <navbar />
        <!-- 内容区 -->
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
// ? 导入 SCSS 中使用 :export 定义的变量
import variables from '@/styles/variables.module.scss'
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
@import '@/styles/mixin.scss';

.app-wrapper {
  // ? 调用 mixin 定义的样式
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
}
</style>
