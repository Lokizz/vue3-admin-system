<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :key="index"
            :label="item.label"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="colWidth(item.prop)"
        >
          <template v-if="item.prop === 'publicDate'" #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
          <template v-else-if="item.prop === 'action'" #default="{ row }">
            <el-button type="primary" size="small" @click="onShowClick(row)">{{
              $t('msg.article.show')
            }}</el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">{{
              $t('msg.article.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="size"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { getArticleList, deleteArticle } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import { useI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler'
import { dynamicData, selectDynamicLabel, tableColumns } from './dynamic'
import { tableRef, initSortable } from './sortable'
import { ElMessageBox } from 'element-plus'

// ? 数据相关
const tableData = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)

const getListData = async () => {
  const result = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}

getListData()
// ? 国际化处理
watchSwitchLang(getListData)
// ! 取消 keep-alive 缓存组件带来的副作用
// 再次获取接口数据
onActivated(getListData)

// ? 初始化 sortable
onMounted(() => {
  initSortable(tableData, () => {
    tableData.value = []
    getListData()
  })
})

// ? size 改变
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}
// ? page 改变
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}
// ? 点击查看
const router = useRouter()
const onShowClick = (row) => {
  router.push(`/article/${row._id}`)
}

// ? 点击删除
const i18n = useI18n()
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2'),
    { type: 'warning' }
  ).then(async () => {
    await deleteArticle(row._id)
    ElMessage.success(i18n.t('msg.article.removeSuccess'))
    // ! 重新获取数据
    getListData()
  })
}

// ? 自定义 - 列宽判断
const colWidth = (prop) => {
  if (prop === 'ranking') {
    return 80
  } else if (prop === 'action') {
    return 160
  }
}
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  :deep(.el-table__row) {
    cursor: pointer;
  }

  .pagination {
    justify-content: center;
    margin-top: 20px;
  }
}

:deep(.sortable-ghost) {
  opacity: 0.6;
  color: #fff;
  background: #304156;
}
</style>
