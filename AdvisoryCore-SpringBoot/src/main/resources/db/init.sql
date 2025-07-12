CREATE DATABASE wealthadvisor;

use wealthadvisor;

-- 基金信息表
CREATE TABLE funds (
    fund_code VARCHAR(20) PRIMARY KEY,       -- 基金代码，主键
    fund_name VARCHAR(100) NOT NULL,         -- 基金名称
    fund_description VARCHAR(1000),                   -- 基金简介
    manager_id INT NOT NULL,                 -- 基金经理ID，外键，关联 fund_managers(manager_id)
    company_id INT NOT NULL,                 -- 基金管理公司ID，外键，关联 fund_companies(company_id)
    fund_type VARCHAR(50),                   -- 基金类型，如股票型、债券型、混合型
    category VARCHAR(50),                    -- 基金所属大类，如主动管理、被动指数
    operation_cycle VARCHAR(50),             -- 运行周期，如开放式、封闭式
    fund_size DOUBLE,                        -- 资金规模（单位：亿元）
    inception_date DATE,                     -- 成立日期
    fee_rate DOUBLE,                         -- 费率（%）
    stock_asset DOUBLE,                      -- 股票资产（亿元）
    cash_asset DOUBLE,                       -- 现金资产（亿元）
    bond_asset DOUBLE,                       -- 债券资产（亿元）
    deposit_asset DOUBLE,                    -- 银行存款资产（亿元）
    proportion DOUBLE                        -- 其他占比（%）
);

INSERT INTO funds (
    fund_code,
    fund_name,
    fund_description,
    manager_id,
    company_id,
    fund_type,
    category,
    operation_cycle,
    fund_size,
    inception_date,
    fee_rate,
    stock_asset,
    cash_asset,
    bond_asset,
    deposit_asset,
    proportion
) VALUES
-- 第一条数据：股票型基金
('000001', '华夏成长混合', '专注于成长型企业的混合型基金', 101, 1, '混合型', '主动管理', '开放式', 120.5, '2001-12-18', 1.5, 80.2, 10.5, 15.0, 4.3, 5.0),
('000002', '南方稳健债券', '以稳健收益为目标的债券型基金', 102, 2, '债券型', '主动管理', '开放式', 85.3, '2005-05-20', 1.2, 10.0, 20.5, 65.0, 4.5, 3.0),
('000003', '易方达蓝筹精选', '聚焦蓝筹股的股票型基金', 103, 3, '股票型', '主动管理', '开放式', 250.8, '2018-09-05', 1.8, 220.0, 15.0, 10.0, 5.0, 2.0),
('000004', '嘉实沪深300ETF', '跟踪沪深300指数的被动指数基金', 104, 4, '股票型', '被动指数', '开放式', 320.0, '2012-05-07', 0.5, 300.0, 10.0, 5.0, 5.0, 1.0),
('000005', '广发稳健增长', '平衡型混合型基金', 105, 5, '混合型', '主动管理', '开放式', 180.6, '2003-11-12', 1.6, 110.0, 25.0, 40.0, 5.0, 5.0);

-- 基金标签表
CREATE TABLE fund_tags (
    tagid INT PRIMARY KEY AUTO_INCREMENT,        -- 主键ID
    fund_code VARCHAR(30),                    -- 基金代码，外键
    tag VARCHAR(50)                           -- 标签，如“白酒”等
);

-- 核心指标与评分表
CREATE TABLE fund_core_metrics (
    coreid INT PRIMARY KEY AUTO_INCREMENT,        -- 主键ID
    fund_code VARCHAR(30),                    -- 基金代码，外键
    stat_date DATE,                           -- 统计日期
    return_1m DOUBLE,                         -- 近一月收益率
    return_ytd DOUBLE,                        -- 今年以来收益率
    max_drawdown_1y DOUBLE,                   -- 近一年最大回撤
    annual_sharpe DOUBLE,                     -- 年化夏普率
    risk_level VARCHAR(20),                   -- 风险等级
    quality_score DOUBLE,                     -- 优品基金评分
    -- 雷达图数据
    risk_adj_score DOUBLE,                    -- 风险调整收益评分“风险调整收益”是衡量基金或投资在考虑了风险因素后**，所获得的“单位风险回报”的指标）
    rating VARCHAR(20),                       -- 基金评级
    asset_score DOUBLE,                       -- 资产规模评分
    research_score DOUBLE,                    -- 机构研究支持评分
    risk_mgmt_score DOUBLE,                   -- 风险管理评分
    tenure_score DOUBLE                       -- 最近基金经理任职年限评分
);

