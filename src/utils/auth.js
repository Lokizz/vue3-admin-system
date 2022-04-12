// * 被动退出登陆的方案
import {
  getItem,
  setItem
} from './storage'
import {
  TOKEN_TIMESTAMP,
  TOKEN_EXPIRATION_TIME
} from '@/constants'

// ? 获取时间戳
export function getTimestamp() {
  return getItem(TOKEN_TIMESTAMP)
}

// ? 设置时间戳
export function setTimestamp() {
  setItem(TOKEN_TIMESTAMP, Date.now())
}

// ? 设置失效时长
export function isExpired() {
  // 当前时间
  const currentTime = Date.now()
  // 缓存时间
  const timestamp = getTimestamp()
  return currentTime - timestamp > TOKEN_EXPIRATION_TIME
}
