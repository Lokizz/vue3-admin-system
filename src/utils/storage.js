// ? 保存数据
export const setItem = (key, value) => {
  // 可能的情况：基本数据类型或复杂数据类型
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// ? 获取数据
export const getItem = key => {
  // 可能存在复杂数据类型
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (err) {
    return value
  }
}

//  ? 删除指定数据
export const removeItem = key => {
  window.localStorage.remove(key)
}

// ? 删除所有数据
export const removeAllItems = () => {
  window.localStorage.clear()
}
