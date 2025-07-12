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
            { "id": 16777371, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
            { "id": 16777372, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
            { "id": 16777373, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
            { "id": 16777374, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }
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
            new ItemData({ "id": 16777252, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777383, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777391, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777247, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777385, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777270, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777395, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777251, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777397, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777366, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777370, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777258, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777392, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" })
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
            new ItemData({ "id": 16777245, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777398, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777244, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777238, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777388, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777243, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777236, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777365, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777241, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777237, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777375, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777242, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" })
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
            new ItemData({ "id": 16777266, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777389, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777269, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777264, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777367, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777265, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777384, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777263, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777362, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777268, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777396, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" }),
            new ItemData({ "id": 16777267, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, { "id": 16777390, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" })
        ];
        return settingListData;
    }
}
export default new MainViewModel();
