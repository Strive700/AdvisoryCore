<!-- 4.1 -->
<template>
  <div class="index-timing-view">
    <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step active">1 指数择时</span>
      <span class="step-divider">—</span>
      <span class="step">基金筛选</span>
      <span class="step-divider">—</span>
      <span class="step">基金组合</span>
    </div>
    <div class="desc">说明：挑选指数，并设置择时</div>
    <div class="select-bar">
      <span class="select-title">挑选指数</span>
      <input v-model="selectedIndex" placeholder="请输入指数名称" class="index-input" />
      <select v-model="selectedIndexDropdown" class="index-dropdown">
        <option value="">下拉框中的指数同大类资产选择指数</option>
        <option v-for="item in indexOptions" :key="item" :value="item">{{ item }}</option>
      </select>
    </div>
    <div class="section-title">设置择时条件</div>
    <div class="condition-bar">
      <div class="condition-row">
        <label>选择参考指标</label>
        <select v-model="refIndex">
          <option value="沪深300">沪深300</option>
          <option value="中证500">中证500</option>
        </select>
        <span class="tip">说明：参考指数指的是具有代表性，可以衡量股市大盘走势的指数</span>
      </div>
      <div class="condition-row">
        <label>选择参考均线</label>
        <select v-model="refAvg">
          <option value="250日均线">250日均线</option>
          <option value="120日均线">120日均线</option>
        </select>
        <span class="tip">说明：参考均线指对应指数过去一段时间收盘价的平均值曲线</span>
      </div>
    </div>
    <div class="section-title">设置申购条件</div>
    <table class="condition-table">
      <thead>
        <tr>
          <th>参数名称</th>
          <th>操作</th>
          <th>阈值</th>
          <th>条件关系</th>
          <th>约束组ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in buyConditions" :key="idx">
          <td>
            <select v-model="item.param">
              <option value="条件1">条件1</option>
            </select>
          </td>
          <td>
            <select v-model="item.op">
              <option value=">=">&gt;=</option>
              <option value="<=">&lt;=</option>
            </select>
          </td>
          <td><input v-model="item.value" class="value-input" /></td>
          <td>
            <select v-model="item.relation">
              <option value="||">||</option>
              <option value="&&">&&</option>
            </select>
          </td>
          <td><input v-model="item.groupId" class="value-input" /></td>
        </tr>
      </tbody>
    </table>
    <button class="add-btn" @click="addBuyCondition">+ 添加条件</button>
    <div class="section-title">设置赎回条件</div>
    <table class="condition-table">
      <thead>
        <tr>
          <th>参数名称</th>
          <th>操作</th>
          <th>阈值</th>
          <th>条件关系</th>
          <th>约束组ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in sellConditions" :key="idx">
          <td>
            <select v-model="item.param">
              <option value="近一月收益">近一月收益</option>
            </select>
          </td>
          <td>
            <select v-model="item.op">
              <option value=">=">&gt;=</option>
              <option value="<=">&lt;=</option>
            </select>
          </td>
          <td><input v-model="item.value" class="value-input" /></td>
          <td>
            <select v-model="item.relation">
              <option value="||">||</option>
              <option value="&&">&&</option>
            </select>
          </td>
          <td><input v-model="item.groupId" class="value-input" /></td>
        </tr>
      </tbody>
    </table>
    <button class="add-btn" @click="addSellCondition">+ 添加条件</button>
    <div class="footer-bar">
      <button class="create-btn" @click="createConstraints">创建约束</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const selectedIndex = ref('')
const selectedIndexDropdown = ref('')
const indexOptions = ['沪深300', '中证500', '上证50']
const refIndex = ref('沪深300')
const refAvg = ref('250日均线')
const buyConditions = ref([
  { param: '条件1', op: '>=', value: 8, relation: '||', groupId: '' },
  { param: '条件1', op: '>=', value: 3, relation: '||', groupId: '' }
])
const sellConditions = ref([
  { param: '近一月收益', op: '>=', value: 8, relation: '||', groupId: '' },
  { param: '近一月收益', op: '>=', value: 3, relation: '||', groupId: '' }
])

function addBuyCondition() {
  buyConditions.value.push({ param: '条件1', op: '>=', value: '', relation: '||', groupId: '' })
}
function addSellCondition() {
  sellConditions.value.push({ param: '近一月收益', op: '>=', value: '', relation: '||', groupId: '' })
}

async function createConstraints() {
  try {
    // 直接用前端输入的groupId
    // 2. 新增具体约束项（申购）
    for (const item of buyConditions.value) {
      const itemPayload = {
        groupId: Number(item.groupId),
        type: '申购',
        paramName: item.param,
        operator: item.op,
        threshold: Number(item.value),
        conditionRelation: item.relation === '&&' ? 'AND' : 'OR'
      }
      await axios.post('http://localhost:8080/api/constraint-item', itemPayload)
    }
    // 3. 新增具体约束项（赎回）
    for (const item of sellConditions.value) {
      const itemPayload = {
        groupId: Number(item.groupId),
        type: '赎回',
        paramName: item.param,
        operator: item.op,
        threshold: Number(item.value),
        conditionRelation: item.relation === '&&' ? 'AND' : 'OR'
      }
      await axios.post('http://localhost:8080/api/constraint-item', itemPayload)
    }
    alert('约束创建成功！')
    router.push('/model3/TimingFundFilterView')
  } catch (e) {
    alert('请求失败，请稍后重试')
  }
}
</script>

<style scoped>
.index-timing-view {
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
.select-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.select-title {
  color: #197aff;
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
  cursor: pointer;
  text-decoration: underline;
}
.index-input {
  width: 220px;
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 15px;
}
.index-dropdown {
  width: 260px;
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 15px;
}
.section-title {
  color: #197aff;
  font-size: 16px;
  font-weight: bold;
  margin: 18px 0 8px 0;
  text-decoration: underline;
  cursor: pointer;
}
.condition-bar {
  margin-bottom: 12px;
}
.condition-row {
  color: #000;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}
.tip {
  color: #888;
  font-size: 14px;
  margin-left: 8px;
}
.condition-table {
  width: 48%;
  min-width: 420px;
  border-collapse: collapse;
  background: #fff;
  margin-bottom: 8px;
  display: inline-table;
}
.condition-table th,
.condition-table td {
  border: 1px solid #bbb;
  padding: 8px 12px;
  text-align: center;
  font-size: 15px;
  color: #222;
}
.condition-table th {
  background: #e5e5e5;
  font-weight: bold;
}
.value-input {
  width: 60px;
  border: 1px solid #bbb;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 15px;
  text-align: center;
}
.add-btn {
  background: #197aff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 38px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin: 12px 0 24px 0;
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
