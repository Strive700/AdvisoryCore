<template>
  <div class="style-factor-weight-step">
    <div class="input-row">
      <span>风格投资因子名称</span>
      <el-input v-model="localFactorName" placeholder="请输入风格投资因子名称（3~10字以内）" style="width: 260px; margin-left: 12px;" />
    </div>
    <div class="table-header">
      <span>衍生因子列表</span>
      <span class="table-desc">说明：衍生因子的权重之和为100%，默认为等权重，可自行修改</span>
    </div>
    <el-table :data="weightRows" border class="weight-table" style="margin-top: 12px;">
      <el-table-column prop="id" label="编号" width="80" />
      <el-table-column prop="name" label="衍生因子名称" />
      <el-table-column label="权重 (%)" width="180">
        <template #default="scope">
          <el-input-number v-model="scope.row.weight" :min="0" :max="100" :step="1" />
        </template>
      </el-table-column>
    </el-table>
    <div v-if="error" class="error-tip">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineProps, defineEmits } from 'vue'

interface DerivedFactor {
  id: string;
  name: string;
}
interface WeightRow {
  id: string;
  name: string;
  weight: number;
}

const props = defineProps<{ selectedFactors: DerivedFactor[]; factorName?: string; weights?: WeightRow[]; error?: string }>()
const emits = defineEmits(['update:factor-name', 'update:weights'])

const localFactorName = ref(props.factorName || '')
const weightRows = ref<WeightRow[]>([])

watch(() => props.selectedFactors, (val) => {
  const len = val.length
  if (len === 0) {
    weightRows.value = []
    return
  }
  const avgWeight = 100 / len
  weightRows.value = val.map(f => ({ id: f.id, name: f.name, weight: avgWeight }))
  emits('update:weights', weightRows.value)
}, { immediate: true })

watch(weightRows, (val) => {
  emits('update:weights', val)
}, { deep: true })

watch(localFactorName, (val) => {
  emits('update:factor-name', val)
})
</script>

<style scoped>
:root {
  --primary-blue: #223354;
  --card-bg: #fff;
  --table-header-bg: #e9edf3;
  --table-header-color: #223354;
}
.style-factor-weight-step {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(34,51,84,0.08);
  border: 1.5px solid #e0e6f0;
  max-width: 600px;
  margin: 0 auto;
  padding: 24px 24px 16px 24px;
}
.input-row {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.table-header {
  display: flex;
  align-items: baseline;
  gap: 16px;
}
.table-desc {
  font-size: 13px;
  color: #999;
}
.weight-table {
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
.error-tip {
  color: #f56c6c;
  margin-top: 12px;
  text-align: center;
}
</style>
