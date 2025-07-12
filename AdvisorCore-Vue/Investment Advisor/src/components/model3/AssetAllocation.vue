<!-- 1.4 -->
<!-- 第三步：选择资产配置 -->
<template>
  <div class="asset-allocation-view">
    <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step active">1 大类选择</span>
      <span class="step-divider">—</span>
      <span class="step active">2 大类研究</span>
      <span class="step-divider">—</span>
      <span class="step active">3 资产配置</span>
      <span class="step-divider">—</span>
      <span class="step">4 基金筛选</span>
      <span class="step-divider">—</span>
      <span class="step">5 基金组合</span>
    </div>
    <div class="desc">说明：大类资产配置优化各个大类资产的权重，制定资产配置目标，各大类资产权重之和为100%</div>
    <div class="model-header">
      <span class="model-title">资产配置模型</span>
      <button v-for="type in modelTypes" :key="type.value" :class="['model-btn', modelType===type.value ? 'active' : '']" @click="modelType=type.value; if(type.value==='equal'){setEqualWeight()}">{{ type.label }}</button>
    </div>
    <div class="model-desc">
      模型介绍说明：BL模型基于贝叶斯概率统计方法，对某些大类资产提出倾向性意见，模型根据投资者的倾向性意见，输出对该大类资产的配置建议
    </div>
    <div class="section-title">大类资产信息</div>
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
        <tr v-for="(item, idx) in assetList" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.yield }}</td>
          <td>{{ item.std }}</td>
          <td>
            <input type="number" v-model.number="item.weight" min="0" max="100" class="weight-input" />
          </td>
        </tr>
      </tbody>
    </table>
    <div style="text-align: right; margin-top: 24px;">
      <button class="next-btn" @click="goNext">下一步</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const modelTypes = [
  { label: '用户自定义', value: 'user' },
  // { label: 'BL模型', value: 'bl' },
  { label: '等权重', value: 'equal' }
  // { label: '逆方差', value: 'inverse' },
  // { label: '等风险', value: 'risk' },
  // { label: '均值方差', value: 'meanvar' }
]
const modelType = ref('user')
// TODO: 资产信息后续用接口获取
const assetList = ref([
  { name: '商品期货指数', yield: 10.09, std: 9.20, weight: 45 },
  { name: '农产品期货指数', yield: 12.89, std: 10.53, weight: 35 },
  { name: '油脂油料期货指数', yield: 15.71, std: 14.39, weight: 20 }
])
const router = useRouter()
const route = useRoute()
let planObj = null
if (typeof route.query.planObj === 'string') {
  planObj = JSON.parse(route.query.planObj)
}
console.log('【AssetAllocation.vue收到的方案对象】', planObj)

if (planObj && planObj.indexList) {
  try {
    const indexArr = JSON.parse(planObj.indexList)
    if (Array.isArray(indexArr)) {
      assetList.value = indexArr.map((name: string, i: number) => {
        const old = assetList.value && assetList.value[i] ? assetList.value[i] as any : {} as any
        return {
          name,
          yield: typeof old.yield === 'number' ? old.yield : '',
          std: typeof old.std === 'number' ? old.std : '',
          weight: typeof old.weight === 'number' ? old.weight : ''
        }
      })
    }
  } catch (e) {
    console.error('indexList 解析失败', e)
  }
}

function setEqualWeight() {
  const n = assetList.value.length
  if (n === 0) return
  const avg = Math.floor((100 * 100) / n) / 100 // 保留两位小数
  let remain = 100 - avg * (n - 1)
  assetList.value.forEach((item, idx) => {
    item.weight = idx === n - 1 ? remain : avg
  })
}

function goNext() {
  // 遍历 assetList，调用后端接口更新指数定义信息
  assetList.value.forEach(async (item: any) => {
    const body = {
      expectedReturn: item.yield,
      expectedStdDev: item.std,
      assetWeight: item.weight,
      // 其他字段可按需补充
    }
    try {
      const resp = await fetch(`http://localhost:8080/api/index/definition-by-name/${encodeURIComponent(item.name)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (resp.ok) {
        const text = await resp.text()
        console.log(`【${item.name}】更新成功:`, text)
      } else {
        const err = await resp.json()
        console.error(`【${item.name}】更新失败:`, err)
      }
    } catch (e) {
      console.error(`【${item.name}】更新异常:`, e)
    }
  })
  router.push('/model3/FundFilterView')
}
</script>

<style scoped>
.asset-allocation-view {
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
.model-header {
  display: flex;
  align-items: center;
  margin-bottom: 0;
  gap: 12px;
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
  border: 1.5px solid #197aff;
  border-radius: 4px;
  padding: 6px 18px;
  font-size: 15px;
  cursor: pointer;
  margin-right: 4px;
  transition: background 0.2s, color 0.2s;
}
.model-btn.active {
  background: #197aff;
  color: #fff;
}
.model-desc {
  color: #888;
  font-size: 14px;
  margin: 8px 0 0 0;
  margin-left: 0;
  line-height: 1.7;
}
.section-title {
  color: #197aff;
  font-size: 17px;
  font-weight: bold;
  margin: 18px 0 8px 0;
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
.weight-input {
  background: #eaf2ff;
  border: 1px solid #b3d1ff;
  border-radius: 4px;
  padding: 4px 8px;
  width: 80px;
  text-align: center;
  font-size: 15px;
  color: #197aff;
}
.weight-input:focus {
  outline: none;
  border-color: #197aff;
  background: #d6eaff;
}
</style>