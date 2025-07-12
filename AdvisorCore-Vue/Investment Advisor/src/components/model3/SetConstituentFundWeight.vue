<!-- 3.2 -->
<template>
  <div class="set-constituent-fund-weight-view">
    <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step active">1 挑选成分基金</span>
      <span class="step-divider">—</span>
      <span class="step active">2 设置成分基金权重并创建</span>
    </div>
    <div class="input-bar">
      <label class="input-label">指数名称</label>
      <input v-model="indexName" class="input-index-name" placeholder="请输入指数名称（3 ~ 20字以内）" maxlength="20" />
    </div>
    <div class="input-bar">
      <label class="input-label">指数分类</label>
      <input v-model="indexCategory" class="input-index-category" placeholder="请输入指数分类" maxlength="20" />
    </div>
    <div class="input-bar">
      <label class="input-label">指数类型</label>
      <select v-model="indexType" class="input-index-type">
        <option value="基础">基础</option>
        <option value="行业">行业</option>
        <option value="策略">策略</option>
      </select>
    </div>
    <div class="input-bar">
      <label class="input-label">启用状态</label>
      <select v-model="enabled" class="input-enabled">
        <option value="true">启用</option>
        <option value="false">禁用</option>
      </select>
    </div>
    <div class="input-bar">
      <label class="input-label">描述</label>
      <textarea v-model="description" class="input-description" placeholder="请输入指数描述" maxlength="200"></textarea>
    </div>
    <div class="input-bar">
      <label class="input-label">预期收益</label>
      <input v-model="expectedReturn" class="input-expected-return" type="number" min="0" max="100" />
    </div>
    <div class="input-bar">
      <label class="input-label">预期标准差</label>
      <input v-model="expectedStdDev" class="input-expected-stddev" type="number" min="0" max="100" />
    </div>
    <div class="input-bar">
      <label class="input-label">资产权重</label>
      <input v-model="assetWeight" class="input-asset-weight" type="number" min="0" max="100" />
    </div>
    <div class="weight-title">
      <span class="weight-link">设置已选成份基金权重</span>
      <span class="weight-tip">注：成份基金权重之和为100%，默认等权重，可自定义修改</span>
    </div>
    <table class="weight-table">
      <thead>
        <tr>
          <th>编号</th>
          <th>基金名称</th>
          <th>权重（%）</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in tableData" :key="item.id" :class="{ 'highlight': true }">
          <td>{{ idx + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>
            <input v-model.number="item.weight" class="weight-input" type="number" min="0" max="100" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="footer-bar">
      <button class="finish-btn" @click="goNext">完成创建</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const indexName = ref('')
const indexCode = ref('')
const indexCategory = ref('')
const indexType = ref('基础')
const enabled = ref(true)
const description = ref('')
const expectedReturn = ref(null)
const expectedStdDev = ref(null)
const assetWeight = ref(null)
const tableData = ref<any[]>([])
const router = useRouter()
const route = useRoute()

onMounted(() => {
  if (route.query.selectedFunds) {
    try {
      tableData.value = JSON.parse(decodeURIComponent(route.query.selectedFunds as string))
    } catch (e) {
      tableData.value = []
    }
  } else {
    tableData.value = []
  }
})

function goNext() {
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
        router.push('/model3/AssetResearchView')
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
</script>

<style scoped>
.set-constituent-fund-weight-view {
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
.input-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.input-label {
  color: #197aff;
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
}
.input-index-name {
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 15px;
  min-width: 260px;
}
.input-index-code {
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 15px;
  min-width: 260px;
}
.input-index-category {
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 15px;
  min-width: 260px;
}
.input-index-type {
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 15px;
  min-width: 260px;
}
.input-enabled {
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 15px;
  min-width: 260px;
}
.input-description {
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 15px;
  min-width: 260px;
  height: 100px;
}
.input-expected-return {
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 15px;
  min-width: 260px;
}
.input-expected-stddev {
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 15px;
  min-width: 260px;
}
.input-asset-weight {
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 15px;
  min-width: 260px;
}
.add-btn {
  background: #197aff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 18px;
  font-size: 15px;
  cursor: pointer;
  margin-left: 8px;
}
.weight-title {
  display: flex;
  align-items: baseline;
  gap: 18px;
  margin-bottom: 8px;
}
.weight-link {
  color: #197aff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
}
.weight-tip {
  color: #888;
  font-size: 14px;
}
.weight-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  margin-bottom: 12px;
}
.weight-table th,
.weight-table td {
  border: 1px solid #bbb;
  padding: 8px 16px;
  text-align: center;
  font-size: 15px;
  color: #222;
}
.weight-table th {
  background: #e5e5e5;
  font-weight: bold;
}
.weight-table .highlight {
  background: #eaf2ff;
}
.weight-input {
  width: 60px;
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 15px;
  text-align: center;
}
.delete-btn {
  color: #ff3333;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
}
.footer-bar {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}
.finish-btn {
  background: #197aff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 14px 38px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s;
}
.finish-btn:hover {
  background: #145fcc;
}
</style>