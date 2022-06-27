<!--
 * @Author: MacLoki
 * @Date: 2022-03-16 14:57:55
 * @LastEditors: MacLoki
 * @LastEditTime: 2022-06-27 23:16:08
 * @FilePath: /vue3-admin-system/src/views/profile/index.vue
-->
<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card
          class="project-card"
          :features="featureData"
        ></project-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature :features="featureData" />
            </el-tab-pane>
            <!-- <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter />
            </el-tab-pane> -->
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue'
// eslint-disable-next-line no-unused-vars
import Feature from './components/Feature.vue'
// import Chapter from './components/Chapter.vue'
import Author from './components/Author.vue'
import { feature } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'

// ? 默认显示的页面为 feature
const activeName = ref('feature')

const featureData = ref([])
const getFeatureData = async () => {
  const features = await feature()
  featureData.value = features.filter((item) => {
    if (item.title.includes('Authority verification')) {
      item.title = 'Authority verification'
    }
    const bannedList = [
      '架构设计',
      'zip 导入',
      '发布',
      '其他',
      'Architecture design',
      'zip import',
      'release',
      'other'
    ]
    return !bannedList.includes(item.title)
  })
}
getFeatureData()
// ? 语言发生变化时，重新获取对应语言的功能数据
watchSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped>
.project-card {
  margin-right: 20px;
}
</style>
