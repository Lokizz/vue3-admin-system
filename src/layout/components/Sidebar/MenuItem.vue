<template>
  <!-- element icon -->
  <i v-if="icon.includes('el-icon')" class="sub-el-cion" :class="icon"></i>
  <!-- 非 element icon -->
  <svg-icon v-else :icon="icon"></svg-icon>
  <!-- 文本 -->
  <span>{{ title }}</span>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<style lang="sass" scoped></style>
