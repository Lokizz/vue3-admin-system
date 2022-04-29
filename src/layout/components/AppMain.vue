<template>
  <div class="app-main">
    <!-- 带有切换动画，并且具有组件缓存 -->
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { isTags } from '@/utils/tags.js'
import { generateTitle, watchSwitchLang } from '@/utils/i18n.js'

// ? 生成 title
const getTitle = (route) => {
  let title = ''
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}
// ? 监听路由的变化
const store = useStore()
const route = useRoute()
watch(
  route,
  (to, from) => {
    // 并不是所有的路由都需要保存（如 /login, /404, /401）
    if (!isTags(to.path)) return
    const { fullPath, meta, name, params, path, query } = to
    store.commit('app/addTagsViewList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  // ! 生成组件时立即调用一次
  { immediate: true }
)
// ? 当 vuex 中的 language 发生变化时，触发传入的回调函数
watchSwitchLang(() => {
  store.getters.tagsViewList.forEach((route, index) => {
    store.commit('app/changeTagsView', {
      index,
      tag: {
        ...route,
        // ! 国际化语言环境发生变化时，替换 title 的渲染值
        title: getTitle(route)
      }
    })
  })
})
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
