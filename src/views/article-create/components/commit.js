// * 专门负责文章提交的模块
import { createArticle, editorArticle } from '@/api/article'
import i18n from '@/i18n'

const t = i18n.global.t
// ? 提交新创建文章
export const commitArticle = async (data) => {
  const res = await createArticle(data)
  ElMessage.success(t('msg.article.createSuccess'))
  return res
}

// ? 提交编辑过后的文章
export const editArticle = async (data) => {
  const res = await editorArticle(data)
  ElMessage.success(t('msg.article.editorSuccess'))
  return res
}
