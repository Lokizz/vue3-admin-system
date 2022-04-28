<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column
          type="index"
          :label="$t('msg.role.index')"
          width="120"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.name')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.role.desc')"
          prop="describe"
        ></el-table-column>
        <el-table-column :label="$t('msg.role.action')" #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="onDistributePermission(row)"
          >
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission
      v-model="visible"
      :roleId="selectRoleId"
    ></distribute-permission>
  </div>
</template>

<script setup>
import { roleList } from '@/api/role'
import DistributePermission from './components/DistributePermission.vue'
import { watchSwitchLang } from '@/utils/i18n'

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}

getRoleList()
// ? 国际化处理
watchSwitchLang(getRoleList)

const visible = ref(false)
const selectRoleId = ref('')
const onDistributePermission = (row) => {
  visible.value = true
  selectRoleId.value = row.id
}
</script>

<style lang="scss" scoped></style>
