<template>
  <div class="navbar">
    <hamburger class="hamburger-container"></hamburger>
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <el-icon :size="20"><tools /></el-icon>
        </div>
        <!-- #使用的是 v-slot 的简写 -->
        <template #dropdown>
          <el-dropdown-item>
            <router-link to="/"> 主页 </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <a target="__blank" href="#">课程主页</a>
          </el-dropdown-item>
          <!-- divided 显示分隔线 -->
          <el-dropdown-item divided @click="logout">退出登陆</el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { Tools } from '@element-plus/icons-vue'
import hamburger from '@/components/hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'

const store = useStore()
const logout = () => {
  // ? 调用 store 定义的方法
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: flex-start;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    cursor: pointer;
    transition: background 0.3s;
    // hover 动画
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .right-menu {
    // ? flex 下的子元素设置 margin 为 auto，可自动填充该方位的空白
    margin-left: auto;
    padding-right: 16px;

    :deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
