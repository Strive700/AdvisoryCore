<!-- 2.2 -->
<template>
  <div class="fof-quantify-view">
    <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step active">1 基金筛选</span>
      <span class="step-divider">—</span>
      <span class="step active">2 基金量化</span>
      <span class="step-divider">—</span>
      <span class="step">资产配置</span>
      <span class="step-divider">—</span>
      <span class="step">基金组合</span>
    </div>
    <div class="desc">基金量化：设定量化因子的权重，形成综合因子并排序，筛选基金</div>
    <div class="set-weight-bar">
      <span class="set-weight-title">设置量化因子权重</span>
      <button class="edit-btn" @click="onEdit">{{ isEdit ? '完成' : '修改' }}</button>
    </div>
    <table class="factor-table">
      <thead>
        <tr>
          <th>编号</th>
          <th>大类因子</th>
          <th>基础因子和衍生因子</th>
          <th>配置权重（%）</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.id" :class="{ 'highlight': true }">
          <td>{{ item.id }}</td>
          <td>{{ item.factor }}</td>
          <td>{{ item.base }}</td>
          <td>
            <input type="number" v-model.number="item.weight" min="0" max="100" class="weight-input" :readonly="!isEdit" />
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <div class="sort-bar">
      <span class="sort-title">设置因子排序</span>
      <label><input type="radio" value="desc" v-model="sortOrder" /> 降序</label>
      <label><input type="radio" value="asc" v-model="sortOrder" /> 升序</label>
    </div> -->
    <button class="start-btn" @click="onStart">开始筛选基金</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const tableData = ref([
  { id: 1, factor: '价值因子', base: '市盈率、股息率', weight: 30 },
  { id: 2, factor: '成长因子', base: '净利润增长率、营收增长率', weight: 25 },
  { id: 3, factor: '波动率因子', base: '年化波动率、最大回撤', weight: 20 },
  { id: 4, factor: '动量因子', base: '过去12个月收益率', weight: 25 }
])
const sortOrder = ref('desc')

// 新增编辑状态
const isEdit = ref(false)

function onEdit() {
  isEdit.value = !isEdit.value
}

const router = useRouter()
function onStart() {
  router.push('/model3/FOFAssetWeightView')
}
</script>

<style scoped>
.fof-quantify-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 0;
}
.step-bar {
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 8px;
  gap: 8px;
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
  color: #bbb;
  font-size: 20px;
}
.desc {
  color: #666;
  font-size: 15px;
  margin-bottom: 18px;
}
.set-weight-bar {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 16px;
}
.set-weight-title {
  color: #197aff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
}
.edit-btn {
  background: #197aff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 18px;
  font-size: 15px;
  cursor: pointer;
}
.factor-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  margin-bottom: 12px;
}
.factor-table th,
.factor-table td {
  border: 1px solid #bbb;
  padding: 8px 16px;
  text-align: center;
  font-size: 15px;
  color: #222;
}
.factor-table th {
  background: #e5e5e5;
  font-weight: bold;
}
.factor-table .highlight {
  background: #eaf2ff;
}
.sort-bar {
  margin: 24px 0 18px 0;
  font-size: 15px;
  color: #222;
  display: flex;
  align-items: center;
  gap: 18px;
}
.sort-title {
  color: #197aff;
  font-weight: bold;
}
.start-btn {
  background: #197aff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 12px 38px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 18px;
}
.weight-input {
  background: #eaf2ff;
  border: 1px solid #b3d1ff;
  border-radius: 4px;
  padding: 4px 8px;
  width: 80px;
  text-align: center;
  font-size: 15px;
  color: #197aff;
}
.weight-input:focus {
  outline: none;
  border-color: #197aff;
  background: #d6eaff;
}
</style>