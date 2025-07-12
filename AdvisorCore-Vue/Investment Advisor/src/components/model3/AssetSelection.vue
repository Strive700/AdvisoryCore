<!-- 1.1 -->
<!-- 选择大类资产指数 -->
<template>
  <div v-if="visible" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container select-asset-view">
        <div class="main-content">
          <!-- 左侧树形结构面板 -->
          <div class="asset-panel">
            <div class="panel-title">可选指数</div>
            <input v-model="searchKeyword" placeholder="请输入指数名称" class="search-input" />
            <ul class="tree-list">
              <TreeNode v-for="node in filteredTreeData" :key="node.indexid || node.nodeName" :node="node" :checked-indices="checkedIndices" />
            </ul>
          </div>
          <!-- 穿梭按钮 -->
          <div class="transfer-btns">
            <button @click="addSelected">添加 &raquo;</button>
            <button @click="removeSelected">&laquo; 删除</button>
            <button @click="clearAll">全部清空</button>
          </div>
          <!-- 右侧已选面板 -->
          <div class="asset-panel">
            <div class="panel-title">
              方案名称
              <input v-model="planName" placeholder="请输入方案名称（1~6字以内）" maxlength="6" class="plan-input" />
            </div>
            <div class="selected-count">已选指数（{{ selectedIndices.length }}）</div>
            <div class="selected-list">
              <label v-for="item in selectedIndices" :key="item" class="selected-item">
                <input type="checkbox" v-model="checkedSelectedIndices" :value="item" />
                {{ item }}
              </label>
            </div>
          </div>
        </div>
        <!-- 底部操作栏，日期输入框和按钮分两行 -->
        <div class="footer-bar-with-date-center">
          <div class="footer-date">
            <label>开始日期：</label>
            <input type="date" v-model="startDate" />
            <span style="margin: 0 12px;">~</span>
            <label>结束日期：</label>
            <input type="date" v-model="endDate" />
          </div>
        </div>
        <div class="footer-btns-bar">
          <button @click="onCancel">取消</button>
          <button :disabled="!canSave" @click="onSave" class="primary">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, watch } from 'vue'
import { defineComponent, h } from 'vue'

const props = defineProps<{ visible: boolean, treeData?: any[] }>()
const emit = defineEmits(['save', 'cancel'])

const treeData = computed(() => props.treeData || [])

const searchKeyword = ref('')
const checkedIndices = ref<string[]>([])
const selectedIndices = ref<string[]>([])
const checkedSelectedIndices = ref<string[]>([])
const planName = ref('')
const savedPlan = ref<any>(null)

// 新增：日期
const initialStartDate = '2000-01-01'
const initialEndDate = '2000-01-01'
const startDate = ref(initialStartDate)
const endDate = ref(initialEndDate)

const filteredTreeData = computed(() => {
  if (!searchKeyword.value) return treeData.value
  function filterTree(nodes: any[]) {
    return nodes
      .map((node: any) => {
        if (node.isLeaf) {
          return node.nodeName.includes(searchKeyword.value) ? node : null
        } else if (node.children && node.children.length > 0) {
          const filteredChildren = filterTree(node.children)
          if (filteredChildren.length > 0 || node.nodeName.includes(searchKeyword.value)) {
            return { ...node, children: filteredChildren }
          }
        } else if (node.nodeName.includes(searchKeyword.value)) {
          return node
        }
        return null
      })
      .filter(Boolean)
  }
  return filterTree(treeData.value)
})

function addSelected() {
  checkedIndices.value.forEach(idx => {
    if (!selectedIndices.value.includes(idx)) {
      selectedIndices.value.push(idx)
    }
  })
  checkedIndices.value = []
}

function removeSelected() {
  selectedIndices.value = selectedIndices.value.filter(idx => !checkedSelectedIndices.value.includes(idx))
  checkedSelectedIndices.value = []
}

function clearAll() {
  selectedIndices.value = []
  checkedSelectedIndices.value = []
}

function onCancel() {
  emit('cancel')
  // 重置内容（可选）
  searchKeyword.value = ''
  checkedIndices.value = []
  selectedIndices.value = []
  checkedSelectedIndices.value = []
  planName.value = ''
}

const canSave = computed(() => {
  return (
    selectedIndices.value.length > 0 &&
    planName.value.trim().length > 0 &&
    startDate.value !== initialStartDate &&
    endDate.value !== initialEndDate
  )
})

