<template>
  <div></div>
</template>

<script setup>
// import { userRouter } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
const router = useRouter()
const routes = computed(() => {
  const filteredRoutes = filterRoutes(router.getRoutes())
  return generateMenus(filteredRoutes)
})
console.log(routes.value)
</script>

<style lang="less" scoped></style>
