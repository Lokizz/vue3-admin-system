// * 将繁杂的逻辑放在外部，保持主文件的代码结构清晰明了

// ! 在非组件中的导入方式
import i18n from '@/i18n'

// ? ES Modules
export const validatePass = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}
