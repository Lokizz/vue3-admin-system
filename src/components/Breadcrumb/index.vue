<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, idx) in breadcrumbData"
        :key="item.path"
      >
        <!-- 不可点击 -->
        <!-- 面包屑的最后一个数据 -->
        <span class="no-redirect" v-if="idx === breadcrumbData.length - 1">{{
          item.meta.title
        }}</span>
        <!-- 可点击 -->
        <span class="redirect" v-else @click="onLinkClick(item)">{{
          item.meta.title
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  // ? `route.matched` 获取当前的路由表
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}

// ? 监听路由变化
const route = useRoute()
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    // ? 一进入组件就马上触发
    immediate: true
  }
)

// ? 跳转点击事件
const router = useRouter()
const onLinkClick = (item) => {
  router.push(item.path)
}

// ? 设置项目主色
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  :deep(.redirect) {
    color: #666;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      color: v-bind(linkHoverColor);
    }
  }
  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
}
</style>