// TODO: 新增方案接口，见后端接口文档
async function onSave() {
  if (!canSave.value) return
  // 按接口文档格式组装请求体
  const planObj = {
    planName: planName.value,
    indexList: JSON.stringify(selectedIndices.value), // 转为字符串格式的 JSON 数组
    startDate: startDate.value,
    endDate: endDate.value
  }
  // TODO: 调用后端新增方案接口
  try {
    const resp = await fetch('http://localhost:8080/api/plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(planObj)
    })
    if (resp.status === 201) {
      // 插入成功
      const text = await resp.text()
      // 可选：弹窗提示/关闭弹窗/清空表单
      searchKeyword.value = ''
      checkedIndices.value = []
      selectedIndices.value = []
      checkedSelectedIndices.value = []
      planName.value = ''
      // 可选：a1lert(text)
      console.log('插入成功')
      emit('cancel') // 保存成功后关闭弹窗
    } else {
      // 插入失败
      const err = await resp.json()
      // 可选：alert(err.message || '插入失败')
      console.error('插入失败', err)
    }
  } catch (e) {
    // 可选：alert('网络错误')
    console.error('网络错误', e)
  }
}

// 弹窗关闭时重置内容（可选）
watch(() => props.visible, (val) => {
  if (!val) {
    searchKeyword.value = ''
    checkedIndices.value = []
    selectedIndices.value = []
    checkedSelectedIndices.value = []
    planName.value = ''
  } else {
    // 弹窗打开时打印调试信息
    console.log('【弹窗打开时】props.treeData:', props.treeData)
    console.log('【弹窗打开时】filteredTreeData:', filteredTreeData.value)
  }
})

const TreeNode = defineComponent({
  name: 'TreeNode',
  props: {
    node: { type: Object, required: true },
    checkedIndices: { type: Array, required: true }
  },
  setup(props) {
    return () => h('li', [
      props.node.isLeaf
        ? h('label', [
            h('input', {
              type: 'checkbox',
              value: props.node.nodeName,
              checked: props.checkedIndices.includes(props.node.nodeName),
              onInput: (e) => {
                const checked = e.target.checked
                const val = props.node.nodeName
                const arr = props.checkedIndices
                if (checked && !arr.includes(val)) arr.push(val)
                if (!checked && arr.includes(val)) arr.splice(arr.indexOf(val), 1)
              }
            }),
            props.node.nodeName
          ])
        : h('span', { style: 'font-weight:bold;' }, props.node.nodeName),
      props.node.children && props.node.children.length > 0
        ? h('ul', props.node.children.map((child: any) =>
            h(TreeNode, { node: child, checkedIndices: props.checkedIndices })
          ))
        : null
    ])
  }
})

watch(() => props.treeData, (val) => {
  console.log('【watch:props.treeData】', val)
})
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
.modal-container {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  min-width: 800px;
  min-height: 480px;
  max-width: 95vw;
  max-height: 90vh;
  overflow: auto;
  padding: 0 0 18px 0;
  position: relative;
}
.select-asset-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 0;
  color: #222;
}
.step-bar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 18px;
  margin-bottom: 24px;
}
.step {
  font-weight: bold;
  color: #999;
  background: #f5f5f5;
  border-radius: 16px;
  padding: 4px 18px;
}
.step.active {
  color: #197aff;
  background: #eaf2ff;
}
.step-divider {
  margin: 0 12px;
  color: #bbb;
}
.main-content {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 24px;
}
.asset-panel {
  background: #fafbfc;
  border-radius: 10px;
  padding: 18px 16px 12px 16px;
  width: 270px;
  min-height: 420px;
  box-shadow: 0 2px 8px #f0f1f2;
  color: #222;
}
.panel-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  color: #222;
}
.search-input {
  width: 210px;
  margin-bottom: 6px;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #222;
}
.search-input::placeholder {
  color: #bbb;
}
.plan-input {
  width: 180px;
  margin-left: 10px;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #222;
}
.plan-input::placeholder {
  color: #bbb;
}
.tree-list {
  margin-top: 8px;
  max-height: 320px;
  overflow-y: auto;
  color: #333;
}
.tree-list strong {
  color: #222;
}
.tree-list label {
  color: #333;
}
.selected-count {
  color: #197aff;
  font-size: 14px;
  margin: 10px 0 8px 0;
}
.selected-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #333;
}
.selected-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #333;
}
.transfer-btns {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 90px;
}
.transfer-btns button {
  min-width: 90px;
  padding: 6px 0;
  border-radius: 4px;
  border: 1px solid #197aff;
  background: #fff;
  color: #197aff;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 2px;
  transition: background 0.2s, color 0.2s;
}
.transfer-btns button:hover {
  background: #eaf2ff;
}
.footer-bar-with-date-center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 38px;
}
.footer-date {
  display: flex;
  align-items: center;
  gap: 8px;
}
.footer-btns-bar {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 18px;
}
.footer-btns-bar button {
  min-width: 100px;
  padding: 8px 0;
  border-radius: 4px;
  border: 1.5px solid #197aff;
  background: #fff;
  color: #197aff;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.footer-btns-bar button.primary {
  background: #197aff;
  color: #fff;
}
.footer-btns-bar button:disabled {
  background: #ccc;
  color: #fff;
  border-color: #ccc;
  cursor: not-allowed;
}
</style>