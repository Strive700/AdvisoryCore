<!-- 3.1 -->
<template>
  <div class="select-index-constituent-fund-view">
    <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step active">1 挑选成分基金</span>
      <span class="step-divider">—</span>
      <span class="step">2 设置成分基金权重并创建</span>
    </div>
    <div class="filter-bar">
      <span class="filter-title">选择指数的成份基金</span>
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
    <div class="footer-bar">
      <button class="continue-btn" @click="continueToSetWeight">继续 → 设置成份基金权重</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const filters = ref({
  fundType: '沪深300指数基金',
  scale: '1~5亿',
  establishYear: '1~3年',
  rating: '五星'
})
const fundTypeOptions = ['沪深300指数基金', '中证500指数基金', '上证50指数基金']
const scaleOptions = ['1~5亿', '5~10亿', '10亿以上']
const establishYearOptions = ['1~3年', '3~5年', '5年以上']
const ratingOptions = ['五星', '四星', '三星', '二星', '一星']

const tableData = ref<any[]>([])
const total = ref(10)
const pageSize = ref(10)
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

const router = useRouter()
const route = useRoute()
const indexObj = ref<any>(null)

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
function continueToSetWeight() {
  // 只收集已选中的基金
  const selectedFunds = tableData.value
    .filter(item => item.selected)
    .map((item, idx) => ({
      id: idx + 1,
      name: item.name,
      code: item.code,
      weight: 0 // 默认权重
    }));

  if (selectedFunds.length === 0) {
    alert('请至少选择一个成分基金');
    return;
  }

  router.push({
    name: 'SetConstituentFundWeightView',
    query: {
      selectedFunds: encodeURIComponent(JSON.stringify(selectedFunds))
    }
  });
}

onMounted(async () => {
  // 获取并解析传递过来的指数对象
  if (route.query.indexObj) {
    try {
      indexObj.value = JSON.parse(decodeURIComponent(route.query.indexObj as string))
      console.log('【接收到的指数对象】', indexObj.value)
      // TODO: 这里可以根据 indexObj.value.code 等信息请求后端接口获取成分基金数据
      // 示例：假设后端接口为 /api/index/constituent-funds?indexCode=xxx
      // 这里只做前端演示，实际应替换为axios请求
      // const res = await axios.get(`/api/index/constituent-funds?indexCode=${indexObj.value.code}`)
      // tableData.value = res.data
      // 临时模拟数据（用指数code生成几条数据）
      tableData.value = [
        { code: indexObj.value.code + '-01', name: indexObj.value.name + '成分基金1', type: '指数型基金', scale: 10.2, establishDate: '2010-01-01', rating: 5, company: '华夏', fee: 0.12, selected: false },
        { code: indexObj.value.code + '-02', name: indexObj.value.name + '成分基金2', type: '指数型基金', scale: 8.5, establishDate: '2012-05-10', rating: 4, company: '易方达', fee: 0.10, selected: false },
        { code: indexObj.value.code + '-03', name: indexObj.value.name + '成分基金3', type: '指数型基金', scale: 12.3, establishDate: '2015-09-20', rating: 3, company: '广发', fee: 0.11, selected: false }
      ]
    } catch (e) {
      console.error('指数对象解析失败', e)
    }
  } else {
    // 没有传递指数对象时，tableData为空
    tableData.value = []
  }
  // 打印所有基金公司名称
  console.log('所有基金公司名称', tableData.value.map(item => item.company))
})
</script>

<style scoped>
.select-index-constituent-fund-view {
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
.footer-bar {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}
.continue-btn {
  background: #197aff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 14px 38px;
  font-size: 18px;
  cursor: pointer;
}
</style>
