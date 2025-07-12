<template>
  <div class="select-derived-factor-view">
    <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step active">1 挑选衍生因子</span>
      <span class="step-divider">—</span>
      <span class="step">2 设置因子权重并创建</span>
    </div>
    <div class="main-content">
      <!-- 左侧表格 -->
      <div class="factor-panel">
        <div class="panel-title">衍生因子</div>
        <el-input v-model="search" placeholder="请输入衍生因子风格名称" clearable prefix-icon="el-icon-search" class="search-input" />
        <el-table :data="filteredFactors" style="width: 100%; margin-top: 10px;" height="320" border>
          <el-table-column prop="name" label="因子名称" width="120" />
          <el-table-column label="勾选" width="60">
            <template #default="scope">
              <el-checkbox v-model="scope.row.checked" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 穿梭按钮 -->
      <div class="transfer-btns">
        <el-button @click="addSelected" size="small">添加 &raquo;</el-button>
        <el-button @click="removeSelected" size="small">&laquo; 删除</el-button>
        <el-button @click="clearAll" size="small">全部清空</el-button>
      </div>
      <!-- 右侧已选列表 -->
      <div class="factor-panel">
        <div class="panel-title">方案名称
          <el-input v-model="planName" placeholder="请输入方案名称（1~6字以内）" size="small" style="width: 180px; margin-left: 10px;" />
        </div>
        <div class="selected-count">已选指数（{{ selectedFactors.length }}）</div>
        <el-checkbox-group v-model="selectedChecked">
          <div v-for="item in selectedFactors" :key="item.id" style="margin: 8px 0;">
            <el-checkbox :label="item.id">{{ item.name }}</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
    </div>
    <!-- 底部操作按钮 -->
    <div class="footer-bar">
      <el-button size="large">取消</el-button>
      <el-button type="primary" size="large">下一步</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface FactorItem {
  id: string;
  name: string;
  checked: boolean;
}

const search = ref('')
const planName = ref('')
const selectedChecked = ref<string[]>([])

const allFactors = ref<FactorItem[]>([
  { id: '1', name: '成立日期', checked: true },
  { id: '2', name: '发行机构', checked: true },
  { id: '3', name: '阶段管理基金经理', checked: true },
  { id: '4', name: '基金类型', checked: false },
  { id: '5', name: '成立日期', checked: false },
  { id: '6', name: '发行机构', checked: false },
  { id: '7', name: '阶段管理基金经理', checked: false },
  { id: '8', name: '基金类型', checked: false },
  { id: '9', name: '基金类型', checked: false },
  { id: '10', name: '基金类型', checked: false }
])

const selectedFactors = ref<FactorItem[]>([])

const filteredFactors = computed(() => {
  if (!search.value) return allFactors.value
  return allFactors.value.filter(f => f.name.includes(search.value))
})

function addSelected() {
  const toAdd = allFactors.value.filter(f => f.checked && !selectedFactors.value.some(s => s.id === f.id))
  selectedFactors.value.push(...toAdd)
  allFactors.value.forEach(f => { if (f.checked) f.checked = false })
}
function removeSelected() {
  selectedFactors.value = selectedFactors.value.filter(f => !selectedChecked.value.includes(f.id))
  selectedChecked.value = []
}
function clearAll() {
  selectedFactors.value = []
  selectedChecked.value = []
}
</script>

<style scoped>
.select-derived-factor-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 0;
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
.factor-panel {
  background: #fafbfc;
  border-radius: 10px;
  padding: 18px 16px 12px 16px;
  width: 270px;
  min-height: 420px;
  box-shadow: 0 2px 8px #f0f1f2;
}
.panel-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}
.search-input {
  width: 210px;
  margin-bottom: 6px;
}
.transfer-btns {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 90px;
}
.selected-count {
  color: #197aff;
  font-size: 14px;
  margin: 10px 0 8px 0;
}
.footer-bar {
  display: flex;
  justify-content: flex-end;
  margin-top: 38px;
  gap: 24px;
}
</style>