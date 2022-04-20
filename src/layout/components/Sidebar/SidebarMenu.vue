<template>
  <el-menu
    :collapse="!$store.getters.isSidebarOpened"
    :unique-opened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :default-active="activeMenu"
    router
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import SidebarItem from './SidebarItem'
import { filterRoutes, generateMenus } from '@/utils/route'

const router = useRouter()
const routes = computed(() => {
  const filteredRoutes = filterRoutes(router.getRoutes())
  return generateMenus(filteredRoutes)
})

// ? 默认激活
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="less" scoped></style>
