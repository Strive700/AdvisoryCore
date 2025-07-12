import { createRouter, createWebHistory } from 'vue-router'
import EmptyRouterView from '../views/main/EmptyRouterView.vue'
// 一级菜单1：基金管理
import BasicFundView from '../views/model1/BasicFundView.vue'
import FundManagerView from '../views/model1/FundManagerView.vue'
import FundCompanyView from '../views/model1/FundCompanyView.vue'
// 一级菜单2：因子分析
import FundOptionsView from '../views/model2/FundOptionsView.vue'
import FactorTreeView from '../views/model2/FactorTreeView.vue'
import CreateDerivedFactorView from '../views/model2/CreateDerivedFactorView.vue'
import CreateStyleFactorView from '../views/model2/CreateStyleFactorView.vue'
// 一级菜单3：衍生因子管理

// 一级菜单4：风控与预警

// 一级菜单5：基金备选库
import TradeOrderManagementView from '../views/model5/TradeOrderManagementView.vue';
import AccountRebalanceView from '../views/model5/AccountRebalanceView.vue'
import FailedOrdersView from '../views/model5/FailedOrdersView.vue'
import DeliveryOrderManagementView from '../views/model5/DeliveryOrderManagementView.vue'

const routes = [
  {
    path: '/model1',
    name: 'model1',
    meta: { title: '模块一' },
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
    meta: { title: '模块二' },
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
    meta: { title: '模块三' },
    component: EmptyRouterView,
    children: [] // 预留
  },
  {
    path: '/model4',
    name: 'model4',
    meta: { title: '模块四' },
    component:EmptyRouterView,
    children: [] // 预留
  },
  {
    path: '/model5',
    name: 'model5',
    meta: { title: '模块五' },
    component: EmptyRouterView,
    children: [
      { path: 'AccountRebalanceView', name: 'AccountRebalanceView', component: AccountRebalanceView, meta: { title: '账户调仓' } },
      { path: 'FailedOrdersView', name: 'FailedOrdersView', component: FailedOrdersView, meta: { title: '失败交易处理' } },
      {path: 'TradeOrderManagementView', name: 'TradeOrderManagementView', component: TradeOrderManagementView, meta: { title: '交易单管理' }},
      {path: 'DeliveryOrderManagementView', name: 'DeliveryOrderManagementView', component: DeliveryOrderManagementView, meta: { title: '交割单管理' }},
    ] // 预留
  },
  // 默认重定向到第一个有内容的页面
  { path: '/', redirect: '/model1/BasicFundView' }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
