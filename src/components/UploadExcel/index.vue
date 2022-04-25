<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">{{
        $t('msg.uploadExcel.upload')
      }}</el-button>
    </div>
    <input
      type="file"
      ref="excelUploadInput"
      class="excel-upload-input"
      accept=".xlsx, .xls"
      @change="handleChange"
    />

    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragenter.stop.prevent="handleDragover"
      @dragover.stop.prevent="handleDragover"
    >
      <el-icon :size="60"><UploadFilled /></el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import XLSX from 'xlsx'
import { getHeaderRow, isExcel } from './utils'

const props = defineProps({
  // 上传之前的回调
  beforeUpload: Function,
  // 上传成功的回调
  onSuccess: Function
})

// ? 点击上传触发
const loading = ref(false)
const excelUploadInput = ref(null)
const handleUpload = () => {
  // 触发 Input 的点击事件
  excelUploadInput.value.click()
}
const handleChange = (evt) => {
  // 获取用户选择的文件列表
  const files = evt.target.files
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}

// ? 拖曳上传
const handleDrop = (evt) => {
  // 上传中则直接退出
  if (loading.value) return
  // 获取文件
  const files = evt.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须要有一个文件')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
    return
  }
  upload(rawFile)
}
const handleDragover = (evt) => {
  // 在新位置生成源项的副本
  evt.dataTransfer.dropEffect = 'copy'
}

// ? 触发上传事件
const upload = (rawFile) => {
  // 清空 input 的值
  excelUploadInput.value.value = null
  // 用户没有指定上传前的回调时，直接解析文件
  if (!props.beforeUpload) {
    renderData(rawFile)
    return
  }
  // 用户指定了上传前的回调时，只有返回 true 时，才会指定后续操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    renderData(rawFile)
  }
}

// ? 读取数据（异步）
const renderData = (rawFile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    // 浏览器内置 API
    const reader = new FileReader()

    // 读取操作完成时触发
    // ! onload 必须在数据读取前定义
    reader.onload = (evt) => {
      // 1. 获取到解析后的数据
      const data = evt.target.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取 sheet1 的名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 读取 sheet1 的数据
      const workSheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(workSheet)
      // 6. 解析数据表体
      const results = XLSX.utils.sheet_to_json(workSheet)
      // 7. 传入解析之后的数据
      generateData({ header, results })
      // 8. 处理 loading
      loading.value = false
      // 9. 成功回调
      resolve()
    }

    // 开始读取数据
    reader.readAsArrayBuffer(rawFile)
  })
}

// ? 根据导入内容，生成数据
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    .el-icon {
      margin: 0 auto;
    }
  }
}
</style>
