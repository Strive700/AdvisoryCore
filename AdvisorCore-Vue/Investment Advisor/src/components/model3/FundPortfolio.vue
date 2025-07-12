<!-- 3.6 -->
<template>
  <div class="fund-portfolio-view">
    <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step active">1 指数创建</span>
      <span class="step-divider">—</span>
      <span class="step active">2 大类研究</span>
      <span class="step-divider">—</span>
      <span class="step active">3 资产配置</span>
      <span class="step-divider">—</span>
      <span class="step active">4 基金组合</span>
    </div>
    <div class="desc">说明：大类资产配置优化各个大类资产的权重，制定资产配置目标，各大类资产权重之和为100%</div>
    <div class="form-bar">
      <div class="form-row">
        <label>组合名称</label>
        <input v-model="form.name" placeholder="请输入组合名称（4~20字以内）" maxlength="20" />
        <label>比较基准</label>
        <select v-model="form.benchmark">
          <option value="沪深300">沪深300</option>
          <option value="中证500">中证500</option>
          <option value="上证50">上证50</option>
        </select>
      </div>
      <div class="form-row">
        <label>组合特色</label>
        <input v-model="form.feature" placeholder="请编辑组合特色说明" />
        <label>适用人群</label>
        <input v-model="form.people" placeholder="请输入适用人群" />
      </div>
    </div>
    <div class="main-content">
      <div class="left-content">
        <div class="asset-info-title">大类资产配置信息</div>
        <div class="sub-title">高风险大类资产配置</div>
        <div class="model-bar">
          <span class="model-title">选择基金权重配置模型：</span>
          <button v-for="item in modelOptions" :key="item" :class="['model-btn', { active: model === item } ]" @click="model = item">{{ item }}</button>
        </div>
        <table class="fund-table">
          <thead>
            <tr>
              <th>基金代码</th>
              <th>基金名称</th>
              <th>基金类型</th>
              <th>资金规模(亿元)</th>
              <th>成立日期</th>
              <th>权重(%)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in tableData" :key="item.fundCode">
              <td>{{ item.fundCode }}</td>
              <td>{{ item.fundName }}</td>
              <td>{{ item.fundType }}</td>
              <td>{{ item.fundSize }}</td>
              <td>{{ item.inceptionDate }}</td>
              <td>
                <input v-model.number="item.weight" type="number" min="0" max="100" class="weight-input" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="right-content">
        <div ref="pieChart" class="pie-chart"></div>
      </div>
    </div>
    <div class="footer-bar">
      <button class="create-btn" @click="createPortfolio">创建</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const form = ref({
  name: '',
  benchmark: '沪深300',
  feature: '',
  people: ''
})
const modelOptions = ['用户自定义', '等权重']
const model = ref('用户自定义')
const tableData = ref<any[]>([])
const pieChart = ref(null)

const pieData = [
  { value: 52.46, name: '股票' },
  { value: 47.54, name: '高风险理财' },
  { value: 0, name: '定存' }
]

function renderPie() {
  if (!pieChart.value) return
  const chart = echarts.init(pieChart.value)
  chart.setOption({
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', left: 'right' },
    series: [
      {
        name: '资产分布',
        type: 'pie',
        radius: '70%',
        center: ['50%', '50%'],
        data: pieData,
        label: {
          formatter: '{b} {d}%',
          fontSize: 14
        },
        labelLine: { length: 18, length2: 10 }
      }
    ]
  })
}

