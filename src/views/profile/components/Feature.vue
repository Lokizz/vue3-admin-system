<!--
 * @Author: MacLoki
 * @Date: 2022-04-24 14:36:14
 * @LastEditors: MacLoki
 * @LastEditTime: 2022-06-27 23:14:57
 * @FilePath: /vue3-admin-system/src/views/profile/components/Feature.vue
-->
<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item
      v-for="item in features"
      :key="item.id"
      :title="item.title"
      :name="item.id"
    >
      <div v-html="item.content"></div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
defineProps({
  features: {
    type: Array,
    required: true
  }
})

const activeName = ref(0)
</script>

<style lang="scss" scoped>
:deep(.el-collapse-item__header) {
  font-weight: bold;
}

.el-collapse-item {
  :deep(a) {
    color: #2d62f7;
    margin: 0 4px;
  }
}
</style>
