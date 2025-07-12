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
            Row.debugLine("entry/src/main/ets/view/Setting.ets(26:5)", "entry");
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width(CommonConstants.FULL_PARENT);
            Row.padding({
                left: { "id": 16777285, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
                right: { "id": 16777286, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: CommonConstants.COMMON_SPACE });
            Row.debugLine("entry/src/main/ets/view/Setting.ets(27:7)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(item.img);
            Image.debugLine("entry/src/main/ets/view/Setting.ets(28:9)", "entry");
            Image.width({ "id": 16777287, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Image.height({ "id": 16777287, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.title);
            Text.debugLine("entry/src/main/ets/view/Setting.ets(31:9)", "entry");
            Text.fontSize({ "id": 16777261, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (item.others === undefined) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777312, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/view/Setting.ets(36:9)", "entry");
                        Image.width({ "id": 16777276, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                        Image.height({ "id": 16777275, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Toggle.create({ type: ToggleType.Switch, isOn: false });
                        Toggle.debugLine("entry/src/main/ets/view/Setting.ets(40:9)", "entry");
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
            Scroll.debugLine("entry/src/main/ets/view/Setting.ets(52:5)", "entry");
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: CommonConstants.COMMON_SPACE });
            Column.debugLine("entry/src/main/ets/view/Setting.ets(53:7)", "entry");
            Column.height(CommonConstants.FULL_PARENT);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/Setting.ets(54:9)", "entry");
            Column.width(CommonConstants.FULL_PARENT);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777335, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/Setting.ets(55:11)", "entry");
            Text.fontWeight(FontWeight.Medium);
            Text.fontSize({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.margin({ top: { "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            Text.padding({ left: { "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/Setting.ets(64:9)", "entry");
            Row.margin({ top: { "id": 16777270, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            Row.alignItems(VerticalAlign.Center);
            Row.width(CommonConstants.FULL_PARENT);
            Row.height({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Row.backgroundColor(Color.White);
            Row.padding({ left: { "id": 16777271, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            Row.borderRadius({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777395, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/Setting.ets(65:11)", "entry");
            Image.width({ "id": 16777272, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Image.height({ "id": 16777272, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/Setting.ets(68:11)", "entry");
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: { "id": 16777270, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777356, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/Setting.ets(69:13)", "entry");
            Text.fontSize({ "id": 16777268, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777355, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/Setting.ets(71:13)", "entry");
            Text.fontSize({ "id": 16777240, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.margin({ top: { "id": 16777283, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/view/Setting.ets(86:9)", "entry");
            List.scrollBar(BarState.Off);
            List.backgroundColor(Color.White);
            List.width(CommonConstants.FULL_PARENT);
            List.height(CommonConstants.SET_LIST_WIDTH);
            List.divider({
                strokeWidth: { "id": 16777282, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
                color: Color.Grey,
                startMargin: { "id": 16777281, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
                endMargin: { "id": 16777278, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" }
            });
            List.borderRadius({ "id": 16777277, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            List.padding({ top: { "id": 16777280, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, bottom: { "id": 16777280, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
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
                        ListItem.height({ "id": 16777279, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                        ListItem.debugLine("entry/src/main/ets/view/Setting.ets(88:13)", "entry");
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
            Blank.debugLine("entry/src/main/ets/view/Setting.ets(107:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777357, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { type: ButtonType.Capsule });
            Button.debugLine("entry/src/main/ets/view/Setting.ets(109:9)", "entry");
            Button.width(CommonConstants.BUTTON_WIDTH);
            Button.height({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Button.fontSize({ "id": 16777261, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Button.fontColor({ "id": 16777384, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Button.fontWeight(FontWeight.Medium);
            Button.backgroundColor({ "id": 16777383, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Button.margin({ bottom: { "id": 16777274, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
        }, Button);
        Button.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
