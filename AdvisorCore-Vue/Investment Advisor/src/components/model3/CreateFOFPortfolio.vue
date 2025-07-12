<!-- 2.4 -->
<template>
  <div class="create-fof-portfolio-view">
    <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step active">1 基金筛选</span>
      <span class="step-divider">—</span>
      <span class="step active">2 基金量化</span>
      <span class="step-divider">—</span>
      <span class="step active">3 资产配置</span>
      <span class="step-divider">—</span>
      <span class="step active">4 基金组合</span>
    </div>
    <div class="desc">说明：大类资产配置优化各个大类资产的权重，制定资产配置目标，各大类资产权重之和为100%</div>
    <form class="portfolio-form">
      <div class="form-row">
        <label>组合名称</label>
        <input v-model="form.name" placeholder="请输入组合名称（4~20字以内）" maxlength="20" />
        <label>基准</label>
        <select v-model="form.benchmark">
          <option value="沪深300">沪深300</option>
          <option value="中证500">中证500</option>
          <option value="上证50">上证50</option>
        </select>
      </div>
      <div class="form-row">
        <label>组合特色</label>
        <textarea v-model="form.feature" placeholder="请编辑组合特色说明" rows="2" />
        <label>适用人群</label>
        <input v-model="form.people" placeholder="请输入适用人群" />
      </div>
      <div class="form-row risk-row">
        <label>风险等级</label>
        <label v-for="item in riskOptions" :key="item.value" class="risk-label">
          <input type="radio" v-model="form.risk" :value="item.value" />{{ item.label }}
        </label>
      </div>
    </form>
    <div class="asset-info-title">基金资产配置信息</div>
    <table class="asset-table">
      <thead>
        <tr>
          <th>编号</th>
          <th>基金</th>
          <th>基金类型</th>
          <th>配置权重（%）</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.id" :class="{ 'highlight': true }">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.weight }}</td>
        </tr>
      </tbody>
    </table>
    <div style="text-align: right; margin-top: 24px;">
      <button class="create-btn" @click="onCreatePortfolio">创建FOF组合</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const form = ref({
  name: '',
  benchmark: '沪深300',
  feature: '',
  people: '',
  risk: 'R1'
})
const riskOptions = [
  { value: 'R1', label: 'R1低风险' },
  { value: 'R2', label: 'R2中低风险' },
  { value: 'R3', label: 'R3中风险' },
  { value: 'R4', label: 'R4中高风险' },
  { value: 'R5', label: 'R5高风险' }
]
const riskMap: Record<string, string> = {
  R1: '低',
  R2: '中低',
  R3: '中等',
  R4: '中高',
  R5: '高'
}
const tableData = ref<any[]>([])

onMounted(() => {
  const cache = sessionStorage.getItem('fofPortfolioFunds')
  if (cache) {
    tableData.value = JSON.parse(cache)
    console.log('【CreateFOFPortfolio页面接收到的基金数据】', tableData.value)
  } else {
    console.warn('未获取到基金组合数据')
  }
})

function onCreatePortfolio() {
  // 只组装有的字段
  const payload: Record<string, any> = {}
  if (form.value.name) payload.portfolioName = form.value.name
  if (form.value.benchmark) payload.benchmarkIndex = form.value.benchmark
  if (form.value.feature) payload.portfolioFeature = form.value.feature
  if (form.value.people) payload.targetAudience = form.value.people
  if (tableData.value.length > 0) {
    payload.representativeFundCode = tableData.value[0].fundCode || tableData.value[0].code || ''
  }
  if (form.value.risk && riskMap[form.value.risk]) payload.riskRating = riskMap[form.value.risk]
  console.log('【创建FOF组合】请求体:', payload)
  fetch('http://localhost:8080/api/fof-portfolio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(async res => {
      const text = await res.text()
      if (res.status === 201) {
        console.log('【创建FOF组合】成功:', text)
      } else {
        console.error('【创建FOF组合】失败:', text)
      }
    })
    .catch(e => {
      console.error('【创建FOF组合】异常:', e)
    })
}
</script>

<style scoped>
.create-fof-portfolio-view {
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
.portfolio-form {
  margin-bottom: 18px;
}
.form-row {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 12px;
}
.form-row label {
  min-width: 70px;
  color: #222;
  font-size: 15px;
}
.form-row input,
.form-row select,
.form-row textarea {
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 15px;
  min-width: 220px;
}
.form-row textarea {
  min-width: 320px;
  resize: vertical;
}
.risk-row {
  gap: 8px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.risk-label {
  margin-right: 8px;
  color: #222;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 1px;
  white-space: nowrap;
}
.asset-info-title {
  color: #197aff;
  font-size: 16px;
  font-weight: bold;
  margin: 18px 0 8px 0;
  text-decoration: underline;
  cursor: pointer;
}
.asset-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  margin-bottom: 12px;
}
.asset-table th,
.asset-table td {
  border: 1px solid #bbb;
  padding: 8px 16px;
  text-align: center;
  font-size: 15px;
  color: #222;
}
.asset-table th {
  background: #e5e5e5;
  font-weight: bold;
}
.asset-table .highlight {
  background: #eaf2ff;
}
.create-btn {
  background: #197aff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 36px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 18px;
  transition: background 0.2s;
}
.create-btn:hover {
  background: #145fcc;
}
</style> 