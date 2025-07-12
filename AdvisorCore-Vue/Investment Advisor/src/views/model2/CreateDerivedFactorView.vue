<template>
  <div class="main-container">
    <div class="left-panel">
      <div class="factor-tree-title">可选因子</div>
      <el-tree
        :data="factorTree"
        node-key="treeid"
        :props="treeProps"
        show-checkbox
        default-expand-all
        :check-strictly="true"
        @check="handleCheck"
      />
    </div>
    <div class="right-panel">
      <el-card>
        <template #header>已选因子</template>
        <el-steps :active="step" finish-status="success" align-center style="margin-bottom: 32px;">
          <el-step title="选择因子" />
          <el-step title="设置权重" />
        </el-steps>
        <div v-if="step === 0">
          <el-table :data="selectedFactors">
            <el-table-column prop="nodeName" label="因子名称" />
            <el-table-column prop="description" label="描述" />
          </el-table>
          <div class="step-btns">
            <el-button @click="onCancel">取消</el-button>
            <el-button type="primary" :disabled="selectedFactors.length === 0" @click="step = 1">下一步</el-button>
          </div>
        </div>
        <div v-else>
          <FactorWeightStep
            :selected-factors="selectedFactorsForWeight"
            v-model:factor-name="factorName"
            v-model:weights="weights"
            :error="weightError"
          />
          <div class="step-btns">
            <el-button @click="step = 0">上一步</el-button>
            <el-button type="primary" :disabled="!!weightError || !factorName" @click="onSubmit">确定</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
// 确保路径正确，如果 FactorWeightStep.vue 在同级目录，则应为 './FactorWeightStep.vue'
// 如果在 components/model2 下，则 @/components/model2/FactorWeightStep.vue 是正确的
import FactorWeightStep from '@/components/model2/FactorWeightStep.vue';

// --- 类型定义 ---
interface FactorNode {
  treeid: number;
  parentId: number | null;
  nodeName: string;
  nodeType: string;
  description?: string;
  isLeaf?: boolean; // Dynamically set by arrayToTree
  children?: FactorNode[];
  factorId?: number | null;
  [key: string]: any;
}

interface SelectedFactorForWeight {
  nodeName: string;
  description?: string;
  baseId: number;
  name: string;
  [key: string]: any;
}

interface WeightItem {
  baseId: number;
  weight: number;
}

// --- 响应式状态 ---
const factorTree = ref<FactorNode[]>([]);
const selectedFactors = ref<FactorNode[]>([]);
const treeProps = { label: 'nodeName', children: 'children', isLeaf: 'isLeaf' };
const step = ref(0); // 0: 选择因子, 1: 设置权重

const factorName = ref(''); // 用于绑定衍生因子名称的输入框
const weights = ref<WeightItem[]>([]); // 存储每个选定因子的权重

// --- 计算属性 ---
const selectedFactorsForWeight = computed((): SelectedFactorForWeight[] =>
  selectedFactors.value.map(f => {
    const baseId = f.factorId ?? f.treeid ?? (f as any).id ?? (f as any).baseId;
    if (baseId === undefined || baseId === null) {
      console.warn('Selected factor is missing a valid baseId, skipping for weight calculation:', f);
      return null; // Filtered out later
    }
    return {
      ...f,
      name: f.nodeName,
      baseId: baseId
    };
  }).filter(f => f !== null) as SelectedFactorForWeight[]
);

const weightError = computed((): string => {
  // Only validate weights when on the weight setting step
  if (step.value === 1) {
    if (weights.value.length === 0) return '请设置权重';
    const sum = weights.value.reduce((acc, cur) => acc + Number(cur.weight), 0);
    if (sum !== 100) return '权重总和必须为100%';
    if (weights.value.some(w => w.weight < 0)) return '权重不能为负';
  }
  return '';
});

// --- 辅助函数：将扁平数组转换为树形结构 ---
const arrayToTree = (
  arr: FactorNode[],
  idKey: string = 'treeid',
  parentKey: string = 'parentId',
  childrenKey: string = 'children'
): FactorNode[] => {
  console.log('--- arrayToTree 函数开始 ---');
  const map: Record<number, FactorNode> = {};
  const tree: FactorNode[] = [];

  // Step 1: Create a map of all nodes and initialize their children arrays
  arr.forEach((item: FactorNode) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [childrenKey]: _, ...rest } = item; // Destructure to exclude original children
    map[item[idKey]] = { ...rest, [childrenKey]: [] } as FactorNode;
  });

  // Step 2: Build the tree structure by assigning children to their parents
  arr.forEach((item: FactorNode) => {
    const currentNode = map[item[idKey]];
    if (!currentNode) {
      console.warn(`arrayToTree: Node with treeid: ${item[idKey]} not found in map during tree building.`);
      return;
    }

    const parentId = item[parentKey];
    // Check for valid parentId, ensure it's not null/undefined and not self-referencing
    if (parentId !== null && parentId !== undefined && map[parentId] && parentId !== item[idKey]) {
      const parentNode = map[parentId];
      if (parentNode) {
        parentNode[childrenKey]!.push(currentNode);
      } else {
        // If parent node is not found in the map, treat current node as a root
        console.warn(`arrayToTree: Parent node with treeid ${parentId} not found for ${item.nodeName} (treeid: ${item[idKey]}). Treating as root.`);
        tree.push(currentNode);
      }
    } else {
      // If no parentId, or self-referencing, treat as root
      if (parentId === item[idKey]) {
        console.warn(`arrayToTree: Node ${item.nodeName} (treeid: ${item[idKey]}) has a self-referencing parentId. Treating as root.`);
      }
      tree.push(currentNode);
    }
  });

  // Step 3: Dynamically set `isLeaf` property based on whether a node has children
  Object.values(map).forEach(node => {
    node.isLeaf = (node[childrenKey] as FactorNode[]).length === 0;
  });

  console.log('转换后的树结构 (factorTree):', tree);
  console.log('--- arrayToTree 函数结束 ---');
  return tree;
};

