if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CreateDerivedFactorPage_Params {
    factorTree?: FactorNode[];
    selectedFactors?: FactorNode[];
    step?: number;
    factorName?: string;
    weights?: WeightItem[];
    weightError?: string;
}
import RequestAxios from "@bundle:com.example.component/entry/ets/utility/BaseRequest";
import promptAction from "@ohos:promptAction";
class FactorNode {
    treeid: number = 0;
    parentId: number | null = null;
    nodeName: string = '';
    description: string = '';
    isLeaf: boolean = false;
    children: FactorNode[] = [];
    checked: boolean = false;
    constructor(data?: Partial<FactorNode>) {
        if (data) {
            this.treeid = data.treeid ?? 0;
            this.parentId = data.parentId ?? null;
            this.nodeName = data.nodeName ?? '';
            this.description = data.description ?? '';
            this.isLeaf = data.isLeaf ?? false;
            this.checked = data.checked ?? false;
            this.children = data.children ? data.children.map(child => new FactorNode(child)) : [];
        }
    }
}
class WeightItem {
    baseId: number = 0;
    weight: number = 0;
    constructor(baseId: number, weight: number) {
        this.baseId = baseId;
        this.weight = weight;
    }
}
class DerivedFactorPayload {
    factors: WeightItem[] = [];
    factorName: string = '';
    constructor(factors: WeightItem[], factorName: string) {
        this.factors = factors;
        this.factorName = factorName;
    }
}
class CreateDerivedFactorPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__factorTree = new ObservedPropertyObjectPU([], this, "factorTree");
        this.__selectedFactors = new ObservedPropertyObjectPU([], this, "selectedFactors");
        this.__step = new ObservedPropertySimplePU(0, this, "step");
        this.__factorName = new ObservedPropertySimplePU('', this, "factorName");
        this.__weights = new ObservedPropertyObjectPU([], this, "weights");
        this.__weightError = new ObservedPropertySimplePU('', this, "weightError");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CreateDerivedFactorPage_Params) {
        if (params.factorTree !== undefined) {
            this.factorTree = params.factorTree;
        }
        if (params.selectedFactors !== undefined) {
            this.selectedFactors = params.selectedFactors;
        }
        if (params.step !== undefined) {
            this.step = params.step;
        }
        if (params.factorName !== undefined) {
            this.factorName = params.factorName;
        }
        if (params.weights !== undefined) {
            this.weights = params.weights;
        }
        if (params.weightError !== undefined) {
            this.weightError = params.weightError;
        }
    }
    updateStateVars(params: CreateDerivedFactorPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__factorTree.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedFactors.purgeDependencyOnElmtId(rmElmtId);
        this.__step.purgeDependencyOnElmtId(rmElmtId);
        this.__factorName.purgeDependencyOnElmtId(rmElmtId);
        this.__weights.purgeDependencyOnElmtId(rmElmtId);
        this.__weightError.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__factorTree.aboutToBeDeleted();
        this.__selectedFactors.aboutToBeDeleted();
        this.__step.aboutToBeDeleted();
        this.__factorName.aboutToBeDeleted();
        this.__weights.aboutToBeDeleted();
        this.__weightError.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __factorTree: ObservedPropertyObjectPU<FactorNode[]>;
    get factorTree() {
        return this.__factorTree.get();
    }
    set factorTree(newValue: FactorNode[]) {
        this.__factorTree.set(newValue);
    }
    private __selectedFactors: ObservedPropertyObjectPU<FactorNode[]>;
    get selectedFactors() {
        return this.__selectedFactors.get();
    }
    set selectedFactors(newValue: FactorNode[]) {
        this.__selectedFactors.set(newValue);
    }
    private __step: ObservedPropertySimplePU<number>;
    get step() {
        return this.__step.get();
    }
    set step(newValue: number) {
        this.__step.set(newValue);
    }
    private __factorName: ObservedPropertySimplePU<string>;
    get factorName() {
        return this.__factorName.get();
    }
    set factorName(newValue: string) {
        this.__factorName.set(newValue);
    }
    private __weights: ObservedPropertyObjectPU<WeightItem[]>;
    get weights() {
        return this.__weights.get();
    }
    set weights(newValue: WeightItem[]) {
        this.__weights.set(newValue);
    }
    private __weightError: ObservedPropertySimplePU<string>;
    get weightError() {
        return this.__weightError.get();
    }
    set weightError(newValue: string) {
        this.__weightError.set(newValue);
    }
    aboutToAppear() {
        this.fetchFactorTree();
    }
    private fetchFactorTree(): void {
        RequestAxios.get<FactorNode[]>('/factors/tree')
            .then((res: import('@ohos/axios').AxiosResponse<FactorNode[]>) => {
            this.factorTree = this.arrayToTree(res.data);
        })
            .catch((e: Error) => {
            promptAction.showToast({ message: `获取因子树失败: ${e.message}` });
        });
    }
    private arrayToTree(arr: FactorNode[]): FactorNode[] {
        let map: Record<number, FactorNode> = {};
        for (let i = 0; i < arr.length; i++) {
            map[arr[i].treeid] = new FactorNode(arr[i]);
            map[arr[i].treeid].children = [];
        }
        let tree: FactorNode[] = [];
        for (let i = 0; i < arr.length; i++) {
            let item = map[arr[i].treeid];
            if (item.parentId && map[item.parentId]) {
                map[item.parentId].children.push(item);
            }
            else {
                tree.push(item);
            }
        }
        return tree;
    }
    private handleCheck(node: FactorNode, checked: boolean): void {
        node.checked = checked;
        if (node.isLeaf) {
            if (checked && !this.selectedFactors.some(f => f.treeid === node.treeid)) {
                this.selectedFactors.push(node);
            }
            else if (!checked) {
                this.selectedFactors = this.selectedFactors.filter(f => f.treeid !== node.treeid);
            }
        }
        for (let i = 0; i < node.children.length; i++) {
            this.handleCheck(node.children[i], checked);
        }
    }
    private handleStepChange(nextStep: number): void {
        if (nextStep === 1) {
            this.weights = this.selectedFactors.map(f => new WeightItem(f.treeid, 0));
        }
        this.step = nextStep;
    }
    private validateWeights(): string {
        let sum = 0;
        for (let i = 0; i < this.weights.length; i++) {
            const val = Number(this.weights[i].weight);
            if (isNaN(val))
                return '权重输入有误';
            if (val < 0)
                return '权重不能为负';
            sum += val;
        }
        if (this.weights.length === 0)
            return '请设置权重';
        if (Math.abs(sum - 100) > 0.0001)
            return '当前权重总和为: ' + sum;
        return '';
    }
    private onSubmit(): void {
        this.weightError = this.validateWeights();
        if (this.weightError) {
            promptAction.showToast({ message: this.weightError });
            return;
        }
        let payload = new DerivedFactorPayload(this.weights, this.factorName);
        RequestAxios.post('/derived-factors/add', payload)
            .then(() => {
            promptAction.showToast({ message: '添加成功' });
            this.step = 0;
            this.selectedFactors = [];
            this.factorName = '';
            this.weights = [];
        })
            .catch(() => {
            promptAction.showToast({ message: '添加失败' });
        });
    }
    // ArkTS树形递归渲染
    TreeNode(node: FactorNode, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ bottom: 2 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Checkbox.create();
            Checkbox.select(node.checked);
            Checkbox.onChange((v: boolean) => this.handleCheck(node, v));
        }, Checkbox);
        Checkbox.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(node.nodeName);
            Text.fontSize(15);
            Text.margin({ left: 4 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (node.children.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.margin({ left: 16 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const child = _item;
                            this.TreeNode.bind(this)(child);
                        };
                        this.forEachUpdateFunction(elmtId, node.children, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Top });
            Stack.backgroundColor('#F7FAFF');
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.constraintSize({ maxWidth: 900 });
            Column.justifyContent(FlexAlign.Center);
            Column.margin({ top: 40 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 左侧因子树卡片
            Column.create();
            // 左侧因子树卡片
            Column.padding(20);
            // 左侧因子树卡片
            Column.backgroundColor('#FFFFFF');
            // 左侧因子树卡片
            Column.borderRadius(16);
            // 左侧因子树卡片
            Column.shadow({ radius: 12, color: '#1A2978FB', offsetX: 0, offsetY: 4 });
            // 左侧因子树卡片
            Column.margin({ bottom: 24 });
            // 左侧因子树卡片
            Column.constraintSize({ minWidth: 220, maxWidth: 500 });
            // 左侧因子树卡片
            Column.alignSelf(ItemAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('可选因子');
            Text.fontWeight(FontWeight.Bold);
            Text.fontSize(18);
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.factorTree.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const node = _item;
                            this.TreeNode.bind(this)(node);
                        };
                        this.forEachUpdateFunction(elmtId, this.factorTree, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.alignItems(HorizontalAlign.Center);
                        Column.justifyContent(FlexAlign.Center);
                        Column.height(200);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无数据');
                        Text.fontColor('#888888');
                        Text.fontSize(16);
                        Text.margin({ top: 40 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        // 左侧因子树卡片
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 右侧步骤卡片
            Column.create();
            // 右侧步骤卡片
            Column.flexGrow(1);
            // 右侧步骤卡片
            Column.padding(24);
            // 右侧步骤卡片
            Column.backgroundColor('#FFFFFF');
            // 右侧步骤卡片
            Column.borderRadius(16);
            // 右侧步骤卡片
            Column.shadow({ radius: 12, color: '#1A2978FB', offsetX: 0, offsetY: 4 });
            // 右侧步骤卡片
            Column.constraintSize({ maxWidth: 500 });
            // 右侧步骤卡片
            Column.alignSelf(ItemAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 步骤条
            Row.create();
            // 步骤条
            Row.margin({ bottom: 18, top: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item === 0 ? '选择因子' : '设置权重');
                    Text.fontColor(this.step === item ? '#0A59F7' : '#888');
                    Text.fontWeight(this.step === item ? FontWeight.Bold : FontWeight.Normal);
                    Text.fontSize(16);
                    Text.margin({ right: 24 });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, [0, 1], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 步骤条
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 步骤内容
            if (this.step === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('已选因子');
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontSize(16);
                        Text.margin({ bottom: 12 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.selectedFactors.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    ForEach.create();
                                    const forEachItemGenFunction = _item => {
                                        const f = _item;
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Row.create();
                                            Row.margin({ bottom: 6 });
                                        }, Row);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(f.nodeName);
                                            Text.width(120);
                                        }, Text);
                                        Text.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(f.description ?? '');
                                            Text.width(120);
                                        }, Text);
                                        Text.pop();
                                        Row.pop();
                                    };
                                    this.forEachUpdateFunction(elmtId, this.selectedFactors, forEachItemGenFunction);
                                }, ForEach);
                                ForEach.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('请在左侧选择因子');
                                    Text.fontColor('#B0B0B0');
                                    Text.fontSize(15);
                                    Text.margin({ bottom: 12 });
                                }, Text);
                                Text.pop();
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.margin({ top: 20 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('取消', { type: ButtonType.Capsule });
                        Button.onClick(() => { });
                        Button.backgroundColor('#F0F0F0');
                        Button.fontColor('#888');
                        Button.borderRadius(24);
                        Button.height(40);
                        Button.fontSize(15);
                        Button.margin({ right: 16 });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('下一步', { type: ButtonType.Capsule });
                        Button.onClick(() => this.handleStepChange(1));
                        Button.enabled(this.selectedFactors.length > 0);
                        Button.backgroundColor(this.selectedFactors.length > 0 ? '#0A59F7' : '#B0B0B0');
                        Button.fontColor('#fff');
                        Button.borderRadius(24);
                        Button.height(40);
                        Button.fontSize(15);
                    }, Button);
                    Button.pop();
                    Row.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('设置权重');
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontSize(16);
                        Text.margin({ bottom: 12 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, idx: number) => {
                            const w = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.margin({ bottom: 8 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('因子');
                                Text.width(60);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                TextInput.create({ placeholder: '请输入权重', text: w.weight.toString() });
                                TextInput.onChange((v: string) => {
                                    let arr = [...this.weights];
                                    arr[idx] = new WeightItem(w.baseId, v === '' ? 0 : Number(v));
                                    this.weights = arr;
                                });
                                TextInput.width(80);
                                TextInput.borderRadius(8);
                                TextInput.backgroundColor('#F7F9FE');
                                TextInput.padding({ left: 8, right: 8 });
                                TextInput.fontSize(15);
                            }, TextInput);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('%');
                            }, Text);
                            Text.pop();
                            Row.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.weights, forEachItemGenFunction, undefined, true, false);
                    }, ForEach);
                    ForEach.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.margin({ top: 20 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('上一步', { type: ButtonType.Capsule });
                        Button.onClick(() => this.handleStepChange(0));
                        Button.backgroundColor('#F0F0F0');
                        Button.fontColor('#888');
                        Button.borderRadius(24);
                        Button.height(40);
                        Button.fontSize(15);
                        Button.margin({ right: 16 });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('确定', { type: ButtonType.Capsule });
                        Button.onClick(() => this.onSubmit());
                        Button.enabled(!this.validateWeights());
                        Button.backgroundColor(!this.validateWeights() ? '#0A59F7' : '#B0B0B0');
                        Button.fontColor('#fff');
                        Button.borderRadius(24);
                        Button.height(40);
                        Button.fontSize(15);
                    }, Button);
                    Button.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('校验信息: ' + this.validateWeights());
                        Text.fontColor('#F53F3F');
                        Text.fontSize(14);
                        Text.margin({ top: 8 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        // 右侧步骤卡片
        Column.pop();
        Column.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "CreateDerivedFactorPage";
    }
}
registerNamedRoute(() => new CreateDerivedFactorPage(undefined, {}), "", { bundleName: "com.example.component", moduleName: "entry", pagePath: "pages/CreateDerivedFactorPage", pageFullPath: "entry/src/main/ets/pages/CreateDerivedFactorPage", integratedHsp: "false", moduleType: "followWithHap" });
