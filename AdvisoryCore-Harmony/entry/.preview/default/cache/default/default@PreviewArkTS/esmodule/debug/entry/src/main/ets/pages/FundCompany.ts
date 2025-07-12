if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FundCompanyPage_Params {
    searchText?: string;
    selectedDate?: string;
    selectedCapital?: string;
    selectedStructure?: string;
    selectedAsset?: string;
    selectedEquityReturn?: string;
    selectedBondReturn?: string;
    tableData?: FundCompany[];
    currentPage?: number;
    pageSize?: number;
    total?: number;
    showDetailDialog?: boolean;
    detailCompany?: FundCompany;
    dateOptions?: string[];
    capitalOptions?: string[];
    structureOptions?: string[];
    assetOptions?: string[];
    equityReturnOptions?: string[];
    bondReturnOptions?: string[];
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
class FundCompany {
    companyName: string = '';
    establishmentDate: string = '';
    registeredCapital: number = 0;
    firstFundDate: string = '';
    managerCount: number = 0;
    fundCount: number = 0;
    effectiveAssets: number = 0;
    equityCapital: number = 0;
    equityReturn: string = '';
    bondReturn: string = '';
}
class FundCompanyQueryParams {
    page: number = 1;
    pageSize: number = 10;
    companyName?: string;
    minEffectiveAssets?: number;
    maxEffectiveAssets?: number;
    minEquityReturn?: number;
    maxEquityReturn?: number;
    minBondReturn?: number;
    maxBondReturn?: number;
}
class FundCompanyListResponse {
    list: FundCompany[] = [];
    total: number = 0;
}
class FundCompanyPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__searchText = new ObservedPropertySimplePU('', this, "searchText");
        this.__selectedDate = new ObservedPropertySimplePU('', this, "selectedDate");
        this.__selectedCapital = new ObservedPropertySimplePU('', this, "selectedCapital");
        this.__selectedStructure = new ObservedPropertySimplePU('', this, "selectedStructure");
        this.__selectedAsset = new ObservedPropertySimplePU('', this, "selectedAsset");
        this.__selectedEquityReturn = new ObservedPropertySimplePU('', this, "selectedEquityReturn");
        this.__selectedBondReturn = new ObservedPropertySimplePU('', this, "selectedBondReturn");
        this.__tableData = new ObservedPropertyObjectPU([], this, "tableData");
        this.__currentPage = new ObservedPropertySimplePU(1, this, "currentPage");
        this.__pageSize = new ObservedPropertySimplePU(10, this, "pageSize");
        this.__total = new ObservedPropertySimplePU(0, this, "total");
        this.__showDetailDialog = new ObservedPropertySimplePU(false, this, "showDetailDialog");
        this.__detailCompany = new ObservedPropertyObjectPU(new FundCompany(), this, "detailCompany");
        this.dateOptions = ['5-10年', '3-5年', '1年以内'];
        this.capitalOptions = ['100亿以上', '80-100亿', '50-80亿', '30-50亿'];
        this.structureOptions = ['100亿以上', '80-100亿', '50-80亿', '30-50亿'];
        this.assetOptions = ['100亿以上', '80-100亿', '50-80亿', '30-50亿'];
        this.equityReturnOptions = ['大于200%', '100%-200%', '50%-100%', '50%以下'];
        this.bondReturnOptions = ['大于200%', '100%-200%', '50%-100%', '50%以下'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FundCompanyPage_Params) {
        if (params.searchText !== undefined) {
            this.searchText = params.searchText;
        }
        if (params.selectedDate !== undefined) {
            this.selectedDate = params.selectedDate;
        }
        if (params.selectedCapital !== undefined) {
            this.selectedCapital = params.selectedCapital;
        }
        if (params.selectedStructure !== undefined) {
            this.selectedStructure = params.selectedStructure;
        }
        if (params.selectedAsset !== undefined) {
            this.selectedAsset = params.selectedAsset;
        }
        if (params.selectedEquityReturn !== undefined) {
            this.selectedEquityReturn = params.selectedEquityReturn;
        }
        if (params.selectedBondReturn !== undefined) {
            this.selectedBondReturn = params.selectedBondReturn;
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
        if (params.detailCompany !== undefined) {
            this.detailCompany = params.detailCompany;
        }
        if (params.dateOptions !== undefined) {
            this.dateOptions = params.dateOptions;
        }
        if (params.capitalOptions !== undefined) {
            this.capitalOptions = params.capitalOptions;
        }
        if (params.structureOptions !== undefined) {
            this.structureOptions = params.structureOptions;
        }
        if (params.assetOptions !== undefined) {
            this.assetOptions = params.assetOptions;
        }
        if (params.equityReturnOptions !== undefined) {
            this.equityReturnOptions = params.equityReturnOptions;
        }
        if (params.bondReturnOptions !== undefined) {
            this.bondReturnOptions = params.bondReturnOptions;
        }
    }
    updateStateVars(params: FundCompanyPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__searchText.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedDate.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedCapital.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedStructure.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedAsset.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedEquityReturn.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedBondReturn.purgeDependencyOnElmtId(rmElmtId);
        this.__tableData.purgeDependencyOnElmtId(rmElmtId);
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
        this.__pageSize.purgeDependencyOnElmtId(rmElmtId);
        this.__total.purgeDependencyOnElmtId(rmElmtId);
        this.__showDetailDialog.purgeDependencyOnElmtId(rmElmtId);
        this.__detailCompany.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__searchText.aboutToBeDeleted();
        this.__selectedDate.aboutToBeDeleted();
        this.__selectedCapital.aboutToBeDeleted();
        this.__selectedStructure.aboutToBeDeleted();
        this.__selectedAsset.aboutToBeDeleted();
        this.__selectedEquityReturn.aboutToBeDeleted();
        this.__selectedBondReturn.aboutToBeDeleted();
        this.__tableData.aboutToBeDeleted();
        this.__currentPage.aboutToBeDeleted();
        this.__pageSize.aboutToBeDeleted();
        this.__total.aboutToBeDeleted();
        this.__showDetailDialog.aboutToBeDeleted();
        this.__detailCompany.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __searchText: ObservedPropertySimplePU<string>;
    get searchText() {
        return this.__searchText.get();
    }
    set searchText(newValue: string) {
        this.__searchText.set(newValue);
    }
    private __selectedDate: ObservedPropertySimplePU<string>;
    get selectedDate() {
        return this.__selectedDate.get();
    }
    set selectedDate(newValue: string) {
        this.__selectedDate.set(newValue);
    }
    private __selectedCapital: ObservedPropertySimplePU<string>;
    get selectedCapital() {
        return this.__selectedCapital.get();
    }
    set selectedCapital(newValue: string) {
        this.__selectedCapital.set(newValue);
    }
    private __selectedStructure: ObservedPropertySimplePU<string>;
    get selectedStructure() {
        return this.__selectedStructure.get();
    }
    set selectedStructure(newValue: string) {
        this.__selectedStructure.set(newValue);
    }
    private __selectedAsset: ObservedPropertySimplePU<string>;
    get selectedAsset() {
        return this.__selectedAsset.get();
    }
    set selectedAsset(newValue: string) {
        this.__selectedAsset.set(newValue);
    }
    private __selectedEquityReturn: ObservedPropertySimplePU<string>;
    get selectedEquityReturn() {
        return this.__selectedEquityReturn.get();
    }
    set selectedEquityReturn(newValue: string) {
        this.__selectedEquityReturn.set(newValue);
    }
    private __selectedBondReturn: ObservedPropertySimplePU<string>;
    get selectedBondReturn() {
        return this.__selectedBondReturn.get();
    }
    set selectedBondReturn(newValue: string) {
        this.__selectedBondReturn.set(newValue);
    }
    private __tableData: ObservedPropertyObjectPU<FundCompany[]>;
    get tableData() {
        return this.__tableData.get();
    }
    set tableData(newValue: FundCompany[]) {
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
    private __detailCompany: ObservedPropertyObjectPU<FundCompany>;
    get detailCompany() {
        return this.__detailCompany.get();
    }
    set detailCompany(newValue: FundCompany) {
        this.__detailCompany.set(newValue);
    }
    private readonly dateOptions: string[];
    private readonly capitalOptions: string[];
    private readonly structureOptions: string[];
    private readonly assetOptions: string[];
    private readonly equityReturnOptions: string[];
    private readonly bondReturnOptions: string[];
    aboutToAppear() {
        this.onSearch();
    }
    private getMinMaxByLabel(label: string): MinMax {
        if (!label)
            return new MinMax();
        if (label.includes('以上')) {
            return new MinMax(parseFloat(label), undefined);
        }
        if (label.includes('以下')) {
            return new MinMax(undefined, parseFloat(label));
        }
        if (label.includes('-')) {
            let parts = label.replace(/[^0-9\.-]/g, '').split('-');
            return new MinMax(parseFloat(parts[0]), parseFloat(parts[1]));
        }
        return new MinMax();
    }
    private onSearch() {
        let assetRange = this.getMinMaxByLabel(this.selectedAsset);
        let equityRange = this.getMinMaxByLabel(this.selectedEquityReturn);
        let bondRange = this.getMinMaxByLabel(this.selectedBondReturn);
        let params = new FundCompanyQueryParams();
        params.page = this.currentPage;
        params.pageSize = this.pageSize;
        if (this.searchText)
            params.companyName = this.searchText;
        if (assetRange.min !== undefined)
            params.minEffectiveAssets = assetRange.min;
        if (assetRange.max !== undefined)
            params.maxEffectiveAssets = assetRange.max;
        if (equityRange.min !== undefined)
            params.minEquityReturn = equityRange.min;
        if (equityRange.max !== undefined)
            params.maxEquityReturn = equityRange.max;
        if (bondRange.min !== undefined)
            params.minBondReturn = bondRange.min;
        if (bondRange.max !== undefined)
            params.maxBondReturn = bondRange.max;
        RequestAxios.post<FundCompanyListResponse>('/fund-companies/query', params)
            .then((res: import('@ohos/axios').AxiosResponse<FundCompanyListResponse>) => {
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
        this.searchText = '';
        this.selectedDate = '';
        this.selectedCapital = '';
        this.selectedStructure = '';
        this.selectedAsset = '';
        this.selectedEquityReturn = '';
        this.selectedBondReturn = '';
        this.onSearch();
    }
    private handlePageChange(page: number) {
        this.currentPage = page;
        this.onSearch();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Top });
            Stack.debugLine("entry/src/main/ets/pages/FundCompany.ets(133:5)", "entry");
            Stack.width('100%');
            Stack.height('100%');
            Stack.backgroundColor('#F7FAFF');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 主内容区
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/FundCompany.ets(135:7)", "entry");
            // 主内容区
            Scroll.width('100%');
            // 主内容区
            Scroll.height('100%');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/FundCompany.ets(136:9)", "entry");
            Column.width('100%');
            Column.padding({ left: 24, right: 24 });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // ===== 筛选区卡片 =====
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/FundCompany.ets(138:11)", "entry");
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
            Row.debugLine("entry/src/main/ets/pages/FundCompany.ets(139:13)", "entry");
            Row.margin({ bottom: 18 });
            Row.height(44);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基金公司:');
            Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(140:15)", "entry");
            Text.fontSize(16);
            Text.fontColor('#0A59F7');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入基金公司名称', text: this.searchText });
            TextInput.debugLine("entry/src/main/ets/pages/FundCompany.ets(144:15)", "entry");
            TextInput.onChange(v => this.searchText = v);
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
            Flex.debugLine("entry/src/main/ets/pages/FundCompany.ets(158:13)", "entry");
            // 动态筛选条件
            Flex.margin({ bottom: 16 });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 设立日期
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/FundCompany.ets(160:15)", "entry");
            // 设立日期
            Column.margin({ bottom: 16 });
            // 设立日期
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('设立日期:');
            Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(161:17)", "entry");
            Text.fontSize(14);
            Text.fontColor('#666666');
            Text.margin({ bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.debugLine("entry/src/main/ets/pages/FundCompany.ets(166:17)", "entry");
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const opt = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(opt);
                    Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(168:21)", "entry");
                    Text.onClick(() => this.selectedDate = opt);
                    Text.backgroundColor(this.selectedDate === opt ? '#0A59F7' : '#FAFBFF');
                    Text.fontColor(this.selectedDate === opt ? '#FFFFFF' : '#333333');
                    Text.borderRadius(16);
                    Text.border({ width: this.selectedDate === opt ? 0 : 1, color: '#0A59F7' });
                    Text.margin({ right: 8, bottom: 8 });
                    Text.fontSize(13);
                    Text.padding(10);
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.dateOptions, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        // 设立日期
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 注册资本
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/FundCompany.ets(183:15)", "entry");
            // 注册资本
            Column.margin({ bottom: 16 });
            // 注册资本
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('注册资本:');
            Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(184:17)", "entry");
            Text.fontSize(14);
            Text.fontColor('#666666');
            Text.margin({ bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.debugLine("entry/src/main/ets/pages/FundCompany.ets(189:17)", "entry");
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const opt = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(opt);
                    Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(191:21)", "entry");
                    Text.onClick(() => this.selectedCapital = opt);
                    Text.backgroundColor(this.selectedCapital === opt ? '#0A59F7' : '#FAFBFF');
                    Text.fontColor(this.selectedCapital === opt ? '#FFFFFF' : '#333333');
                    Text.borderRadius(16);
                    Text.border({ width: this.selectedCapital === opt ? 0 : 1, color: '#0A59F7' });
                    Text.margin({ right: 8, bottom: 8 });
                    Text.fontSize(13);
                    Text.padding(10);
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.capitalOptions, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        // 注册资本
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 股东结构
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/FundCompany.ets(206:15)", "entry");
            // 股东结构
            Column.margin({ bottom: 16 });
            // 股东结构
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('股东结构:');
            Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(207:17)", "entry");
            Text.fontSize(14);
            Text.fontColor('#666666');
            Text.margin({ bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.debugLine("entry/src/main/ets/pages/FundCompany.ets(212:17)", "entry");
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const opt = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(opt);
                    Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(214:21)", "entry");
                    Text.onClick(() => this.selectedStructure = opt);
                    Text.backgroundColor(this.selectedStructure === opt ? '#0A59F7' : '#FAFBFF');
                    Text.fontColor(this.selectedStructure === opt ? '#FFFFFF' : '#333333');
                    Text.borderRadius(16);
                    Text.border({ width: this.selectedStructure === opt ? 0 : 1, color: '#0A59F7' });
                    Text.margin({ right: 8, bottom: 8 });
                    Text.fontSize(13);
                    Text.padding(10);
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.structureOptions, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        // 股东结构
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 有效资产规模
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/FundCompany.ets(229:15)", "entry");
            // 有效资产规模
            Column.margin({ bottom: 16 });
            // 有效资产规模
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('有效资产规模:');
            Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(230:17)", "entry");
            Text.fontSize(14);
            Text.fontColor('#666666');
            Text.margin({ bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.debugLine("entry/src/main/ets/pages/FundCompany.ets(235:17)", "entry");
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const opt = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(opt);
                    Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(237:21)", "entry");
                    Text.onClick(() => this.selectedAsset = opt);
                    Text.backgroundColor(this.selectedAsset === opt ? '#0A59F7' : '#FAFBFF');
                    Text.fontColor(this.selectedAsset === opt ? '#FFFFFF' : '#333333');
                    Text.borderRadius(16);
                    Text.border({ width: this.selectedAsset === opt ? 0 : 1, color: '#0A59F7' });
                    Text.margin({ right: 8, bottom: 8 });
                    Text.fontSize(13);
                    Text.padding(10);
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.assetOptions, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        // 有效资产规模
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 权益类收益
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/FundCompany.ets(252:15)", "entry");
            // 权益类收益
            Column.margin({ bottom: 16 });
            // 权益类收益
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('权益类基金历史收益率:');
            Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(253:17)", "entry");
            Text.fontSize(14);
            Text.fontColor('#666666');
            Text.margin({ bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.debugLine("entry/src/main/ets/pages/FundCompany.ets(258:17)", "entry");
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const opt = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(opt);
                    Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(260:21)", "entry");
                    Text.onClick(() => this.selectedEquityReturn = opt);
                    Text.backgroundColor(this.selectedEquityReturn === opt ? '#0A59F7' : '#FAFBFF');
                    Text.fontColor(this.selectedEquityReturn === opt ? '#FFFFFF' : '#333333');
                    Text.borderRadius(16);
                    Text.border({ width: this.selectedEquityReturn === opt ? 0 : 1, color: '#0A59F7' });
                    Text.margin({ right: 8, bottom: 8 });
                    Text.fontSize(13);
                    Text.padding(10);
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.equityReturnOptions, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        // 权益类收益
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 债权类收益
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/FundCompany.ets(275:15)", "entry");
            // 债权类收益
            Column.margin({ bottom: 16 });
            // 债权类收益
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('债权类基金历史收益率:');
            Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(276:17)", "entry");
            Text.fontSize(14);
            Text.fontColor('#666666');
            Text.margin({ bottom: 8 });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.debugLine("entry/src/main/ets/pages/FundCompany.ets(281:17)", "entry");
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const opt = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(opt);
                    Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(283:21)", "entry");
                    Text.onClick(() => this.selectedBondReturn = opt);
                    Text.backgroundColor(this.selectedBondReturn === opt ? '#0A59F7' : '#FAFBFF');
                    Text.fontColor(this.selectedBondReturn === opt ? '#FFFFFF' : '#333333');
                    Text.borderRadius(16);
                    Text.border({ width: this.selectedBondReturn === opt ? 0 : 1, color: '#0A59F7' });
                    Text.margin({ right: 8, bottom: 8 });
                    Text.fontSize(13);
                    Text.padding(10);
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.bondReturnOptions, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        // 债权类收益
        Column.pop();
        // 动态筛选条件
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 操作按钮
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/FundCompany.ets(301:13)", "entry");
            // 操作按钮
            Row.margin({ top: 8, bottom: 8 });
            // 操作按钮
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('清除', { type: ButtonType.Capsule });
            Button.debugLine("entry/src/main/ets/pages/FundCompany.ets(302:15)", "entry");
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
            Button.debugLine("entry/src/main/ets/pages/FundCompany.ets(311:15)", "entry");
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
            Column.debugLine("entry/src/main/ets/pages/FundCompany.ets(336:11)", "entry");
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
            Row.debugLine("entry/src/main/ets/pages/FundCompany.ets(337:13)", "entry");
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基金公司列表');
            Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(338:15)", "entry");
            Text.fontSize(18);
            Text.fontColor('#1D2129');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/FundCompany.ets(342:15)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`共 ${this.total} 条记录`);
            Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(343:15)", "entry");
            Text.fontSize(14);
            Text.fontColor('#86909C');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
            Flex.debugLine("entry/src/main/ets/pages/FundCompany.ets(349:13)", "entry");
            Flex.backgroundColor('#F0F5FF');
            Flex.padding({ left: 16, right: 16, top: 12, bottom: 12 });
            Flex.borderRadius(8);
            Flex.width('100%');
            Flex.height(48);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基金公司');
            Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(350:15)", "entry");
            Text.width(120);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('注册资本');
            Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(351:15)", "entry");
            Text.width(100);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('有效资产规模');
            Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(352:15)", "entry");
            Text.width(120);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('操作');
            Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(353:15)", "entry");
            Text.width(80);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 8 });
            List.debugLine("entry/src/main/ets/pages/FundCompany.ets(361:13)", "entry");
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
                        ListItem.debugLine("entry/src/main/ets/pages/FundCompany.ets(363:17)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Flex.create({ justifyContent: FlexAlign.Start, alignItems: ItemAlign.Center });
                            Flex.debugLine("entry/src/main/ets/pages/FundCompany.ets(364:19)", "entry");
                            Flex.padding({ left: 16, right: 16, top: 14, bottom: 14 });
                            Flex.width('100%');
                            Flex.backgroundColor('#FFFFFF');
                            Flex.borderRadius(8);
                        }, Flex);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.companyName ?? '');
                            Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(365:21)", "entry");
                            Text.width(120);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.registeredCapital?.toString() ?? '');
                            Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(366:21)", "entry");
                            Text.width(100);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.effectiveAssets?.toString() ?? '');
                            Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(367:21)", "entry");
                            Text.width(120);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Button.createWithLabel('详情', { type: ButtonType.Normal });
                            Button.debugLine("entry/src/main/ets/pages/FundCompany.ets(368:21)", "entry");
                            Button.width(80);
                            Button.height(32);
                            Button.backgroundColor('#F0F5FF');
                            Button.fontColor('#0A59F7');
                            Button.borderRadius(6);
                            Button.fontSize(13);
                            Button.onClick(() => {
                                this.detailCompany = row;
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
            Row.debugLine("entry/src/main/ets/pages/FundCompany.ets(396:13)", "entry");
            Row.justifyContent(FlexAlign.Center);
            Row.margin({ top: 24, bottom: 16 });
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('←', { type: ButtonType.Circle });
            Button.debugLine("entry/src/main/ets/pages/FundCompany.ets(397:15)", "entry");
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
            Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(407:15)", "entry");
            Text.fontSize(16);
            Text.fontColor('#666666');
            Text.margin({ left: 16, right: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('→', { type: ButtonType.Circle });
            Button.debugLine("entry/src/main/ets/pages/FundCompany.ets(412:15)", "entry");
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
            // 详情弹窗条件渲染，放在 Stack 内部
            if (this.showDetailDialog) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/FundCompany.ets(448:9)", "entry");
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
                        Row.debugLine("entry/src/main/ets/pages/FundCompany.ets(449:11)", "entry");
                        Row.margin({ bottom: 24 });
                        Row.padding({ bottom: 12, top: 8 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('公司详情');
                        Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(450:13)", "entry");
                        Text.fontSize(20);
                        Text.fontColor('#1D2129');
                        Text.fontWeight(FontWeight.Bold);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                        Blank.debugLine("entry/src/main/ets/pages/FundCompany.ets(454:13)", "entry");
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithChild();
                        Button.debugLine("entry/src/main/ets/pages/FundCompany.ets(455:13)", "entry");
                        Button.onClick(() => this.showDetailDialog = false);
                        Button.width(32);
                        Button.height(32);
                        Button.backgroundColor(Color.Transparent);
                    }, Button);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('×');
                        Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(456:15)", "entry");
                        Text.fontSize(24);
                        Text.fontColor('#666666');
                    }, Text);
                    Text.pop();
                    Button.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 详细信息列表
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/FundCompany.ets(469:11)", "entry");
                        // 详细信息列表
                        Column.padding(24);
                        // 详细信息列表
                        Column.backgroundColor('#F7F8FA');
                        // 详细信息列表
                        Column.borderRadius(12);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('基金公司: ' + (this.detailCompany.companyName ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(470:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('设立日期: ' + (this.detailCompany.establishmentDate ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(473:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('注册资本: ' + (this.detailCompany.registeredCapital?.toString() ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(476:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('首只基金成立日期: ' + (this.detailCompany.firstFundDate ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(479:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('基金管理人数量: ' + (this.detailCompany.managerCount?.toString() ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(482:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('基金个数: ' + (this.detailCompany.fundCount?.toString() ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(485:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('有效资产规模: ' + (this.detailCompany.effectiveAssets?.toString() ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(488:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('权益资本: ' + (this.detailCompany.equityCapital?.toString() ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(491:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('权益类基金历史收益率: ' + (this.detailCompany.equityReturn ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(494:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('债权类基金历史收益率: ' + (this.detailCompany.bondReturn ?? ''));
                        Text.debugLine("entry/src/main/ets/pages/FundCompany.ets(497:13)", "entry");
                        Text.fontSize(16);
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    // 详细信息列表
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('关闭', { type: ButtonType.Capsule });
                        Button.debugLine("entry/src/main/ets/pages/FundCompany.ets(505:11)", "entry");
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
        return "FundCompanyPage";
    }
}
registerNamedRoute(() => new FundCompanyPage(undefined, {}), "", { bundleName: "com.example.component", moduleName: "entry", pagePath: "pages/FundCompany", pageFullPath: "entry/src/main/ets/pages/FundCompany", integratedHsp: "false", moduleType: "followWithHap" });
