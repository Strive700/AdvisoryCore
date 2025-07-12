<!-- 3.4 -->
<template>
  <!-- 步骤条 -->
    <div class="step-bar">
      <span class="step active">1 指数创建</span>
      <span class="step-divider">—</span>
      <span class="step">2 大类研究</span>
      <span class="step-divider">—</span>
      <span class="step">资产配置</span>
      <span class="step-divider">—</span>
      <span class="step">基金组合</span>
    </div>
  <div class="index-create-view">
    <div class="top-title-bar">
      <h2 class="create-title">+ 创建指数</h2>
    </div>
    <div class="arrow-bar">
      <span class="arrow">↓</span>
    </div>
    <div class="select-type-card">
      <div class="card-title">选择指数类型</div>
      <div class="card-desc">说明：选择指数类型会挑选对应类型的成份基金</div>
      <select v-model="selectedType" class="type-select">
        <option value="">请选择一种指数</option>
        <option v-for="item in typeOptions" :key="item.definitionid" :value="item.definitionid">{{ item.name }}</option>
      </select>
      <button class="confirm-btn" @click="onConfirm">确定</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
const typeOptions = ref<any[]>([])
const selectedType = ref('')
const selectedIndexObj = ref<any>(null)
const router = useRouter()
function onConfirm() {
  // 找到完整对象
  const obj = typeOptions.value.find(item => String(item.definitionid) === String(selectedType.value))
  selectedIndexObj.value = obj
  // 跳转并传递完整对象（序列化为 JSON 字符串）
  router.push({
    name: 'SelectIndexConstituentFundView',
    query: { indexObj: encodeURIComponent(JSON.stringify(obj)) }
  })
}

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8080/api/index/definitions', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    console.log('【全部大类指数定义信息】', data)
    if (Array.isArray(data)) {
      typeOptions.value = data
    }
  } catch (e) {
    console.error('获取大类指数定义信息失败', e)
  }
})
</script>

<style scoped>
.step-bar {
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 8px;
  gap: 8px;
}
.step-divider {
  color: #bbb;
  font-size: 20px;
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
.index-create-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 80vh;
  padding-top: 40px;
}
.top-title-bar {
  margin-bottom: 24px;
  text-align: center;
}
.create-title {
  font-size: 28px;
  font-weight: bold;
  color: #197aff;
  margin: 0;
}
.arrow-bar {
  font-size: 36px;
  color: #197aff;
  margin-bottom: 24px;
}
.select-type-card {
  background: #ededed;
  border-radius: 24px;
  padding: 36px 48px 32px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 420px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}
.card-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 12px;
  text-align: center;
}
.card-desc {
  font-size: 16px;
  color: #444;
  margin-bottom: 18px;
  text-align: center;
}
.type-select {
  width: 320px;
  height: 38px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #bbb;
  margin-bottom: 24px;
  padding: 0 12px;
}
.confirm-btn {
  background: #197aff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 48px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}
</style> 