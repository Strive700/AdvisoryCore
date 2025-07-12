<template>
  <div>
    <div ref="chartRef" style="width: 100%; height: 600px;"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue' // 导入 nextTick
import * as echarts from 'echarts'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const chartRef = ref<HTMLDivElement | null>(null)
let myChart: echarts.ECharts | null = null

// 数据转换函数：将原始数据转换为 ECharts 图谱所需的格式
function convertToEchartsGraph(data: unknown[]) {
  console.log('--- convertToEchartsGraph 函数开始 ---');
  if (!data || data.length === 0) {
    console.warn('convertToEchartsGraph: 输入数据为空或无效。');
    return { nodes: [], links: [], categories: [] };
  }

  const nodes = data.map(item => {
    const nodeItem = item as Record<string, unknown>;
    // 确保 treeid 和 parentId 是有效的数字，并且 name, type 存在
    if (nodeItem.treeid === undefined || nodeItem.nodeName === undefined || nodeItem.nodeType === undefined) {
      console.warn('convertToEchartsGraph: 发现无效节点数据，缺少 treeid, nodeName 或 nodeType:', nodeItem);
      return null; // 返回 null，稍后过滤掉
    }
    return {
      id: String(nodeItem.treeid), // 确保 id 是字符串
      name: nodeItem.nodeName,
      category: nodeItem.nodeType,
      // 根节点符号大一点，其他小一点
      symbolSize: nodeItem.parentId == null ? 50 : 30,
    };
  }).filter(node => node !== null); // 过滤掉无效节点

  const links = data
    .filter(item => (item as Record<string, unknown>).parentId != null) // 只处理有父节点的项
    .map(item => {
      const linkItem = item as Record<string, unknown>;
      // 确保 source 和 target 的 id 存在
      if (linkItem.parentId === undefined || linkItem.treeid === undefined) {
        console.warn('convertToEchartsGraph: 发现无效链接数据，缺少 parentId 或 treeid:', linkItem);
        return null; // 返回 null，稍后过滤掉
      }
      return {
        source: String(linkItem.parentId), // 确保 source 是字符串
        target: String(linkItem.treeid)    // 确保 target 是字符串
      };
    }).filter(link => link !== null); // 过滤掉无效链接

  // 收集所有独特的 nodeType 作为分类
  const categorySet = new Set(data.map(item => (item as Record<string, unknown>).nodeType).filter(type => type != undefined));
  const categories = Array.from(categorySet).map(name => ({ name }));

  console.log('转换后的节点 (nodes):', nodes);
  console.log('转换后的链接 (links):', links);
  console.log('转换后的类别 (categories):', categories);
  console.log('--- convertToEchartsGraph 函数结束 ---');

  return { nodes, links, categories };
}

