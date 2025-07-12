<!-- 2.3 -->
<template>
  <div class="fof-asset-weight-view">
    <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step active">1 基金筛选</span>
      <span class="step-divider">—</span>
      <span class="step active">2 基金量化</span>
      <span class="step-divider">—</span>
      <span class="step active">3 资产配置</span>
      <span class="step-divider">—</span>
      <span class="step">基金组合</span>
    </div>
    <div class="desc">说明：大类资产配置优化各个大类资产的权重，制定资产配置目标，各大类资产权重之和为100%</div>
    <div class="model-bar">
      <span class="model-title">资产配置模型</span>
      <button v-for="item in modelOptions" :key="item" :class="['model-btn', { active: model === item } ]" @click="model = item">{{ item }}</button>
    </div>
    <div class="asset-info-title">资产配置信息</div>
    <table class="asset-table">
      <thead>
        <tr>
          <th>编号</th>
          <th>基金名称</th>
          <th>资产权重（%）</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.id" :class="{ 'highlight': true }">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td><input type="number" v-model.number="item.weight" min="0" max="100" class="weight-input" /></td>
        </tr>
      </tbody>
    </table>
    <div style="text-align: right; margin-top: 24px;">
      <button class="next-btn" @click="goNext">下一步</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const modelOptions = ['用户自定义', '等权重']
const model = ref('用户自定义')
const tableData = ref<any[]>([])
const router = useRouter()

onMounted(() => {
  let selectedFunds: any[] | null = null
  if (history.state && history.state.selectedFunds) {
    selectedFunds = history.state.selectedFunds
  } else {
    // 尝试从 sessionStorage 恢复
    const cache = sessionStorage.getItem('selectedFunds')
    if (cache) {
      selectedFunds = JSON.parse(cache)
    }
  }
  if (selectedFunds) {
    tableData.value = selectedFunds.map((item: any, idx: number) => ({
      ...item,
      id: idx + 1,
      name: item.name || item.fundName || '',
      weight: item.weight || 0
    }))
    console.log('【FOFAssetWeight页面接收到的基金数据】', tableData.value)
  } else {
    console.warn('未获取到选中基金数据')
  }
})

function goNext() {
  const allocationId = 1 // TODO: 如需动态获取可改为页面输入或参数传递
  // 1. 提交配比信息到后端
  tableData.value.forEach(async (item: any) => {
    const payload = {
      allocationId,
      fundCode: item.fundCode || item.code,
      weight: item.weight > 1 ? item.weight / 100 : item.weight
    }
    console.log('【提交大类资产配比】请求体:', payload)
    try {
      const res = await fetch('http://localhost:8080/api/asset-allocation-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const text = await res.text()
      console.log('【提交大类资产配比】响应:', res.status, text)
    } catch (e) {
      console.error('【提交大类资产配比】异常:', e)
    }
  })
  // 2. 将所有基金完整信息（含资产权重）传递给CreateFOFPortfolio.vue
  sessionStorage.setItem('fofPortfolioFunds', JSON.stringify(tableData.value))
  console.log('【FOFAssetWeight页面传递给CreateFOFPortfolio的基金数据】', tableData.value)
  // 跳转到下一个页面
  router.push('/model3/CreateFOFPortfolioView')
}

// 监听model变化，等权重时平分100
watch(model, (val) => {
  if (val === '等权重') {
    const n = tableData.value.length
    if (n === 0) return
    const avg = Math.floor((100 * 100) / n) / 100 // 保留两位小数
    let remain = 100 - avg * (n - 1)
    tableData.value.forEach((item: any, idx: number) => {
      item.weight = idx === n - 1 ? remain : avg
    })
  }
})
</script>

<style scoped>
.fof-asset-weight-view {
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
.model-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
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
.next-btn {
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
.next-btn:hover {
  background: #145fcc;
}
</style> 