<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" @click="onImportExcelClick">
          {{ $t('msg.excel.importExcel') }}
        </el-button>
        <el-button type="success" @click="onToExcelClick">
          {{ $t('msg.excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>
    <!-- 数据展示 -->
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <!-- 索引 -->
        <el-table-column type="index"></el-table-column>
        <!-- 用户名 -->
        <el-table-column
          prop="username"
          :label="$t('msg.excel.name')"
        ></el-table-column>
        <!-- 手机号 -->
        <el-table-column
          prop="mobile"
          :label="$t('msg.excel.mobile')"
        ></el-table-column>
        <!-- 头像 -->
        <!-- ! 不能直接渲染图片，直接绑定图像数据只会渲染成字符串 -->
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <!-- row 代表当前行的数据 -->
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <!-- 角色 -->
        <!-- ! 同样无法直接渲染 -->
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <!-- 当前用户没有指定角色，则渲染默认角色名 -->
              <el-tag size="small">
                {{ $t('msg.excel.defaultRole') }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 时间 -->
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="300"
        >
          <!-- v-slot 接收 props 数据 -->
          <template #default="{ row }">
            <!-- 传递 props.id 来调用接口 -->
            <el-button
              type="primary"
              size="small"
              @click="onShowClick(row._id)"
            >
              {{ $t('msg.excel.show') }}
            </el-button>
            <!-- 传递 userId 给 roles 组件 -->
            <el-button type="info" size="small" @click="onShowRoleClick(row)">
              {{ $t('msg.excel.showRole') }}
            </el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">
              {{ $t('msg.excel.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[2, 5, 10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 接受子组件传递的 update:modelValue 来更新显示状态 -->
    <export-to-excel v-model="exportToExcelVisible"></export-to-excel>
    <roles-dialog
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @updateRole="getListData"
    ></roles-dialog>
  </div>
</template>

<script setup>
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler'
import ExportToExcel from './components/Export2Excel.vue'
import RolesDialog from './components/roles.vue'

// ? 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)

// ? 获取数据的方法
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()
// ? 监听语言环境的变化
watchSwitchLang(getListData)
// ? 让 `keep-alive` 缓存的组件重新激活时调用
onActivated(getListData)

const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

// ? 查看用户详情
const onShowClick = (id) => {
  // 跳转页面的同时，通过
  router.push(`/user/info/${id}`)
}

// ? 为员工分配角色
const roleDialogVisible = ref(false)
const selectUserId = ref('')
// ? 显示 dialog，并且获取需要传递的 userId
const onShowRoleClick = (row) => {
  roleDialogVisible.value = true
  selectUserId.value = row._id
}
// ! 保证每次打开 dialog 都可以重新获取舒据
watch(roleDialogVisible, (val) => {
  // 如果关闭了 dialog，则设置 userId 为空
  if (!val) selectUserId.value = ''
})

// ? 删除用户
const i18n = useI18n()
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    console.log(row._id)
    await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    // ! 删除成功以后重新获取数据进行渲染
    getListData()
  })
}

// ? excel 导入点击事件
const router = useRouter()
const onImportExcelClick = () => {
  router.push('/user/import')
}

// ? 导出相关
const exportToExcelVisible = ref(false)
const onToExcelClick = () => {
  exportToExcelVisible.value = true
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