// 获取数据并渲染图表
async function fetchAndRender() {
  console.log('--- fetchAndRender 函数开始 ---');
  console.log('chartRef.value 在 fetchAndRender 内部:', chartRef.value);

  // 确保 chartRef 已经指向了 DOM 元素
  if (!chartRef.value) {
    console.error('chartRef.value 为空，无法初始化 ECharts 实例。DOM 元素可能尚未挂载。');
    return;
  }

  if (!myChart) {
    console.log('正在初始化 ECharts 实例...');
    try {
      myChart = echarts.init(chartRef.value);
      console.log('ECharts 实例初始化成功:', myChart);
    } catch (e) {
      console.error('ECharts 实例初始化失败:', e);
      ElMessage.error('图表初始化失败！');
      return;
    }
  }

  myChart.showLoading({
    text: '数据加载中...',
    color: '#c23531',
    textColor: '#000',
    maskColor: 'rgba(255, 255, 255, 0.8)',
    zlevel: 0
  });
  console.log('ECharts 显示加载动画。');

  try {
    console.log('正在发送 API 请求: http://localhost:8080/api/factors/tree');
    const res = await axios.get('http://localhost:8080/api/factors/tree');
    console.log('API 请求成功，原始数据:', res.data);

    if (!res.data || res.data.length === 0) {
      console.warn('API 返回数据为空，无法渲染图表。');
      myChart.hideLoading();
      ElMessage.warning('未获取到因子树数据！');
      return;
    }

    // 转换数据
    const graph = convertToEchartsGraph(res.data);
    console.log('转换后的图谱数据 (graph):', graph);

    // 检查转换后的数据是否为空
    if (graph.nodes.length === 0) {
      console.warn('转换后的节点数据为空，无法渲染图表。');
      myChart.hideLoading();
      ElMessage.warning('转换后的节点数据为空，请检查数据结构！');
      return;
    }

    myChart.hideLoading();
    console.log('ECharts 隐藏加载动画。');

    const option = {
      title: {
        text: '因子树关系图谱',
        left: 'center'
      },
      tooltip: {
        trigger: 'item', // 鼠标悬停在节点或边上都触发
        formatter: function (params: any) {
          if (params.dataType === 'node') {
            // 节点提示框
            const dataItem = res.data.find((item: any) => String(item.treeid) === params.data.id);
            if (dataItem) {
              let tooltipHtml = `**${dataItem.nodeName}**<br/>类型: ${dataItem.nodeType}`;
              if (dataItem.factorId) {
                tooltipHtml += `<br/>因子ID: ${dataItem.factorId}`;
              }
              if (dataItem.description) {
                tooltipHtml += `<br/>描述: ${dataItem.description}`;
              }
              return tooltipHtml;
            }
          }
          // 边提示框可以根据需要添加
          return params.name;
        }
      },
      legend: [{
        data: graph.categories.map(a => a.name),
        top: 'bottom', // 图例放在底部
        left: 'center'
      }],
      animationDuration: 1500,
      series: [{
        name: '因子树',
        type: 'graph',
        layout: 'force', // 使用力引导布局，效果通常更好
        force: {
          repulsion: 1000, // 节点之间的斥力
          edgeLength: 100, // 边的长度
          gravity: 0.1,    // 节点受到的向中心的引力因子
          layoutAnimation: true // 布局动画
        },
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true, // 开启鼠标缩放和平移漫游
        label: {
          show: true, // 总是显示标签
          position: 'right', // 标签位置
          formatter: '{b}', // 显示节点名称
          color: '#333' // 标签颜色
        },
        labelLayout: {
          hideOverlap: true // 隐藏重叠的标签
        },
        lineStyle: {
          color: '#999', // 边的颜色
          curveness: 0.3, // 边的弯曲度
          width: 1 // 边的宽度
        },
        edgeLabel: { // 边上的标签，如果需要显示关系类型可以配置
          show: false
        },
        emphasis: {
          focus: 'adjacency', // 鼠标悬停时，高亮相邻节点和边
          lineStyle: {
            width: 5, // 高亮时边的宽度
            color: '#c23531' // 高亮时边的颜色
          },
          label: {
            show: true,
            fontWeight: 'bold'
          }
        },
        itemStyle: {
          // 节点样式，可以根据 category 设置不同的颜色
        }
      }]
    };

    console.log('ECharts 配置项 (option):', option);
    myChart.setOption(option);
    console.log('ECharts 选项已设置。');

    // 添加窗口大小调整事件监听器
    window.addEventListener('resize', resizeChart);
    console.log('已添加 resize 事件监听器。');

  } catch (error) {
    myChart?.hideLoading();
    console.error('因子树加载或渲染失败:', error);
    if (axios.isAxiosError(error)) {
        console.error('Axios 错误详情:', error.response || error.request || error.message);
        ElMessage.error(`因子树加载失败: ${error.message}`);
    } else {
        ElMessage.error('因子树加载失败，请检查控制台了解详情。');
    }
  }
  console.log('--- fetchAndRender 函数结束 ---');
}

// 调整图表大小
function resizeChart() {
  console.log('窗口大小改变，正在调整图表。');
  myChart?.resize();
}

onMounted(() => {
  console.log('--- 组件 onMounted 生命周期钩子 ---');
  // 使用 nextTick 确保 DOM 已经完全渲染
  nextTick(() => {
    console.log('nextTick 回调：chartRef.value 准备就绪:', chartRef.value);
    fetchAndRender();
  });
});

onBeforeUnmount(() => {
  console.log('--- 组件 onBeforeUnmount 生命周期钩子 ---');
  if (myChart) {
    console.log('移除 resize 事件监听器。');
    window.removeEventListener('resize', resizeChart);
    console.log('销毁 ECharts 实例。');
    myChart.dispose(); // 销毁图表实例，释放资源
    myChart = null;
  }
});
</script>

<style scoped>
/* 确保您的父容器有足够的高度，否则 height: 100% 可能无效 */
div {
  height: 100%; /* 例如，如果父组件是 flex 布局且有固定高度 */
}

/* 如果 chartRef 的 div 是根元素，可能需要更高层级的样式 */
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden; /* 防止滚动条出现 */
}

/*
:root {
  --primary-blue: #223354;
  --card-bg: #fff;
}
*/
</style>
