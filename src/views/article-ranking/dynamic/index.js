// * 处理列数据相关内容
import DynamicData from './DynamicData'
import { watchSwitchLang } from '@/utils/i18n'

// ? 暴露出动态的列数据
export const dynamicData = ref(DynamicData())

// 监测语言变化时，重新获取数据
watchSwitchLang(() => {
  dynamicData.value = DynamicData()
  initSelectDynamicLabel()
})

// ? 创建被勾选的动态列数据
export const selectDynamicLabel = ref([])
// 默认全部勾选
const initSelectDynamicLabel = () => {
  selectDynamicLabel.value = dynamicData.value.map((item) => item.label)
}
initSelectDynamicLabel()

// ? 声明 table 的列数据
export const tableColumns = ref([])
watch(
  selectDynamicLabel,
  (val) => {
    tableColumns.value = []
    // 遍历列数据，从中判断出当前列是否被勾选的
    const selectData = dynamicData.value.filter((item) => {
      return val.includes(item.label)
    })
    tableColumns.value.push(...selectData)
  },
  {
    immediate: true
  }
)
