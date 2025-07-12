<template>
  <div class="set-derived-factor-weight-view">
    <h2 class="title">创建衍生因子</h2>
    <div class="input-row">
      <span class="input-label">因子名称</span>
      <el-input v-model="factorName" placeholder="请输入衍生因子名称" style="width: 340px;" />
    </div>
    <el-table :data="factorWeights" border class="weight-table" style="margin: 32px auto 0 auto; width: 420px;">
      <el-table-column prop="name" label="因子名称" width="200" />
      <el-table-column prop="weight" label="因子权重 (%)" width="220">
        <template #default="scope">
          <el-input v-model.number="scope.row.weight" size="small" />
        </template>
      </el-table-column>
    </el-table>
    <div class="footer-bar">
      <el-button size="large" style="width: 120px;">上一步</el-button>
      <el-button type="primary" size="large" style="width: 120px;">确定</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const factorName = ref('')
const factorWeights = ref([
  { name: '成立日期', weight: 5 },
  { name: '发行机构', weight: 20 },
  { name: '阶段管理基金经理', weight: 35 },
  { name: '基金类型', weight: 40 }
])
</script>

<style scoped>
.set-derived-factor-weight-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 32px 0;
}
.title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #222;
}
.input-row {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}
.input-label {
  font-size: 16px;
  color: #666;
  margin-right: 12px;
  width: 80px;
}
.weight-table {
  background: white;
}
.footer-bar {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  padding: 0 40px;
}
</style>