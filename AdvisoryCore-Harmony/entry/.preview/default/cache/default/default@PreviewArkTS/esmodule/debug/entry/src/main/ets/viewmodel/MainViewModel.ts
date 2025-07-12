import ItemData from "@bundle:com.example.component/entry/ets/viewmodel/ItemData";
/**
 * Binds data to components and provides interfaces.
 */
export class MainViewModel {
    /**
     * Get swiper image data.
     *
     * @return {Array<Resource>} swiperImages.
     */
    getSwiperImages(): Array<Resource> {
        let swiperImages: Resource[] = [
            { "id": 16777307, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
            { "id": 16777396, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
            { "id": 16777369, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
            { "id": 16777299, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }
        ];
        return swiperImages;
    }
    /**
     * Get data of the first grid.
     *
     * @return {Array<PageResource>} firstGridData.
     */
    getFirstGridData(): Array<ItemData> {
        let firstGridData: ItemData[] = [
            new ItemData({ "id": 16777347, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777398, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777324, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777293, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777342, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777394, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777365, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777295, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777346, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777323, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777391, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777320, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777302, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777353, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777305, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" })
        ];
        return firstGridData;
    }
    /**
     * Get data of the second grid.
     *
     * @return {Array<PageResource>} secondGridData.
     */
    getSecondGridData(): Array<ItemData> {
        let secondGridData: ItemData[] = [
            new ItemData({ "id": 16777340, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777306, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777339, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777333, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777301, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777338, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777331, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777292, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777336, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777332, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777399, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777337, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" })
        ];
        return secondGridData;
    }
    /**
     * Get data of the setting list.
     *
     * @return {Array<PageResource>} settingListData.
     */
    getSettingListData(): Array<ItemData> {
        let settingListData: ItemData[] = [
            new ItemData({ "id": 16777361, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777397, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777364, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777359, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777300, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777360, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777358, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777308, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777363, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777393, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777362, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777298, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" })
        ];
        return settingListData;
    }
}
export default new MainViewModel();
