<template>
  <div>{{ $t('msg.login.title') }}</div>
  <el-pagination
    :page-sizes="[100]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
  />
</template>

<script setup></script>

<style lang="scss" scoped></style>
