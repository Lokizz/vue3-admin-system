<template>
  <div class="hamburger-container" @click="toggleClick">
    <div class="hamburger">
      <svg-icon :icon="icon"></svg-icon>
    </div>
  </div>
</template>

<script setup>
const store = useStore()
const icon = computed(() => {
  return store.getters.isSidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})
const toggleClick = () => {
  store.commit('app/toggleSidebarOpened')
}
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger .svg-icon {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
