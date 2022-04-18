// * 转换 title 为 i18n 对应的数据源映射
import i18n from '@/i18n'

export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}