-- 基金持仓表
CREATE TABLE fund_holdings (
    holdingid INT PRIMARY KEY AUTO_INCREMENT,        -- 主键ID
    fund_code VARCHAR(30),                    -- 基金代码，外键
    stock_code VARCHAR(20),                   -- 股票代码
    stock_name VARCHAR(100),                  -- 股票名称
    ratio DOUBLE,                             -- 占比（占基金总资产的比例）
    market_value DOUBLE,                      -- 持仓市值
    share_count DOUBLE,                       -- 持有股数
    disclosure_date DATE,                     -- 披露日期（季度末）
    ranking INT,                              -- 排名
    industry_tag VARCHAR(50)                  -- 工业标签
);


-- 基金净值历史表
CREATE TABLE fund_nav_history (
    historyid INT PRIMARY KEY AUTO_INCREMENT,        -- 主键ID
    fund_code VARCHAR(30),                    -- 基金代码，外键
    nav_date DATE,                            -- 净值对应日期
    unit_nav DOUBLE,                          -- 单位净值
    accumulated_nav DOUBLE,                   -- 累计净值
    daily_return DOUBLE,                      -- 当日涨跌幅（%）
    share_total DOUBLE                        -- 基金当日份额（份额×单位净值 = 总资产）
    -- 历史资产表不在单独建立而是由基金资产 = 单位净值 × 总份额算出）
);

-- 基金公告表
CREATE TABLE fund_announcements (
    announcementid INT PRIMARY KEY AUTO_INCREMENT,        -- 主键ID
    fund_code VARCHAR(30),                    -- 基金代码，外键
    title VARCHAR(255),                       -- 公告标题
    type VARCHAR(50),                         -- 公告类型
    url VARCHAR(200),                         -- 公告链接或PDF地址
    pub_date DATE,                            -- 公告发布日期
    summary VARCHAR(200),                     -- 公告摘要
    source VARCHAR(100)                       -- 发布来源
);

-- 基金公司表
CREATE TABLE fund_companies (
    company_name VARCHAR(100) PRIMARY KEY,     -- 基金公司名称，主键
    establishment_date DATE,                  -- 设立日期
    registered_capital DOUBLE,                -- 注册资本
    first_fund_date DATE,                     -- 首只基金成立日期
    manager_count INT,                        -- 基金经理人数
    fund_count INT,                           -- 基金数量
    equity_capital DOUBLE,                    -- 主动偏股型基金资本规模
    effective_assets DOUBLE,                  -- 有效资产规模
    equity_return DOUBLE,                     -- 权益类基金历史收益率
    bond_return DOUBLE                        -- 债券类基金历史收益率
);

-- 基金经理表
CREATE TABLE fund_managers (
    manager_name VARCHAR(100) PRIMARY KEY,    -- 基金经理名字，主键
    company_name VARCHAR(100),                -- 所属基金公司，外键
    managed_assets DOUBLE,                    -- 在管基金规模
    managed_count INT,                        -- 在管基金数量
    highest_education VARCHAR(50),            -- 最高学历
    tenure_years INT,                         -- 任职年限
    effective_assets DOUBLE,                  -- 有效资产规模
    equity_return DOUBLE,                     -- 权益类基金历史收益率
    bond_return DOUBLE,                       -- 债券类基金历史收益率
    annualized_return DOUBLE,                 -- 任职年化收益率
    win_rate DOUBLE,                          -- 管理胜率
    manager_id INT
);

