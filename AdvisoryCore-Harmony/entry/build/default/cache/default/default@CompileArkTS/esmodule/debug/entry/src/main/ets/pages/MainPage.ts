if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MainPage_Params {
    modules?: ModuleEntry[];
}
import router from "@ohos:router";
interface ModuleEntry {
    title: string;
    page: string;
}
class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.modules = [
            { title: '基础基金', page: 'pages/BasicFund' },
            { title: '创建衍生因子', page: 'pages/CreateDerivedFactorPage' },
            { title: '衍生因子选择', page: 'pages/DerivedFactorSelectStepPage' },
            { title: '基金公司', page: 'pages/FundCompany' },
            { title: '基金经理', page: 'pages/FundManager' },
            { title: '基金备选库', page: 'pages/FundOptionsPage' }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MainPage_Params) {
        if (params.modules !== undefined) {
            this.modules = params.modules;
        }
    }
    updateStateVars(params: MainPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private modules: ModuleEntry[];
    private gotoPage(page: string) {
        router.pushUrl({ url: page });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.height('100%');
            Scroll.backgroundColor('#F7FAFF');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({ left: 32, right: 32, top: 16 });
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基金管理系统');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#0A59F7');
            Text.margin({ top: 40, bottom: 32 });
            Text.alignSelf(ItemAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const mod = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(mod.title, { type: ButtonType.Capsule });
                    Button.onClick(() => this.gotoPage(mod.page));
                    Button.width('100%');
                    Button.height(64);
                    Button.fontSize(18);
                    Button.fontColor('#0A59F7');
                    Button.backgroundColor('#F7F9FE');
                    Button.borderRadius(18);
                    Button.margin({ bottom: 24 });
                    Button.shadow({ radius: 8, color: '#1A2978FB', offsetX: 0, offsetY: 2 });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, this.modules, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MainPage";
    }
}
registerNamedRoute(() => new MainPage(undefined, {}), "", { bundleName: "com.example.component", moduleName: "entry", pagePath: "pages/MainPage", pageFullPath: "entry/src/main/ets/pages/MainPage", integratedHsp: "false", moduleType: "followWithHap" });
