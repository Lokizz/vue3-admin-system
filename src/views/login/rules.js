// * 将繁杂的逻辑放在外部，保持主文件的代码结构清晰明了
// ? ES Modules
export const validatePass = () => {
  return (rule, value, callback) => {
    if (value === '') {
      callback(new Error('密码不能为空'))
    } else if (value.length < 6) {
      callback(new Error('密码不能少于 6 位'))
    } else {
      callback()
    }
  }
}
