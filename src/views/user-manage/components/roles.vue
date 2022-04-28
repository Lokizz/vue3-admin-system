<template>
  <!-- dialog 使用 model-value 的 boolean 值决定显示与否 -->
  <el-dialog
    :model-value="modelValue"
    :title="$t('msg.excel.roleDialogTitle')"
    @close="closed"
  >
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { roleList } from '@/api/role'
import { userRoles, updateRole } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { useI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler.js'

const props = defineProps({
  // 从外部接收 modelValue 的值
  modelValue: {
    type: Boolean,
    required: true
  },
  // 从外部接收用户的 id
  userId: {
    type: String,
    required: true
  }
})

// 触发外部 modelValue 值的修改
const emits = defineEmits(['update:modelValue', 'updateRole'])

const closed = () => {
  // 通知外部更新 modelValue 的值
  emits('update:modelValue', false)
}

const i18n = useI18n()
const onConfirm = async () => {
  const roles = userRoleTitleList.value.map((title) => {
    return allRoleList.value.find((role) => role.title === title)
  })
  await updateRole(props.userId, roles)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  // ! 通知父组件角色更新成功
  emits('updateRole')
  closed()
}

// ? 获取所有角色
const allRoleList = ref([])
const getListData = async () => {
  allRoleList.value = await roleList()
}
getListData()
// ? 国际化处理
watchSwitchLang(getListData)

// ? 当前用户角色
const userRoleTitleList = ref([])
const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  userRoleTitleList.value = res.role.map((item) => item.title)
}

watch(
  () => props.userId,
  (val) => {
    // ! userId 不为空时，才调用接口
    if (val) getUserRoles()
  }
)
</script>

<style lang="scss" scoped></style>
