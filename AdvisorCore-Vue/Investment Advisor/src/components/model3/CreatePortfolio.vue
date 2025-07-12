<!-- 1.6 -->
<!-- 第五步：创建策略组合 -->
<template>
  <div class="create-portfolio-view">
    <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step active">1 大类选择</span>
      <span class="step-divider">—</span>
      <span class="step active">2 大类研究</span>
      <span class="step-divider">—</span>
      <span class="step active">3 资产配置</span>
      <span class="step-divider">—</span>
      <span class="step active">4 基金筛选</span>
      <span class="step-divider">—</span>
      <span class="step active">5 基金组合</span>
    </div>
    <div class="desc">说明：大类资产配置优化各个大类资产的权重，制定资产配置目标，各大类资产权重之和为100%</div>
    <div class="portfolio-form">
      <div class="form-row">
        <label>组合名称</label>
        <input v-model="portfolio.name" placeholder="请输入组合名称（4~20字以内）" maxlength="20" />
        <label style="margin-left: 32px;">比较基准</label>
        <input v-model="portfolio.benchmark" placeholder="沪深300" />
      </div>
      <div class="form-row">
        <label>组合特性</label>
        <textarea v-model="portfolio.feature" placeholder="请编辑组合特性说明" rows="2" />
        <label style="margin-left: 32px;">适用人群</label>
        <input v-model="portfolio.people" placeholder="请输入适用人群" />
      </div>
    </div>
    <div class="section-title">大类资产配置信息</div>
    <div class="model-header">
      <span class="model-title">选择基金权重配置模型</span>
      <button v-for="type in modelTypes" :key="type.value" :class="['model-btn', modelType===type.value ? 'active' : '']" @click="modelType=type.value; if(type.value==='equal'){setEqualWeight()}">{{ type.label }}</button>
    </div>
    <div class="portfolio-content">
      <table class="portfolio-table">
        <thead>
          <tr>
            <th>编号</th>
            <th>成份基金名称</th>
            <th>基金代码</th>
            <th>所属大类</th>
            <th>基金类型</th>
            <th>配置权重（%）</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in fundList" :key="item.code">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.type }}</td>
            <td>
              <input type="number" v-model.number="item.weight" min="0" max="100" class="weight-input" />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pie-chart">
        <div class="pie-label">高风险配置</div>
        <v-chart class="pie-echart" :option="pieOption" />
      </div>
    </div>
  </div>
  <div style="text-align: right; margin-top: 32px;">
    <button class="finish-btn" @click="onFinish">完成</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { useRoute } from 'vue-router'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

const portfolio = ref({
  name: '',
  benchmark: '',
  feature: '',
  people: ''
})
const modelTypes = [
  { label: '用户自定义', value: 'user' },
  { label: '等权重', value: 'equal' }
  // { label: '逆方差', value: 'inverse' },
  // { label: '等风险', value: 'risk' },
  // { label: '均值方差', value: 'meanvar' }
]
const modelType = ref('user')
const route = useRoute()
const fundList = ref<any[]>([])

onMounted(() => {
  // 通过路由 state 获取基金数据，只展示已选中的基金
  if (history.state && history.state.fundData) {
    fundList.value = history.state.fundData.map((item: any, idx: number) => ({
      ...item,
      id: idx + 1,
      name: item.name || item.fundName || '',
      code: item.code || item.fundCode || '',
      category: item.category || '',
      type: item.type || item.fundType || '',
      weight: item.weight || 0
    }))
    console.log('【接收到的基金数据，仅包含已选中的基金】', fundList.value)
  } else {
    // 没有数据时可做提示或跳转
    console.warn('未获取到基金数据')
  }
})

function setEqualWeight() {
  const n = fundList.value.length
  if (n === 0) return
  const avg = Math.floor((100 * 100) / n) / 100 // 保留两位小数
  let remain = 100 - avg * (n - 1)
  fundList.value.forEach((item, idx) => {
    item.weight = idx === n - 1 ? remain : avg
  })
}

const pieOption = ref({
  tooltip: { trigger: 'item' },
  legend: { orient: 'vertical', left: 'left' },
  series: [{
    name: '高风险配置',
    type: 'pie',
    radius: '60%',
    data: [
      { value: 47.54, name: '债券' },
      { value: 52.46, name: '股票' },
      { value: 0, name: '定存' }
    ],
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    },
    label: {
      position: 'outside',
      formatter: '{b} {d}%',
      fontSize: 16
    },
    labelLine: {
      show: true,
      length: 20,
      length2: 10
    }
  }]
})

async function onFinish() {
  const payload = {
    name: portfolio.value.name,
    benchmark: portfolio.value.benchmark,
    feature: portfolio.value.feature,
    audience: portfolio.value.people,
    method: modelType.value === 'equal' ? '等权重' : '用户自定义',
    fundCode: fundList.value.length > 0 ? fundList.value[0].code : ''
  }
  console.log('请求体', payload)
  try {
    const res = await fetch('http://localhost:8080/api/asset-allocation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res.status === 201) {
      alert('插入成功')
    } else {
      const text = await res.text()
      alert('插入失败: ' + text)
    }
  } catch (e) {
    alert('请求失败: ' + e)
  }
}
</script>

<style scoped>
.create-portfolio-view {
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
  margin-bottom: 12px;
}
.form-row label {
  color: #197aff;
  font-size: 15px;
  font-weight: bold;
  margin-right: 8px;
  min-width: 80px;
}
.form-row input,
.form-row textarea {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 15px;
  margin-right: 8px;
}
.form-row textarea {
  min-height: 40px;
  resize: vertical;
}
.section-title {
  color: #197aff;
  font-size: 17px;
  font-weight: bold;
  margin: 18px 0 8px 0;
}
.model-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}
.model-title {
  color: #197aff;
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
}
.model-btn {
  background: #fff;
  color: #197aff;
  border: 1.5px solid #197aff;
  border-radius: 4px;
  padding: 6px 18px;
  font-size: 15px;
  cursor: pointer;
  margin-right: 4px;
  transition: background 0.2s, color 0.2s;
}
.model-btn.active {
  background: #197aff;
  color: #fff;
}
.portfolio-content {
  display: flex;
  align-items: flex-start;
  gap: 32px;
  margin-top: 12px;
}
.portfolio-table {
  width: 60%;
  border-collapse: collapse;
  background: #fff;
  margin-bottom: 12px;
}
.portfolio-table th,
.portfolio-table td {
  border: 1px solid #bbb;
  padding: 8px 16px;
  text-align: center;
  font-size: 15px;
  color: #222;
}
.portfolio-table th {
  background: #e5e5e5;
  font-weight: bold;
}
.portfolio-table .highlight {
  background: #eaf2ff;
  color: #197aff;
  font-weight: bold;
}
.pie-chart {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.pie-label {
  color: #197aff;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}
.pie-echart {
  width: 220px;
  height: 220px;
}
.finish-btn {
  background: #197aff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 32px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.finish-btn:hover {
  background: #145fcc;
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