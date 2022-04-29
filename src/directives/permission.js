import store from '@/store'

function checkPermission(el, binding) {
  // 获取对应的权限
  // value -> 用户传递进来的值
  const { value } = binding
  // 获取当前用户的所有功能权限
  const points = store.getters.userInfo.permission.points
  if (value && value instanceof Array) {
    // 匹配对应的指令
    const hasPermission = points.some((point) => {
      return value.includes(point)
    })
    // 匹配失败
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permission value is ["admin","editor"...]')
  }
}

export default {
  // ? 在绑定元素的父组件被挂载之后调用
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  // ? 在包含组件的 VNode 及子组件的 VNode 更新后调用
  update(el, binding) {
    checkPermission(el, binding)
  }
}
