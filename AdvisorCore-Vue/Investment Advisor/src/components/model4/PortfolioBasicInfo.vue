<!-- 2.1 -->
<template>
  <div class="portfolio-basic-info-view">
    <div class="title">第一步：组合基本信息</div>
    <form class="info-form">
      <div class="form-row">
        <label>组合名称：</label>
        <input v-model="form.name" placeholder="请输入" />
      </div>
      <div class="form-row">
        <label>组合id：</label>
        <input value="系统自动生成" readonly />
      </div>
      <div class="form-row">
        <label>风险等级：</label>
        <select v-model="form.risk">
          <option value="R1">R1</option>
          <option value="R2">R2</option>
          <option value="R3">R3</option>
          <option value="R4">R4</option>
          <option value="R5">R5</option>
        </select>
      </div>
      <div class="form-row">
        <label>策略：</label>
        <select v-model="form.strategy">
          <option value="策略一">策略一</option>
          <option value="策略二">策略二</option>
        </select>
      </div>
      <div class="form-row">
        <label>产品特征：</label>
        <select v-model="form.feature">
          <option value="产品要素模板一">产品要素模板一</option>
          <option value="产品要素模板二">产品要素模板二</option>
        </select>
      </div>
      <div class="form-row btn-row">
        <button class="next-btn" type="button" @click="onNext">下一步</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const form = ref({
  name: '',
  risk: 'R3',
  strategy: '策略一',
  feature: '产品要素模板一'
})
const router = useRouter()
async function onNext() {
  // 字段映射
  const payload = {
    name: form.value.name,
    riskLevel: form.value.risk, // 这里假设risk就是riskLevel
    strategyType: form.value.strategy, // 这里假设strategy就是strategyType
    strategyId: form.value.strategy === '策略一' ? 1 : 2, // 示例映射
    listed: true // 可根据实际需求调整
  }
  try {
    const res = await axios.post('http://localhost:8080/api/portfolio', payload)
    if (res.status === 201) {
      alert('创建成功！')
      console.log('【创建成功】')
      router.push({
        path: '/model4/PortfolioBuildView',
        query: { name: form.value.name }
      })
    } else {
      alert('创建失败: ' + (res.data || '未知错误'))
    }
  } catch (e) {
    alert('请求失败，请稍后重试')
  }
}
</script>

<style scoped>
.portfolio-basic-info-view {
  max-width: 520px;
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
.info-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.form-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 0;
}
.form-row label {
  min-width: 90px;
  color: #222;
  font-size: 16px;
  font-weight: 500;
}
.form-row input,
.form-row select {
  flex: 1;
  border: 1px solid #bbb;
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 16px;
}
.form-row input[readonly] {
  background: #f5f5f5;
  color: #888;
}
.btn-row {
  justify-content: flex-end;
  margin-top: 18px;
}
.next-btn {
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