// --- API 调用 ---
const fetchFactorTree = async () => {
  console.log('--- fetchFactorTree 函数开始 ---');
  try {
    const res = await axios.get('http://localhost:8080/api/factors/tree');
    console.log('API 返回的原始因子树数据:', res.data);
    if (!res.data || res.data.length === 0) {
      ElMessage.warning('未获取到因子树数据。');
      return;
    }
    factorTree.value = arrayToTree(res.data);
  } catch (e) {
    console.error('获取因子树失败', e);
    ElMessage.error('获取因子树数据失败！');
  } finally {
    console.log('--- fetchFactorTree 函数结束 ---');
  }
};

// --- 事件处理函数 ---
function handleCheck(_data: any, info: { checkedNodes: FactorNode[]; checkedKeys: number[] }) {
  console.log('handleCheck 触发，已选节点信息:', info);
  // Filter to keep only leaf nodes which are of type 'factor'
  selectedFactors.value = info.checkedNodes.filter(node => node.isLeaf && node.nodeType === 'factor');
  console.log('当前已选的叶子因子节点:', selectedFactors.value);
}

function onCancel() {
  console.log('取消按钮点击，返回上一页。');
  window.history.back();
}

async function onSubmit() {
  console.log('提交按钮点击。');
  if (weightError.value) {
    ElMessage.error(weightError.value);
    return;
  }
  if (!factorName.value) {
      ElMessage.error('请输入衍生因子名称！');
      return;
  }

  try {
    const payload = {
      factors: weights.value.map(w => ({
        baseId: w.baseId,
        weight: w.weight
      })),
      // factorName 是在 FactorWeightStep 中输入的，这里直接使用它的值
      factorName: factorName.value
    };
    console.log('提交的 payload (不含固定参数):', payload);

    // 将用户输入的 factorName 绑定到 name 和 displayName 字段
    await axios.post('http://localhost:8080/api/derived-factors/add', {
      ...payload, // Spread the base payload (including factorName and factors array)
      name: factorName.value,        // Dynamic name from input
      displayName: factorName.value, // Dynamic display name from input
      factorType: "衍生因子",
      dataType: "double",
      calcMethod: "组合加权",
      updateFrequency: "每日"
    });

    ElMessage.success('添加成功！');
    console.log('因子添加成功。');

    // Reset state after successful submission
    step.value = 0;
    selectedFactors.value = [];
    factorName.value = ''; // Clear the input field
    weights.value = [];
  } catch (error) {
    console.error('添加失败:', error);
    ElMessage.error('添加失败，请检查控制台了解详情。');
  }
}

// --- 生命周期钩子与监听器 ---
onMounted(() => {
  console.log('--- 组件 onMounted 生命周期钩子 ---');
  fetchFactorTree();
});

// Watch for step changes to initialize weights when moving to step 1
watch(
  () => step.value,
  (val) => {
    if (val === 1) {
      console.log('进入步骤 1 (设置权重)。');
      weights.value = selectedFactors.value
        .map(f => {
          const baseId = f.factorId ?? f.treeid ?? (f as any).id ?? (f as any).baseId;
          if (baseId === undefined || baseId === null) {
              console.warn('Selected factor without valid baseId, filtered out for weights:', f);
              return null;
          }
          return {
            baseId: baseId,
            weight: 0 // Initialize weight to 0
          };
        })
        .filter(w => w !== null) as WeightItem[];
      console.log('初始化权重数组:', weights.value);
      // 如果没有选择任何因子但进入了第二步，可能需要提示
      if (weights.value.length === 0) {
        ElMessage.warning('请先选择至少一个因子！');
        step.value = 0; // 退回第一步
      }
    }
  },
  { immediate: true } // Run immediately on component mount
);
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  gap: 24px;
  height: calc(100vh - 60px); /* Adjust based on your header/footer height */
  padding: 24px;
  box-sizing: border-box;
}
.left-panel {
  width: 360px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  padding: 16px 12px;
  min-height: 600px;
  overflow-y: auto;
}
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.el-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}
/* Deep selector for Element Plus internal elements */
.el-card :deep(.el-card__body) {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.factor-tree-title {
  font-weight: bold;
  color: #1976d2;
  font-size: 18px;
  margin-bottom: 12px;
}
.step-btns {
  margin-top: 24px;
  text-align: right;
  flex-shrink: 0; /* Prevent buttons from shrinking */
}
.el-table {
  flex-grow: 1;
}
</style>