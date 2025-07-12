if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Setting_Params {
}
import CommonConstants from "@bundle:com.example.component/entry/ets/common/constants/CommonConstants";
import type ItemData from '../viewmodel/ItemData';
import mainViewModel from "@bundle:com.example.component/entry/ets/viewmodel/MainViewModel";
export default class Setting extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Setting_Params) {
    }
    updateStateVars(params: Setting_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    settingCell(item: ItemData, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width(CommonConstants.FULL_PARENT);
            Row.padding({
                left: { "id": 16777357, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
                right: { "id": 16777358, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: CommonConstants.COMMON_SPACE });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(item.img);
            Image.width({ "id": 16777359, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Image.height({ "id": 16777359, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.title);
            Text.fontSize({ "id": 16777333, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (item.others === undefined) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777393, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                        Image.width({ "id": 16777348, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                        Image.height({ "id": 16777347, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Toggle.create({ type: ToggleType.Switch, isOn: false });
                    }, Toggle);
                    Toggle.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: CommonConstants.COMMON_SPACE });
            Column.height(CommonConstants.FULL_PARENT);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.FULL_PARENT);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777240, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontSize({ "id": 16777338, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.margin({ top: { "id": 16777330, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            Text.padding({ left: { "id": 16777331, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ top: { "id": 16777342, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            Row.alignItems(VerticalAlign.Center);
            Row.width(CommonConstants.FULL_PARENT);
            Row.height({ "id": 16777341, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Row.backgroundColor(Color.White);
            Row.padding({ left: { "id": 16777343, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            Row.borderRadius({ "id": 16777339, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777363, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Image.width({ "id": 16777344, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Image.height({ "id": 16777344, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: { "id": 16777342, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777261, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.fontSize({ "id": 16777340, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777260, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.fontSize({ "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.margin({ top: { "id": 16777355, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.scrollBar(BarState.Off);
            List.backgroundColor(Color.White);
            List.width(CommonConstants.FULL_PARENT);
            List.height(CommonConstants.SET_LIST_WIDTH);
            List.divider({
                strokeWidth: { "id": 16777354, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
                color: Color.Grey,
                startMargin: { "id": 16777353, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
                endMargin: { "id": 16777350, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" }
            });
            List.borderRadius({ "id": 16777349, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            List.padding({ top: { "id": 16777352, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, bottom: { "id": 16777352, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
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
                        ListItem.height({ "id": 16777351, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.settingCell.bind(this)(item);
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, mainViewModel.getSettingListData(), forEachItemGenFunction, (item: ItemData) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777262, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { type: ButtonType.Capsule });
            Button.width(CommonConstants.BUTTON_WIDTH);
            Button.height({ "id": 16777313, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Button.fontSize({ "id": 16777333, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Button.fontColor({ "id": 16777286, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Button.fontWeight(FontWeight.Medium);
            Button.backgroundColor({ "id": 16777285, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Button.margin({ bottom: { "id": 16777346, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
        }, Button);
        Button.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
