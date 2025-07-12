if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LoginPage_Params {
    account?: string;
    password?: string;
    isShowProgress?: boolean;
    timeOutId?: number;
}
import promptAction from "@ohos:promptAction";
import router from "@ohos:router";
import CommonConstants from "@bundle:com.example.component/entry/ets/common/constants/CommonConstants";
import RequestAxios from "@bundle:com.example.component/entry/ets/utility/BaseRequest";
interface LoginRequest {
    username: string;
    password: string;
}
interface LoginResponse {
    success: boolean;
    token?: string;
    userId?: number;
    message?: string;
}
interface response {
    code: number;
    message: string;
    data: object;
    timestamp: number;
}
function __TextInput__inputStyle(): void {
    TextInput.placeholderColor({ "id": 16777284, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    TextInput.height({ "id": 16777316, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    TextInput.fontSize({ "id": 16777290, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    TextInput.backgroundColor({ "id": 16777273, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    TextInput.width(CommonConstants.FULL_PARENT);
    TextInput.padding({ left: CommonConstants.INPUT_PADDING_LEFT });
    TextInput.margin({ top: { "id": 16777310, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
}
function __Line__lineStyle(): void {
    Line.width(CommonConstants.FULL_PARENT);
    Line.height({ "id": 16777311, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    Line.backgroundColor({ "id": 16777275, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
}
function __Text__blueTextStyle(): void {
    Text.fontColor({ "id": 16777277, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    Text.fontSize({ "id": 16777360, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
    Text.fontWeight(FontWeight.Medium);
}
class LoginPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__account = new ObservedPropertySimplePU('', this, "account");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.__isShowProgress = new ObservedPropertySimplePU(false, this, "isShowProgress");
        this.timeOutId = -1;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LoginPage_Params) {
        if (params.account !== undefined) {
            this.account = params.account;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.isShowProgress !== undefined) {
            this.isShowProgress = params.isShowProgress;
        }
        if (params.timeOutId !== undefined) {
            this.timeOutId = params.timeOutId;
        }
    }
    updateStateVars(params: LoginPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__account.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowProgress.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__account.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__isShowProgress.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __account: ObservedPropertySimplePU<string>;
    get account() {
        return this.__account.get();
    }
    set account(newValue: string) {
        this.__account.set(newValue);
    }
    private __password: ObservedPropertySimplePU<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    private __isShowProgress: ObservedPropertySimplePU<boolean>;
    get isShowProgress() {
        return this.__isShowProgress.get();
    }
    set isShowProgress(newValue: boolean) {
        this.__isShowProgress.set(newValue);
    }
    private timeOutId: number;
    imageButton(src: Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Circle, stateEffect: true });
            Button.height({ "id": 16777334, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Button.width({ "id": 16777334, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Button.backgroundColor({ "id": 16777273, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(src);
        }, Image);
        Button.pop();
    }
    login(): void {
        if (this.account === '' || this.password === '') {
            promptAction.showToast({ message: { "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
            return;
        }
        this.isShowProgress = true;
        const requestBody: LoginRequest = {
            username: this.account,
            password: this.password
        };
        RequestAxios.post<LoginResponse>('/login', requestBody)
            .then((response: import('@ohos/axios').AxiosResponse<LoginResponse>) => {
            this.isShowProgress = false;
            const data = response.data;
            if (data.success) {
                router.replaceUrl({ url: 'pages/MainPage' });
            }
            else {
                promptAction.showToast({ message: data.message ?? '登录失败' });
            }
        })
            .catch((error: Error) => {
            this.isShowProgress = false;
            promptAction.showToast({ message: error.message ?? '网络错误' });
            console.log('网络请求出错:', error);
        });
    }
    aboutToDisappear() {
        clearTimeout(this.timeOutId);
        this.timeOutId = -1;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.backgroundColor({ "id": 16777273, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Column.height(CommonConstants.FULL_PARENT);
            Column.width(CommonConstants.FULL_PARENT);
            Column.padding({
                left: { "id": 16777337, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
                right: { "id": 16777337, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" },
                bottom: { "id": 16777319, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Added the new title for the login page
            Text.create('投顾中台系统');
            // Added the new title for the login page
            Text.fontSize({ "id": 16777338, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            // Added the new title for the login page
            Text.fontWeight(FontWeight.Bold);
            // Added the new title for the login page
            Text.fontColor({ "id": 16777288, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            // Added the new title for the login page
            Text.margin({ bottom: { "id": 16777324, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
        }, Text);
        // Added the new title for the login page
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777382, "type": 20000, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Image.width({ "id": 16777322, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Image.height({ "id": 16777322, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Image.margin({ top: { "id": 16777324, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, bottom: { "id": 16777323, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777234, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.fontSize({ "id": 16777338, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777288, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.fontSize({ "id": 16777333, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.fontColor({ "id": 16777279, "type": 10001, params: [], "bundleName": "com.example.component", "moduleName": "entry" });
            Text.margin({ bottom: { "id": 16777317, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" }, top: { "id": 16777318, "type": 10002, params: [], "bundleName": "com.example.component", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '账号' });
            TextInput.placeholderColor(Color.Gray);
            TextInput.margin({ bottom: 15 });
            TextInput.height(50);
            TextInput.borderRadius(8);
            TextInput.backgroundColor(Color.White);
            TextInput.onChange((value: string) => this.account = value);
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '密码' });
            TextInput.type(InputType.NEW_PASSWORD);
            TextInput.placeholderColor(Color.Gray);
            TextInput.margin({ bottom: 25 });
            TextInput.height(50);
            TextInput.borderRadius(8);
            TextInput.backgroundColor(Color.White);
            TextInput.onChange((value: string) => this.password = value);
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('登录');
            Button.width('100%');
            Button.height(50);
            Button.backgroundColor(Color.Blue);
            Button.fontColor(Color.White);
            Button.fontSize(18);
            Button.fontWeight(FontWeight.Bold);
            Button.borderRadius(8);
            Button.onClick(() => this.login());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isShowProgress) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.width(30);
                        LoadingProgress.height(30);
                    }, LoadingProgress);
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
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "LoginPage";
    }
}
registerNamedRoute(() => new LoginPage(undefined, {}), "", { bundleName: "com.example.component", moduleName: "entry", pagePath: "pages/LoginPage", pageFullPath: "entry/src/main/ets/pages/LoginPage", integratedHsp: "false", moduleType: "followWithHap" });
