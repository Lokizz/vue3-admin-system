<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box"></div>
    <!-- 按钮 -->
    <div class="bottom">
      <el-button type="primary" @click="onSubmitCLick">
        {{ $t('msg.article.commit') }}</el-button
      >
    </div>
  </div>
</template>

<script setup>
import MKEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { watchSwitchLang } from '@/utils/i18n'
import { commitArticle, editArticle } from './commit'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: Object
  }
})

// eslint-disable-next-line dot-notation
const emits = defineEmits(['onSuccess'])

// Editor 实例
let mkEditor
let el
onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})
const store = useStore()
const initEditor = () => {
  mkEditor = new MKEditor({
    // 绑定元素
    el,
    // 高度
    height: '500px',
    // 样式
    previewStyle: '',
    // 国际化
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  mkEditor.getMarkdown()
}

watchSwitchLang(() => {
  if (!el) return
  // ! 保存用户编辑的内容
  const htmlStr = mkEditor.getHTML()
  // ! 清理实例
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})

// ? 点击提交按钮
const onSubmitCLick = async () => {
  if (props.detail && props.detail._id) {
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: mkEditor.getHTML()
    })
  } else {
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML()
    })
  }
  // ? 重置内容
  mkEditor.reset()
  // ? 触发成功通知
  emits('onSuccess')
}

// ? 数据回显
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      mkEditor.setHTML(val.content)
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
