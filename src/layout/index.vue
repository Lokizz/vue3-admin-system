<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.isSidebarOpened ? 'openSidebar' : 'hiddenSidebar']"
  >
    <!-- 左侧 Menu -->
    <sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    ></sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部 navbar -->
        <navbar />
        <tags-view id="guide-tags"></tags-view>
      </div>

      <!-- 内容区 -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import TagsView from '@/components/TagsView/index.vue'
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
  width: calc(100% - #{$sidebarWidth});
  transition: width #{$sidebarDuration};
}

.hiddenSidebar .fixed-header {
  width: calc(100% - #{$hiddenSidebarWidth});
}
</style>
