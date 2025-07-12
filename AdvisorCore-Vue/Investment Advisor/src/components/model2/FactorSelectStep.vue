<template>
  <div class="factor-select-step">
    <div class="factor-panel">
      <div class="panel-header">
        <span class="panel-title">可选因子</span>
        <el-input v-model="search" placeholder="请输入因子名称" size="small" class="search-input">
          <template #suffix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
      <el-table :data="filteredFactors" size="small" border class="factor-table" height="320">
        <el-table-column prop="name" label="因子名称" width="120">
          <template #default="scope">
            <el-checkbox v-model="scope.row.checked" />
            <span style="margin-left: 8px;">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="transfer-btns">
      <el-button type="primary" @click="addSelected">添加 &raquo;</el-button>
      <el-button @click="removeSelected">&laquo; 删除</el-button>
      <el-button @click="clearAll">全部清空</el-button>
    </div>
    <div class="factor-panel">
      <div class="panel-header">
        <span class="panel-title">已选因子（{{ selectedFactors.length }}）</span>
      </div>
      <el-checkbox-group v-model="selectedChecked">
        <div v-for="item in selectedFactors" :key="item.name" class="selected-factor-item">
          <el-checkbox :label="item.name">{{ item.name }}</el-checkbox>
        </div>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits } from 'vue'
import { Search } from '@element-plus/icons-vue'

const props = defineProps<{ allFactors: { name: string; sentence: boolean }[]; selectedFactors: { name: string }[] }>()
const emits = defineEmits(['update:selected-factors'])

const search = ref('')
const factors = ref(props.allFactors.map(f => ({ ...f, checked: false })))
const selectedFactors = ref<{ name: string }[]>([...props.selectedFactors])
const selectedChecked = ref<string[]>([])

watch(() => props.allFactors, (val) => {
  factors.value = val.map(f => ({ ...f, checked: false }))
})
watch(() => props.selectedFactors, (val) => {
  selectedFactors.value = [...val]
})

const filteredFactors = computed(() => {
  if (!search.value) return factors.value
  return factors.value.filter(f => f.name.includes(search.value))
})

function addSelected() {
  const toAdd = factors.value.filter(f => f.checked && !selectedFactors.value.some(sf => sf.name === f.name))
  selectedFactors.value.push(...toAdd.map(f => ({ name: f.name })))
  factors.value.forEach(f => { if (f.checked) f.checked = false })
  emits('update:selected-factors', selectedFactors.value)
}
function removeSelected() {
  selectedFactors.value = selectedFactors.value.filter(f => !selectedChecked.value.includes(f.name))
  selectedChecked.value = []
  emits('update:selected-factors', selectedFactors.value)
}
function clearAll() {
  selectedFactors.value = []
  selectedChecked.value = []
  emits('update:selected-factors', selectedFactors.value)
}
</script>

<style scoped>
:root {
  --primary-blue: #223354;
  --background-gray: #F5F7FA;
  --card-bg: #fff;
  --highlight-color: #F6C659;
  --table-header-bg: #e9edf3;
  --table-header-color: #223354;
}
.factor-select-step {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  justify-content: center;
}
.factor-panel {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(34,51,84,0.08);
  border: 1.5px solid #e0e6f0;
  padding: 18px 12px 12px 12px;
  min-width: 260px;
  flex: 1;
  margin-bottom: 0;
}
.panel-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.panel-title {
  font-weight: 600;
  color: var(--primary-blue);
  margin-right: 12px;
  font-size: 16px;
}
.search-input {
  flex: 1;
}
.factor-table {
  background: white;
}
.el-table th {
  background: var(--table-header-bg) !important;
  font-weight: 700;
  color: var(--table-header-color);
  font-size: 15px;
  border-bottom: 2px solid #e0e6f0;
}
.el-table td {
  font-size: 14px;
  color: var(--primary-blue);
}
.el-table__row:hover {
  background: #eaf3ff !important;
}
.transfer-btns {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
}
.selected-factor-item {
  margin-bottom: 8px;
  font-size: 15px;
}
.el-button[type="primary"] {
  background: var(--primary-blue) !important;
  color: #fff !important;
  border: 2px solid var(--highlight-color) !important;
  font-size: 15px;
  height: 36px;
  min-width: 90px;
  font-weight: 700;
  letter-spacing: 2px;
  transition: background 0.2s, border 0.2s;
}
.el-button[type="primary"]:hover {
  background: #2a4370 !important;
  border-color: #ffd700 !important;
}
.el-button:not([type="primary"]) {
  background: #f5f7fa !important;
  color: var(--primary-blue) !important;
  border: 2px solid var(--primary-blue) !important;
  font-size: 15px;
  height: 36px;
  min-width: 90px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-left: 12px;
  transition: background 0.2s, border 0.2s;
}
.el-button:not([type="primary"]):hover {
  background: #e9edf3 !important;
  border-color: var(--highlight-color) !important;
}
.el-button {
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.2s, background 0.2s, transform 0.1s;
}
.el-button:active {
  transform: scale(0.96);
}
</style>
