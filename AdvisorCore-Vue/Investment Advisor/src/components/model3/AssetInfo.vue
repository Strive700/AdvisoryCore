<!-- 1.3 -->
<!-- 第二步：设置大类资产模型 -->
<template>
  <div class="asset-info-view">
    <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step active">1 大类选择</span>
      <span class="step-divider">—</span>
      <span class="step active">2 大类研究</span>
      <span class="step-divider">—</span>
      <span class="step">3 资产配置</span>
      <span class="step-divider">—</span>
      <span class="step">4 基金筛选</span>
      <span class="step-divider">—</span>
      <span class="step">5 基金组合</span>
    </div>
    <div class="desc">说明：资本市场展望根据各种模型计算或手动输入所选大类资产指数的预期年化收益、预期年化标准差</div>
    <div class="model-header">
      <span class="model-title">宏观市场估计模型</span>
      <button :class="['model-btn', modelType==='history' ? 'active' : '']" @click="modelType='history'">历史数据模型</button>
      <button :class="['model-btn', modelType==='custom' ? 'active' : '']" @click="modelType='custom'">自定义</button>
      <span class="model-desc">模型介绍说明：用历史的收益率来计算期望收益和标准差</span>
    </div>
    <div class="section-title">大类资产信息</div>
    <table class="asset-table">
      <thead>
        <tr>
          <th>大类资产名称</th>
          <th>预期收益（%）</th>
          <th>预期标准差（%）</th>
          <th>开始日期</th>
          <th>结束日期</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in assetList" :key="item.name">
          <td>{{ item.name }}</td>
          <td>
            <template v-if="modelType === 'custom'">
              <input type="number" v-model="item.yield" style="width:80px;" />
            </template>
            <template v-else>
              {{ item.yield }}
            </template>
          </td>
          <td>
            <template v-if="modelType === 'custom'">
              <input type="number" v-model="item.std" style="width:80px;" />
            </template>
            <template v-else>
              {{ item.std }}
            </template>
          </td>
          <td>
            <input type="date" v-model="item.start" />
          </td>
          <td>
            <input type="date" v-model="item.end" />
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 新增：下一步按钮 -->
    <div class="footer-bar">
      <button class="next-btn" @click="goNext">下一步</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const modelType = ref('history')
// TODO: 资产信息后续用接口获取
const assetList = ref([
  { name: '商品期货指数', yield: 10.09, std: 9.20, start: '2019-11-20', end: '2020-01-20' },
  { name: '农产品期货指数', yield: 12.89, std: 10.53, start: '2019-11-20', end: '2020-01-20' },
  { name: '油脂油料期货指数', yield: 15.71, std: 14.39, start: '2019-11-20', end: '2020-01-20' }
])

const router = useRouter()
const route = useRoute()
let planObj = null
if (typeof route.query.planObj === 'string') {
  planObj = JSON.parse(route.query.planObj)
}
console.log('【AssetInfo.vue收到的方案对象】', planObj)

// 动态设置大类资产名称列内容
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
          start: typeof old.start === 'string' ? old.start : '',
          end: typeof old.end === 'string' ? old.end : ''
        }
      })
    }
  } catch (e) {
    console.error('indexList 解析失败', e)
  }
}

function goNext() {
  if (modelType.value === 'history') {
    console.log('【调试】当前为历史数据模型，点击了下一步')
  } else if (modelType.value === 'custom') {
    console.log('【调试】当前为自定义模型，点击了下一步')
    // 遍历 assetList，调用后端接口更新指数定义信息
    assetList.value.forEach(async (item: any) => {
      const body = {
        expectedReturn: item.yield,
        expectedStdDev: item.std,
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
  }
  router.push({
    name: 'AssetAllocationView',
    query: { planObj: planObj ? JSON.stringify(planObj) : '' }  
  })
}

onMounted(async () => {
  // 遍历 assetList，依次请求指数定义信息
  for (const item of assetList.value) {
    try {
      const res = await fetch(`http://localhost:8080/api/index/definition-by-name/${encodeURIComponent(item.name)}`)
      if (!res.ok) throw new Error('未找到指数定义信息')
      const data = await res.json()
      console.log(`【${item.name} 的指数定义信息】`, data)
    } catch (e) {
      console.error(`获取 ${item.name} 的指数定义信息失败`, e)
    }
  }
})
</script>

<style scoped>
.asset-info-view {
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
  margin-bottom: 12px;
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
  margin-left: 16px;
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
.asset-table input[type="date"] {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 15px;
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