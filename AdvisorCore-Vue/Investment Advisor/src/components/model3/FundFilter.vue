<!-- 1.5 -->
<!-- 第四步：基金筛选 -->
 <!-- 跳转页面时新增selected: false来看是否加选 -->

<template>
  <div class="fund-filter-view">
    <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step active">1 大类选择</span>
      <span class="step-divider">—</span>
      <span class="step active">2 大类研究</span>
      <span class="step-divider">—</span>
      <span class="step active">3 资产配置</span>
      <span class="step-divider">—</span>
      <span class="step active">4 基金筛选</span>
      <span class="step-divider">—</span>
      <span class="step">5 基金组合</span>
    </div>
    <div class="desc">说明：大类资产配置优化各个大类资产的权重，制定资产配置目标，各大类资产权重之和为100%</div>
    <div class="filter-bar">
      <span class="filter-title">基金筛选</span>
      <select v-model="filters.assetIndex">
        <option v-for="item in assetIndexOptions" :key="item" :value="item">{{ item }}</option>
      </select>
      <select v-model="filters.fundType">
        <option v-for="item in fundTypeOptions" :key="item" :value="item">{{ item }}</option>
      </select>
      <select v-model="filters.fundCategory">
        <option v-for="item in fundCategoryOptions" :key="item" :value="item">{{ item }}</option>
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
        <tr v-for="item in pagedData" :key="item.code">
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
    <div style="text-align: right; margin-top: 24px;">
      <button class="next-btn" @click="goNext">下一步</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const filters = ref({
  assetIndex: '商品期货指数',
  fundType: '指数基金',
  fundCategory: '指数基金',
  scale: '1~5亿',
  establishYear: '1~3年',
  rating: '五星'
})
const assetIndexOptions = ['商品期货指数', '农产品期货指数', '油脂油料期货指数']
const fundTypeOptions = ['指数基金', '债券型基金', '股票型基金']
const fundCategoryOptions = ['指数基金', '债券型基金', '股票型基金']
const scaleOptions = ['1~5亿', '5~10亿', '10亿以上']
const establishYearOptions = ['1~3年', '3~5年', '5年以上']
const ratingOptions = ['五星', '四星', '三星', '二星', '一星']

interface FundItem {
  code: string
  name: string
  type: string
  scale: string
  establishDate: string
  rating: string
  company: string
  fee: string
  selected: boolean
  fundCode?: string
  fundName?: string
  managerName?: string
  fundType?: string
  unitNav?: number
  navDate?: string
  return1m?: number
  returnYtd?: number
  maxDrawdown1y?: number
  operationCycle?: string
  fundSize?: number
  inceptionDate?: string
  qualityScore?: number
  fundDescription?: string
  managerId?: number
  companyId?: number
  category?: string
  feeRate?: number
  stockAsset?: number
  cashAsset?: number
  bondAsset?: number
  depositAsset?: number
  proportion?: number
  coreid?: number
  statDate?: string
  annualSharpe?: number
  riskLevel?: string
  riskAdjScore?: number
  assetScore?: number
  researchScore?: number
  riskMgmtScore?: number
  tenureScore?: number
}

const tableData = ref<FundItem[]>([])
const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return tableData.value.slice(start, end)
})

const router = useRouter()

function onSearch() {
  // TODO: 实现筛选逻辑，调用后端接口
}
function toggleFund(item: FundItem) {
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
function goNext() {
  // 只收集已选中的基金
  const selectedFundsData = tableData.value
    .filter(item => item.selected) // 只保留已选
    .map(item => ({
      code: item.code,
      name: item.name,
      type: item.type,
      scale: item.scale,
      establishDate: item.establishDate,
      rating: item.rating,
      company: item.company,
      fee: item.fee,
      selected: item.selected,
      // FundDTO 字段
      fundCode: item.fundCode,
      fundName: item.fundName,
      managerName: item.managerName,
      fundType: item.fundType,
      unitNav: item.unitNav,
      navDate: item.navDate,
      return1m: item.return1m,
      returnYtd: item.returnYtd,
      maxDrawdown1y: item.maxDrawdown1y,
      operationCycle: item.operationCycle,
      fundSize: item.fundSize,
      inceptionDate: item.inceptionDate,
      qualityScore: item.qualityScore,
      // FundWithCoreMetricDTO 字段
      fundDescription: item.fundDescription,
      managerId: item.managerId,
      companyId: item.companyId,
      category: item.category,
      feeRate: item.feeRate,
      stockAsset: item.stockAsset,
      cashAsset: item.cashAsset,
      bondAsset: item.bondAsset,
      depositAsset: item.depositAsset,
      proportion: item.proportion,
      coreid: item.coreid,
      statDate: item.statDate,
      annualSharpe: item.annualSharpe,
      riskLevel: item.riskLevel,
      riskAdjScore: item.riskAdjScore,
      assetScore: item.assetScore,
      researchScore: item.researchScore,
      riskMgmtScore: item.riskMgmtScore,
      tenureScore: item.tenureScore
    }));

  if (selectedFundsData.length === 0) {
    alert('请至少选择一个基金');
    return;
  }

  router.push({
    path: '/model3/CreatePortfolioView',
    state: {
      fundData: selectedFundsData
    }
  });
}

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8080/api/funds/queryWithJoin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: currentPage.value, pageSize: pageSize.value })
    })
    console.log('【请求参数】', { page: currentPage.value, pageSize: pageSize.value })
    console.log(res)
    const data = await res.json()
    console.log('【最大范围基金数据】', data)
    if (data && data.code === 200 && data.data && Array.isArray(data.data.records)) {
      tableData.value = data.data.records.map((item: any) => ({
        code: item.fundCode,
        name: item.fundName,
        type: item.fundType,
        scale: item.fundSize,
        establishDate: item.inceptionDate,
        rating: item.rating || '',
        company: item.managerName || '',
        fee: item.feeRate,
        selected: false,
        fundCode: item.fundCode,
        fundName: item.fundName,
        managerName: item.managerName,
        fundType: item.fundType,
        unitNav: item.unitNav,
        navDate: item.navDate,
        return1m: item.return1m,
        returnYtd: item.returnYtd,
        maxDrawdown1y: item.maxDrawdown1y,
        operationCycle: item.operationCycle,
        fundSize: item.fundSize,
        inceptionDate: item.inceptionDate,
        qualityScore: item.qualityScore,
        fundDescription: item.fundDescription,
        managerId: item.managerId,
        companyId: item.companyId,
        category: item.category,
        feeRate: item.feeRate,
        stockAsset: item.stockAsset,
        cashAsset: item.cashAsset,
        bondAsset: item.bondAsset,
        depositAsset: item.depositAsset,
        proportion: item.proportion,
        coreid: item.coreid,
        statDate: item.statDate,
        annualSharpe: item.annualSharpe,
        riskLevel: item.riskLevel,
        riskAdjScore: item.riskAdjScore,
        assetScore: item.assetScore,
        researchScore: item.researchScore,
        riskMgmtScore: item.riskMgmtScore,
        tenureScore: item.tenureScore
      }))
      total.value = data.data.total
      // 打印所有基金公司名称
      console.log('所有基金公司名称', tableData.value.map(item => item.company))
    }
  } catch (e) {
    console.error('获取基金数据失败', e)
  }
})
</script>

<style scoped>
.fund-filter-view {
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
  color:#000;
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
