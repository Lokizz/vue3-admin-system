<template>
  <el-dialog
    :title="$t('msg.role.assignPermissions')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allPermission"
      :props="defaultProps"
      node-key="id"
      show-checkbox
      check-strictly
      default-expand-all
    >
    </el-tree>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { permissionList } from '@/api/permission'
import { rolePermission, distributePermission } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { useI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

// ? 确定按钮点击事件
const i18n = useI18n()
const onConfirm = async () => {
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}

const closed = () => {
  emits('update:modelValue', false)
}

// ? 所有权限
const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await permissionList()
}
getPermissionList()
// 国际化处理
watchSwitchLang(getPermissionList)

// 属性结构配置
const defaultProps = {
  // 子元素的键值
  children: 'children',
  label: 'permissionName'
}

// ref
const treeRef = ref(null)
// 当前角色的权限
const getRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  // ! 利用 el-tree 渲染角色的默认权限
  treeRef.value.setCheckedKeys(checkedKeys)
}

watch(
  () => props.roleId,
  (val) => {
    if (val) getRolePermission()
  }
)
</script>

<style lang="scss" scoped></style>
