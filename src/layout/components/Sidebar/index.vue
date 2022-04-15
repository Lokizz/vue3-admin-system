<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="square"
        src="https://s2.loli.net/2022/04/15/O3avoQqKcNxEhH6.png"
      ></el-avatar>
      <h1 class="logo-title" v-if="$store.getters.isSidebarOpened">
        LaoIT Admin
      </h1>
    </div>
    <el-scrollbar>
      <sidebar-menu> </sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu.vue'

const logoHeight = 44
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + 'px';
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
