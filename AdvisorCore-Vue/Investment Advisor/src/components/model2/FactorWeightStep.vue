<template>
  <div class="factor-weight-step">
    <div class="input-row">
      <span>因子名称</span>
      <el-input v-model="factorNameLocal" placeholder="请输入衍生因子名称" style="width: 260px; margin-left: 12px;" />
    </div>
    <el-table :data="weightRows" border class="weight-table" style="margin-top: 24px;">
      <el-table-column prop="name" label="因子名称" width="180" />
      <el-table-column prop="weight" label="因子权重 (%)" width="180">
        <template #default="scope">
          <el-input-number v-model="scope.row.weight" :min="0" :max="100" :step="1" />
        </template>
      </el-table-column>
      <el-table-column prop="baseId" label="" width="0" v-if="false" />
    </el-table>
    <div v-if="error" class="error-tip">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps<{ selectedFactors: { name: string, baseId?: number }[]; factorName?: string; weights?: { baseId: number; name: string; weight: number }[]; error?: string }>()
const emits = defineEmits(['update:factor-name', 'update:weights'])

const factorNameLocal = ref(props.factorName || '')
const weightRows = ref<{ baseId: number; name: string; weight: number }[]>([])

watch(() => props.selectedFactors, (val) => {
  weightRows.value = val
    .filter(f => typeof f.baseId === 'number')
    .map(f => ({ baseId: f.baseId as number, name: f.name, weight: 0 }))
  emits('update:weights', weightRows.value)
}, { immediate: true })

watch(weightRows, (val) => {
  emits('update:weights', val)
}, { deep: true })

watch(factorNameLocal, (val) => {
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
.factor-weight-step {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(34,51,84,0.08);
  border: 1.5px solid #e0e6f0;
  max-width: 480px;
  margin: 0 auto;
  padding: 24px 24px 16px 24px;
}
.input-row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
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
