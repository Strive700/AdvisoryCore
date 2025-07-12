if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Home_Params {
    swiperController?: SwiperController;
}
import CommonConstants from "@bundle:com.example.component/entry/ets/common/constants/CommonConstants";
import mainViewModel from "@bundle:com.example.component/entry/ets/viewmodel/MainViewModel";
import type ItemData from '../viewmodel/ItemData';
export default class Home extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.swiperController = new SwiperController();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Home_Params) {
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
    }
    updateStateVars(params: Home_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private swiperController: SwiperController;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.scrollBar(BarState.Off);
            Scroll.height(CommonConstants.FULL_PARENT);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: CommonConstants.COMMON_SPACE });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(CommonConstants.FULL_PARENT);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777239, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontSize({ "id": 16777338, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.margin({ top: { "id": 16777330, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            Text.padding({ left: { "id": 16777331, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create(this.swiperController);
            Swiper.margin({ top: { "id": 16777308, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            Swiper.autoPlay(true);
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const img = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(img);
                    Image.borderRadius({ "id": 16777307, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                }, Image);
            };
            this.forEachUpdateFunction(elmtId, mainViewModel.getSwiperImages(), forEachItemGenFunction, (img: Resource) => JSON.stringify(img.id), false, false);
        }, ForEach);
        ForEach.pop();
        Swiper.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.columnsTemplate('1fr 1fr 1fr 1fr');
            Grid.rowsTemplate('1fr 1fr');
            Grid.columnsGap({ "id": 16777294, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Grid.rowsGap({ "id": 16777298, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Grid.padding({ top: { "id": 16777297, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, bottom: { "id": 16777297, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            Grid.height({ "id": 16777295, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Grid.backgroundColor(Color.White);
            Grid.borderRadius({ "id": 16777293, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(item.img);
                            Image.width({ "id": 16777301, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                            Image.height({ "id": 16777301, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.title);
                            Text.fontSize({ "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                            Text.margin({ top: { "id": 16777300, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
                        }, Text);
                        Text.pop();
                        Column.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, mainViewModel.getFirstGridData(), forEachItemGenFunction, (item: ItemData) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.fontSize({ "id": 16777333, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.width(CommonConstants.FULL_PARENT);
            Text.margin({ top: { "id": 16777309, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.width(CommonConstants.FULL_PARENT);
            Grid.height({ "id": 16777305, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Grid.columnsTemplate('1fr 1fr');
            Grid.rowsTemplate('1fr 1fr');
            Grid.columnsGap({ "id": 16777294, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Grid.rowsGap({ "id": 16777298, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Grid.margin({ bottom: { "id": 16777346, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const secondItem = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                        GridItem.padding({ top: { "id": 16777304, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, left: { "id": 16777304, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
                        GridItem.borderRadius({ "id": 16777292, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                        GridItem.align(Alignment.TopStart);
                        GridItem.backgroundImage(secondItem.img);
                        GridItem.backgroundImageSize(ImageSize.Cover);
                        GridItem.width(CommonConstants.FULL_PARENT);
                        GridItem.height(CommonConstants.FULL_PARENT);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.alignItems(HorizontalAlign.Start);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(secondItem.title);
                            Text.fontSize({ "id": 16777333, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                            Text.fontWeight(FontWeight.Medium);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(secondItem.others);
                            Text.margin({ top: { "id": 16777303, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
                            Text.fontSize({ "id": 16777312, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                            Text.fontColor({ "id": 16777274, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
                        }, Text);
                        Text.pop();
                        Column.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, mainViewModel.getSecondGridData(), forEachItemGenFunction, (secondItem: ItemData) => JSON.stringify(secondItem), false, false);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