-- 基金备选库表
CREATE TABLE fund_watchlist (
    watchlistid INT PRIMARY KEY AUTO_INCREMENT,        -- 主键ID
    fund_code VARCHAR(30),                    -- 基金代码，外键
    reason VARCHAR(200),                              -- 入库原因
    alert_flag BOOLEAN                        -- 是否预警
);

-- 产品预警表
CREATE TABLE fund_alerts (
    alertid INT PRIMARY KEY AUTO_INCREMENT,        -- 主键ID
    fund_code VARCHAR(30),                    -- 基金代码，外键
    alert_param VARCHAR(100),                 -- 预警参数
    trigger_date DATE,                        -- 预警触发日期
    actual_value DOUBLE,                      -- 实际触发数值
    threshold DOUBLE,                         -- 阈值（参考配置）
    description VARCHAR(200),                 -- 预警说明内容
    status TINYINT,                           -- 状态（0=未处理，1=处理中，2=已处理）
    create_time DATETIME                      -- 创建时间
);

-- 因子管理系统

-- 因子树结构表
CREATE TABLE factor_tree (
    treeid INT PRIMARY KEY AUTO_INCREMENT,         -- 主键ID
    parent_id INT,                                 -- 父节点ID
    node_name VARCHAR(100),                        -- 因子节点名称
    node_type VARCHAR(20),                         -- 节点类型: theme / dimension / factor
    factor_id INT,                                 -- 关联实际因子ID
    is_leaf BOOLEAN,                               -- 是否为最后一层
    sort_order INT,                                -- 展示排序顺序
    description TEXT                               -- 描述
);

-- 因子定义表
CREATE TABLE factor_definitions (
    definitionid INT PRIMARY KEY AUTO_INCREMENT,   -- 主键ID
    name VARCHAR(100),                             -- 因子名称
    display_name VARCHAR(100),                     -- 展示名称
    factor_type VARCHAR(50),                       -- 因子类型
    data_type VARCHAR(50),                         -- 数据类型
    calc_method VARCHAR(200),                      -- 计算方法描述（自然语言、SQL、Python等）
    update_frequency VARCHAR(50),                  -- 更新频率
    enabled BOOLEAN                                -- 是否启用
);

-- 衍生因子表
CREATE TABLE derived_factors (
    factorid INT PRIMARY KEY AUTO_INCREMENT,             -- 主键ID
    derived_id INT,                                -- 衍生因子ID（外键）
    base_id INT,                                   -- 基础因子ID（外键）
    weight DOUBLE                                  -- 因子权重
);

-- 自定义风格因子
CREATE TABLE custom_style_factors (
    styleid INT PRIMARY KEY AUTO_INCREMENT,             -- 主键ID
    name VARCHAR(100),                             -- 因子名称
    display_name VARCHAR(100),                     -- 因子展示名
    description VARCHAR(200),                      -- 因子解释说明
    calc_method VARCHAR(200),                      -- 计算方法（自然语言、SQL、Python、脚本ID）
    create_time DATETIME,                          -- 创建时间
    update_frequency VARCHAR(50),                  -- 更新频率
    enabled BOOLEAN,                               -- 是否启用
    style_tag VARCHAR(50)                          -- 风格标签
);

-- 自定义风格因子组合表
CREATE TABLE custom_style_factor_mix (
    mixid INT PRIMARY KEY AUTO_INCREMENT,             -- 主键ID
    style_factor_id INT,                           -- 自定义因子ID（外键）
    factor_id INT,                                 -- 组合中的因子ID（外键）
    weight DOUBLE,                                 -- 权重
    normalized BOOLEAN                             -- 是否归一化
);

-- 策略管理子系统

-- 大类指数树（修改后）
CREATE TABLE index_tree (
    indexid INT PRIMARY KEY AUTO_INCREMENT,        -- 主键ID
    parent_id INT,                                 -- 父节点ID
    node_name VARCHAR(100),                        -- 指数节点名称
    node_type VARCHAR(20),                         -- 节点类型
    index_id INT,                                  -- 关联指数ID
    is_leaf BOOLEAN,                               -- 是否为叶子节点
    sort_order INT,                                -- 展示排序顺序
    description VARCHAR(200)                               -- 描述
);