onMounted(async () => {
  if (route.query.selectedIndexInfo) {
    try {
      const selectedIndexInfo = JSON.parse(decodeURIComponent(route.query.selectedIndexInfo as string))
      // 遍历每个指数，查询基金详细信息
      const allFunds: any[] = []
      for (const idx of selectedIndexInfo) {
        if (idx.name) {
          try {
            console.log('【查询的基金名称】', idx.name)
            const res = await axios.get('http://localhost:8080/fundIndexMapping/fundIdsByIndexName', {
              params: { indexName: idx.name }
            })
            console.log('【查询到的基金详细信息】', res.data)
            if (Array.isArray(res.data)) {
              allFunds.push(...res.data)
            }
          } catch (e) {
            // 可选：处理单个指数查询失败
          }
        }
      }
      tableData.value = allFunds
    } catch (e) {
      tableData.value = []
    }
  } else {
    tableData.value = []
  }
  renderPie()
})

watch(model, () => {
  renderPie()
})

async function createPortfolio() {
  // 1. 请求添加策略组合接口
  try {
    // 这里需要你根据实际业务填写组合信息
    const portfolioPayload = {
      name: '均衡配置组合',
      benchmark: '沪深300',
      feature: '分散风险，稳健收益',
      audience: '稳健型投资者',
      method: '等权',
      weightType: '固定',
      fundCode: tableData.value.length > 0 ? tableData.value[0].fundCode : '',
      riskLevel: '中等'
    }
    const res1 = await axios.post('http://localhost:8080/api/asset-allocation', portfolioPayload)
    if (res1.status === 201) {
      // 2. 请求添加大类资产配比列表接口（对每个基金都插入一条）
      let allSuccess = true
      for (const item of tableData.value) {
        const allocationPayload = {
          allocationId: 1, // 这里allocationId需要后端返回或你根据实际业务获取
          fundCode: item.fundCode,
          weight: item.weight ? item.weight / 100 : 0 // 转为0~1小数
        }
        try {
          const res2 = await axios.post('http://localhost:8080/api/asset-allocation-list', allocationPayload)
          if (res2.status !== 201) {
            allSuccess = false
          }
        } catch (e) {
          allSuccess = false
        }
      }
      if (allSuccess) {
        alert('创建成功！')
        router.push('/') // 跳转到首页或结果页
      } else {
        alert('部分配比插入失败')
      }
    } else {
      alert('策略组合创建失败')
    }
  } catch (e) {
    alert('请求失败，请稍后重试')
  }
}
</script>

<style scoped>
.fund-portfolio-view {
  max-width: 1400px;
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
.form-bar {
  margin-bottom: 12px;
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
.form-row select {
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 15px;
  min-width: 220px;
}
.main-content {
  display: flex;
  gap: 32px;
}
.left-content {
  flex: 1 1 0%;
}
.right-content {
  width: 320px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}
.pie-chart {
  width: 280px;
  height: 240px;
  margin-top: 32px;
}
.asset-info-title {
  color: #197aff;
  font-size: 16px;
  font-weight: bold;
  margin: 18px 0 8px 0;
  text-decoration: underline;
  cursor: pointer;
}
.sub-title {
  color: #222;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 8px;
}
.model-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.model-title {
  color: #197aff;
  font-size: 15px;
  font-weight: bold;
  margin-right: 8px;
}
.model-btn {
  background: #fff;
  color: #197aff;
  border: 1px solid #197aff;
  border-radius: 4px;
  padding: 6px 18px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.model-btn.active {
  background: #197aff;
  color: #fff;
}
.fund-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  margin-bottom: 12px;
}
.fund-table th,
.fund-table td {
  border: 1px solid #bbb;
  padding: 8px 12px;
  text-align: center;
  font-size: 15px;
  color: #222;
}
.fund-table th {
  background: #e5e5e5;
  font-weight: bold;
}
.weight-input {
  width: 80px;
  border: 1px solid #b3d1ff;
  border-radius: 4px;
  padding: 4px 8px;
  text-align: center;
  font-size: 15px;
  color: #197aff;
}
.weight-input:focus {
  outline: none;
  border-color: #197aff;
  background: #d6eaff;
}
.footer-bar {
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
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
  transition: background 0.2s;
}
.create-btn:hover {
  background: #145fcc;
}
</style>