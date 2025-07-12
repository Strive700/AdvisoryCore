<!-- 3.3 -->
<template>
  <div class="asset-research-view">
    <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step active">1 指数创建</span>
      <span class="step-divider">—</span>
      <span class="step active">2 大类研究</span>
      <span class="step-divider">—</span>
      <span class="step">资产配置</span>
      <span class="step-divider">—</span>
      <span class="step">基金组合</span>
    </div>
    <div class="desc">说明：资本市场展望根据各种模型计算或手动输入所选大类资产指数的预期年化收益、预期年化标准差</div>
    <div class="model-bar">
      <span class="model-title">宏观市场估计模型</span>
      <button v-for="item in modelOptions" :key="item" :class="['model-btn', { active: model === item } ]" @click="model = item">{{ item }}</button>
      <span class="model-desc">模型介绍说明：用历史的收益率来计算期望收益和标准差</span>
    </div>
    <div class="asset-info-title">大类资产信息</div>
    <table class="asset-table">
      <thead>
        <tr>
          <th>选择</th>
          <th>大类资产名称</th>
          <th>预期收益（%）</th>
          <th>预期标准差（%）</th>
          <th>开始日期</th>
          <th>结束日期</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.id" :class="{ 'highlight': true }">
          <td><input type="checkbox" v-model="item.selected" /></td>
          <td>{{ item.name }}</td>
          <td>
            <template v-if="model === '自定义'">
              <input v-model.number="item.return" type="number" class="editable-input" step="0.01" />
            </template>
            <template v-else>
              {{ item.return }}
            </template>
          </td>
          <td>
            <template v-if="model === '自定义'">
              <input v-model.number="item.std" type="number" class="editable-input" step="0.01" />
            </template>
            <template v-else>
              {{ item.std }}
            </template>
          </td>
          <td><input type="date" v-model="item.start" class="date-input" /></td>
          <td><input type="date" v-model="item.end" class="date-input" /></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="text-align: right; margin-top: 32px;">
    <button class="next-btn" @click="goNext">下一步</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const modelOptions = ['历史数据模型', '自定义']
const model = ref('历史数据模型')
const tableData = ref<any[]>([])
const router = useRouter()

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8080/api/index/definitions')
    if (res.status === 200 && Array.isArray(res.data)) {
      // 只取部分字段用于表格展示
      tableData.value = res.data.map((item, idx) => ({
        id: item.definitionid || idx + 1,
        name: item.name,
        return: item.expectedReturn,
        std: item.expectedStdDev,
        start: '', // 没有对应字段，留空或后续补充
        end: '',
        selected: false
      }))
    } else {
      tableData.value = []
    }
  } catch (e) {
    tableData.value = []
    console.error('获取大类指数定义信息失败', e)
  }
})

function goNext() {
  // 只传递选中的资产到下一个页面
  const selectedAssets = tableData.value.filter(item => item.selected)
  if (selectedAssets.length === 0) {
    alert('请至少选择一个大类资产！')
    return;
  }
  router.push({
    path: '/model3/AssetAllocation2View',
    query: {
      selectedAssets: encodeURIComponent(JSON.stringify(selectedAssets))
    }
  })
}
</script>

<style scoped>
.asset-research-view {
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
.model-desc {
  color: #888;
  font-size: 14px;
  margin-left: 18px;
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
.date-input {
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 15px;
  text-align: center;
}
.editable-input {
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 15px;
  text-align: center;
  width: 90px;
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
