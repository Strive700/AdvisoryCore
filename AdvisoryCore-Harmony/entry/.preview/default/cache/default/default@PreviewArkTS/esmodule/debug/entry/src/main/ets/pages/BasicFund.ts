if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface BasicFundPage_Params {
    filters?: Filters;
    tableData?: Fund[];
    total?: number;
    pageSize?: number;
    currentPage?: number;
    fundImageDialogVisible?: boolean;
    fundImageData?: FundImageData;
    filterOptions?: FilterOption[];
}
import RequestAxios from "@bundle:com.example.component/entry/ets/utility/BaseRequest";
import promptAction from "@ohos:promptAction";
// 定义基础数据类型
type FundFieldValue = string | number | boolean | null | undefined;
// 定义 Fund 接口
interface Fund {
    fundCode: string;
    fundName: string;
    fundSize: number;
    fundType: string;
    inceptionDate: string;
    managerName: string;
    maxDrawdown1y: number;
    navDate: string;
    operationCycle: string;
    qualityScore: number;
    return1m: number;
    returnYtd: number;
    unitNav: number;
    description?: string;
}
// 定义 FundImageData 类
class FundImageData {
    fund_name: string = '';
    fund_code: string = '';
    fund_type: string = '';
    fund_size: number = 0;
    manager_name: string = '';
    inception_date: string = '';
    operation_cycle: string = '';
    industry_tag?: string;
    rating?: string;
    fund_description?: string;
    quality_score?: number;
    research_score?: number;
    risk_adj_score?: number;
    tenure_score?: number;
    return_ytd?: number;
    return_1m?: number;
    max_drawdown_1y?: number;
    annual_sharpe?: number;
    risk_level?: string;
    fee_rate?: number;
    ranking?: number;
    stock_asset?: number;
    bond_asset?: number;
    cash_asset?: number;
    deposit_asset?: number;
    accumulated_nav?: number;
    unit_nav?: number;
    nav_date?: string;
    disclosure_date?: string;
    market_value?: number;
    stock_name?: string;
    stock_code?: string;
    share_count?: number;
    share_total?: number;
}
// 定义筛选选项接口
interface FilterOption {
    label: string;
    key: keyof Filters;
    options: string[];
}
// 定义筛选条件类
class Filters {
    code: string = '';
    time: string = '';
    scale: string = '';
    managerYear: string = '';
    ytdReturn: string = '';
    fee: string = '';
    barra: string = '';
}
// 定义范围值接口
interface RangeValue {
    min: number | null;
    max: number | null;
}
// 定义详情项接口
interface DetailItem {
    label: string;
    value: string;
}
// 定义API响应接口
class QueryWithJoinData {
    records: Fund[] = [];
    total: number = 0;
}
interface QueryWithJoinResponse {
    data: QueryWithJoinData;
}
interface FundImageResponse {
    data: Record<string, Partial<FundImageData>>;
}
// 默认基金画像数据
const DEFAULT_FUND_IMAGE_DATA = new FundImageData();
// 查询参数类
class FundQueryParams {
    page: number;
    pageSize: number;
    scale: RangeValue | null;
    managerTenure: RangeValue | null;
    yieldThisYear: RangeValue | null;
    feeRate: RangeValue | null;
    styleTag: string;
    code: string;
    constructor(page: number, pageSize: number, scale: RangeValue | null, managerTenure: RangeValue | null, yieldThisYear: RangeValue | null, feeRate: RangeValue | null, styleTag: string, code: string) {
        this.page = page;
        this.pageSize = pageSize;
        this.scale = scale;
        this.managerTenure = managerTenure;
        this.yieldThisYear = yieldThisYear;
        this.feeRate = feeRate;
        this.styleTag = styleTag;
        this.code = code;
    }
}
class BasicFundPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__filters = new ObservedPropertyObjectPU(new Filters(), this, "filters");
        this.__tableData = new ObservedPropertyObjectPU([], this, "tableData");
        this.__total = new ObservedPropertySimplePU(0, this, "total");
        this.__pageSize = new ObservedPropertySimplePU(10, this, "pageSize");
        this.__currentPage = new ObservedPropertySimplePU(1, this, "currentPage");
        this.__fundImageDialogVisible = new ObservedPropertySimplePU(false, this, "fundImageDialogVisible");
        this.__fundImageData = new ObservedPropertyObjectPU(new FundImageData(), this, "fundImageData");
        this.filterOptions = [
            { label: '基金成立时间:', key: 'time', options: ['5-10年', '3-5年', '1-3年', '1年以内'] },
            { label: '基金规模:', key: 'scale', options: ['100亿以上', '80-100亿', '50-80亿', '30-50亿'] },
            { label: '基金经理任职年限:', key: 'managerYear', options: ['10年以上', '5-10年', '3-5年', '1-3年'] },
            { label: '今年以来收益率:', key: 'ytdReturn', options: ['20%以上', '10-20%', '0-10%', '0%以下'] },
            { label: '管理费率:', key: 'fee', options: ['1.5%以上', '1-1.5%', '0.5-1%', '0.5%以下'] },
            { label: 'Barra风格归因:', key: 'barra', options: ['成长', 'value', '平衡'] }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: BasicFundPage_Params) {
        if (params.filters !== undefined) {
            this.filters = params.filters;
        }
        if (params.tableData !== undefined) {
            this.tableData = params.tableData;
        }
        if (params.total !== undefined) {
            this.total = params.total;
        }
        if (params.pageSize !== undefined) {
            this.pageSize = params.pageSize;
        }
        if (params.currentPage !== undefined) {
            this.currentPage = params.currentPage;
        }
        if (params.fundImageDialogVisible !== undefined) {
            this.fundImageDialogVisible = params.fundImageDialogVisible;
        }
        if (params.fundImageData !== undefined) {
            this.fundImageData = params.fundImageData;
        }
        if (params.filterOptions !== undefined) {
            this.filterOptions = params.filterOptions;
        }
    }
    updateStateVars(params: BasicFundPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__filters.purgeDependencyOnElmtId(rmElmtId);
        this.__tableData.purgeDependencyOnElmtId(rmElmtId);
        this.__total.purgeDependencyOnElmtId(rmElmtId);
        this.__pageSize.purgeDependencyOnElmtId(rmElmtId);
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
        this.__fundImageDialogVisible.purgeDependencyOnElmtId(rmElmtId);
        this.__fundImageData.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__filters.aboutToBeDeleted();
        this.__tableData.aboutToBeDeleted();
        this.__total.aboutToBeDeleted();
        this.__pageSize.aboutToBeDeleted();
        this.__currentPage.aboutToBeDeleted();
        this.__fundImageDialogVisible.aboutToBeDeleted();
        this.__fundImageData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __filters: ObservedPropertyObjectPU<Filters>;
    get filters() {
        return this.__filters.get();
    }
    set filters(newValue: Filters) {
        this.__filters.set(newValue);
    }
    private __tableData: ObservedPropertyObjectPU<Fund[]>;
    get tableData() {
        return this.__tableData.get();
    }
    set tableData(newValue: Fund[]) {
        this.__tableData.set(newValue);
    }
    private __total: ObservedPropertySimplePU<number>;
    get total() {
        return this.__total.get();
    }
    set total(newValue: number) {
        this.__total.set(newValue);
    }
    private __pageSize: ObservedPropertySimplePU<number>;
    get pageSize() {
        return this.__pageSize.get();
    }
    set pageSize(newValue: number) {
        this.__pageSize.set(newValue);
    }
    private __currentPage: ObservedPropertySimplePU<number>;
    get currentPage() {
        return this.__currentPage.get();
    }
    set currentPage(newValue: number) {
        this.__currentPage.set(newValue);
    }
    private __fundImageDialogVisible: ObservedPropertySimplePU<boolean>;
    get fundImageDialogVisible() {
        return this.__fundImageDialogVisible.get();
    }
    set fundImageDialogVisible(newValue: boolean) {
        this.__fundImageDialogVisible.set(newValue);
    }
    private __fundImageData: ObservedPropertyObjectPU<FundImageData>;
    get fundImageData() {
        return this.__fundImageData.get();
    }
    set fundImageData(newValue: FundImageData) {
        this.__fundImageData.set(newValue);
    }
    // 筛选选项配置
    private readonly filterOptions: FilterOption[];
    aboutToAppear() {
        this.onSearch();
    }
    // 根据标签获取范围值
    private getRangeByLabel(label: string): RangeValue | null {
        if (!label)
            return null;
        const rangeParts = label.replace('%', '').replace('亿', '').split('-');
        const minStr = rangeParts[0];
        const maxStr = rangeParts[1] || '';
        if (label.includes('以上')) {
            return { min: parseFloat(minStr), max: null };
        }
        if (label.includes('以下')) {
            return { min: null, max: parseFloat(minStr) };
        }
        if (label.includes('-')) {
            return {
                min: parseFloat(minStr),
                max: parseFloat(maxStr)
            };
        }
        return null;
    }
    // 设置筛选条件
    private setFilter(key: string, value: string) {
        switch (key) {
            case 'code':
                this.filters.code = value;
                break;
            case 'time':
                this.filters.time = value;
                break;
            case 'scale':
                this.filters.scale = value;
                break;
            case 'managerYear':
                this.filters.managerYear = value;
                break;
            case 'ytdReturn':
                this.filters.ytdReturn = value;
                break;
            case 'fee':
                this.filters.fee = value;
                break;
            case 'barra':
                this.filters.barra = value;
                break;
        }
    }
    private getFilter(key: string): string {
        switch (key) {
            case 'code':
                return this.filters.code;
            case 'time':
                return this.filters.time;
            case 'scale':
                return this.filters.scale;
            case 'managerYear':
                return this.filters.managerYear;
            case 'ytdReturn':
                return this.filters.ytdReturn;
            case 'fee':
                return this.filters.fee;
            case 'barra':
                return this.filters.barra;
            default:
                return '';
        }
    }
    // 执行搜索
    private onSearch() {
        const params = new FundQueryParams(this.currentPage, this.pageSize, this.getRangeByLabel(this.filters.scale), this.getRangeByLabel(this.filters.managerYear), this.getRangeByLabel(this.filters.ytdReturn), this.getRangeByLabel(this.filters.fee), this.filters.barra, this.filters.code);
        RequestAxios.post<QueryWithJoinResponse>('/funds/queryWithJoin', params)
            .then((res: import('@ohos/axios').AxiosResponse<QueryWithJoinResponse>) => {
            const data = (res.data as QueryWithJoinResponse).data;
            this.tableData = data.records;
            this.total = data.total;
        })
            .catch((e: Error) => {
            promptAction.showToast({ message: `搜索失败: ${e.message}` });
        });
    }
    // 重置筛选条件
    private onReset() {
        this.filters = new Filters();
        this.onSearch();
    }
    // 处理分页变化
    private handlePageChange(page: number) {
        this.currentPage = page;
        this.onSearch();
    }
    // 显示基金画像
    private showFundImage(row: Fund) {
        class FundImageParams {
            fund_code: string;
            constructor(fund_code: string) {
                this.fund_code = fund_code;
            }
        }
        const params = new FundImageParams(row.fundCode);
        RequestAxios.post<FundImageResponse>('/funds/Fund_Image', params)
            .then((res: import('@ohos/axios').AxiosResponse<FundImageResponse>) => {
            const data = res.data;
            let newData = new FundImageData();
            newData.fund_code = row.fundCode;
            let fundData: Partial<FundImageData> | undefined = undefined;
            if (data && typeof (data as FundImageResponse).data === 'object') {
                const dataMap = (data as FundImageResponse).data;
                fundData = dataMap[row.fundCode];
            }
            if (fundData) {
                if (fundData.fund_name)
                    newData.fund_name = fundData.fund_name;
                if (fundData.fund_type)
                    newData.fund_type = fundData.fund_type;
                if (fundData.fund_size)
                    newData.fund_size = fundData.fund_size;
                if (fundData.manager_name)
                    newData.manager_name = fundData.manager_name;
                if (fundData.inception_date)
                    newData.inception_date = fundData.inception_date;
                if (fundData.operation_cycle)
                    newData.operation_cycle = fundData.operation_cycle;
                if (fundData.industry_tag)
                    newData.industry_tag = fundData.industry_tag;
                if (fundData.rating)
                    newData.rating = fundData.rating;
                if (fundData.fund_description)
                    newData.fund_description = fundData.fund_description;
                if (fundData.quality_score)
                    newData.quality_score = fundData.quality_score;
                if (fundData.research_score)
                    newData.research_score = fundData.research_score;
                if (fundData.risk_adj_score)
                    newData.risk_adj_score = fundData.risk_adj_score;
                if (fundData.tenure_score)
                    newData.tenure_score = fundData.tenure_score;
                if (fundData.return_ytd)
                    newData.return_ytd = fundData.return_ytd;
                if (fundData.return_1m)
                    newData.return_1m = fundData.return_1m;
                if (fundData.max_drawdown_1y)
                    newData.max_drawdown_1y = fundData.max_drawdown_1y;
                if (fundData.annual_sharpe)
                    newData.annual_sharpe = fundData.annual_sharpe;
                if (fundData.risk_level)
                    newData.risk_level = fundData.risk_level;
                if (fundData.fee_rate)
                    newData.fee_rate = fundData.fee_rate;
                if (fundData.ranking)
                    newData.ranking = fundData.ranking;
                if (fundData.stock_asset)
                    newData.stock_asset = fundData.stock_asset;
                if (fundData.bond_asset)
                    newData.bond_asset = fundData.bond_asset;
                if (fundData.cash_asset)
                    newData.cash_asset = fundData.cash_asset;
                if (fundData.deposit_asset)
                    newData.deposit_asset = fundData.deposit_asset;
                if (fundData.accumulated_nav)
                    newData.accumulated_nav = fundData.accumulated_nav;
                if (fundData.unit_nav)
                    newData.unit_nav = fundData.unit_nav;
                if (fundData.nav_date)
                    newData.nav_date = fundData.nav_date;
                if (fundData.disclosure_date)
                    newData.disclosure_date = fundData.disclosure_date;
                if (fundData.market_value)
                    newData.market_value = fundData.market_value;
                if (fundData.stock_name)
                    newData.stock_name = fundData.stock_name;
                if (fundData.stock_code)
                    newData.stock_code = fundData.stock_code;
                if (fundData.share_count)
                    newData.share_count = fundData.share_count;
                if (fundData.share_total)
                    newData.share_total = fundData.share_total;
            }
            this.fundImageData = newData;
            this.fundImageDialogVisible = true;
        })
            .catch((e: Error) => {
            promptAction.showToast({ message: `获取基金画像失败: ${e.message}` });
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Top });
            Stack.debugLine("entry/src/main/ets/pages/BasicFund.ets(338:5)", "entry");
            Stack.width('100%');
            Stack.height('100%');
            Stack.backgroundColor('#F7FAFF');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 主内容区
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/BasicFund.ets(340:7)", "entry");
            // 主内容区
            Scroll.width('100%');
            // 主内容区
            Scroll.height('100%');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BasicFund.ets(341:9)", "entry");
            Column.width('100%');
            Column.padding({ left: 24, right: 24 });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 筛选区卡片 - 微调视觉层次
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BasicFund.ets(343:11)", "entry");
            // 筛选区卡片 - 微调视觉层次
            Column.padding(24);
            // 筛选区卡片 - 微调视觉层次
            Column.backgroundColor('#FFFFFF');
            // 筛选区卡片 - 微调视觉层次
            Column.borderRadius(16);
            // 筛选区卡片 - 微调视觉层次
            Column.margin({ bottom: 16, top: 16 });
            // 筛选区卡片 - 微调视觉层次
            Column.width('100%');
            // 筛选区卡片 - 微调视觉层次
            Column.shadow({
                radius: 16,
                color: '#1A2978FB',
                offsetX: 0,
                offsetY: 4
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 基金代码输入增加图标
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/BasicFund.ets(345:13)", "entry");
            // 基金代码输入增加图标
            Row.margin({ bottom: 18 });
            // 基金代码输入增加图标
            Row.height(44);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基金代码:');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(346:15)", "entry");
            Text.fontSize(16);
            Text.fontColor('#0A59F7');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入基金代码或名称', text: this.filters.code });
            TextInput.debugLine("entry/src/main/ets/pages/BasicFund.ets(350:15)", "entry");
            TextInput.onChange(v => this.filters.code = v);
            TextInput.layoutWeight(3);
            TextInput.margin({ left: 12 });
            TextInput.borderRadius(8);
            TextInput.backgroundColor('#F7F9FE');
            TextInput.padding({ left: 12, right: 12 });
            TextInput.fontSize(16);
            TextInput.height(44);
        }, TextInput);
        // 基金代码输入增加图标
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 动态筛选条件 - 优化视觉平衡
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.debugLine("entry/src/main/ets/pages/BasicFund.ets(364:13)", "entry");
            // 动态筛选条件 - 优化视觉平衡
            Flex.margin({ bottom: 16 });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const filterGroup = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/BasicFund.ets(366:17)", "entry");
                    Column.margin({ bottom: 16 });
                    Column.width('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(filterGroup.label);
                    Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(367:19)", "entry");
                    Text.fontSize(14);
                    Text.fontColor('#666666');
                    Text.margin({ bottom: 8 });
                    Text.width('100%');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Flex.create({ wrap: FlexWrap.Wrap });
                    Flex.debugLine("entry/src/main/ets/pages/BasicFund.ets(372:19)", "entry");
                }, Flex);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const opt = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(opt);
                            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(374:23)", "entry");
                            Text.onClick(() => this.setFilter(filterGroup.key, opt));
                            Text.backgroundColor(this.getFilter(filterGroup.key) === opt ? '#0A59F7' : '#FAFBFF');
                            Text.fontColor(this.getFilter(filterGroup.key) === opt ? '#FFFFFF' : '#333333');
                            Text.borderRadius(16);
                            Text.border({
                                width: this.getFilter(filterGroup.key) === opt ? 0 : 1,
                                color: '#0A59F7'
                            });
                            Text.margin({ right: 8, bottom: 8 });
                            Text.fontSize(13);
                            Text.padding(10);
                            Text.backgroundColor(this.getFilter(filterGroup.key) === opt ? '#0A59F7' : '#FAFBFF');
                        }, Text);
                        Text.pop();
                    };
                    this.forEachUpdateFunction(elmtId, filterGroup.options, forEachItemGenFunction);
                }, ForEach);
                ForEach.pop();
                Flex.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.filterOptions, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 动态筛选条件 - 优化视觉平衡
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 操作按钮 - 添加图标提升可视性
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/BasicFund.ets(397:13)", "entry");
            // 操作按钮 - 添加图标提升可视性
            Row.margin({ top: 8, bottom: 8 });
            // 操作按钮 - 添加图标提升可视性
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('清除', { type: ButtonType.Capsule });
            Button.debugLine("entry/src/main/ets/pages/BasicFund.ets(398:15)", "entry");
            Button.onClick(() => this.onReset());
            Button.backgroundColor('#FFFFFF');
            Button.fontColor('#0A59F7');
            Button.borderRadius(24);
            Button.layoutWeight(1);
            Button.height(44);
            Button.fontSize(16);
            Button.margin({ right: 12 });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('确定', { type: ButtonType.Capsule });
            Button.debugLine("entry/src/main/ets/pages/BasicFund.ets(407:15)", "entry");
            Button.onClick(() => this.onSearch());
            Button.backgroundColor('#0A59F7');
            Button.fontColor('#FFFFFF');
            Button.borderRadius(24);
            Button.layoutWeight(1);
            Button.height(44);
            Button.fontSize(16);
        }, Button);
        Button.pop();
        // 操作按钮 - 添加图标提升可视性
        Row.pop();
        // 筛选区卡片 - 微调视觉层次
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 表格区 - 优化视觉层次和可读性
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BasicFund.ets(432:11)", "entry");
            // 表格区 - 优化视觉层次和可读性
            Column.padding(24);
            // 表格区 - 优化视觉层次和可读性
            Column.backgroundColor('#FFFFFF');
            // 表格区 - 优化视觉层次和可读性
            Column.borderRadius(16);
            // 表格区 - 优化视觉层次和可读性
            Column.margin({ bottom: 24 });
            // 表格区 - 优化视觉层次和可读性
            Column.width('100%');
            // 表格区 - 优化视觉层次和可读性
            Column.shadow({
                radius: 16,
                color: '#1A2978FB',
                offsetX: 0,
                offsetY: 4
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 添加表格标题
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/BasicFund.ets(434:13)", "entry");
            // 添加表格标题
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基金列表');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(435:15)", "entry");
            Text.fontSize(18);
            Text.fontColor('#1D2129');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/BasicFund.ets(439:15)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`共 ${this.total} 条记录`);
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(440:15)", "entry");
            Text.fontSize(14);
            Text.fontColor('#86909C');
        }, Text);
        Text.pop();
        // 添加表格标题
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 表头 - 优化视觉对比
            Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
            Flex.debugLine("entry/src/main/ets/pages/BasicFund.ets(447:13)", "entry");
            // 表头 - 优化视觉对比
            Flex.backgroundColor('#F0F5FF');
            // 表头 - 优化视觉对比
            Flex.padding({
                left: 16,
                right: 16,
                top: 12,
                bottom: 12
            });
            // 表头 - 优化视觉对比
            Flex.borderRadius(8);
            // 表头 - 优化视觉对比
            Flex.width('100%');
            // 表头 - 优化视觉对比
            Flex.height(48);
        }, Flex);
        this.buildTableHeaderCell.bind(this)('代码', 70);
        this.buildTableHeaderCell.bind(this)('简称', 90);
        this.buildTableHeaderCell.bind(this)('经理', 85);
        this.buildTableHeaderCell.bind(this)('类型', 70);
        this.buildTableHeaderCell.bind(this)('操作', 80);
        // 表头 - 优化视觉对比
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 数据行 - 优化交互反馈
            List.create({ space: 8 });
            List.debugLine("entry/src/main/ets/pages/BasicFund.ets(466:13)", "entry");
            // 数据行 - 优化交互反馈
            List.layoutWeight(1);
            // 数据行 - 优化交互反馈
            List.width('100%');
            // 数据行 - 优化交互反馈
            List.divider({
                strokeWidth: 1,
                color: '#F0F0F0',
                startMargin: 16,
                endMargin: 16
            });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const row = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.backgroundColor('#FFFFFF');
                        ListItem.onClick(() => this.showFundImage(row));
                        ListItem.borderRadius(8);
                        ListItem.width('100%');
                        ListItem.debugLine("entry/src/main/ets/pages/BasicFund.ets(468:17)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.buildTableRow.bind(this)(row);
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.tableData, forEachItemGenFunction, (item: Fund) => item.fundCode, false, false);
        }, ForEach);
        ForEach.pop();
        // 数据行 - 优化交互反馈
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 分页控件 - 现代化视觉设计
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/BasicFund.ets(487:13)", "entry");
            // 分页控件 - 现代化视觉设计
            Row.justifyContent(FlexAlign.Center);
            // 分页控件 - 现代化视觉设计
            Row.margin({ top: 24, bottom: 16 });
            // 分页控件 - 现代化视觉设计
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('←', { type: ButtonType.Circle });
            Button.debugLine("entry/src/main/ets/pages/BasicFund.ets(488:15)", "entry");
            Button.onClick(() => {
                if (this.currentPage > 1)
                    this.handlePageChange(this.currentPage - 1);
            });
            Button.backgroundColor(this.currentPage > 1 ? '#0A59F7' : '#F7F9FE');
            Button.enabled(this.currentPage > 1);
            Button.width(40);
            Button.height(40);
            Button.fontColor(this.currentPage > 1 ? '#FFFFFF' : '#C5C5C5');
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.currentPage} / ${Math.ceil(this.total / this.pageSize)}`);
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(498:15)", "entry");
            Text.fontSize(16);
            Text.fontColor('#666666');
            Text.margin({ left: 16, right: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('→', { type: ButtonType.Circle });
            Button.debugLine("entry/src/main/ets/pages/BasicFund.ets(503:15)", "entry");
            Button.onClick(() => {
                if (this.currentPage < Math.ceil(this.total / this.pageSize))
                    this.handlePageChange(this.currentPage + 1);
            });
            Button.backgroundColor(this.currentPage < Math.ceil(this.total / this.pageSize) ? '#0A59F7' : '#F7F9FE');
            Button.enabled(this.currentPage < Math.ceil(this.total / this.pageSize));
            Button.width(40);
            Button.height(40);
            Button.fontColor(this.currentPage < Math.ceil(this.total / this.pageSize) ? '#FFFFFF' : '#C5C5C5');
        }, Button);
        Button.pop();
        // 分页控件 - 现代化视觉设计
        Row.pop();
        // 表格区 - 优化视觉层次和可读性
        Column.pop();
        Column.pop();
        // 主内容区
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 基金画像对话框 - 优化为现代化卡片
            if (this.fundImageDialogVisible) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildFundDetailDialog.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    // 表格标题单元格组件
    buildTableHeaderCell(text: string, width: number, parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(text);
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(550:5)", "entry");
            Text.width(width);
            Text.fontSize(14);
            Text.fontColor('#1D2129');
            Text.fontWeight(FontWeight.Medium);
            Text.textAlign(TextAlign.Start);
        }, Text);
        Text.pop();
    }
    // 表格行组件
    buildTableRow(row: Fund, parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
            Flex.debugLine("entry/src/main/ets/pages/BasicFund.ets(561:5)", "entry");
            Flex.padding({
                left: 16,
                right: 16,
                top: 14,
                bottom: 14
            });
            Flex.width('100%');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(row.fundCode ?? '');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(562:7)", "entry");
            Text.width(70);
            Text.fontSize(14);
            Text.fontColor('#1D2129');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(row.fundName ?? '');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(567:7)", "entry");
            Text.width(90);
            Text.fontSize(14);
            Text.fontColor('#0A59F7');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(row.managerName ?? '');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(572:7)", "entry");
            Text.width(85);
            Text.fontSize(14);
            Text.fontColor('#1D2129');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(row.fundType ?? '');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(577:7)", "entry");
            Text.width(70);
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('详情', { type: ButtonType.Normal });
            Button.debugLine("entry/src/main/ets/pages/BasicFund.ets(582:7)", "entry");
            Button.width(80);
            Button.height(32);
            Button.backgroundColor('#F0F5FF');
            Button.fontColor('#0A59F7');
            Button.borderRadius(6);
            Button.fontSize(13);
        }, Button);
        Button.pop();
        Flex.pop();
    }
    // 基金详情对话框组件
    buildFundDetailDialog(parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BasicFund.ets(602:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#80000000');
            Column.position({ x: 0, y: 0 });
            Column.zIndex(999);
            Column.align(Alignment.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 模态内容
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BasicFund.ets(604:7)", "entry");
            // 模态内容
            Column.padding(32);
            // 模态内容
            Column.backgroundColor('#FFFFFF');
            // 模态内容
            Column.borderRadius(24);
            // 模态内容
            Column.width('90%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题栏 - 简化设计避免图标问题
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/BasicFund.ets(606:9)", "entry");
            // 标题栏 - 简化设计避免图标问题
            Row.margin({ bottom: 24 });
            // 标题栏 - 简化设计避免图标问题
            Row.padding({ bottom: 12, top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基金画像');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(607:11)", "entry");
            Text.fontSize(20);
            Text.fontColor('#1D2129');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/BasicFund.ets(611:11)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.debugLine("entry/src/main/ets/pages/BasicFund.ets(612:11)", "entry");
            Button.onClick(() => this.fundImageDialogVisible = false);
            Button.width(32);
            Button.height(32);
            Button.backgroundColor(Color.Transparent);
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('×');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(613:13)", "entry");
            Text.fontSize(24);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        Button.pop();
        // 标题栏 - 简化设计避免图标问题
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 基本信息卡片
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BasicFund.ets(626:9)", "entry");
            // 基本信息卡片
            Column.padding(24);
            // 基本信息卡片
            Column.backgroundColor('#F7F8FA');
            // 基本信息卡片
            Column.borderRadius(12);
            // 基本信息卡片
            Column.margin({ bottom: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基本信息');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(627:11)", "entry");
            Text.fontSize(16);
            Text.fontColor('#1D2129');
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 使用Grid布局
            Grid.create();
            Grid.debugLine("entry/src/main/ets/pages/BasicFund.ets(634:11)", "entry");
            // 使用Grid布局
            Grid.columnsTemplate('1fr 1fr');
            // 使用Grid布局
            Grid.rowsGap(16);
            // 使用Grid布局
            Grid.columnsGap(24);
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                        GridItem.debugLine("entry/src/main/ets/pages/BasicFund.ets(647:15)", "entry");
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/BasicFund.ets(648:17)", "entry");
                            Row.margin({ bottom: 12 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.label + ':');
                            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(649:19)", "entry");
                            Text.fontSize(14);
                            Text.fontColor('#86909C');
                            Text.margin({ right: 8 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.value);
                            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(653:19)", "entry");
                            Text.fontSize(14);
                            Text.fontColor('#1D2129');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, [
                { label: '基金名称', value: this.fundImageData.fund_name } as DetailItem,
                { label: '基金代码', value: this.fundImageData.fund_code } as DetailItem,
                { label: '基金类型', value: this.fundImageData.fund_type } as DetailItem,
                { label: '基金规模', value: `${this.fundImageData.fund_size} 亿元` } as DetailItem,
                { label: '基金经理', value: this.fundImageData.manager_name } as DetailItem,
                { label: '成立日期', value: this.fundImageData.inception_date } as DetailItem,
                { label: '运作周期', value: this.fundImageData.operation_cycle } as DetailItem,
                { label: '行业标签', value: this.fundImageData.industry_tag ?? '--' } as DetailItem,
                { label: '基金评级', value: this.fundImageData.rating ?? '--' } as DetailItem,
                { label: '基金简介', value: this.fundImageData.fund_description ?? '--' } as DetailItem
            ], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 使用Grid布局
        Grid.pop();
        // 基本信息卡片
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 评分与风格卡片
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BasicFund.ets(671:9)", "entry");
            // 评分与风格卡片
            Column.padding(24);
            // 评分与风格卡片
            Column.backgroundColor('#F7F8FA');
            // 评分与风格卡片
            Column.borderRadius(12);
            // 评分与风格卡片
            Column.margin({ bottom: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('评分与风格');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(672:11)", "entry");
            Text.fontSize(16);
            Text.fontColor('#1D2129');
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.debugLine("entry/src/main/ets/pages/BasicFund.ets(677:11)", "entry");
            Grid.columnsTemplate('1fr 1fr');
            Grid.rowsGap(16);
            Grid.columnsGap(24);
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                        GridItem.debugLine("entry/src/main/ets/pages/BasicFund.ets(687:15)", "entry");
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/BasicFund.ets(688:17)", "entry");
                            Row.margin({ bottom: 12 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.label + ':');
                            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(689:19)", "entry");
                            Text.fontSize(14);
                            Text.fontColor('#86909C');
                            Text.margin({ right: 8 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.value);
                            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(693:19)", "entry");
                            Text.fontSize(14);
                            Text.fontColor('#1D2129');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, [
                { label: '质量评分', value: this.fundImageData.quality_score?.toString() ?? '--' } as DetailItem,
                { label: '研究评分', value: this.fundImageData.research_score?.toString() ?? '--' } as DetailItem,
                { label: '风险调整评分', value: this.fundImageData.risk_adj_score?.toString() ?? '--' } as DetailItem,
                { label: '任职评分', value: this.fundImageData.tenure_score?.toString() ?? '--' } as DetailItem,
                { label: '风险等级', value: this.fundImageData.risk_level ?? '--' } as DetailItem,
                { label: '费率', value: this.fundImageData.fee_rate?.toString() ?? '--' } as DetailItem,
                { label: '排名', value: this.fundImageData.ranking?.toString() ?? '--' } as DetailItem
            ], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        // 评分与风格卡片
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 资产结构卡片
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BasicFund.ets(711:9)", "entry");
            // 资产结构卡片
            Column.padding(24);
            // 资产结构卡片
            Column.backgroundColor('#F7F8FA');
            // 资产结构卡片
            Column.borderRadius(12);
            // 资产结构卡片
            Column.margin({ bottom: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('资产结构');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(712:11)", "entry");
            Text.fontSize(16);
            Text.fontColor('#1D2129');
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.debugLine("entry/src/main/ets/pages/BasicFund.ets(717:11)", "entry");
            Grid.columnsTemplate('1fr 1fr');
            Grid.rowsGap(16);
            Grid.columnsGap(24);
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                        GridItem.debugLine("entry/src/main/ets/pages/BasicFund.ets(729:15)", "entry");
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/BasicFund.ets(730:17)", "entry");
                            Row.margin({ bottom: 12 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.label + ':');
                            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(731:19)", "entry");
                            Text.fontSize(14);
                            Text.fontColor('#86909C');
                            Text.margin({ right: 8 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.value);
                            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(735:19)", "entry");
                            Text.fontSize(14);
                            Text.fontColor('#1D2129');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, [
                { label: '股票资产', value: this.fundImageData.stock_asset?.toString() ?? '--' } as DetailItem,
                { label: '债券资产', value: this.fundImageData.bond_asset?.toString() ?? '--' } as DetailItem,
                { label: '现金资产', value: this.fundImageData.cash_asset?.toString() ?? '--' } as DetailItem,
                { label: '存款资产', value: this.fundImageData.deposit_asset?.toString() ?? '--' } as DetailItem,
                { label: '累计净值', value: this.fundImageData.accumulated_nav?.toString() ?? '--' } as DetailItem,
                { label: '单位净值', value: this.fundImageData.unit_nav?.toString() ?? '--' } as DetailItem,
                { label: '净值日期', value: this.fundImageData.nav_date ?? '--' } as DetailItem,
                { label: '披露日期', value: this.fundImageData.disclosure_date ?? '--' } as DetailItem,
                { label: '市场价值', value: this.fundImageData.market_value?.toString() ?? '--' } as DetailItem
            ], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        // 资产结构卡片
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 重仓股卡片
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BasicFund.ets(753:9)", "entry");
            // 重仓股卡片
            Column.padding(24);
            // 重仓股卡片
            Column.backgroundColor('#F7F8FA');
            // 重仓股卡片
            Column.borderRadius(12);
            // 重仓股卡片
            Column.margin({ bottom: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('重仓股');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(754:11)", "entry");
            Text.fontSize(16);
            Text.fontColor('#1D2129');
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.debugLine("entry/src/main/ets/pages/BasicFund.ets(759:11)", "entry");
            Grid.columnsTemplate('1fr 1fr');
            Grid.rowsGap(16);
            Grid.columnsGap(24);
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                        GridItem.debugLine("entry/src/main/ets/pages/BasicFund.ets(766:15)", "entry");
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/BasicFund.ets(767:17)", "entry");
                            Row.margin({ bottom: 12 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.label + ':');
                            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(768:19)", "entry");
                            Text.fontSize(14);
                            Text.fontColor('#86909C');
                            Text.margin({ right: 8 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.value);
                            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(772:19)", "entry");
                            Text.fontSize(14);
                            Text.fontColor('#1D2129');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, [
                { label: '股票名称', value: this.fundImageData.stock_name ?? '--' } as DetailItem,
                { label: '股票代码', value: this.fundImageData.stock_code ?? '--' } as DetailItem,
                { label: '持股数', value: this.fundImageData.share_count?.toString() ?? '--' } as DetailItem,
                { label: '总股本', value: this.fundImageData.share_total?.toString() ?? '--' } as DetailItem
            ], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        // 重仓股卡片
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 业绩表现卡片（原有）
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BasicFund.ets(790:9)", "entry");
            // 业绩表现卡片（原有）
            Column.padding(24);
            // 业绩表现卡片（原有）
            Column.backgroundColor('#F7F8FA');
            // 业绩表现卡片（原有）
            Column.borderRadius(12);
            // 业绩表现卡片（原有）
            Column.margin({ bottom: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('业绩表现');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(791:11)", "entry");
            Text.fontSize(16);
            Text.fontColor('#1D2129');
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/BasicFund.ets(797:11)", "entry");
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BasicFund.ets(798:13)", "entry");
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(8);
            Column.layoutWeight(1);
            Column.margin({ right: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('最新净值');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(799:15)", "entry");
            Text.fontSize(14);
            Text.fontColor('#86909C');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.fundImageData.unit_nav?.toFixed(4) ?? '--');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(803:15)", "entry");
            Text.fontSize(20);
            Text.fontColor('#0A59F7');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`更新日期: ${this.fundImageData.nav_date ?? '--'}`);
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(807:15)", "entry");
            Text.fontSize(12);
            Text.fontColor('#86909C');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BasicFund.ets(818:13)", "entry");
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(8);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('今年以来收益');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(819:15)", "entry");
            Text.fontSize(14);
            Text.fontColor('#86909C');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.fundImageData.return_ytd?.toFixed(2) ?? '--'}%`);
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(823:15)", "entry");
            Text.fontSize(20);
            Text.fontColor((this.fundImageData.return_ytd ?? 0) > 0 ? '#F53F3F' : '#00B42A');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 其他业绩指标
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BasicFund.ets(836:11)", "entry");
            // 其他业绩指标
            Column.padding(16);
            // 其他业绩指标
            Column.backgroundColor('#F7F8FA');
            // 其他业绩指标
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/BasicFund.ets(837:13)", "entry");
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('近1月收益');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(838:15)", "entry");
            Text.fontSize(14);
            Text.fontColor('#86909C');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.fundImageData.return_1m?.toFixed(2) ?? '--'}%`);
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(842:15)", "entry");
            Text.fontSize(14);
            Text.fontColor((this.fundImageData.return_1m ?? 0) > 0 ? '#F53F3F' : '#00B42A');
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.End);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/BasicFund.ets(850:13)", "entry");
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('最大回撤');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(851:15)", "entry");
            Text.fontSize(14);
            Text.fontColor('#86909C');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.fundImageData.max_drawdown_1y?.toFixed(2) ?? '--'}%`);
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(855:15)", "entry");
            Text.fontSize(14);
            Text.fontColor('#1D2129');
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.End);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/BasicFund.ets(863:13)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('夏普比率');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(864:15)", "entry");
            Text.fontSize(14);
            Text.fontColor('#86909C');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.fundImageData.annual_sharpe?.toFixed(2) ?? '--');
            Text.debugLine("entry/src/main/ets/pages/BasicFund.ets(868:15)", "entry");
            Text.fontSize(14);
            Text.fontColor('#1D2129');
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.End);
        }, Text);
        Text.pop();
        Row.pop();
        // 其他业绩指标
        Column.pop();
        // 业绩表现卡片（原有）
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 关闭按钮
            Button.createWithLabel('关闭', { type: ButtonType.Capsule });
            Button.debugLine("entry/src/main/ets/pages/BasicFund.ets(885:9)", "entry");
            // 关闭按钮
            Button.onClick(() => this.fundImageDialogVisible = false);
            // 关闭按钮
            Button.width('100%');
            // 关闭按钮
            Button.height(48);
            // 关闭按钮
            Button.backgroundColor('#0A59F7');
            // 关闭按钮
            Button.fontColor('#FFFFFF');
            // 关闭按钮
            Button.fontSize(16);
            // 关闭按钮
            Button.margin({ top: 8 });
        }, Button);
        // 关闭按钮
        Button.pop();
        // 模态内容
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "BasicFundPage";
    }
}
registerNamedRoute(() => new BasicFundPage(undefined, {}), "", { bundleName: "com.example.component", moduleName: "entry", pagePath: "pages/BasicFund", pageFullPath: "entry/src/main/ets/pages/BasicFund", integratedHsp: "false", moduleType: "followWithHap" });
