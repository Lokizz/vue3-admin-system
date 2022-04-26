<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <!-- dialog body -->
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <!-- dialog footer -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { useI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler'
import { watchSwitchLang } from '@/utils/i18n'
import { getUserManageAllList } from '@/api/user-manage'
import { USER_RELATIONS } from './Export2ExcelConstants'
import { dateFilter } from '@/filters'

defineProps({
  // ? 为 true 时显示 Dialog
  modelValue: {
    type: Boolean,
    required: true
  }
})

// input 元素的值的更新操作
const emits = defineEmits(['update:modelValue'])

// ? 默认文件名称
const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
// ! 监听语言变化时重新指定新的默认名称
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

const closed = () => {
  emits('update:modelValue', false)
}

// ? 点击确定
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  // 数据
  const allUser = (await getUserManageAllList()).list
  // 导入工具包
  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, allUser)
  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName
  })
  loading.value = false
  closed()
}

const formatJson = (headers, rows) => {
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 角色需要进行特殊处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }
      // 时间处理
      if (headers[key] === 'openTime') {
        return dateFilter(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}
</script>

<style lang="scss" scoped></style>
