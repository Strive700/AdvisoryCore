<!-- 1.2 -->
<!-- 大类选择计算大类资产相关矩阵 -->

<template>
  <div class="asset-matrix-view">
    <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step active">1 大类选择</span>
      <span class="step-divider">—</span>
      <span class="step">2 大类研究</span>
      <span class="step-divider">—</span>
      <span class="step">3 资产配置</span>
      <span class="step-divider">—</span>
      <span class="step">4 基金筛选</span>
      <span class="step-divider">—</span>
      <span class="step">5 基金组合</span>
    </div>
    <div class="desc">说明：选择大类资产指数，计算指数之间的相关性。支持手工调整大类资产间相关性，为构建有效投资组合奠定基础</div>
    <div class="matrix-header">
      <div>
        <label>方案选择：</label>
        <select v-model="selectedPlan" @focus="onDropdownOpen">
          <option v-for="plan in plansData" :key="plan.planId" :value="plan.planName">{{ plan.planName }}</option>
        </select>
        <button class="blue-btn" @click="showAssetSelection = true">创建方案</button>
        <button class="blue-btn" @click="deletePlan">删除方案</button>
      </div>
      <!-- <div>
        <label>开始日期：</label>
        <input type="date" v-model="startDate" />
        <span style="margin: 0 8px;">~</span>
        <label>结束日期：</label>
        <input type="date" v-model="endDate" />
      </div> -->
    </div>
    <div class="matrix-section">
      <div class="matrix-title">大类资产相关系数矩阵</div>
      <table class="matrix-table">
        <thead>
          <tr>
            <th>大类资产名称</th>
            <th v-for="col in matrixCols" :key="col">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in matrixRows" :key="row">
            <td>{{ row }}</td>
            <td v-for="(col, j) in matrixCols" :key="col">
              {{ correlationMatrix[i][j].toFixed(4) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="matrix-section">
      <div class="matrix-title">大类资产协方差矩阵</div>
      <table class="matrix-table">
        <thead>
          <tr>
            <th>大类资产名称</th>
            <th v-for="col in matrixCols" :key="col">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in matrixRows" :key="row">
            <td>{{ row }}</td>
            <td v-for="(col, j) in matrixCols" :key="col">
              {{ covarianceMatrix[i][j].toFixed(4) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="footer-bar">
      <button class="next-btn" @click="goNext">下一步</button>
    </div>
    <AssetSelection :visible="showAssetSelection" :treeData="treeData" @save="onSaveAssetSelection" @cancel="showAssetSelection = false" />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import AssetSelection from './AssetSelection.vue'

// TODO: 方案列表、矩阵数据后续用接口获取
const plansData = ref<any[]>([])
const selectedPlan = ref('')
const startDate = ref('2015-10-02')
const endDate = ref('2015-10-02')

const matrixCols = ref<string[]>(['商品期货指数', '农产品期货指数', '油脂油料期货指数'])
const matrixRows = matrixCols

const correlationMatrix = ref([
  [1.0000, -0.1139, 0.2296],
  [-0.1139, 1.0000, -0.0361],
  [0.2296, -0.0361, 1.0000]
])
const covarianceMatrix = ref([
  [1.0000, -0.1139, 0.2296],
  [-0.1139, 1.0000, -0.0361],
  [0.2296, -0.0361, 1.0000]
])

const showAssetSelection = ref(false)
const treeData = ref<any[]>([])
function onSaveAssetSelection(data: any) {
  showAssetSelection.value = false
  // 用户选择的节点 nodeName 用于表格
  if (data && data.selectedNodes && Array.isArray(data.selectedNodes)) {
    const names = data.selectedNodes.map((node: any) => node.nodeName)
    matrixCols.value = names
    // 相关矩阵和协方差矩阵重置为对应维度的静态数据
    const n = names.length
    correlationMatrix.value = Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
    )
    covarianceMatrix.value = Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
    )
  }
}

const router = useRouter()
function goNext() {
  // 记录并打印用户选择的方案信息
  const planObj = plansData.value.find(plan => plan.planName === selectedPlan.value)
  if (planObj) {
    console.log('【用户点击下一步，所选方案信息】', planObj)
    router.push({
      name: 'AssetInfoView',
      query: { planObj: JSON.stringify(planObj) }
    })
  } else {
    console.log('【用户点击下一步，但未选中有效方案】')
    router.push({ name: 'AssetInfoView' })
  }
}

// 获取方案列表的通用函数
async function fetchPlans() {
  try {
    const plansRes = await fetch('http://localhost:8080/api/plans')
    if (!plansRes.ok) throw new Error('获取方案失败')
    const plansDataRes = await plansRes.json()
    console.log('【方案列表】', plansDataRes)
    plansData.value = plansDataRes
    if (plansDataRes.length > 0) {
      selectedPlan.value = plansDataRes[0].planName
    }
  } catch (e) {
    console.error('获取方案信息失败', e)
  }
}

// 用户点击下拉栏时触发
async function onDropdownOpen() {
  console.log('【调试】用户拉开了方案下拉栏', plansData.value)
  await fetchPlans()
}

// 监听方案选择变化，打印对应 indexList
watch(selectedPlan, (newVal) => {
  const planObj = plansData.value.find(plan => plan.planName === newVal)
  if (planObj) {
    console.log('【选中方案的 indexList】', planObj.indexList)
    // 动态更新表格大类资产名称列内容
    try {
      const indexArr = JSON.parse(planObj.indexList)
      if (Array.isArray(indexArr)) {
        matrixCols.value = indexArr
        matrixRows.value = indexArr
        // 相关矩阵和协方差矩阵重置为对应维度的静态数据
        const n = indexArr.length
        correlationMatrix.value = Array.from({ length: n }, (_, i) =>
          Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
        )
        covarianceMatrix.value = Array.from({ length: n }, (_, i) =>
          Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
        )
      }
    } catch (e) {
      console.error('indexList 解析失败', e)
    }
  }
})

const deletePlan = async () => {
  if (!selectedPlan.value) {
    alert('请选择要删除的方案');
    return;
  }
  if (!confirm(`确定要删除方案 "${selectedPlan.value}" 吗？`)) {
    return;
  }
  try {
    console.log('【删除方案】', selectedPlan.value)
    const response = await axios.delete(`http://localhost:8080/api/plans/${encodeURIComponent(selectedPlan.value)}`);
    console.log('【删除方案响应】', response)
    alert(response.data); // "删除成功"
    // 删除后刷新方案列表
    await fetchPlans();
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      alert('请求失败，请稍后重试');
    }
  }
};

onMounted(async () => {
  try {
    // 获取大类资产指数树结构
    const res = await fetch('http://localhost:8080/api/index/tree')
    if (!res.ok) throw new Error('网络响应非200')
    const data = await res.json()
    // 扁平转嵌套
    function buildTree(flatData: any[]): any[] {
      const idMap = new Map()
      flatData.forEach(item => idMap.set(item.indexid, { ...item, children: [] }))
      const tree: any[] = []
      idMap.forEach(node => {
        if (node.parentId == null) {
          tree.push(node)
        } else {
          const parent = idMap.get(node.parentId)
          if (parent) parent.children.push(node)
        }
      })
      return tree
    }
    treeData.value = buildTree(data)
    // 控制台打印树结构（可选）
    function printTree(nodes: any[], level = 1) {
      nodes.forEach(node => {
        if (level === 1) console.log('一级节点:', node.nodeName)
        if (level === 2) console.log('  二级节点:', node.nodeName)
        if (level === 3) console.log('    三级节点:', node.nodeName)
        if (node.children && node.children.length > 0) {
          printTree(node.children, level + 1)
        }
      })
    }
    printTree(treeData.value)
  } catch (e) {
    console.error('获取大类资产指数树结构数据失败', e)
  }

  // 页面加载时也获取方案信息
  await fetchPlans()
})
</script>


<style scoped>
.asset-matrix-view {
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
.matrix-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.matrix-header label {
  color: #222;
  font-weight: 500;
}
.matrix-header select,
.matrix-header input[type="date"] {
  margin: 0 6px;
  padding: 3px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 15px;
}
.blue-btn {
  background: #197aff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 16px;
  margin-left: 8px;
  font-size: 15px;
  cursor: pointer;
}
.matrix-section {
  margin-bottom: 32px;
}
.matrix-title {
  color: #197aff;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 8px;
}
.matrix-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  margin-bottom: 12px;
}
.matrix-table th,
.matrix-table td {
  border: 1px solid #bbb;
  padding: 8px 16px;
  text-align: center;
  font-size: 15px;
  color: #222;
}
.matrix-table th {
  background: #e5e5e5;
  font-weight: bold;
}
.footer-bar {
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
}
.next-btn {
  background: #197aff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 32px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.next-btn:hover {
  background: #145fd7;
}
</style>