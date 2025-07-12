<!-- 2.2 -->
<template>
  <div class="portfolio-build-view">
    <div class="title">第二步：建仓</div>
    <div class="row">
      <span class="label">组合名称</span>
      <span class="value">{{ portfolioName }}</span>
      <a class="add-link" href="#">新增基金</a>
    </div>
    <table class="hold-table">
      <thead>
        <tr>
          <th>基金代码</th>
          <th>基金名称</th>
          <th>目标持仓比例</th>
          <th>操作项</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="fund in addedFunds" :key="fund.fundCode">
          <td>{{ fund.fundCode }}</td>
          <td>{{ fund.fundName }}</td>
          <td style="display: flex; align-items: center; justify-content: center;">
            <input v-model="fund.ratio" placeholder="" class="input-ratio" />%
          </td>
          <td><a class="op-link" @click="removeFund(fund.fundCode)">删除基金</a></td>
        </tr>
        <tr>
          <td colspan="4" style="padding:0;">
            <div class="fund-pool-row">
              <span>00010001</span>
              <a class="pool-link" @click.prevent="goToFundPool">查看可选基金池</a>
            </div>
          </td>
        </tr>
        <tr>
          <td>--</td>
          <td>现金</td>
          <td>{{ cashRatio }}%</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <div class="btn-bar">
      <button class="submit-btn" @click="submitOrder">提交</button>
      <button class="reset-btn">重置</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { ref, watch, computed } from 'vue'
import axios from 'axios'
const route = useRoute()
const router = useRouter()
const portfolioName = route.query.name || '未命名组合'

interface FundRow {
  fundCode: string
  fundName: string
  ratio: string
}

const addedFunds = ref<FundRow[]>([])

function syncFundsFromQuery() {
  let selected: FundRow[] = []
  try {
    selected = JSON.parse(route.query.selectedFunds as string) || []
  } catch {
    selected = []
  }
  // 合并去重
  selected.forEach(f => {
    if (!addedFunds.value.some(item => item.fundCode === f.fundCode)) {
      addedFunds.value.push({ ...f, ratio: '' })
    }
  })
}

watch(() => route.query.selectedFunds, syncFundsFromQuery, { immediate: true })

function removeFund(fundCode: string) {
  addedFunds.value = addedFunds.value.filter(f => f.fundCode !== fundCode)
}

// 计算现金比例
const cashRatio = computed(() => {
  const sum = addedFunds.value.reduce((acc, cur) => {
    const num = parseFloat(cur.ratio)
    return acc + (isNaN(num) ? 0 : num)
  }, 0)
  const left = 100 - sum
  return left < 0 ? 0 : left
})

// 提交数据
async function submitOrder() {
  // 组装数据
  const payload = {
    funds: addedFunds.value.map(f => ({
      fundCode: f.fundCode,
      fundName: f.fundName,
      ratio: f.ratio
    })),
    cashRatio: cashRatio.value
  }
  try {
    const res = await axios.post('http://localhost:8080/api/settlement-orders/save', payload)
    if (res.status === 200 || res.status === 201) {
      alert('提交成功！')
    } else {
      alert('提交失败: ' + (res.data?.message || '未知错误'))
    }
  } catch (e) {
    alert('请求失败，请稍后重试')
  }
}

function goToFundPool() {
  router.push('/model4/FundPoolView')
}
// TODO: 交互逻辑、接口预留
</script>

<style scoped>
.portfolio-build-view {
  max-width: 700px;
  margin: 32px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  padding: 32px 36px 24px 36px;
}
.title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 28px;
  color: #222;
}
.row {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 18px;
}
.label {
  min-width: 90px;
  color: #222;
  font-size: 16px;
  font-weight: 500;
}
.value {
  font-size: 16px;
  color: #333;
  margin-right: 24px;
}
.add-link {
  color: #197aff;
  font-size: 15px;
  margin-left: auto;
  text-decoration: underline;
  cursor: pointer;
}
.hold-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  margin-bottom: 18px;
}
.hold-table th, .hold-table td {
  border: 1px solid #bbb;
  padding: 8px 12px;
  text-align: center;
  font-size: 15px;
  color: #222;
}
.hold-table th {
  background: #e5e5e5;
  font-weight: bold;
}
.fund-pool-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 8px 0;
}
.pool-link {
  color: #197aff;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
}
.op-link {
  color: #197aff;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
}
.btn-bar {
  display: flex;
  gap: 18px;
  justify-content: flex-start;
  margin-top: 18px;
}
.submit-btn {
  background: #197aff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 48px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}
.reset-btn {
  background: #fff;
  color: #197aff;
  border: 1px solid #197aff;
  border-radius: 6px;
  padding: 10px 32px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 12px;
}
.input-ratio {
  width: 70px;
  text-align: right;
  margin-right: 4px;
  border: none;
  border-radius: 6px;
  background: #f5f7fa;
  padding: 6px 8px;
  outline: none;
  transition: box-shadow 0.2s;
}
.input-ratio:focus {
  box-shadow: 0 0 0 2px #197aff33;
  background: #fff;
}
</style>