drop table index_definitions;
-- 大类指数定义表（修改后）//定死的
delete from index_definitions where definitionid<12;
CREATE TABLE index_definitions (
    definitionid INT PRIMARY KEY AUTO_INCREMENT,   -- 主键ID
    name VARCHAR(100),                             -- 指数名称
    code VARCHAR(50),                              -- 指数代码
    category VARCHAR(50),                          -- 分类
    index_type VARCHAR(50),                        -- 指数类型(基础/自创)
    enabled BOOLEAN,                               -- 是否启用
    description VARCHAR(500),                      -- 描述
    expected_return DECIMAL(5,2),                  -- 预期收益(%)
    expected_std_dev DECIMAL(5,2),                 -- 预期标准差(%)
    asset_weight DECIMAL(5,2),                     -- 资产权重(%)
    constituent_funds JSON                         -- 成份基金列表(JSON格式)
);

-- 方案表（修改后）
CREATE TABLE plans (
    plan_id INT PRIMARY KEY AUTO_INCREMENT,  -- 方案ID
    plan_name VARCHAR(100) NOT NULL,         -- 方案名称
    index_list JSON NOT NULL,                -- 指数列表(JSON数组格式)
    start_date DATE,                         -- 开始日期(如2019-11-20)
    end_date DATE                            -- 结束日期(如2020-01-20)
);

-- 基金-指数关联表（修改后）
CREATE TABLE fund_index_mapping (
    fund_id VARCHAR(20) PRIMARY KEY,       -- 基金ID（主键）
    index_names JSON                       -- 指数名称列表（JSON数组格式）
);

-- 策略组合表
CREATE TABLE asset_allocation (
    asset_id INT PRIMARY KEY AUTO_INCREMENT,       -- 主键ID
    name VARCHAR(100),                             -- 组合名称
    benchmark VARCHAR(100),                        -- 比较基准
    feature VARCHAR(200),                          -- 组合特色
    audience VARCHAR(100),                         -- 适用人群
    method VARCHAR(50),                            -- 配比方式
    weight_type VARCHAR(50),                       -- 权重配置类型
    fund_code VARCHAR(30),                         -- 基金代码（外键）
    risk_level VARCHAR(50)                         -- 风险等级
);
INSERT INTO asset_allocation (name, benchmark, feature, audience, method, weight_type, fund_code, risk_level) VALUES
    ('稳健增长组合', '沪深300指数', '平衡风险与收益，适合长期持有', '保守型投资者', '等权重', '固定比例', '005827', '中低风险'),
    ('成长先锋组合', '中证500指数', '侧重成长股投资，追求较高收益', '进取型投资者', '核心卫星', '动态调整', '001838', '中高风险'),
    ('全球配置组合', 'MSCI全球指数', '分散投资于全球市场，降低单一市场风险', '高净值客户', '风险平价', '灵活配置', '000988', '中等风险'),
    ('固收增强组合', '中债综合指数', '以固定收益为主，适度配置权益资产', '稳健型投资者', '目标日期', '阶梯式', '003376', '低风险'),
    ('行业轮动组合', '中证800指数', '根据行业景气度轮动配置', '专业投资者', '动量策略', '主动管理', '001736', '高风险');

-- 资产配比列表
CREATE TABLE asset_allocation_list (
    listid INT PRIMARY KEY AUTO_INCREMENT,         -- 主键ID
    allocation_id INT,                             -- 组合ID（外键）
    fund_code VARCHAR(30),                         -- 基金代码（外键）
    weight DOUBLE                                  -- 配置权重
);

-- 大类因子表
CREATE TABLE category_factors (
    category_id INT PRIMARY KEY AUTO_INCREMENT,   -- 主键ID
    name VARCHAR(100),                            -- 大类因子名称
    description VARCHAR(200),                     -- 描述
    factor_list JSON                              -- 包含的因子ID列表（基础因子和衍生因子，JSON数组）
);
INSERT INTO category_factors (name, description, factor_list) VALUES
('收益风险类', '评估基金收益与风险平衡能力的综合指标', '[1, 3, 5]'),
('成本费用类', '反映基金运作成本和管理效率的指标', '[2, 4]'),
('资金属性类', '衡量基金资金规模和流动性的指标', '[6, 7]'),
('持仓结构类', '分析基金资产配置和行业集中度的指标', '[8, 9]');

