<template>
  <div @click="onToggle">
    <svg-icon
      id="guide-full"
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    ></svg-icon>
  </div>
</template>

<script setup>
import screenfull from 'screenfull'

// ? 是否全屏
const isFullscreen = ref(false)

// ? 触发事件
const onToggle = () => {
  screenfull.toggle()
}

// ? 监听 screenfull 的变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
// // on: 绑定监听
onMounted(() => {
  screenfull.on('change', change)
})
// // off: 取消监听
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style lang="scss" scoped></style>
