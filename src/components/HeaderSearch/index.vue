<template>
  <div class="header-search" :class="{ show: isShow }">
    <svg-icon
      class-name="search-icon"
      icon="search"
      @click.stop="onShowClick"
    ></svg-icon>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      remote
      default-first-option
      :remote-method="querySearch"
      placeholder="search"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join('>')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { filterRoutes } from '@/utils/route'
import { generateRoutes } from './FuseData'
import Fuse from 'fuse.js'
import { watchSwitchLang } from '@/utils/i18n'
// ? 数据源
const router = useRouter()
let searchPool = computed(() => {
  const filteredRoutes = filterRoutes(router.getRoutes())
  return generateRoutes(filteredRoutes)
})

// ? 搜索库相关
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配算法放弃的实际，0 需要完美匹配，1 将匹配任何内容
    threshold: 0.4,
    // 开始匹配的长度
    minMatchCharLength: 1,
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool.value)

// ? 控制 search 框展示
const isShow = ref(false)
const onShowClick = () => {
  isShow.value = !isShow.value
}

// ? search 相关
const search = ref('')
// ? 检索方法
const searchOptions = ref([])
const querySearch = (query) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}
watch(isShow, (val) => {
  if (val) {
    headerSearchSelectRef.value.blur()
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

// 关闭事件
const headerSearchSelectRef = ref(null)
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}

const onSelectChange = (val) => {
  router.push(val.path)
}

watchSwitchLang(() => {
  searchPool = computed(() => {
    const filteredRoutes = filterRoutes(router.getRoutes())
    return generateRoutes(filteredRoutes)
  })
  // 语言改变以后再次初始化搜索库
  initFuse(searchPool.value)
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  display: flex;
  align-items: center;

  :deep(.search-icon) {
    cursor: pointer;
    font-size: 18px;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
