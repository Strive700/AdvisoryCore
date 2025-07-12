<!-- 4.3 -->
<template>
  <div class="timing-fund-portfolio-view">
    <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step active">1 指数择时</span>
      <span class="step-divider">—</span>
      <span class="step active">2 基金筛选</span>
      <span class="step-divider">—</span>
      <span class="step active">3 基金组合</span>
    </div>
    <div class="desc">说明：可设置成份基金比例</div>
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
      <div class="form-row">
        <label>资产规模</label>
        <input v-model="form.scale" placeholder="请输入资产规模（亿）" />
        <span>亿</span>
        <label>申购费率</label>
        <input v-model="form.fee" placeholder="请输入申购费率" />
        <span>%</span>
      </div>
    </div>
    <div class="constraint-bar">
      <div class="constraint-row">
        <span>大类指数：</span><span>沪深300</span>
      </div>
      <div class="constraint-row">
        <span class="constraint-link">大类指数择时的约束条件</span>
      </div>
      <div class="constraint-row">
        <span>选择参考指标：沪深300</span>
        <span>选择参考均线：日均250日</span>
        <span>设置申购条件：低于xxxx15%</span>
        <span>设置赎回条件：高于xxx30%</span>
      </div>
    </div>
    <div class="model-bar">
      <span class="model-title">成份基金资产配比方式</span>
      <button v-for="item in modelOptions" :key="item" :class="['model-btn', { active: model === item } ]" @click="model = item">{{ item }}</button>
    </div>
    <div class="asset-info-title">组合基金基本信息</div>
    <table class="asset-table">
      <thead>
        <tr>
          <th>编号</th>
          <th>基金名称</th>
          <th>基金代码</th>
          <th>基金类型</th>
          <th>成立时间</th>
          <th>申购费率（%）</th>
          <th>资产配比（%）</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in tableData" :key="item.id || idx" :class="{ 'highlight': true }">
          <td>{{ item.id || idx + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.establishDate }}</td>
          <td>{{ item.fee }}</td>
          <td>
            <template v-if="model === '用户自定义'">
              <input v-model.number="item.weight" type="number" min="0" max="100" class="weight-input" />
            </template>
            <template v-else>
              {{ item.weight }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="text-align: right; margin-top: 32px;">
      <button class="confirm-btn" @click="onConfirm">确定</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const form = ref({
  name: '',
  benchmark: '沪深300',
  feature: '',
  people: '',
  scale: '',
  fee: ''
})
const modelOptions = ['用户自定义', '等权重']
const model = ref('用户自定义')
const tableData = ref<any[]>([])

onMounted(() => {
  if (route.query.selectedFunds) {
    try {
      tableData.value = JSON.parse(decodeURIComponent(route.query.selectedFunds as string))
    } catch (e) {
      tableData.value = []
    }
  }
})

function validateWeights() {
  let total = 0
  for (const item of tableData.value) {
    if (typeof item.weight !== 'number' || isNaN(item.weight) || item.weight < 0 || item.weight > 100) {
      alert('每个基金的权重必须是0~100之间的数字')
      return false
    }
    total += item.weight
  }
  if (Math.abs(total - 100) > 0.01) {
    alert('所有基金的权重之和必须等于100')
    return false
  }
  return true
}

async function onConfirm() {
  // 表单必填项校验
  if (!form.value.name || !form.value.benchmark || !form.value.feature || !form.value.people || !form.value.scale || !form.value.fee) {
    alert('请完整填写所有组合信息！')
    return
  }
  if (!validateWeights()) return
  try {
    const payload = {
      name: form.value.name,
      benchmark: form.value.benchmark,
      feature: form.value.feature,
      audience: form.value.people,
      scale: Number(form.value.scale),
      feeRate: Number(form.value.fee),
      allocationMethod: model.value,
      fundAllocation: JSON.stringify(tableData.value.map(item => ({ name: item.name, weight: item.weight / 100 })))
    }
    const res = await axios.post('http://localhost:8080/api/timing-portfolio', payload)
    if (res.status === 201) {
      alert('创建成功！')
    } else {
      alert('创建失败: ' + (res.data || '未知错误'))
    }
  } catch (e) {
    alert('请求失败，请稍后重试')
  }
}
</script>

<style scoped>
.timing-fund-portfolio-view {
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
.form-bar {
  margin-bottom: 12px;
}
.form-row {
color: #000;
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
.form-row span {
  margin: 0 8px;
  color: #222;
}
.constraint-bar {
  margin-bottom: 12px;
}
.constraint-row {
  color: #000;
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 4px;
}
.constraint-link {
  color: #197aff;
  font-size: 15px;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
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
.confirm-btn {
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
.confirm-btn:hover {
  background: #145fcc;
}
</style>