-- 基金大类因子映射表
CREATE TABLE fund_factor_mapping (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fund_id VARCHAR(20),         -- 基金ID（外键，关联funds）
    factor_names JSON            -- 大类因子名称列表（JSON数组，关联category_factors.name）
    -- 也可以用factor_ids JSON，如果用ID更规范
);
-- 插入基金与大类因子的映射关系
INSERT INTO fund_factor_mapping (fund_id, factor_names) VALUES
('000001', '["收益风险类", "成本费用类"]'),
('000002', '["资金属性类", "持仓结构类"]'),
('000003', '["收益风险类", "成本费用类", "资金属性类", "持仓结构类"]');

-- FOF组合表
CREATE TABLE fof_portfolio (
    fofid INT PRIMARY KEY AUTO_INCREMENT,          -- 主键ID
    portfolio_name VARCHAR(100),                   -- 组合名称
    benchmark_index VARCHAR(100),                  -- 比较基准
    portfolio_feature VARCHAR(200),                -- 组合特色
    target_audience VARCHAR(100),                  -- 适用人群
    allocation_method VARCHAR(50),                 -- 配比方式
    weighting_scheme VARCHAR(50),                  -- 权重配置类型
    representative_fund_code VARCHAR(30),          -- 基金代码（外键）
    risk_rating VARCHAR(50)                        -- 风险等级
);

-- 约束组定义表
CREATE TABLE constraint_groups (
    groupid INT PRIMARY KEY AUTO_INCREMENT,        -- 主键ID
    index_name VARCHAR(100),                       -- 挑选指数名称（外键）
    reference_metric VARCHAR(100),                 -- 参考指标
    ma_reference VARCHAR(50),                      -- 参考日均线
    buy_limit INT,                                 -- 申购约束限制数量
    sell_limit INT,                                -- 赎回约束限制数量
    user_id INT                                    -- 用户ID
);

-- 具体约束项表
CREATE TABLE constraint_items (
    itemid INT PRIMARY KEY AUTO_INCREMENT,         -- 主键ID
    group_id INT,                                  -- 所属约束组ID（外键）
    type VARCHAR(20),                              -- 约束类型（申购/赎回）
    param_name VARCHAR(100),                       -- 参数名称
    operator VARCHAR(20),                          -- 操作符
    threshold DOUBLE,                              -- 阈值
    condition_relation VARCHAR(10)                 -- 条件关系
);

-- 择时基金组合
CREATE TABLE timing_portfolios (
    timingid INT PRIMARY KEY AUTO_INCREMENT,       -- 主键ID
    name VARCHAR(100),                             -- 组合名称
    benchmark VARCHAR(100),                        -- 比较基准
    feature VARCHAR(200),                          -- 组合特色
    audience VARCHAR(100),                         -- 适用人群
    scale DOUBLE,                                  -- 资产规模
    fee_rate DOUBLE,                               -- 申购费率
    allocation_method VARCHAR(50),                 -- 配比方式(自定义等等)
    fund_allocation JSON                           -- 组合基金和权重列表(JSON格式)
);

-- 择时组合信息
CREATE TABLE timing_portfolio_items (
    id INT PRIMARY KEY AUTO_INCREMENT,             -- 主键ID
    portfolio_id INT,                              -- 择时组合ID（外键）
    fund_code VARCHAR(30),                         -- 基金代码（外键）
    weight DOUBLE,                                 -- 配置权重
    fee_rate DOUBLE                                -- 申购费率
);

