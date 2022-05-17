<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import E from 'wangeditor'
import i18next from 'i18next'
import { commitArticle, editArticle } from './commit'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: Object
  }
})

const emits = defineEmits(['onSuccess'])

// ? 初始化 Editor 实例
let editor
// ? 获取 DOM
let el
const store = useStore()
const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  // 菜单栏提示
  editor.config.showMenuTooltips = true
  // editor.config.height = 1200
  editor.config.menuTooltipPosition = 'down'
  // 国际化处理
  editor.config.lang = store.getters.language === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next
  editor.create()
}

onMounted(() => {
  el = document.querySelector('#editor-box')
  // ! 需要在挂载完成以后才能进行初始化操作
  initEditor()
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  if (editor == null) return
  editor.destroy()
})

// ? 处理点击提交事件
const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: editor.txt.html()
    })
  } else {
    await commitArticle({
      title: props.title,
      content: editor.txt.html()
    })
  }
  editor.txt.html('')
  emits('onSuccess')
}

// ? 数据回显
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      editor.txt.html(val.content)
    }
  },
  { immediate: true }
)

// ? 监听国际化处理
watchSwitchLang(() => {
  if (!el) return
  // ! 保存用户编辑的内容
  const htmlStr = editor.txt.html()
  // ! 销毁实例
  editor.destroy()
  initEditor()
  editor.txt.html(htmlStr)
})
</script>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
