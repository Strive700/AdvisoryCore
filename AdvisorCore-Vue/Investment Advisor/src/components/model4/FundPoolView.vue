<template>
  <div class="fund-pool-view">
    <h2>可选基金池</h2>
    <table>
      <thead>
        <tr>
          <th>基金代码</th>
          <th>基金简称</th>
          <th>基金经理</th>
          <th>基金类型</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="fund in funds" :key="fund.fundCode">
          <td>{{ fund.fundCode }}</td>
          <td>{{ fund.fundName }}</td>
          <td>{{ fund.managerName }}</td>
          <td>{{ fund.fundType }}</td>
          <td><button @click="addFund(fund)">增加</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

interface FundDTO {
  fundCode: string
  fundName: string
  managerName: string | null
  fundType: string
}

const funds = ref<FundDTO[]>([])
const router = useRouter()
const route = useRoute()

onMounted(async () => {
  const requestBody = {}
  const res = await axios.post('http://localhost:8080/api/funds/queryWithJoin', requestBody)
  funds.value = res.data.data?.records || []
})

function addFund(fund: FundDTO) {
  // 获取已选基金
  let selected = []
  try {
    selected = JSON.parse(route.query.selectedFunds as string) || []
  } catch {
    selected = []
  }
  // 判断是否已存在
  if (!selected.some((f: any) => f.fundCode === fund.fundCode)) {
    selected.push({ fundCode: fund.fundCode, fundName: fund.fundName })
  }
  router.push({
    path: '/model4/PortfolioBuildView',
    query: { ...route.query, selectedFunds: JSON.stringify(selected) }
  })
}
</script>

<style scoped>
.fund-pool-view {
  padding: 24px;
  color: #222;
}
h2 {
  color: #222;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 6px 10px;
  text-align: center;
  color: #222;
  background: #fff;
}
th {
  font-weight: bold;
}
</style>
