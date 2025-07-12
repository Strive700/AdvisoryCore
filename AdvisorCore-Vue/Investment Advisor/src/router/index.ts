import { createRouter, createWebHistory } from 'vue-router'
import EmptyRouterView from '../views/main/EmptyRouterView.vue'
import BasicFundView from '../views/model1/BasicFundView.vue'
import FundManagerView from '../views/model1/FundManagerView.vue'
import FundCompanyView from '../views/model1/FundCompanyView.vue'
import FundOptionsView from '../views/model2/FundOptionsView.vue'
import FactorTreeView from '../views/model2/FactorTreeView.vue'
import CreateDerivedFactorView from '../views/model2/CreateDerivedFactorView.vue'
import CreateStyleFactorView from '../views/model2/CreateStyleFactorView.vue'
import TradeOrderManagementView from '../views/model5/TradeOrderManagementView.vue';
import AccountRebalanceView from '../views/model5/AccountRebalanceView.vue'
import FailedOrdersView from '../views/model5/FailedOrdersView.vue'
import DeliveryOrderManagementView from '../views/model5/DeliveryOrderManagementView.vue'

const routes = [
  {
    path: '/model1',
    name: 'model1',
    meta: { title: '基金研究子系统' },
    component: EmptyRouterView,
    children: [
      { path: 'BasicFundView', name: 'BasicFundView', component: BasicFundView, meta: { title: '公募基金筛选' } },
      { path: 'FundManagerView', name: 'FundManagerView', component: FundManagerView, meta: { title: '基金经理筛选' } },
      { path: 'FundCompanyView', name: 'FundCompanyView', component: FundCompanyView, meta: { title: '公司基金筛选' } },

    ]
  },
  {
    path: '/model2',
    name: 'model2',
    meta: { title: '因子管理子系统' },
    component: EmptyRouterView,
    children: [
      { path: 'FundOptionsView', name: 'FundOptionsView', component: FundOptionsView, meta: { title: '备选库管理' } },
      { path: 'FactorTreeView', name: 'FactorTreeView', component: FactorTreeView, meta: { title: '因子树' } },
      { path: 'CreateDerivedFactorView', name: 'CreateDerivedFactorView', component: CreateDerivedFactorView, meta: { title: '创建衍生因子' } },
      { path: 'CreateStyleFactorView', name: 'CreateStyleFactorView', component: CreateStyleFactorView, meta: { title: '创建风格因子' } },
    ]
  },
{
    path: '/model3',
    name: 'model3',
    meta: { title: '策略管理子系统' },
    children: [
      {
        path: 'AssetMatrixView',
        name: 'AssetMatrixView',
        component: () => import('../views/model3/AssetMatrixView.vue'),
        meta: { title: '大类资产配置策略管理' }
      },
      {
        path: 'AssetInfoView',
        name: 'AssetInfoView',
        component: () => import('../views/model3/AssetInfoView.vue'),
        meta: { hidden: true }
      },
      {
        path: 'AssetAllocationView',
        name: 'AssetAllocationView',
        component: () => import('../views/model3/AssetAllocationView.vue'),
        meta: { hidden: true }
      },

      {
        path: 'FundFilterView',
        name: 'FundFilterView',
        component: () => import('../views/model3/FundFilterView.vue'),
        meta: {  hidden: true }
      },
      {
        path: 'CreatePortfolioView',
        name: 'CreatePortfolioView',
        component: () => import('../views/model3/CreatePortfolioView.vue'),
        meta: { hidden: true }
      },
      {
        path: 'FOFView',
        name: 'FOFView',
        component: () => import('../views/model3/FOFView.vue'),
        meta: { title: 'FOF组合管理' }
      },
      {
        path: 'FOFQuantifyView',
        name: 'FOFQuantifyView',
        component: () => import('../views/model3/FOFQuantifyView.vue'),
        meta: { title: '基金量化', hidden: true }
      },
      {
        path: 'FOFAssetWeightView',
        name: 'FOFAssetWeightView',
        component: () => import('../views/model3/FOFAssetWeightView.vue'),
        meta: { title: '选择资产权重', hidden: true }
      },
      {
        path: 'CreateFOFPortfolioView',
        name: 'CreateFOFPortfolioView',
        component: () => import('../views/model3/CreateFOFPortfolioView.vue'),
        meta: { title: '创建FOF组合', hidden: true }
      },
      {
        path: 'SelectIndexConstituentFundView',
        name: 'SelectIndexConstituentFundView',
        component: () => import('../views/model3/SelectIndexConstituentFundView.vue'),
        meta: { title: '挑选指数的成份基金', hidden: true }
      },
      {
        path: 'SetConstituentFundWeightView',
        name: 'SetConstituentFundWeightView',
        component: () => import('../views/model3/SetConstituentFundWeightView.vue'),
        meta: { title: '设置成份基金权重并创建', hidden: true }
      },
      {
        path: 'IndexCreateView',
        name: 'IndexCreateView',
        component: () => import('../views/model3/IndexCreateView.vue'),
        meta: { title: '创建基金指数组合'}
      },
      {
        path: 'AssetResearchView',
        name: 'AssetResearchView',
        component: () => import('../views/model3/AssetResearchView.vue'),
        meta: { title: '大类研究', hidden: true }
      },
      {
        path: 'AssetAllocation2View',
        name: 'AssetAllocation2View',
        component: () => import('../views/model3/AssetAllocation2View.vue'),
        meta: { title: '资产配置', hidden: true }
      },
      {
        path: 'FundPortfolioView',
        name: 'FundPortfolioView',
        component: () => import('../views/model3/FundPortfolioView.vue'),
        meta: { title: '基金组合', hidden: true }
      },
      {
        path: 'IndexTimingView',
        name: 'IndexTimingView',
        component: () => import('../views/model3/IndexTimingView.vue'),
        meta: { title: '创建择时组合'}
      },
      {
        path: 'TimingFundFilterView',
        name: 'TimingFundFilterView',
        component: () => import('../views/model3/TimingFundFilterView.vue'),
        meta: { title: '基金筛选', hidden: true }
      },
      {
        path: 'TimingFundPortfolioView',
        name: 'TimingFundPortfolioView',
        component: () => import('../views/model3/TimingFundPortfolioView.vue'),
        meta: { title: '基金组合', hidden: true }
      },
      {
        path: 'StrategyDetailView',
        name: 'StrategyDetailView',
        component: () => import('../views/model3/StrategyDetailView.vue'),
        meta: { title: '策略详情', hidden: true }
      }
    ]
  },
  {
    path: '/model4',
    name: 'model4',
    meta: { title: '组合产品管理子系统' },
    children: [
      {
        path: 'PortfolioBasicInfoView',
        name: 'PortfolioBasicInfoView',
        component: () => import('../views/model4/PortfolioBasicInfoView.vue'),
        meta: { title: '创建组合产品' }
      },
      {
        path: 'PortfolioBuildView',
        name: 'PortfolioBuildView',
        component: () => import('../views/model4/PortfolioBuildView.vue'),
        meta: { title: '建仓', hidden: true}
      },
      {
        path: 'ProductDetailView',
        name: 'ProductDetailView',
        component: () => import('../views/model4/ProductDetailView.vue'),
        meta: { title: '组合产品详情'}
      },
      {
        path: 'FundPoolView',
        name: 'FundPoolView',
        component: () => import('../components/model4/FundPoolView.vue'),
        meta: { title: '可选基金池', hidden: true }
      }
    ]
  },
  {
    path: '/model5',
    name: 'model5',
    meta: { title: '交易管理子系统' },
    component: EmptyRouterView,
    children: [
      { path: 'AccountRebalanceView', name: 'AccountRebalanceView', component: AccountRebalanceView, meta: { title: '账户调仓' } },
      { path: 'FailedOrdersView', name: 'FailedOrdersView', component: FailedOrdersView, meta: { title: '失败交易处理' } },
      {path: 'TradeOrderManagementView', name: 'TradeOrderManagementView', component: TradeOrderManagementView, meta: { title: '交易单管理' }},
      {path: 'DeliveryOrderManagementView', name: 'DeliveryOrderManagementView', component: DeliveryOrderManagementView, meta: { title: '交割单管理' }},
    ]
  },
  { path: '/', redirect: '/model1/BasicFundView' }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
