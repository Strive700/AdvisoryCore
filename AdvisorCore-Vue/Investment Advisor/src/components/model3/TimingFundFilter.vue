<!-- 4.2 -->
<template>
  <div class="timing-fund-filter-view">
    <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step active">1 指数择时</span>
      <span class="step-divider">—</span>
      <span class="step active">2 基金筛选</span>
      <span class="step-divider">—</span>
      <span class="step">基金组合</span>
    </div>
    <div class="desc">说明：挑选基金</div>
    <div class="filter-bar">
      <span class="filter-title">设置筛选条件</span>
      <select v-model="filters.fundType">
        <option v-for="item in fundTypeOptions" :key="item" :value="item">{{ item }}</option>
      </select>
      <select v-model="filters.scale">
        <option v-for="item in scaleOptions" :key="item" :value="item">{{ item }}</option>
      </select>
      <select v-model="filters.establishYear">
        <option v-for="item in establishYearOptions" :key="item" :value="item">{{ item }}</option>
      </select>
      <select v-model="filters.rating">
        <option v-for="item in ratingOptions" :key="item" :value="item">{{ item }}</option>
      </select>
      <button class="search-btn" @click="onSearch">搜索</button>
    </div>
    <table class="fund-table">
      <thead>
        <tr>
          <th>基金代码</th>
          <th>基金名称</th>
          <th>基金类型</th>
          <th>资金规模</th>
          <th>成立时间</th>
          <th>基金评级</th>
          <th>基金公司</th>
          <th>手续费（%）</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.code">
          <td>{{ item.code }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.scale }}</td>
          <td>{{ item.establishDate }}</td>
          <td>{{ item.rating }}</td>
          <td>{{ item.company }}</td>
          <td>{{ item.fee }}</td>
          <td>
            <button v-if="item.selected" class="selected-btn" @click="toggleFund(item)">已选</button>
            <button v-else class="add-btn" @click="toggleFund(item)">加选</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-bar">
      <span>共 {{ total }} 条</span>
      <select v-model="pageSize" @change="onPageSizeChange">
        <option v-for="size in [10, 20, 50]" :key="size" :value="size">{{ size }}条/页</option>
      </select>
      <button :disabled="currentPage === 1" @click="prevPage">前往</button>
      <input type="number" v-model.number="currentPage" min="1" :max="totalPages" style="width: 40px; text-align: center;" />
      <span>/ {{ totalPages }} 页</span>
      <button :disabled="currentPage === totalPages" @click="nextPage">下一页</button>
    </div>
    <div style="text-align: right; margin-top: 32px;">
      <button class="next-btn" @click="goNext">下一步</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const filters = ref({
  fundType: '指数基金',
  scale: '1~5亿',
  establishYear: '1~3年',
  rating: '五星'
})
const fundTypeOptions = ['指数基金', '债券型基金', '股票型基金']
const scaleOptions = ['1~5亿', '5~10亿', '10亿以上']
const establishYearOptions = ['1~3年', '3~5年', '5年以上']
const ratingOptions = ['五星', '四星', '三星', '二星', '一星']
const tableData = ref<any[]>([
  { code: '000001', name: '基金01', type: '指数型基金', scale: 9.20, establishDate: '1993-10-20', rating: 1, company: '华夏', fee: 0.15, selected: true },
  { code: '000002', name: '基金02', type: '指数型基金', scale: 10.53, establishDate: '2001-04-10', rating: 2, company: '易达', fee: 0.12, selected: false },
  { code: '000003', name: '基金03', type: '指数型基金', scale: 14.39, establishDate: '2008-03-20', rating: 5, company: '广发', fee: 0.10, selected: true },
  { code: '000004', name: '基金01', type: '债券型基金', scale: 9.20, establishDate: '1993-10-20', rating: 1, company: '华夏', fee: 0.15, selected: false },
  { code: '000005', name: '基金02', type: '股票型基金', scale: 10.53, establishDate: '2001-04-10', rating: 2, company: '易达', fee: 0.12, selected: true },
  { code: '000006', name: '基金03', type: '指数型基金', scale: 14.39, establishDate: '2008-03-20', rating: 5, company: '广发', fee: 0.10, selected: false },
  { code: '000007', name: '基金03', type: '债券型基金', scale: 14.39, establishDate: '2008-03-20', rating: 5, company: '广发', fee: 0.10, selected: false },
  { code: '000008', name: '基金02', type: '股票型基金', scale: 10.53, establishDate: '2001-04-10', rating: 2, company: '易达', fee: 0.12, selected: false },
  { code: '000009', name: '基金03', type: '债券型基金', scale: 14.39, establishDate: '2008-03-20', rating: 5, company: '广发', fee: 0.10, selected: false },
  { code: '000010', name: '基金03', type: '股票型基金', scale: 14.39, establishDate: '2008-03-20', rating: 5, company: '广发', fee: 0.10, selected: false }
])
const total = ref(10)
const pageSize = ref(10)
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))
function onSearch() {
  // TODO: 实现筛选逻辑，调用后端接口
}
function toggleFund(item: any) {
  item.selected = !item.selected
}
function onPageSizeChange() {
  currentPage.value = 1
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const router = useRouter()
function goNext() {
  const selectedFunds = tableData.value.filter((item: any) => item.selected)
  if (selectedFunds.length === 0) {
    alert('请至少选择一个基金')
    return
  }
  router.push({
    path: '/model3/TimingFundPortfolioView',
    query: {
      selectedFunds: encodeURIComponent(JSON.stringify(selectedFunds))
    }
  })
}
</script>

<style scoped>
.timing-fund-filter-view {
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
.filter-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.filter-title {
  color: #197aff;
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
  cursor: pointer;
  text-decoration: underline;
}
.search-btn {
  background: #197aff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 18px;
  font-size: 15px;
  cursor: pointer;
  margin-left: 8px;
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
  padding: 8px 16px;
  text-align: center;
  font-size: 15px;
  color: #222;
}
.fund-table th {
  background: #e5e5e5;
  font-weight: bold;
}
.selected-btn {
  background: #bbb;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 16px;
  font-size: 15px;
  cursor: pointer;
}
.add-btn {
  background: #197aff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 16px;
  font-size: 15px;
  cursor: pointer;
}
.pagination-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  font-size: 15px;
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
