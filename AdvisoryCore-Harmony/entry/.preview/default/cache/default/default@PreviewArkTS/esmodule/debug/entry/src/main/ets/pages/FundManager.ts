if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FundManagerPage_Params {
    manager?: string;
    fundCount?: string;
    fundScale?: string;
    tenure?: string;
    feature?: string;
    assetScale?: string;
    equityReturn?: string;
    bondReturn?: string;
    tableData?: FundManager[];
    currentPage?: number;
    pageSize?: number;
    total?: number;
    showDetailDialog?: boolean;
    detailManager?: FundManager;
    filterOptions?: FilterOption[];
}
import RequestAxios from "@bundle:com.example.component/entry/ets/utility/BaseRequest";
import promptAction from "@ohos:promptAction";
class MinMax {
    min?: number;
    max?: number;
    constructor(min?: number, max?: number) {
        this.min = min;
        this.max = max;
    }
}
class FundManager {
    managerName: string = '';
    companyName: string = '';
    managedAssets: number = 0;
    managedCount: number = 0;
    highestEducation: string = '';
    tenureYears: string = '';
    effectiveAssets: number = 0;
    equityReturn: string = '';
    bondReturn: string = '';
    annualizedReturn: string = '';
    winRate: string = '';
}
class FundManagerQueryParams {
    page: number = 1;
    pageSize: number = 10;
    managerName?: string;
    fundCount?: string;
    fundScale?: string;
    tenure?: string;
    feature?: string;
    assetScale?: string;
    equityReturn?: string;
    bondReturn?: string;
    tenureYearsMin?: number;
    tenureYearsMax?: number;
}
class FundManagerListResponse {
    list: FundManager[] = [];
    total: number = 0;
}
class FilterOption {
    label: string;
    key: string;
    options: string[];
    constructor(label: string, key: string, options: string[]) {
        this.label = label;
        this.key = key;
        this.options = options;
    }
}
class FundManagerPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__manager = new ObservedPropertySimplePU('', this, "manager");
        this.__fundCount = new ObservedPropertySimplePU('', this, "fundCount");
        this.__fundScale = new ObservedPropertySimplePU('', this, "fundScale");
        this.__tenure = new ObservedPropertySimplePU('', this, "tenure");
        this.__feature = new ObservedPropertySimplePU('', this, "feature");
        this.__assetScale = new ObservedPropertySimplePU('', this, "assetScale");
        this.__equityReturn = new ObservedPropertySimplePU('', this, "equityReturn");
        this.__bondReturn = new ObservedPropertySimplePU('', this, "bondReturn");
        this.__tableData = new ObservedPropertyObjectPU([], this, "tableData");
        this.__currentPage = new ObservedPropertySimplePU(1, this, "currentPage");
        this.__pageSize = new ObservedPropertySimplePU(10, this, "pageSize");
        this.__total = new ObservedPropertySimplePU(0, this, "total");
        this.__showDetailDialog = new ObservedPropertySimplePU(false, this, "showDetailDialog");
        this.__detailManager = new ObservedPropertyObjectPU(new FundManager(), this, "detailManager");
        this.filterOptions = [
            new FilterOption('在管基金:', 'fundCount', ['1只', '2-3只', '3-5只', '5只以上']),
            new FilterOption('在管资金规模:', 'fundScale', ['100亿以上', '80-100亿', '50-80亿', '30-50亿']),
            new FilterOption('任职年限:', 'tenure', ['10年以上', '5-10年', '3-5年', '1-3年']),
            new FilterOption('特色因子:', 'feature', ['悦品特色因子']),
            new FilterOption('有效资产规模:', 'assetScale', ['100亿以上', '80-100亿', '50-80亿', '30-50亿']),
            new FilterOption('权益类基金历史收益率:', 'equityReturn', ['大于200%', '100%-200%', '50%-100%', '50%以下']),
            new FilterOption('债权类基金历史收益率:', 'bondReturn', ['大于200%', '100%-200%', '50%-100%', '50%以下'])
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FundManagerPage_Params) {
        if (params.manager !== undefined) {
            this.manager = params.manager;
        }
        if (params.fundCount !== undefined) {
            this.fundCount = params.fundCount;
        }
        if (params.fundScale !== undefined) {
            this.fundScale = params.fundScale;
        }
        if (params.tenure !== undefined) {
            this.tenure = params.tenure;
        }
        if (params.feature !== undefined) {
            this.feature = params.feature;
        }
        if (params.assetScale !== undefined) {
            this.assetScale = params.assetScale;
        }
        if (params.equityReturn !== undefined) {
            this.equityReturn = params.equityReturn;
        }
        if (params.bondReturn !== undefined) {
            this.bondReturn = params.bondReturn;
        }
        if (params.tableData !== undefined) {
            this.tableData = params.tableData;
        }
        if (params.currentPage !== undefined) {
            this.currentPage = params.currentPage;
        }
        if (params.pageSize !== undefined) {
            this.pageSize = params.pageSize;
        }
        if (params.total !== undefined) {
            this.total = params.total;
        }
        if (params.showDetailDialog !== undefined) {
            this.showDetailDialog = params.showDetailDialog;
        }
        if (params.detailManager !== undefined) {
            this.detailManager = params.detailManager;
        }
        if (params.filterOptions !== undefined) {
            this.filterOptions = params.filterOptions;
        }
    }
    updateStateVars(params: FundManagerPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__manager.purgeDependencyOnElmtId(rmElmtId);
        this.__fundCount.purgeDependencyOnElmtId(rmElmtId);
        this.__fundScale.purgeDependencyOnElmtId(rmElmtId);
        this.__tenure.purgeDependencyOnElmtId(rmElmtId);
        this.__feature.purgeDependencyOnElmtId(rmElmtId);
        this.__assetScale.purgeDependencyOnElmtId(rmElmtId);
        this.__equityReturn.purgeDependencyOnElmtId(rmElmtId);
        this.__bondReturn.purgeDependencyOnElmtId(rmElmtId);
        this.__tableData.purgeDependencyOnElmtId(rmElmtId);
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
        this.__pageSize.purgeDependencyOnElmtId(rmElmtId);
        this.__total.purgeDependencyOnElmtId(rmElmtId);
        this.__showDetailDialog.purgeDependencyOnElmtId(rmElmtId);
        this.__detailManager.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__manager.aboutToBeDeleted();
        this.__fundCount.aboutToBeDeleted();
        this.__fundScale.aboutToBeDeleted();
        this.__tenure.aboutToBeDeleted();
        this.__feature.aboutToBeDeleted();
        this.__assetScale.aboutToBeDeleted();
        this.__equityReturn.aboutToBeDeleted();
        this.__bondReturn.aboutToBeDeleted();
        this.__tableData.aboutToBeDeleted();
        this.__currentPage.aboutToBeDeleted();
        this.__pageSize.aboutToBeDeleted();
        this.__total.aboutToBeDeleted();
        this.__showDetailDialog.aboutToBeDeleted();
        this.__detailManager.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __manager: ObservedPropertySimplePU<string>;
    get manager() {
        return this.__manager.get();
    }
    set manager(newValue: string) {
        this.__manager.set(newValue);
    }
    private __fundCount: ObservedPropertySimplePU<string>;
    get fundCount() {
        return this.__fundCount.get();
    }
    set fundCount(newValue: string) {
        this.__fundCount.set(newValue);
    }
    private __fundScale: ObservedPropertySimplePU<string>;
    get fundScale() {
        return this.__fundScale.get();
    }
    set fundScale(newValue: string) {
        this.__fundScale.set(newValue);
    }
    private __tenure: ObservedPropertySimplePU<string>;
    get tenure() {
        return this.__tenure.get();
    }
    set tenure(newValue: string) {
        this.__tenure.set(newValue);
    }
    private __feature: ObservedPropertySimplePU<string>;
    get feature() {
        return this.__feature.get();
    }
    set feature(newValue: string) {
        this.__feature.set(newValue);
    }
    private __assetScale: ObservedPropertySimplePU<string>;
    get assetScale() {
        return this.__assetScale.get();
    }
    set assetScale(newValue: string) {
        this.__assetScale.set(newValue);
    }
    private __equityReturn: ObservedPropertySimplePU<string>;
    get equityReturn() {
        return this.__equityReturn.get();
    }
    set equityReturn(newValue: string) {
        this.__equityReturn.set(newValue);
    }
    private __bondReturn: ObservedPropertySimplePU<string>;
    get bondReturn() {
        return this.__bondReturn.get();
    }
    set bondReturn(newValue: string) {
        this.__bondReturn.set(newValue);
    }
    private __tableData: ObservedPropertyObjectPU<FundManager[]>;
    get tableData() {
        return this.__tableData.get();
    }
    set tableData(newValue: FundManager[]) {
        this.__tableData.set(newValue);
    }
    private __currentPage: ObservedPropertySimplePU<number>;
    get currentPage() {
        return this.__currentPage.get();
    }
    set currentPage(newValue: number) {
        this.__currentPage.set(newValue);
    }
    private __pageSize: ObservedPropertySimplePU<number>;
    get pageSize() {
        return this.__pageSize.get();
    }
    set pageSize(newValue: number) {
        this.__pageSize.set(newValue);
    }
    private __total: ObservedPropertySimplePU<number>;
    get total() {
        return this.__total.get();
    }
    set total(newValue: number) {
        this.__total.set(newValue);
    }
    private __showDetailDialog: ObservedPropertySimplePU<boolean>;
    get showDetailDialog() {
        return this.__showDetailDialog.get();
    }
    set showDetailDialog(newValue: boolean) {
        this.__showDetailDialog.set(newValue);
    }
    private __detailManager: ObservedPropertyObjectPU<FundManager>;
    get detailManager() {
        return this.__detailManager.get();
    }
    set detailManager(newValue: FundManager) {
        this.__detailManager.set(newValue);
    }
    private readonly filterOptions: FilterOption[];
    aboutToAppear() {
        this.onSearch();
    }
    private getMinMaxByLabel(label: string): MinMax {
        if (!label)
            return new MinMax();
        if (label.includes('以上')) {
            return new MinMax(parseInt(label), undefined);
        }
        if (label.includes('以下')) {
            return new MinMax(undefined, parseInt(label));
        }
        if (label.includes('-')) {
            let parts = label.replace(/[^\d-]/g, '').split('-');
            return new MinMax(parseInt(parts[0]), parseInt(parts[1]));
        }
        return new MinMax();
    }
    private getFilterValue(key: string): string {
        switch (key) {
            case 'fundCount': return this.fundCount;
            case 'fundScale': return this.fundScale;
            case 'tenure': return this.tenure;
            case 'feature': return this.feature;
            case 'assetScale': return this.assetScale;
            case 'equityReturn': return this.equityReturn;
            case 'bondReturn': return this.bondReturn;
            default: return '';
        }
    }
    private setFilterValue(key: string, value: string) {
        switch (key) {
            case 'fundCount':
                this.fundCount = value;
                break;
            case 'fundScale':
                this.fundScale = value;
                break;
            case 'tenure':
                this.tenure = value;
                break;
            case 'feature':
                this.feature = value;
                break;
            case 'assetScale':
                this.assetScale = value;
                break;
            case 'equityReturn':
                this.equityReturn = value;
                break;
            case 'bondReturn':
                this.bondReturn = value;
                break;
        }
    }
    private onSearch() {
        let params = new FundManagerQueryParams();
        params.page = this.currentPage;
        params.pageSize = this.pageSize;
        if (this.manager)
            params.managerName = this.manager;
        if (this.fundCount)
            params.fundCount = this.fundCount;
        if (this.fundScale)
            params.fundScale = this.fundScale;
        if (this.tenure)
            params.tenure = this.tenure;
        if (this.feature)
            params.feature = this.feature;
        if (this.assetScale)
            params.assetScale = this.assetScale;
        if (this.equityReturn)
            params.equityReturn = this.equityReturn;
        if (this.bondReturn)
            params.bondReturn = this.bondReturn;
        let tenureRange = this.getMinMaxByLabel(this.tenure);
        if (tenureRange.min !== undefined)
            params.tenureYearsMin = tenureRange.min;
        if (tenureRange.max !== undefined)
            params.tenureYearsMax = tenureRange.max;
        RequestAxios.post<FundManagerListResponse>('/fund-managers/query', params)
            .then((res: import('@ohos/axios').AxiosResponse<FundManagerListResponse>) => {
            if (res.data && res.data.list) {
                this.tableData = res.data.list;
                this.total = res.data.total;
            }
            else {
                this.tableData = [];
                this.total = 0;
            }
        })
            .catch((e: Error) => {
            promptAction.showToast({ message: `查询失败: ${e.message}` });
        });
    }
    private onClear() {
        this.manager = '';
        this.fundCount = '';
        this.fundScale = '';
        this.tenure = '';
        this.feature = '';
        this.assetScale = '';
        this.equityReturn = '';
        this.bondReturn = '';
        this.onSearch();
    }
    private handlePageChange(page: number) {
        this.currentPage = page;
        this.onSearch();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Top });
            Stack.debugLine("entry/src/main/ets/pages/FundManager.ets(177:5)", "entry");
            Stack.width('100%');
            Stack.height('100%');
            Stack.backgroundColor('#F7FAFF');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 主内容区
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/FundManager.ets(179:7)", "entry");
            // 主内容区
            Scroll.width('100%');
            // 主内容区
            Scroll.height('100%');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/FundManager.ets(180:9)", "entry");
            Column.width('100%');
            Column.padding({ left: 24, right: 24 });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // ===== 筛选区卡片 =====
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/FundManager.ets(182:11)", "entry");
            // ===== 筛选区卡片 =====
            Column.padding(24);
            // ===== 筛选区卡片 =====
            Column.backgroundColor('#FFFFFF');
            // ===== 筛选区卡片 =====
            Column.borderRadius(16);
            // ===== 筛选区卡片 =====
            Column.margin({ bottom: 16, top: 16 });
            // ===== 筛选区卡片 =====
            Column.width('100%');
            // ===== 筛选区卡片 =====
            Column.shadow({
                radius: 16,
                color: '#1A2978FB',
                offsetX: 0,
                offsetY: 4
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/FundManager.ets(183:13)", "entry");
            Row.margin({ bottom: 18 });
            Row.height(44);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基金经理:');
            Text.debugLine("entry/src/main/ets/pages/FundManager.ets(184:15)", "entry");
            Text.fontSize(16);
            Text.fontColor('#0A59F7');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入基金经理姓名', text: this.manager });
            TextInput.debugLine("entry/src/main/ets/pages/FundManager.ets(188:15)", "entry");
            TextInput.onChange(v => this.manager = v);
            TextInput.layoutWeight(3);
            TextInput.margin({ left: 12 });
            TextInput.borderRadius(8);
            TextInput.backgroundColor('#F7F9FE');
            TextInput.padding({ left: 12, right: 12 });
            TextInput.fontSize(16);
            TextInput.height(44);
        }, TextInput);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 动态筛选条件
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.debugLine("entry/src/main/ets/pages/FundManager.ets(202:13)", "entry");
            // 动态筛选条件
            Flex.margin({ bottom: 16 });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const filterGroup = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/FundManager.ets(204:17)", "entry");
                    Column.margin({ bottom: 16 });
                    Column.width('100%');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(filterGroup.label);
                    Text.debugLine("entry/src/main/ets/pages/FundManager.ets(205:19)", "entry");
                    Text.fontSize(14);
                    Text.fontColor('#666666');
                    Text.margin({ bottom: 8 });
                    Text.width('100%');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Flex.create({ wrap: FlexWrap.Wrap });
                    Flex.debugLine("entry/src/main/ets/pages/FundManager.ets(210:19)", "entry");
                }, Flex);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const opt = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(opt);
                            Text.debugLine("entry/src/main/ets/pages/FundManager.ets(212:23)", "entry");
                            Text.onClick(() => this.setFilterValue(filterGroup.key, opt));
                            Text.backgroundColor(this.getFilterValue(filterGroup.key) === opt ? '#0A59F7' : '#FAFBFF');
                            Text.fontColor(this.getFilterValue(filterGroup.key) === opt ? '#FFFFFF' : '#333333');
                            Text.borderRadius(16);
                            Text.border({ width: this.getFilterValue(filterGroup.key) === opt ? 0 : 1, color: '#0A59F7' });
                            Text.margin({ right: 8, bottom: 8 });
                            Text.fontSize(13);
                            Text.padding(10);
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
        // 动态筛选条件
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 操作按钮
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/FundManager.ets(231:13)", "entry");
            // 操作按钮
            Row.margin({ top: 8, bottom: 8 });
            // 操作按钮
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('清除', { type: ButtonType.Capsule });
            Button.debugLine("entry/src/main/ets/pages/FundManager.ets(232:15)", "entry");
            Button.onClick(() => this.onClear());
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
            Button.debugLine("entry/src/main/ets/pages/FundManager.ets(241:15)", "entry");
            Button.onClick(() => this.onSearch());
            Button.backgroundColor('#0A59F7');
            Button.fontColor('#FFFFFF');
            Button.borderRadius(24);
            Button.layoutWeight(1);
            Button.height(44);
            Button.fontSize(16);
        }, Button);
        Button.pop();
        // 操作按钮
        Row.pop();
        // ===== 筛选区卡片 =====
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // ===== 表格区卡片 =====
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/FundManager.ets(266:11)", "entry");
            // ===== 表格区卡片 =====
            Column.padding(24);
            // ===== 表格区卡片 =====
            Column.backgroundColor('#FFFFFF');
            // ===== 表格区卡片 =====
            Column.borderRadius(16);
            // ===== 表格区卡片 =====
            Column.margin({ bottom: 24 });
            // ===== 表格区卡片 =====
            Column.width('100%');
            // ===== 表格区卡片 =====
            Column.shadow({
                radius: 16,
                color: '#1A2978FB',
                offsetX: 0,
                offsetY: 4
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/FundManager.ets(267:13)", "entry");
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基金经理列表');
            Text.debugLine("entry/src/main/ets/pages/FundManager.ets(268:15)", "entry");
            Text.fontSize(18);
            Text.fontColor('#1D2129');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/FundManager.ets(272:15)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`共 ${this.total} 条记录`);
            Text.debugLine("entry/src/main/ets/pages/FundManager.ets(273:15)", "entry");
            Text.fontSize(14);
            Text.fontColor('#86909C');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
            Flex.debugLine("entry/src/main/ets/pages/FundManager.ets(279:13)", "entry");
            Flex.backgroundColor('#F0F5FF');
            Flex.padding({ left: 16, right: 16, top: 12, bottom: 12 });
            Flex.borderRadius(8);
            Flex.width('100%');
            Flex.height(48);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基金经理');
            Text.debugLine("entry/src/main/ets/pages/FundManager.ets(280:15)", "entry");
            Text.width(80);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基金公司');
            Text.debugLine("entry/src/main/ets/pages/FundManager.ets(281:15)", "entry");
            Text.width(120);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('操作');
            Text.debugLine("entry/src/main/ets/pages/FundManager.ets(282:15)", "entry");
            Text.width(80);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 8 });
            List.debugLine("entry/src/main/ets/pages/FundManager.ets(290:13)", "entry");
            List.layoutWeight(1);
            List.width('100%');
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
                        ListItem.debugLine("entry/src/main/ets/pages/FundManager.ets(292:17)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
                            Flex.debugLine("entry/src/main/ets/pages/FundManager.ets(293:19)", "entry");
                            Flex.padding({ left: 16, right: 16, top: 14, bottom: 14 });
                            Flex.width('100%');
                            Flex.backgroundColor('#FFFFFF');
                            Flex.borderRadius(8);
                        }, Flex);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.managerName ?? '');
                            Text.debugLine("entry/src/main/ets/pages/FundManager.ets(294:21)", "entry");
                            Text.width(80);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.companyName ?? '');
                            Text.debugLine("entry/src/main/ets/pages/FundManager.ets(295:21)", "entry");
                            Text.width(120);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Button.createWithLabel('详情', { type: ButtonType.Normal });
                            Button.debugLine("entry/src/main/ets/pages/FundManager.ets(296:21)", "entry");
                            Button.width(80);
                            Button.height(32);
                            Button.backgroundColor('#F0F5FF');
                            Button.fontColor('#0A59F7');
                            Button.borderRadius(6);
                            Button.fontSize(13);
                            Button.onClick(() => {
                                this.detailManager = row;
                                this.showDetailDialog = true;
                            });
                        }, Button);
                        Button.pop();
                        Flex.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.tableData, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/FundManager.ets(324:13)", "entry");
            Row.justifyContent(FlexAlign.Center);
            Row.margin({ top: 24, bottom: 16 });
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('←', { type: ButtonType.Circle });
            Button.debugLine("entry/src/main/ets/pages/FundManager.ets(325:15)", "entry");
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
            Text.debugLine("entry/src/main/ets/pages/FundManager.ets(335:15)", "entry");
            Text.fontSize(16);
            Text.fontColor('#666666');
            Text.margin({ left: 16, right: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('→', { type: ButtonType.Circle });
            Button.debugLine("entry/src/main/ets/pages/FundManager.ets(340:15)", "entry");
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
        Row.pop();
        // ===== 表格区卡片 =====
        Column.pop();
        Column.pop();
        // 主内容区
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 详情弹窗
            if (this.showDetailDialog) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/FundManager.ets(376:9)", "entry");
                        Column.padding(32);
                        Column.backgroundColor('#FFFFFF');
                        Column.borderRadius(24);
                        Column.width('90%');
                        Column.align(Alignment.Center);
                        Column.zIndex(999);
                        Column.position({ x: 0, y: 0 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/pages/FundManager.ets(377:11)", "entry");
                        Row.margin({ bottom: 24 });
                        Row.padding({ bottom: 12, top: 8 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('经理详情');
                        Text.debugLine("entry/src/main/ets/pages/FundManager.ets(378:13)", "entry");
                        Text.fontSize(20);
                        Text.fontColor('#1D2129');
                        Text.fontWeight(FontWeight.Bold);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                        Blank.debugLine("entry/src/main/ets/pages/FundManager.ets(382:13)", "entry");
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithChild();
                        Button.debugLine("entry/src/main/ets/pages/FundManager.ets(383:13)", "entry");
                        Button.onClick(() => this.showDetailDialog = false);
                        Button.width(32);
                        Button.height(32);
                        Button.backgroundColor(Color.Transparent);
                    }, Button);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('×');
                        Text.debugLine("entry/src/main/ets/pages/FundManager.ets(384:15)", "entry");
                        Text.fontSize(24);
                        Text.fontColor('#666666');
                    }, Text);
                    Text.pop();
                    Button.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 详细信息列表
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/FundManager.ets(397:11)", "entry");
                        // 详细信息列表
                        Column.padding(24);
                        // 详细信息列表
                        Column.backgroundColor('#F7F8FA');
                        // 详细信息列表
                        Column.borderRadius(12);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('基金经理: ' + (this.detailManager.managerName ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundManager.ets(398:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('基金公司: ' + (this.detailManager.companyName ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundManager.ets(401:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('在管基金规模(亿元): ' + (this.detailManager.managedAssets?.toString() ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundManager.ets(404:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('在管基金(只): ' + (this.detailManager.managedCount?.toString() ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundManager.ets(407:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('最高学历: ' + (this.detailManager.highestEducation ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundManager.ets(410:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('任职年限: ' + (this.detailManager.tenureYears ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundManager.ets(413:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('有效资产规模(亿元): ' + (this.detailManager.effectiveAssets?.toString() ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundManager.ets(416:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('权益类基金历史收益率: ' + (this.detailManager.equityReturn ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundManager.ets(419:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('债权类基金历史收益率: ' + (this.detailManager.bondReturn ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundManager.ets(422:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('任职年化收益率: ' + (this.detailManager.annualizedReturn ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundManager.ets(425:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('胜率: ' + (this.detailManager.winRate ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundManager.ets(428:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    // 详细信息列表
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('关闭', { type: ButtonType.Capsule });
                        Button.debugLine("entry/src/main/ets/pages/FundManager.ets(436:11)", "entry");
                        Button.onClick(() => this.showDetailDialog = false);
                        Button.width('100%');
                        Button.height(48);
                        Button.backgroundColor('#0A59F7');
                        Button.fontColor('#FFFFFF');
                        Button.fontSize(16);
                        Button.margin({ top: 8 });
                    }, Button);
                    Button.pop();
                    Column.pop();
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
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "FundManagerPage";
    }
}
registerNamedRoute(() => new FundManagerPage(undefined, {}), "", { bundleName: "com.example.component", moduleName: "entry", pagePath: "pages/FundManager", pageFullPath: "entry/src/main/ets/pages/FundManager", integratedHsp: "false", moduleType: "followWithHap" });
