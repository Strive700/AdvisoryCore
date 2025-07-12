<template>
  <div class="create-style-factor-view">
    <el-card>
      <template #header>
        <span>创建风格投资因子</span>
      </template>
      <el-steps :active="step" finish-status="success" align-center style="margin-bottom: 32px;">
        <el-step title="挑选衍生因子" />
        <el-step title="设置因子权重并创建" />
      </el-steps>
      <div v-show="step === 0">
        <DerivedFactorSelectStep
          :all-factors="allDerivedFactors"
          :selected-factors="selectedDerivedFactors"
          v-model:plan-name="planName"
          @update:selected-factors="updateSelectedFactors"
        />
        <el-form label-width="100px" style="margin-top: 24px;">
          <el-form-item label="展示名">
            <el-input v-model="displayName" placeholder="请输入展示名" />
          </el-form-item>
          <el-form-item label="因子说明">
            <el-input v-model="description" placeholder="请输入因子说明" />
          </el-form-item>
          <el-form-item label="计算方法">
            <el-input v-model="calcMethod" placeholder="请输入计算方法" />
          </el-form-item>
          <el-form-item label="是否启用">
            <el-switch v-model="enabled" />
          </el-form-item>
          <el-form-item label="风格标签">
            <el-input v-model="styleTag" placeholder="请输入风格标签" />
          </el-form-item>
        </el-form>
        <div class="step-btns">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" :disabled="selectedDerivedFactors.length === 0" @click="step = 1">下一步</el-button>
        </div>
      </div>
      <div v-show="step === 1">
        <StyleFactorWeightStep
          :selected-factors="selectedDerivedFactors"
          v-model:factor-name="styleFactorName"
          v-model:weights="weights"
          :error="weightError"
        />
        <div class="step-btns">
          <el-button @click="step = 0">上一步</el-button>
          <el-button type="primary" :disabled="!!weightError || !styleFactorName" @click="onSubmit">创建</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import DerivedFactorSelectStep from '../../components/model2/DerivedFactorSelectStep.vue'
import StyleFactorWeightStep from '../../components/model2/StyleFactorWeightStep.vue'

interface DerivedFactor {
  id: string;
  name: string;
}
interface WeightRow {
  id: string;
  name: string;
  weight: number;
}

const allDerivedFactors = ref<DerivedFactor[]>([])
const selectedDerivedFactors = ref<DerivedFactor[]>([])
const step = ref(0)
const planName = ref('')
const styleFactorName = ref('')
const weights = ref<WeightRow[]>([])

const displayName = ref('')
const calcMethod = ref('')
const updateFrequency = ref('')
const enabled = ref(true)
const styleTag = ref('')
const description = ref('')

const weightError = computed(() => {
  if (weights.value.length === 0) return '请设置权重';
  const sum = weights.value.reduce((acc, cur) => acc + Number(cur.weight), 0);
  if (Math.abs(sum - 100) > 1e-6) return '权重总和必须为100%';
  if (weights.value.some(w => w.weight < 0)) return '权重不能为负';
  return ''
})

function updateSelectedFactors(val: DerivedFactor[]) {
  selectedDerivedFactors.value = val;
}

function onCancel() {
  window.history.back()
}

async function fetchAllDerivedFactors() {
  try {
    const res = await axios.get('http://localhost:8080/api/derived-factors/data-types')
    const dataObj = res.data?.data || {};
    allDerivedFactors.value = Object.values(dataObj).map((item: any) => ({
      id: String(item.definitionid),
      name: item.display_name
    }))
  } catch {
    ElMessage.error('获取衍生因子类型失败')
    allDerivedFactors.value = []
  }
}

onMounted(() => {
  fetchAllDerivedFactors()
})

async function onSubmit() {
  if (weightError.value) {
    ElMessage.error(weightError.value);
    return;
  }
  try {
    const customStyleFactorPayload = {
      name: styleFactorName.value,
      displayName: displayName.value || styleFactorName.value,
      description: description.value,
      calcMethod: calcMethod.value,
      updateFrequency: updateFrequency.value,
      enabled: enabled.value,
      styleTag: styleTag.value
    };
    const styleIdRes = await axios.post('http://localhost:8080/api/custom-style-factor/add', customStyleFactorPayload);
    const styleId = styleIdRes.data.styleId;

    const addCustomStyleFactorPayload = {
      styleFactorId: styleId,
      factors: weights.value.map(w => ({
        factorId: Number(w.id),
        weight: Number(w.weight),
        normalized: false
      }))
    };
    const res = await axios.post('http://localhost:8080/api/custom-style-factors/add', addCustomStyleFactorPayload);
    console.log(res)
    ElMessage.success('创建成功');
    step.value = 0;
    selectedDerivedFactors.value = [];
    planName.value = '';
    styleFactorName.value = '';
    weights.value = [];
    displayName.value = '';
    calcMethod.value = '';
    updateFrequency.value = '';
    enabled.value = true;
    styleTag.value = '';
    description.value = '';
  } catch {
    ElMessage.error('创建失败');
  }
}
</script>

<style scoped>
.create-style-factor-view {
  max-width: 900px;
  margin: 40px auto;
}
.step-btns {
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
  gap: 16px;
}
</style>
