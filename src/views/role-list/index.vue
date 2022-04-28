<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column type="index" :label="$t('msg.role.index')" width="120"></el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="title"></el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="describe"></el-table-column>
        <el-table-column :label="$t('msg.role.action')">
          <el-button type="primary" size="small">
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}

getRoleList()
// ? 国际化处理
watchSwitchLang(getRoleList)
</script>

<style lang="scss" scoped></style>