-- 策略表
CREATE TABLE strategies (
    strategyid INT PRIMARY KEY AUTO_INCREMENT,     -- 主键ID
    name VARCHAR(100),                             -- 策略名称
    strategy_type VARCHAR(50),                     -- 策略类型
    description VARCHAR(500),                      -- 策略描述
    strategy_ref_id INT,                           -- 对应策略ID
    create_time DATETIME,                          -- 创立时间
    scale DOUBLE,                                  -- 资产规模
    funds VARCHAR(500),                            -- 成份基金
    fee_rate DOUBLE,                               -- 费率
    return_rate DOUBLE,                            -- 策略收益
    annual_return DOUBLE,                          -- 年化收益
    volatility DOUBLE,                             -- 波动率
    sharpe_ratio DOUBLE,                           -- 夏普比率
    max_drawdown DOUBLE,                           -- 最大回撤
    win_rate DOUBLE                               -- 平仓胜率
);

-- 组合表
CREATE TABLE portfolios (
    id INT PRIMARY KEY AUTO_INCREMENT,             -- 组合ID
    name VARCHAR(100),                             -- 组合名称
    risk_level VARCHAR(50),                        -- 风险等级
    strategy_type VARCHAR(50),                     -- 策略类型
    strategy_id INT,                               -- 对应组合ID（外键）
    listed BOOLEAN                                 -- 是否上架
);

-- 触发调仓配置表
CREATE TABLE rebalance_config (
    configid INT PRIMARY KEY AUTO_INCREMENT,       -- 主键ID
    auto BOOLEAN,                                  -- 是否自动再平衡
    strategy_id INT,                               -- 策略ID（外键）
    trigger_type VARCHAR(50),                      -- 触发方式
    change_ratio DOUBLE,                           -- 变化比例
    frequency VARCHAR(50)                          -- 平衡频率
);

-- 调仓任务主表
CREATE TABLE rebalance_tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,             -- 主键ID
    strategy_id INT,                               -- 所属策略
    trigger_time DATETIME,                         -- 触发时间
    task_type VARCHAR(50),                         -- 调仓类型
    execute_time DATETIME,                         -- 实际执行时间
    reason VARCHAR(500),                           -- 调仓原因
    operator VARCHAR(100)                          -- 操作人或系统标识
);

-- 调仓明细表
CREATE TABLE rebalance_details (
    rebalanceid INT PRIMARY KEY AUTO_INCREMENT,    -- 主键ID
    task_id INT,                                   -- 调仓任务ID（外键）
    fund_code VARCHAR(30),                         -- 基金代码（外键）
    old_weight DOUBLE,                             -- 原配置权重
    new_weight DOUBLE,                             -- 新配置权重
    diff DOUBLE                                    -- 差值
);

-- 客户与组合绑定表
CREATE TABLE customer_portfolios (
    id INT PRIMARY KEY AUTO_INCREMENT,             -- 主键ID
    customer_id INT,                               -- 用户ID（外键）
    portfolio_id INT,                              -- 组合ID（外键）
    effective_time DATETIME                        -- 生效时间
);

-- 交易指令表
CREATE TABLE trade_orders (
    tradeid INT PRIMARY KEY AUTO_INCREMENT,             -- 主键ID
    customer_id INT,                               -- 客户ID（外键）
    fund_code VARCHAR(30),                         -- 基金代码（外键）
    portfolio_id INT,                              -- 组合ID（外键）
    rebalance_id INT,                              -- 组合调仓代码（外键）
    amount DOUBLE,                                 -- 交易金额
    shares DOUBLE,                                 -- 交易份额
    trade_type VARCHAR(20),                        -- 交易类型
    reason VARCHAR(200),                                   -- 交易原因
    trade_time DATETIME,                           -- 交易时间
    status VARCHAR(20),                            -- 指令状态
    fail_reason VARCHAR(200),                              -- 失败原因
    replace_order_id INT                           -- 替代订单ID
);

-- 交割单表
CREATE TABLE settlement_orders (
    id INT PRIMARY KEY AUTO_INCREMENT,             -- 主键ID
    batch_no VARCHAR(50),                          -- 批次编号
    portfolio_name VARCHAR(100),                   -- 组合名称
    portfolio_id INT,                              -- 组合ID
    fund_name VARCHAR(100),                        -- 基金名称
    fund_code VARCHAR(30),                         -- 基金代码
    trade_order_id INT                             -- 交易单ID（外键）
);