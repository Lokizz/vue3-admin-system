<template>
  <el-timeline>
    <el-timeline-item
      v-for="item in chapterData"
      :key="item.id"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card>
        <h4>{{ item.content }}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { chapter } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'

const chapterData = ref([])
const getChapterData = async () => {
  chapterData.value = await chapter()
}
getChapterData()
// ? 针对 getters.language 的变化作出对应改变
watchSwitchLang(getChapterData)
</script>

<style lang="scss" scoped></style>
