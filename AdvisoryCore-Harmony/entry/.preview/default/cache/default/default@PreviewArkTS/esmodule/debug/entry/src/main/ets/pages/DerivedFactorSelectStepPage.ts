if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DerivedFactorSelectStepPage_Params {
    allFactors?: DerivedFactor[];
    selectedFactors?: DerivedFactor[];
    search?: string;
    planName?: string;
    selectedCheckedIds?: string[];
}
import RequestAxios from "@bundle:com.example.component/entry/ets/utility/BaseRequest";
import promptAction from "@ohos:promptAction";
import router from "@ohos:router";
class DerivedFactor {
    id: string = '';
    name: string = '';
    checked: boolean = false;
    constructor(data?: Partial<DerivedFactor>) {
        if (data) {
            this.id = data.id ?? '';
            this.name = data.name ?? '';
            this.checked = data.checked ?? false;
        }
    }
}
class DerivedFactorSelectStepPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__allFactors = new ObservedPropertyObjectPU([], this, "allFactors");
        this.__selectedFactors = new ObservedPropertyObjectPU([], this, "selectedFactors");
        this.__search = new ObservedPropertySimplePU('', this, "search");
        this.__planName = new ObservedPropertySimplePU('', this, "planName");
        this.__selectedCheckedIds = new ObservedPropertyObjectPU([], this, "selectedCheckedIds");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DerivedFactorSelectStepPage_Params) {
        if (params.allFactors !== undefined) {
            this.allFactors = params.allFactors;
        }
        if (params.selectedFactors !== undefined) {
            this.selectedFactors = params.selectedFactors;
        }
        if (params.search !== undefined) {
            this.search = params.search;
        }
        if (params.planName !== undefined) {
            this.planName = params.planName;
        }
        if (params.selectedCheckedIds !== undefined) {
            this.selectedCheckedIds = params.selectedCheckedIds;
        }
    }
    updateStateVars(params: DerivedFactorSelectStepPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__allFactors.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedFactors.purgeDependencyOnElmtId(rmElmtId);
        this.__search.purgeDependencyOnElmtId(rmElmtId);
        this.__planName.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedCheckedIds.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__allFactors.aboutToBeDeleted();
        this.__selectedFactors.aboutToBeDeleted();
        this.__search.aboutToBeDeleted();
        this.__planName.aboutToBeDeleted();
        this.__selectedCheckedIds.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __allFactors: ObservedPropertyObjectPU<DerivedFactor[]>;
    get allFactors() {
        return this.__allFactors.get();
    }
    set allFactors(newValue: DerivedFactor[]) {
        this.__allFactors.set(newValue);
    }
    private __selectedFactors: ObservedPropertyObjectPU<DerivedFactor[]>;
    get selectedFactors() {
        return this.__selectedFactors.get();
    }
    set selectedFactors(newValue: DerivedFactor[]) {
        this.__selectedFactors.set(newValue);
    }
    private __search: ObservedPropertySimplePU<string>;
    get search() {
        return this.__search.get();
    }
    set search(newValue: string) {
        this.__search.set(newValue);
    }
    private __planName: ObservedPropertySimplePU<string>;
    get planName() {
        return this.__planName.get();
    }
    set planName(newValue: string) {
        this.__planName.set(newValue);
    }
    private __selectedCheckedIds: ObservedPropertyObjectPU<string[]>;
    get selectedCheckedIds() {
        return this.__selectedCheckedIds.get();
    }
    set selectedCheckedIds(newValue: string[]) {
        this.__selectedCheckedIds.set(newValue);
    }
    aboutToAppear() {
        this.fetchAllFactors();
    }
    private fetchAllFactors(): void {
        RequestAxios.get<DerivedFactor[]>('/derived-factors/data-types')
            .then((res: import('@ohos/axios').AxiosResponse<DerivedFactor[]>) => {
            this.allFactors = res.data.map(f => new DerivedFactor(f));
        })
            .catch((e: Error) => {
            promptAction.showToast({ message: `获取衍生因子失败: ${e.message}` });
        });
    }
    private addSelected(): void {
        let toAdd: DerivedFactor[] = [];
        for (let i = 0; i < this.allFactors.length; i++) {
            let f = this.allFactors[i];
            if (f.checked && !this.selectedFactors.some(s => s.id === f.id)) {
                toAdd.push(f);
            }
        }
        this.selectedFactors = this.selectedFactors.concat(toAdd);
        for (let i = 0; i < this.allFactors.length; i++) {
            if (this.allFactors[i].checked)
                this.allFactors[i].checked = false;
        }
    }
    private removeSelected(): void {
        this.selectedFactors = this.selectedFactors.filter(f => this.selectedCheckedIds.indexOf(f.id) === -1);
        this.selectedCheckedIds = [];
    }
    private clearAll(): void {
        this.selectedFactors = [];
        this.selectedCheckedIds = [];
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(69:5)", "entry");
            Column.backgroundColor('#F5F6FA');
            Column.width('100%');
            Column.height('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 上半部分：全部因子选择卡片
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(71:7)", "entry");
            // 上半部分：全部因子选择卡片
            Column.backgroundColor('#fafbfc');
            // 上半部分：全部因子选择卡片
            Column.borderRadius(16);
            // 上半部分：全部因子选择卡片
            Column.padding(20);
            // 上半部分：全部因子选择卡片
            Column.margin({ bottom: 24, top: 24 });
            // 上半部分：全部因子选择卡片
            Column.constraintSize({ maxWidth: 500 });
            // 上半部分：全部因子选择卡片
            Column.alignSelf(ItemAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(72:9)", "entry");
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('衍生因子');
            Text.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(73:11)", "entry");
            Text.fontWeight(FontWeight.Bold);
            Text.fontSize(16);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入衍生因子风格名称', text: this.search });
            TextInput.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(74:11)", "entry");
            TextInput.onChange((v: string) => this.search = v);
            TextInput.width(120);
            TextInput.margin({ left: 8 });
        }, TextInput);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.allFactors.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create();
                        List.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(80:11)", "entry");
                        List.height(200);
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
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
                                    ListItem.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(82:15)", "entry");
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(83:17)", "entry");
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Checkbox.create();
                                        Checkbox.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(84:19)", "entry");
                                        Checkbox.select(item.checked);
                                        Checkbox.onChange((v: boolean) => { item.checked = v; });
                                    }, Checkbox);
                                    Checkbox.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(item.name);
                                        Text.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(87:19)", "entry");
                                        Text.margin({ left: 8 });
                                    }, Text);
                                    Text.pop();
                                    Row.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.filteredFactors, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无数据');
                        Text.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(94:11)", "entry");
                        Text.fontColor('#888888');
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        // 上半部分：全部因子选择卡片
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 下半部分：方案卡片
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(100:7)", "entry");
            // 下半部分：方案卡片
            Column.backgroundColor('#fafbfc');
            // 下半部分：方案卡片
            Column.borderRadius(16);
            // 下半部分：方案卡片
            Column.padding(20);
            // 下半部分：方案卡片
            Column.margin({ bottom: 24 });
            // 下半部分：方案卡片
            Column.constraintSize({ maxWidth: 500 });
            // 下半部分：方案卡片
            Column.alignSelf(ItemAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(101:9)", "entry");
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('方案名称');
            Text.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(102:11)", "entry");
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入方案名称（1~6字以内）', text: this.planName });
            TextInput.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(103:11)", "entry");
            TextInput.onChange((v: string) => this.planName = v);
            TextInput.width(120);
            TextInput.margin({ left: 8 });
        }, TextInput);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`已选指数（${this.selectedFactors.length}）`);
            Text.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(108:9)", "entry");
            Text.fontColor('#197aff');
            Text.fontSize(14);
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(109:9)", "entry");
            List.height(120);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
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
                        ListItem.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(111:13)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(112:15)", "entry");
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Checkbox.create();
                            Checkbox.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(113:17)", "entry");
                            Checkbox.select(this.selectedCheckedIds.indexOf(item.id) !== -1);
                            Checkbox.onChange((v: boolean) => {
                                if (v) {
                                    if (this.selectedCheckedIds.indexOf(item.id) === -1)
                                        this.selectedCheckedIds.push(item.id);
                                }
                                else {
                                    this.selectedCheckedIds = this.selectedCheckedIds.filter(id => id !== item.id);
                                }
                            });
                        }, Checkbox);
                        Checkbox.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.name);
                            Text.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(122:17)", "entry");
                            Text.margin({ left: 8 });
                        }, Text);
                        Text.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.selectedFactors, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 操作按钮横向排列
            Flex.create({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
            Flex.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(129:9)", "entry");
            // 操作按钮横向排列
            Flex.margin({ top: 16 });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('添加 >>');
            Button.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(130:11)", "entry");
            Button.onClick(() => this.addSelected());
            Button.width(100);
            Button.height(40);
            Button.backgroundColor('#0A59F7');
            Button.fontColor('#FFFFFF');
            Button.fontSize(16);
            Button.borderRadius(20);
            Button.margin({ right: 12 });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('<< 删除');
            Button.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(140:11)", "entry");
            Button.onClick(() => this.removeSelected());
            Button.width(100);
            Button.height(40);
            Button.backgroundColor('#0A59F7');
            Button.fontColor('#FFFFFF');
            Button.fontSize(16);
            Button.borderRadius(20);
            Button.margin({ right: 12 });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('全部清空');
            Button.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(150:11)", "entry");
            Button.onClick(() => this.clearAll());
            Button.width(100);
            Button.height(40);
            Button.backgroundColor('#0A59F7');
            Button.fontColor('#FFFFFF');
            Button.fontSize(16);
            Button.borderRadius(20);
            Button.margin({ right: 12 });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('下一步');
            Button.debugLine("entry/src/main/ets/pages/DerivedFactorSelectStepPage.ets(160:11)", "entry");
            Button.onClick(() => {
                let selected = this.selectedFactors.length > 0 ? this.selectedFactors[0] : null;
                if (selected) {
                    router.pushUrl({
                        url: 'pages/CreateDerivedFactorPage',
                        params: {
                            factorName: selected.name,
                            displayName: selected.name,
                            dataType: 'string',
                            calcMethod: 'avg',
                            updateFrequency: 'daily',
                            name: selected.name,
                            factorType: '技术因子'
                        }
                    });
                }
                else {
                    promptAction.showToast({ message: '请先选择一个因子' });
                }
            });
            Button.width(100);
            Button.height(40);
            Button.backgroundColor('#0A59F7');
            Button.fontColor('#FFFFFF');
            Button.fontSize(16);
            Button.borderRadius(20);
        }, Button);
        Button.pop();
        // 操作按钮横向排列
        Flex.pop();
        // 下半部分：方案卡片
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "DerivedFactorSelectStepPage";
    }
}
registerNamedRoute(() => new DerivedFactorSelectStepPage(undefined, {}), "", { bundleName: "com.example.component", moduleName: "entry", pagePath: "pages/DerivedFactorSelectStepPage", pageFullPath: "entry/src/main/ets/pages/DerivedFactorSelectStepPage", integratedHsp: "false", moduleType: "followWithHap" });
