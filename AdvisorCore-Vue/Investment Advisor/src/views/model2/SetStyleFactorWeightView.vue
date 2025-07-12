<template>
  <div class="set-style-factor-weight-view">
    <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step">1 挑选衍生因子</span>
      <span class="step-divider">—</span>
      <span class="step active">2 设置因子权重并创建</span>
    </div>
    <el-input v-model="styleFactorName" placeholder="请输入风格名称（3~10字以内）" class="style-factor-input" />
    <div class="desc">说明：衍生因子的权重之和为100%，默认为等权重，可自行修改</div>
    <el-table :data="factorWeights" border class="weight-table" style="margin: 24px auto 0 auto; width: 820px;">
      <el-table-column prop="index" label="编号" width="80" />
      <el-table-column prop="name" label="衍生因子名称" width="320" />
      <el-table-column prop="weight" label="权重 (%)" width="120">
        <template #default="scope">
          <el-input v-model.number="scope.row.weight" size="small" />
        </template>
      </el-table-column>
    </el-table>
    <div class="footer-bar">
      <el-button size="large">上一步</el-button>
      <el-button type="primary" size="large">创建</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const styleFactorName = ref('')
const factorWeights = ref([
  { index: 1, name: '成立日期', weight: 10 },
  { index: 2, name: '发行机构', weight: 10 },
  { index: 3, name: '阶段管理基金经理', weight: 10 },
  { index: 4, name: '成立日期', weight: 10 },
  { index: 5, name: '发行机构', weight: 10 },
  { index: 6, name: '阶段管理基金经理', weight: 10 },
  { index: 7, name: '成立日期', weight: 10 },
  { index: 8, name: '发行机构', weight: 10 },
  { index: 9, name: '阶段管理基金经理', weight: 10 },
  { index: 10, name: '阶段管理基金经理', weight: 10 }
])
</script>

<style scoped>
.set-style-factor-weight-view {
  max-width: 1000px;
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
.style-factor-input {
  width: 480px;
  margin-bottom: 10px;
}
.desc {
  color: #888;
  font-size: 14px;
  margin-bottom: 8px;
  margin-left: 2px;
}
.weight-table {
  background: white;
}
.footer-bar {
  display: flex;
  justify-content: center;
  margin-top: 38px;
  gap: 48px;
}
</style> 