<!--
 * @Author: MacLoki
 * @Date: 2022-04-24 14:36:54
 * @LastEditors: MacLoki
 * @LastEditTime: 2022-06-27 23:24:31
 * @FilePath: /vue3-admin-system/src/views/profile/components/Author.vue
-->
<template>
  <div class="author-container">
    <div class="header">
      <pan-thumb
        image="https://s2.loli.net/2022/06/27/ZepKimb975zYdXA.jpg"
        width="60px"
        height="60px"
      ></pan-thumb>
      <div class="header-desc">
        <h3>{{ $t('msg.profile.name') }}</h3>
        <span>{{ $t('msg.profile.job') }}</span>
      </div>
    </div>

    <div class="info">
      {{ $t('msg.profile.Introduction') }}
    </div>
  </div>
</template>

<script setup>
import PanThumb from '@/components/PanThumb/index.vue'
</script>

<style lang="scss" scoped>
.author-container {
  .header {
    display: flex;
    .header-desc {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      span {
        font-size: 14px;
      }
    }
  }
  .info {
    margin-top: 16px;
    line-height: 22px;
    font-size: 14px;
  }
}
</style>
