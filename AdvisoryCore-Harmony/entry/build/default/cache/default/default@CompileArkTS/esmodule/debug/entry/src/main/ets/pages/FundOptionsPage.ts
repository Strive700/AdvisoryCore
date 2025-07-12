if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FundOptionsPage_Params {
    tableData?: FundOption[];
    total?: number;
    pageSize?: number;
    currentPage?: number;
    alertDialogVisible?: boolean;
    alertParam?: string;
    alertThreshold?: string;
    alertAction?: string;
    editingRow?: FundOption | null;
}
import RequestAxios from "@bundle:com.example.component/entry/ets/utility/BaseRequest";
import promptAction from "@ohos:promptAction";
class FundOption {
    watchlistid: number = 0;
    fund_code: string = '';
    fund_name: string = '';
    manager_name: string = '';
    fund_type: string = '';
    latest_nav: number = 0;
    latest_nav_date: string = '';
    return_1m: string = '';
    return_ytd: string = '';
    max_drawdown_1y: string = '';
    operation_cycle: string = '';
    fund_size: number = 0;
    inception_date: string = '';
    quality_score: number = 0;
    description?: string;
    alert_param?: string;
    trigger_date?: string;
    actual_value?: string;
    threshold?: string;
    alert_status?: number;
    alertid?: number;
    alert_create_time?: string;
}
interface FundOptionsData {
    list: FundOption[];
    total: number;
}
interface FundAlertResponse {
    data: FundOption[];
    Code?: number;
    status?: string;
}
interface GeneratedObjectLiteralInterface_1 {
    fundCode: string;
    alertParam: string;
    threshold: number;
    alertAction: string;
    description: string;
}
class FundOptionsPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__tableData = new ObservedPropertyObjectPU([], this, "tableData");
        this.__total = new ObservedPropertySimplePU(0, this, "total");
        this.__pageSize = new ObservedPropertySimplePU(10, this, "pageSize");
        this.__currentPage = new ObservedPropertySimplePU(1, this, "currentPage");
        this.__alertDialogVisible = new ObservedPropertySimplePU(false, this, "alertDialogVisible");
        this.__alertParam = new ObservedPropertySimplePU('', this, "alertParam");
        this.__alertThreshold = new ObservedPropertySimplePU('', this, "alertThreshold");
        this.__alertAction = new ObservedPropertySimplePU('', this, "alertAction");
        this.__editingRow = new ObservedPropertyObjectPU(null, this, "editingRow");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FundOptionsPage_Params) {
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
        if (params.alertDialogVisible !== undefined) {
            this.alertDialogVisible = params.alertDialogVisible;
        }
        if (params.alertParam !== undefined) {
            this.alertParam = params.alertParam;
        }
        if (params.alertThreshold !== undefined) {
            this.alertThreshold = params.alertThreshold;
        }
        if (params.alertAction !== undefined) {
            this.alertAction = params.alertAction;
        }
        if (params.editingRow !== undefined) {
            this.editingRow = params.editingRow;
        }
    }
    updateStateVars(params: FundOptionsPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__tableData.purgeDependencyOnElmtId(rmElmtId);
        this.__total.purgeDependencyOnElmtId(rmElmtId);
        this.__pageSize.purgeDependencyOnElmtId(rmElmtId);
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
        this.__alertDialogVisible.purgeDependencyOnElmtId(rmElmtId);
        this.__alertParam.purgeDependencyOnElmtId(rmElmtId);
        this.__alertThreshold.purgeDependencyOnElmtId(rmElmtId);
        this.__alertAction.purgeDependencyOnElmtId(rmElmtId);
        this.__editingRow.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__tableData.aboutToBeDeleted();
        this.__total.aboutToBeDeleted();
        this.__pageSize.aboutToBeDeleted();
        this.__currentPage.aboutToBeDeleted();
        this.__alertDialogVisible.aboutToBeDeleted();
        this.__alertParam.aboutToBeDeleted();
        this.__alertThreshold.aboutToBeDeleted();
        this.__alertAction.aboutToBeDeleted();
        this.__editingRow.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __tableData: ObservedPropertyObjectPU<FundOption[]>;
    get tableData() {
        return this.__tableData.get();
    }
    set tableData(newValue: FundOption[]) {
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
    private __alertDialogVisible: ObservedPropertySimplePU<boolean>;
    get alertDialogVisible() {
        return this.__alertDialogVisible.get();
    }
    set alertDialogVisible(newValue: boolean) {
        this.__alertDialogVisible.set(newValue);
    }
    private __alertParam: ObservedPropertySimplePU<string>;
    get alertParam() {
        return this.__alertParam.get();
    }
    set alertParam(newValue: string) {
        this.__alertParam.set(newValue);
    }
    private __alertThreshold: ObservedPropertySimplePU<string>;
    get alertThreshold() {
        return this.__alertThreshold.get();
    }
    set alertThreshold(newValue: string) {
        this.__alertThreshold.set(newValue);
    }
    private __alertAction: ObservedPropertySimplePU<string>;
    get alertAction() {
        return this.__alertAction.get();
    }
    set alertAction(newValue: string) {
        this.__alertAction.set(newValue);
    }
    private __editingRow: ObservedPropertyObjectPU<FundOption | null>;
    get editingRow() {
        return this.__editingRow.get();
    }
    set editingRow(newValue: FundOption | null) {
        this.__editingRow.set(newValue);
    }
    aboutToAppear() {
        this.onSearch();
    }
    private onSearch() {
        RequestAxios.get('/fund-watchlist/alerts', {})
            .then((res: import('@ohos/axios').AxiosResponse<FundAlertResponse>) => {
            if (res && res.data && Array.isArray(res.data.data)) {
                this.tableData = res.data.data;
                this.total = res.data.data.length;
            }
            else {
                this.tableData = [];
                this.total = 0;
            }
        })
            .catch((e: Error) => {
            promptAction.showToast({ message: '查询失败: ' + String(e) });
        });
    }
    private handlePageChange(page: number) {
        this.currentPage = page;
        this.onSearch();
    }
    private async handleDelete(row: FundOption) {
        try {
            await RequestAxios.delete(`/fund-watchlist/${row.watchlistid}`);
            promptAction.showToast({ message: '出库成功' });
            this.onSearch();
        }
        catch (e) {
            promptAction.showToast({ message: '出库失败' });
        }
    }
    private openAlertDialog(row: FundOption) {
        this.editingRow = row;
        promptAction.showDialog({
            title: '设置预警参数',
            message: '是否为该基金设置预警参数？',
            buttons: [
                { text: '取消', color: '#999999' },
                { text: '确定', color: '#0A59F7' }
            ]
        }).then((result) => {
            if (result.index === 1) {
                this.saveAlertParam();
            }
        });
    }
    private closeAlertDialog() {
        this.alertDialogVisible = false;
    }
    private async saveAlertParam() {
        if (!this.editingRow)
            return;
        const payload: GeneratedObjectLiteralInterface_1 = {
            fundCode: this.editingRow.fund_code,
            alertParam: this.alertParam,
            threshold: Number(this.alertThreshold),
            alertAction: this.alertAction,
            description: ''
        };
        try {
            await RequestAxios.post('/fund-alerts/set', payload);
            promptAction.showToast({ message: '保存成功' });
            this.closeAlertDialog();
            this.onSearch();
        }
        catch {
            promptAction.showToast({ message: '保存失败' });
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Top });
            Stack.width('100%');
            Stack.height('100%');
            Stack.backgroundColor('#F7FAFF');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.height('100%');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: 24, right: 24 });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(24);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(16);
            Column.margin({ bottom: 24, top: 40 });
            Column.width('100%');
            Column.shadow({ radius: 16, color: '#1A2978FB', offsetX: 0, offsetY: 4 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基金备选库');
            Text.fontSize(18);
            Text.fontColor('#1D2129');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`共 ${this.total} 条记录`);
            Text.fontSize(14);
            Text.fontColor('#86909C');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 16 });
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
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.padding(18);
                            Column.backgroundColor('#FFFFFF');
                            Column.borderRadius(14);
                            Column.shadow({ radius: 8, color: '#1A2978FB', offsetX: 0, offsetY: 2 });
                            Column.width('100%');
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.margin({ bottom: 8 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.fund_name ?? '');
                            Text.fontSize(16);
                            Text.fontWeight(FontWeight.Bold);
                            Text.fontColor('#0A59F7');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Blank.create();
                        }, Blank);
                        Blank.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.fund_code ?? '');
                            Text.fontSize(12);
                            Text.fontColor('#86909C');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.margin({ bottom: 2 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('基金经理:');
                            Text.fontSize(12);
                            Text.fontColor('#666');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.manager_name ?? '');
                            Text.fontSize(12);
                            Text.fontColor('#333');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.margin({ bottom: 2 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('类型:');
                            Text.fontSize(12);
                            Text.fontColor('#666');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.fund_type ?? '');
                            Text.fontSize(12);
                            Text.fontColor('#333');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.margin({ bottom: 2 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('运行周期:');
                            Text.fontSize(12);
                            Text.fontColor('#666');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.operation_cycle ?? '');
                            Text.fontSize(12);
                            Text.fontColor('#333');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.margin({ bottom: 2 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('最新净值:');
                            Text.fontSize(12);
                            Text.fontColor('#666');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.latest_nav?.toString() ?? '');
                            Text.fontSize(12);
                            Text.fontColor('#333');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.margin({ bottom: 2 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('净值日期:');
                            Text.fontSize(12);
                            Text.fontColor('#666');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.latest_nav_date ?? '');
                            Text.fontSize(12);
                            Text.fontColor('#333');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.margin({ bottom: 2 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('基金规模:');
                            Text.fontSize(12);
                            Text.fontColor('#666');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.fund_size?.toString() ?? '');
                            Text.fontSize(12);
                            Text.fontColor('#333');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.margin({ bottom: 2 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('近一月收益率:');
                            Text.fontSize(12);
                            Text.fontColor('#666');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.return_1m?.toString() ?? '');
                            Text.fontSize(12);
                            Text.fontColor('#333');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.margin({ bottom: 2 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('今年以来收益率:');
                            Text.fontSize(12);
                            Text.fontColor('#666');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.return_ytd?.toString() ?? '');
                            Text.fontSize(12);
                            Text.fontColor('#333');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.margin({ bottom: 2 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('最大回撤:');
                            Text.fontSize(12);
                            Text.fontColor('#666');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.max_drawdown_1y?.toString() ?? '');
                            Text.fontSize(12);
                            Text.fontColor('#333');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.margin({ bottom: 2 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('成立日期:');
                            Text.fontSize(12);
                            Text.fontColor('#666');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.inception_date ?? '');
                            Text.fontSize(12);
                            Text.fontColor('#333');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.margin({ bottom: 2 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('评分:');
                            Text.fontSize(12);
                            Text.fontColor('#666');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.quality_score?.toString() ?? '');
                            Text.fontSize(12);
                            Text.fontColor('#333');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.margin({ bottom: 10 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create('预警:');
                            Text.fontSize(12);
                            Text.fontColor('#F53F3F');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.description ?? '-');
                            Text.fontSize(12);
                            Text.fontColor('#F53F3F');
                            Text.margin({ right: 8 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(row.alert_param ?? '');
                            Text.fontSize(12);
                            Text.fontColor('#F53F3F');
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Button.createWithLabel('出库', { type: ButtonType.Normal });
                            Button.width(60);
                            Button.height(32);
                            Button.backgroundColor('#F0F5FF');
                            Button.fontColor('#F53F3F');
                            Button.borderRadius(6);
                            Button.fontSize(12);
                            Button.margin({ right: 16 });
                            Button.onClick(() => this.handleDelete(row));
                        }, Button);
                        Button.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Button.createWithLabel('设置预警', { type: ButtonType.Normal });
                            Button.width(80);
                            Button.height(32);
                            Button.backgroundColor('#F0F5FF');
                            Button.fontColor('#0A59F7');
                            Button.borderRadius(6);
                            Button.fontSize(12);
                            Button.onClick(() => this.openAlertDialog(row));
                        }, Button);
                        Button.pop();
                        Row.pop();
                        Column.pop();
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
            Row.justifyContent(FlexAlign.Center);
            Row.margin({ top: 24, bottom: 16 });
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('←', { type: ButtonType.Circle });
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
            Text.fontSize(16);
            Text.fontColor('#666666');
            Text.margin({ left: 16, right: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('→', { type: ButtonType.Circle });
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
        Column.pop();
        Column.pop();
        Scroll.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "FundOptionsPage";
    }
}
registerNamedRoute(() => new FundOptionsPage(undefined, {}), "", { bundleName: "com.example.component", moduleName: "entry", pagePath: "pages/FundOptionsPage", pageFullPath: "entry/src/main/ets/pages/FundOptionsPage", integratedHsp: "false", moduleType: "followWithHap" });
