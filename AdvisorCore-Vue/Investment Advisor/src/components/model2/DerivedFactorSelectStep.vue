<template>
  <div class="derived-factor-select-step">
    <div class="factor-panel">
      <div class="panel-header">
        <span class="panel-title">衍生因子</span>
        <el-input v-model="search" placeholder="请输入衍生因子风格名称" size="small" class="search-input">
          <template #suffix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
      <el-table v-if="allFactors.length" :data="filteredFactors" size="small" border class="factor-table" height="320">
        <el-table-column prop="name" label="因子名称" width="120" />
        <el-table-column label="勾选" width="60">
          <template #default="scope">
            <el-checkbox v-model="scope.row.checked" />
          </template>
        </el-table-column>
      </el-table>
      <div v-else>暂无数据</div>
    </div>
    <div class="transfer-btns">
      <el-button type="primary" @click="addSelected">添加 &raquo;</el-button>
      <el-button @click="removeSelected">&laquo; 删除</el-button>
      <el-button @click="clearAll">全部清空</el-button>
    </div>
    <div class="factor-panel">
      <div class="panel-header">
        <span class="panel-title">方案名称</span>
        <el-input v-model="localPlanName" placeholder="请输入方案名称（1~6字以内）" size="small" style="width: 180px; margin-left: 10px;" />
      </div>
      <div class="selected-count">已选指数（{{ selectedFactors.length }}）</div>
      <el-checkbox-group v-model="selectedCheckedIds">
        <div v-for="item in selectedFactors" :key="item.id" class="selected-factor-item">
          <el-checkbox :label="item.id">{{ item.name }}</el-checkbox>
        </div>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'

interface DerivedFactor {
  id: string;
  name: string;
}

const props = defineProps<{ allFactors: DerivedFactor[]; selectedFactors: DerivedFactor[]; planName?: string }>()
const emits = defineEmits(['update:selected-factors', 'update:plan-name'])

const search = ref('')
const localPlanName = ref(props.planName || '')
const factors = ref(props.allFactors.map(f => ({ ...f, checked: false })))
const selectedFactors = ref<DerivedFactor[]>([...props.selectedFactors])
const selectedCheckedIds = ref<string[]>([])

watch(() => props.allFactors, (val) => {
  factors.value = val.map(f => ({ ...f, checked: false }))
})
watch(() => props.selectedFactors, (val) => {
  selectedFactors.value = [...val]
})
watch(localPlanName, (val) => {
  emits('update:plan-name', val)
})

const filteredFactors = computed(() => {
  if (!search.value) return factors.value
  return factors.value.filter(f => f.name.includes(search.value))
})

function addSelected() {
  const toAdd = factors.value.filter(f => f.checked && !selectedFactors.value.some(s => s.id === f.id))
  selectedFactors.value.push(...toAdd)
  factors.value.forEach(f => { if (f.checked) f.checked = false })
  emits('update:selected-factors', selectedFactors.value)
}
function removeSelected() {
  selectedFactors.value = selectedFactors.value.filter(f => !selectedCheckedIds.value.includes(f.id))
  selectedCheckedIds.value = []
  emits('update:selected-factors', selectedFactors.value)
}
function clearAll() {
  selectedFactors.value = []
  selectedCheckedIds.value = []
  emits('update:selected-factors', selectedFactors.value)
}

onMounted(() => {
  // fetchFactorTree()
})
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
.derived-factor-select-step {
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
.selected-count {
  color: var(--primary-blue);
  font-size: 14px;
  margin: 10px 0 8px 0;
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
