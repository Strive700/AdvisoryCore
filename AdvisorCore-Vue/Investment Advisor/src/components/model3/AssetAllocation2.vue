<!-- 3.5 -->
<template>
  <div class="asset-allocation2-view">
    <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step active">1 指数创建</span>
      <span class="step-divider">—</span>
      <span class="step active">2 大类研究</span>
      <span class="step-divider">—</span>
      <span class="step active">3 资产配置</span>
      <span class="step-divider">—</span>
      <span class="step">基金组合</span>
    </div>
    <div class="desc">说明：大类资产配置优化各个大类资产的权重，制定资产配置目标，各大类资产权重之和为100%</div>
    <div class="model-bar">
      <span class="model-title">资产配置模型</span>
      <button v-for="item in modelOptions" :key="item" :class="['model-btn', { active: model === item } ]" @click="model = item">{{ item }}</button>
      <span class="model-desc">模型介绍说明：资产权重配置按照老师可根据自己的研究自定义填写</span>
    </div>
    <div class="asset-info-title">大类资产信息</div>
    <table class="asset-table">
      <thead>
        <tr>
          <th>大类资产名称</th>
          <th>预期收益（%）</th>
          <th>预期标准差（%）</th>
          <th>资产权重（%）</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.id" :class="{ 'highlight': true }">
          <td>{{ item.name }}</td>
          <td>{{ item.return }}</td>
          <td>{{ item.std }}</td>
          <td>
            <input v-model.number="item.weight" type="number" min="0" max="100" class="weight-input" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="footer-bar">
      <button class="create-btn" @click="createIndex">创建指数</button>
      <button class="next-btn" @click="goNext">下一步</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const modelOptions = ['用户自定义']
const model = ref('用户自定义')
const tableData = ref<any[]>([])
const router = useRouter()

// 这里可以根据实际需求添加更多输入项
const indexName = ref('')
const indexCode = ref('')
const indexCategory = ref('')
const indexType = ref('基础')
const enabled = ref(true)
const description = ref('')
const expectedReturn = ref(null)
const expectedStdDev = ref(null)
const assetWeight = ref(null)

import { useRoute } from 'vue-router'
const route = useRoute()

onMounted(() => {
  if (route.query.selectedAssets) {
    try {
      tableData.value = JSON.parse(decodeURIComponent(route.query.selectedAssets as string))
    } catch (e) {
      tableData.value = []
    }
  } else {
    tableData.value = []
  }
})

function createIndex() {
  // 组装请求体
  const payload = {
    name: indexName.value,
    code: indexCode.value,
    category: indexCategory.value,
    index_type: indexType.value,
    enabled: enabled.value,
    description: description.value,
    expectedReturn: expectedReturn.value,
    expectedStdDev: expectedStdDev.value,
    assetWeight: assetWeight.value,
    constituentFunds: JSON.stringify(tableData.value.map(item => ({ name: item.name, weight: item.weight })))
  }
  axios.post('http://localhost:8080/api/index/definition', payload)
    .then(res => {
      if (res.status === 201) {
        alert('创建成功')
        // 将本次创建的指数信息传递到下一个页面
        router.push({
          path: '/model3/FundPortfolioView',
          query: {
            indexInfo: encodeURIComponent(JSON.stringify(payload))
          }
        })
      } else {
        alert('创建失败: ' + (res.data || '未知错误'))
      }
    })
    .catch(err => {
      if (err.response && err.response.data && err.response.data.message) {
        alert('创建失败: ' + err.response.data.message)
      } else {
        alert('请求失败，请稍后重试')
      }
    })
}

function goNext() {
  router.push({
    path: '/model3/FundPortfolioView',
    query: {
      selectedIndexInfo: encodeURIComponent(JSON.stringify(tableData.value))
    }
  })
}
</script>

<style scoped>
.asset-allocation2-view {
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
.next-btn {
  background: #197aff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 36px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 16px;
  transition: background 0.2s;
}
.next-btn:hover {
  background: #145fcc;
}
</style>
